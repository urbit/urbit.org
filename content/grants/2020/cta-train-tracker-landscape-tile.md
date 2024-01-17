+++
title = "CTA Train Tracker Landscape Tile"
date = "2020-03-17"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Build an app to track the schedule of the Chicago Transit Authority."
reward = "3 stars"
assignee = ["tomnash"]
id = "1262889675"
completed = false
canceled = true
link = ""
+++

### Bounty Description

Create a backend for importing CTA (Chicago Transit Authority) L Train arrival and departure data and service alerts via the CTA public API to Urbit, and design a Landscape tile which will serve as a route planner app inside Urbit.

We would like to create a L Train information Landscape tile. The backend should access real-time departure and arrival information for the complete list of stations via the CTA API, as well as the data feeds for schedule tables, elevator outages, and customer alerts.

The tile interface should encompass:

- A real-time trip planner using the CTA data, similar to the one on the official CTA website.
- Links for schedule tables for weekday, weekend, and holiday service.
- A link to the official CTA L Train map linked below, or an open-source workaround.
- A place (possibly a scrolling feed?) for CTA alerts, using the ‘Customer Alerts’ API.
- A place for CTA station elevator closure status information.

### Resources

- [CTA Developer Center](https://www.transitchicago.com/developers/)
- [CTA Branding Guide for Open API Apps](https://www.transitchicago.com/developers/branding/)
- [CTA Developer License Agreement](https://www.transitchicago.com/developers/terms/C)

### Contribution Guidelines

- Do not begin work until your request to claim this bounty is accepted.
- Please note that this bounty is for the CTA Train API and not for the CTA Bus API.
- Do not use copyrighted images, including the CTA logo or the official route map. Instead, always refer to CTA in plaintext, and use the provided train image which is detailed in the above Developer License Agreement link. You should include an external link to the CTA L Train route map; do not host this map locally (we are open to an open-source, good quality route map which does not include the CTA logo or other trademarks, however).
- Please read the Developer License Agreement and Branding Guide carefully and obey their guidelines for application naming and presentation of API data.

## Milestones

### Your PR is merged

3 stars
Your code is accepted and merged.
