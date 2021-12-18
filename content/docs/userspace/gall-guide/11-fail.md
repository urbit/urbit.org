+++
title = "11. Failure"
weight = 55
template = "doc.html"
+++

In this lesson we'll cover the last agent arm we haven't touched on yet:
`on-fail`. We'll also touch on one last concept, which is the _helper core_.

# Failures

When crashes or errors occur in certain cases, Gall passes them to an agent's
`on-fail` arm for handling. This arm is very seldom used, almost all agents
leave it for `default-agent` to handle, which just prints the error message to
the terminal. While you're unlikely to use this arm, we'll briefly go over its
behavior for completeness.

`on-fail` takes a `term` error message and a `tang`, typically containing a
stack trace, and often with additional messages about the error. If it weren't
delegated to `on-fail:def`, it would begin with:

```hoon
++  on-fail
  |=  [=term =tang]
  ^-  (quip card _this)
  ....
```

Gall calls `on-fail` in four cases:

- When there's a crash in the `on-arvo` arm.
- When there's a crash in the `on-agent` arm.
- When there's a crash in the `on-leave` arm.
- When an agent produces a `%watch` card but the `wire`, ship, agent and `path`
  specified are the same as an existing subscription.

For an `on-arvo` failure, the `term` will always be `%arvo-response`, and the
`tang` will contain a stack trace.

For `on-agent`, the `term` will be the head of the `sign` (`%poke-ack`, `%fact`,
etc). The `tang` will contain a stack trace and a message of "closing
subscription".

For an `on-leave` failure, the `term` will always be `%leave`, and the `tang`
will contain a stack trace.

For a `%watch` failure, the `term` will be `%watch-not-unique`. The `tang` will
include a message of "subscribe wire not unique", as well as the agent name, the
`wire`, the target ship and the target agent.

How you might handle these cases (if you wanted to manually handle them) depends
on the purpose of your particular agent.

## Helper core

Back in the lesson on lustar virtual arms, we briefly mentioned a common pattern
is to define a deferred expression for a helper core named `hc` like:

```hoon
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
    hc    ~(. +> bowl)
```

The name `do` is also used frequently besides `hc`.

A helper core is a separate core composed into the subject of the agent core,
containing useful functions for use by the agent arms. Such a helper core would
typically contain functions that would only ever be used internally by the
agent - more general functions would usually be included in a separate `/lib`
library and imported with a [faslus](/docs/arvo/ford/ford#ford-runes) (`/+`)
rune. Additionally, you might recall that the example agent of the
[subscriptions lesson](/docs/userspace/gall-guide/8-subscriptions#example) used
a barket (`|^`) rune to create a door in the `on-poke` arm with a separate
`handle-poke` arm. That approach is typically used when functions will only be
used in that one arm. The helper core, on the other hand, is useful when
functions will be used by multiple agent arms.

The conventional pattern is to have the helper core _below_ the agent core, so
the structure of the agent file is like:

```
[imports]
[state types core]
[agent core]
[helper core]
```

Recall that the build system will implicitly compose any discrete expressions.
If we simply added the helper core below the agent core, the agent core would be
composed into the subject of the helper core, which is the opposite of what we
want. Instead, we must inversely compose the two cores with a
[tisgal](/docs/hoon/reference/rune/tis#-tisgal) (`=<`) rune. We add the tisgal
rune directly above the agent core like:

```hoon
.....
=<
|_  =bowl:gall
+*  this      .
    def   ~(. (default-agent this %.n) bowl)
    hc    ~(. +> bowl)
++  on-init
.....
```

We can then add the helper core below the agent core. The helper core is most
typically a door like the agent core, also with the `bowl` as its sample. This
is just so any functions you define in it have ready access to the `bowl`. It
would look like:

```hoon
|_  =bowl:gall
++  some-function  ...
++  another  ....
++  etc ...
--
```

Back in the lustar virtual arm of the agent core, we give it a deferred expression name of `hc`
and call it like so:

```hoon
hc  ~(. +>  bowl)
```

To get to the helper core we composed from within the door, we use a
[censig](/docs/hoon/reference/rune/cen#-censig) expression to call `+>` of the
subject (`.`) with the `bowl` as its sample. After that, any agent arms can make
use of helper core functions by calling them like `(some-function:hc ....)`.

## Summary

- `on-fail` is called in certain cases of crashes or failures.
- Crashes in the `on-agent`, `on-arvo`, or `on-watch` arms will trigger a call
  to `on-fail`.
- A non-unique `%watch` `card` will also trigger a call to `on-fail`.
- `on-fail` is seldom used - most agents just leave it to `%default-agent` to
  handle, which just prints the error to the terminal.
- A helper core is an extra core of useful functions, composed into the subject
  of the agent core.
- Helper cores are typically placed below the agent core, and composed with a
  tisgal (`=<`) rune.
- The helper core is typically a door with the `bowl` as a sample.
- The helper core is typically given a name of `hc` or `do` in the lustar virtual arm
  of the agent core.
