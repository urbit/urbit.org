+++
title = "Calendar UI"
date = "2020-07-15"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "Build a Landscape-native calendar UI"
reward = "2 stars"
assignee = ["finled-bansel"]
id = "1555464949"
completed = false
canceled = true
link = ""
+++

# Purpose

A calendar is an indispensible personal tool to many people. A [previous proposal](https://grants.urbit.org/proposals/1851255517) has started work on an Urbit-native calendar. This previous proposal seeks to create a parser and a Gall agent to manage the data layer of a calendar app.

The current proposal aims to create a Landscape tile and app to improve the accessibility of a Calendar Gall app. The Calendar UI will provide several screens to interact with the calendar. These are a monthly view, a daily view and a page to create new events.

# Implementation and deliverables

The UI will be backed by the calendar app implementation described in the aforementioned previous proposal. In order to allow the parallel implementation of a UI and the Gall app, this proposal will be executed in two stages.

The first stage is the development of working prototypes of the screens that the calendar will initially support. These include:

- a monthly view with clickable dates to daily views;
- a daily view that lists the events in chronological order with a short description
- a form to create new events with fields for the required properties per RFC 5545.

The deliverables will be functional web pages that can be integrated with Landscape. The screens will be built entirely with components from the [Indigo-react](https://github.com/urbit/indigo-react) library.
The UI will be built with the assumption that event participants are ships.

The second stage is to integrate the screens with the Gall agent implemented as part of the first proposal. This takes a dependency on a correctly functioning calendar Gall app. The requisite

# Basis for future integration

These pages can provide the basis for UX experiments and integrations with other parts of Landscape. One possibility is to integrate notebook posts with the timeline of a calendar, allowing a temporal exploration of the notebook posts a ship has seen.

## Milestones

### Functional pages

1 stars
Build the necessary pages that will allow Landscape to interact with a Calendar Gall app

### Working integration with Gall app

1 stars
Fully capable of importing an .ics calendar, creating new events, looking through existing events in the calendar of a ship.
