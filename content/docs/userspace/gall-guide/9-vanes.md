+++
title = "9. Vanes"
weight = 45
template = "doc.html"
+++

In this lesson we're going to look at interacting with vanes (kernel modules).
The API for each vane consists of `task`s it can take, and `gift`s it can
return. The `task`s and `gift`s for each vane are defined in its section of
`lull.hoon`. Here's the `task:iris`s and `gift:iris`s for Iris, the HTTP client
vane, as an example:

```hoon
|%
+$  gift
  $%  [%request id=@ud request=request:http]
      [%cancel-request id=@ud]
      [%http-response =client-response]
  ==
+$  task
  $~  [%vega ~]
  $%  $>(%born vane-task)
      $>(%trim vane-task)
      $>(%vega vane-task)
      [%request =request:http =outbound-config]
      [%cancel-request ~]
      [%receive id=@ud =http-event:http]
  ==
```

The API of each vane is documented in its respective section of the [Arvo
documentation](/docs/arvo/overview). Each vane has a detailed API reference and
examples of their usage. There are far too many `task`s and `gift`s across the
vanes to cover here, so in the [`Example`](#example) section of this document,
we'll just look at a single, simple example with a Behn timer. The basic pattern
in the example is broadly applicable to the other vanes as well.

## Sending a vane task

A `task` can be sent to a vane by `%pass`ing it an `%arvo` card. We touched on
these in the [Cards](/docs/userspace/gall-guide/5-cards) lesson, but we'll
briefly recap it here. The type of the card is as follows:

```hoon
[%pass path %arvo note-arvo]
```

The `path` will just be the `wire` you want the response to arrive on. The
`note-arvo` is the following union:

```hoon
+$  note-arvo
  $~  [%b %wake ~]
  $%  [%a task:ames]
      [%b task:behn]
      [%c task:clay]
      [%d task:dill]
      [%e task:eyre]
      [%g task:gall]
      [%i task:iris]
      [%j task:jael]
      [%$ %whiz ~]
      [@tas %meta vase]
  ==
```

The letter tags just specify which vane it goes to, and then follows the `task`
itself. Here are a couple of examples. The first sends a `%wait` `task:behn` to
Behn, setting a timer to go off one minute in the future. The second sends a
`%warp` `task:clay` to Clay, asking whether `sys.kelvin` exists on the `%base`
desk.

```hoon
[%pass /some/wire %arvo %b %wait (add ~m1 now.bowl)]
[%pass /some/wire %arvo %c %warp our.bowl %base ~ %sing %u da+now.bowl /sys/kelvin]
```

## Receiving a vane gift

Once a `task` has been sent to a vane, any `gift`s the vane sends back in
response will arrive in the `on-arvo` arm of your agent. The `on-arvo` arm
exclusively handles such vane `gift`s. The `gift`s will arrive in a `sign-arvo`,
along with the `wire` specified in the original request. The `on-arvo` arm
produces a `(quip card _this)` like usual, so it would look like:

```hoon
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  .....
```

A `sign-arvo` is the following structure, defined in `lull.hoon`:

```hoon
+$  sign-arvo
  $%  [%ames gift:ames]
      $:  %behn
          $%  gift:behn
              $>(%wris gift:clay)
              $>(%writ gift:clay)
              $>(%mere gift:clay)
              $>(%unto gift:gall)
          ==
      ==
      [%clay gift:clay]
      [%dill gift:dill]
      [%eyre gift:eyre]
      [%gall gift:gall]
      [%iris gift:iris]
      [%jael gift:jael]
  ==
```

The head of the `sign-arvo` will be the name of the vane like `%behn`, `%clay`,
etc. The tail will be the `gift` itself. Here are a couple of `sign-arvo`
examples, and the responses to the example `task`s in the previous section:

```hoon
[%behn %wake ~]
```

```
[ %clay
  [ %writ
      p
    [ ~
      [ p=[p=%u q=[%da p=~2021.11.17..13.55.00..c195] r=%base]
        q=/sys/kelvin
        r=[p=%flag q=[#t/?(%.y %.n) q=0]]
      ]
    ]
  ]
]
```

The typical pattern is to first test the `wire` with something like a wutlus
(`?+`) expression, and then test the `sign-arvo`. Since most `gift`s are
head-tagged, you can test both the vane and the gift at the same time like:

```hoon
?+    sign-arvo  (on-arvo:def wire sign-arvo)
    [%behn %wake *]
  .....
....
```

## Example

Here's a very simple example that takes a poke of a `@dr` (a relative date-time
value) and sends Behn a `%wait` `task:behn`, setting a timer to go off `@dr` in
the future. When the timer goes off, `on-arvo` will take the `%wake` `gift:behn`
and print "Ding!" to the terminal.

