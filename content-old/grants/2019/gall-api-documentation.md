+++
title = "Gall API documentation"
date = "2019-07-21"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Documentation" ]

[extra]
image = ""
description = "Write reference documentation for using the API for developing Gall apps."
reward = "1 star"
assignee = ["Liam Fitzgerald", "borlyt-salnus"]
id = "1251133389"
completed = true
link = ""
+++

#### Background

Gall is the Arvo kernel module that controls userspace applications. Understanding its API is required for developing applications on Arvo.

#### Bounty Description

Write a reference-style document that lists each arm name that could be used in a Gall app and describes what those arms are for. Each arm should also have a short example.

Developers should be able to use this document as a template for writing their Gall app. Arms documented should include: `+poke`, `+coup`, `+peer`, `+reap`, `+quit`, `+peek`, `+prep`,`+scry`, and `+wake`.

#### Resources

- Read the existing [Gall documentation](https://urbit.org/docs/learn/arvo/gall/).
- Familiarize yourself with `gall.hoon`, which is in the `/sys/vane` directory.
- Familiarize yourself with the style of [reference documentation](https://urbit.org/docs/reference/).

#### Contribution Guidelines

- You have 30 days from the time of approval to complete this bounty.
- Do not begin work until your request to claim this bounty is accepted.
- Your document should be written in Markdown.
- Submit your document in the form of a pull-request to the [Docs repo](https://github.com/urbit/docs). This file should live under the reference directory.
- Expect to receive requests for changes to your document.

## Milestones

### First draft is submitted

0 stars
Your first draft is submitted as a pull request to the Docs repository.

### Final draft is merged

1 stars
Your edits are satisfactory, and your PR is merged to master.
