+++
title = "Urbit Feed Aggregator"
date = 2021-07-16
[taxonomies]
grant_type = ["proposals"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "A feed aggregation application"
reward = 5
assignee = "~mirtyl-wacdec"
grant_id = "P0043"
completed = false
link = ""
+++

### Project Name

Urbit Feed Aggregator

## Purpose

Urbit as it stands now (June 2021) is a very functional social network, but it's not yet making use of all the strengths of its computing model.
As a personal server Urbit is the perfect platform to build a centralized social media consumption application.

Urbit TweetDeck (henceforth UTw) is two applications in one. On one side, it's a Microblogging app. A Twitter clone, basically. Users have individual feeds; you can follow, be followed, and keep custom lists of users.
Most importantly, though UTw can fetch data from external sources and present them for consumption, and interaction with the Microblogging app.

Most internet users subscribe to a variety of data sources. Twitter, Facebook, Reddit, YouTube; this or that internet forum. Maybe some RSS feeds.
You will be able to import that data (scraping if public, fetching it if authenticated) and keep it as a column in the interface. You will also be able to share that data on your microblogging feed; "retweeting" or quoting data from any source you're subscribed to.

The interface (as of now) follows TweetDeck; a deck of multiple columns, each displaying data from a single source, with vertical scroll.

"Alternative frontends" such as Nitter or Invidious exist for many mainstream applications, but they all have one big problem: rate-limiting. Urbit solves this issue by having individual users do their own data fetching. No application can possibly block individual users fetching data for normal, personal use. That is literally a problem that only Urbit is equipped to solve.

* Target User

Target user is any social media user who wants their data in a single dashboard, most especially people who like microblogging and would enjoy a way of easily sharing or commenting on their own data to their followers.

* What does it enable to be further built afterwards, and how does this advance Urbit's strategic goals?

A plugin system will allow data fetching and interaction from virtually infinite internet data sources. This achieves one of the earliest goals of Urbit, aggregation of internet data in a single private interface, where data is under your own control. It also essentially kills Twitter; it replicates all its functionality, and then some.

## End Product

* Urbit code produced

UTw would be an external application, to be installed as a third-party package once the capability exists.
It does not require to be merged into core but it does require to extend the present functionality of graph-store, e.g. a timeline generator (scrying multiple resources at once) would be required, and that capability would be useful, we believe, to merge into core.

* Non-Urbit binaries or code produced
Beta version will be released as an external Elixir web-app that connects to Urbit via Airlock. Final version should be a lansdcape-ish React frontend on a (minimal) hoon backend

* Documentation
We'll have a tutorial but the app is quite self-explanatory. Documentation for plugin development will be provided.

## User Stories

* As a normal user, I will be able to: 
  - Set up an Urbit based microblogging feed, where I can post short pieces of text, upload or share (within limits) images, videos or audio files.
  - I can follow other Urbit users who use the app, as they can follow me, and I can keep custom lists of people I follow, generating a Twitter-like timeline of either lists or all people I follow.
  - I can also browser Twitter while inside the same app, just adding a new column in the interface.
  - While on Twitter columns I have access to all the functionality Twitter has; I can follow people, keep them in lists. That data is stored in my Urbit's settings-store, where nobody can track it.
  - I can quote or "retweet" tweets onto my Urbit feed, allowing me to share data from Twitter while inside Urbit, with a single click.
  - I can also share those Urbit Feed posts in other Urbit channels with a couple clicks.
  - If I have a Twitter account I can also login and use UTw as an alternative Twitter frontend. I can manage my lists and follows, post to Twitter. Maybe set up automatic crossposting and keep my Urbit and Twitter feeds in sync.
  - As new plugins come online I will be able to do the same as above, but with data from Facebook, Instagram, YouTube, Reddit, what have you. Email? Sky is the limit.

* As a developer I will be able to:
  - Make plugins to integrate a data source into UTw. Basically just a custom scraper (a way of telling UTw how to fetch and render the data).

## Resources

We Have been in contact with ~timluc-miptev and ~tacryt-socryp.


## Milestones

### Basic microblog - 1 star
Basic microblog functionality implemented with integrated Twitter client.

### Twitter integration - 1 star
Twitter Login implemented, enabling cross-posting and import-export of data between Urbit and Twitter.

### Graph-Store integration - 1 star
Full Urbit graph-store interaction implemented: live DMs, share-to-chat, export-to-notebook and collection.

### Email/RSS integration - 1 star
Email and RSS feed importing implemented.

### Plugin creation - 1 star
Plugin system implemented, enabling developers to integrate any data feed into the app.



    
