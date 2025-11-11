+++
title = "Vere Profiling"
date = "2022-08-26"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Dev: Core" ]

[extra]
image = ""
description = "Uncover and visualize performance bottlenecks in the runtime"
reward = "1 star"
mentor = ["~fanfun-mocbud"]
assignee = ["~pontus-fadpun"]
grant_id = "A0180"
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0180&prefill_Grant+Name=Vere%20Profiling"
+++

# Vere Profiling Apprenticeship

Urbit currently has two profilers: a tracing profiler and a sampling profiler.
The tracing profiler writes a stack trace to `<pier>/.urb/put/trace`. To enable:
```console
$ urbit -j <pier>
```

The sampling profiler uses `SIGPROF` to build up a set of data points detailing
the code paths that the runtime spends the most time executing. To enable:
```console
$ cd <urbit_repo>/pkg/urbit
$ CPU_DEBUG=1 ./configure
$ make
$ build/urbit -P <pier>
```

This project will add additional profiling capabilites to Vere by using
well-known profiling tools like `dtrace`, `bpftrace`, and similar to develop
more nuanced insights into the performance bottlenecks in Vere. Upon
identification, the bottlenecks will be addressed where possible, leading to a
more performant runtime. Exploration of alternative profiling techniques like
causal profiling is encouraged.

## Deliverables

- Integration of additional profiling tooling into Vere;
- list of performance bottlenecks;
- and patches addressing as many of the performance bottlenecks as possible.

## Prerequisites

- Proficiency in C
- Experience with profiling tools like `dtrace` (macOS, FreeBSD), `bpftrace`
  (Linux)

## Educational Outcomes for the Apprentice

The apprentice will:

- learn about the current state of profiling in Vere;
- integrate new tooling into Vere;
- and address any performance bottlenecks discovered.

## Responsibilities of the Mentor

The mentor will:

- provide technical direction via recurring meetings and DM;
- review code;
- and help the apprentice prepare the changes for release.

## Duration and Compensation

The expected duration is two months. Compensation is 1 star upon sucessful completion of the apprenticeship.
