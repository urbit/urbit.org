+++
title = "BART Train Tracker Landscape Tile"
date = "2020-03-04"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "A backend for a BART client on Urbit."
reward = "3 stars"
assignee = ["~ronreg-ribdev"]
id = "1026701722"
completed = false
canceled = true
link = ""
+++

### Bounty Description

Create a backend for importing BART (Bay Area Rapid Transit) arrival and departure data and service alerts via the BART public API to Urbit, and design a Landscape tile which will serve as a route planner app inside Urbit.

We would like to create a BART information Landscape tile. The backend should access real-time departure and arrival information for the complete list of stations via the BART API, as well as the data feeds for schedule tables, elevator outages, system advisories, and train counts. The tile interface should encompass:

- A real-time trip planner using the BART data, similar to the one on the official BART website.
- Links for schedule tables for weekday, weekend, holiday service.
- The open-source BART map linked below.
- A place (possibly a scrolling feed?) for BART service alerts.
- A place for BART elevator closure status (this is a separate data channel).

Resources:

- [BART API Documentation](http://api.bart.gov/docs/overview/index.aspx)
- [BART API Developer License Agreement](https://www.bart.gov/schedules/developers/developer-license-agreement)

### Contribution Guidelines:

- Do not begin work until your request to claim this bounty is accepted.
- Submit your work as a pull request to the [urbit/urbit repo](https://github.com/urbit/urbit/pulls)
- When applying to work on the bounty, tell us a little about yourself and some projects you’ve worked on in the past.
- You have 90 days from the time of approval to complete this bounty.
- Successful completion of this bounty may result in an invitation to complete other API integration bounties.

## Milestones

### Your PR is merged

3 stars
Your code is accepted and merged.
