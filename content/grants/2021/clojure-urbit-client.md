+++
title = "Clojure Urbit Client"
date = "2021-10-25"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev - Other"]
[extra]
image = ""
description = "Urbit client for the Clojure programming language"
reward = "3 stars"
champion = ["~littel-wolfur"]
assignee = ["~sorted-falnyd"]
grant_id = "P0072"
completed = false
canceled = true
link = ""
+++

## Clojure Urbit Client

Clojure is a functional dynamically typed lisp which runs on the JVM. It lends itself very well to designing correct, situated programs and can easily benefit from the JVM ecosystem. Being functional and immutable by default makes Clojure a good fit for building concurrent event driven systems.

### Design

With the end goal of an alternative, cross platform desktop client for Urbit, the steps are as follows:

- A SSE client in Clojure
- An Urbit client library built on top of the SSE client
  - Should at least be able to programmatically communicate with chat app and query graph store
  - The client should also be usable from Java
- GUI
  - Why run a browser at all? Urbit is all about APIs
  - Will need to choose between JafaFX and SKIA
  - JafaFX: mature, stable, has cljfx which provides an excellent model
  - SKIA: up and coming framework, has native capabilities, less mature
  - Will run on any platform which can run Java
  - If one day Urbit is ported to Java, imagine the possibilities of running the GUI and server in the same process

## Milestones

### Milestone 1 - Create client and send/recieve messages

Expected completion: 4 - 5 weeks

Payment: 1 star

- SSE client (10)
  - Build a fully [specification](https://html.spec.whatwg.org/multipage/server-sent-events.html) compliant SSE client (10)
  - Have zero external dependencies besides Clojure and JVM
  - Expose low-level callback-based API
  - Distribute to Clojars
- Clojure Airlock API (35-40)
  - Study [Urbit's API](https://urbit.org/docs/arvo/eyre/external-api-ref) (2)
    - Setting up a connection
    - Creating subscriptions
    - Interacting with specific applications
  - Design an Airlock client (3) + review + fixes (?1)
  - Design principles
    - Data driven API: send data, recieve data
    - Support concurrency
    - Build up abstractions
    - Event driven
    - Interactivity and introspection are a must
  - Core implementation (10)
    - Handle primitives such as connections, acks and subscriptions
  - Application level implementation (20-25)
    - Chat (10-15) << Start here
    - Notebook (5)
    - Index (5)
  - Distribute to Clojars

### Milestone 2 - Develop and deploy GUI

Expected completion: 5 - 6 weeks

Payment: 2 stars

- JVM Clojure GUI (25-30) initial phase, (20-30+) secondary phase, total (45-60)
  - Design and define a UI + review (3)
    - Prioritize programmatic abstraction and interaction. They can always enable user experience and features. e.i. correctness > features.
    - Prioritize usability over aesthetics: I am not a designer, but if I make something useful which works a designer can easily contribute to it.
    - Interactivity: UI is Clojure process, can be modified and interacted with programmatically, live.
    - Stateless design?
    - Initial implementation should already be useful
  - Features and functionality (tagged by order)
    - Log in #A
    - Local and remote processes #B
    - Basic configuration #A
    - Full configuration #B
    - Chat #A
    - Notebooks #B
    - Index #B
    - Group navigation #A
    - Background connections #B
    - Local cache #C
    - Search? #C
    - Media embedding #A
    - Links embedding #B
    - Markdown rendering #C
    - GUI layout controls #C
    - Log levels #A
    - REPL interaction #A
    - Keyboard and mouse navigation #B
  - Technology survey (2)
    - Seesaw (Swing)
    - cljfx (JavaFX)
    - Membrane (backend agnostic, can target mobile in future!)
    - SKIJA?
  - #A Initial implementation (15-20)
  - Distribution and packaging (5)
    - Support Windows, OSX, Linux
  - #B Intermediary implementation (20)
  - #C Bells & whistles (10+)
