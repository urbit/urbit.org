+++
title = "Boston T Train Tracker Landscape Tile"
date = "2020-03-23"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Create a landscape tile that tracks the Boston T train."
reward = "3 stars"
assignee = ["nforbes6"]
id = "2039941382"
completed = false
canceled = true
link = ""
+++

### Bounty Description

Create a backend for importing MBTA (Massachusetts Bay Transportation Authority) T Train arrival and departure data and service alerts via the MBTA public API to Urbit, and design a Landscape tile which will serve as a route planner app inside Urbit.

We would like to create a T Train information Landscape tile. The backend should access real-time departure and arrival information for the complete list of stations via the MBTA API, as well as the data feeds for schedule tables, elevator outages, and customer alerts. The tile interface should encompass:

- A real-time trip planner using the MBTA data, similar to the one on the official MBTA website.
- Links for schedule tables for weekday, weekend, and holiday service.
- A link to the official MBTA L Train map linked below, or an open-source workaround.
- A place (possibly a scrolling feed?) for MBTA alerts, using the ‘Alerts’ API stream.
- A place for MBTA station facilities closure status information.

### Resources:

- [MBTA V3 API Feeds](https://www.mbta.com/developers/v3-api)
- [MBTA Developer Resources](https://www.mbta.com/developers/resources)
- [MDOT API Developer License Agreement](https://www.mass.gov/files/documents/2017/10/27/develop_license_agree_0.pdf)

## Contribution Guidelines:

- Do not begin work until your request to claim this bounty is accepted.
- Do not use copyrighted images, including the MBTA logo or the official route map. Instead, always refer to MBTA in plaintext. You should include an external link to the T Train route map; do not host this map locally (we are open to an open-source, good quality route map which does not include the MBTA logo or other trademarks, however).
- Please read the Developer License Agreement carefully and obey their guidelines for application naming and presentation of API data.
- Submit your work as a pull request to the [urbit/urbit](https://github.com/urbit/urbit/pulls) repo
- When applying to work on the bounty, tell us a little about yourself and some projects you’ve worked on in the past.
- You have 90 days from the time of approval to complete this bounty.
- Successful completion of this bounty may result in an invitation to complete other API integration bounties.

## Milestones

### Your PR is merged

3 stars
Your code is accepted and merged.
