+++
title = "Overview"
weight = 1
template = "doc.html"
+++

This guide will give you a full, working knowledge of every aspect of creating
Gall modules in Urbit. Over the course of the guide, we will build up a code
review/homework submission app that uses all aspects of Gall and a Landscape
frontend.

This guide is for anyone with an intermediate knowledge of Hoon (Hoon School 101
should be enough). To write Gall apps that interact with the frontend, you'll
also need some knowledge of Javascript.

## Table of Contents

### Backend Foundation (Gall 101)
* [Workflow Setup](/docs/userspace/gall/guide/workflow)
* [The 10 Arms of Gall: App Structure](/docs/userspace/gall/guide/arms)
* [App Lifecycle and State](/docs/userspace/gall/guide/lifecycle)
* [Importing Code and Static Resources](/docs/userspace/gall/guide/ford)
* [Talk to Ships: poke, watch and marks](/docs/userspace/gall/guide/poke)
* [scry & on-peek](/docs/userspace/gall/guide/scry)
* [HTTP & Static Files](/docs/userspace/gall/guide/http)
* [Call from Outside: JSON & channel.js](/docs/userspace/gall/guide/chanel)

### Other Resources
* [Generators in Gall](/using/os/shell#gall)
* [Troubleshooting & FAQ](/docs/userspace/gall/troubleshooting)
* [Types Used in Gall Apps](/docs/userspace/gall/data-types)

## What Is Gall?
Gall is a program (OS kernel or "vane") that runs in the background on Urbit's
operating system, Arvo. It manages most of the programs you think of as Urbit's
apps.

### Platforms, Not Just Applications

Gall's capabilities go well beyond what you normally think of as "standalone
applications." Because of Urbit's design, Gall apps/modules can [cleanly
interact](https://ngnghm.github.io/blog/2015/12/25/chapter-7-platforms-not-applications/)
with other apps/modules on the local ship or remote ones. They also can call the
operating system in ways that are much more manageable than you may be used to
in Unix programming (if you have that background).

Gall modules can, for example:
- run background chron jobs that periodically check your data
- coordinate data sources from other Gall apps
- provide full-blown user experiences with frontend
- run database resources that back multiple services

Most of the Urbit apps we know and love, like Chat and Publish, are Gall
applications, but so are the "background" modules that coordinate your
experience, like the `group` data store and logic.

Gall handles all messages going into your app, and routes all messages going out
from your app to the correct destination.

### Gall's Responsibilities
* App Registration: Gall listens for commands to register new user applications
  and start watching them.
* Compilation: Gall re-compiles registered apps whenever their source code
  changes.
* Upgrades: Gall manages an app's transition from one version to the next,
  making sure that all old data is imported correctly to the new version.
* Requests between a Gall app and Arvo vanes: Gall provides a layer between all
  of its registered apps and calls out to the Arvo OS, for operations like HTTP
  requests/responses and file access.
* Requests between Gall apps themselves: Gall apps on one ship can send each
  other calls and request data to be processed.
* Requests between Urbit ships: Gall provides interfaces to handle all the
  messages that happen when ships send messages to each other, or subscribe to
  resources on each other.


## Gall vs Generators
You probably have written generators when learning Hoon. Generators are awesome!
However, they have a different use-case from Gall apps, and it's important to
understand when you want each of them.

### Generators
Generators are used to process data. They take in some simple input, like an
argument or the current state of your ship, and return a value based on that.
They're similar to command-line utilities in Unix.

### Gall
Gall apps are for when you want a longer running service, more like a daemon in
Unix, something that's always running in the background, waiting for messages.
Typical use cases:
* HTTP handling
* Work with the OS
* Long-running application on your ship
* Hosting a remote service for other ships

## A Diagram
![Gall
Diagram](https://storage.googleapis.com/media.urbit.org/docs/userspace/gall_diagram.png)

## What Do I Need to Know?
To write Gall programs, you need a decent understanding of Hoon. To write Gall
programs that use Landscape, you need to know Javascript. For the JS part, we'll
go over in a lot of detail, so that even if you haven't seen much React, you'll
be able to follow along.

## Creating a Real Application
Over the course of the "Backend Foundation" series, we will create the backend
for a group chat admin app, `picky` that allows monitoring and management of
users in all chats you are an owner or admin of. In each lesson, the exercises
will build on each other to progressively create the application.

## Final Notes
Throughout this guide, I generally use "prose" explanations. When a certain
section is very code-heavy (such as breaking down all pieces of a type), I put
the whole thing in a code block and use comments (`::`) to explain.

Also, while Gall applications are technically referred to as "agents", I also
use the words "app" and "program" at times. All are equivalent.

