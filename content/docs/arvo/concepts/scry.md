+++
title = "Scries"
weight = 40
template = "doc.html"
+++

### What is a scry?

A scry is a read-only request to Arvo's global namespace.

Vanes and agents define _scry endpoints_ which allow one to request data from their respective states. The endpoints can process the data in any way before returning it, but they cannot alter the actual state - scries can _only_ read, not modify.

### Why scry?

The subject available in something like a Gall agent or thread contains a great many functions and structures from the standard library as well as `zuse` and `lull`, but it does not include any of the actual data stored elsewhere in the ship. All it has is its own state, a `bowl` and any `card`s it has been passed. Ordinarily, in order to access such data, one would need to `%poke` or `%watch` other agents, or `%pass` `task`s to vanes, then wait for a response. Arvo's scry system is the one exception to this; it allows direct retrieval of data from other vanes or agents in situ, from any context, without any of the normal messaging rigmarole.

### How do I scry?

Scries are performed exclusively with the dotket rune: `.^`

For details of its usage, see the [dotket](/docs/hoon/reference/rune/dot#-dotket) section of the Nock rune documentation. In addition to the dotket documentation, below is a colour-coded diagram breaking down the structure of a dotket scry expression with some additional notes.

![Scry diagram](https://media.urbit.org/docs/arvo/scry-diagram-v2.svg)

One further note on `care`s (which can sometimes be confusing): While `care`s are part of the global namespace, they're most extensively used by Clay in particular. In Clay, `care`s specify Clay submodules with specific behaviour, and are used both in scries as well as `task`s and `gift`s. For example, a `%x` `care` reads the data of a file, a `%p` `care` reads file permissions, and so forth. To see all of Clay's `care`s and what they do, you can refer to Clay's [Scry Reference](/docs/arvo/clay/scry).

Most other vanes also make use of `care`s in their scry endpoints. While such vanes don't have corresponding submodules with strictly defined behaviour like Clay, the `care`s still confer the general nature of the endpoint. The most widely used `care` is `%x`, which implies reading data in a general sense. Gall has special handling of `%x` scries as described in the [Gall agents](#gall-agents) section below, but otherwise `care`s have no special behaviour for non-Clay vanes (though they must still be included if the endpoint specifies it).

### What can I scry?

There are two places where scry endpoints are defined:

#### Vanes

Each of Arvo's eight vanes (kernel modules) include a `+scry` arm which defines that vane's scry endpoints. The number of endpoints and extent of data available varies between vanes. For example, Clay has a very extensive set of scry endpoints which provide read access to all files in all desks across all revisions, as well as the ability to build files, perform `mark` conversions, and various other functions. Jael provides access to a great deal of PKI data. On the other hand, Dill has only a couple of endpoints which are mostly useful for debugging, and Iris has none at all (apart from standard memory reporting endpoints you'd not typically use in your applications).

To explore what scry endpoints are available for vanes, you can refer to the Scry Reference section of each vane in the [Arvo](/docs/arvo/overview) section of the documents.

#### Gall agents

Gall has a single scry endpoint of its own to check for the existence of an agent, but otherwise all Gall scries are passed through to one of the agents it manages. The target agent to scry is specified in place of the `desk` as described in the diagram above. Each Gall agent includes a `+on-peek` arm that defines its own scry endpoints. For example, `%graph-store` has a number of scry endpoints to access the data it stores, such as chat messages and the like.

Gall agents can expose scry endpoints with any `care`, but most commonly they'll take a `%x` `care`. Gall handles `%x` scries specially - it expects an extra field at the end of the `path` that specifies a `mark`. Gall will attempt to perform a `mark` conversion from the `mark` returned by the scry endpoint to the `mark` specified. Note the trailing `mark` in the `path` will not be passed through to the agent itself.

### What is an endpoint?

"Endpoint" refers to a specific scry path in a vane or agent. They will sometimes informally be noted in documentation or source comments like `/x/foo/bar/baz` or maybe just `/foo/bar/baz`. The first part of the former example is the `care`, then the rest is the `path` portion as noted in the diagram earlier.

If an agent's scry endpoints don't have formal documentation, you may need to refer to the `+on-peek` arm in its source code to determine its endpoints. While there's no exact pattern that's consistent across different agents, the general pattern will be some initial tests and conversions followed by a `?+` rune, whose cases will typically correspond to the endpoints. The `+on-peek` arm always return a `(unit (unit cage))` (a `cage` is a cell of `[mark vase]`), so each endpoint will typically finish by composing such a structure.

Here's an example from the `+on-peek` arm of `%graph-store`:

```hoon
  [%x %keys ~]
:-  ~  :-  ~  :-  %graph-update-2
!>(`update:store`[now.bowl [%keys ~(key by graphs)]])
```

The case in the beginning says it takes a `%x` `care` and has a `path` of `/keys`. Additionally, it returns data with a `mark` of `%graph-update-2`. Assuming we wanted the `%graph-update-2` `mark` converted to a `%json` `mark`, our scry would be composed along the lines of:

```hoon
.^(json %gx /(scot %p our)/graph-store/(scot %da now)/keys/json)
```

### Web scries

The webserver vane Eyre has a system which allows clients like web browsers to perform scries over HTTP. For details, refer to the [Scry section of Eyre's External API Reference](/docs/arvo/eyre/external-api-ref#scry).

### Further reading

[dotket](/docs/hoon/reference/rune/dot#-dotket) - Documentation of the `.^` rune which performs scries.

[Arvo](/docs/arvo/overview) - Each vane has a Scry Reference section with details of their endpoints as well as examples.

[Eyre's External API Reference](/docs/arvo/eyre/external-api-ref#scry) - Documentation of Eyre's scry system which allows web clients to perform scries over HTTP.

[The Gall Guide](/docs/userspace/gall-guide/intro) - The Gall tutorial includes a section about `+on-peek` and writing scry endpoints.
