+++

title = "Gnosis Safe on Urbit"
date = "2022-09-13"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "A self-hosted Gnosis Safe UI to protect against centralized prohibition"
reward = "2-3 stars"
assignee = ["~witfyl-ravped"]
champion = ["~dinleb-rambep"]
grant_id = "B0154"
completed = true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0154&prefill_Grant+Name=Gnosis%20Safe"

+++

# Gnosis Safe on Urbit

## Overview

An Urbit app that serves the Gnosis Safe UI, but with Urbit used for storing safe/wallet metadata and exchanging signatures.

## Rationale

There are two problems with Gnosis Safe:

Gnosis Safe stores safe metadata (e.g. the name of a safe and address book) in local storage, since this information is sensitive. This presents a problem when firing up Safe on different browsers.
Gnosis Safe isn’t completely decentralized. It relies on a server maintained by the Safe team to relay signatures to other addresses on the multisig.

Urbit can fix both of these. Since Urbit is a personal, private server, it can store Safe metadata without compromising it to a third party. Because Urbit is a P2P network, it’s trivial to exchange signatures directly with other members of the multisig, thereby transforming into a true decentralized application.

## Scope / Implementation

The frontend of this is fairly straightforward: you’ll deploy the safe-react application as an Urbit application. This guide that walks through full-stack Urbit development might be helpful for learning how to do this. 

To use Urbit as the networking layer for signatures it isn’t sufficient to know only the public addresses of the other members of a safe — you’ll need to know their Urbit ID as well. This means that the Urbit version of Safe needs to maintain a mapping of which Ethereum addresses belong to which Urbit IDs, and if no such mapping is known, fall back to using the centralized service maintained by Gnosis. In light of this, the Urbit version of Safe will need to satisfy the following user stories:

I can associate one of my public addresses (probably via Metamask) with my Urbit ID when using Safe
I can enter an Urbit ID instead of an Ethereum address when creating a safe, and my Urbit will ask that Urbit ID for an ETH address to use in the multisig
When someone adds me to a safe multisig via the Urbit Safe app, I can choose an ETH address to be used on the Safe
I can associate an Urbit ID with an Ethereum address on an existing safe

The networking component of this is fairly challenging and requires modifications to the Gnosis Safe UI to support Urbit ID. A second, independent portion of this challenge is to simply use Urbit for storing safe metadata: your wallets, the safes that your wallets are part of, and the address book(s) for each safe. For this you’d need to wire up a custom Gall agent to the safe frontend, using the agent for storage rather than the browser’s local storage.


## Timeline & Compensation

Completed within 2 months of bounty assignment: 3 stars

Completed withing 3 month of bounty assignment: 2 stars
