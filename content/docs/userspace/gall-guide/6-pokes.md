+++
title = "6. Pokes"
weight = 30
template = "doc.html"
+++

In this lesson we'll look at sending and receiving one-off messages called
`%poke`s. We'll look at the `on-poke` agent arm which handles incoming pokes.
We'll also introduce the `on-agent` arm, and look at the one kind of response it can
take - a `%poke-ack`.

## Receiving a poke

Whenever something tries to poke your agent, Gall calls your agent's `on-poke`
arm and give it the `cage` from the poke as its sample. The `on-poke` arm will
produce a `(quip card _this)`. Here's how it would typically begin:

```hoon
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ...
```

The sample of the gate is usually specified as a cell of `mark` and `vase`
rather than just `cage`, simply because it's easier to work with.

Typically, you'd first test the `mark` with something like a
[wutlus](/docs/hoon/reference/rune/wut#-wutlus) `?+` expression, passing
unexpected `mark`s to `default-agent`, which just crashes. We'll look at custom
`mark`s in a subsequent lesson, but the basic patten looks like:

```hoon
?+  mark  (on-poke:def mark vase)
  %noun            ...
  %something-else  ...
  ...
==
```

After testing the `mark`, you'd usually extract the `vase` to the expected type,
and then apply whatever logic you need. For example:

```hoon
=/  action  !<(some-type vase)
?-  -.action
  %foo  ...
  %bar  ...
  ...
==
```

Your agent will then produce a list of `card`s to be sent off and a new,
modified state, as appropriate. We'll go into subscriptions in the next lesson,
but just to give you an idea of a typical pattern: An agent for a chat app might
take new messages as pokes, add them to the list of messages in its state, and
send out the new messages to subscribed chat participants as `gift`s.

As discussed in the previous lesson, Gall will automatically send a `%poke-ack`
`gift` back to wherever the poke came from. The `%poke-ack` will be a nack if
your agent crashed while processing the poke, and an ack otherwise. If it's a
nack, the `tang` in the `%poke-ack` will contain a stack trace of the crash.

As a result, you do not need to explicitly send a `%poke-ack`. Instead, you
would design your agent to handle only what you expect and crash in all other
cases. You can crash by passing the `cage` to `default-agent`, or just with a
`!!`. In the latter case, if you want to add an error message to the stack
trace, you can do so like:

```hoon
~|  "some error message"
!!
```

This will produce a trace that looks something like:

```
/sys/vane/gall/hoon:<[1.372 9].[1.372 37]>
/app/pokeme/hoon:<[31 3].[43 5]>
/app/pokeme/hoon:<[32 3].[43 5]>
/app/pokeme/hoon:<[34 5].[42 7]>
/app/pokeme/hoon:<[35 5].[42 7]>
/app/pokeme/hoon:<[38 7].[41 27]>
/app/pokeme/hoon:<[39 9].[40 11]>
"some error message"
/app/pokeme/hoon:<[40 9].[40 11]>
```

Note that the `tang` in the nack is just for debugging purposes, you should not
try to pass actual data by encoding it in the nack `tang`.

## Sending a poke

An agent can send pokes to other agents by producing [`%poke`
`card`s](/docs/userspace/gall-guide/5-cards#pokes). Any agent arm apart from
`on-peek` and `on-save` can produce such `card`s. The arms would typically
produce the `(quip card _this)` like so:

```hoon
:_  this
:~  [%pass /some/wire %agent [~target-ship %target-agent] %poke %some-mark !>('some data')]
==
```

The [colcab](/docs/hoon/reference/rune/col#_-colcab) (`:_`) rune makes an
inverted cell, it's just `:-` but with the head and tail swapped. We use colcab
to produce the `(quip card _this)` because the list of cards is "heavier"
here than the new agent core expression (`this`), so it makes it more
readable.

### Receiving the `%poke-ack`

The pokes will be processed by their targets [as described in the previous
section](#receiving-a-poke), and they'll `%give` back a `%poke-ack` on the
`wire` you specified (`/some/wire` in the previous example). When Gall gets the
`%poke-ack` back, it will call the `on-agent` arm of your agent, with the `wire`
it came in on and the `%poke-ack` itself in a `sign:agent:gall`. Your `on-agent`
arm would therefore begin like so:

```hoon
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ...
```

A `sign:agent:gall` (henceforth just `sign`) is defined in `lull.hoon` as:

```hoon
+$  sign
  $%  [%poke-ack p=(unit tang)]
      [%watch-ack p=(unit tang)]
      [%fact =cage]
      [%kick ~]
  ==
```

It's basically the same as a [`gift`](/docs/userspace/gall-guide/5-cards#give),
but incoming instead of outgoing.

The simplest way to handle a `%poke-ack` by passing it to `default-agent`'s
`on-agent` arm, which will just print an error message to the terminal if it's a
nack, and otherwise do nothing. Sometimes you'll want your agent to do something
different depending on whether the poke failed or succeeded (and therefore
whether it's a nack or an ack).

As stated in the [Precepts](/docs/development/precepts#specifics): "Route on wire before sign, never sign before wire.". Thus we first test the
`wire` so you can tell what the `%poke-ack` was for. You might do something
like:

```hoon
?+  wire  (on-agent:def wire sign)
  [%some %wire ~]  ...
  ...
==
```

After that, you'll need to see what kind of `sign` it is:

```hoon
?+  -.sign  (on-agent:def wire sign)
  %poke-ack  ...
  ...
```

Then, you can tell whether it's an ack or a nack by testing whether the `(unit tang)` in the `%poke-ack` is null:

```hoon
?~  p.sign
  ...(what to do if the poke succeeded)...
...(what to do if the poke failed)...
```

Finally, you can produce the `(quip card _this)`.

## Example

We're going to look at a couple of agents to demonstrate both sending and
receiving pokes. Here's the first, an agent that receives pokes:

### `pokeme.hoon`

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
  `this
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
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    =/  action  !<(?(%inc %dec) vase)
    ?-    action
      %inc  `this(val +(val))
    ::
        %dec
      ?:  =(0 val)
        ~|  "Can't decrement - already zero!"
        !!
      `this(val (dec val))
    ==
  ==
::
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
```

This is a very simple agent that just has `val`, a number, in its state. It will
take pokes that either increment or decrement `val`. Here's its `on-poke` arm:

```hoon
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    =/  action  !<(?(%inc %dec) vase)
    ?-    action
        %inc  `this(val +(val))
        %dec
      ?:  =(0 val)
        ~|  "Can't decrement - already zero!"
        !!
      `this(val (dec val))
    ==
  ==
```

It only expects pokes with a `%noun` mark, and passes all others to
`on-poke:def`, which just crashes. For `%noun` pokes, it expects to receive
either `%inc` or `%dec` in the `vase`. If it's `%inc`, it produces a new `this`
with `val` incremented. If it's `%dec`, it produces `this` with `val`
decremented, or crashes if `val` is already zero.

Let's try it out. Save the agent above as `/app/pokeme.hoon` in the `%base` desk
and `|commit %base`. Then, start it up with `|rein %base [& %pokeme]`. We can
check its initial state with `dbug`:

```
>   0
> :pokeme +dbug [%state %val]
>=
```

Next, we'll try poking it. The dojo lets you poke agents with the following syntax:

```
:agent-name &some-mark ['some' 'noun']
```

If the `mark` part is omitted, it'll just default to `%noun`. Since our agent
only takes a `%noun` mark, we can skip that. The rest will be packed in a vase
by the dojo and delivered as a poke, so we can do:

```
> :pokeme %inc
>=
```

If we now look at the state with `dbug`, we'll see the poke was successful and
it's been incremented:

```
>   1
> :pokeme +dbug [%state %val]
>=
```

Let's try decrement:

```
> :pokeme %dec
>=
>   0
> :pokeme +dbug [%state %val]
>=
```

As you can see, it's back at zero. If we try again, we'll see it fails, and the
dojo will print the `tang` in the `%poke-ack` nack:

```
> :pokeme %dec
/sys/vane/gall/hoon:<[1.372 9].[1.372 37]>
/app/pokeme/hoon:<[31 3].[43 5]>
/app/pokeme/hoon:<[32 3].[43 5]>
/app/pokeme/hoon:<[34 5].[42 7]>
/app/pokeme/hoon:<[35 5].[42 7]>
/app/pokeme/hoon:<[38 7].[41 27]>
/app/pokeme/hoon:<[39 9].[40 11]>
"Can't decrement - already zero!"
/app/pokeme/hoon:<[40 9].[40 11]>
dojo: app poke failed
```

### `pokeit.hoon`

Here's a second agent. It takes a poke of `%inc` or `%dec` like before, but
rather than updating its own state, it sends two pokes to `%pokeme`, so
`%pokeme`'s state will be incremented or decremented by two.

```hoon
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 ~]
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
  `this
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
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    =/  action  !<(?(%inc %dec) vase)
    ?-    action
        %inc
      :_  this
      :~  [%pass /inc %agent [our.bowl %pokeme] %poke %noun !>(%inc)]
          [%pass /inc %agent [our.bowl %pokeme] %poke %noun !>(%inc)]
      ==
    ::
        %dec
      :_  this
      :~  [%pass /dec %agent [our.bowl %pokeme] %poke %noun !>(%dec)]
          [%pass /dec %agent [our.bowl %pokeme] %poke %noun !>(%dec)]
      ==
    ==
  ==
::
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire  (on-agent:def wire sign)
      [%inc ~]
    ?.  ?=(%poke-ack -.sign)
      (on-agent:def wire sign)
    ?~  p.sign
      %-  (slog '%pokeit: Increment poke succeeded!' ~)
      `this
    %-  (slog '%pokeit: Increment poke failed!' ~)
    `this
  ::
      [%dec ~]
    ?.  ?=(%poke-ack -.sign)
      (on-agent:def wire sign)
    ?~  p.sign
      %-  (slog '%pokeit: Decrement poke succeeded!' ~)
      `this
    %-  (slog '%pokeit: Decrement poke failed!' ~)
    `this
  ==
::
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
```

Here's the `on-poke` arm:

```hoon
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    =/  action  !<(?(%inc %dec) vase)
    ?-    action
        %inc
      :_  this
      :~  [%pass /inc %agent [our.bowl %pokeme] %poke %noun !>(%inc)]
          [%pass /inc %agent [our.bowl %pokeme] %poke %noun !>(%inc)]
      ==
        %dec
      :_  this
      :~  [%pass /dec %agent [our.bowl %pokeme] %poke %noun !>(%dec)]
          [%pass /dec %agent [our.bowl %pokeme] %poke %noun !>(%dec)]
      ==
    ==
  ==
```

It's similar to `%pokeme`, except it sends two `%poke` `card`s to `%pokeme` for
each case, rather than modifying its own state. The `%inc` pokes specify a
`wire` of `/inc`, and the `%dec` pokes specify a `wire` of `/dec`, so we can
differentiate the responses. It also has the following `on-agent`:

```hoon
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire  (on-agent wire sign)
      [%inc ~]
    ?.  ?=(%poke-ack -.sign)
      (on-agent wire sign)
    ?~  p.sign
      %-  (slog '%pokeit: Increment poke succeeded!' ~)
      `this
    %-  (slog '%pokeit: Increment poke failed!' ~)
    `this
  ::
      [%dec ~]
    ?.  ?=(%poke-ack -.sign)
      (on-agent wire sign)
    ?~  p.sign
      %-  (slog '%pokeit: Decrement poke succeeded!' ~)
      `this
    %-  (slog '%pokeit: Decrement poke failed!' ~)
    `this
  ==
```

`on-agent` tests the `wire`, checks if it's a `%poke-ack`, and then prints to
the terminal whether it succeeded or failed.

Save this agent to `/app/pokeit.hoon` on the `%base` desk, `|commit %base`, and
start it with `|rein %base [& %pokeme] [& %pokeit]`.

Let's try it out:

```
%pokeit: Increment poke succeeded!
%pokeit: Increment poke succeeded!
> :pokeit %inc
>=
```

`%pokeit` has received positive `%poke-ack`s, which means both pokes succeeded.
It could tell they were increments because the `%poke-ack`s came back on the
`/inc` wire we specified. We can check the state of `%pokeme` to confirm:

```
>   2
> :pokeme +dbug [%state %val]
>=
```

Let's try decrementing `%pokeme` so it's an odd number, and then try a `%dec`
via `%pokeit`:

```
> :pokeme %dec
>=
%pokeit: Decrement poke succeeded!
%pokeit: Decrement poke failed!
> :pokeit %dec
>=
```

The `on-agent` arm of `%pokeit` has received one ack and one nack. The first
took `val` to zero, and the second crashed trying to decrement below zero.

## Summary

- Incoming pokes go to the `on-poke` arm of an agent.
- The `on-poke` arm takes a `cage` and produces an `(quip card _this)`.
- Gall will automatically return a `%poke-ack` to the poke's source, with a
  stack trace in the `(unit tang)` if your agent crashed while processing the
  poke.
- Outgoing pokes can be sent by including `%poke` `%pass` `card`s in the `quip`
  produced by most agent arms.
- `%poke-ack`s in response to pokes you've sent will come in to the `on-agent`
  arm in a `sign`, on the `wire` you specified in the original `%poke` `card`.
- You can poke agents from the dojo with a syntax of `:agent &mark ['some' 'noun']`.

## Exercises

- Run through the [example](#example) yourself on a fake ship if you've not done
  so already.
- Have a look at the `on-agent` arm of `/lib/default-agent.hoon` to see how
  `default-agent` handles incoming `sign`s.
- Try modifying the `%pokeme` agent with another action of your choice (in
  addition to `%inc` and `%dec`).
- Try modifying the `%pokeit` agent to send your new type of poke to `%pokeme`,
  and handle the `%poke-ack` it gets back.
