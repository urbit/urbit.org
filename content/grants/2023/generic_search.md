+++

title = "Generic Text Search Tool"
date = "2023-09-01"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "Generic Text Search Tool for Urbit"
reward = "2 Stars"
assignee = ["~macrep-racdec"]
champion = [""]
grant_id = "P0292"
completed = false
canceled = false

+++

# Description

The agent builds an index as other agents poke it with text to be indexed, and returns search results when poked with a query. The agent should support complex boolean queries, and should support fuzzy search and search suggestion if possible.

The pull request to %blog adds an HTTP path for search queries (on an opt-in basis), and adds a search bar option to the blog's theme selection.

# Milestones

## Milestone 1

Deliver an indexing agent that supports keyword text search at a practical speed.

Reward:  One star.

## Milestone 2

Deliver a pull request to %blog that works with the indexing agent to make published blogs searchable. 

Reward: One star.

# Total Compensation

2 Stars

I estimate one to two months per milestone, approx. three months total.
