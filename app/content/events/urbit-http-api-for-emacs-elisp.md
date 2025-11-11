+++
title = "Urbit HTTP API for Emacs (elisp)"
date = "2021-01-17"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Tool" ]

[extra]
image = ""
description = "Connecting Urbit with Emacs would enable all sorts of cool and creative apps. I'd love to be able to chat without leaving my editor."
reward = "3 stars"
assignee = ["~winduc-dozser"]
id = "1206158911"
completed = false
canceled = true
link = ""
+++

I've been poking around in Emacs to test the feasibility of this project, and I think it will work out pretty well. The biggest obstacle I found was the lack of SSE client library, but I already have a solution.

Milestones have been adapted from this google doc: https://docs.google.com/document/d/1no5oos_NE8LrUWz7iG9SKZMTIzruZVevZQ75nD5OHmI/edit

## Milestones

### Basic HTTP Interface

1 stars
Implementation of the HTTP interface to send JSON to/from an Urbit ship.

### Graph Store Interface

1 stars
Implementation of graph-store interface.

### Additional Agent Interfaces

1 stars
Implementation of at least two of the following interfaces: contact-store, invite-store, group-store, and metadata-store.
