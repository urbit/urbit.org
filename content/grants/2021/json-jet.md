+++
title = "JSON Parsing/Serialization Jet"
date = "2021-06-16"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Core Dev" ]

[extra]
image = ""
description = "Create high performance JSON parsing/serializing jet."
reward = "1 star"
mentor = ["~timluc-miptev"]
assignee = ["~finmep-lanteb"]
completed =  true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0036&prefill_Grant+Name=JSON%20Parsing%2FSerialization%20Jet"
+++

## Jet JSON Parsing/Serialization

We need to generally speed up common parsing and serialization operations. A large part of Urbit's UX is sending data in and out of Urbit for display in the UI, and the functions inside Urbit that handle this are all significant performance bottlenecks.

Urbit serializes JSON frequently when sending data to various frontends, and this would make that much more rapid.

Completing this bounty will have an immediate impact on the perceived speed of the system in frontends like Landscape.

### Code

- [JSON Encoders](https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/zuse.hoon#L3263)
- [JSON Reparser](https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/zuse.hoon#L3320)

### Requirements

- Knowledge of C
- Experience memory profiling to prevent leaks
- Hoon knowledge nice but not necessary

### Resources

- Tlon engineer explanation/assistance as needed
- Check-in with a Foundation director as needed
- [Writing Jets Guide](https://urbit.org/docs/vere/jetting/)
- [Unofficial Jets Tutorial](https://gist.github.com/sigilante/31cc7941a41b51dca5db6692a756fd64)
- [JSON Test Suite](https://github.com/nst/JSONTestSuite)

## Milestone: Completion, 1 star

- jet is implemented
- passes all tests, producing same results in jetted and unjetted mode
- Tlon engineer gives final approval on merging jet into core
