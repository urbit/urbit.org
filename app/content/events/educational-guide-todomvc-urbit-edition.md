+++
title = "Educational Guide: TodoMVC, Urbit Edition"
date = "2021-01-04"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Other" ]

[extra]
image = ""
description = "The goal of this bounty is to create a series of guides that can instruct a newcomer to Urbit as to how to go about creating a full-stack application from scratch."
reward = "10 stars"
assignee = ["~rabsef-bicrym"]
id = "1372696624"
completed = true
canceled = false
link = ""
+++

## Overview

The goal of this bounty is to create a series of guides that can instruct a
newcomer to Urbit as to how to go about creating a full-stack application from
scratch. Together, they'll form a an introductory course to development on
Urbit.

The application we'll demonstrate is the classic [TodoMVC](http://todomvc.com/examples/react/#/) app, which many
developers will be immediately familiar with. Even if a newcomer isn't familiar
with TodoMVC, it's quite easy to get a handle on it because it's a todo
list--surely _everyone_ at this point has experience with todo lists.

The classic TodoMVC example is a simple, functional and aesthetically pleasing
web-based todo list. What it lacks, however, is any form of persistence or
collaborative qualities; both of which are complex undertakings with traditional
web development. Our guide will demonstrate just how simple it is to give an
application these capabilities on Urbit, leading to a production-ready application.

## Part 1: Serving Static Content

Urbit ships with a web server called `eyre` which can do most of the things that
any other web server can, including serving static content, like a single page
application.

