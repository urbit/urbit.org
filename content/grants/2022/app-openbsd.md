+++
title = "Apprenticeship: Resurrect the OpenBSD Build"
date = "2022-01-28"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Runtime" ]

[extra]
image = ""
description = "Get the project to the point where it works on OpenBSD"
reward = "1 star"
mentor = ["~silsyn-wathep"]
assignee = ["~tidsut-radryd"]
grant_id = "A0103"
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0124&prefill_Grant+Name=Resurrect%20OpenBSD%20Build"
+++

### Background

OpenBSD is a simple, secure, and well-audited operating system; in fact, it is a strong contender for “simplest, most secure, most well-audited” Earth operating system. It is the only production OS I would feel comfortable slapping on a computer on the internet without the ability to update its software. As such it’s a natural candidate for top-tier Urbit hosts who want to differentiate themselves in terms of security. If we think there’s going to be a long time before Nock hardware is realized, then surely it’s worth having something like that in the interim.

One of the first things I did when I was onboarding to the project was to get it to build on OpenBSD. This sort of work is a natural fit for a new contributor, since build issues are often shallow and give someone fairly broad exposure to a codebase.

At some point the Urbit build switched to Nix; Nix does not work on OpenBSD, so the build went by the wayside for a while. At some other point, there was a pretty substantial performance regression introduced on OpenBSD. Since then, the mingw port got done; this opened up a door for building on non-nix platforms, so an OpenBSD build is now back on the table.

So the current situation is: it is possible, with some work, to manually build Urbit on OpenBSD. However, this is not automated. And once Urbit is built, it runs extremely, unusably slowly, due to the outstanding performance regression.

### Scope

Get the project to the point where it works on OpenBSD as a first class citizen. Steps involved are probably something like:

- Go through the hazing ritual of building Urbit on OpenBSD manually
- Submit patches to add automated OpenBSD build support
- Do some creative benchmarking to locate the performance issue. Likely candidates: urbit/worker socket IPC, LMDB, and Nock compilation
- Fix the performance issue
- (Maybe:) Set up an OpenBSD CI runner
- (Extra bonus work:) make use of new OpenBSD security features like unveil(2) and pledge(2)

### Requirements

- Some existing experience with OpenBSD strongly recommended
- Some familiarity with autoconf / automake / make / bash
- Some familiarity with C
- Interest in working on the Urbit runtime
- Self-directedness, ability to debug and troubleshoot creatively
- Some familiarity with Nock
- Optional: nix, hoon

## Compensation

The apprentice will be rewarded 1 star upon the successful completion of the project.
