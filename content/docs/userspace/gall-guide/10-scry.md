+++
title = "10. Scries"
weight = 50
template = "doc.html"
+++

In this lesson we'll look at scrying agents, as well as how agents handle such
scries. If you're not at all familiar with performing scries in general, have a
read through the [Scry Guide](/docs/arvo/concepts/scry), as well as the [dotket
rune documentation](/docs/hoon/reference/rune/dot#-dotket).

## Scrying

A scry is a read-only request to Arvo's global namespace. Vanes and agents
define _scry endpoints_ which allow data to be requested from their states. The
endpoints can process the data in any way before returning it, but they cannot
alter the actual state - scries can only read, not modify.

Most of the time, scry requests are handled by Arvo, which routes the request to
the appropriate vane. When you scry a Gall agent you actually scry Gall itself.
Gall interprets the request, runs it on the specified agent, and then returns
the result. Scries are performed with the
[dotket](/docs/hoon/reference/rune/dot#-dotket) (`.^`) rune. Here's a summary of
their format:

![scry summary diagram](https://media.urbit.org/docs/arvo/scry-diagram-v2.svg)

A note on `care`s: Cares are most carefully implemented by Clay, where they specify
submodules and have tightly defined behaviors. For Gall agents, most of these
don't have any special behavior, and are just used to indicate the general kind
of data produced by the endpoint. There are a handful of exceptions to this:
`%d`, `%e`, `%u` and `%x`.

#### `%d`

A scry to Gall with a `%d` `care` and no `path` will produce the `desk` in which
the specified agent resides. For example:

```
> .^(desk %gd /=hark-store=)
%garden
> .^(desk %gd /=hood=)
%base
```

#### `%e`

A scry to Gall with a `%e` `care`, a `desk` rather than agent in the `desk`
field of the above diagram, and no path, will produce a set of all installed
agents on that desk and their status. For example:

```
> .^((set [=dude:gall live=?]) %ge /=garden=)
{ [dude=%hark-system-hook live=%.y]
  [dude=%treaty live=%.y]
  [dude=%docket live=%.y]
  [dude=%settings-store live=%.y]
  [dude=%hark-store live=%.y]
}
```

#### `%u`

A scry to Gall with a `%u` `care` and no `path` will check whether or not the
specified agent is installed and running:

```
> .^(? %gu /=btc-wallet=)
%.y
> .^(? %gu /=btc-provider=)
%.n
> .^(? %gu /=foobar=)
%.n
```

#### `%x`

A scry to Gall with a `%x` `care` will be passed to the agent for handling. Gall
handles `%x` specially, and expects an extra field at the end of the `path` that
specifies the `mark` to return. Gall will take the data produced by the
specified endpoint and try to convert it to the given mark, crashing if the mark
conversion fails. The extra field specifying the mark is not passed through to
the agent itself. Here's a couple of examples:

```
> =store -build-file /=landscape=/sur/graph-store/hoon

> .^(update:store %gx /=graph-store=/keys/noun)
[p=~2021.11.18..10.50.41..c914 q=[%keys resources={[entity=~zod name=%dm-inbox]}]]

> (crip (en-json:html .^(json %gx /=graph-store=/keys/json)))
'{"graph-update":{"keys":[{"name":"dm-inbox","ship":"zod"}]}}'
```

The majority of Gall agents simply take `%x` `care`s in their scry endpoints,
but in principle it's possible for a Gall agent to define a scry endpoint that
takes any one of the `care`s listed in the diagram above. An agent's scry
endpoints are defined in its `on-peek` arm, which we'll look at next.

## Handling scries

When a scry is performed on a Gall agent, Gall will strip out some extraneous
parts, and deliver it to the agent's `on-peek` arm as a `path`. The `path` will
only have two components from the diagram above: The _care_ and the _path_. For
example, a scry of `.^(update:store %gx /=graph-store=/keys/noun)` will come
into the `on-peek` arm of `%graph-store` as `/x/keys`.

The `on-peek` arm produces a `(unit (unit cage))`. The reason for the double
`unit` is that Arvo interprets `~` to mean the scry path couldn't be resolved,
and interprets `[~ ~]` to means it resolved to nothing. In either case the
dotket expression which initiated the scry will crash. The `cage` will contain
the actual data to return.

An ordinary `on-peek` arm, therefore, begins like so:

```hoon
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ....
```

Typically, you'd handle the `path` similarly to `on-watch`, as we discussed in
the lesson on subscriptions. You'd use something like a wutlus expression to
test the value of the `path`, defining your scry endpoints like so:

```hoon
?+    path  (on-peek:def path)
    [%x %some %path ~]  ....
    [%x %foo ~]    ....
    [%x %blah @ ~]
  =/  =ship  (slav %p i.t.t.path)
  .....
....
```

Each endpoint would then compose the `(unit (unit cage))`. The simplest way to
format it is like:

```hoon
``noun+!>('some data')
```

If it requires a more complex expression to retrieve or compose the data, you
can do something like:

```hoon
:^  ~  ~  %some-mark
!>  ^-  some-type
:+  'foo'
  'bar'
'baz'
```

Previously we discussed custom `mark` files. Such mark files are most commonly
used when the data might be accessed through Eyre's HTTP API, and therefore
required JSON conversion methods. We cover such things separately in the
[Full-Stack Walkthrough](/docs/userspace/full-stack/1-intro), but note that if
that's the case for your agent, you may wish to also have your scry endpoints
return data with your custom `mark` so it can easily be converted to JSON when
accessed from the web.

In some cases, typically with scry `path`s that contain wildcards like the `[%x %blah @ ~]` example above, your agent may not always be able to find the
requested data. In such cases, you can just produce a cell of `[~ ~]` for the
`(unit (unit cage))`. Keep in mind, however, that this will result in a crash
for the dotket expression which initiated the scry. In some cases you may want
that, but in other cases you may not, so instead you could wrap the data inside
the `vase` in a `unit` and have _that_ be null instead. It all depends on the
needs of your particular application and its clients.

## Example

Here's a simple example agent with three scry endpoints:

#### `peeker.hoon`

```hoon
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 data=(map @p @t)]
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
  ?>  =(src.bowl our.bowl)
  ?+    mark  (on-poke:def mark vase)
      %noun
    `this(data (~(put by data) !<([@p @t] vase)))
  ==
::
++  on-watch  on-watch:def
++  on-leave  on-leave:def
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
      [%x %all ~]  ``noun+!>(data)
  ::
      [%x %has @ ~]
    =/  who=@p  (slav %p i.t.t.path)
    ``noun+!>(`?`(~(has by data) who))
  ::
      [%x %get @ ~]
    =/  who=@p  (slav %p i.t.t.path)
    =/  maybe-res  (~(get by data) who)
    ?~  maybe-res
      [~ ~]
    ``noun+!>(`@t`u.maybe-res)
  ==
::
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
--
```

The agent's `on-poke` arm takes a cell of `[@p @t]` and saves it in the agent's
state, which contains a `(map @p @t)` called `data`. The `on-peek` arm is:

```hoon
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path  (on-peek:def path)
      [%x %all ~]  ``noun+!>(data)
  ::
      [%x %has @ ~]
    =/  who=@p  (slav %p i.t.t.path)
    ``noun+!>(`?`(~(has by data) who))
  ::
      [%x %get @ ~]
    =/  who=@p  (slav %p i.t.t.path)
    =/  maybe-res  (~(get by data) who)
    ?~  maybe-res
      [~ ~]
    ``noun+!>(`@t`u.maybe-res)
  ==
```

It defines three scry endpoints, all using a `%x` `care`: `/x/all`,
`/x/has/[ship]`, and `/x/get/[ship]`. The first will simply return the entire
`(map @p @t)` in the agent's state. The second will check whether the given ship
is in the map and produce a `?`. The third will produce the `@t` for the given
`@p` if it exists in the map, or else return `[~ ~]` to indicate the data
doesn't exist, producing a crash in the dotket expression.

Let's try it out. Save the agent above as `/app/peeker.hoon` in the `%base`
desk, `|commit %base` and start the agent with `|rein %base [& %peeker]`.

First, let's add some data to the map:

```
> :peeker [~zod 'foo']
>=
> :peeker [~nut 'bar']
>=
> :peeker [~wet 'baz']
>=
```

Now if we use `dbug` to inspect the state, we'll see the data has been added:

```
>   {[p=~wet q='baz'] [p=~nut q='bar'] [p=~zod q='foo']}
> :peeker +dbug [%state %data]
>=
```

Next, let's try the `/x/all` scry endpoint:

```
> .^((map @p @t) %gx /=peeker=/all/noun)
{[p=~wet q='baz'] [p=~nut q='bar'] [p=~zod q='foo']}
```

The `/x/has/[ship]` endpoint:

```
> .^(? %gx /=peeker=/has/~zod/noun)
%.y
> .^(? %gx /=peeker=/has/~wet/noun)
%.y
> .^(? %gx /=peeker=/has/~nes/noun)
%.n
```

And finally, the `/x/get/[ship]` endpoint:

```
> .^(@t %gx /=peeker=/get/~zod/noun)
'foo'
> .^(@t %gx /=peeker=/get/~wet/noun)
'baz'
```

We'll now try scrying for a ship that doesn't exist in the map. Note that due to
a bug at the time of writing, the resulting crash will wipe the dojo's subject,
so don't try this if you've got anything pinned there that you want to keep.

```
~zod:dojo> .^(@t %gx /=peeker=/get/~nes/noun)
crash!
```

## Summary

- Scries are read-only requests to vanes or agents which can be done inside any
  code, during its evaluation.
- Scries are performed with the dotket (`.^`) rune.
- Scries will fail if the scry endpoint does not exist, the requested data does
  not exist, or the data does not nest in the return type specified.
- Scries can only be performed on the local ship, not on remote ships.
- Gall scries with an agent name in the `desk` field will be passed to that
  agent's `on-peek` arm for handling.
- Gall scries with a `%x` `care` take a `mark` at the end of the scry `path`,
  telling Gall to convert the data returned by the scry endpoint to the mark
  specified.
- The `on-peek` arm takes a `path` with the `care` in the head and the `path` part
  of the scry in the tail, like `/x/some/path`.
- The `on-peek` arm produces a `(unit (unit cage))`. The outer `unit` is null if
  the scry endpoint does not exist, and the inner `unit` is null if the data
  does not exist.

## Exercises

- Have a read through the [Scry Guide](/docs/arvo/concepts/scry).
- Have a read through the [dotket rune
  documentation](/docs/hoon/reference/rune/dot#-dotket).
- Run through the [Example](#example) yourself if you've not done so already.
- Try adding another scry endpoint to the `peeker.hoon` agent, which uses a
  [`wyt:by`](/docs/hoon/reference/stdlib/2i#wytby) map function to produce the
  number of items in the `data` map.
- Have a look through the `on-peek` arms of some other agents on your ship, and
  try performing some scries to some of the endpoints.
