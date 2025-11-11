+++
title = "Urbit HTTP API for Python"
date = "2021-06-21"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Tool" ]

[extra]
image = ""
description = "Write an Urbit HTTP API (aka airlock) for Python"
reward = "1 star"
assignee = ["~novbyr-miclux"]
id = "P0029"
completed = false
canceled = true
link = ""
+++

## Vision

This proposed project will produce an API in Python language to interact with Urbit ship over HTTP with these [guidelines][airlock_requirements_link] in mind.

[airlock_requirements_link]: https://docs.google.com/document/d/1no5oos_NE8LrUWz7iG9SKZMTIzruZVevZQ75nD5OHmI/edit

## Design

1. Basic HTTP Interface: Building a mechanism for sending and receiving JSON to/from an Urbit ship. The features in urlock-py will be integrated into this repository.
2. Graph Store Interface: Interaface to graph-store Urbit API.
3. Additional Agent Interfaces: Interface to the group-store and contact-store Gall agent.

This will be done using the structure of [urbit http java api][urbit_http_api_java_link]

[urbit_http_api_java_link]: https://github.com/ynx0/airlock

## Me

I have been programming in Python for 5+ years now. I have used Python for a wide range of tasks like scientific computing, machine learning, batch scripting etc. I am currently in the 4th year of my PhD program. I am also a contributor to an open source Python project UQpy as part of my PhD.

## Milestones

### Complete the API

1 star

A Github repository of the Python API complete with the proposed features, installation guide(README) will be developed and released.
