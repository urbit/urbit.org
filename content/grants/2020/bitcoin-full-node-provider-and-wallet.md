+++
title = "Bitcoin Full Node Provider and Wallet"
date = "2020-09-22"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev", "Arvo" ]

[extra]
image = ""
description = "This bounty covers the creation of infrastructure (gall agents) required to enable a Bitcoin-based payments system from within Landscape."
reward = "6 stars"
assignee = ["~timluc-miptev"]
id = "2056919898"
completed = true
link = "~pindet-timmut/urbitcoiners"
deliverable = "~mister-dister-dozzod-dozzod/bitcoin"
+++

## Introduction

Creation of a wallet that supports various currencies is the basis for building an economy in Urbit. Bitcoin is a natural starting point due to both 1) the philosophical alignment with the project, 2) the prior art already done towards this end, and 3) its ubiquity.

This bounty covers the creation of a wallet that supports the use of Bitcoin and the infrastructure required to connect ships to the Bitcoin network. You will have the support of the Urbit Foundation in the development of this project, and will work closely with its director to refine requirements and test the resulting system.

## Background

Starting last year, several bounties were released to implement the Bitcoin JSON RPC API. Later another bounty was released to build a Bitcoin wallet. The RPC API work is now (nearly) complete, but the wallet work is not. The first iteration of the wallet ultimately failed due to lack of clear scope, but provided many valuable ideas that can still be leveraged.

The Bitcoin RPC API was a huge lift and provides the foundation needed to complete this bounty. There are still ongoing performance issues with a handful of RPC calls, but they're close to completion—most of the RPC API works fine and shouldn't block this project from getting started.

### Resources

- [Bitcoin RPC API Pull Request](https://github.com/urbit/urbit/pull/1892)
- [Bitcoin RPC API Documentation](https://developer.bitcoin.org/reference/rpc/index.html)
- [Original Bitcoin Wallet work](https://github.com/urbit/urbit/tree/mp/bitcoin)

## Overview

The ultimate goal is to have a wallet application within Landscape that ships can use to send payments to one another using a variety of digital currencies, starting with Bitcoin.

In order to make our wallet useful, a bridge from Urbit to the Bitcoin network will need to be built that uses the RPC API to communicate with a full node. In an ideal world each ship would run their own full node—practically, this is unrealistic due to the high technical and resource requirements of running a full node. For this reason, the solution to this bounty should provide a mechanism for ships that do not run a full node to connect to the Bitcoin network via other ships that choose to provide access to their node. Care must be taken to minimize the required amount of trust in this instance.

The wallet should be able to represent an "account," which correspond to public/private keypairs (representation of multiple Bitcoin accounts would be nice as well). A Bitcoin account can come from a variety of places: a mnemonic seed, hardware wallet, or from an Urbit master ticket, which is possible due to [Urbit's Hierarchical Deterministic wallet](https://github.com/urbit/fora-posts/blob/master/proposals/posts/~2018.11.8..19.31.59..ba77~.md) structure, which is based on BIP32. Regardless of the source of a keypair, Urbit will store only the public half (the extended public key to be specific—more detail is provided below). Transaction signing, which requires a private key, will be handled outside of Urbit to maintain security best practices.

From the wallet application, ships should be able to do payments and check the balance and transaction history for each account. The implementation should respect security best-practices by keeping private keys safe and identity secret to the highest extent as is reasonably possible.

### Project Requirements

- Ships can send payment in Bitcoin to other ships.
- Ships can send payment in Bitcoin to addresses.
- Ships can connect to full nodes that they run on their own.
- Ships can connect to full nodes operated by other ships.
- Private keys are never entrusted to any other entity.
- Ships can view the transaction history for any Bitcoin account they own.
- Ships can view the balance of any Bitcoin account they own.

### User Stories

The bridge to the Bitcoin network should satisfy the following stories.

- As a ship, I can connect to a full node that I control, becoming a host.
- As a ship, I can connect to a full node via another ship, becoming a client.
- As a host, I can control which other ships can access my full node.
- As a host or client, I can check the balance of my Bitcoin addresses.
- As a host or client, I can broadcast a signed transaction to the Bitcoin network.
- As a host or client, I can obtain a list of transactions for my Bitcoin account(s).

The wallet should satisfy these stories:

- As a ship, I can see my overall balance for an account.
- As a ship, I can see all transactions for a specific account.
- As a ship, I can construct an unsigned transaction.
- As a ship, I can send Bitcoin to other ships, becoming a payer.
- As a payer, I can tell when my payment has succeeded.
- As a ship, I can receive bitcoin from other ships, becoming a payee.
- As a payee, I can provide a unique address for each transaction.
- As a payee, I can tell when I have received payment.

### Proposed Architecture

A design for a system that satisfies the above requirements has been outlined [here](https://gist.github.com/jalehman/e0c91071427ca4c349c0673f376945cb). It's not a requirement to use this architecture, but it's probably a good starting place, as it's been vetted by a few people within the community. Ideally the architecture will be further refined collaboratively with you, the claimant.

### Expectations

You will work closely with the director of urbit.org on this project. This means that, at a minimum, weekly check-in calls will be held to discuss the project's progress. Additionally, the worker is expected to provide regular status updates on the project to the Urbit community via twice-monthly updates on this bounty.

The director will ensure that you have access to the necessary resources to complete this project. All prior work done on this project will be explained and made available to you, and should questions arise that require the expertise of engineers at Tlon, time will be made (schedules permitting) for your questions to be answered either in writing or over a call.

The worker should have a background that either demonstrates experience building Gall agents, or developing on Bitcoin (or similar crypto systems)--both would be even better.

## Milestones

### Implement the full node bridge/provider

3 stars
Create a set of gall agents to interface with a Bitcoin full node, access to which can be provided to other ships.

### Implement the wallet

3 stars
Create a set of gall agents to handle extended public keys, address derivation, and facilitate payments between ships.
