+++
title = "volt: Lightning on Urbit"
date = "2021-04-01"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps", "Dev: Tool" ]

[extra]
image = ""
description = "An Urbit-native Lightning client and integration with `lnd` on 'provider' ships."
reward = "7 stars"
assignee = ["~dasrun-fadben"]
completed = true
canceled = false
link = "~pindet-timmut/urbitcoiners"
deliverable = "~mister-dister-dozzod-dozzod/bitcoin"
+++

## Introduction

With the coming integration of the Bitcoin wallet, Urbit ships can now send money between each other and associate payments with other ships (and soon applications/access rights). This building block will let us feel out the possibilities of inter-ship payments, but it's a time-buying measure at most: as BTC's price increases, fees will also rise, making Bitcoin impractical for payments less than around $500.

However, the Lightning Network, built on top of Bitcoin, is rapidly advancing in functionality. It presents a unique, non-custodial solution to the high fees problem, although usability is still an issue. Urbit is perfectly positioned to take advantage of Lightning's strong points while drastically improving its useability.

Once Lightning is integrated into Urbit, and maintained over time, Urbit will be a complete solution for building applications and receiving money for them through native payment rails.

## Lightning Primer

The implementer is not expected to understand Lightning prior, but will have to do significant work to get up to speed on the protocol. What follows is a quick overview of what that entails.

Lightning is a p2p network of nodes, which maintain "channels" between each other. Payments can then be routed from one peer to another by finding a path of channels with sufficient liquidity.

### channels

A channel consists of:

1. an on-chain Bitcoin transaction allocating funds to one side of the channel.
2. subsequent signed off-chain transactions re-allocating those initial funds, that can be posted to the blockchain in the event of unresponsiveness or malfeasance of the other party.

Peers open channels between each other in order to make payments in the network. Channels do require an on-chain transaction, but the cost of that can be mitigated as long as the side that initially doesn't have funds in the channel is willing to trust the other party. In that case, the channel can be used starting when it has zero confs, submitted to the mempool with a low fee, and becomes final once it's accepted.

Each channel maintains a set of commitment transactions over time, which are signed IOUs that can be enforced on-chain if necessary. These must be maintained and backed up in order to secure the channel.

### routing/payments

Lightning payments follow a set sequence:

1. payee creates an invoice

- optionally with route hints ("take this path to reach me, because maybe I'm not publicly listed")
- contains the hash of a secret (the "preimage")

2. payee sends invoice to payer
3. payer uses its channel graph to construct a route to payee that it thinks will work, using route hints if provided
4. payer tries to send payment along that route. If it fails, payer updates its channel graph and retries
5. all hops along the route update their commitments to the new state

### HTLCs

When we say "sending payments" above, what we really mean is each hop constructing a commitment to pay the next hop if the next hop provides it the secret to the hash from the invoice in step 1.

