+++
title = "Calendar"
date = "2020-05-18"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "An Arvo calendar agent based on the iCalendar spec."
reward = "5 stars"
assignee = ["~wolref-podlex", "sovmep-ripsum"]
id = "1851255517"
completed = true
link = ""
+++

## Purpose

Urbit provides a growing set of tools for communication with groups of people, but is sorely missing a native calendar. For those of us looking to get away from big G for managing our schedules (i.e. everyone reading this) a calendar is an indispensable tool to have in Urbit.

Calendars are a sizable undertaking both in terms of data management (modeling & persistence) and user interface, so the authors have decided to limit the scope of this proposal to the data layer, leaving a polished user interface for a future proposal.

## Deliverables

The goal of this proposal is to create a gall agent that can be used to store a calendar of events on a ship, and to expose calendars as an additional pubsub channel in the same vein as chats, links and notebooks. Additionally, we'll provide accompanying generators for creator, importing events from `.ics` files and direct creation of events.

## Team

Josh Lehman (~wolref-podlex), has been following Urbit since ~2014 when it first began appearing on Hacker News. In the interim he's been working on Starcity, where he leads the software arm of the business. While new(ish) to Hoon, Josh is no stranger to functional programming, having worked in Clojure for the better part of the last six years.

Raghu Nimmagadda (~sovmep-ripsum), is a software engineer with a fair amount of FP experience (Racket, Ocaml, some Haskell). While he's fairly new to Urbit, he's interested in learning and building his hoon skills (recently graduated hoon school 101 and is working on a gall app in his free time).

## iCalendar

### Rationale

The goal is to allow import from iCalendar, but not export to it. There's no reason this couldn't be done, but we're trying to drive towards "calendaring within Urbit" moreso than "calendaring between Urbit and Earth tech." We believe this is more in line with an apparent guiding philosophy behind other applications built so far.

So, why base anything on iCalendar at all? Two reasons:

1. It's prior art on how a calendaring system should work, which by all appearances works pretty well. As neither of us have experience with building a calendar (and wouldn't exactly call ourselves "calendar researchers"), this seems like a good starting point that should provide ample guidance on the domain-specific components.
2. A way to import an existing calendar into Urbit would be a cool feature anyways, since many of us (...or at least some people we know) have personal calendars that should really be on a personal server.

We expect to create and maintain a useful degree of iCalendar compatibility, and to also make Urbit-specific deviations on an as-needed basis.

### Parser Overview

The parser will parse `.ics` files containg VEVENTs into hoon data structures. This will not support top level calendar properties, i.e. properties that apply to the entire calendar, but will support the following required component properties for `VEVENT` as per RFC 5545.

```
UID
DTSTAMP
DTSTART
DTEND
DURATION
```

The following optional component properties will also be supported.

```
CATEGORIES
CLASS
COMMENT
DESCRIPTION
SUMMARY
ORGANIZER
GEO
LOCATION
STATUS
RRULE
RDATE
EXDATE
```

The goal of this step is to have something that can parse a `.ics` like this (example taken from RFC 5545). A full list of component properties can be found [here](https://tools.ietf.org/html/rfc5545#section-3.1).

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:19970610T172345Z-AF23B2@example.com
DTSTAMP:19970610T172345Z
DTSTART:19970714T170000Z
DTEND:19970715T040000Z
SUMMARY:Bastille Day Party
END:VEVENT
END:VCALENDAR
```

If time permits, we'd also want to support parsing VALARM components, which correspond to alarms/reminders about events. These components can be nested within VEVENTs, and have three flavors - audio, display, and email (each representing the kind of reminder the component can give you). We aim to support parsing display alarms (displaying some text) initially, as audio is only useful once a UI is built and we don't have email on mars. While handling the alarms is outside the scope of this proposal, by parsing them we hope to make it easy for future proposals to build on them.

## Milestones

### VEVENT Parser

1 stars
A generator that can parse `.ics` files from the dojo containing VEVENTs into hoon data structures. This milestone will NOT support top-level calendar properties.

### Calendar Gall Agent

1 stars
Creation of a gall agent that can be used to persist and read events from `.ics` files into a "calendar" on the running ship.

### Gall Agent Enrichment

1 stars
Extend the gall agent to support queries (e.g. within a range), updates and deletes of events, and a generator to create events without use of `.ics` files.

### Pubsub/Channel Support

2 stars
Extend the gall agent to allow pubsub with other ships and integration with Groups to ultimately allow calendars to exist as an additional channel.
