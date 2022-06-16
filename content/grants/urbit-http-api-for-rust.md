+++
title = "Urbit HTTP API for Rust"
date = "2020-12-15"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "This proposal seeks to create an API to interact with an Urbit ship over HTTP written in Rust."
reward = "3 stars"
assignee = ["~mocrux-nomdep"]
id = "1120978319"
completed = true
canceled = false
link = ""
+++

This proposal seeks to create an API to interact with an Urbit ship over HTTP written in Rust.

Rust is becoming a very popular language due to it's speed, safety, and portability.

**Outline**

This proposal comprises of the three milestones as defined in this doc: https://docs.google.com/document/d/1no5oos_NE8LrUWz7iG9SKZMTIzruZVevZQ75nD5OHmI/edit

1. Basic HTTP Interface - Responsible for sending and receiving JSON to/from an Urbit ship

2. Graph Store Interface - Interface to the graph-store Urbit API on top of the HTTP Interface

3. Additional Agent Interfaces - Interface to the group-store and metadata-store Gall agents

**Plan**

While doing research/testing into the complexity of building out such a http api library, I've ended up 90% completing milestone 1. This milestone should be publicly released by the end of the week that this proposal is posted on.

From a quick look-over, milestones 2/3 do not seem too complex either, however I am also working full-time in tandem, and so my spare dev time is limited. As such the 2nd/3rd milestones are pushed out a bit further to provide some lee-way to ensure they're delivered on time.

## Milestones

### Basic HTTP Interface

1 stars
Implementation of the HTTP Interface responsible for sending and receiving JSON to/from an Urbit ship

### Graph Store Interface

1 stars
Implementation of the interface to `graph-store`, which sits on top of the HTTP Interface

### Additional Agent Interfaces

1 stars
Implementation of the `group-store` and `metadata-store` Gall agents.
