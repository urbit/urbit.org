+++
title = "Unit tests for JSON parsing"
date = "2019-11-14"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Core" ]

[extra]
image = ""
description = "Write unit tests for JSON-parsing arms of the zuse.hoon standard library."
reward = "2 stars"
assignee = ["courajs"]
id = "905205498"
completed = true
link = ""
+++

#### Background

Zuse is a part of the Hoon standard library. We want to make sure the JSON-parsing functions contained in Zuse do what they are supposed to do.

#### Bounty Description

Write unit tests which confirm that **every** function under the `+format` ([lines 5644 to 6113](https://github.com/urbit/urbit/blob/0b0766b32b82a294b81f8f405548eb9f16d8c318/pkg/arvo/sys/zuse.hoon#L5644-L6113)) arm behaves as intended. These functions include, but are not limited to, `+enjs`, `+dejs`, and `+dejs-soft`. They turn nouns into JSON, and vice-versa. `+format` is located in `/sys/zuse.hoon`.

Also write unit tests which confirm that the functions `+en-json` ([lines 6351 to 6403](https://github.com/urbit/urbit/blob/0b0766b32b82a294b81f8f405548eb9f16d8c318/pkg/arvo/sys/zuse.hoon#L6351-L6403)) and `+de-json` ([lines 6404 to 6422](https://github.com/urbit/urbit/blob/0b0766b32b82a294b81f8f405548eb9f16d8c318/pkg/arvo/sys/zuse.hoon#L6404-L6422)) behave as intended. These functions turn JSON text into JSON noun and back. They are located under the `+html` arm in `/sys/zuse.hoon.`

Save the test files in the `/tests/sys/hoon` directory in Arvo. Use the same framework as the files that already exist in `/tests`.

#### Resources

- Read the [guide](https://github.com/urbit/urbit/blob/master/pkg/arvo/TESTING.udon) to writing unit tests in Hoon.
- [Here](https://github.com/urbit/urbit/blob/alef2/pkg/arvo/tests/sys/zuse/ordered-map.hoon) is an example test file for the new Ames. Your tests should be similar to it.

#### Contribution Guidelines

- You have 45 days from the time of approval to complete this bounty.
- Do not begin work until your request to claim this bounty is accepted.
- Your tests should be written as two files: one file for `+format` functions and one file for `+html` functions.
- Write the appropriate number of unit tests per function. Some arms will only need one test, but some arms may or may not require more. An insufficient number of tests for arms may result in your submission being rejected.
- Submit your tests as a PR to the [“urbit” repository](https://github.com/urbit/urbit). Your test file should be under `pkg/arvo/tests/sys/hoon` within the repository. Link this bounty in the PR’s description.

## Milestones

### Test files are merged

2 stars
Your test files are accepted and merged on GitHub.
