+++
title = "Bitcoin Node JSON RPC API (Part 1)"
date = "2019-11-14"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps", "Dev: Tool" ]

[extra]
image = ""
description = "Write a Remote Procedure Call library for a Bitcoin Gall app -- part one."
reward = "1 star"
assignee = ["yosoyubik"]
id = "649469235"
completed = true
link = "~pindet-timmut/urbitcoiners"
deliverable = "~mister-dister-dozzod-dozzod/bitcoin"
+++

#### Background

To expand Urbit’s Bitcoin-related capabilities, we are building a Gall app which can comprehensively control a Bitcoin Core full node via the JSON RPC API. The app is contained in [this branch](https://github.com/urbit/urbit/tree/btc-node-grant) of the Urbit repo, and the original conception of this idea is discussed [here](https://github.com/urbit/arvo/pull/1052). Our ultimate goal is to create Bitcoin libraries for Urbit, enabling Bitcoin to serve as a "money primitive" for future Gall apps.

Bitcoin Core is the reference implementation for Bitcoin nodes, which can be run as _bitcoind_ or _bitcoin-qt_.

#### Bounty Description

This bounty is to create a portion of the Gall app library for Remote Procedure Calls to a Bitcoin Core full node, written in Hoon. The other portions are covered in these grants: [Two](https://grants.urbit.org/bounties/1577544668-bitcoin-node-json-rpc-api-part-2), [Three](https://grants.urbit.org/bounties/312452925-bitcoin-node-json-rpc-api-part-3), [Four](https://grants.urbit.org/bounties/87854308-bitcoin-node-json-rpc-api-part-4).

- Specifically, this bounty is to create types and JSON conversions for commands and responses of the first section of the [Bitcoin Core API reference](https://bitcoincore.org/en/doc/0.18.0/), titled “Blockchain”:
- Create type definitions in Hoon for structuring commands and responses. Specify poke-action types that map to each command. Use logic specified in Bitcoin Core API resource and the template contained in the guidelines, and fill in this code where appropriate in [`pkg/arvo/lib/btc-node-json.hoon`](https://github.com/urbit/urbit/blob/9bb9b20c71a0a46edc6c52dd869017d3a51ede30/pkg/arvo/lib/btc-node-json.hoon).
- The application will be structured as two Gall agents: one “Store” and one “Hook”. The store should act as a data store for data received from the Bitcoin full node, and the Hook should send commands to the node as well as parsing the responses and poking them into the Store. A [template branch](https://github.com/urbit/urbit/tree/btc-node-grant) has been created to set up skeletons of these files to make your work easier.

#### Resources

- [Store/Hook proposal for userspace architecture](https://docs.google.com/document/d/1hS_UuResG1S4j49_H-aSshoTOROKBnGoJAaRgOipf54/edit?usp=sharing)
- [Urbit Gall App documentation](https://urbit.org/docs/learn/arvo/gall/)
- Bitcoin Core API reference documentation: [Here](https://bitcoincore.org/en/doc/0.18.0/), [here](https://en.bitcoin.it/wiki/API_reference_(JSON-RPC), and [here](https://bitcoin.org/en/developer-reference#remote-procedure-calls-rpcs).
- Distinctions between _bitcoind_ and _bitcoin-qt_: Differences between them discussed [here](https://bitcoin.stackexchange.com/questions/13368/whats-the-difference-between-bitcoind-and-bitcoin-qt-different-commands)
- [JSON RPC API standards](https://www.jsonrpc.org/specification)

#### Contribution Guidelines

- Do not begin work until your request to claim this bounty is accepted. We will assign a designer to work with you on the interface.
- Base your work off of the [btc-node-grant branch](https://github.com/urbit/urbit/tree/btc-node-grant). Follow Boilerplate. Look for `TODO`s.
- Submit your code as a PR to the [btc-node-grant](https://github.com/urbit/urbit/tree/btc-node-grant) branch of the `urbit` repo in form of a `.hoon` file.
- You have 45 days from the time of approval to complete this bounty.

## Milestones

### Your PR is merged

1 stars
Your PR containing all the relevant code updates is accepted and merged.
