+++
title = "2. Types"
weight = 2
template = "doc.html"
+++

The best place to start when building a new agent is its type definitions in its
`/sur` structure file. The main things to think through are:

1. What basic types of data does my agent deal with?
2. What actions/commands does my agent need to handle?
3. What updates/events will my agent need to send out to subscribers?
4. What does my agent need to store in its state?

Let's look at each of these questions in turn, and put together our agent's
`/sur` file, which we'll call `/sur/journal.hoon`.

### 1. Basic types

Our journal entries will just be plain text, so a simple `@t` will work fine to
store their contents. Entries will be organized by date, so we'll also need to
decide a format for that.

One option would be to use an `@da`, and then use the date functions included
in the `@urbit/api` NPM package on the front-end to convert them to ordinary
Javascript `Date` objects. In this case, to keep it simple, we'll just use the
number of milliseconds since the Unix Epoch as an `atom`, since it's natively
supported by the Javascript `Date` object.

The structure for a journal entry can therefore be:

```hoon
+$  id  @
+$  txt  @t
+$  entry  [=id =txt]
```

### 2. Actions

Now that we know what a journal entry looks like, we can think about what kind
of actions/commands our agent will handle in its `++on-poke` arm. For our
journal app, there are three basic things we might do:

1. Add a new journal entry.
2. Edit an existing journal entry.
3. Delete an existing journal entry.

We can create a tagged union structure for these actions, like so:

```hoon
+$  action
  $%  [%add =id =txt]
      [%edit =id =txt]
      [%del =id]
  ==
```

### 3. Updates

Updates are a little more complicated than our actions. Firstly, our front-end
needs to be able to retrieve an initial list of journal entries to display. Once
it has that, it also needs to be notified of any changes. For example, if a new
entry is added, it needs to know so it can add it to the list it's displaying.
If an entry gets deleted, it needs to remove it from the list. Etc.

The simplest approach to the initial entries is just a `(list entry)`. Then, for
the subsequent updates, we could send out the `$action`. Since an `$action` is a
tagged union, it's simpler to have all updates be a tagged union, so when we get
to doing mark conversions we can just switch on the head tag. Therefore, we can
define an `$update` structure like so:

```hoon
+$  update
  $%  action
      [%jrnl list=(list entry)]
  ==
```

There's one drawback to this structure. Suppose either an agent on a remote ship
or an instance of the front-end client is subscribed for updates, and the
network connection is disrupted. In the remote ship case, Gall will only allow
so many undelivered messages to accumulate in Ames before it automatically kicks
the unresponsive subscriber. In the front-end case, the subscription will also
be ended if enough unacknowledged messages accumulate, and additionally the
client may sometimes need to establish an entirely new connection with the ship,
discarding existing subscriptions. When this happens, the remote ship or web
client has no way to know how many (if any) updates they've missed.

The only way to resynchronize their state with ours is to discard their existing
state, refetch the entire initial state once again, and then resubscribe for
updates. This might be fine if the state of our agent is small, but it becomes a
problem if it's very large. For example, if our agent holds tens of thousands of
chat messages, having to resend them all every time anyone has connectivity
issues is quite inefficient.

One solution to this is to keep an _update log_. Each update can be tagged with
the time it occurred, and stored in our agent's state, separately to the
entries. If an agent or web client needs to resynchronize with our agent, it can
just request all updates since the last one it received. This approach is used
by the `%graph-store` agent, for example. Our agent is local-only and doesn't
have a huge state so it might not be strictly necessary, but we'll use it to
demonstrate the approach.

We can define a logged update like so, where the `@` is the update timestamp in
milliseconds since the Unix Epoch:

```hoon
+$  logged  (pair @ action)
+$  update
  %+  pair  @
  $%  action
      [%jrnl list=(list entry)]
      [%logs list=(list logged)]
  ==
```

### 4. State

We need to store two things in our state: the journal entries and the update
log. We could just use a couple of `map`s like so:

```hoon
+$  journal  (map id txt)
+$  log  (map @ action)
```

Ordinary `map`s are fine if we just want to access one value at a time, but we
want to be able to:

1. Retrieve only some of the journal entries at a time, so we can have "lazy
   loading" in the front-end, loading more entries each time the user scrolls to
   the bottom of the list.
2. Retrieve only logged updates newer than a certain time, in the case where the
   subscription is interrupted due to connectivity issues.
3. Retrieve journal entries between two dates.

Maps are ordered by the hash of their key, so if we convert them to a list
they'll come out in seemingly random order. That means we'd have to convert the
map to a list, sort the list, and then iterate over it again to pull out the
items we want. We could alternatively store things in a list directly, but
retrieving or modifying arbitrary items would be less efficient.

To solve this, rather than using a `map` or a `list`, we can use an _ordered
map_. The mold builder for an ordered map is a `mop`, and it's included in the
[`zuse.hoon`](https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/zuse.hoon#L5284)
utility library rather than the standard library.

A `mop` is defined similarly to a `map`, but it takes an extra argument in the
following manner:

```hoon
((mop key-mold val-mold) comparator-gate)
```

The gate is a binary gate which takes two keys and produces a `?`. The
comparator is used to decide how to order the items in the mop. In our case,
we'll create a `$journal` and `$log` `mop` like so:

```hoon
+$  journal  ((mop id txt) gth)
+$  log  ((mop @ action) lth)
```

The entries in `$journal` are arranged in ascending time order using `++gth`, so
the right-most item is the newest. The `$log` `mop` contains the update log, and
is arranged in descending time order, so the right-most item is the oldest.

We'll look at how to use ordered maps later when we get to writing the agent
itself.

## Conclusion

When we put each of these parts together, we have our complete
`/sur/journal.hoon` file:

```hoon
|%
:: Basic types of the data we're dealing with
::
+$  id  @
+$  txt  @t
+$  entry  [=id =txt]
:: Poke actions
::
+$  action
  $%  [%add =id =txt]
      [%edit =id =txt]
      [%del =id]
  ==
:: Types for updates to subscribers or returned via scries
::
+$  logged  (pair @ action)
+$  update
  %+  pair  @
  $%  action
      [%jrnl list=(list entry)]
      [%logs list=(list logged)]
  ==
:: Types for our agent's state
::
+$  journal  ((mop id txt) gth)
+$  log  ((mop @ action) lth)
--
```

## Resources

- [Gall Guide /sur section](/docs/userspace/gall-guide/7-sur-and-marks#sur) -
  This section of the Gall Guide covers writing a `/sur` structure library for
  an agent.

- [Ordered map functions in
  `zuse.hoon`](https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/zuse.hoon#L5284-L5688) -
  This section of `zuse.hoon` contains all the functions for working with
  `mop`s, and is well commented.
