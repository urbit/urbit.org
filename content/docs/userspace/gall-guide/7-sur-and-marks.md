+++
title = "7. Structures and Marks"
weight = 35
template = "doc.html"
+++

Before we get into subscription mechanics, there's three things we need to touch
on that are very commonly used in Gall agents. The first is defining an agent's
types in a `/sur` structure file, the second is `mark` files, and the third is
permissions. Note the example code presented in this lesson will not yet build a
fully functioning Gall agent, we'll get to that in the next lesson.

## `/sur`

In the [previous lesson on pokes](/docs/userspace/gall-guide/6-pokes), we used a
very simple union in the `vase` for incoming pokes:

```hoon
=/  action  !<(?(%inc %dec) vase)
```

A real Gall agent is likely to have a more complicated API. The most common
approach is to define a head-tagged union of all possible poke types the agent
will accept, and another for all possible updates it might send out to
subscribers. Rather than defining these types in the agent itself, you would
typically define them in a separate core saved in the `/sur` directory of the
desk. The `/sur` directory is the canonical location for userspace type
definitions.

With this approach, your agent can simply import the structures file and make use
of its types. Additionally, if someone else wants to write an agent that
interfaces with yours, they can include your structure file in their own desk
to interact with your agent's API in a type-safe way.

#### Example

Let's look at a practical example. If we were creating a simple To-Do app, our
agent might accept a few possible `action`s as pokes: Adding a new task,
deleting a task, toggling a task's "done" status, and renaming an existing task.
It might also be able to send `update`s out to subscribers when these events
occur. If our agent were named `%todo`, it might have the following structure in
`/sur/todo.hoon`:

```hoon
|%
+$  id  @
+$  name  @t
+$  task  [=name done=?]
+$  tasks  (map id task)
+$  action
  $%  [%add =name]
      [%del =id]
      [%toggle =id]
      [%rename =id =name]
  ==
+$  update
  $%  [%add =id =name]
      [%del =id]
      [%toggle =id]
      [%rename =id =name]
      [%initial =tasks]
  ==
--
```

