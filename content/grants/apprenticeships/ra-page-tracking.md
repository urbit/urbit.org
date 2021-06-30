+++
title = "Runtime Apprenticeship: Improve Page Tracking"
date = 2021-06-24
[taxonomies]
grant_type = ["apprenticeships"]
grant_category = ["App Dev: Arvo"]
[extra]
image = ""
description = "Improve Page Tracking"
reward = 1
mentor = "~silsyn-wathep"
assignee = ""
completed = false
work_request_link = ""
+++

### Improve Page Tracking

Skill level: competent C programmer.

Time estimate: 4-8 weeks, including onboarding, weekly check-ins by video call, and chat check-ins as needed.

We track dirty pages uniformly across the loom, regardless of road nesting depth. But we can only use the metadata on the home road. We want to align inner roads to (native) pages, and only protect the home road.

potentially related aligment issues:
https://github.com/urbit/urbit/issues/979
https://github.com/urbit/urbit/pull/983

Final work product:
* come up with a plan to align inner roads to pages
* implement the alignment, only protecting the home road
