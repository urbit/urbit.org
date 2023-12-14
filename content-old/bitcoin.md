+++
title = "Bitcoin Development on Urbit"
+++

### Overview

Urbit OS currently ships with our Bitcoin wallet, %btc-wallet, released in 2021,
and our Lightning implementation, %volt, is almost ready for live use on the network. Several integrations with the app ecosystem are planned immediately following its release, including subscription publishing, social payments, and more.

**The Urbit Advantage**

- Composability: Modular userspace applications expose a consistent API format to each other locally and over the network, making seamless integration of Lightning payments, Taro assets, and other protocols easy
- Networking and identity: Exactly-once message delivery, NAT traversal, and E2E encryption come built into Urbit's P2P protocol, and Urbit identities are sybil-resistant, human-readable network addresses bound to BIP32 extended public keys
- Efficient, secure development: Urbit OS is strictly typed and purely functional, and apps have reproducible builds on all client machines, removing much of the complexity, risk, and pain points from development

**Getting Involved**

Interested in contributing to or supporting Bitcoin development on Urbit? GitHub repos for individual projects and information on the Urbit Foundation grant program are linked below, and dedicated Urbit groups and Bitcoin node operators on Urbit are listed in the Community section. You can also reach out to current contributors ~tondes-sitrym and ~pindet-timmut on Urbit or at urbitcoin@protonmail.com.

### Wallet

Urbit's Bitcoin wallet consists of two agents: %btc-provider, which communicates with an external full node; and %btc-wallet, which handles transaction generation and signing, and uses a %btc-provider instance (on the same ship or elsewhere on the Urbit network) to broadcast transactions and receive data from the Bitcoin network.

Wallet users can receive payments using the xpub associated with their Urbit ID, allowing Bitcoin payments to be sent between ships with a persistent, human-readable network address without compromising on-chain privacy.

**Resources**

GitHub

