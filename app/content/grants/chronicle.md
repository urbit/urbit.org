+++
title = "Chronicle: News app"
date = "2022-07-18"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Chronicle is a news app that links all articles from group channels"
reward = "2 stars ($4k bonus if done by Assembly)"
assignee = ["~hanfel-dovned"]
grant_id = "B0161"
champion = ["Holium"]
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0161&prefill_Grant+Name=Chronicle"
+++

## Rationale

Group chat and DMs are a type of database. It is a collection of images, links, news articles, and commentary.
Much of this gets lost in the ever growing feed. What if there was a way to surface relevant information in different
types of views? This project hopes to enable that sort of functionality by providing a way to view all news links in a
new reader layout.

Having a news app that aggregates articles based on your interests and the groups you are in would save time from
endlessly scrolling back to check for new links in a chat channel. The app would organize the articles by
"date posted" in a news feed interface.

## Overview

`chronicle`: a news app that surfaces all links from your groups channels and organizes them into a timeline that should look similar to a newspaper. Imagine Google News, but for your group.

## User stories

1. As a user, I want to view all of my group's chronicle data in an aggregated view.
2. As a user, I want to be able to save to a link to a reading list.
3. As a group member, I want to view only my group's chronicle.
4. As a group member, I want to be able to upvote or downvote a link, which would allow for ranking articles.
5. As a group admin, I want to be able to "feature" an article that I feel is relevant to my group.

## Architecture

Considering groups are being refactored, this bounty is contingent on getting looped into the development releases of new groups in order to surface the data effectively. Modeling this on old groups will not achieve the goal of this bounty.

Once the new channel format is determined, the goal is to watch for updates of the new group/channel agent and parse out any {link: "<-some link->"} from a post contents and add it into the chronicle store with any metadata necessary (date, posted by, included comments).

The backend agent should store chronicles per group (or space) path (i.e. ~lomder-librun/my-group). If the new channel format does not support the same graph-store like path, we would need to generate one in this format.

Upvotes and downvotes would also need to be stored per link which can then be used for a scry that would rank links by day, week, month, and all time.

## Milestone 1: 2 stars ($4k bonus if done by Assembly)

Have a working news app with a UI that accounts for all of the requirements listed.

For the milestone to be completed, the app must be approved by Holium and it must be hosted for distribution on Holium's app star (as well as your own if desired)

## Worker Requirements

- At least one year of professional programming experience
- Experience with full-stack development, including JS and some server-side language
- Graduated from Hoon school
