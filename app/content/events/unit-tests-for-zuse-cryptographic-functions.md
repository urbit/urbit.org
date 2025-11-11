+++
title = "Unit tests for Zuse cryptographic functions"
date = "2019-07-24"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Tool" ]

[extra]
image = ""
description = "Write unit tests for cryptographic functions of the Zuse library."
reward = "1 star"
assignee = ["~watter-parter"]
id = "1097913361"
completed = true
link = ""
+++

#### Background

Urbit relies on Hoon cryptographic functions for its security. We want to take steps towards being confident that these functions are reliable.

#### Bounty Description

Write unit tests which assert that every function under the `+crypto` ([lines 2819 to 6113 of `zuse.hoon`](https://github.com/urbit/urbit/blob/0b0766b32b82a294b81f8f405548eb9f16d8c318/pkg/arvo/sys/zuse.hoon#L5644-L6113)) arm behaves as intended. These functions include, but are not limited to, `+enjs`, `+dejs`, and `+dejs-soft`. `+crypto` is located in `/sys/zuse.hoon`, in section 2b.

These tests should:

Confirm that Zuse functions match output from industry-standard implementations. For example, NaCl, secp256k1, openssl, and so on.
Use recommended test vectors where appropriate. For example, [RFC 231](https://tools.ietf.org/html/rfc4231) provides recommended test vectors for the HMAC SHA family.

Save the test files in the `tests/sys/zuse/crypto` directory in Arvo. Use the same framework as the files that already exist in `/tests`.

#### Resources

- Read the [guide](https://github.com/urbit/urbit/blob/master/pkg/arvo/TESTING.udon) to writing unit tests in Hoon.
- Read the guide to [contributing](https://github.com/urbit/urbit/blob/master/CONTRIBUTING).
- [Here](https://github.com/urbit/urbit/blob/alef2/pkg/arvo/tests/sys/zuse/ordered-map.hoon) is an example test file for the new Ames. Your tests should be similar to it.

#### Contribution Guidelines

- Do not begin work until your request to claim this bounty is accepted.
- You have 60 days from acceptance to complete this bounty.
- Write the appropriate number of unit tests per function. Some arms will only need one test, but some arms may or may not require more. An insufficient number of tests for arms may result in your submission being rejected.
- Submit your tests as a PR to the [“urbit” repository](https://github.com/urbit/urbit). Your test file should be under `pkg/arvo/tests/sys/hoon` within the repository. Link this bounty in the PR’s description.

## Milestones

### Your test file is merged

1 stars
Your test file for all the relevant functions is accepted and merged.
