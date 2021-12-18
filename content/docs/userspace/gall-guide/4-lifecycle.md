+++
title = "4. Lifecycle"
weight = 20
template = "doc.html"
+++

In the last lesson we looked at a couple of useful things used as boilerplate in
most agents. Now we're going to get into the guts of how agents work, and start
looking at what the agent arms do. The first thing we'll look at is the agent's
state, and the three arms for managing it: `on-init`, `on-save`, and `on-load`.
These arms handle what we call an agent's "lifecycle".

## Lifecycle

An agent's lifecycle starts when it's first installed. At this point, the
agent's `on-init` arm is called. This is the _only_ time `on-init` is ever
called - its purpose is just to initialize the agent. The `on-init` arm might be
very simple and just set an initial value for the state, or even do nothing at
all and return the agent core exactly as-is. It may also be more complicated,
and perform some [scries](/docs/arvo/concepts/scry) to obtain extra data or
check that another agent is also installed. It might send off some `card`s to
other agents or vanes to do things like load data in to the `%settings-store`
agent, bind an Eyre endpoint, or anything else. It all depends on the needs of
your particular application. If `on-init` fails for whatever reason, the agent
installation will fail and be aborted.

Once initialized, an agent will just go on doing its thing - processing events,
updating its state, producing effects, etc. At some point, you'll likely want to
push an update for your agent. Maybe it's a bug fix, maybe you want to add extra
features. Whatever the reason, you need to change the source code of your agent,
so you commit a modified version of the file to Clay. When the commit completes, Gall updates the app as follows:

- The agent's `on-save` arm is called, which packs the agent's state in a `vase`
  and exports it.
- The new version of the agent is built and loaded into Gall.
- The previously exported `vase` is passed to the `on-load` arm of the newly
  built agent. The `on-load` arm will process it, convert it to the new version
  of the state if necessary, and load it back into the state of the agent.

