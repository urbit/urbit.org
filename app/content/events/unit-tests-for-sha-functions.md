+++
title = "Unit tests for SHA functions"
date = "2019-07-24"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Core" ]

[extra]
image = ""
description = "Write unit tests for SHA cryptographic functions of the Hoon standard library."
reward = "1 star"
assignee = ["Ken Meier"]
id = "179152973"
completed = true
link = ""
+++

#### Background

Urbit relies on Hoon cryptographic functions. We want to make sure that these functions are correct.

#### Bounty Description

Write unit tests which confirm that the functions in section 3d of `hoon.hoon` ([lines 3245 to 3665)](https://github.com/urbit/urbit/blob/master/pkg/arvo/sys/hoon.hoon#L3245-L3665) behave as intended.

For each function, pull a list of standard input-output pairs from an authoritative source on the algorithm. Look at specifications requests for comment for the relevant algorithms. Other testing functionality is welcome.

Save the test file in the `/tests/sys/hoon` directory in Arvo. Use the same framework as the files that already exist in `/tests`.

#### Resources

- Read the [guide](https://github.com/urbit/urbit/blob/master/pkg/arvo/TESTING.udon) to writing unit tests in Hoon.
- Read the [documentation](https://urbit.org/docs/reference/library/3d/) for section 3d.
- [Here](https://github.com/urbit/urbit/blob/alef2/pkg/arvo/tests/sys/zuse/ordered-map.hoon) is an example test file for the new Ames. Your tests should be similar to it.

#### Contribution Guidelines

- Do not begin work until your request to claim this bounty is accepted.
- You have 45 days from approval to complete the bounty.
- Your tests should be written as one file.
- Write the appropriate number of unit tests per function. Some arms will only need one test, but some arms may or may not require more. An insufficient number of tests for arms may result in your submission being rejected.
- Submit your tests as a PR to the [“urbit” repository](https://github.com/urbit/urbit). Your test file should be under `pkg/arvo/tests/sys/hoon` within the repository. Link this bounty in the PR’s description.

## Milestones

### Your test file is merged

1 stars
Your test file for all the relevant functions is accepted and merged.
