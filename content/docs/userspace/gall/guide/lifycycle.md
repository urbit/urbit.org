+++
title = "App Lifecycle and State"
weight = 4
template = "doc.html"
+++

Once you register an app with Gall using `|start`, Gall calls specific arms of
the app when the app changes.

In this lesson, you'll see everything about how Gall handles compilation, state,
resource initialization, and app upgrades. The main action here will take place
in the `+on-init`, `+on-save`, and `+on-load` arms.

We'll also get our sneak peak at calling out to Arvo for networking services.

## Example Code

We will modify the below code throughout the lesson. Paste it into a file in
`app/` called `lifecycle.hoon`.

```hoon
/+  default-agen, dbug
|%
+$  versioned-state
  $%  state-0
  ==
::
+$  state-0  [%0 val=@]
::
+$  card  card:agent:gall
::
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
::
++  on-init
  ^-  (quip card _this)
  ~&  >  'on-init'
  ~&  >>>  '%connect Eyre to %lifecycle'
  :_  this(state [%0 99])
    :~
      [%pass /bind %arvo %e %connect [~ /'~lifecycle'] %lifecycle]
    ==
++  on-save
  ~&  >  'on-save v0'
  !>(state)
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  ~&  >  'on-load v0'
  =/  prev  !<(versioned-state old-state)
  ?-  -.prev
    %0
    ~&  >>>  '%0'
    `this(state prev)
    ::
  ==
++  on-poke   on-poke:default
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?+    wire  (on-arvo:default wire sign-arvo)
      [%bind ~]
    ~&  >>  'Eyre confirmed the %connect'
    `this
  ==
++  on-fail   on-fail:default
--
```

## Preamble: `dbug`

Near the top of the file, you'll see the line `%-  agent:dbug`. This wraps our
program in the `dbug` Gall agent, which lets us inspect the state of the program
as it's running. Once our agent is started, we can type at the Dojo:

```
> :lifecycle +dbug
```

and we'll see the current state object printed out. We can also do:

```
> :lifecycle +dbug %bowl
```

and we'll see the `bowl` (generic state common to all agents) printed. We'll use
this later in the lesson.

## Experiment: 1st Successful Compilation

Before we start, just note that we are using `~&` to print messages in
`+on-init`, `+on-save`, and `+on-load`. (You can use up to 3 `>`s with `~&` to
print the debug messages in different colors).

We have some bookkeeping code in `+on-poke` and `+on-arvo` that you can ignore for
now.

### An Unexpected Problem...

Let's register the above application with Gall:

```
::  commit the new code
> |commit %home
+ /~zod/home/2/app/lifecycle/hoon

::  register the app with Gall
> |start %lifecycle
>=
activated app home/lifecycle
%path: no matches for /~zod/home/~2020.6.11..15.15.55..b397/lib/default-agen/hoon
%plan failed:
ford: %core on /~zod/home/0/app/lifecycle/hoon failed:
```

### Resolution

What happened? This message is telling us that it can't find something in `lib`:
`default-agen/hoon`. This is because we spelled the name wrong. We'll learn
about libraries in the [next lesson](/docs/userspaces/galll/guide/ford.md).

We need to fix the spelling mistake on the very first line of our program:

```hoon
/+  default-agent, dbug
```

Now commit:

```
|commit %home 
```

(If you see the commit succeed but don't see any compilation messages, run
`:goad %force` in the Dojo to force recompilation.)

You'll see the following output:

```
> |commit %home
>=
gall: loading %lifecycle
>   'on-init'
>>> '%connect Eyre to ~lifecycle'
>>  'Eyre confirmed the %connect'
activated app home/lifecycle
[unlinked from [p=~zod q=%lifecycle]]
```

Notice that `+on-init` runs on the first _successful_ compilation.

### Explanation

When Gall registers an app with `|start`, it tries to compile it. If the
compilation succeeds, it runs `+on-init`. If it fails, it keeps recompiling each
time the code is updated with `|commit`. Once compilation succeeds, it runs
`+on-init`.

