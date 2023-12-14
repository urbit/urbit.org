+++
title = "Wrapped star interface"
date = "2021-06-22"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev: Other" ]

[extra]
image = ""
description = "Implement the app interface for swapping stars for wrapped stars."
reward = "5 stars"
assignee = ["~fabnev-hinmur"]
id = ""
completed = true
link = ""
+++

## Overview

Several contributors are working on a set of contracts that allow star owners to exchange their ERC-721 stars for ERC-20 tokens that are to be called DUST. The exchange rate is 1:1—that is, each STAR begets one DUST, and vice-versa (although since ERC-20 tokens are divisible, DUST can be owned in fractional quantities).

Neither Tlon nor the Urbit Foundation are responsible for writing or deploying the contracts, although we are responsible for the success of Urbit and believe that we should lend support to the contributors that are working on this project. That support consists of:

- The development and deployment of an official interface for interacting with the contracts that will be housed on urbit.org. This is to prevent scammers from building unofficial interfaces to different contracts that will instead steal address space (presumably).

- Funding of audits to ensure that there are no security vulnerabilities in the contracts.

This document outlines the scope of work to build the interface.

## Timeline

June 1-25: Contracts are completed to prepare for audit.

June 28 - July 2: Tlon-internal audit is conducted.

June 28: Interface development begins.

July 5 - July 16: Professional audit #1

July 19 - July 30: Professional audit #2

August: Professional audit #3

August 9 - 27: Ropsten-based QA of interface

September 1: Deploy interface on urbit.org

## Resources

[Smart Contracts on GitHub](https://github.com/ransonhobbes/stardust)

- [Figma Designs](https://www.figma.com/file/q3BmgjWVaJ2cMlMY7hcDqS/market.urbit.org?node-id=0%3A1)
- [Original mailing list post from aforementioned community members](https://groups.google.com/a/urbit.org/g/dev/c/EQVU2-GKo04)

## Milestones

### Milestone 1 - Complete all requirements

Expected completion: September 1, 2021

Payment: 5 stars
