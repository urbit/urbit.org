+++
title = "Internal API Reference"
weight = 3
template = "doc.html"
+++

This document details all the `task`s you're likely to use to interact with Eyre, as well as the `gift`s you'll receive in response.

The primary way of interacting with Eyre is from the outside with HTTP requests. As a result, most of its `task`s are only used internally and you're unlikely to need to deal with them directly. The ones you may want to use in certain cases are [%connect](#connect), [%serve](#serve), [%disconnect](#disconnect), [%approve-origin](#approve-origin) and [%reject-origin](#reject-origin), and they are also demonstrated in the [Examples](/docs/arvo/eyre/examples) document. The rest are just documented for completeness.

Many of the types referenced are detailed in the [Data Types](/docs/arvo/eyre/data-types) document. It may also be useful to look at the `+eyre` section of `/sys/lull.hoon` in Arvo where these `task`s, `gift`s and data structures are defined.

## `%live`

```hoon
[%live insecure=@ud secure=(unit @ud)]
```

This `task` notifies Eyre of the listening HTTPS and HTTP ports. It is automatically sent to Eyre by the runtime and should not be used manually.

The `insecure` field is the HTTP port and `secure` is the optional HTTPS port.

### Returns

Eyre returns no `gift` in response to a `%live` `task`.

## `%rule`

```hoon
[%rule =http-rule]
```

This `task` either configures HTTPS with a certificate and keypair, or configures a DNS binding. This is typically done for you by the `%acme` app, rather than done manually.

