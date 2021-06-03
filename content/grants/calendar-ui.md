+++
title = "Calendar UI"
date = 2021-01-01
[taxonomies]
grant_type = ["proposals"]
grant_category = ["App Dev: Other"]
[extra]
image = ""
description = "Develop a UI for improved access to the Calendar Gall app"
reward = 3 
assignee = "~fabnev-hinmur"
grants_id = ""
completed = true
+++


## Purpose

A calendar is an indispensible personal tool to many people. A previous proposal has started work on an Urbit-native calendar.
This previous proposal seeks to create a parser and a Gall agent to manage the data layer of a calendar app.

The current proposal aims to create a Landscape tile and app to improve the accessibility of a Calendar Gall app.
The Calendar UI will provide several screens to interact with the calendar. These are a daily view, weekly view, monthly view,
and yearly view, along with pages to create and edit calendars and events.

## Deliverables

The UI will be backed by the Gall calendar app implementation (now known as 'ucal') mentioned above. The UI design will be
based on the Google Calendar layout and built with components from the Indigo-react library.

The UI will be written in Typescript with the React framework, following the Landscape structure as much as possible. The goal is to have a UI that can be incorporated as part of Landscape if desired.

List of Features:

1. Daily View
2. Weekly View
3. Monthly View
4. Yearly View
5. Create / Edit Calendar View
6. Create / Edit Event View
7. Full CRUD operations for calendars
8. Full CRUD operations for events
9. Toggle calendar display

## Future features

There will be additional UI features necessary to allow users to interact with other ships' calendars. Specifically, retrieving events that a user is invited to, RSVPing to events, subscribing to other ships' calendars, modifying other calendars with requisite permissions, and perhaps requesting additional permissions on other calendars. Many of these features are in progress but still require significant development and testing.


## Milestones

Completion of all 9 features: 3 stars

    