By default, your Urbit is configured to serve Landscape at the `/` and
`/~landscape` URIs. Landscape is a single-page application that performs its own
client-side routing, but it's also possible to serve other applications as well.
For reference, see the
[debug](https://github.com/urbit/urbit/blob/959b585b384f66e54421f70f95d6d152077907bb/pkg/arvo/app/dbug.hoon)
application, which is a standalone application served from the `/~debug` URI.

Our goal is to serve a pre-built `TodoMVC` application at the route `/~todo`.
It's important to note that this process could be applied to serve _any_ HTML
file, whether it's a single-page application or not. With very little
imagination, it becomes easy to see how one could serve their personal blog at
`/~blog`, or a static "About Me" page at `/~about`.

Urbit as a personal _file_ server is useful in and of itself, but it will
require a basic understanding of Hoon, Clay, Gall, and the development
environment more generally. We'll break this guide into two sections: one
focused on getting a development environment set up, and another on actually
using it.

### Part 1a: Setting up your Development Environment

This section is fairly straightforward, as it has been covered many times
before. ~timluc-miptev's gall guide has a [great
overview](https://github.com/timlucmiptev/gall-guide/blob/master/workflow#three-workflow-options)
of how to work with fake ships efficiently, and the existing documentation has
plenty of material material.

After the basic process of getting started, we'll want to cover how to develop
against a separate project repo, why you'd want to do that, how files are synced
with development ships (this is essentially the "deployment process"), and how
to use some basic generators.

This guide should satisfy the following user stories, each of which start with
_As a new developer reading this guide, ..._:

- I can install the Urbit binary.
- I can boot a fake ship for development.
- I can mount a pier.
- I can create new fake ships quickly.
- I have set up a project repository for my code.
- I understand the relationship between my project repository and my ship.
- I can copy files from my project repository to my ship.
- I can use a generator to inspect the contents of copied files.

### Interlude: Hoon, Clay and Generators

At this point it's probably worth digging a little deeper into some of the
things that were skimmed over in the last part. For starters, we did a good
amount of work with `clay` in the last lesson without really digging into what
it is or how it works.

To start, let's talk a bit about what a pier is and its relation to the unix
filesystem, the way files are represented and how to navigate our pier from
within Urbit (_e.g._ `+ls %`, `+cat %/gen/cat`), and what `|mount` and `|commit`
are doing (at a high level).

That might be a good segue into some basic Hoon via a super simple
generator--just enough to explain important syntax rules (_e.g._ ace v. gap),
the concept of runes, and provide links to places where you can learn more about
all of these things.

### Part 1b: Serving the TodoMVC Application

This section covers the process of serving static content to a URI within your
Urbit.

First, you'll need to select a version of TodoMVC to use. For a modern and
widely understood version, I'd recommend the
[react-hooks](https://github.com/tastejs/todomvc/tree/master/examples/react-hooks)
version.

The meat of this section is really in creating a simple gall agent that can be
used to serve the TodoMVC app directory. There are two ways you could go about
this: a) use the `file-server` agent, or b) use `eyre` directly, as is done with
the
[`dbug`](https://github.com/urbit/urbit/blob/959b585b384f66e54421f70f95d6d152077907bb/pkg/arvo/app/dbug.hoon)
application. Regardless of which option is chosen, a demonstration of the
conversion from one to the other would be an informative bonus lesson.

By the end of this lesson:

- I understand what Gall is at a high level.
- I know what an _agent_ is.
- I know how to start a gall agent.
- I can serve a static file (or directory of files) from a URI on my ship.

## Part 2: Data Modeling

Now that we can serve a TodoMVC client, our next goal is to get it to actually
persist its data. In order to accomplish that we'll first have to spend some
time thinking about what our data actually looks like.

There are two broad areas of our data model that we'll want to think about:

1. What kind of data will represent our state, and
2. What kinds of actions we'll take to modify our state.

After working through what we'll want to store and how we'll make changes to the
items in that store, we should then segue into how to represent our data as Hoon
types. The natural language description of our data model should lend itself to
a corresponding representation in Hoon, allowing the reader to mmediately ground
the Hoon in an understood domain.

Through the course of discussing how to represent todos and the actions to take
upon them, the concepts of molds, standard library types and Hoon's type system
can be gently introduced.

By the end of this lesson:

- I know how to define my own structures.
- I know how to interpret the contents of my `/sur` directory.
- I have a basic understanding of Hoon's built-in types and structures.
- I know how to work with types in the Dojo.

## Part 3: Taking action

In the last lesson we defined our data model and the actions that will be taken
upon it. In this lesson we'll extend our original gall agent to be aware of our
data model.

First, we'll cover the concept of a `poke` by handling the actions we defined in
the previous lesson. Along the way we'll need to set up our agent's state using
the types we defined previously. This portion will be an ideal time to introduce
the way a running agent can be poked from the dojo.

After using `~&` to print our state upon various actions for a while, we'll
demonstrate the purpose of `scry` and extend our agent's `on-peek` arm to expose
ways of reading our state through direct, explicitly written scrys.

By the end of this lesson:

- I know how my application store its state.
- I know how to modify my application's state.
- I know how what a `poke` is, what it's for, and how to respond to one.
- I can poke my agent from the dojo.
- I know what `scry` is.
- I know how to expose scry paths in `on-peek`.
- I can `scry` my agent.

## Part 4: Client Integration

There's a lot to cover in this section, so it'll probably be best to break it up
into multiple sections. When integrating with a client we need to take care of
writing to our urbit and receiving data from it when things change, which means
we need to understand a) how to work with JSON data coming and going from our
ship to the browser, b) the architecture of how Urbit interacts with the outside
world over HTTP, and c) how to combine this knowledge into a React application.

### Part 4a: Working with JSON in Hoon

Most of the outside world speaks in JSON, which means that our Urbit, at least
for now, also needs to understand how to parse and serialize its data into this
structure.

Parsing JSON in JavaScript is fairly straightforward, because JS is dynamically
typed; Hoon however, is statically typed, which makes our task a bit more
challenging.

This guide should cover the process of both parsing JSON into Hoon data
structures and going the other way; turning Hoon data structures back into JSON
for sending to a client.

By the end of this lesson:

- I understand how to parse JSON in Hoon.
- I understand how to serialize Hoon into JSON.
- I understand how Hoon's type system relates to JSON parsing.

### Part 4b: Client-server architecture & subscriptions

