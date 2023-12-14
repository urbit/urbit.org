+++
title = "Nuck Jet"
date = "2021-06-16"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Core Dev" ]

[extra]
image = ""
description = "Create new high performance string parser jet."
reward = "1 star"
mentor = ["~timluc-miptev"]
assignee = [""]
completed = false
canceled = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0035&prefill_Grant+Name=Nuck%20Jet"
+++

## jet +nuck

We need to generally speed up common parsing and serialization operations. A large part of Urbit's UX is sending data in and out of Urbit for display in the UI, and the functions inside Urbit that handle this are all significant performance bottlenecks.

This is a function that parses strings and returns a `@ta` of their aura along with their atom value. This is invoked every time a scry happens, and currently takes 7ms for invocation, so there is potential for large performance gains.

Completing this bounty will have an immediate impact on the perceived speed of the system in frontends like Landscape.

### Examples

Note the `~.p` and `~.ux`--those are the auras.

```
> (scan "~pillyt" nuck:so)
[% p=[p=~.p q=32.819]]
> (scan "0x12" nuck:so)
[% p=[p=~.ux q=18]]
```

### Code

https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/hoon.hoon#L5767

### Requirements

- Knowledge of C
- Experience memory profiling to prevent leaks
- Hoon knowledge nice but not necessary

### Resources

- Tlon engineer explanation/assistance as needed
- Check-in with a Foundation director as needed
- [Writing Jets Guide](https://urbit.org/docs/vere/jetting/)
- [Unofficial Jets Tutorial](https://gist.github.com/sigilante/3f9d13423a48a3d71041c938691d1f33)

## Milestone: Completion, 1 star

- jet is implemented and passes all tests
- Tlon engineer gives final approval on merging jet into core
