+++
title = "Display ETH Data"
date = "2020-01-30"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "The Urbit identity system uses a suite of Ethereum contracts as its PKI. As such, a lot of Ethereum-related functionality is available within the system."
reward = "1 star"
assignee = ["dominic22"]
id = "831044524"
completed = true
link = ""
+++

### Bounty Description

Create a gall application, and a user interface for that application, that are used to view events on any given Ethereum contract. Both components must meet the specifications enumerated below.

##### Gall application

- Depends upon /app/eth-watcher
- Based on contract address and ABI (json), subscribes to all contract events.
- Based on contract address, ABI, and event names/parameters, subscribe to specific events.
- Set up with just contract address, retrieving ABI from etherscan.io API.
- Stores lists of events and relevant details per contract and config, and make them available to the user interface.

##### User interface

- Allows adding/removing watched contracts per the above app interface.
- Displays events, per contract+config or for all watched, in readable format (ie, "Transfer: from: 0xabc, to: 0xdef, value: 123", with block number or timestamp, link to transaction on Etherscan.")
- Allows visual filtering of listed events.

### Resources

- The [eth-watcher](https://github.com/urbit/urbit/blob/master/pkg/arvo/app/eth-watcher.hoon) code.
- [Ethereum ABI value decoding stdlib](https://github.com/urbit/urbit/blob/4915ceb96bdd56f5b1f25504d1c68f8d41161540/pkg/arvo/sys/zuse.hoon#L8317)
- [Ethereum Contract APIs](https://etherscan.io/apis#contracts)

### Contribution Guidelines

- Do not begin work until your request to claim this bounty is accepted.
- Email your work to grants@urbit.org.
- When applying to work on the bounty, tell us a little about yourself and some projects you’ve worked on in the past.
- You have 90 days from the time of approval to complete this bounty.

## Milestones

### Work is finished

1 stars
Your work has been finished and accepted.