Urbit makes heavy use of [Command Query Responsibility
Segregation](https://www.martinfowler.com/bliki/CQRS.html), or CQRS, which means
that our application can either issue _commands_ or _queries_, but not both
simultaneously. This is contrasted with the more common Create Read Update
Delete (CRUD) model, in which our client is performing more direct manipulation
of records in a datastore. In Urbit, CQRS is paired with an [Event
Sourcing](https://www.martinfowler.com/eaaDev/EventSourcing.html) approach,
which means that our model for receiving information on the client is as a
stream of events.

In a CRUD-style model, a Todo client would work as follows:

1. Client queries (Read) for all todos to load into the page.
2. Client creates (Create) a new todo, which produces a response with the new
   todo.
3. The returned todo is added to the list.

To contrast that with a CQRS + Event Sourcing model, we'd have the following:

1. Client queries for all todos to load into the page.
2. Client sets up a subscription to receive any new todos that are created as
   events.
3. Client issues a command to create a new todo, which produces _no response,_
   since these responsibilities are separated.
4. After the new todo is created by the server, it emits an event which is
   picked up by the subscription in step (2), which is then added to the list.

In practice, step (1) above is actually unnecessary, because the subscription in
step (2) can be configured to produce all todos as an initial event upon
instantiation.

This pattern is implemented in Urbit with `poke`, `scry`, (covered in the last
section) and `watch`. A `poke` is our terminology for a command, a `scry` is for
querying, and `watch` is for subscribing to updates to our data when they
happen. We've already seen commands (`poke` and queries (`scry`), but
subscriptions (`watch`) are new, and much more commonly used than queries for
the same reason as our query above could be eliminated.

Most web developers are much more familiar with the CRUD approach than they are
with the model that Urbit uses, so it's worth explaining why this more complex
approach is employed.

The answer becomes clear when you consider Urbit's primary purpose, which is for
building distributed systems. In a distributed system, each agent is interacting
with many others through message passing. Imagine a chat application, in which
many agents are sending messages at once: creating a message and then adding the
returned message into your UI would work for messages _you_ send, but would miss
any messages sent to you by other agents. In Urbit's approach, messages sent by
other agents are no different than those sent by your agent, meaning the same
implementation that handles one agent also handles _n_ other agents.

After explaining the rationale behind the approach, we'll want to demonstrate
how to extend `on-watch` to expose our todos, how to publish events to
subscribers, and how to get those events to a client. This lesson should focus
on making the mechanics of getting information from client to server and back
again clear--actually wiring up the TodoMVC frontend can wait until the next
lesson.

By the end of this section:

- I understand why a client sets up subscriptions instead of receiving direct
  data responses.
- I know how to expose data to subscribers via `on-watch`.
- I know how to publish state changes to subscribers.
- I understand how data travels from my client to my ship.
- I understand how data travels from my ship to my client.

## Part 5: Collaboration

The final phase of this guide should demonstrate the ways in which applications built on Urbit can communicate with one another. TodoMVC has no built-in interface mechanic for this, so you'll have to be a bit creative and think through what "multiplayer mode" looks like for TodoMVC. It's okay for this to be fairly simple, as our goal is to demonstrate how to extend an agent to work with others—not to build a great collaborative todo list.

It's likely (and desirable) that the addition of this feature introduces the need to update our data model to handle todo lists belonging to multiple different ships (since before we were only dealing with our own todos). That makes this an ideal time to demonstrate how to upgrade our application's state to a new version, as one would do in the real-world with a major feature addition.

By the end of this section:

- I understand how to set up a subscription on a foreign ship.
- I understand how to tear down subscriptions.
- I understand how to store and represent data belonging to multiple ships.
- I understand how to upgrade my application's state.

## Deliverables

Your solution to this bounty should include:

- A standalone repository with gall agent(s) that demonstrate each working part.
- A pull request against the [urbit/docs](https://github.com/urbit/docs) repository that adds guided tutorials for each section.

## Expectations

You will work closely with the director of urbit.org on this project. This means that regular check-in calls will be held to discuss the project's progress. Additionally, the you are expected to provide regular status updates on the project to the Urbit community via twice-monthly updates on this bounty.

The director will ensure that you have access to the necessary resources to complete this project. All prior work done on this project will be explained and made available to you, and should questions arise that require the expertise of engineers at Tlon, time will be made (schedules permitting) for your questions to be answered either in writing or over a call.

## Milestones

### Part 1: Serving Static Content

2 stars
Sample code and guide are completed and ready for merge against urbit/docs.

### Part 2: Data Modeling

1 stars
Sample code and guide are completed and ready for merge against urbit/docs.

### Part 3: Taking Action

1 stars
Sample code and guide are completed and ready for merge against urbit/docs.

### Part 4: Client Integration

3 stars
Sample code and guide are completed and ready for merge against urbit/docs.

### Part 5: Collaboration

3 stars
Sample code and guide are completed and ready for merge against urbit/docs.
