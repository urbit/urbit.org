+++
title = "Quorum 2"
date = "2023-03-20"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "Improve the usability and accessibility of Quorum in the Urbit ecosystem"
reward = "6 stars"
assignee = ["~tamlut-modnys", "~litlep-nibbyt", "~sidnym-ladrut"]
grant_id = "P0254"
champion = ["~lagrev-nocfep"]
completed = false
canceled = false
+++

# Purpose #

Quorum needs many usability and accessibility improvements to make it an impactful part of the Urbit ecosystem. Its latent utility to capture and retain domain knowledge across the ecosystem has been hindered by its “minimum viable product” feature set and its existence as disjoint to Tlon’s more central Groups product (with which it overlaps on many organizational features).

The work proposed for this grant will address these issues by:
1) Extending Quorum into a custom Q&A channel type in Tlon’s Groups with the added goal of becoming a blueprint for future third-party Groups integrations.
2) Adding essential Q&A board functionalities to Quorum such as post editing, content moderation tools, and enhanced search.
3) Implementing quality of life improvements to the Quorum frontend which will make the UI more user friendly.

# User Stories #

## `%groups` User Stories ##

- As a %groups admin with %quorum installed, I can create Q&A channels in my groups, which have a name, host ship, and permissions options identical to the existing channel types (i.e. open to all, members only, or admins only).
- As a %groups admin with %quorum installed, I can modify my Q&A channels like other channel types, e.g. by renaming the channel, deleting the channel, and so forth.
- As a %groups user with %quorum installed, I can see and join Q&A channels in my groups.
- As a %groups user with %quorum installed, I can browse and manipulate the content of Q&A channels in the %groups interface.

## `%quorum` User Stories ##

- As a %quorum admin, I can remove posts from my Q&A channels.
- As a %quorum admin, I can edit the content (i.e. title, text, and tags) of any post made to my Q&A channels.
- As a %quorum admin, I can create and edit a set of allowed tags for posts made within my Q&A channels.
- As a %quorum admin, I can run a `dojo` command in order to import a legacy %quorum board into the new interface.
- As a %quorum user, I can browse through the paginated archive of posts on my Q&A channels.
- As a %quorum user, I can perform a string or tag-based query and view the paginated results on my Q&A channels.
- As a %quorum user, I can edit the posts I’ve authored.
- As a %quorum user, I can delete the posts I’ve authored.
- As a %quorum user, I can view the history of a post that has been edited.
- As a %quorum user, I can paste a %groups reference into a question or answer submission to copy its content from %groups.

# Timeline #

## Milestone #1 - Permissions Refactor & QoL Improvements ##

- **Reward**: 3 stars
- **Tasks**:
  - Refactor %quorum to gate board entry based on %groups permissions.
  - Add front-end subscription support for reliable post-poke page updates.
  - Enable authors and board admins to edit post content.
  - Enable authors and board admins to delete posts.
  - Update the post voting indicator to display the personal vote cast rather than the aggregate score direction.

## Milestone #2 - New Features & Groups Integration ##

- **Reward**: 2 stars
- **Tasks**:
  - Enable users to browse each post’s edit history.
    - Allow users to view the different edited versions of a post in the thread view (i.e. as different standalone versions without diffs).
    - Display all authors involved in constructing a post (original author & editors).
  - Add result pagination for board and question listings, including search results.
  - Implement tag-based search via (1) the search bar and (2) clicking on a post tag.
  - Allow admins to optionally create a set of eligible tags for their boards.
  - Enable %groups “refs” submissions for posts, which will be replaced on publication with the original %groups content.

## Milestone #3 - Groups Plugin Support ##

- **Reward**: 1 star
- **Tasks**:
  - Revamp the %quorum user interface to improve the UX for %groups embedding.
    - Replace the navigation bar actions with in-form buttons.
    - Replace the search bar with a form of floating/toggled search menu.
  - Integrate %quorum as a %groups channel type plugin.
    - Create scry endpoint(s) for %groups channel type metadata and coordination.
    - Add poke endpoint(s) for any necessary %groups join and leave behaviors.
