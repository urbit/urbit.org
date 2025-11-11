+++

title = "General Website Permissioning"
date = "2022-05-10"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps", "Dev: Tool"]

[extra]
image = ""
description = "Enabling the ability to log in and view private or user-specific content"
reward = "3 stars"
assignee = ["~tirrel"]
champion = ["~tacryt-socryp"]
grant_id = "P0142"
completed = true
canceled = false
link = ""

+++

# Rationale
A common pattern on websites of all kinds is the ability to log in and view private or user-specific content. Having the ability to require permission to access webpages and digital content is a powerful primitive for extending Urbit’s web publishing capabilities. As such, we’re building the `%auth` agent, an extensible user-login system that will start by supporting magic link login. In other words, it maintains a list of email addresses with permission to view some particular content, and if someone wants to view the content, they can enter their email address and receive a link that will take them to the content page.

# Implementation

Create an `%auth` agent that keeps track of usernames, HTTP cookies for their login, and sets timers to expire those cookies.

## User Stories:
- I want to give access to my Studio web blog only to a small list of my friends.
- I want to sell access to my Studio web blog to paying subscribers and use an out-of-band payment for them to be added to the user list.

# Milestones and Compensation

June 2022 - Payment 3 stars - Auth agent is complete and supports magic link login. Auth agent may be used to permission access to Studio webpages or be used elsewhere.
