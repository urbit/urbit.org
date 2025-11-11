+++
title = "%blog Quality of Life Improvements"
date = "2023-03-17"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "%blog Quality of Life Improvements"
reward = "1 star"
mentor = ["~dachus-tiprel"]
assignee = ["~foddur-hodler"]
completed = true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0250&prefill_Grant+Name=%25blog%20Quality%20of%20Life%20Improvements"
+++

## Blog QOL Upgrades

%blog Apprenticeship is a userspace application apprenticeship focused on experiential learning in publishing on Urbit. The three main quality of life upgrades `~dachus-tiprel` would like are:
- Subscribe to someone’s ship to see when they have published a new post
- Password protected posts
- Export-Files / Import-from-Backup pokes


## Apprentice Expectations

Apprentice is familiar with %blog, has gone through hoon school, has a worked with a gall app before (both frontend and backend).


## Team

The apprentice will work with `~dachus-tiprel` directly. They will participate in an initial "kick-off" call to talk through the user stories and the expected implementation, and will proceed with weekly or biweekly (at the apprentice's preference or need) meetings with `~dachus-tiprel` thereafter.


## Deliverable

3 separate production-ready pull requests to the %blog hoon repo and %blog-ui repo each of the requested features.


## User Stories

As someone integrating with %blog I want to
- Subscribe to a %blogger and be notified whenever they publish a new post
As a %blogger I want to
- Password protect my posts to limit access
As a %blogger about to breach I want to
- Export all my my blogs into a file
- Breach my ship
- Reload all of my blogs/themes/drafts exactly as they were


## Implementation Notes

`~dachus-tiprel` is amenable to suggestions of strategies from his apprentice as to the nature of the implementation of this feature, particularly in the Front-End presentation. We have a suggestion for the general implementation details on the backend, but are nonetheless open to input:
- Subscriptions should be done using the new sss.hoon library
- Password protection will likely be done using some sort of sail page that redirects to the post upon a correct POST to %blog


## Schedule and Compensation

The %blog apprenticeship should take no longer than 3 months, but is likely executable within a month. The apprentice will recieve 1 star upon successful completion of the apprenticeship.
