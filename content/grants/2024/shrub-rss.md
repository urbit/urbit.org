+++
title = "Shrubbery RSS Integration"
date = "2024-07-19"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Tool"]

[extra]
image = ""
description = "Pull RSS/Atom media into the namespace."
reward = "3 stars"
assignee = [""]
champion = ["~migrev-dolseg"]
grant_id = "BO383"
completed = false
canceled = true
+++

RSS has been an important primitive for Web 1.0, 2.0, and web3, fundamentally unchanged since 2002. There’s been renewed interest in the standard in recent years as “enshittification” became a meme and both creators and consumers more keenly felt the limits of the walled gardens that controlled their media distribution.

Urbit’s personal server model and programmable global namespace stand to unlock RSS’s full potential as a standard for a decentralized, user-owned, peer-to-peer media ecosystem. For a start, a user should be able to subscribe to clearweb RSS (and Atom) feeds and store them in their namespace.

## User Stories

* I can create an `%rss-aggregator` shrub at a given endpoint.
* Browsing to my `%rss-aggregator` shrub provides a UI for browsing an ordered list of `%rss-entry`s that let me click through to the relevant webpage, and a UI for entering a set of subscription endpoint URLs, which will be represented as `%rss-subscription` children.
* When I enter a new endpoint URL to my `%rss-aggregator` shrub, it will create an `%rss-subscription` child whose children will be populated with a backlog of prior entries from that endpoint as `%rss-entry`s.
* From then on, each new entry from that endpoint will populate in the children of the `%rss-subscription` as `%rss-entry`s, fetched via a refresh timer.
* I can add as many new endpoints to my `%rss-aggregator` shrub as I like, and the shrub will aggregate the subscriptions to each of them and organize them by timestamp.

## Milestone 1 (2 Stars)

Shrubbery implementation and protocols for subscribing to any clearweb RSS/Atom endpoint, populating the namespace with RSS/Atom entries, and periodically fetching new items from that endpoint.

### Namespace design

The following namespace design is a suggestion. What’s implemented is left to the discretion of the grantee and their Champion.

* `/imp/rss-aggregator`
  * Stateless.
  * Exposes CRUD interface to `%rss-subscription` imps.
* `/imp/rss-subscription`
  * State is `%rss-feed`.
  * Kids are `%rss-entry`s, addressed by their timestamp.
  * Pokes: fetch new entries, configure fetch timer.
* `/imp/rss-feed`
  * State could be an `%rss-channel` or `%atom-feed`.
  * No pokes, just a document type for an RSS feed.
* `/pro/rss-channel`
  * RSS channel metadata.
* `/pro/rss-item`
  * RSS item.
* `/pro/atom-feed`
  * Atom feed metadata.
* `/pro/atom-entry`
  * Atom entry.

## Milestone 2 (1 Star)

A Sky-compatible web interface for creating RSS/Atom subscriptions and exposing them through a unified UI that treats the aggregate of all RSS/Atom subscriptions as a single feed.

* `/con/rss-aggregator-htmx`
  * View of top-level aggregator, sorts all entries in namespace below by timestamp.
  * Renders previews of each entry with clickable links to open the corresponding webpage or filter for entries from that entry's publisher.
  * Exposes UI for adding, editing, and deleting subscriptions.
* `/con/rss-subscription-htmx`
  * View of single RSS feed, renders previews of each entry organized by timestamp.
  
At the end of the bounty, the grantee should give feedback on the Shrubbery developer experience via a survey that will be provided by the Urbit Foundation.