The [$http-rule](/docs/arvo/eyre/data-types#http-rule) is either tagged with `%cert` or `%turf`. A `%cert` `http-rule` sets an HTTPS certificate and keypair or removes it if null. A `%turf` `http-rule` either adds or removes a DNS binding depending on whether the `action` is `%put` or `%del`. Note that using `%turf` will automatically cause the system to try and obtain a certificate and keypair via Letsencrypt.

### Returns

Eyre returns no `gift` in response to a `%rule` `task`.

## `%request`

```hoon
[%request secure=? =address =request:http]
```

This `task` is how Eyre receives an inbound HTTP request. It will ordinarily be sent to Eyre by the runtime so you wouldn't use it except perhaps in tests.

The `secure` field says whether it's over HTTPS. The `address` is the IP address from which the request originated. The [$request:http](/docs/arvo/eyre/data-types#requesthttp) is the HTTP request itself containing the method, URL, headers, and body.

### Returns

Eyre may `pass` a `%response` `gift` on the appropriate `duct` depending on the contents of the `%request`, state of the connection, and other factors.

## `%request-local`

```hoon
[%request-local secure=? =address =request:http]
```

This `task` is how Eyre receives an inbound HTTP request over the local loopback port. It behaves the same and takes the same arguments as in the [%request](#request) example except it skips any normally required authentication. Just like for a [%request](#request) `task`, you'd not normally use this manually.

### Returns

Eyre may `pass` a `%response` `gift` on the appropriate `duct` depending on the contents of the `%request`, state of the connection, and other factors.

## `%cancel-request`

```hoon
[%cancel-request ~]
```

This `task` is sent to Eyre by the runtime when an HTTP client closes its previously established connection. You would not normally use this manually.

This `task` takes no arguments.

### Returns

Eyre may `pass` a `%response` `gift` on the appropriate `duct` depending on the state of the connection and other factors.

## `%connect`

```hoon
[%connect =binding app=term]
```

This `task` binds a Gall agent to a URL path so it can receive HTTP requests and return HTTP responses directly.

The [$binding](/docs/arvo/eyre/data-types#binding) contains a URL path and optional domain through which the agent will be able to take HTTP requests. The `app` is just the name of the Gall agent to bind. Note that if you bind a URL path of `/foo`, Eyre will also match `/foo/bar`, `/foo/bar/baz`, etc.

If an agent is bound in Eyre using this method, HTTP requests to the bound URL path are poked directly into the agent. The `cage` in the poke have a `%handle-http-request` `mark` and a `vase` of `[@ta inbound-request:eyre]` where the `@ta` is a unique `eyre-id` and the [$inbound-request](/docs/arvo/eyre/data-types#inbound-request) contains the HTTP request itself.

Along with the poke, Eyre will also subscribe to the `/http-response/[eyre-id]` `path` of the agent and await a response, which it will pass on to the HTTP client who made the request. Eyre expects at least two `fact`s and a `kick` on this subscription path to complete the response and close the connection (though it can take more than two `fact`s).

The first `fact`'s `cage` must have a `mark` of `%http-response-header` and a `vase` containing a [$response-header:http](/docs/arvo/eyre/data-types#response-headerhttp) with the HTTP status code and headers of the response.

The `cage` of the second and subsequent `fact`s must have a `mark` of `%http-response-data` and a `vase` containing a `(unit octs)` with the actual data of the response. An `octs` is just `[p=@ud q=@]` where `p` is the byte-length of `q`, the data. You can send an arbitrary number of these.

Finally, once you've sent all the `fact`s you want, you can `kick` Eyre's subscription and it will complete the response and close the connection to the HTTP client.

### Returns

Eyre will respond with a `%bound` `gift` which says whether the binding was successful and looks like:

```hoon
[%bound accepted=? =binding]
```

The `accepted` field says whether the binding succeeded and the `binding` is the requested binding described above.

### Example

See the [Direct HTTP Handling With Gall Agents](/docs/arvo/eyre/examples#direct-http-handling-with-gall-agents) section of the [Examples](/docs/arvo/eyre/examples) document for an example.

## `%serve`

```hoon
[%serve =binding =generator]
```

This `task` binds a generator to a URL path so it can receive HTTP requests and return HTTP responses.

The `binding` contains the URL path and optional domain through which the generator will take HTTP requests. The [$generator](/docs/arvo/eyre/data-types#generator) specifies the `desk`, the `path` to the generator in Clay, and also has a field for arguments. Note that the passing of specified arguments to the generator by Eyre is not currently implemented, so you can just leave it as `~`.

The bound generator must be a gate within a gate and the type returned must be a [$simple-payload:http](/docs/arvo/eyre/data-types#simple-payloadhttp).

The sample of the first gate must be:

```hoon
[[now=@da eny=@uvJ bec=beak] ~ ~]
```

...and the sample of the second, nested gate must be:

```hoon
[authenticated=? =request:http]
```

The `?` says whether the HTTP request contained a valid session cookie and the [$request:http](/docs/arvo/eyre/data-types#requesthttp) contains the request itself.

The `simple-payload:http` returned by the generator is similar to the response described in the [%connect](#connect) section except the HTTP headers and body are all contained in the one response rather than staggered across several.

### Returns

Eyre will return a `%bound` `gift` as described at the end of the [%connect](#connect) section.

### Example

See the [Generators](/docs/arvo/eyre/examples#generators) section of the [Examples](/docs/arvo/eyre/examples) document for an example.

## `%disconnect`

```hoon
[%disconnect =binding]
```

This `task` deletes a URL binding previously set by a `%connect` or `%serve` `task`.

The [$binding](/docs/arvo/eyre/data-types#binding) is the URL path and domain of the binding you want to delete.

### Returns

Eyre returns no `gift` in response to a `%disconnect` `task`.

## `%code-changed`

```hoon
[%code-changed ~]
```

This `task` tells Eyre that the web login code has changed, causing Eyre to throw away all sessions and cookies. Typically it's automatically sent to Eyre by `hood` when you run `|code %reset`.

This `task` takes no arguments.

### Returns

Eyre returns no `gift` in response to a `%code-changed` `task`.

## `%approve-origin`

```hoon
[%approve-origin =origin]
```

This `task` tells Eyre to start responding positively to CORS requests for the specified `origin`.

The [$origin](/docs/arvo/eyre/data-types#origin) is a CORS origin like `http://foo.example` you want to approve.

### Returns

Eyre returns no `gift` in response to a `%approve-origin` `task`.

### Example

See the [Managing CORS Origins](/docs/arvo/eyre/examples#managing-cors-origins) section of the [Examples](/docs/arvo/eyre/examples) document for an example.

## `%reject-origin`

```hoon
[%reject-origin =origin]
```

This `task` tells Eyre to start responding negatively to CORS requests for the specified `origin`.

The [$origin](/docs/arvo/eyre/data-types#origin) is a CORS origin like `http://foo.example` you want want to reject.

### Returns

Eyre returns no `gift` in response to a `%reject-origin` `task`.

### Example

See the [Managing CORS Origins](/docs/arvo/eyre/examples#managing-cors-origins) section of the [Examples](/docs/arvo/eyre/examples) document for an example.