The contracts implementing this are called "hashed timelock contracts", or HTLCs. For more background, [this resource is recommended](https://github.com/lnbook/lnbook/blob/develop/routing.asciidoc). The basic concept is that once the final destination receives payment, it sends the secret to the prior hop, who uses it to get paid from the hop prior, and so on back to the original payer.

### interceptors

Because Lightning uses onion routing, every hop along a payment path must use onion routing. In order to avoid implementing this for the last (inside Urbit) hop, we can use the [HTLC Interceptor](https://api.lightning.community/#htlcinterceptor) feature in the `lnd` RPC. This allows an `lnd` node to intercept an incoming payment request and inject its data into a new context, from which it can be handled.

### additional resources

Additional background will be provided to the implementer by the Foundation as needed, and we can also arrange meetings with Lightning Labs for help as the project progresses. [Mastering the Lightning Network](https://github.com/lnbook/lnbook) is another good place to get up to speed.

## Lightning in Urbit

To speed and simplify implementation, we can use Urbit networking to provide full Lightning features without needing a full Lightning node (BOLT) implementation. In effect, we bridge "outside" Lightning to "inside Urbit", "interior" Lightning.

Throughout the architecture, we refer to "interior" nodes: Urbit nodes running a Lightning implementation that do not network with the outside Lightning world.

### wins of this approach

#### non-custodial _and_ easy to use _and_ powerful

Current Lightning implementations force users to pick 2 of 3: non-custodial, easy, rich/powerful. Wallets like Breez are non-custodial and easy to use, but can only do payments. Sphinx chat is more powerful, but you are forced to choose between ease and custody--if you want control over your money, you need to configure your own Lightning node.

Lightning on Urbit is able to achieve all 3 of these properties. The key is that we implement Lightning features inside an Urbit environment, which gives full access to Urbit's programmable ids and OS. We also can use Urbit's networking to link interior ships to providers running `lnd` and connecting to the outside Lightning network. As a result, `volt` will enable much richer Lightning experiences, across a full range of applications.

#### leverages existing Urbit features

Lightning has some complex networking to implement, but because Urbit already has secure routing to named destinations in Ames, we can use that. This lets the work focus on implementing payment channels in Urbit.

#### clear upgrade paths

The initial architecture does make one tradeoff: interior nodes are always one hop away from their providers, and so the provider knows how much money nodes are sending and receiving. There are two ways to handle that, one immediately possible, and the other doable after an upgrade:

1. (ok, doable now) Nodes can upgrade to running their own providers. A busy node can configure its own `lnd` provider and connect to the Lightning network directly, while maintaining all of `volt`'s benefits in terms of integration of payments with Urbit. This is similar to the upgrade path that Sphinx chat provides, but still with non-custodial properties for users who don't take this path.
2. (better, doable in the future) We can implement Lightning's onion routing (not networking) in Urbit, allowing multi-hop paths within the Urbit network, with private payments _even for nodes not running lnd_.

### blockers

Private key/hot wallet management inside Urbit. This is needed to sign commitment transactions. We can use dummy versions of this in development, and then figure out the best way to handle it when the rest is in place. We can't use cold wallet or external wallet signing, because commitment transactions need to be signed on demand, without manual user interaction.

## architecture

`volt` consists of a “dumb” provider that bridges between `lnd` RPC calls and Urbit, and the “volt” agent that runs the Lightning protocol between interior Urbits.

### system diagram

![system](https://s3.timlucmiptev.space/timluc/timluc-miptev/volt_arch.png)

### payment flows diagram

![payments](https://s3.timlucmiptev.space/timluc/timluc-miptev/volt_payment_flow.png)

### RFCs implemented

We implement everything related to channels, HTLCs, and invoices. We leave out all the Lightning networking and routing elements.
[RFCs located here](https://github.com/lightningnetwork/lightning-rfc/blob/master/00-introduction)

- RFC 02: channel opening, closing, HTLCs
- RFC 03: commitment transactions
- RFC 05: on-chain transaction handling
- RFC 11: invoices

### volt-provider lib

Bridge between `lnd` or similar Lightning server running on the same machine as a Urbit. This could be implemented as a separate agent or as a library that `volt` uses. My recommendation would be to implement first as the latter, and split out to an agent if other agents could potentially be using it.

- Communicates with lnd over rpc
- passes HTLCs in and out
- accepts Hoon commands to open/close channels with outside nodes

#### heartbeat

- checks for connectivity with lnd every N seconds
- updates local agent and subscribers with status

#### incoming payments

- intercepts the HTLC
- injects the HTLC and metadata (next hop) into `volt`, where it's handled
- receives a pre-image back and sends it back to the Lightning network (which RPC call?)

#### outgoing payments

- receives outgoing-payment request from itself
- finds an outgoing route, if one exists
- constructs an HTLC with the interior node
- sends the outgoing payment using RPC `SendPaymentV2` with params:
  - invoice
  - route hints
  - fee
- when the preimage is received, inject back into `volt` to settle the HTLC

### volt

Manager for interior Lightning in Urbit. `volt` handles everything related to channel management, HTLC creation and updating, and payment recording between ships.

- connects to provider
- provides Lightning pubkey to provider
- maintains pubkey->Urbit ship mappings
- maintains channel and commitment data
- maintains HTLCs

#### channels

- open/close channels between provider nodes and others
- monitor for fraud
- serialize and encrypt commitments for backup
  _note on backup_: commitments are critical for maintaining a channel's security, so we need functionality to back up that state to other Urbit ships whenever it changes, to avoid issues on breaches etc.

#### receive payment

- build invoice (with routing hints)
- send invoice to payer (can be interior or exterior)
- accept incoming HTLC from provider
- settle the HTLC if it's for us, fail otherwise
- update channel commitments
- update payment history, optionally with ship metadata

#### send payment

- parse invoice from payee
- make sure that either
  - our node is our provider
  - we have enough capacity to our provider
- make a new HTLC commitment with provider (if remote provider)
- send payment request to provider
- get result from provider and settle the HTLC

## user stories

### provider

As a provider, I can

- open/close channels with outside lightning nodes through the `lnd` RPC
- accept Urbit ships as clients and open/close channels with them
- intercept incoming HTLC payments for interior Lightning on my ship to handle
- receive settled HTLCs from the interior and inject them back into lnd to settle my exterior

### Urbit ship

As an Urbit ship I can

- select a provider and connect to it
- open/close channels with my provider
- receive payments from Urbit users
- make payments to other Urbit ships
- make and receive payments with outside Lightning nodes
- view my transaction history

## weaknesses and future upgrades

### weaknesses

As designed, the provider will see incoming and outgoing transaction flow. The best solution for that is to run your own local Lightning node. Some of upgrades below would address this flaw.

### upgrades

#### multi-provider support

Allowing a ship to maintain channels with multiple providers would stop one provider from knowing all your transactions. This isn't super-complicated; it's just extra Hoon work that should probably be started soon after v1 is complete.

#### Urbit-native onion routing

It would be great for privacy if Urbit nodes could construct paths with multiple hops from the interior that could reach the exterior. The reverse is already doable (exterior payments reach multi-hop interior Urbit nodes).

The multi-hops going out can’t be done until lnd implements ability to forward onion blobs to the wider network and inject the received preimage back in the RPC. This would also require us to be able to build onion routing (not terribly hard, but definitely adds scope).

#### submarine swaps

It is possible to re-balance channel liquidity (shifting more of the balance to one side of the channel or the other) by combining a Lightning payment with an on-chain transaction. This is outside the scope of this project, but could potentially be extremely valuable for merchants running businesses on Urbit.

## Resources

- The libraries and full node interface provided by the `btc-wallet` project will be useful for parsing formats like `bech32` and for querying the state of the blockchain to monitor for cheating.
- [Urbit Bitcoin Wallet](https://github.com/timlucmiptev/btc-agents)
- [Lightning RFC](https://github.com/lightningnetwork/lightning-rfc/blob/master/00-introduction)
- [lnd RPC API](https://api.lightning.community/)

## contributor requirements

- 4+ years of experience as a backend developer
- Full-time availablity is ideal
- Some familiarity with Hoon a strong positive
- Some programming familiarity with Bitcoin a strong positive
- Attend regular (weekly or bi-weekly) checkin meetings with an urbit.org director to provide status updates

### working process

- The contributor will work with the Foundation coordinator to on-board fully to Lightning and Bitcoin within Urbit.
- After initial onboarding, the contributor will do a weekly check-in call with the coordinator, more frequently if needed/desired.
- The contributor will fork [this Github repo](https://github.com/urbit/volt) and submit PRs to it to get feedback.

## Milestones

### Milestone 1 - transaction/invoice RFCs

Payment: 2 stars

- Implement RFCs 2, 3 and 11 from BOLT.
- Create the libs and types that further stages will depend on

### Milestone 2 - on-chain transaction RFC

Payment: 2 stars

- implement RFC 5, on-chain transaction handling
- test that channels can be opened and closed in the manner described there

### Milestone 3 - provider libraries

Payment: 1 star

- implement the `volt` provider that will talk to `lnd`
- create any configuration files needed to start `lnd` locally

### Milestone 4 - `volt` agent and cleanup

Payment: 2 stars

- create the Gall agent to manage transactions
- connect it to the provider libs
- use the RFC libs to wire up all on-chain transactions

### Milestone 5 - Create Signing Agent

Payment: 1 star

The milestone is to create a signing agent that can be run either on the same host as the rest of the volt system or one of it's moons. The goal of this agent is to separate the key material from the rest of the system while providing signing and key-generation functionality. The agent will make use of the existing BIP-32 implementation and expose a set API calls similar to those of popular hardware wallets, albeit reduced to what is essential for the purposes of volt.

The agent will support the following core calls as %poke's:

- %new-wallet
  Only accessible from the host ship: generate a new wallet and give back the
  seed, which can be rendered using the BIP-39 mnemonic.

- %get-public-key
  Give the public key for a given BIP-32 path.

- %sign-digest
  Sign a message digest using the key at a given BIP-32 path.

Potential additional convenience calls, if the remainder of the volt project demands:

- %get-address
  A public key is generated using a given BIP-32 path and an address is computed from the resulting key.

- %sign-message
  The message is hashed with dsha256 and then signed with the private key at a given BIP-32 path.

- %verify-message
  Verify a signed message using the public key at a given BIP-32 path.
