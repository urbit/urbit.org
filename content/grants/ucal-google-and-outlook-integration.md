+++
title = "ucal Google and Outlook Integration"
date = "2021-05-12"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "Extend the Urbit Calendar (ucal) to integrate with other calendaring systems."
reward = "2 stars"
assignee = [""]
id = ""
completed = false
canceled = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0014&prefill_Grant+Name=ucal%20Google%20and%20Outlook%20Integration"
+++

### Purpose

The current ucal project has .ics support, but does not currently sync with Google and Outlook. This creates a chicken-egg problem, where users in organizations with those tools cannot reliably migrate to using ucal, because they can't correctly expose availability.

Tools like the iPhone Calendar app handle this by syncing from and to those calendars. This lets them handle their own native calendar events while also exposing a user's full calendar to that user. Our goal is to replicate that model in Urbit.

This is a project intended primarily for developer use. Once it is completed, it will:

- unlock further development of ucal for end users
- allow use of Urbit ucal as a single source of truth to manage a user's schedule, inside and outside of Urbit
- enable future integration with WebRTC for native Urbit video calls and ephemeral chats

### End Product

This project will produce threads used to call Google and Outlook.

The step of "pushing" events to Google, Outlook and other ucal users should be implemented as producing custom data structures ("cards") that a later Gall agent will route appropriately.

todo: find out which files the below goes into and where the ICS type is.

- mar
  -- modify the grow arm to take an ICS Hoon type and convert to a valid ICS calendar file
- lib
  -- add a converter from ICS to
- ted
  -- take a user's authentication info
  -- pull Google or Outlook ICS file
  -- convert into Hoon format
  -- push Hoon calendar events to Google or Outlook
  -- push calendar events to other ucal users
- tests
  -- unit tests of outside ICS files parsing into Hoon format
  -- unit tests of Hoon calendar structures into ICS
  -- unit test producing "cards" representing calendar event updates
  -- thread testing of syncing
- possible external code
  -- handle situation when extra auth flows are needed with Google/MS.
  -- could require a webpage to be opened to generate an OAuth code or similar

This code will not need to be merged into Urbit core.

### User Stories

As a developer, I want to

- input credentials for a Google or Outlook calendar
- retrieve ICS files associated with those credentials
- create/modify events
- push out created/modified events as updates to ucal or external users

### Resources and Workflow

- Improvements will be PRs to the https://github.com/taalhavras/ucal/ project
- Contributor will check in weekly with a Foundation director
- Current ucal contributors
- Example article on pulling ICS files from those services: https://www.digitaltrends.com/computing/how-to-sync-outlook-calendar-with-google-calendar/

### Milestones

1. Data conversion, sync and calendar updates
   Estimate: 21 days - a month | Reward: 2 Stars

   - handle credential imput and auth flows
   - handle syncing
   - push updates to Google/Outlook calendars from CLI
   - push updates to Urbit Calendar
