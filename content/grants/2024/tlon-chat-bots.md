+++

title = "Tlon Chat Bots"
date = "2024-06-08"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Create a library that will allow anyone to easily spin up chat bots and automation for Tlon Groups"
reward = "2 stars"
assignee = ["~motluc-nammex"]
champion = ["~palfun-foslup"]
grant_id = "P0356"
completed = false
canceled = false

+++

The following describes a small framework to facilitate the creation of chatbots for Tlon groups. A newly minted Hoon School finisher should have all the skill needed to quickly churn out useful bots using this library.

In addition to the library, we’ll release a small collection of sample bots that perform common tasks. These can be used out-of-the-box, or customized and riffed off of. New chatbot devs can also use these samples to see how to use the framework in the context of real, working bot code.

We hope that our experience developing chatbot.hoon will also serve as a case study on the strengths and weaknesses of the Groups API, giving a solid basis to inform future changes.


## Milestone 1: Library
ETA: July 2024
Reward: 1 Star

chatbot.hoon provides a bunch of arms for interacting with groups. Specifically, we want functionality that helps us with:

### State & Subscriptions
By default, the bot will simply subscribe to all %channels activity. However, we will provide an easy interface for narrowing that down to more specific sources in the Events library. Similarly, there will be functionality for initializing and updating the bot’s state.

Examples of using the library to manipulate different levels of state should be demonstrated in the sample bots.

### Incoming messages
- Receive messages from specified sources, e.g.
    - Messages that begin with a certain string, like /bot 
    - Emoji reactions
    - Channel creation / deletion
    - etc
- Messages arrive parsed into simple structures containing the type of message, author, date, contents, group info, etc

### Effects
- CRUD operations for bot state, organized by user, channel, group, or global.
- Assign & revoke privileges
- Run a task after/every n seconds, minutes, hours, or days.
- Send/edit/delete messages or replies to a specific group/channel/user
- Facilitate group administration
    - Create / delete channels
    - Delete posts
    - etc
- Simple HTTP functionality for interacting with Earth APIs

Ideally, we want to remain flexible and unopinionated, providing intuitive & simple interfaces. Users who prefer more guidance should clone one of the samples. We also intend to host a community repo where users can upload and share their own bots.

## Milestone 2: Sample Bots
ETA: August 2024
Reward: 1 Star

The ideas below are meant to minimally showcase common use case patterns we expect for chatbots in groups. The idea is that most apps likely follow one of these patterns, allowing devs to build their bots with minimal effort by selecting the correct sample and modifying it to their needs.

*Reminder* - @ yourself with a reminder after a certain amount of time passes.  
*Downtime* - Receive alerts when HTTP endpoints become unreachable.  
*Triviality* - Trivia game powered by OpenAI’s API

Each bot sample above intends to cover a common category of bot that we expect.


