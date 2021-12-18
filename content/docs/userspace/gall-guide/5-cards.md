+++
title = "5. Cards"
weight = 25
template = "doc.html"
+++

As we previously discussed, most arms of an agent core produce a cell of
`[effects new-agent-core]`, and the type we use for this is typically `(quip card _this)`. We've covered `_this`, but we haven't yet looked at `card` effects
in detail. That's what we'll do here. In explaining `card`s we'll touch on some
concepts relating to the mechanics of pokes, subscriptions and other things
we've not yet covered. Don't worry if you don't understand how it all fits
together yet, we just want to give you a basic idea of `card`s so we can then
dig into how they work in practice.

## `card` type

The `card:agent:gall` type (henceforth just `card`) has a slightly complex
structure, so we'll walk through it step-by-step.

`lull.hoon` defines a `card` like so:

```hoon
+$  card  (wind note gift)
```

A `wind` is defined in `arvo.hoon` as:

```hoon
++  wind
  |$  [a b]
  $%  [%pass p=wire q=a]
      [%slip p=a]
      [%give p=b]
  ==
```

Gall will not accept a `%slip`, so we can ignore that. A `card`, then, is one
of:

```hoon
[%pass wire note]
[%give gift]
```

We'll consider each separately.

## `%pass`

```hoon
[%pass path note]
```

