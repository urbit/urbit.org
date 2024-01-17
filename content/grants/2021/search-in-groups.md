+++
title = "Search in groups"
date = "2021-02-24"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Implement a basic text search in groups channels"
reward = "2 stars"
assignee = ["~nortex-ramnyd"]
id = "835369230"
completed = true
link = ""
+++

I saw this post in u-c feature requests channel [~bitbet-bolbel/urbit-community/resource/publish/ship/~bitpyx-dildus/feature-requests/note/170141184504903337445158066480138420224](http://localhost:8080/~landscape/ship/~bitbet-bolbel/urbit-community/resource/publish/ship/~bitpyx-dildus/feature-requests/note/170141184504903337445158066480138420224)

> Even the sort of thing that could be thrown together in an afternoon would be 1000x better than nothing.

and I likewise thought even a basic search function would be immediately useful

## Design

The user-facing interface would be a shoe app where you enter your search word into prompt and then select from which group you would like to search from. There are additional (optional) parameters: search from a specific @p, search from before, after or specific timeframe, search from specific channel, nr. of posts to search (from latest). The app then returns the posts that contained the search word, going back as far as was specified in the nr. of nodes parameter (e.g. last 200 posts). If there is more (older) posts to search from, prompt asks if you want to search more posts.
This basic version of search only searches for exact word from post, when limited between whitespace and contains English characters. Later iterations will bring more improvements.

There will also be a generator with nearly same functionality but it's stateless so could only search specified fixed nr. of posts.

## Milestones

### search generator done

1 stars
↑

### shoe app done

1 stars
↑