After that first time, it never runs `+on-init` ever again for that app; it only
uses `+on-save` and `+on-load` after app recompilations, as we will soon see.

### What Did `+on-init` Do?

Let's look at the code of our `+on-init` arm:

```hoon
++  on-init
  ^- (quip card _this)
  ~& > 'on-init'
  ~& >>> '%connect Eyre to %lifecycle'
  :_ this(state [%0 99])
    :~
      [%pass /bind %arvo %e %connect [~ /'~lifecycle'] %lifecycle]
    ==
```

We see that it returns a `(quip card _this)`. As mentioned in the [last
lesson](/docs/userspace/gall/guide/arms.md), this type means a `list` of `card`,
along with `_this` at the end (short for `$_(this)`: the type of `this`, our
core).

Gall arms that return this structure are passing 0 or more actions (`card`s)
back to Gall to perform, and also return a new state of our app to Gall. You can
see more detail on the structure of cards in the [types
appendix](/docs/userspace/guide/appendix_types.md)--this one is an `arvo-note`.
It starts with `%pass`, which means it's like a function call. The `%e` is for
"Eyre", the Arvo networking vane. This is a command to listen for incoming HTTP
requests on address `/~lifecycle` of our ship. We'll explore this more in the
[HTTP lesson](/docs/userspace/gall/http.md).

Take it as a given for now that this HTTP `card` works. What about our new state?

We use `:_` to put the end of our return tuple first and put the heaviest code
at the bottom (the `card`). So `this(state [%0 99])` is the value of our app
that we return. Let's use `+dbug` to print the state

```
> :lifecycle +dbug
```

You should see `[%0 val=99]` as the result. (our `+on-save` debug print also prints, since `dbug` calls it).

### Initializing with 0 or More Cards

If we wanted to initialize with more than one `card`, we would put more elements
in the list created with `:~`. If we wanted 0 elements, we could do either of
the following, which are equivalent and both put ~ at the front of our tuple:

```hoon
:: Syntax 1 [~ this(state [%0 99])]

::  Syntax 2
`this(state [%0 99])
```

## After the 1st Compilation: State Transitions

OK, so we know how to initialize our app with 0 or more actions and return an
initial state for it. Let's see what happens when we make changes to the state.

### New Version of State

Make the following changes to your code:

<table> <tr> <td>:: old </td> <td>:: new</td> </tr>

<tr> <td>

```hoon
+$  versioned-state
  $%  state-0
==
```

  </td> <td>

```hoon
+$  versioned-state
  $%  state-0
      state-1
==
```

</td> </tr>

<tr> <td>

```hoon
=|  state-0
```

  </td> <td>

```hoon
=|  state-1
```

</td> </tr>

<tr> <td>

```hoon
+$  state-0  [%0 val=@]
```

</td> <td>

```hoon
+$  state-0  [%0 val=@]
+$  state-1  [%1 val=@ msg=@t]
```

</td> </tr> <tr> <td>

```hoon
:_  this(state [%0 99])
```

</td> <td>

```hoon
:_  this(state [%1 100 'msg'])
```

</td> </tr>

<tr> <td>

```hoon
~&  >  'on-save v0'
```

</td> <td>

```hoon
~&  >  'on-save v1'
```

</td> </tr> <tr> <td>

```hoon
~&  >  'on-load v0'
```

</td> <td>

```hoon
~&  >  'on-load v1'
```

</td> </tr> <tr> <td>

```hoon
    %0
    ~&  >>>  '%0'
    `this(state prev)
```

</td> <td>

```hoon
    %0
    ~&  >>>  '%0'
    `this(state [%1 +(val.prev) 'my message'])
    ::
    %1
    ~&  >>>  '%1'
    `this(state prev)
```

</td> </tr> </table>

### State Transition Mechanics

Now commit, and you will see something like this:

```
> |commit %home
>=
: /~zod/home/7/app/lifecycle/hoon
>   'on-save v0'
>   'on-load v1'
>>> '%0'
```