A `vase` is just a cell of `[type-of-the-noun the-noun]`. Most data an agent
sends or receives will be encapsulated in a vase. A vase is made with the
[zapgar](/docs/hoon/reference/rune/zap#-zapgar) (`!>`) rune like
`!>(some-data)`, and unpacked with the
[zapgal](/docs/hoon/reference/rune/zap#-zapgal) (`!<`) rune like
`!<(type-to-extract vase)`. Have a read through the [`vase` section of the type
reference for details](/docs/userspace/gall-guide/types#vase).

We'll look at the three arms described here in a little more detail, but first
we need to touch on the state itself.

## Versioned state type

In the previous lesson we introduced the idea of composing additional cores into
the subject of the agent core. Here we'll look at using such a core to define
the type of the agent's state. In principle, we could make it as simple as this:

```hoon
|%
+$  my-state-type  @ud
--
```

However, when you update your agent as described in the [Lifecycle](#lifecycle)
section, you may want to change the type of the state itself. This means
`on-load` might find different versions of the state in the `vase` it receives,
and it might not be able to distinguish between them.

For example, if you were creating an agent for a To-Do task management app, your
tasks might initially have a `?(%todo %done)` union to specify whether they're
complete or not. Something like:

```hoon
(map task=@t status=?(%todo %done))
```

At some point, you might want to add a third status to represent "in progress",
which might involve changing `status` like:

```hoon
(map title=@t status=?(%todo %done %work))
```

The conventional way to keep this managable and reliably differentiate possible
state types is to have _versioned states_. The first version of the state would
typically be called `state-0`, and its head would be tagged with `%0`. Then,
when you change the state's type in an update, you'd add a new structure called
`state-1` and tag its head with `%1`. The next would then be `state-2`, and so
on.

In addition to each of those individual state versions, you'd also define a
structure called `versioned-state`, which just contains a union of all the
possible states. This way, the vase `on-load` receives can be unpacked to a
`versioned-state` type, and then a
[wuthep](/docs/hoon/reference/rune/wut#--wuthep) (`?-`) expression can switch on
the head (`%0`, `%1`, `%2`, etc) and process each one appropriately.

For example, your state definition core might initially look like:

```hoon
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 tasks=(map title=@t status=?(%todo %done))]
--
```

When you later update your agent with a new state version, you'd change it to:

```hoon
|%
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0  [%0 tasks=(map title=@t status=?(%todo %done))]
+$  state-1  [%1 tasks=(map title=@t status=?(%todo %done %work))]
--
```

Another reason for versioning the state type is that there may be cases where
the state type doesn't change, but you still want to apply special transition
logic for an old state during upgrade. For example, you may need to reprocess
the data for a new feature or to fix a bug.

## Adding the state

Along with a core defining the type of the state, we also need to actually add
it to the subject of the core. The conventional way to do this is by adding the following immediately before the agent core itself:

```hoon
=|  state-0
=*  state  -
```

The first line bunts (produces the default value) of the state type we defined
in the previous core, and adds it to the head of the subject _without a face_.
The next line uses [tistar](/docs/hoon/reference/rune/tis#-tistar) to give it
the name of `state`. You might wonder why we don't just give it a face when we
bunt it and skip the tistar part. If we did that, we'd have to refer to `tasks`
as `tasks.state`. With tistar, we can just reference `tasks` while also being
able to reference the whole `state` when necessary.

Note that adding the state like this only happens when the agent is built - from
then on the arms of our agent will just modify it.

## State management arms

We've described the basic lifecycle process and the purpose of each state
management arm. Now let's look at each arm in detail:

### `on-init`

This arm takes no argument, and produces a `(quip card _this)`. It's called
exactly once, when the agent is first installed. Its purpose is to initialize
the agent.

`(quip a b)` is equivalent to `[(list a) b]`, see the [types
reference](/docs/userspace/gall-guide/types#quip) for details.

A `card` is a message to another agent or vane. We'll discuss `card`s in detail
later.

`this` is our agent core, which we give the `this` alias in the virtual arm
described in the previous lesson. The underscore at the beginning is the
irregular syntax for the [buccab](/docs/hoon/reference/rune/buc#_-buccab) (`$_`)
rune. Buccab is like an inverted bunt - instead of producing the default value
of a type, instead it produces the type of some value. So `_this` means "the
type of `this`" - the type of our agent core.

Recall that in the last lesson, we said that most arms return a cell of
`[effects new-agent-core]`. That's exactly what `(quip card _this)` is.

### `on-save`

This arm takes no argument, and produces a `vase`. Its purpose is to export the
state of an agent - the state is packed into the vase it produces. The main time
it's called is when an agent is upgraded. When that happens, the agent's state
is exported with `on-save`, the new version of the agent is compiled and loaded,
and then the state is imported back into the new version of the agent via the
[`on-load`](#on-load) arm.

As well as the agent upgrade process, `on-save` is also used when an agent is
suspended or an app is uninstalled, so that the state can be restored when it's
resumed or reinstalled.

The state is packed in a vase with the
[zapgar](/docs/hoon/reference/rune/zap#-zapgar) (`!>`) rune, like `!>(state)`.

### `on-load`

This arm takes a `vase` and produces a `(quip card _this)`. Its purpose is to
import a state previously exported with [`on-save`](#on-save). Typically
you'd have used a [versioned state](#versioned-state-type) as described above,
so this arm would test which state version the imported data has, convert data
from an old version to the new version if necessary, and load it into the
`state` wing of the subject.

The vase would be unpacked with a
[zapgal](/docs/hoon/reference/rune/zap#-zapgal) (`!<`) rune, and then typically
you'd test its version with a [wuthep](/docs/hoon/reference/rune/wut#--wuthep)
(`?-`) expression.

## Example

Here's a new agent to demonstrate the concepts we've discussed here:

```hoon
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 val=@ud]
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
::
++  on-init
  ^-  (quip card _this)
  `this(val 42)
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==
::
++  on-poke   on-poke:def
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
```

Let's break it down and have a look at the new parts we've added. First, the
state core:

```hoon
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 val=@ud]
+$  card  card:agent:gall
--
```

In `state-0` we've defined the structure of our state, which is just a `@ud`.
We've tagged the head with a `%0` constant representing the version number, so
`on-load` can easily test the state version. In `versioned-state` we've created
a union and just added our `state-0` type. We've added an extra `card` arm as
well, just so we can use `card` as a type, rather than the unweildy
`card:agent:gall`.

After that core, we have the usual `agent:dbug` call, and then we have this:

```hoon
=|  state-0
=*  state  -
```

We've just bunted the `state-0` type, which will produce `[%0 val=0]`, pinning
it to the head of the subject. Then, we've use
[tistar](/docs/hoon/reference/rune/tis#-tistar) (`=*`) to give it a name of
`state`.

Inside our agent core, we have `on-init`:

```hoon
++  on-init
  ^-  (quip card _this)
  `this(val 42)
```

The `a(b c)` syntax is the irregular form of the
[centis](/docs/hoon/reference/rune/cen#-centis) (`%=`) rune. You'll likely be
familiar with this from recursive functions, where you'll typically call the buc
arm of a trap like `$(a b, c d, ...)`. It's the same concept here - we're saying
`this` (our agent core) with `val` replaced by `42`. Since `on-init` is only
called when the agent is first installed, we're just initializing the state.

Next we have `on-save`:

```hoon
++  on-save
  ^-  vase
  !>(state)
```

This exports our agent's state, and is called during upgrades, suspensions, etc.
We're having it pack the `state` value in a `vase`.

Finally, we have `on-load`:

```hoon
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==
```

It takes in the old state in a `vase`, then unpacks it to the `versioned-state`
type we defined earlier. We test its head for the version, and load it back into
the state of our agent if it matches. This test is a bit redundant at this stage
since we only have one state version, but you'll soon see the purpose of it.

You can save it as `/app/lifecycle.hoon` in the `%base` desk and `|commit %base`. Then, run `|rein %base [& %lifecycle]` to start it.

Let's try inspecting our state with `dbug`:

```
>   [%0 val=42]
> :lifecycle +dbug
>=
```

`dbug` can also dig into the state with the `%state` argument, printing the value of the specified face:

```
>   42
> :lifecycle +dbug [%state %val]
>=
```

Next, we're going to modify our agent and change the structure of the state so
we can test out the upgrade process. Here's a modified version, which you can
again save in `/app/lifecycle.hoon` and `|commit %base`:

```hoon
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0  [%0 val=@ud]
+$  state-1  [%1 val=[@ud @ud]]
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-1
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
::
++  on-init
  ^-  (quip card _this)
  `this(val [27 32])
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %1  `this(state old)
    %0  `this(state 1+[val.old val.old])
  ==
::
++  on-poke   on-poke:def
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
```

As soon as you `|commit` it, Gall will immediately export the existing state
with `on-save`, build the new version of the agent, then import the state back
in with `on-load`.

In the state definition core, you'll see we've added a new state version with a different structure:

```hoon
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0  [%0 val=@ud]
+$  state-1  [%1 val=[@ud @ud]]
+$  card  card:agent:gall
--
```

We've also changed the part that adds the state, so it uses the new version instead:

```hoon
=|  state-1
=*  state  -
```

In `on-init`, we've updated it to initialize the state with a value that fits the new type we've defined:

```hoon
++  on-init
  ^-  (quip card _this)
  `this(val [27 32])
```

`on-init` won't be called in this case, but if someone were to directly install
this new version of the agent, it would be, so we still need to update it.

`on-save` has been left unchanged, but `on-load` has been updated like so:

```hoon
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %1  `this(state old)
    %0  `this(state 1+[val.old val.old])
  ==
```

We've updated the `?-` expression with a new case that handles our new state
type, and for the old state type we've added a function that converts it to the
new type - in this case by duplicating `val` and changing the head-tag from `%0`
to `%1`. This is an extremely simple state type transition function - it would
likely be more complicated for an agent with real functionality.

Let's now use `dbug` to confirm our state has successfully been updated to the new
type:

```
>   [%1 val=[42 42]]
> :lifecycle +dbug
>=
```

## Summary

- The app lifecycle rougly consists of initialization, state export, upgrade,
  state import and state version transition.
- This is managed by three arms: `on-init`, `on-save` and `on-load`.
- `on-init` initializes the agent and is called when it's first installed.
- `on-save` exports the agent's state and is called during upgrade or
  when an app is suspended.
- `on-load` imports an agent's state and is called during upgrade or
  when an app is unsuspended. It also handles converting data from old
  state versions to new state versions.
- The type of an agent's state is typically defined in a separate core.
- The state type is typically versioned, with a new type definition for each
  version of the state.
- The state is initially added by bunting the state type and then naming it
  `state` with the tistar (`=*`) rune, so its contents can be referenced
  directly.
- A `vase` is a cell of `[type-of-the-noun the-noun]`.
- `(quip a b)` is the same as `[(list a) b]`, and is the `[effects new-agent-core]` pair returned by many arms of an agent core.

## Exercises

- Run through the [example](#example) yourself on a fake ship if you've not done
  so already.
- Have a look at the [`vase` entry in the type
  reference](/docs/userspace/gall-guide/types#vase).
- Have a look at the [`quip` entry in the type
  reference](/docs/userspace/gall-guide/types#quip).
- Try modifying the second version of the agent in the [example](#example)
  section, adding a third state version. Include functions in the wuthep
  expression in `on-load` to convert old versions to your new state type.