- Agents: [https://github.com/urbit/urbit/tree/master/pkg/bitcoin](https://github.com/urbit/urbit/tree/master/pkg/bitcoin)
- UI: [https://github.com/urbit/urbit/tree/master/pkg/btc-wallet](https://github.com/urbit/urbit/tree/master/pkg/btc-wallet)
- Provider utilities: [https://github.com/urbit/urbit-bitcoin-rpc](https://github.com/urbit/urbit-bitcoin-rpc)

Writeups

- Grant proposal: [https://urbit.org/grants/bitcoin-full-node-provider-and-wallet](https://urbit.org/grants/bitcoin-full-node-provider-and-wallet)
- Architecture document: [https://gist.github.com/jalehman/e0c91071427ca4c349c0673f376945cb](https://gist.github.com/jalehman/e0c91071427ca4c349c0673f376945cb)
- Provider setup guide: [https://subject.network/posts/pi-fullnode-urbit/#bitcoind](https://subject.network/posts/pi-fullnode-urbit/#bitcoind)


**Continuing Work**

The current %btc-wallet implementation is not a modern BIP-157/158 light client. While users who depend on another ship's %btc-provider/full node for communication with the Bitcoin network do not risk loss of on-chain funds, their lack of visibility on the network will be more problematic for those also using it with Lightning. Funding is available for developers interested in contributing: reach out to the Urbit Foundation, ~tondes-sitrym on Urbit, or urbitcoin@protonmail.com.

### Lightning

Volt, Urbit's Lightning implementation, like our Bitcoin wallet consists of two agents: %volt, the primary agent that manages channels, payments, invoices, and chain monitoring; and %volt-provider, which connects to an external LND node for handling payments with endpoints outside the Urbit network.

All Volt nodes will run %volt, and be able to operate channels with Urbit peers without maintaining an LND instance or depending on another ship that does. To transact with non-Urbit Lightning peers, and in the short term (see below) to perform multi-hop payments inside Urbit, they will need to open a channel with a node that uses %volt-provider to connect with LND. Chain monitoring likewise requires connecting to a local or remote %btc-provider agent (see Wallet above). For more details on the network architecture, see the grant proposal linked below.

Volt implements BOLTs 2, 3, 5, and 11, and in the near future will add onion routing (variants on BOLTs 4 and 7). Because %ames, Urbit's networking module, already handles transport, guarantees required message delivery properties, and furnishes persistent, unique 'domain names', implementation of BOLTs 1, 8, and 9 is unnecessary for Volt nodes.

Beta release of Volt is planned for the end of 2022, and additional features including multi-hop/onion routing implementation are proposed for completion by mid-2023.

**Resources**

GitHub: [https://github.com/dasrun-fadben/volt/tree/on-chain](https://github.com/dasrun-fadben/volt/tree/on-chain)

Initial grant proposal and spec: [https://urbit.org/grants/volt-lightning-on-urbit](https://urbit.org/grants/volt-lightning-on-urbit)

Proposal for further work: [https://urbit.org/grants/lightning-development](https://urbit.org/grants/lightning-development)

**Continuing Work**

The primary element currently missing from Volt is onion routing of multi-hop payments for full privacy and efficiency of payments to and from nodes that don't also operate LND. This has been partially specified in the second proposal linked above: funding and collaborators are available for this as well as work described there on application integrations, submarine swaps, and more, so interested developers should take a look and get in touch.

### Roadmap

**2022**

- *Volt Beta Release*  
Final work on channel sweeps, remaining safety checks, and UI development is currently ongoing and expected to be complete by EOY 2022.

**2023**

- *Initial Ecosystem Integrations*
    - Submarine swaps: Implementation of the PeerSwap protocol, fallback use of the Loop API, and UI targeted at merchant use-cases. Funded, expected completion in spring 2023.
    - Apps: Integration of Lightning subscription and one-time paygates into Groups, social payments and %volt-provider discovery with %pals, and app tipjar module. Specified and proposed for grant funding.
- *Lightning Routing*  
Payments with multiple intra-Urbit hops and via multiple %volt-provider channels are the last remaining component for full-featured and private payments with Volt. Specified and proposed for grant funding.
- *Wallet Improvements*  
Work on feature, security, and UI upgrades for the Bitcoin wallet and node provider, aimed at making the application a full-featured and BIP157/158-compliant light client, should begin before EOY 2023.

**Future**

- *Taro Implementation*  
Implementation of Taproot Asset Representation Overlay, with an initial focus on using nonfungible Taro assets to represent credentials, permissions, and reputation of Urbit identities.
- *Atomic Streaming Payments*
    - Integration of Volt payments with streaming apps like %radio and the Holium WebRTC client via HTLC-DASH or similar implementation.
    - Generic protocol for non-media pay-to-stream data

### Grants

The Urbit Foundation operates a grant program aimed at new Urbit developers, network public goods, and community development. Work on the Bitcoin wallet, Lightning implementation, and submarine swaps for Volt (Urbit Lightning) users all has received funding from UF, and interesting non-technical proposals with social value to the network are also considered.

Grants homepage: [https://urbit.org/grants](https://urbit.org/grants)

Past Bitcoin-related grants

- [https://urbit.org/grants/bitcoin-full-node-provider-and-wallet](https://urbit.org/grants/bitcoin-full-node-provider-and-wallet)
- [https://urbit.org/grants/volt-lightning-on-urbit](https://urbit.org/grants/volt-lightning-on-urbit)
- [https://urbit.org/grants/lightning-development](https://urbit.org/grants/lightning-development)

## Bitcoiners on Urbit

### Groups

Urbitcoiners: ~pindet-timmut/urbitcoiners

### Providers

**Bitcoin Full Nodes**

~tirrel  
~zod

**Lightning Nodes**

~tondes-sitrym  
~bosdys

### Guides

Running %btc-provider with a full node on Raspberry Pi: [https://subject.network/posts/pi-fullnode-urbit/](https://subject.network/posts/pi-fullnode-urbit/)

