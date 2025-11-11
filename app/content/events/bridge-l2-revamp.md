+++
title = "Bridge UI/UX Revamp for Layer 2"
date = "2021-05-31"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Core" ]

[extra]
image = ""
description = "Our Layer 2 scaling solution is nearing completion, and the Bridge UI/UX needs to be refactored to take it into account."
reward = "5 stars"
assignee = ["~datder-sonnet"]
completed = true
canceled = false
link = ""
+++

## Background

The Naive Rollup, our Layer 2 (L2) scaling solution, has been in the works now for
many months and is nearing completion; however, the rollup itself is only one
part of what's needed to make L2 useful for end-users.

The Naive Rollup computes the state of the PKI by:

1. Reading from existing Layer 1 transactions, and
2. Reading and validating data submitted to a new Layer 1 contract (the _L2
   contract_) that corresponds to L2 transaction batches (_rolls_). Rolls are
   made up of individual transactions that describe computation to be done,
   which are handled by the Naive Rollup.

It's the job of another system called the _roller_ to aggregate L2 transactions
in batches before ultimately submitting them to the L2 contract&mdash;this is
the system that users must interface with in order to interact with L2, which
implies that a number of visual changes must be made to Bridge.

## Overview

Your task is to work with as an engineer embedded within a Tlon team to bring L2
scaling through to completion. Your role on the team is to implement designs
specified in Figma in Bridge that enable L2 functionality.

## Expectations

You'll meet twice weekly with the team on Tuesdays and Thursdays to communicate
status updates, and will be expected to work regularly with Tlon engineers in
pairing sessions to understand and implement the required modifications to
Bridge.

## Milestones

### Bridge is updated to support L2 and deployed in production

_Reward_: 5 stars

_Target completion_: `~2021.8.18`
