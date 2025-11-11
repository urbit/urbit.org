+++
title = "Finishing Touches to Eyre Noun-Based Channels"
date = "2023-01-26"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Core"]

[extra]
image = ""
description = "Finishing Touches to Eyre Noun-Based Channels"
reward = "2 stars"
assignee = ["~polwex"]
grant_id = "P0229"
champion = ["~palfun-folsup"]
completed = true
canceled = false
+++

## Description

Any Urbit developer who has coded a complex frontend will tell you that, by far, the most tedious part of making Urbit apps is JSON.

Communication between Hoon backends and JavaScript frontends on Urbit is done currently only using JSON data, which has to be manually encoded and decoded at the backend using Hoon's JSON codec functions. Eyre communicating solely through JSON also causes performance costs which can be serious when the JSON data gets large.

Thankfully there's a solution to this problem, and it's already more than half done. ~palfun-folsup pushed this draft PR a few months ago https://github.com/urbit/urbit/pull/5877.

It just needs some polish. This grant proposal offers to procure it.

As set up in the Github PR, in this grant we will: 

1. Remove the `jsbn` library dependency, and move all related logic in the `nockjs` files to JavaScript's new native BigInt type, or the `big-integer` library (which is mostly the same in practice).

2. Add TypeScript typing to all the nockjs logic, wherever possible.

3. Other fixes we find along the way to make sure the PR is mergeable and ready for use in Urbit apps.

## Milestones & Compensation

Expected completion: March 2023

Reward: 2 stars
