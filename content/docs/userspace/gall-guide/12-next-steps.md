+++
title = "12. Next Steps"
weight = 60
template = "doc.html"
+++

We've now covered all the arms of a Gall agent, and everything you need to know
to start writing your own agent.

The things haven't touched on yet are front-end development and integration,
Eyre's HTTP API for communicating with agents from the web, and dealing with
JSON data. A second part to the Gall Guide is coming soon, and will focus
exclusively on those aspects. In the mean time, you can refer to the following
documents for help writing a web front-end for your app:

- [Eyre's external API reference](/docs/arvo/eyre/external-api-ref) - This
  explains Eyre's HTTP API, through which a browser or other HTTP client can
  interact with a Gall agent.
- [Eyre's usage guide](/docs/arvo/eyre/guide) - This walks through examples of
  using Eyre's HTTP API.
- [JSON guide](/docs/hoon/guides/json-guide) - This walks through the basics of
  converting Hoon data structures to JSON, for use with a web client. It also
  covers JSON conversion methods in `mark` files.
- [Zuse reference](/docs/hoon/reference/zuse/table-of-contents) - This contains
  documentation of all JSON encoding and decoding functions included in the
  `zuse.hoon` utility library.
- [The software distribution guide](/docs/userspace/dist/dist) - This covers
  everything you need to know to distribute apps to other ships. It includes
  details of bundling a web front-end and serving it to the user in the browser.

In addition to these documents about creating a web-based user interface for
your app, there are some other guides you might like to have a look at:

- [Threads guide](/docs/userspace/threads/overview) - Threads are like transient
  agents, typically used for handling complex I/O functionality for Gall
  agents - like interacting with an external HTTP API.
- [The software distribution guide](/docs/usespace/dist/dist) - This explains
  how to set up a desk for distribution, so other people can install your app.

For more development resources, and for ways to get involved with the Urbit
development community, see the [Urbit Developers
site](https://developers.urbit.org/).
