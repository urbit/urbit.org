+++
title = "Engram: a collaborative knowledge managment app"
date = "2022-03-25"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Engram is a knowledge management application that allows individuals or teams to build rich note documents."
reward = "$75,000 in WSTR"
assignee = ""
id = ""
completed = false
work_request_link = ""
+++

Engram is a knowledge management application that allows individuals or teams to build rich note documents.

## Rationale

Right now, the only way to collaborate on documents in Urbit is in the notebook channel via comments. There are no features around knowledge management, tagging, history, or any feature required for collaborating on documents with others. The goal of this project is to provide a robust solution for groups or individuals to collaborate on documents.

## Overview

For V1, Engram will focus on enabling rich document editing for an individual experience, but multiple collaborators. Different people should be able to modify the documents based on permission.

There are several features and agents that may need to be created to support this.

- Document editor
- Git-like revision history
- Inline comments
- Sentence parser for storing each sentence as a node in a graph for easy referencing, commenting, and more future features.
- Document permissions

## User stories

As a single user, I would like to:

- See a list of documents for my own ship context.
- Be able to edit a document myself.
- Have others invited edit the document
- See a history of changes on the document.

As a group member, I would like to 

- See notes associated with my group.
- Be able to comment on sentences at the current revision.
- See a log of changes via a popout panel
- Be able to resolve conflicting revisions.

As a document editor, I would like to:

- Have the current document state saved in local storage if I haven't clicked save and accidentally close the tab.
- Be able to edit in readme mode
- Be able to edit in preview mode
- Have a hoverable style block appear when editing

As a document viewer, I would like to see

- A rich document with formatting.
- A list of authors and editors.
- View comments on the document .
- View phrase comments on sentence hover.
- Have custom embeds in the document:
  - code block
  - link
  - video
  - image

## Technical requirements

The most complex part of this is the revision log. It should be easy to revert to a certain point in time. There will also need to be a sentence parser that stores each sentence in a store with associated comments and other metadata. Each sentence or collection of sentences should be able to be referenced by other documents.

Holium will work with the developer(s) to provide frontend help.

## Future work
There is the potential for several future releases enabling more collaboration features:

- Public pages
- Live co-editing (WebRTC or Urbit native)
- Group-to-group document sharing (if groups enable)
- Inter-document referencing (hypertext-like)

## Requirements
- At least three years of professional programming experience
- Experience with full-stack development, including JS and some server-side language
- Demonstrable experience with writing Gall agents
- Coordinate with Holium on designs, frontend, and agents

## Schedule
This project has many pieces and would likely require a team size of two or more. There would need to be a significant amount of frontend work, which Holium will help build or facilitate using our design system. V1 deadline is 6 months from start.

## Reward
$70,000 WSTR (team of two)

