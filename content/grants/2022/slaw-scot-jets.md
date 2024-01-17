+++
title = "Tune slaw/scot Jets"
date = "2022-05-06"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Core Dev" ]

[extra]
image = ""
description = "Tune slaw/scot jets for better perfomance."
reward = "1 star"
mentor = ["~lagrev-nocfep"]
assignee = ["~ponmep-litsem"]
grant_id = "B0137"
completed = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0164&prefill_Grant+Name=Tune%20slaw%2Fscot%20Jets"
+++

## slaw/scot

We need to generally speed up common parsing and serialization operations. A large part of Urbit's UX is sending data in and out of Urbit for display in the UI, and the functions inside Urbit that handle this are all significant performance bottlenecks.

`slaw` parses strings to atoms, and `scot` serializes atoms to strings. They both are used heavily throughout the codebase.

Completing this bounty will have an immediate impact on the perceived speed of the system in frontends like Landscape.

### Examples

slaw

```
> `(unit @p)`(slaw %p '~pillyt')
[~ ~pillyt]
> `(unit @p)`(slaw %p '~pillam')
~
> `(unit @ux)`(slaw %ux '0x12')
[~ 0x12]
> `(unit @ux)`(slaw %ux '0b10')
```

scot

```
> `@t`(scot %p ~pillyt)
'~pillyt'
> (scot %ux 0x12)
~.0x12
```

### Code

- slaw https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/hoon.hoon#L5913
- scot https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/hoon.hoon#L5905

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
