+++
title = "Lightning Development"
date = "2022-10-20"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Extending Bitcoin on Urbit via lightning submarine swaps and onion routing"
reward = "6 stars"
assignee = ["~tondes-sitrym"]
grant_id = "P0183"
champion = ["~hastuc-dibtux"]
completed = false
link = "~pindet-timmut/urbitcoiners"
deliverable = "~mister-dister-dozzod-dozzod/bitcoin"
+++

# Introduction

The upcoming release of Volt, the Urbit/Lightning Network integration initiated by a 2021 UF grant, will furnish Urbit users and potential Urbit-native merchants with a high-speed, low-fee Bitcoin payment rail that facilitates transactions both between ships and with parties outside the Urbit network. Many integrations of this functionality into the existing Urbit app ecosystem are relatively simple and can be accomplished in the short term, including Substack-style paid subscription channels and groups, friend-to-friend payments via Pals, and tipjars for app developers and users. Simultaneously, additional work is needed to make Volt fully practical for merchant use and the bootstrapping of a circular Bitcoin economy within Urbit, starting at the feature level with two issues brought up in the original Volt grant as areas for future work: submarine swaps and onion routing.

# Background

*Inbound liquidity*

In a Lightning payment channel, transfers are facilitated by updating a balance of account between the two participants, and the amount that can be transferred across it in a given direction is limited by the portion of the channel’s funds currently owned by the originating party. In general, an end user needs to fund the creation of their own channel, which therefore starts out with a balance entirely owned by them. This balance is “outbound liquidity” that can be used to make payments - shifting part of it to the counterparty’s side of the channel - but not to get paid, which requires some amount of “inbound” liquidity on the counterparty side. Without any additional tools, a new Lightning user whose primary use-case is to accept payments - a merchant - can only do so either by first making payments to others that build up inbound liquidity, or with a custodial and manual setup where they send their on-chain funds to the counterparty and trust them to open the channel. Neither of these is a viable onboarding process for businesses, who just want to start cheaply accepting Bitcoin for goods and services on demand; fortunately there is an existing solution.

*Submarine swaps*

Submarine swaps combine on-chain and Lightning transactions such that neither can be completed without enabling the completion of the other - an “atomic” swap - allowing balances in Lightning channels to be trustlessly exchanged for an on-chain payment. With a submarine swap, 80-90% of the funds in a new channel (depending on its configuration) can be paid to the other side and converted into inbound liquidity, in exchange for an on-chain repayment that can only be redeemed using the cryptographic proof-of-payment (hash preimage) that the swap counterparty reveals in order to complete the associated Lightning transfer.

Subsequently, this will also allow merchants to move accumulated income out of their Lightning channels and into long-term on-chain storage, replenishing their inbound liquidity in the process. The pattern of business operation is equivalent to emptying a stuffed cash drawer (Lightning channel) and depositing the cash at the bank (on chain) at the end of the day. This is desirable independent of inbound liquidity needs because a wallet participating in a Lightning channel must be “hot”, ie. remain online, in order to sign balance updates without manual intervention - an intrinsically less secure disposition of funds than eg. a hardware wallet.

Swap providers are paid a fee, and there are existing marketplaces for the service, such as Loop operated by Lightning Labs, that Urbit merchants can use as a fallback. However, since the Loop marketplace is centralized (though noncustodial), and in order to keep fee income and market development inside Urbit, it will be important to enable ships to directly negotiate channel rebalancing peer-to-peer. This can be accomplished by implementing the PeerSwap messaging protocol currently in beta on Lightning mainnet.

*Onion routing*

While a single channel is useful for parties who make frequent transactions with each other, the true utility of Lightning lies in multi-hop transactions, which update multiple channels in a route to send a payment between any two nodes in the network. For privacy, the Bitcoin contracts that comprise this route are sent in the form of an onion, which encrypts each contract with the public key of the node meant to initiate it, who then passes the remainder of the onion to the specified counterparty. This prevents any individual node in the path from knowing the hops preceding and following them, ie. being able to identify the sender and destination.

The current Volt architecture does not implement the construction of payment routes with multiple intra-Urbit hops, and instead has ‘interior’ ships without a colocal Lightning node forward all multi-hop transactions through channels with a 'provider' running lnd, who is thus easily able to inspect the user’s transaction history. This simplification made sense for a number of reasons, not least that to make outbound payments along a multi-Urbit path will require lnd, the most popular Lightning node implementation, to add two new RPC methods to facilitate passing onions and proof-of-payment secrets in and out of its context. However as Urbit adoption continues to accelerate, it is unrealistic - and undesirable for Urbit’s robustness in an increasingly adversarial environment - to expect that Bitcoin users will be widely willing to accept this sacrifice of privacy to a node provider as the condition of operating on Urbit.