And let's also check the current state:

```
> :lifecycle +dbug
[%1 val=100 msg='my message']
```

Notice that while our state updated as expected, we can see from the debug
prints that Gall called the `"v0"` version of `+on-save`, and the `"v1"` version
of `+on-load`. Why?

Because after each successful compilation, Gall calls:

- `+on-save` of the _prior_ version of the app
- `+on-load` of the _new_ version of the app

This allows Gall to move the data from a working prior version to our new
version.

We also change our `+on-init`, so that users installing the app from scratch end
up in a consistent state with those who upgrade via `+on-load`.

### Adding an Action after `+on-init` Has Already Run

Let's say we want to undo the Eyre binding that we did in `+on-init`. How is that
possible, given that `+on-init` only runs once?

The answer is that `+on-load` also returns `(quip card this)`, so we can return
cards instead of altering state as part of the transition to a new state.

### Example: Disconnect Our Eyre Binding

To illustrate this, make the following modifications to the code:

<table> <tr> <td>:: old </td> <td>:: new</td> </tr>

<tr> <td>

```hoon
+$  versioned-state
  $%  state-0
      state-1
  ==
```

</td> <td>

```hoon
+$  versioned-state
  $%  state-0
      state-1
      state-2
  ==
```

</td> </tr> <tr> <td>

```hoon
+$  state-0  [%0 val=@]
+$  state-1   [%1 val=@ msg=@t]
```

</td> <td>

```hoon
+$  state-0   [%0 val=@]
+$  state-1   [%1 val=@ msg=@t]
+$  state-2   [%2 val=@ msg=@t]
```

</td> </tr>

<tr> <td>

```hoon
=|  state-1
```

  </td> <td>

```hoon
=|  state-2
```

</td> </tr>

<tr> <td>

```hoon
:_  this(state [%1 100 'msg'])
:~
  [%pass /bind %arvo %e %connect [~ /'~lifecycle'] %lifecycle]
==
```

</td>

<td>

```hoon
:_  this(state [%2 100 'msg'])
~
```

</td> </tr>

<tr> <td>

```hoon
~&  >  'on-save v1'
```

</td> <td>

```hoon
~&  >  'on-save'
```

</td> </tr> <tr> <td>

```hoon
~&  >  'on-load v1'
```

</td> <td>

```hoon
~&  >  'on-load
```

</td> </tr> <tr> <td>

```hoon
%0
~&  >>>  '%0'
`this(state [%1 +(val.prev) 'my message'])
::
%1
~&  >>>  '%1'
`this(state prev)
```

</td> <td>

```hoon
%0
~&  >>>  '%0'
:_  this(state [%2 +(val.prev) 'my message'])
~[[%pass /bind %arvo %e %disconnect [~ /'~lifecycle']]]
::
%1
~&  >>>  '%1'
:_  this(state [%2 +.prev])
~[[%pass /bind %arvo %e %disconnect [~ /'~lifecycle']]]
::
%2
`this(state prev)
```

</td> </tr> </table>

Our new `state-2` is the same as `state-1`--we're just going to add an action in
the transition from `%1` to `%2`.

The `%1` case now returns a card that disconnects our app from Eyre (no more
listening for incoming traffic at a URL), and updates its head to `%2`. We also
alter the `%0` case to do _both_ the state update and the card update, and bump
our version all the way to `%2`, in case a user of our app missed the `%1`
update.

We update `+on-init` to remove our Eyre call, since new installs shouldn't
connect at all now.

Let's commit and see the result of recompiling:

```
> |commit %home
>=
: /~zod/home/20/app/lifecycle/hoon
>   'on-save v1'
>   'on-load'
>>> '%1'
> :lifecycle +dbug
[%2 val=100 msg='my message']
```

You can play around and change some of the print messages to force
recompilation. However, the state will remain the same, because when we're in
state `%2`, it simply sets the current state to the previous (i.e no change).

## Gall-Managed App State: the `bowl`

In addition to any state that we put inside our agent, we also have access to
some state that Gall keeps track of and injects whenever it calls an arm in our
agent. That state is of type `bowl:gall`, and it is common to all Gall agents.

Near the top of our `lifecycle.hoon` file, we have:

```hoon
^-  agent:gall
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
```

The key here is `|_ =bowl:gall`, which says that our agent is a door that takes
a parameter of type `bowl:gall` called `bowl`. We also pass that to
`default-agent` when we initialize that core, and if you use a helper core,
you'd pass it also (we'll see this in later lessons).

You can find the type definition of `bowl` in `/sys/lull.hoon` if you search for
`++  bowl`. For now, just know that it contains our ship name, the name of the
ship that made the current call to us, the name of our agent, the current time,
fresh entropy, and data about any subscriptions our agent has from or to it.

We can print `bowl` for this app by entering at the Dojo:

```
> :lifecycle +dbug %bowl

