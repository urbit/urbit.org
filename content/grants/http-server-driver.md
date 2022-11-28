+++
title = "HTTP Server IO Driver"
date = "2022-11-28"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Core Dev", "Runtime" ]

[extra]
image =""
description = "Rewrite the HTTP server driver in Rust"
reward = "2 stars"
mentor = "~fanfun-mocbud"
assignee = ""
grant_id = ""
completed = false
work_request_link = ""
+++

# HTTP Server IO Driver

## Context

All IO drivers in the Urbit runtime currently run in the same process, which is
called the "urth" or "king" process. As part of an effort to both increase
security and scalability in the runtime, we are splitting each IO driver into
its own process, which is capable of communicating over local (i.e. pipes) or
remote (i.e. TCP sockets) communication channels.

## Description

In the [IO drivers repo](https://github.com/urbit/io_drivers), we use the
following abstract model of a driver:

```
 INPUT SOURCE
       |
       | serialized request (length-encoded, jammed noun)
       |
+---------------+
|   INPUT TASK  |
+---------------+
       |
       | deserialized request (noun)
       |
+---------------+
| HANDLING TASK |
+---------------+
       |
       | deserialized response (noun)
       |
+---------------+
|  OUTPUT TASK  |
+---------------+
       |
       | serialized response (length-encoded, jammed noun)
       |
  OUTPUT SINK
```

For this bounty, you must rewrite the HTTP server IO driver in
[`pkg/urbit/vere/io/http.c`](https://github.com/urbit/urbit/blob/master/pkg/urbit/vere/io/http.c)
in the [Urbit repo](https://github.com/urbit/urbit) to fit the driver model
described above in a new module [`src/http/server.rs`] in the
[IO drivers repo](https://github.com/urbit/io_drivers) with `stdin` and `stdout`
as the input source and output sink, respectively. The [HTTP client
driver](https://github.com/urbit/io_drivers/blob/master/src/http/client.rs) and
[file system driver](https://github.com/urbit/io_drivers/blob/master/src/fs.rs)
will serve as useful references.

## Requirements

- Knowledge of C and Rust.
- Experience with asynchronous, task-based programming.
- Familiarity with HTTP.

## Resources

- [Scalable
  IO](https://gist.github.com/mcevoypeter/a682dcd2d7c037c3b96de7268a7c2617)
- [Scaling Urbit's
  Runtime](https://gist.github.com/mcevoypeter/fe0270c9a4a72a9350c0f8944612bbf6)


## Deliverables

- A thoroughly-documented HTTP server driver implementation in
  `src/http/server.rs` using `stdin` and `stdout` as the input source and output
  sink, respectively.
- A complete suite of unit tests structured as a `tests` module in
  `src/http/server.rs` that exercises the conversions from request nouns into
  driver-specific data structures and from driver-specific data structures into
  response nouns.
- A complete suite of integration tests in `tests/http_server_tests.rs` that run
  the spawn the HTTP server driver in a separate process and feed it requests as
  jammed nouns.

Upon completion of all deliverables, you will receive two (2) stars.
