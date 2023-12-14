+++
title = "Bitcoin Key Derivation"
date = "2020-10-01"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "The Urbit HD Wallet allows for many different keys to be generated from a single master ticket. Your task is to use this mechanism to generate Bitcoin keys and expose ways of interacting with them."
reward = "2 stars"
assignee = ["pkova"]
id = "794126751"
completed = true
link = "~pindet-timmut/urbitcoiners"
deliverable = "~mister-dister-dozzod-dozzod/bitcoin"
+++

## Overview

Our goal is to build a Bitcoin payment experience that allows any ship to use their Urbit ID additionally as an address that can send and receive Bitcoin. Ideally a new ship needs nothing more than Landscape for interacting with the Bitcoin network (see [the Bitcoin Full Node Provider and Wallet bounty](https://grants.urbit.org/bounties/2056919898-bitcoin-full-node-provider-and-wallet)) and their Urbit ID for receiving Bitcoin and signing transactions (this bounty). This provides an easy onramp to working with Bitcoin without compromising on security or privacy.

Interacting with Bitcoin private keys, like your Urbit master ticket, requires a secure environment. As long as Urbit remains unaudited, it’s best to not use a master ticket to directly access your Urbit—this is why we built Bridge. [Bridge](https://bridge.urbit.org) is designed to be a secure environment, making it an ideal candidate for handling our sensitive Bitcoin keys.

## User Stories

This bounty should provide extensions to Bridge that satisfy the following user stories:

- As an user, I can obtain my Bitcoin extended public key (xpub).
- As an user, I can copy my xpub to the clipboard.
- As an user, I can sign a constructed transaction.
- As an user, I can copy a signed transaction to the clipboard.

For the purposes of this bounty, obtaining an extended public key would consist of copying it to the clipboard for input into Landscape, where the Bitcoin wallet will need it for performing address derivation. Signing a transaction will go in the other direction; a “constructed” transaction (consisting of everything but the signature) will be generated from within Landscape, input into Bridge for signing, and then the signed transaction will be input back to Landscape for broadcasting over the Bitcoin network.

While this flow isn’t the most user-friendly, the functionality will ultimately be possible to port into Landscape a) once it runs in a more secure environment (e.g. Electron), and b) once Urbit is receives a thorough security audit.

## Deliverables

Your solution to this bounty should include pull requests against these repositories:

- [urbit-key-generation](https://github.com/urbit/urbit-key-generation): This library is responsible for deriving keys from a master ticket—this is where Bitcoin key generation should occur.
- [bridge](https://github.com/urbit/bridge/): Bridge should be extended to include a new top-level “Bitcoin” section, which should provide access to the xpub key and a place for signing transactions.

Design mockups will be provided to the worker upon claiming this bounty.

## Expectations

You will work closely with the director of urbit.org on this project. This means that, at a minimum, weekly check-in calls will be held to discuss the project's progress. Additionally, the worker is expected to provide regular status updates on the project to the Urbit community via twice-monthly updates on this bounty.

The director will ensure that you have access to the necessary resources to complete this project. All prior work done on this project will be explained and made available to you, and should questions arise that require the expertise of engineers at Tlon, time will be made (schedules permitting) for your questions to be answered either in writing or over a call.

The worker should have a background that demonstrates proficiency with building client-side Javascript applications. Experience working with Bitcoin development is preferred, but not required.

### Resources

- [Urbit HD Wallet design](https://github.com/urbit/fora-posts/blob/master/proposals/posts/~2018.11.8..19.31.59..ba77~)
- [BIP-32 re: extended public keys](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#Extended_keys)

## Milestones

### Work is Complete

2 stars
Pull requests to each repository have been submitted, reviewed and merged.
