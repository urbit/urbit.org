+++
title = "Antechamber"
date = "2020-11-16"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Antechamber is an initiative to provide a group within Landscape that is restricted to only galaxies and delegates of galaxies."
reward = "4 stars"
assignee = ["xiphiness"]
id = "523261174"
completed = false
canceled = true
link = ""
+++

## Background

Galaxy owners have an important place within the Urbit ecosystem: they're expected to [vote on important matters](https://urbit.org/docs/glossary/senate/) related to Urbit's future. We think that galaxies should both a) be able to assemble and communicate with one another, and b) that communication should be undertaken through Urbit itselth. Urbit galaxies, like stars, predominantly fulfill an infrastructural capacity, meaning that galaxy owners will likely interact with Urbit through their personal planet (further, due to the high value of galaxies, it is often the case that their ownership is shared by multiple individuals or a firm).

This bounty proposes the use of a _delegate_ system, whereby a galaxy can designate another, lower-value ship (_e.g._ a planet) as their delegate in such a way that the designation can be freely given and taken away, as well as be publicly verifiable. This enables ships that represent individuals, like planets, to speak on behalf of galaxies.

This use-case is exactly what the [Azimuth Claims contract](https://github.com/urbit/azimuth#overview) is meant to enable. Using claims, our workflow would work like this:

- galaxy G makes a claim that planet P is their delegate
- planet P makes a claim that they are the delegate for galaxy G (this gives the delegation "acceptance" semantics)

Going forward, we'll refer to this pair of claims as a **senate delegate claim**.

Assuming such a claim can be made, the next step would be to read/watch them from within Urbit, and then use them to restrict membership in a specified group to just those ships that serve as galactic delegates.

## Proposed Architecture

### Part 1: Extend Bridge to Support Claims

The claims contract is one of the few Azimuth contracts that has not yet been given any form of interface within Bridge. This part of the implementation involves providing a comprehensive interface within Bridge for managing claims.

Bridge makes use of the [azimuth-js](https://github.com/urbit/azimuth-js) library for interacting with Azimuth contracts. Initial support for the claims contract was added in [this pull request](https://github.com/urbit/azimuth-js/pull/58/files), although key features are missing—your first task will be to extend the `azimuth-js` library with additional operations:

- [`removeClaim`](https://github.com/urbit/azimuth/blob/27ab0845779f7beba2376a82b0320c3efb39e03e/contracts/Claims.sol#L104): remove the specified claim.
- [`clearClaims`](https://github.com/urbit/azimuth/blob/27ab0845779f7beba2376a82b0320c3efb39e03e/contracts/Claims.sol#L129): remove all claims.
- `getAllClaims`: Produce all claims. _NOTE: There is no contract function for this operation—it'll need to be implemented in terms of `getClaim` per [this comment](https://github.com/urbit/azimuth-js/pull/58#pullrequestreview-369698854)._

With the above operations defined, your next task will be to extend Bridge to satisfy the following user stories:

#### User Stories

(All stories are from the perspective of a point owner, and can be read: "As a point owner, ...")

- I can manage Claims by navigating to _ID -> Advanced -> Manage Claims_
- I can view all of my claims and their attributes ([`protocol`, `claim` and `dossier`](https://github.com/urbit/azimuth/blob/27ab0845779f7beba2376a82b0320c3efb39e03e/contracts/Claims.sol#L42))
- I can remove an existing claim
- I can see how many claims I have made of the [maximum number allowed (16)](https://github.com/urbit/azimuth/blob/27ab0845779f7beba2376a82b0320c3efb39e03e/contracts/Claims.sol#L14)
- I can understand what claims are for by reading help text in the claims management interface
- I can add a new claim
- I can add a senate delegate claim using a purpose-built UI
  - As a galaxy, I can set my delegate as a planet
  - As a planet, I can indicate that I am the delegate of a galaxy

### Part 2: Create the `senate-group-hook`

This gall agent will make use of the [`eth-watcher` agent](https://github.com/urbit/urbit/blob/master/pkg/arvo/app/eth-watcher.hoon) to watch for [`ClaimAdded`](https://github.com/urbit/azimuth/blob/27ab0845779f7beba2376a82b0320c3efb39e03e/contracts/Claims.sol#L27) and [`ClaimRemoved`](https://github.com/urbit/azimuth/blob/27ab0845779f7beba2376a82b0320c3efb39e03e/contracts/Claims.sol#L34) events, filter just the claim events that reference delegate claims, and translate those events into invites to or kicks from a specified group.

#### User Stories

All stories that refer to a "group admin" below refer to a group admin that is running the `senate-group-hook`.

- As a ship, I can point a locally-running `senate-group-hook` to a group I am the admin/owner of, and it will invite all galactic delegates, becoming a group admin with a senate-hooked group (wordy, I know)
- As a group admin, new delegates will be added when senate delegate claims are added
- As a group admin, new delegates will be removed when senate delegate claims are removed
- As a group admin, all galaxies can also be invited to the group

#### Implementation Notes

- `eth-watcher` accepts a [`config`](https://github.com/urbit/urbit/blob/6621661460c3073195ac2500df46df67af722cb2/pkg/arvo/sur/eth-watcher.hoon#L5-L21) that tells it which events to watch, among other configuration parameters. An example of its usage can be found [here](https://github.com/urbit/urbit/blob/6621661460c3073195ac2500df46df67af722cb2/pkg/arvo/app/azimuth-tracker.hoon#L86-L97).
- Azimuth's events can be found [here](https://github.com/urbit/urbit/blob/6621661460c3073195ac2500df46df67af722cb2/pkg/arvo/sys/zuse.hoon#L7943-L8016) in `zuse.hoon`. It's suggested that you represent the Claims contract and events in a similar fashion in a `/lib` file.
- There should be a way to monitor only claim events that originate from galaxies

## Deliverables

Your solution to this bounty should include pull requests against these repositories:

- [azimuth-js](https://github.com/urbit/azimuth-js)
- [bridge](https://github.com/urbit/bridge/)
- [antechamber](https://github.com/urbit/antechamber): The `senate-delegate-hook`-related files should go here.

## Expectations

You will work closely with the director of urbit.org on this project. This means that regular check-in calls will be held to discuss the project's progress. Additionally, the you are expected to provide regular status updates on the project to the Urbit community via twice-monthly updates on this bounty.

The director will ensure that you have access to the necessary resources to complete this project. All prior work done on this project will be explained and made available to you, and should questions arise that require the expertise of engineers at Tlon, time will be made (schedules permitting) for your questions to be answered either in writing or over a call.

## Milestones

### Part 1: Extend Bridge to Support Claims

2 stars
Pull requests to azimuth-js and bridge, as specified above, have been merged.

### Part 2: Create the senate-group-hook

2 stars
Pull requests against the antechamber repo mentioned above have been merged.
