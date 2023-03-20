+++
title = "Urbit Native Ethereum Wallet"
date = "2022-07-08"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Build an Ethereum wallet and UI that you can run from your urbit ship and use to interact with the web3 ecosystem"
reward = "3 stars + $15k USD"
assignee = [""]
grant_id = "B0158"
completed = false
canceled = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0158&prefill_Grant+Name=Urbit%20Native%20Ethereum%20Wallet"
+++
# Overview

Build an Urbit-native Ethereum wallet.

# Rationale 

Building an Ethereum wallet that runs on Urbit is a simple project with huge impact. It would unlock a whole new set of functionalities for users, bridge the gap between Urbit and the web3 ecosystem, and enable DeFi primitives to exist in the Urbit Universe. 

An Ethereum wallet on Urbit would have an identity system and social graph built in, which would enable a whole new range of possibilities. This wallet would serve as a building block for other companies and developers building on Urbit. 
 
# Scope / Implementation

Urbit has a [Bitcoin wallet app](https://github.com/timlucmiptev/btc-agents) which leverages Urbit’s ID system and P2P network. It lets a ship point to a trusted bitcoin provider node and then act as a public gateway for other Urbit ships, so not all users need to configure their own full node It also allows Urbit users to send BTC to each other using only their Urbit ID, with Bitcoin public keys handled seamlessly under the hood.

Your task is to build an Ethereum wallet with similar behavior.

An important component is to build a way for a ship to associate Ethereum public keys with their ID so it can share its wallet address to peers when asked for. A different scheme than the one used by the Bitcoin wallet (a new address per transaction) is probably needed. After that, a sleek interface is needed so users can send each other ETH at a minimum. Replicating the Bitcoin app’s provider node system is outside of the scope, but a good submission will allow the user to set their own RPC URL. You could also consider using Pocket Network.

Because Ethereum is a complete computer, it won’t be feasible to keep shipping new UIs for all the things you can do on Ethereum. A great submission will let users use other Ethereum apps on the public internet with their Urbit-native wallet. One potential approach would be to embed a mini-browser and inject web3 into it the same way many mobile wallets do (Metamask iOS, Coinbase Wallet, etc.) Another would be to support WalletConnect. Prior to assignment of this bounty, The Urbit Foundation and the contributor will meet and further expand on the scope and specific implementation of this bounty. Star compensation listed below is negotiable and may change depending on specific timing and features in the final scope.

# Milestones & Compensation

3 stars upon successful completion of the bounty and a 15,000 USD bonus provided by [Reserve Protocol](https://reserve.org/).

# Future Work 

- Crypto subscription payments that are secure and automated by having your moon run locally and sign transactions on your behalf

- Integrate with [Holium’s Ballot app](https://urbit.org/applications/~lomder-librun/ballot) to build a treasury management system for DAOs

- Integrate with [Books](https://urbit.org/grants/books) app to utilize transaction history and address rolodex functionality 