# User Stories 1: Submarine Swaps

As a merchant/payee, I can…
- Ready my channel to receive payments immediately after opening it
- Optionally use the funds I get back on-chain to open a second, outgoing channel
- Move funds I’ve received on Lightning to an on-chain address of my choice for long-term storage
- Replenish my channel’s capacity to receive payments when previous transaction flow has depleted it

As a swap purchaser, I can…
- Receive information about available swap providers on the Urbit network
- Poll the Loop marketplace for swap providers if none are available inside Urbit
- Communicate with a swap provider to accept their offer and receive an invoice
- Monitor the Bitcoin chain for a correct conditional payment
- Pay the provider’s invoice once the on-chain payment is confirmed
- Redeem the on-chain payment once I receive proof-of-payment over Lightning

As a swap provider, I can…
- Signal the amount I’m able to swap and the fees I charge
- Send a Lightning invoice to an interested party
- Broadcast an on-chain conditional payment

# User Stories 2: App Integrations

As a group host and volt user, I can…
- Create channels in my groups that restrict access to subscribers that make one-time or recurring Bitcoin payments
- Create groups that restrict access to ships that make one-time or recurring Bitcoin payments
- Add a tipjar channel to my group that allows subscribers to send a Bitcoin payment to my volt wallet

As a group subscriber and volt user, I can…
- Make a one-time payment or authorize a recurring payment to subscribe to a group or channel
- See and subscribe or navigate to paid-only channels in groups I’m subscribed to, from my volt wallet
- Manage my subscriptions, seeing how much I’ve paid to a service and removing authorization for future payments if I wish to cancel

As a pals and volt user, I can…
- See and make payments to pals that also use volt
- Receive gossip via my pals about volt-provider ships that operate a Lightning node, and attempt to open channels and perform submarine swaps with them

As an app developer and volt user, I can…
- Add a tipjar to my app that allows users to send a Bitcoin payment to my volt wallet

# User Stories 3: Onion Routing

As a volt user, I can…
- Receive and decrypt an onion sent by another ship
- Forward the encrypted remainder of the onion to the counterparty of the included contract
- Receive a proof-of-payment from another ship and use it to settle an outstanding contract on a different channel

As an interior volt user (who does not operate lnd), I can…
- Open/close channels with multiple ships
- Receive information from channel counterparties and pals about intra-Urbit channels available to forward payments through
- Send outgoing payments on a route that transits channels between multiple ships before entering the exterior Lightning network
- Create an invoice for a payer that includes route hints specifying a payment route to me that involves multiple hops between ships

As a volt provider (who does operate lnd), I can…
- Receive an onion from another ship and inject it into lnd for propagation to the exterior Lightning network
- Intercept an onion received by lnd and forward it to the counterparty ship of the associated contract
- Receive a payment secret from lnd and use it to resolve an outstanding contract with another ship

# Milestones & Compensation

**Milestone 0: Volt Cleanup, Urbitcoin Landing Page**

Expected time to completion: 2-4 weeks
Payment: 1 star

- Modify %volt to use the %volt-wallet external signing agent in place of current internal signing behavior
- Design and manage urbit.org/bitcoin landing page

**Milestone 1: Submarine Swaps**

Expected time to completion: 1 month
Payment: 2 stars

- Offer/accept a swap with another ship at a set feerate
- Send/receive a Lightning invoice for an accepted swap, broadcast/monitor the chain for the associated conditional payment
- Pay an invoice and use the proof-of-payment to redeem on-chain funds
- Use the Loop API to source and fulfill swaps with non-Urbit swap providers

**Milestone 2: PeerSwap and UI Release**

Expected time to completion: 6 weeks
Payment: 3 stars

- Use the %rumours gossip protocol to send updates about ship availability for swaps between %volt peers
- Implement a version of the PeerSwap messaging protocol to automatically coordinate on-chain and off-chain payments
- Publish full-featured app with UI that allows users to initiate swaps, configure accepted swap parameters, and review/accept manual swap offers


---

In response to feedback from the Foundation, I'm restricting the scope of the current proposal to the first phase of work, on submarine swaps, and an added 'phase 0' milestone finishing leftover work integrating the %volt agents and setting up bitcoin.urbit.org. This is noted in **Milestones** below.

