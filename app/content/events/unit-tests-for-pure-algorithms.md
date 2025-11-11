+++
title = "Unit tests for pure algorithms"
date = "2019-07-24"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Core" ]

[extra]
image = ""
description = "Write unit tests for +in, +by, +to, and +diff."
reward = "1 star"
assignee = ["yosoyubik"]
id = "1322185260"
completed = true
link = ""
+++

#### Bounty Description

Write unit tests which confirm that every function under the `+in` (sets), `by` (maps), and `+to` (queues) arms behaves as intended. These functions can be found in sections [2h](https://github.com/urbit/urbit/blob/0b0766b32b82a294b81f8f405548eb9f16d8c318/pkg/arvo/sys/hoon.hoon#L1142-L1368), [2i](https://github.com/urbit/urbit/blob/0b0766b32b82a294b81f8f405548eb9f16d8c318/pkg/arvo/sys/hoon.hoon#L1370-L1679), and [2k](https://github.com/urbit/urbit/blob/0b0766b32b82a294b81f8f405548eb9f16d8c318/pkg/arvo/sys/hoon.hoon#L1734-L1813) of the Hoon standard library, respectively. They are located in `/sys/hoon.hoon`.

Also write unit tests for the functions under the `+differ` arm [in `/sys/zuse.hoon`](https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/zuse.hoon#L6117-L6271). These functions are a suite of Hunt-McIlroy `diff` and `merge` algorithms.

Save the test files in the `/tests/sys/hoon` directory in Arvo. Use the same framework as the files that already exist in `/tests`.

#### Resources

- Read the [guide](https://github.com/urbit/urbit/blob/master/pkg/arvo/TESTING.udon) to writing unit tests in Hoon.
- Read the documentation on [sets](https://urbit.org/docs/reference/library/2h/), [maps](https://urbit.org/docs/reference/library/2i/), and [queues](https://urbit.org/docs/reference/library/2k/).
- [Here](https://github.com/urbit/urbit/blob/alef2/pkg/arvo/tests/sys/zuse/ordered-map.hoon) is an example test file for the new Ames. Your tests should be similar to it.

#### Contribution Guidelines

- Do not begin work until your request to claim this bounty is accepted.
- Your tests should be written as four files, with one for each core (`+in`, `+by`, `+to`, and `+differ`).
- Write the appropriate number of unit tests per function. Some arms will only need one test, but some arms may or may not require more. An insufficient number of tests for arms may result in your submission being rejected.
- Submit your tests as a PR to the [“urbit” repository](https://github.com/urbit/urbit). Your test file should be under `pkg/arvo/tests/sys/hoon` within the repository. Link this bounty in the PR’s description.
- You have 30 days from the time of approval to complete this bounty.

#### Resources

- Read the [guide](https://github.com/urbit/urbit/blob/master/pkg/arvo/TESTING.udon) to writing unit tests in Hoon.
- Read the documentation on [sets](https://urbit.org/docs/reference/library/2h/), [maps](https://urbit.org/docs/reference/library/2i/), and [queues](https://urbit.org/docs/reference/library/2k/).
- [Here](https://github.com/urbit/urbit/blob/alef2/pkg/arvo/tests/sys/zuse/ordered-map.hoon) is an example test file for the new Ames. Your tests should be similar to it.

#### Contribution Guidelines

- Do not begin work until your request to claim this bounty is accepted.
- Your tests should be written as four files, with one for each arm (`+in`, `+by`, `+to`, and `+differ`).
- Write the appropriate number of unit tests per function. Some arms will only need one test, but some arms may or may not require more. An insufficient number of tests for arms may result in your submission being rejected.
- Submit your tests as a PR to the [“urbit” repository](https://github.com/urbit/urbit). Your test file should be under `pkg/arvo/tests/sys/hoon` within the repository. Link this bounty in the PR’s description.
- You have 30 days from the time of approval to complete this bounty.

## Milestones

### Test files are merged

1 stars
Your test files are accepted and merged on GitHub.
