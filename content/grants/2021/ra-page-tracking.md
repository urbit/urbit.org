+++
title = "Runtime Apprenticeship: Improve Page Tracking"
date = "2021-06-23"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "Improve Page Tracking"
reward = "2 stars"
mentor = ["~silsyn-wathep"]
assignee = ["~fanfun-mocbud"]
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0039&prefill_Grant+Name=Runtime%20Apprenticeship%3A%20Improve%20Page%20Tracking"
+++

### Improve Page Tracking

Skill level: competent C programmer.

Time estimate: 4-8 weeks, including onboarding, weekly check-ins by video call, and chat check-ins as needed.

We track dirty pages uniformly across the loom, regardless of road nesting depth. But we can only use the metadata on the home road. We want to align inner roads to (native) pages, and only protect the home road.

potentially related aligment issues:
https://github.com/urbit/urbit/issues/979
https://github.com/urbit/urbit/pull/983

Final work product:

- come up with a plan to align inner roads to pages
- implement the alignment, only protecting the home road