The purpose of a `%pass` card is to send some kind of one-off request, action,
task, or what have you, to another agent or vane. A `%pass` card is a request
your agent _initiates_. This is in contrast to a [`%give`](#give) card, which is
sent in _response_ to another agent or vane.

The type of the first field in a `%pass` card is a `wire`. A `wire` is just a
list of `@ta`, with a syntax of `/foo/bar/baz`. When you `%pass` something to an
agent or vane, the response will come back on the `wire` you specify here. Your
agent can then check the `wire` and maybe do different things depending on its
content. The [`wire`](/docs/userspace/gall-guide/types#wire) type is covered in
the [types reference](/docs/userspace/gall-guide/types). We'll show how `wire`s
are practically used later on.

The type of the next field is a `note:agent:gall` (henceforth just `note`), which
`lull.hoon` defines as:

```hoon
+$  note
  $%  [%agent [=ship name=term] =task]
      [%arvo note-arvo]
      [%pyre =tang]
  ==
```

- An `%agent` `note` is a request to another Gall agent, either local or on a
  remote ship. The `ship` and `name` fields are just the target ship and agent
  name. The `task` is the request itself, we'll discuss it separately
  [below](#task).
- An `%arvo` `note` is a request to a vane. We'll discuss such requests
  [below](#note-arvo).
- A `%pyre` `note` is used to abort an event. It's mostly used internally by
  `kiln` (a submodule of `%hood`), it's unlikely you'd use it in your own agent. The `tang` contains an
  error message.

### `task`

A `task:agent:gall` (henceforth just `task`) is defined in `lull.hoon` as:

```hoon
+$  task
  $%  [%watch =path]
      [%watch-as =mark =path]
      [%leave ~]
      [%poke =cage]
      [%poke-as =mark =cage]
  ==
```

Note a few of these include a `path` field. The `path` type is exactly the same
as a `wire` - a list of `@ta` with a syntax of `/foo/bar/baz`. The reason for
the `wire`/`path` distinction is just to indicate their separate purposes. While
a `wire` is for _responses_, a `path` is for _requests_. The
[`path`](/docs/userspace/gall-guide/types#path) type is also covered in the
[types reference](/docs/userspace/gall-guide/types).

The kinds of `task`s can be divided into two categories:

#### Subscriptions

`%watch`, `%watch-as` and `%leave` all pertain to subscriptions.

- `%watch`: A request to subscribe to the specified `path`. Once subscribed,
  your agent will receive any updates the other agent sends out on that `path`.
  You can subscribe more than once to the same `path`, but each subscription
  must have a separate `wire` specified at the beginning of the [`%pass`
  card](#pass).
- `%watch-as`: This is the same as `%watch`, except Gall will convert updates to
  the given `mark` before delivering them to your agent.
- `%leave`: Unsubscribe. The subscription to cancel is determined by the `wire`
  at the beginning of the [`pass` card](#pass) rather than the subscription
  `path`, so its argument is just `~`.

**Examples**

![subscription card examples](https://media.urbit.org/docs/userspace/gall-guide/sub-cards.svg)

#### Pokes

Pokes are requests, actions, or just some data which you send to another agent.
Unlike subscriptions, these are just one-off messages.

A `%poke` contains a `cage` of some data. A `cage` is a cell of `[mark vase]`.
The `mark` is just a `@tas` like `%foo`, and corresponds to a mark file in the
`/mar` directory. We'll cover `mark`s in greater detail later. The `vase` contains
the actual data you're sending.

The `%poke-as` task is the same as `%poke` except Gall will convert the `mark`
in the `cage` to the `mark` you specify before sending it off.

**Examples**

![poke card examples](https://media.urbit.org/docs/userspace/gall-guide/poke-cards.svg)

### `note-arvo`

A `note-arvo` is defined in `lull.hoon` like so:

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

The letter at the beginning corresponds to the vane - `%b` for Behn, `%c` for
Clay, etc. After then vane letter comes the task. Each vane has an API with a
set of tasks that it will accept, and are defined in each vane's section of
`lull.hoon`. Each vane's tasks are documented on the API Reference page of its
section in the [Arvo documentation](/docs/arvo/arvo).

#### Examples

![arvo card examples](https://media.urbit.org/docs/userspace/gall-guide/arvo-cards.svg)

## `%give`

```hoon
[%give gift]
```

The purpose of a `%give` card is to respond to a request made by another agent
or vane. More specifically, it's either for acknowledging a request, or for
sending out updates to subscribers. This is in contrast to a [`%pass`](#give)
card, which is essentially unsolicited.

A `%give` card contains a `gift:agent:gall` (henceforth just `gift`), which is
defined in `lull.hoon` as:

```hoon
+$  gift
  $%  [%fact paths=(list path) =cage]
      [%kick paths=(list path) ship=(unit ship)]
      [%watch-ack p=(unit tang)]
      [%poke-ack p=(unit tang)]
  ==
```

These can be divided into two categories:

### Acknowledgements

`%watch-ack` is sent in response to a `%watch` or `%watch-as` request, and
`%poke-ack` is sent in response to a `%poke` or `%poke-as` request. If the
`(unit tang)` is null, it's an ack - a positive acknowledgement. If the `(unit tang)` is non-null, it's a nack - a negative acknowledgement, and the `tang`
contains an error message. Gall automatically sends a nack with a stack trace if
your agent crashes while processing the request, and automatically sends an ack
if it does not. Therefore, you would not explicitly produce a `%watch-ack` or
`%poke-ack` gift.

#### Examples

![ack card examples](https://media.urbit.org/docs/userspace/gall-guide/ack-cards.svg)

### Subscriptions

`%fact` and `%kick` are both sent out to existing subscribers - entities that
have previously `%watch`ed a path on your ship.

A `%kick` gift takes a list of subscription `path`s. and a `(unit ship)`, which
is the ship to kick from those paths. If the `unit` is null, all subscribers are
kicked from the specified paths. Note that sometimes Gall can produce `%kick`
gifts without your agent explicitly sending a card, due to networking
conditions.

`%fact`s are how updates are sent out to subscribers. The `paths` field is a
list of subscription paths - all subscribers of the specified `path`s will
receive the `%fact`. The `cage` is the data itself - a cell of a `mark` and a
`vase`.

#### Examples

![gift card examples](https://media.urbit.org/docs/userspace/gall-guide/gift-cards.svg)

## Summary

Here's a diagram that summarizes the different kinds of `card`s:

[![card diagram](https://media.urbit.org/docs/userspace/gall-guide/card-diagram.svg)](https://media.urbit.org/docs/userspace/gall-guide/card-diagram.svg)

## Exercises

- Have a read of the [`wire`](/docs/userspace/gall-guide/types#wire) and
  [`path`](/docs/userspace/gall-guide/types#path) entries in the type reference.
