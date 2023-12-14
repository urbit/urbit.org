+++
title = "Userspace Apprenticeship: Collaborative text editor and annotator"
date = "2021-05-26"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "A line-based editor for looking at text and code."
reward = "1 star"
mentor = ["~timluc-miptev"]
assignee = ["~hanfel-dovned"]
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0019&prefill_Grant+Name=Collaborative%20text%20editor%20and%20annotator"
+++

A line-based editor for looking at text and code. Can be organized by projects. Allows multiple people to edit, but can use locking for now.

Could store edits as diffs. Graph-store is probably fine for this, but a native storage format could work as well and would be good to think through tradeoffs. Interesting extensions would be things like line annotations.

This project is a good introduction to social apps in Urbit, and could become the framework for a larger product if the apprenticeship prototype works.

### User Stories

As a user I can:

- create projects
- create text files within those projects
- invite other users to my project, with varying permissions
