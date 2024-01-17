+++
title = "Graph Store Documentation Guide"
date = "2021-02-12"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Documentation" ]

[extra]
image = ""
description = "Explainer, tutorial, and cookbook for `graph-store`"
reward = "4 stars"
assignee = ["~sipfyn-pidmex"]
id = "1888977136"
completed = true
canceled = false
link = ""
+++

## Overview

Motivation: `graph-store` is an extremely well-designed and powerful system for creating social and business applications, that should unlock myriad novel applications on Urbit. Unfortunately, it is currently nearly completely unused outside of Tlon, mainly due to inadequate documentation materials.

This project will change that, by fully familiarizing developers with `graph-store` and how to build software using it, and by providing a reference assist during subsequent development process.

Every aspect of `graph-store` will be covered: designing schemas, interacting with them inside the CLI or from Urbit apps, and accessing them from frontends.

## Scope & Intended Audience

### Scope

The target audience is an experienced developer in any outside programming language. We assume Hoon knowledge, and refer recommended hoon resources whenever necessary, covering the bare minimum in-line.

We cover the process involved in creating a new social app from scratch. We do not cover interacting with `graph-store` on the server-side, i.e. from other `gall` agents, although we may refer to several outside examples of that, since they should be comprehensible to the user after working through this.

### Audience 1: Developers Learning `graph-store`

The explainer and tutorial below are intended for learners, users who want to build a strong mental model of the store from scratch. They should be doable in either order (to accommodate different learning styles)

### Audience 2: Developers Working on Social Applications

The cookbook/how-to and API reference are for developers who understand `graph-store` and need reference materials for common patterns and syntax while building applications.

## Sections

### Explainer

This includes a high-level description of what `graph-store` is and why it exists, a technical overview of `graph-store`, and a walkthrough of the implementations of the Chat and Publish apps and how they are built using `graph-store`.

Includes explanations of:

- full walkthrough of `graph-store` and `post` sur files
- how the indexes work
- how validation marks are used in the code to enforce schemas
- scry examples
- how mutations to `graph-store` happen
- how the frontend queries, receives updates from, and sends messages to the backend
- where JSON parsing is used and for what
- key differences in schema design for Chat vs Publish
- what would be needed to extend Chat and Publish in various ways

### Tutorial

- implementation of a simplified chan-style imageboard
- demonstrates threading and basic pagination
- simple `graph-store` reference embedding

### Cookbooks

- common social data patterns, and how to do each one
- how to make a schema
- poking from the frontend
- updating graph nodes
- deleting & archiving graphs
- querying data from any graph
- embedding references to other graph content
- simple algorithms to rank results, a la HN/Reddit

### Reference

Update https://urbit.org/docs/tutorials/hoon/graph/ to be more useful:

- links to relevant source files
- exact scrys available, with examples

## User Stories

As a developer without prior `graph-store` knowledge, I can:

- Build a mental model of all aspects of the system with detailed explanations of actual production code
- Develop intuitions for how applications are built with it by designing and building my own social application

As a developer who already understands `graph-store` I can:

- think of the pattern my social app will follow, and then refer to similar design how-tos to create my schema
- look up API information
- maintain existing `graph-store` applications on the backend
- maintain existing `graph-store` applications on the frontend in the frontend stack of my choice

## Milestones

### Explainer

1 stars
Full written explainer posted online

### Tutorial

1 stars
Full written tutorial with tested code samples

### Cookbooks & Reference, Finalization

2 stars
Full written cookbook document, updated reference, and finalization of the content
