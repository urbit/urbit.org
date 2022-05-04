+++
title = "10. Summary"
weight = 10
template = "doc.html"
+++

That's it! We've built our agent and React front-end, put together a desk and
published it. We hope this walkthrough has helped you see how all the pieces
for together for building and distributing an app in Urbit.

The reference material for each section of this walkthrough is listed
[below](#reference-material), the source code for our app is available
[here](https://github.com/urbit/docs-examples/tree/main/journal-app), and it can
be installed from `~pocwet/journal`.

In this guide we've built a separate React app for the front-end, but Hoon also
has a native domain-specific language for composing HTML structures called Sail.
Sail allows you to compose a front-end inside a Gall agent and serve it
directly. See the [Sail guide](/docs/hoon/guides/sail) for details.

Along with `@urbit/http-api`, there's also the `@urbit/api` NPM package, which
contains a large number of helpful functions for dealing with Hoon data types
and interacting with a number of agents - particularly those used by the Groups
app. Its source code is [available
here](https://github.com/urbit/urbit/tree/master/pkg/npm/api).

## Reference material

Here is the reference material for each section of this walkthrough.

#### Types

- [Gall Guide /sur section](/docs/userspace/gall-guide/7-sur-and-marks#sur) -
  This section of the Gall Guide covers writing a `/sur` structure library for
  an agent.

- [Ordered map functions in
  `zuse.hoon`](https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/zuse.hoon#L5284-L5688) -
  This section of `zuse.hoon` contains all the functions for working with
  `mop`s, and is well commented.

#### Agent

- [The Gall Guide](/docs/userspace/gall-guide/intro) - The Gall Guide covers all
  aspects of writing Gall agents in detail.

- [Ordered map functions in
  `zuse.hoon`](https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/zuse.hoon#L5284-L5688) -
  This section of `zuse.hoon` contains all the functions for working with
  `mop`s, and is well commented.

- [`/lib/agentio.hoon`](https://github.com/urbit/urbit/blob/master/pkg/base-dev/lib/agentio.hoon) -
  The `agentio` library in the `%base` desk contains a large number of useful
  functions which making writing Gall agents easier.

#### JSON

- [The JSON Guide](/docs/hoon/guides/json-guide) - The stand-alone JSON guide
  covers JSON encoding/decoding in great detail.
- [The Zuse Reference](/docs/hoon/reference/zuse/table-of-contents) - The
  `zuse.hoon` reference documents all JSON-related functions in detail.

- [`++enjs:format` reference](/docs/hoon/reference/zuse/2d_1-5#enjsformat) -
  This section of the `zuse.hoon` documentation covers all JSON encoding
  functions.

- [`++dejs:format` reference](/docs/hoon/reference/zuse/2d_6) - This section of
  the `zuse.hoon` documentation covers all JSON _decoding_ functions.

- [Eyre Overview](/docs/arvo/eyre/eyre) - This section of the Eyre vane
  documentation goes over the basic features of the Eyre vane.

#### Marks

- [The Marks section of the Clay documentation](/docs/arvo/clay/marks/marks) -
  This section of the Clay vane documentation covers mark files comprehensively.
- [The mark file section of the Gall
  Guide](/docs/userspace/gall-guide/7-sur-and-marks#mark-files) - This part of
  the Gall Guide goes through the basics of mark files.

- [The JSON Guide](/docs/hoon/guides/json-guide) - This also covers writing mark
  files to convert to/from JSON.

#### Eyre

- [The Eyre vane documentation](/docs/arvo/eyre/eyre) - This section of the vane
  docs covers all aspects of Eyre.
- [Eyre External API Reference](/docs/arvo/eyre/external-api-ref) - This section
  of the Eyre documentation contains reference material for Eyre's external API.

- [The Eyre Guide](/docs/arvo/eyre/guide) - This section of the Eyre
  documentation walks through using Eyre's external API at a low level (using
  `curl`).

#### React App Setup and Logic

- [HTTP API Guide](/docs/userspace/http-api-guide) - Reference documentation for
  `@urbit/http-api`.

- [React app source
  code](https://github.com/urbit/docs-examples/tree/main/journal-app/ui) - The
  source code for the Journal app UI.

- [`@urbit/http-api` source
  code](https://github.com/urbit/urbit/tree/master/pkg/npm/http-api) - The
  source code for the `@urbit/http-api` NPM package.

#### Desk and Glob

- [App publishing/distribution docs](/docs/userspace/dist/dist) -
  Documentation covering third party desk composition, publishing and
  distribution.

- [Glob documentation](/docs/userspace/dist/glob) - Comprehensive documentation
  of handling front-end files.

- [Desk publishing guide](/docs/userspace/dist/guide) - A step-by-step guide to
  creating and publishing a desk.
