+++
title = "Azimuth-based Urbit IDs"
description = "Azimuth identities are cryptographically owned Urbit address space on the Ethereum blockchain"
tags = ["ethereum", "layer 1", "layer 2", "urbit id", "nft"]
lastest-update ="<some-arvo-hash>"
image = ""
imageDark = ""
references = [
    { title = "Network Explorer", link = "https://network.urbit.org", description = "Explore the Urbit address space and network" },
    { title = "Bridge", link = "https://bridge.urbit.org", description = "Manage your Urbit ID and keys" },
    { title = "Technical documentation", link = "https://docs.urbit.org/urbit-id/what-is-urbit-id", description = "Learn more about Urbit ID's implementation on Azimuth" }
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

Azimuth is the segment of urbit address space registered and owned on the Ethereum blockchain as ERC721 Non-Fungible Tokens (NFTs). The smart contracts for Azimuth are found at [Azimuth.eth](https://etherscan.io/address/0x223c067F8CF28ae173EE5CafEa60cA44C335fecB) (for the ownership ledger) and [Ecliptic.eth](https://etherscan.io/address/0x33EeCbf908478C10614626A9D304bfe18B78DD73) for the transfer and upgrade logic. Azimuth identities can be purchased on various NFT marketplaces, such as [opensea.io](https://opensea.io/) or 3rd party sellers, such as ~sitful-hatred on [subject.network](https://subject.network/buy/). There are 3 'types' of Azimuth identities: galaxies, stars, and planets (and their 'moons'). Typical users should chose a planet level identity for daily use.

Acquire an Urbit ID of your chosing by transferring it to a web3 wallet you control. You can then log in to [Bridge](https://bridge.urbit.org) using that wallet and take a variety of ownership and management actions from that interface.

Azimuth also has it's own custom Layer 2 Rollup which can be used if you desire reduced blockchain fees, in exchange for reduced legibility to broader Layer 1 Ethereum. It is commonly used by hosting providers, such as Tlon, in order to reduce the cost of initial user onboarding. 

If you find that your Urbit ID NFT doesn't appear natively in your web3 wallet, it may be that you have a Layer 2 identity. Connect to Bridge and review your ownership of both Layer 1 and Layer 2 assets. 
