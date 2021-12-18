+++
title = "2. The Agent Core"
weight = 10
template = "doc.html"
+++

In this lesson we'll look at the basic type and structure of a Gall agent.

A Gall agent is a [door](/docs/glossary/door) with exactly ten [arms](/docs/glossary/arm). Each arm is responsible for
handling certain kinds of events that Gall feeds in to the agent. A door is
just a [core](/docs/glossary/core) with a sample - it's made with the
[barcab](/docs/hoon/reference/rune/bar#_-barcab) rune (`|_`) instead of the
usual [barcen](/docs/hoon/reference/rune/bar#-barcen) rune (`|%`).

## The ten arms

We'll discuss each of the arms in detail later. For now, here's a quick summary.
The arms of an agent can be be roughly grouped by purpose:

### State management

These arms are primarily for initializing and upgrading an agent.

- `on-init`: Handles starting an agent for the first time.
- `on-save`: Handles exporting an agent's state - typically as part of the
  upgrade process but also when suspending, uninstalling and debugging.
- `on-load`: Handles loading a previously exported agent state - typically as
  part of the upgrade process but also when resuming or reinstalling an agent.

### Request handlers

These arms handle requests initiated by outside entities, e.g. other agents,
HTTP requests from the front-end, etc.

- `on-poke`: Handles one-off requests, actions, etc.
- `on-watch`: Handles subscription requests from other entities.
- `on-leave`: Handles unsubscribe notifications from other, previously subscribed
  entities.

### Response handlers

These two arms handle responses to requests our agent previously initiated.

- `on-agent`: Handles request acknowledgements and subscription updates from
  other agents.
- `on-arvo`: Handles responses from vanes.

### Scry handler

- `on-peek`: Handles local read-only requests.

### Failure handler

- `on-fail`: Handles certain kinds of crash reports from Gall.

## Bowl

The sample of a Gall agent door is always a `bowl:gall`. Every time an event triggers the
agent, Gall populates the bowl with things like the current date-time, fresh entropy,
subscription information, which ship the request came from, etc, so that all the
arms of the agent have access to that data. For the exact structure and contents
of the bowl, have a read through [its entry in the Gall vane types
documentation](/docs/arvo/gall/data-types#bowl).

One important thing to note is that the bowl is only repopulated when there's a
new Arvo event. If a local agent or web client were to send multiple
messages to your agent at the same time, these would all arrive in the same
event. This means if your agent depended on a unique date-time or entropy to
process each message, you could run into problems if your agent doesn't account
for this possibility.

## State

If you've worked through [Hoon School](/docs/hoon/hoon-school/intro), you may
recall that a core is a cell of `[battery payload]`. The battery is the core
itself compiled to Nock, and the payload is the subject which it operates on.

For an agent, the payload will at least contain the bowl, the usual Hoon and `zuse` standard
library functions, and the **state** of the agent. For example, if your agent
were for an address book app, it might keep a `map` of ships to address book
entries. It might add entries, delete entries, and modify entries. This address
book `map` would be part of the state stored in the payload.

## Transition function

If you recall from the prologue, the whole Arvo operating system works on the
basis of a simple transition function `(event, oldState) -> (effects, newState)`. Gall agents also function the same way. Eight of an agent's ten arms
produce the same thing, a cell of:

- **Head**: A list of effects called `card`s (which we'll discuss later).
- **Tail**: A new agent core, possibly with a modified payload.

It goes something like this:

1. An event is routed to Gall.
2. Gall calls the appropriate arm of the agent, depending on the kind of event.
3. That arm processes the event, returning a list `card`s to be sent off, and
   the agent core itself with a modified state in the payload.
4. Gall sends the `card`s off and saves the modified agent core.
5. Rinse and repeat.

## Virtualization

When a crash occurs in the kernel, the system usually aborts the computation and
discards the event as though it never happened. Gall on the other hand
virtualizes all its agents, so this doesn't happen. Instead, when a crash occurs
in an agent, Gall intercepts the crash and takes appropriate action depending on
the kind of event that caused it. For example, if a poke from another ship
caused a crash in the `on-poke` arm, Gall will respond to the poke with a
"nack", a negative acknowledgement, telling the original ship the poke was
rejected.

What this means is that you can intentionally design your agent to crash in
cases it can't handle. For example, if a poke comes in with an unexpected
`mark`, it crashes. If a permission check fails, it crashes. This is quite
different to most programs written in procedural languages, which must handle
all exceptions to avoid crashing.

## Example

Here's about the simplest valid Gall agent:

```hoon
|_  =bowl:gall
++  on-init   `..on-init
++  on-save   !>(~)
++  on-load   |=(vase `..on-init)
++  on-poke   |=(cage !!)
++  on-watch  |=(path !!)
++  on-leave  |=(path `..on-init)
++  on-peek   |=(path ~)
++  on-agent  |=([wire sign:agent:gall] !!)
++  on-arvo   |=([wire sign-arvo] !!)
++  on-fail   |=([term tang] `..on-init)
--
```

This is just a dummy agent that does absolutely nothing - it has no state and
rejects all messages by crashing. Typically we'd cast this to an `agent:gall`,
but in this instance we won't so it's easier to examine its structure in the
dojo. We'll get to what each of the arms do later. For now, we'll just consider
a few particular points.

Firstly, note its structure - it's a door (created with `|_`) with a sample of
`bowl:gall` and the ten arms described earlier.

Secondly, you'll notice some of the arms return:

```hoon
`..on-init
```

A backtick at the beginning is an irregular syntax meaning "prepend with null",
so for example, in the dojo:

```
> `50
[~ 50]
```

The next part has `..on-init`, which means "the subject of the `on-init` arm".
The subject of the `on-init` arm is our whole agent. In the [transition
function](#transition-function) section we mentioned that most arms return a
list of effects called `card`s and a new agent core. Since an empty list is `~`,
we've created a cell that fits that description.

Let's examine our agent. In the dojo of a fake ship, mount the `%base` desk with
`|mount %base`. On the Unix side, navigate to `/path/to/fake/ship/base`, and save
the above agent in the `/app` directory as `skeleton.hoon`. Back in the dojo,
commit the file to the desk with `|commit %base`.

For the moment we won't install our `%skeleton` agent. Instead, we'll use the
`%build-file` thread to build it and save it in the dojo's subject so we can
have a look. Run the following in the dojo:

```
> =skeleton -build-file %/app/skeleton/hoon
```

Now, let's have a look:

```
> skeleton
< 10.fxw
  [   bowl
    [ [our=@p src=@p dap=@tas]
      [ wex=nlr([p=[wire=/ ship=@p term=@tas] q=[acked=?(%.y %.n) path=/]])
        sup=nlr([p=it(/) q=[p=@p q=/]])
      ]
      act=@ud
      eny=@uvJ
      now=@da
      byk=[p=@p q=@tas r=?([%da p=@da] [%tas p=@tas] [%ud p=@ud])]
    ]
    <17.zbp 33.wxp 14.dyd 53.vlb 77.wir 232.wfe 51.qbt 123.zao 46.hgz 1.pnw %140>
  ]
>
```

The dojo pretty-prints cores with a format of `number-of-arms.hash`. You can see
the head of `skeleton` is `10.fxw` - that's the battery of the core, our 10-arm
agent. If we try printing the head of `skeleton` we'll see it's a whole lot of
compiled Nock:

```
> -.skeleton
[ [ 11
    [ 1.953.460.339
      1
      [ 7.368.801
        7.957.707.045.546.060.659
        1.852.796.776
        0
      ]
      [7 15]
      7
      34
    ]
...(truncated for brevity)...
```

The battery's not too important, it's not something we'd ever touch in practice.
Instead, let's have a look at the core's payload by printing the tail of
`skeleton`. We'll see its head is the `bowl:gall` sample we specified, and then
the tail is just all the usual standard library functions:

```
> +.skeleton
[   bowl
  [ [our=~zod src=~zod dap=%$]
    [wex={} sup={}]
    act=0
    eny=0v0
    now=~2000.1.1
    byk=[p=~zod q=%$ r=[%ud p=0]]
  ]
  <17.zbp 33.wxp 14.dyd 53.vlb 77.wir 232.wfe 51.qbt 123.zao 46.hgz 1.pnw %140>
]
```

Currently `skeleton` has no state, but of course in practice you'd want to store
some actual data. We'll add `foo=42` as our state with the `=+` rune at the
beginning of our agent:

```hoon
=+  foo=42
|_  =bowl:gall
++  on-init   `..on-init
++  on-save   !>(~)
++  on-load   |=(vase `..on-init)
++  on-poke   |=(cage !!)
++  on-watch  |=(path !!)
++  on-leave  |=(path `..on-init)
++  on-peek   |=(path ~)
++  on-agent  |=([wire sign:agent:gall] !!)
++  on-arvo   |=([wire sign-arvo] !!)
++  on-fail   |=([term tang] `..on-init)
--
```

Save the modified `skeleton.hoon` in `/app` on the `%base` desk like before, and run `|commit %base` again in the dojo. Then, rebuild it with the same `%build-file` command as before:

```
> =skeleton -build-file %/app/skeleton/hoon
```

If we again examine our agent core's payload by looking at the tail of
`skeleton`, we'll see `foo=42` is now included:

```
> +.skeleton
[   bowl
  [ [our=~zod src=~zod dap=%$]
    [wex={} sup={}]
    act=0
    eny=0v0
    now=~2000.1.1
    byk=[p=~zod q=%$ r=[%ud p=0]]
  ]
  foo=42
  <17.zbp 33.wxp 14.dyd 53.vlb 77.wir 232.wfe 51.qbt 123.zao 46.hgz 1.pnw %140>
]
```

## Summary

- A Gall agent is a door with exactly ten specific arms and a sample of `bowl:gall`.
- Each of the ten arms handle different kinds of events - Gall calls the
  appropriate arm for the kind event it receives.
- The ten arms fit roughly into five categories:
  - State management.
  - Request handlers.
  - Response handlers.
  - Scry handler.
  - Failure handler.
- The state of an agent—the data it's storing—lives in the core's payload.
- Most arms produce a list of effects called `card`s, and a new agent core with
  a modified state in its payload.

## Exercises

- Run through the [Example](#example) yourself on a fake ship if you've not done
  so already.
- Have a look at the [`bowl` entry in the Gall data types
  documentation](/docs/arvo/gall/data-types#bowl) if you've not done so already.
