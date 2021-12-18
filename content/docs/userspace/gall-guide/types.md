+++
title = "Appendix: Types"
weight = 65
template = "doc.html"
+++

This document explains a few of the types commonly used in Gall agents. In
addition to these, the [Data Types](/docs/arvo/gall/data-types) section of the
Gall vane documentation is a useful reference. In particular, the whole
[`agent`](/docs/arvo/gall/data-types#agent) subsection, as well as
[`bowl`](/docs/arvo/gall/data-types#bowl),
[`boat`](/docs/arvo/gall/data-types#boat), and
[`bitt`](/docs/arvo/gall/data-types#bitt).

## `vase`

Vases are used to encapsulate _dynamically typed_ data - they let typed data be
moved around in contexts where you can't know the type ahead of time, and
therefore can't have a _static_ type.

Vases are used extensively - almost all data your agent will send
and received is wrapped in a vase.

A vase is just a cell with data in the tail and the type of the data in the
head. Its formal definition is:

```hoon
+$  vase  [p=type q=*]
```

Here's what it looks like if we bunt a vase in the dojo:

```
> *vase
[#t/* q=0]
```

There are two simple runes used to create and unpack vases. We'll look at each
of these next.

### Create a `vase`

The [zapgar](https://urbit.org/docs/hoon/reference/rune/zap#-zapgar) rune (`!>`)
takes a single argument of any noun, and wraps it in a vase. For example, in the
dojo:

```
> !>([1 2 3])
[#t/[@ud @ud @ud] q=[1 2 3]]

> !>('foo')
[#t/@t q=7.303.014]

> !>([[0xdead 0xb33f] 'foo'])
[#t/[[@ux @ux] @t] q=[[57.005 45.887] 7.303.014]]

> !>(foo='bar')
[#t/foo=@t q=7.496.034]
```

You would typically use `!>` as part of a [`cage`](#cage) when you're
constructing a `card` like a poke or a `%fact` `gift` to be sent off.

### Extract data from `vase`

The [zapgal](https://urbit.org/docs/hoon/reference/rune/zap#-zapgal) rune (`!<`)
takes two arguments: A mold specifying the type to try and extract the data as,
and the vase to be extracted.

Let's look at an example in the dojo. First, let's create a vase of `[@t @ux @ud]`:

```
> =myvase !>(['foo' 0xabcd 123])
> myvase
[#t/[@t @ux @ud] q=[7.303.014 43.981 123]]
```

Next, let's try extracting our vase:

```
> !<  [@t @ux @ud]  myvase
['foo' 0xabcd 123]
```

Now let's try asking for a `@p` rather than `@t`:

```
> !<  [@p @ux @ud]  myvase
-need.@p
-have.@t
nest-fail
```

As you can see, it will crash if the type does not nest. Note that
rather than using `!<`, you can also just clam the tail of the vase like:

```
> ((trel @t @ux @ud) +.myvase)
[p='foo' q=0xabcd r=123]
```

The only problem is that you can't tell if the auras were wrong:

```
> ((trel @p @ud @ux) +.myvase)
[p=~sibtel-tallyd q=43.981 r=0x7b]
```

You'd typically use `!<` on the data in `card`s that come in from other ships,
agents, etc.

## `mark`

The `mark` type is just a `@tas` like `%foo`, and specifies the Clay filetype of
some data. The `mark` corresponds to a mark file in the `/mar` directory, so a
`mark` of `%foo` corresponds to `/mar/foo/hoon`. Mark files are used for saving
data in Clay, validating data sent between agents or over the network, and
converting between different data types. For more information about mark files,
you can refer to the [Marks section of the Clay
documentation](/docs/arvo/clay/marks/marks).

## `cage`

A `cage` is a cell of a [`mark`](#mark) and a [`vase`](#vase), like `[%foo !>('bar')]`. The data in the vase should match the data type of the specified
mark.

Most data an agent sends will be in a `cage`, and most data it receives will
arrive in a `cage`. The `mark` may be used to validate or convert the data in
the `vase`, depending on the context.

## `quip`

`quip` is a mold-builder. A `(quip a b)` is equivalent to `[(list a) b]`, it's
just a more convenient way to specify it. Most arms of an agent return a `(quip card _this)`, which is a list of effects and a new state.

## `path`

The `path` type is formally defined as:

```hoon
+$  path  (list knot)
```

A knot is a `@ta` text atom (see the [Strings guide](/docs/hoon/guides/strings)
for details), so a `path` is just a list of text. Rather than having to write
`[~.foo ~.bar ~.baz ~]` though, it has its own syntax which looks like
`/foo/bar/baz`.

A `path` is similar to a filesystem path in Unix, giving data a location in a
nested hierarchy. In Arvo though, they're not only used for files, but are a
more general type used for several different purposes. Its elements have no
inherent significance, it depends on the context. In a Gall agent, a `path` is
most commonly a subscription path - you might subscribe for updates to
`/foo/bar` on another agent, or another agent might subscribe to `/baz` on your
agent.

A `path` might just be a series of fixed `@ta` like `/foo/bar`, but some
elements might also be variable and include encoded atoms, or some other datum. For
example, you might like to include a date in the path like
`/updates/~2021.10.31..07.24.27..db68`. Other agents might create the path by
doing something like:

```hoon
/update/(scot %da now.bowl)
```

Then, when you get a subscription request, you might do something like:

```hoon
?+    path  !!
    [%updates @ ~]
  =/  date=@da  (slav %da i.t.path)
  ...(rest of code)...
```

See the [Encoding in text](/docs/hoon/guides/strings#encoding-in-text) and
[Decoding from text](/docs/hoon/guides/strings#decoding-from-text) sections of
the Strings guide for more information on dealing with atoms encoded in strings.

Aside from using function calls when constructing a `path` as demonstrated
above, you can also insert text you're previously stored with `=/` or what have
you, simply by enclosing them in brackets. For example, in the dojo:

```
> =const ~.bar
> `path`/foo/[const]/baz
/foo/bar/baz
```

## `wire`

The type of a wire is formally defined as:

```hoon
+$  wire  path
```

So, a `wire` is just a [`path`](#path), type-wise they're exactly the same. The
reason there's a separate `wire` type is just to differentiate their purpose. A
`wire` is a path for responses to requests an agent initiates. If you subscribe
to the `path` `/some/path` on another agent, you also specify `/some/wire`.
Then, when that agent sends out updates to subscribers of `/some/path`, your
agent receives them on `/some/wire`.

More formally, `wire`s are used by Arvo to represent an event cause, and
therefore return path, in a call stack called a
[`duct`](/docs/arvo/overview#duct). Inter-vane communications happen over
`duct`s as [`move`](/docs/arvo/overview#moves)s, and Gall converts the `card`s
produced by agents into such `move`s behind the scenes. A detailed understanding
of this system is not necessary to write Gall agents, but if you're interested
it's comprehensively documented in the [Arvo overview](/docs/arvo/overview) and
[move trace tutorial](/docs/arvo/tutorials/move-trace).

For agents, the `wire` is specified in the second argument of a `%pass` `card`.
It's used for anything you can `%pass`, such as `%poke`s, `%watch`es, and
`%arvo` notes. For example:

```hoon
[%pass /this/is/wire %agent [~zod %foobar] %watch /this/is/path]
::
[%pass /this/is/wire %agent [~zod %foobar] %poke %foo !>('hello')]
::
[%pass /this/is/wire %arvo %b %wait (add now.bowl ~m1)]
```

The `on-agent` and `on-arvo` arms of the agent core include a `wire` in their
respective sample. Responses from agents come in to the former, and responses
from vanes come in to the latter.
