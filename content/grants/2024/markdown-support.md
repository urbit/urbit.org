+++
title = "Markdown on Urbit"
date = "2024-05-20"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Tool"]

[extra]
image = ""
description = "Support the Markdown data type natively on Urbit"
reward = "4 stars"
assignee = ["~wispem-wantex"]
champion = ["~lagrev-nocfep"]
grant_id = "P0351"
completed = true
canceled = false
+++

## Description

[Link to Project](https://github.com/wispem-wantex/urbit-markdown)

Markdown is a very popular, widely used and mostly-standardized document encoding format. Urbit currently has a few partial implementations of Markdown (e.g., Tlon has a client-side Javascript implementation; Udon supports some basic Markdown syntax), but we want a complete, standard-compliant implementation which will allow people to create web pages in an Urbit-native fashion. The goal is that users can reasonably expect that, e.g., a Markdown document written for Github would render and work equivalently on Urbit.

The successful completion of this project will be a library which includes:
1. a Markdown data type representation in Hoon
2. a parser that can convert a valid Markdown document into this Markdown data structure
3. a renderer that can convert Markdown data structures into Sail data structures (i.e., manx and marl), which could then be passed to en-xml:html to render as HTML.
4. a renderer that can convert a Markdown data structure back into raw Markdown.

Markdown is informally specified; different platforms support slightly different versions. The most complete and widely adopted specification is [the Github spec](https://github.github.com/gfm), which includes several non-standard extensions of the Markdown format, while streamlining / removing the syntax in other areas. Our goal with this project is to support the Github "flavor" of Markdown, because many of these extensions are popular and have effectively become part of the de facto standard.

To maximize the usefulness of partially completed iterations of this project, milestones will be sliced by syntactic feature support, rather than by library components (i.e., data type, parser, and renderer). Each milestone will thus include the data structures, parser, and renderer for a portion of the Markdown syntax.

## Milestone 1
Estimated Completion: July 2024
Reward: 2 stars

The first milestone for this project is support for basic, old-school Markdown syntax, but not including the Github flavor's extensions.


## Milestone 2
Estimated Completion: August 2024
Reward: 2 stars

This milestone adds support for the Github-flavored markdown extensions, namely:

- reference links
- task list items
- tables
- strikethrough formatting
- extended autolink
- embedded HTML

Additionally, it includes:

- comprehensive edge-case testing
- documentation of how to use the library in an app
- an example app showing how the library can be used, with a front-end