---
*Subsequent Proposals / Future Work*

**Groups**

Expected time to completion: 1 month
Payment: 2 stars

Integration with Groups 2 including:
- Admins of groups can gate membership of their group by a one-time or recurring payment
- Admins of groups can gate access to channels by a one-time or recurring payment
- Subscription management
- Automatic payment flows for joining groups

**Pals and Tipjars**

Expected time to completion: 1 month
Payment: 2 stars

- Use %rumours gossip protocol to advertise ships running %volt-provider and lnd to %pals and %volt peers
- Send invoices and payments to pals
- Library for app developers to plug Lightning tipping into their apps, handling invoice generation and allowing them to set default amounts
- Modular tipjar channel type for Groups 2

**Lnd PR and Incoming Routing**

Expected time to completion: 2 months
Payment: 4 stars

Deliverables
- Submit a PR to lnd for RPC methods enabling onion injection and hash preimage interception, for outbound payment routes
- Release a draft UI using %volt to invoice and confirm receipt of multi-Urbit-hop incoming payments

Requirements
- Library for serializing and deserializing Lightning onions
- Gossip protocol for route information
- Add support to %volt for opening channels with multiple counterparty ships
- Use logged routing gossip to select intra-Urbit final hops and add them to an invoice as route hints
- Parse onion data injected into %volt-provider from lnd
- Add %pokes for forwarding onion data
- Use de/serialization library to extract the local HTLC from a decrypted onion, initiate %volt’s BOLT 3 workflow

**Outgoing Routing**

Expected time to completion: 1 month
Payment: 2 stars

- Use logged routing gossip to construct outgoing routes and encrypt the resulting HTLC chain in an onion
- Inject onions from %volt-provider into lnd
- Receive hash preimages from lnd and use them to settle HTLCs in interior channels
- Add %pokes for forwarding preimages after settlement
- Final deliverable: Release a full-featured (inbound and outbound) multi-hop %volt extension and UI updates

# Additional Future Work

This grant is intended to be the beginning of a long-term project realizing the potential of Urbit/Lightning integration. Whether or how much of this will involve seeking further grant funding is hard to say in advance, but I think it’s worth giving a brief overview of what I have in mind.

- The single biggest win in this space will be implementation of the recently announced Taro protocol, which allows arbitrary assets like NFTs and stablecoins to be represented on the Bitcoin chain in a private and lightweight fashion and transferred via Lightning. Moving quickly on this (immediately after completion of the current proposal) would make Urbit the first fullstack environment for using the biggest expansion of Bitcoin’s capabilities since Lightning. My focus will be on using Bitcoin NFTs as granular, transferable rights and roles for ships participating in different communities and app ecosystems, but as the DeFi community’s interest in Urbit grows I expect supporting alt- and stablecoin use-cases to be highly significant as well.
- The app integrations covered in this proposal are only the basics even of what’s currently possible. Creating a library that can be used by any app, eg. Pokur to support betting with Lightning, is a priority since by 6 months from now I expect the Urbit app ecosystem to have multiplied several times in size. The reason for doing bespoke integrations with Groups and Pals first is simply to start generating common use and awareness on the network rather than allow Bitcoin integration to continue lying largely fallow while waiting for development.
- My favorite species of these use-cases is atomic streaming payments: continuous resources like audio/video or services that are incrementally accessed using cryptographic credentials received via proof of ongoing payments. The first application of this will be pay-to-play WebRTC streams, eg. through integration with Assembly Capital's %radio, but data, compute, and storage, eg. for hosting or AI applications, are all next steps.
- Improvements to the bitcoin wallet to make it more resemble a traditional light client in security model and UX are a necessity. I expect a large degree of overlap and concentration for the first year or more between providers of Bitcoin full nodes and Lightning nodes on the network, which would put the funds of many non-node-operating Lightning users of the current wallet in a highly precarious situation.

# About Me

My previous background is in Solidity and Javascript development for DeFi protocols on Ethereum, always with the ambition of eventually leaving the Ethereum space and working on Bitcoin, which I became enthusiastic about through a philosophy seminar in 2015. I’ve learned Hoon and Gall app development off and on over the past two years, and recently completed a demo app implementing a basic gossip protocol. I've also operated my own cloud-hosted Lightning and Bitcoin nodes and intend to serve as a provider for these services on Urbit.
