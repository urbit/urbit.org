+++
title = "Runtime Apprenticeship: Segfaults"
date = 2021-06-24
[taxonomies]
grant_type = ["apprenticeships"]
grant_category = ["App Dev: Arvo"]
[extra]
image = ""
description = "Segfaults"
reward = 1
mentor = "~silsyn-wathep"
assignee = ""
completed = false
work_request_link = ""
+++

### Segfaults
Skill level: competent C programmer.

Time estimate: 8-12 weeks, including onboarding, weekly check-ins by video call, and chat check-ins as needed.

We currently trap segfaults for dirty page tracking using libsigsegv. libsigsegv is a general-purpose but somewhat slow solution; various platforms have their own platform-specific equivalents that are said to be faster.
Related to this, it would be useful to find another solution for handling (native) stack overflow.

Final work product:
* determine best platform-specific replacements for libsigsegv
* integrate those replacements
