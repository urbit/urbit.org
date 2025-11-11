+++

title = "Trill: your Urbit social feed"
date = "2022-05-10"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Urbit microblogging platform and social feed aggregator"
reward = "5 stars"
assignee = ["~mirtyl-wacdec"]
champion = ["~poldec-tonteg"]
grant_id = "P0127"
completed = true
canceled = false
link = ""
deliverable = "~sortug/trill"

+++
# Purpose
Urbit is a clean-slate computing stack, in the works for more than a decade. But it only came on the public spotlight when Tlon launched Landscape, the first social application on Urbit. Figuring chat, notebooks and link collections, Landscape is by far the most used application on Urbit, and a great example of the potential that the system has to become the basis of social computing, a truly new internet.
It follows that other forms of social networking should also be recreated, and enhanced, on Urbit. Here I propose Trill, an Urbit-based microblogging platform. Below are some simple user stories.

# User stories
- As a Trill user, I want to post messages to a timeline so I can share short pieces of text or media.
- As a Trill user, I want to follow other Trill users and keep up with their content.
- As a Trill user, I want to create lists of users, so I can categorize users and read their aggregated content as a single feed, thus keeping up on different topics.
- As a Trill user, I want to be able to share the list of users I have created, so people can share their lists of curated content.
- As a Trill user, I want to share, quote, react or reply to other user's posts so I can engage with them and their content.
- As a Trill user, I want to be able to set permissions to my content, whether to lock it down, and only allow whitelisted users to read my content, or block particular users.
- As a Trill user, I want to be able to limit who engages with me and my content, limiting who can reply to my posts.
- As a Trill user, I want to be able to expose my content to the wider internet, serving it as a public website, or keep it inside Urbit and make it readable only to Urbit users.
- As a Trill user, I want to be able to import content from other websites (e.g. Twitter, Instagram) or platforms and display embedded it inside my feed, but strip it of metadata so my data is not leaked to outside actors.
The above explains what is in effect a website very similar to Twitter or Weibo, but using Urbit as its backend. All data is self-hosted by Urbit users, and disclosed inside the Urbit network. Being an Urbit application, Trill can also be expanded in the future by allowing importing of external sources of data, fulfilling an old dream of Urbit as a universal API aggregator.
Developer

# Previous Work
I am ~mirtyl-wacdec, early grantee, author of the [Urbit Elixir API](https://github.com/mirtyl-wacdec/urbit_ex)

# Milestones
## Milestone 1
### Payment: 1 star
### Expected Delivery: May 2022
Basic Microblogging app, with markdown posting and a custom feed-store backend, and the ability to follow and engage with posts by other users with emoji reactions, replies, quotes and reposts.

## Milestone 2
### Payment: 1 star
### Expected Delivery: May 2022
Fully functional push and pull-hooks to propagate feed data across the network and persist subscriptions.

## Milestone 3
### Payment: 1 star
### Expected Delivery: May 2022
List functionality, where people can make named lists and keep lists of their follows there, and display them as a feed.

## Milestone 4
### Payment: 1 star
### Expected Delivery: May 2022
Integrated Twitter client, with the ability to add Twitter users to lists, share or quote Tweets into one's own Trill feed, or send Tweets into Landscape channels they belong to.

## Milestone 5
### Payment: 1 star
### Expected Delivery: July 2022
Permission layer, where people can limit who can read/write their posts, granular from the whole-feed to the individual post level.
