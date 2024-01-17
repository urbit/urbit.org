+++
title = "Udon syntax highlighter"
date = "2019-07-18"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev Tool" ]

[extra]
image = ""
description = "Write a syntax highlighter for the Udon markup language."
reward = "1 star"
assignee = ["~dirwex-dosrev"]
id = "981084186"
completed = false
canceled = true
link = ""
+++

#### Background

Udon is a minimalist markup language for creating and rendering text documents, with a Markdown-inspired syntax. It’s used as the native language for publishing on Modulo, Urbit’s web interface.

#### Bounty Description

Write a CodeMirror language-mode file that results in correct syntax highlighting for the Udon markup language. Use Markdown syntax highlighting as inspiration, and follow it closely.

#### Resources

- Read the [Udon guide](https://urbit.org/docs/using/sail-and-udon/)
- Familiarize yourself with the Udon parser under the `+cram` arm, at lines 15,310 through 15,538 in `hoon.hoon`.
- Familiarize yourself with the Udon compiler in the `cram.hoon` file under `/lib`.

#### Contribution Guidelines

- Your submission should come in the form of a single JavaScript file. Email the submission to grants@urbit.org

## Milestones

### The highlighter is complete

1 stars
The highlighter has been finished and tested, and the language-mode file is finished.