::  you should see something like:
>>  [ [our=~zod src=~zod dap=%lifecycle]
  [wex={} sup={}]
  act=4
    eny
  \/0v3mh.pdbr4.15e5c.qlakl.ob41u.2f64d.3gauk.r3pm0.q6pv1.h76h0.98kpl.5godq.tvu1u.tdfs7.rjju9.j6vij.m3vmo.78pmb.8dfbd.\/
    07nlt.58v8l
  \/                                                                                                                  \/
  now=~2020.6.18..14.50.18..d5f3
  byk=[p=~zod q=%home r=[%da p=~2020.6.18..14.50.06..5bec]]
]
```

## A Note on `+on-save`

`+on-save` is mostly used by Gall itself to transition between state versions.
However, it's also used by `dbug` to get the current state of the app wrapped by
`dbug`. This is possible because `dbug` takes an `agent:gall` itself as an
argument, so it has access to calling all of that `agent`'s arms.

## Summary: Full Gall Compilation Lifecycle

We're now ready to explicitly state Gall's compiliation lifecycle.

1. Register an app.
2. Compile it every time its code changes.
3. Run `+on-init` the first time it compiles successfully, and never again after
   that.
4. For all other successful compilations, call the _previous_ version of
   `+on-save` and pass its output to the _current_ version of `+on-load`.

Remember, the point of `+on-init` is to get fresh installs of your app into the
correct state with the correct cards passed out.

State transitions can be either actions passed to the system or updates to app
state.

Because `+on-load` is executed after every successful recompilation, it's useful
to put a debug print in `+on-load` like `'app recompiled successfully'`, so that
you can quickly see that things have worked. You can just add a space in that
text and re-`commit` if you want to force re-compilation.

If you want to iterate until you get your `+on-init` right, I recommend using the
"Faster Fakeship Startup" method from the [workflow lesson](workflow.md).

## Exercises

### Code Reading

1. Find 2 Gall agents in `app` that return cards as part of their `+on-load`.

- Explain what you think the cards are doing
- Is the action the cards are doing repeated in `+on-init`? Why or why not? (The
  answer could vary from program to program).

2. Refer to this version of
   [file-server.hoon](https://github.com/urbit/urbit/commit/0d1930b6ac4d2b001a973089f3999758ee09d7d0)

- Where are its `versioned-state` and `state-0` defined?
- What is the advantage of this approach?
- What does the new version of the state (`state-1`) enable that `state-0` did
  not? (The transition in `+on-load` gives some hints here)

### Code Modification

- Modify `app/chat-store.hoon` in a fake ship to have a new state, `state-4`.
  This state should include the `inbox` from the prior state, but add a `(set
  ship)` with face `bad-people`.
- Get it to work in `on-load`, and initialize `bad-people` to contain the ship
  `~timluc-miptev`.
- Update `+on-init` to have `~timluc-miptev` in its initial `bad-people` if the
  app is installed from scratch.

### `picky` Planning

List the types of cards that you think your chat admin app will need to pass in
its `+on-init`, either to Arvo or other agents. You should refer to your feature
list from the prior lesson's exercises.

