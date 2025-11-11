---
title: "Urbit ID"
description: "A decentralized identity system for the Urbit network"
---

Broadly construed, Urbit ID is the mechanism for both naming *and contacting* a particular computer on the network. You could call it an identity, a number, a name, an address, or it’s technical moniker a `@p` (“pat-pee”). In fact, at the technical level, each Urbit ID is really just a number. From that number we generate a pronounceable name and a visually identifiable sigil. \~dalwel-fadrun is 3,509,632,436, for example.

The Urbit ‘address space’ encompasses many different types of identities. The shorter names—four syllables and below—are instantiated as a Public Key Infrastructure (PKI) on the Ethereum blockchain in the [Azimuth smart contracts](https://github.com/urbit/azimuth), which govern the creation, transfer, and management logic of the finite portion of the address space. 

Overall, there are 5 tiers in the hierarchy of Urbit address space:

- **Galaxies**: 2^8 one syllable names, e.g. `~zod`  
- **Stars**: 2^16 two syllable names, e.g. `~sarlev` 
- **Planets**: 2^32 four syllable names, e.g. `~sampel-palnet`
- **Moons**: 2^64 eight syllable names, e.g. `~mister-dister-dozzod-dozzod`
- **Comets**: 2^128 sixteen syllable names, generally rendered in a truncated manner, e.g. `~hassun-hassel-pinrec-dilleg--sitmes-tolrus-lidmeg-marzod`

You can also call stars ‘infrastructure nodes’ and galaxies ‘governance nodes’, since those are more descriptive names for their roles. Stars can help route packets, kind of like an ISP. And galaxies are a bit like DNS root servers or ICANN members. The difference, of course, is that Urbit IDs are owned cryptographically by many different people and accrue reputation independently.

Regardless of the specific tier of identity, knowing someone’s Urbit ID is the same as being able to contact them. And being contacted on the Urbit network comes with cryptographic certainty of who is contacting you, a foundational protection against spam at the lowest possible level of the stack. Other protections against spam build up from this, for example the finite nature of the planet level address space makes for a scarcity-driven economic cost of identities, and the sponsorship hierarchy enables reputational filtering against malicious network participants.

The fact that your urbit first starts as an identity is key to the Urbit technical stack. A conception of itself, baked in at the ground floor, sets it up to persist as a unified, logical computer. From that point, it can layer on an operating system for more complex interactions with the network.
