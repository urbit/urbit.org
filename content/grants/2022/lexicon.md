+++
title = "Lexicon: simple dictionary app"
date = "2022-07-18"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "A simple dictionary app with ability to add custom definitions for a group."
reward = "1 star ($3k bonus if done by Assembly)"
assignee = ["~bitful-pannul"]
grant_id = "B0162"
champion = ["Holium"]
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0162&prefill_Grant+Name=Lexicon"
+++

## Rationale

Different groups may have different definitions for words. They may make up their own words or give words new meanings within the context of their group. We want to support the ability to manage these group-specific lexicons, while also allowing for displaying standard definitions.

## Overview

`lexicon`: urban dictionary for communities. Should allow for the user to create custom definitions.

## User stories

1. As a user, I want to view my group's lexicon.
2. As a user, I want to add a new word to my group's lexicon
3. As as user, I want to add a definition to a word already added to my group's lexicon
4. As as user, I want to add an example sentence to a word already added to my group's lexicon
5. As a user, I want to upvote or downvote a word, definition, or example sentence.
6. As a user, I want to search for words with a search bar
7. As a user, I want to view standard dictionary definitions when a word has been added by my group.

## Architecture

The backend agent should store words per group (or space) path (i.e. ~lomder-librun/my-group).

There should be a map of words that then have an array of definitions that are sorted by the number of upvotes / downvotes. The ability to add words or definitions should be able to be permissioned based on the following:

- member
- admin
- moderator

For example, a group may allow members to write definitions, but only admins can add new words. This should be able to be configured by the admins or owner.

The agent should also query out to https://dictionaryapi.dev/ if a word is not found in the word map.

Holium will work with the developer(s) to provide frontend support, but the team working on this bounty will be responsible for frontend implementation.

## Milestone 1: 1 star ($3k bonus if done by Assembly)

Have a working dictionary app that fulfills the user stories above.

For the milestone to be completed, the app must be approved by Holium and it must be hosted for distribution on Holium's app star (as well as your own if desired).

## Future work

- Publicly permission words so groups can link their lexicons to each other.
- Hooking into the Realm Oracle for quickly searching words

## Worker Requirements

- At least one year of professional programming experience
- Experience with full-stack development, including JS and some server-side language
- Graduated from Hoon school
