+++

title = "%wock"
date = "2024-10-12"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev:Core" ]

[extra]
image = ""
description = "Lightweight Nock interpreter to run Hoon in the browser."
reward = "1 star"
assignee = ["~racfer-hattes"]
champion = ["~tamlut-modnys"]
grant_id = "P0398"
completed = false
canceled = false
+++

## Overview

Create SPA web apps without writing a line of JS or HTML. Just Hoon. %wock is an attempt to implement a complete toolchain for writing SPA web apps in Hoon. Sail and HTMX is great when you have simple forms with server-side validation. The moment you want something that is slightly more interactive you run into having to write JS and marshal your nouns into JSON. With %wock you will be able to write fully interactive SPA web apps in pure Hoon and send raw nouns over the wire.

### Milestone 1: A New Nock Interpreter

The existing Nock interpreters (vere and sword) are not portable enough to be compiled for the web. I tried. This means we will need yet another Nock interpreter. This time with a focus on portability and the web. The performance for general computations should initially be within an order of magnitude of vere. This means implementing a decent number of Jets.

The artifact will be: a Rust library which can be compiled to WASM and which exposes a function that can be called with jammed nouns to interpret raw Nock.

### Milestone 2: Interactive Sail

The goal of this milestone is to develop a framework with something similar to The Elm Architecture (and %gall agents): there should be some internal state that is maintained throughout and updated on new events (think pokes). Update events (gates that modify the state) are assigned to DOM events. The DOM is described using Sail or a similar structure.

This milestone does not include a virtual DOM implementation. It just replaces the whole DOM altogether. This milestone also doesn't include any kind of effects emitted from the page. Only internal state changes.

### Milestone 3: Effects

The goal of this milestone is to achieve the equivalent of cards in gall agents. This essentially involves writing a runtime for the web apps.

Effects should allow:

* Sending HTTP requests and handling their responses
* Poking %gall agents
* Subscribing to %gall agents

### Compensation

1 star will be awarded upon completion of the above 3 milestones.
