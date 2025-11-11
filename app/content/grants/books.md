+++
title = "Books: address and transaction manager"
date = "2022-02-18"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Books is an application for managing your crypto wallets, transactions, and counterparties. It allows you to add your wallet and others' wallets, track balances and transactions, and add private annotations to all of the above."
reward = "6 stars"
assignee = ["Quartus"]
champion = ["~wolref-podlex"]
grant_id = "B0109"
completed = true
link = ""
deliverable = "~doller-doller-dozzod-dalten/books"
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0134&prefill_Grant+Name=Books%3A%20address%20and%20transaction%20manager"
+++

Books is an application for managing your crypto wallets, transactions, and counterparties. It allows you to add your wallet and other people’s, track balances and transactions, and add private annotations to all of the above.

![books-mockup](https://storage.googleapis.com/media.urbit.org/grants/books-mockup.png)

## Rationale

If you spend much time interacting with crypto, you probably have a few wallets: a few hot wallets in metamask, a ledger or two, perhaps an Urbit ID on a master ticket, and that’s just Ethereum.

To get a good picture of your aggregate activity you can use a variety of chain analytics tools, but there’s always a sizable catch: there’s nowhere to record the identities of the counter parties you transact with, or the purpose of the transactions. To do this now, your options are to either keep your own records (offline), use a local-storage based address book like Metamask’s, or put your data on someone else’s servers.

Urbit provides an ideal solution: annotate on-chain, public information with private data stored on your own, personal server. This lets you account for your spending, keep records of the people you transact with, and organize your wallets without compromising on privacy or mobility.

## Overview

Books is for managing your personal crypto holdings and transaction history, not for actually executing any transactions. It’s chain analytics, but on a personal level, and with private annotations - like an address book.

There are three pieces of data that it should store and allow to be annotated:

- **Wallets**: your addresses that hold or have held assets.
- **Transactions**: all transactions that you’ve made from your wallets
- **Counterparties**: other entities that you’ve transacted with

Since a counterparty can own multiple wallets, it should be possible to associate multiple addresses to one record. Since this is Urbit, the counterparty should have an optional @p associated.

To get started with the application your first step would be to input a wallet that you own. You should be able to give it a name that means something to you, and add notes to it. After inputting an address, Books should then download the address’ transaction history for reconciliation. It’ll need to repeat this step every so often, probably daily or upon user request (think “refresh” button).

Reconciliation, as in accounting, involves associating each transaction with a counterparty and including some kind of note about the purpose of each transaction. Since this isn’t strict accounting software though, it’s fine if transaction notes are updated/added after reconciliation.

Users should be able to view their data in a number of different ways:

- All unreconciled transactions across all wallets, or for a specific one
- The entire transaction history across all wallets, or for a specific one
- The transaction history of my interactions with a counterparty
- All wallets you own, or the details of a specific one
- The current holdings across all wallets, or of a specific one
- All counterparties that have been transacted with, or the details of a specific one

That wraps up the feature set for an initial release, but there’s of course much that could be added to make this application even more interesting. See the future work section for more ideas.

### User Stories

As an user, I can:

- Input a new wallet (public address)
- See the transaction history for each wallet that I’ve input
- Associate a name with my wallets, and update that name at any point in time
- Add and remove notes from my wallets
- Remove a wallet and all transactions and associated data
- Create a counterparty by entering a name and wallet address, and optional @p
- Add and remove notes from counterparties
- Add a wallet to an existing counterparty
- Reconcile an unreconciled transaction by noting its purpose associating it with a counterparty
- Create a new counterparty during reconciliation
- View my wallets, counterparties, and transactions as described above

### Implementation Notes

A first version of this could probably just use the etherscan API, but it would be cleaner to pull from the chain directly. You could probably do much of this using `eth-watcher`.

This application should be built as a Landscape application with its own frontend and Gall agents. Use of graph-store is not recommended.

UI mockups will be made available to the worker, like the one shown above.

## Future Work

Thus far we’ve described an application that’s already useful, but it’s important to think through the ways in which it can become even more useful, and profitable. The UF is committed to fund subsequent development of Books, either through additional grants or through a [Combine](https://the-combine.org) investment.

There are several ways to make this application even more interesting. Below we outline some features we think are worth integrating, but there are probably many more possibilities.

- **Wallet integration**: pull your list of counterparties from Books into a wallet and initiate transactions against them
- **Notifications**: your Urbit could notify you the moment an incoming transaction is received at one of your addresses stored in Books
- **Address request**: autofill address information easily from Urbit counterparties. By adding a counterparty that has an associated @p, an address request can automatically be sent to them via Urbit. Once they respond to the address request, their address is recorded in your Books.
- **Multisig support**: create a multisig easily with your counterparties. Using the address request feature from above, you can select a group of counterparties and collect the address from each member. Upon all addresses being collected, Books can create a multisig with your selected group of counterparties.
- **Analytics**: with Books you can perform improved analysis on your transactions. Batch transaction by counterparty, visualize total spent on fees, track “coin flow” across configurable time frames
- **Tags**: turn your notes into Tags to batch transactions by type, easily search and perform analytics
- **Multi-chain support**: Extension to support additional chains: the features described are largely chain-agnostic. Books should extend support to additional chains, such as Bitcoin, Solana, etc.
- **CSV Export**: securely export transactions, notes, counterparties and all other data into a CRV for external processing

## Requirements

- At least three years of professional programming experience
- Experience with full-stack development, including JS and some server-side language
- Demonstrable experience with writing Gall agents
- Not engaged in active work on any other Urbit grant or project

Candidates that demonstrate the desire and ability to continue working on this
project (see [Future Work](#future-work)) will be given priority.

## Schedule

The schedule is simple. If you can satisfactorily complete the above [user stories](#user-stories) within two months of acceptance, the reward is 7 stars.

If completed within three months, the reward is 6 stars.

If completed within five months, the reward is 5 stars.
