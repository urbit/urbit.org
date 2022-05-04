+++
title = "3. Agent"
weight = 3
template = "doc.html"
+++

Now that we have our agent's types defined and have thought through its
behavior, we can write the `%journal` agent itself.

## Imports

```hoon
/-  *journal
/+  default-agent, dbug, agentio
```

We first import the `/sur/journal.hoon` file we previously created and expose
its structures. We import the standard `default-agent` and `dbug`, and also an additional library called `agentio`.

Agentio contains a number of convenience functions to make common agent tasks
simpler. For example, rather than writing out the full `$card`s when sending
`%fact`s to subscribers, we can call `++fact` in `agentio` with the `cage` and
`path`s and it will compose them for us. There are many more functions in
`agentio` than we'll use here - you can have a look through the library in
[`/base/lib/agentio.hoon`](https://github.com/urbit/urbit/blob/master/pkg/base-dev/lib/agentio.hoon)
to see what else it can do.

## State and type core

```hoon
|%
+$  versioned-state
    $%  state-0
    ==
+$  state-0  [%0 =journal =log]
+$  card  card:agent:gall
++  j-orm  ((on id txt) gth)
++  log-orm  ((on @ action) lth)
++  unique-time
  |=  [=time =log]
  ^-  @
  =/  unix-ms=@
    (unm:chrono:userlib time)
  |-
  ?.  (has:log-orm log unix-ms)
    unix-ms
  $(time (add unix-ms 1))
--
```

As we discussed in the previous section, our state will contain a `$journal`
structure containing all our journal entries, and a `$log` structure containing
the update log. These are both _ordered maps_, defined as `((mop id txt) gth)`
and `((mop @ action) lth)` respectively. We can therefore define our _versioned
state_ as `[%0 =journal =log]`, in the usual manner.

We've define `$card` for convenience as usual, and we've also added three more
arms. The first two relate to our two ordered maps. If you'll recall, an
ordinary `map` is called with the `++by` door in the standard library, like so:

```hoon
(~(get by foo) %bar)
```

An ordered map uses the `++on` gate in `zuse.hoon` rather than `++by`, and its
invocation is slightly different. It must first be setup in a similar manner to
the `mop` type, by providing it the key/value molds and comparator gates. Once
that's done, its individual functions can be called with the `mop` and
arguments, like:

```hoon
(get:((on @ud @ud) gth) foo %bar)
```

This is quite a cumbersome expression to use every time we want to interact with
our `mop`. To make it easier, we can store the `((on @ud @ud) gth)` part in an
arm, and then when we need to use it we can just do `(get:arm-name foo %bar)`.
In this case, we've done one each of our ordered maps like so:

```hoon
++  j-orm  ((on id txt) gth)
++  log-orm  ((on @ action) lth)
```

The last arm in our state definition core is `++unique-time`. Since we'll use
`now.bowl` to derive the timestamp for updates, we run into an issue if multiple
pokes arrive in a single Arvo event. In that case, `now.bowl` would be the same
for each poke, so they'd be given the same key and override each other in the
`mop`. To avoid this, `++unique-time` is just a simple recursive function that
will increment the timestamp by one millisecond if the key already exists in the
`$log` `mop`, ensuring all updates get unique timestamps and there are no
collisions.

## Agent core setup

```hoon
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
    io    ~(. agentio bowl)
++  on-init  on-init:def
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-vase=vase
  ^-  (quip card _this)
  `this(state !<(versioned-state old-vase))
::
```

Here we setup our agent core and define the three lifecycle arms. Since we only
have a single state version at present, these are very simple functions. You'll
notice in our `+*` arm, along with the usual `this` and `def`, we've also setup
the `agentio` library we imported, giving it the bowl and an alias of `io`.

## Pokes

```hoon
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  ?>  (team:title our.bowl src.bowl)
  ?.  ?=(%journal-action mark)  (on-poke:def mark vase)
  =/  now=@  (unique-time now.bowl log)
  =/  act  !<(action vase)
  =.  state  (poke-action act)
  :_  this(log (put:log-orm log now act))
  ~[(fact:io journal-update+!>(`update`[now act]) ~[/updates])]
  ::
  ++  poke-action
    |=  act=action
    ^-  _state
    ?-    -.act
        %add
      ?<  (has:j-orm journal id.act)
      state(journal (put:j-orm journal id.act txt.act))
    ::
        %edit
      ?>  (has:j-orm journal id.act)
      state(journal (put:j-orm journal id.act txt.act))
    ::
        %del
      ?>  (has:j-orm journal id.act)
      state(journal +:(del:j-orm journal id.act))
    ==
  --
::
```

Here we have our `++on-poke` arm, where we handle `$action`s. Since our
`%journal` agent is intended for local use only, we make sure only our ship or
our moons may perform actions with:

```hoon
?>  (team:title our.bowl src.bowl)
```

We haven't yet written our mark files, but our mark for `$action`s will be
`%journal-action`, so we make sure that's what we've received and if not, call
`++on-poke:def` to crash with an error message. We make sure the the timestamps
are unique with our `++unique-time` function described earlier, and then we
extract the poke's vase to an `$action` structure and call `++poke-action` to
handle it. We've made `++on-poke` a door with a separate `++poke-action` arm to
make the logic a little simpler, but in principle we could have had it all
directly inside the main `++poke-action` gate, or even separated it out into a
helper core below.

The logic in `++poke-action` is very simple, with three cases for each of the possible `$action`s:

- `%add` - Add a new journal entry. We check it doesn't already exist with
  `++has:j-orm`, and then add it to our `$journal` with `++put:j-orm`.

- `%edit` - Edit an existing journal entry. We make sure it _does_ exist with
  `++has:j-orm`, and then override the old entry with the new one using
  `++put:j-orm` again.

- `%del` - Delete an existing journal entry. We make sure it exists again with
  `++has:j-orm`, and then use `++del:j-orm` to delete it from our `$journal`
  `mop`.

Back in the main part of `++on-poke`, `++poke-action` updates the state with the
new `$journal`, then we proceed to:

```hoon
:_  this(log (put:log-orm log now act))
~[(fact:io journal-update+!>(`update`[now act]) ~[/updates])]
```

We add the timestamp to the action, converting it to a logged update. We add it
to the `$log` update log using `++put:log-orm`, and also send the logged update
out to subscribers on the `/updates` subscription path. We haven't written our
mark files yet, but `%journal-update` is the mark we'll use for `$update`s, so
we pack the `$update` in a vase and add the mark to make it a `$cage`. Notice
we're using the `++fact` function in `agentio` (which we aliased as `io`) rather
than manually composing the `%fact`.

## Subscriptions

```hoon
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  (team:title our.bowl src.bowl)
  ?+  path  (on-watch:def path)
    [%updates ~]  `this
  ==
::
```

Our subscription logic is extremely simple - we just have a single `/updates`
path, which the front-end or other local agents may subscribe to. All updates
get sent out on this path. We enforce local-only with the `team:title` check.

We could have had our `++on-watch` arm send out some initial state to new
subscribers, but for our front-end we'll instead fetch the initial state
separately with a scry. This just makes it slightly easier if our front-end
needs to resubscribe at some point - it'll already have some state in that case
so we don't want it to get sent again.

## Scry Endpoints

```hoon
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?>  (team:title our.bowl src.bowl)
  =/  now=@  (unm:chrono:userlib now.bowl)
  ?+    path  (on-peek:def path)
      [%x %entries *]
    ?+    t.t.path  (on-peek:def path)
        [%all ~]
      :^  ~  ~  %journal-update
      !>  ^-  update
      [now %jrnl (tap:j-orm journal)]
    ::
        [%before @ @ ~]
      =/  before=@  (rash i.t.t.t.path dem)
      =/  max=@  (rash i.t.t.t.t.path dem)
      :^  ~  ~  %journal-update
      !>  ^-  update
      [now %jrnl (tab:j-orm journal `before max)]
    ::
        [%between @ @ ~]
      =/  start=@
        =+  (rash i.t.t.t.path dem)
        ?:(=(0 -) - (sub - 1))
      =/  end=@  (add 1 (rash i.t.t.t.t.path dem))
      :^  ~  ~  %journal-update
      !>  ^-  update
      [now %jrnl (tap:j-orm (lot:j-orm journal `end `start))]
    ==
  ::
      [%x %updates *]
    ?+    t.t.path  (on-peek:def path)
        [%all ~]
      :^  ~  ~  %journal-update
      !>  ^-  update
      [now %logs (tap:log-orm log)]
    ::
        [%since @ ~]
      =/  since=@  (rash i.t.t.t.path dem)
      :^  ~  ~  %journal-update
      !>  ^-  update
      [now %logs (tap:log-orm (lot:log-orm log `since ~))]
    ==
  ==
::
```

Here we have our `++on-scry` arm. The scry endpoints we've defined are divided
into two parts: querying the update `$log` and retrieving entries from the
`$journal`. Each end-point is as follows:

- `/x/entries/all` - Retrieve all entries in the `$journal`. Our front-end will
  use lazy-loading and only get a few at a time, so it won't use this. It's nice
  to have it though, in case other agents want to get that data.

- `/x/entries/before/[before]/[max]` - Retrieve at most `[max]` entries older
  than the entry on `[before]` date. This is so our lazy-loading front-end can
  progressively load more as the user scrolls down the page. The Javascript
  front-end will format numbers without dot separators, so the path will look
  like `/x/entries/before/1648051573109/10`. We therefore have to use the
  [`++dem`](docs/hoon/reference/stdlib/4i#dem) parsing `rule` in a
  [`++rash`](/docs/hoon/reference/stdlib/4g#rash) parser to convert it to an
  ordinary atom. We then use the `++tap:log-orm` `mop` function to retrieve the
  requested range as a list and return it as an `$update` with a
  `%journal-update` mark.

- `/x/entries/between/[start]/[end]` - Retrieve all journal entries between two
  dates. This is so our front-end can have a search function, where the user can
  enter a start and end date and get all the entries in between. The
  `++lot:j-orm` `mop` function returns the subset of a `mop` between the two
  given keys as a `mop`, and then we call `++tap:j-orm` to convert it to a list.
  The `++lot:j-orm function` excludes the start and end values, so we subtract 1
  from the start and add 1 to the end to make sure it includes the full range.

- `/x/updates/all` - Retrieve the entire update `$log`. Our front-end won't use
  this but it might be useful for other agents, so we've included it here.

- `/x/updates/since/[since]` - Retrieve all `$update`s that have happened since
  the specified timestamp, if any. This is so our front-end (or another agent)
  can resynchronize its state in the event its subscription is interrupted,
  without having to fetch everything from scratch again.

We don't use any of the other agent arms, so the remainder have all been passed
to `default-agent` for handling:

```hoon
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
```

The full agent source can be viewed
[here](https://github.com/urbit/docs-examples/blob/main/journal-app/desk/app/journal.hoon).

## Resources

- [The Gall Guide](/docs/userspace/gall-guide/intro) - The Gall Guide covers all
  aspects of writing Gall agents in detail.

- [Ordered map functions in
  `zuse.hoon`](https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/zuse.hoon#L5284-L5688) -
  This section of `zuse.hoon` contains all the functions for working with
  `mop`s, and is well commented.

- [`/lib/agentio.hoon`](https://github.com/urbit/urbit/blob/master/pkg/base-dev/lib/agentio.hoon) -
  The `agentio` library in the `%base` desk contains a large number of useful
  functions which making writing Gall agents easier.
