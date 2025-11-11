+++
title = "Extending the Bitcoin Provider API"
date = "2022-03-03"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = ""
reward = "1 star"
mentor = ["~dasrun-fadben"]
assignee = ["~sipned-nistug"]
grant_id = "A0113"
completed = true
link = "~pindet-timmut/urbitcoiners"
deliverable = "~mister-dister-dozzod-dozzod/bitcoin"
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0138&prefill_Grant+Name=Extending%20the%20Bitcoin%20Provider%20API"
+++

## Project Description

The blockchain is large, and networked storage can be expensive. We want to run bitcoin-enabled applications on urbit, but not everyone on the network will want to run a full node.

The solution so far has to been to create "provider" nodes that peers can subscribe to for access to the blockchain network. This is similar to the "SPV" approach.

This provider agent accesses the bitcoin daemon and electrs server (a rust electrum implementation) through a proxy server.

However, the initial API was limited to the basic functionality necessary for the first urbit bitcoin wallet. It needs to be extended for other apps, including lightning.

Our goal in this project is to extend it with a view towards these additional use cases.

## Prerequisites

- Knows some functional programming and is interested in learning Hoon

- Has done backend webdev or otherwise coded against REST APIs

- Has experience with or is interested in bitcoin development

## Time Estimate

For someone with zero familiarity with urbit and bitcoin APIs, and working 10 hours a week or less, I would estimate 3-4 weeks.

## Deliverables

- Add support for regtest to the bitcoin codebase

  - add %regtest to network type defined in /=bitcoin=/sur/bitcoin.hoon

  - modify functions in /=bitcoin=/lib/ to handle this updated type appropriately

  - update server.js in RPC repo to support new network configuration

  - run some "functional tests", sending and receiving transactions using regtest configuration

- Add the following electrum method calls to the proxy server and %btc-provider agent:

  - blockchain.block.headers :: fetch headers for a range of heights

  - blockchain.transaction.id_from_pos :: get txid for a block height and position

  - blockchain.estimatefee :: estimate current feerate for confirmation target

  - mempool.get_fee_histogram :: query mempool feerates

- Add the following bitcoind method calls to the proxy server and %btc-provider agent

  - utxoupdatepsbt :: add utxos to a PSBT

Patches should be submitted to:

[bitcoin rpc proxy](https://github.com/urbit/urbit-bitcoin-rpc)

[bitcoin agents](https://github.com/urbit/urbit)
