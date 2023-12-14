+++

title = "Advanced Portal Features Phase 1"
date = "2023-04-13"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = ""
reward = "3 Stars"
assignee = ["~toptyr-bilder", "~dilryd-mopreg", "~foddur-hodler"]
champion = ["~poldec-tonteg"]
grant_id = "P0251"
completed = false
canceled = false

+++

# Rationale

Portal currently allows for simple discovery of groups and apps, but there are still outstanding problems in user onboarding and advanced curation and discovery. In particular, first-time users would benefit from an onboarding flow that provides personalized recommendations and an overview of Portal’s functionality. Further, curators should have the flexibility to make their posts and collections high-quality and personalized, and to create recurring relationships with users via follow and notification features. By solving these problems we further improve Urbit user activation and retention, and we aim to increase Portal’s weekly active user (WAU) count.

For context on previous work, see our [previous grant](https://urbit.org/grants/app-store) and its [M4 redefinition](https://docs.google.com/document/d/10tZgF8ZA9KQbRYD7MDZ7v-iuIeO2nPNppj9CMRBVg7g/edit#).

# Milestones Overview

The grant will consist of many small features per milestone. We expect to be flexible on the actual grouping and focus rather on shipping features that will increase WAU. (Phase 1 will consist of Milestones 1 -3.)

## Milestone 1
 - Build a real-time global feed
 - Build an indexer to accomplish the above
 - Build out unified data model and schemas for different types of items
## Milestone 2
 - %blogs and %groups notebooks integration
 - Basic custom feeds
 - Replace react with Svelte
## Milestone 3
 - Support comments on all items
 - Re-share posts
 - Pre-populate posts to share desks and groups that the user hosts
 - Publish content to web2

# Future Work 
## Milestone 4
 - Follow other users
 - Implement paywalls
 - Fully-featured posts
    - Markdown support for items
    - Groups and apps can only be posted by their host
## Milestone 5
 - %pals integration
 - Tags can be applied to all items (lists, curators, etc)
 - Richer post metadata like number of app downloads/app versioning/poster info
 - Fully-featured profiles
    - Richer profile metadata
    - Markdown support for profile descriptions

# User Stories
## Milestone 1
1. I’m a first-time Urbit user and I want good suggestions for content so that I can find my people on Urbit
2. I’m a return user and I want personalized curation integrated into my experience so that I can find relevant content without trying
## Milestone 2
3. I’m a user and I want to be able to make my content discoverable quickly and easily so that I can get distribution 
4. I’m a user and I want a synopsis of the content being shared in a group so that I can quickly pick out the most interesting parts of the conversation
## Milestone 3
5. I’m a user and I want to be able to reference and comment on other people’s items so that I can build on others’ content
6. I’m a user and I want to be able to make my content discoverable quickly and easily so that I can get distribution 
7. I’m a user and I want to be able to make my content discoverable on web2 so that I can share my Urbit content more broadly
## Milestone 4
8. I’m a user and I want to know which developers and content creators are notable and trustworthy so that I can find good content
9. I’m a content creator and I want to be able to leverage markdown in my posts so that I can create more attractive + organized content
## Milestone 5
10. I’m a curator/developer/content creator and I want to have a fully-featured, professional-looking profile page so that I can create a good reputation
11. I’m a user and I want to know that the app I’m downloading is trusted and safe so that I don’t get malware

# Timeline and Compensation
Each milestone is expected to be completed over the course of roughly 1 month. Along with the prescribed features (which may be subject to slight reprioritization), completion of each milestone is dependent upon increasing Portal’s WAUs by 10% over baseline, as measured before any of the current milestone’s features have been introduced. Meeting these criteria will yield compensation of 1 star per milestone.


