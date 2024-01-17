+++

title = "Build a DID Resolver for Urbit"
date = "2023-04-12"

[taxonomies]
grant_type = ["RFP"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "Design and implement a DID resolver to let Urbit interoperate with protocols like AT/BlueSky"
reward = "TBD"
assignee = [""]
champion = [""]
grant_id = "P1001"
completed = false
canceled = false

+++

The launch of [BlueSky](https://blueskyweb.xyz/) and the [AT protocol](https://atproto.com/guides/identity) has brought renewed attention to a W3C standard called [DIDs](https://www.w3.org/TR/did-core/#introduction) or Decentralized Identifiers

Decentralized identifiers (DIDs) are a type of identifier that enables verifiable, decentralized digital identity. A DID refers to any subject as determined by the controller of the DID. In contrast to typical, federated identifiers, DIDs have been designed so that they may be decoupled from centralized registries, identity providers, and certificate authorities. Urbit ID is a good fit with this standard, since the Urbit namespace already conforms with many aspects of the specification. 

Included in the standard is a specification for a [resolver](https://www.w3.org/TR/did-core/#dfn-did-resolvers), a function that maps a READ from an identifier to its accompanying document. Build an application layer in Urbit that uses a ship to resolve a DID to a document either on the Urbit network or outside it.