Our `%todo` agent could then import this structure file with a [fashep ford
rune](/docs/arvo/ford/ford#ford-runes) (`/-`) at the beginning of the agent like
so:

```hoon
/-  todo
```

The agent's state could be defined like:

```hoon
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 =tasks:todo]
+$  card  card:agent:gall
--
```

Then, in its `on-poke` arm, it could handle these actions in the following
manner:

```hoon
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
  ?>  =(src.bowl our.bowl)
  ?+    mark  (on-poke:def mark vase)
      %todo-action
    =^  cards  state
      (handle-poke !<(action:todo vase))
    [cards this]
  ==
  ::
  ++  handle-poke
    |=  =action:todo
    ^-  (quip card _state)
    ?-    -.action
        %add
      :_  state(tasks (~(put by tasks) now.bowl [name.action %.n]))
      :~  :*  %give  %fact  ~[/updates]  %todo-update
              !>(`update:todo`[%add now.bowl name.action])
          ==
      ==
    ::
         %del
      :_  state(tasks (~(del by tasks) id.action))
      :~  :*  %give  %fact  ~[/updates]  %todo-update
              !>(`update:todo`action)
          ==
      ==
    ::
        %toggle
      :_  %=  state
            tasks  %+  ~(jab by tasks)
                     id.action
                   |=(=task:todo task(done !done.task))
          ==
      :~  :*  %give  %fact  ~[/updates]  %todo-update
              !>(`update:todo`action)
          ==
      ==
    ::
        %rename
      :_  %=  state
            tasks  %+  ~(jab by tasks)
                     id.action
                   |=(=task:todo task(name name.action))
          ==
      :~  :*  %give  %fact  ~[/updates]  %todo-update
              !>(`update:todo`action)
          ==
      ==
    ::
        %allow
      `state(friends (~(put in friends) who.action))
    ::
        %kick
      :_  state(friends (~(del in friends) who.action))
      :~  [%give %kick ~[/updates] `who.action]
      ==
    ==
  --
```

Let's break this down a bit. Firstly, our `on-poke` arm includes a
[barket](/docs/hoon/reference/rune/bar#-barket) (`|^`) rune. Barket creates a
core with a `$` arm that's computed immediately. We extract the `vase` to the
`action:todo` type and immediately pass it to the `handle-poke` arm of the core
created with the barket. This `handle-poke` arm tests what kind of `action` it's
received by checking its head. It then updates the state, and also sends an
update to subscribers, as appropriate. Don't worry too much about the `%give`
`card` for now - we'll cover subscriptions in the next lesson.

Notice that the `handle-poke` arm produces a `(quip card _state)` rather than
`(quip card _this)`. The call to `handle-poke` is also part of the following
expression:

```hoon
=^  cards  state
  (handle-poke !<(action:todo vase))
[cards this]
```

The [tisket](/docs/hoon/reference/rune/tis#-tisket) (`=^`) expression takes two
arguments: A new named noun to pin to the subject (`cards` in this case), and an
existing wing of the subject to modify (`state` in this case). Since
`handle-poke` produces `(quip card _state)`, we're saving the `card`s it
produces to `cards` and replacing the existing `state` with its new one.
Finally, we produce `[cards this]`, where `this` will now contain the modified
`state`. The `[cards this]` is a `(quip card _this)`, which our `on-poke` arm is
expected to produce.

This might seem a little convoluted, but it's a common pattern we do for two
reasons. Firstly, it's not ideal to be passing around the entire `this` agent
core - it's much tidier just passing around the `state`, until you actually want
to return it to Gall. Secondly, It's much easier to read when the poke handling
logic is separated into its own arm. This is a fairly simple example but if your
agent is more complex, handling multiple marks and containing additional logic
before it gets to the actual contents of the `vase`, structuring things this way
can be useful.

You can of course structure your `on-poke` arm differently than we've done
here - we're just demonstrating a typical pattern.

## `mark` files

So far we've just used a `%noun` mark for pokes - we haven't really delved into
what such `mark`s represent, or considered writing custom ones.

Formally, marks are file types in the Clay filesystem. They correspond to mark
files in the `/mar` directory of a desk. The `%noun` mark, for example,
corresponds to the `/mar/noun.hoon` file. Mark files define the actual hoon data
type for the file (e.g. a `*` noun for the `%noun` mark), but they also specify
some extra things:

- Methods for converting between the mark in question and other marks.
- Revision control functions like patching, diffing, merging, etc.

Aside from their use by Clay for storing files in the filesystem, they're also
used extensively for exchanging data with the outside world, and for exchanging
data between Gall agents. When data comes in from a remote ship, destined for a
particular Gall agent, it will be validated by the file in `/mar` that
corresponds to its mark before being delivered to the agent. If the remote data
has no corresponding mark file in `/mar` or it fails validation, it will crash
before it touches the agent.

A mark file is a door with exactly three arms. The door's sample is the data type the
mark will handle. For example, the sample of the `%noun` mark is just `non=*`,
since it handles any noun. The three arms are as follows:

- `grab`: Methods for converting _to_ our mark _from_ other marks.
- `grow`: Methods for converting _from_ our mark _to_ other marks.
- `grad`: Revision control functions.

In the context of Gall agents, you'll likely just use marks for sending and
receiving data, and not for actually storing files in Clay. Therefore, it's
unlikely you'll need to write custom revision control functions in the `grad`
arm. Instead, you can simply delegate `grad` functions to another mark -
typically `%noun`. If you want to learn more about writing such `grad`
functions, you can refer to the [Marks Guide](/docs/arvo/clay/marks/marks) in
the Clay vane documentation, which is much more comprehensive, but it's not
necessary for our purposes here.

#### Example

Here's a very simple mark file for the `action` structure we created in the
[previous section](#sur):

```hoon
/-  todo
|_  =action:todo
++  grab
  |%
  ++  noun  action:todo
  --
++  grow
  |%
  ++  noun  action
  --
++  grad  %noun
--
```

We've imported the `/sur/todo.hoon` structure library from the previous section,
and we've defined the sample of the door as `=action:todo`, since that's what
it will handle. Now let's consider the arms:

- `grab`: This handles conversion methods _to_ our mark. It contains a core with
  arm names corresponding to other marks. In this case, it can only convert from
  a `noun` mark, so that's the core's only arm. The `noun` arm simply calls the
  `action` structure from our structure library. This is called "clamming" or
  "molding" - when some noun comes in, it gets called like `(action:todo [some-noun])` - producing data of the `action` type if it nests, and crashing
  otherwise.
- `grow`: This handles conversion methods _from_ our mark. Like `grab`, it
  contains a core with arm names corresponding to other marks. Here we've also
  only added an arm for a `%noun` mark. In this case, `action` data will come in
  as the sample of our door, and the `noun` arm simply returns it, since it's
  already a noun (as everything is in Hoon).
- `grad`: This is the revision control arm, and as you can see we've simply
  delegated it to the `%noun` mark.

This mark file could be saved as `/mar/todo/action.hoon`, and then the `on-poke`
arm in the previous example could test for it instead of `%noun` like so:

```hoon
++  on-poke
  |=  [=mark =vase]
  |^  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %todo-action
    ...
```

Note how `%todo-action` will be resolved to `/mar/todo/action.hoon` - the hyphen
will be interpreted as `/` if there's not already a `/mar/todo-action.hoon`.

This simple mark file isn't all that useful. Typically, you'd add `json` arms
to `grow` and `grab`, which allow your data to be converted to and from JSON,
and therefore allow your agent to communicate with a web front-end. Front-ends,
JSON, and Eyre's APIs which facilitate such communications will be covered in
the separate [Full-Stack Walkthrough](/docs/userspace/full-stack/1-intro),
which you might like to work through after completing this guide. For now
though, it's still useful to use marks and understand how they work.

One further note on marks - while data from remote ships must have a matching
mark file in `/mar`, it's possible to exchange data between local agents with
"fake" marks - ones that don't exist in `/mar`. Your `on-poke` arm could, for
example, use a made-up mark like `%foobar` for actions initiated locally. This
is because marks come into play only at validation boundries, none of which are
crossed when doing local agent-to-agent communications.

## Permissions

In example agents so far, we haven't bothered to check where events such as
pokes are actually coming from - our example agents would accept data from
anywhere, including random foreign ships. We'll now have a look at how to handle
such permission checks.

Back in [lesson 2](/docs/userspace/gall-guide/2-agent#bowl) we discussed the
[bowl](/docs/arvo/gall/data-types#bowl). The `bowl` includes a couple of useful
fields: `our` and `src`. The `our` field just contains the `@p` of the local
ship. The `src` field contains the `@p` of the ship from which the event
originated, and is updated for every new event.

When messages come in over Ames from other ships on the network, they're
[encrypted](/docs/arvo/ames/cryptography) with our ship's public keys and signed by the ship which sent them.
The Ames vane decrypts and verifies the messages using keys in the Jael vane,
which are obtained from the [Azimuth Ethereum contract](/docs/azimuth/azimuth-eth) and [Layer 2 data](/docs/azimuth/l2/layer2) where Urbit ID ownership
and keys are recorded. This means the originating `@p` of all messages are
cryptographically validated before being passed on to Gall, so the `@p`
specified in the `src` field of the `bowl` can be trusted to be correct, which
makes checking permissions very simple.

You're free to use whatever logic you want for this, but the most common way is
to use [wutgar](/docs/hoon/reference/rune/wut#-wutgar) (`?>`) and
[wutgal](/docs/hoon/reference/rune/wut#-wutgal) (`?<`) runes, which are
respectively True and False assertions that crash if they don't evaluate to the
expected truth value. To only allow messages from the local ship, you can just
do the following in the relevant agent arm:

```hoon
?>  =(src.bowl our.bowl)
```

A common permission is to allow messages from the local ship, as well as all of
its moons, which can be done with the `team:title` standard library function:

```hoon
?>  (team:title our.bowl src.bowl)
```

If we want to only allow messages from a particular set of ships, we could, for
example, have a `(set @p)` in our agent's state called `allowed`. Then, we can
use the `has:in` set function to check:

```hoon
?>  (~(has in allowed) src.bowl)
```

If we wanted to check a ship was allowed in a particular group in the Groups
app, we could scry our ship's `%group-store` agent and compare:

```hoon
?>  .^(? %gx /(scot %p our.bowl)/group-store/(scot %da now.bowl)/groups/ship/~bitbet-bolbel/urbit-community/join/(scot %p src.bowl)/noun)
```

There are many ways to handle permissions, it all depends on your particular use
case.

## Summary

Type definitions:

- An agent's type definitions live in the `/sur` directory of a desk.
- The `/sur` file is a core, typically containing a number of lusbuc (`+$`)
  arms.
- `/sur` files are imported with the fashep (`/-`) Ford rune at the beginning
  of a file.
- Agent API types, for pokes and updates to subscribers, are commonly defined as
  head-tagged unions such as `[%foo bar=baz]`.

Mark files:

- Mark files live in the `/mar` directory of a desk.
- A mark like `%foo` corresponds to a file in `/mar` like `/mar/foo.hoon`
- Marks are file types in Clay, but are also used for passing data between
  agents as well as for external data generally.
- A mark file is a door with a sample of the data type it handles and exactly three
  arms: `grab`, `grow` and `grad`.
- `grab` and `grow` each contain a core with arm names corresponding to other marks.
- `grab` and `grow` define functions for converting to and from our mark,
  respectively.
- `grad` defines revision control functions for Clay, but you'd typically just
  delegate such functions to the `%noun` mark.
- Incoming data from remote ships will have their marks validated by the
  corresponding mark file in `/mar`.
- Messages passed between agents on a local ship don't necessarily need mark
  files in `/mar`.
- Mark files are most commonly used for converting an agent's native types to
  JSON, in order to interact with a web front-end.

Permissions:

- The source of incoming messages from remote ships are cryptographically
  validated by Ames and provided to Gall, which then populates the `src` field
  of the `bowl` with the `@p`.
- Permissions are most commonly enforced with wutgar (`?>`) and wutgal (`?<`)
  assertions in the relevant agent arms.
- Messages can be restricted to the local ship with `?> =(src.bowl our.bowl)` or to
  its moons as well with `?> (team:title our.bowl src.bowl)`.
- There are many other ways to handle permissions, it just depends on the needs
  of the particular agent.

## Exercises

- Have a quick look at the [tisket
  documentation](/docs/hoon/reference/rune/tis#-tisket).
- Try writing a mark file for the `update:todo` type, in a similar fashion to
  the `action:todo` one in the [mark file section](#mark-files). You can compare
  yours to the one we'll use in the next lesson.
