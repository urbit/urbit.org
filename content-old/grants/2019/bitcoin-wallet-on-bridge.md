+++
title = "Bitcoin Wallet on Bridge"
date = "2019-12-08"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev", "Azimuth" ]

[extra]
image = ""
description = "Add Bitcoin support to the Bridge interface. "
reward = "1 star"
assignee = ["yosoyubik"]
id = "273059635"
completed = false
canceled = true
link = "~pindet-timmut/urbitcoiners"
deliverable = "~mister-dister-dozzod-dozzod/bitcoin"
+++

### Background

To expand Urbit’s Bitcoin-related capabilities, this bounty is to add Bitcoin support to the Urbit wallet on bridge.urbit.org. Our ultimate goal is to create Bitcoin libraries for Urbit, enabling Bitcoin to serve as a ‘money primitive’ for future Gall apps.

### Bounty Description

Create an SPV (simple payment verification) Bitcoin wallet within [Bridge](https://bridge.urbit.org). Bridge is written in React; please conform to the code style Bridge has thus far been written in.

A completed wallet should:

- Use the bitcoinjs-lib library for generating transactions and interfacing with Bitcoin
- Display Bitcoin balance (display as individual UTXOs)
- Generate new addresses to receive Bitcoin
- Support transaction signing and ability to broadcast to a full node specified by the node’s domain name
- Reuse login credentials to generate Bitcoin wallets / derivation path
- When logged in with a master ticket, use the ownership mnemonic.
- When logged in with a BIP 39 mnemonic, use that as-is.
- Then, proceed as per BIP32

### Resources

- [Bitcoin Core SPV wallet reference](https://bitcoin.org/en/operating-modes-guide#simplified-payment-verification-spv)
- [JS Library to interact with SPV wallet](https://github.com/bitcoinjs/bitcoinjs-lib)
- [The Bridge repository](https://github.com/urbit/bridge)
- [Urbit Wallet Reference](https://github.com/urbit/fora-posts/blob/master/proposals/posts/~2018.11.8..19.31.59..ba77~)
- [Urbit Wallet Key Generation](https://github.com/urbit/urbit-key-generation]
- [BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
- [BIP 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

### Contribution Guidelines

- Do not begin work until your request to claim this bounty is accepted. We will assign a designer to work with you on the interface.
- Bounty claimant should have a good working knowledge of React and Bitcoin transactions.
- Submit your code as a PR to the [Bridge](https://github.com/urbit/bridge) repository.
- You have 45 days from the time of approval to complete this bounty.

## Milestones

### Pull request is accepted

1 stars
Your pull request containing all of the relevant code has been merged.