#### `ding.hoon`

```hoon
/+  default-agent, dbug
|%
+$  card  card:agent:gall
--
%-  agent:dbug
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
++  on-init  on-init:def
++  on-save  on-save:def
++  on-load  on-load:def
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    :_  this
    :~  [%pass /timers %arvo %b %wait (add now.bowl !<(@dr vase))]
    ==
  ==
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?+    wire  (on-arvo:def wire sign-arvo)
      [%timers ~]
    ?+    sign-arvo  (on-arvo:def wire sign-arvo)
        [%behn %wake *]
      ?~  error.sign-arvo
        ((slog 'Ding!' ~) `this)
      (on-arvo:def wire sign-arvo)
    ==
  ==
++  on-fail   on-fail:def
--
```

Let's examine the `on-poke` arm:

```hoon
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %noun
    :_  this
    :~  [%pass /timers %arvo %b %wait (add now.bowl !<(@dr vase))]
    ==
  ==
```

A Behn `%wait` task has the format `[%wait @da]` - the `@da` (an absolute
date-time value) is the time the timer should go off. The `vase` of the poke
takes a `@dr`, so we extract it directly into an `add` expression, producing a
date-time `@dr` from now. Behn will receive the `%wait` task and set the timer
in Unix. When it fires, Behn will produce a `%wake` `gift:behn` and deliver it
to `on-arvo`, on the `wire` we specified (`/timers`). Here's the `on-arvo` arm:

```hoon
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?+    wire  (on-arvo:def wire sign-arvo)
      [%timers ~]
    ?+    sign-arvo  (on-arvo:def wire sign-arvo)
        [%behn %wake *]
      ?~  error.sign-arvo
        ((slog 'Ding!' ~) `this)
      (on-arvo:def wire sign-arvo)
    ==
  ==
```

We remark that, just like in the case of agent-agent communication, `gift`s from Arvo are also routed `wire` before `sign-arvo`.

First we check the `wire` is `/timers`, and then we check the `sign-arvo` begins
with `[%behn %wake ....]`. Behn's `%wake` gift has the following format:

```hoon
[%wake error=(unit tang)]
```

The `error` is null if the timer fired successfully, and contains an error in
the `tang` if it did not. We therefore test whether `error.sign-arvo` is `~`,
and if it is, we print `Ding!` to the terminal. If the `wire`, `sign-arvo` or
`error` are something unexpected, we pass it to `%default-agent`, which
will just crash and print an error message.

Let's try it out. Save the agent above as `/app/ding.hoon` on the `%base` desk
and `|commit %base`. Then, start the agent with `|rein %base [& %ding]`.

Next, in the dojo let's try poking our agent, setting a timer for five seconds
from now:

```
> :ding ~s5
>=
```

After approximately five seconds, we see the timer fired successfully:

```
> Ding!
```

## Summary

- Each vane has an API composed of `task`s it takes and `gift`s it produces.
- Each vane's `task`s and `gift`s are defined in `lull.hoon`
- Each vane's section of the [Arvo documentation](/docs/arvo/overview) includes
  an API reference that explains its `task`s and `gift`s, as well as an Examples
  section demonstrating their usage.
- Vane `task`s can be sent to vanes by `%pass`ing them an `%arvo` `card`.
- Vane `gift`s come back to the `on-arvo` arm of the agent core in a
  `sign-arvo`.

## Exercises

- Run through the [Example](#example) yourself if you've not done so already.
- Have a look at some vane sections of `lull.hoon` to familiarize yourself with
  its structure.
- Have a quick look at the API reference sections of a couple of vanes in the
  [Arvo documentation](/docs/arvo/overview).
