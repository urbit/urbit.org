+++
title = "Urbit HTTP Library for Ruby"
date = "2020-11-04"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev Tool" ]

[extra]
image = ""
description = "Create a Ruby language HTTP library to connect to Urbit."
reward = "3 stars"
assignee = ["~winter-paches"]
id = "227255220"
completed = false
canceled = true
link = ""
+++

Patterned per document:
https://docs.google.com/document/d/1no5oos_NE8LrUWz7iG9SKZMTIzruZVevZQ75nD5OHmI/edit.

I am a long-time (20+ years) ruby coder and would love to take this on. I tried my best to ballpark the timeframe off the code I have seen as well as the fact that I still have an pretty full day job. ;) I am open to discussion on the timeframe(s) if it is too long.

## Milestones

### Basic HTTP Interface

1 stars
This involves building a mechanism for sending and receiving JSON to/from an Urbit ship.

### Graph Store Interface

1 stars
Using the basic HTTP interface referenced above, create an interface to graph-store.

### Additional Agent Interfaces

1 stars
Landscape gall agents that can be interfaced with over the HTTP interface. I will implement settings-store and group-store.

After completion, I also commit to implementing invite-store, contact-store and metadata-store in order to complete [Mars Base 10](https://github.com/Zaxonomy/mars-base-10).
