+++
title = "Tinygrad ML Library"
date = "2024-08-07"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Tool"]

[extra]
image = ""
description = "Produce an Urbit-native implementation of tinygrad capable of running basic machine learning benchmarks at competitive speeds."
reward = "6-8 stars"
assignee = ["~masryl-picref"]
champion = ["~lagrev-nocfep"]
grant_id = "P0380"
completed = false
canceled = true
+++

Geohot has published the [Tinygrad library](https://github.com/geohot/tinygrad) for machine learning. This library is small and simple, which makes it a potentially good target for jetting. Doing so would give basic machine learning functionality in Urbit.

## Components

* Hoon, /lib/tinygrad as part of the machine learning suite in urbit/numerics; should utilize /sur/lagoon types along with /lib/lagoon and /lib/math for numerics.
* Jets, something of an open design question right now.  C or Rust FFI function calls to the conventional Python tinygrad functions may be necessary.

## Milestones
* (3 stars) Implement tinygrad opcodes and functions in Hoon.  Produce a transformer, if necessary, from standard tinygrad input to a Nock-compatible layer (likely as a mark).  (Some prior art exists for us on this step.)  Fulfill basic testing requirements as outlined below.
* (0 stars) Spec the jet layer with ~lagrev-nocfep, ~mopfel-winrux, and ~rovnys-ricfer.
* (3–5 stars, depending on spec) Implement jet-accelerated code for tinygrad.  Fulfill LLaMA/Stable Diffusion operating requirements.

## Timeline
* MS1 should take up to two months.
* MS2 should take three to four months, depending on implementation details.

## Testing
tinygrad can run LLaMA and Stable Diffusion.  Without jets, these are likely to be prohibitively slow, so the Quick Start Guide should be the testing target for the Hoon-only version.  The Showcase is a good next step.

## Documentation
Compliant examples starting from tiny corp materials should be supplied with each milestone.
