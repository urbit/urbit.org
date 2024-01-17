+++

title = "Mapping Urbit IDs to Web 2 Domains"
date = "2023-06-13"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Other"]

[extra]
image = ""
description = ""
reward = "5 Stars"
assignee = ["Web23"]
champion = ["~rovnys-ricfer"]
grant_id = "P0262"
completed = false
canceled = false

+++

# Overview

Urbit has a striking design that makes Urbit IDs scarce, full of utilities and many more new use cases would evolve around them. 

Urbit IDs also have an analogy with the Unix file systems where hostname resolves to the loopback address of the localhost. Further, an address will be reachable via network packets as well as be accessible via a local naming system. 

This structure of hostnames mapped with the IP addresses evolved to DNS at large. Urbit is perfectly aligned to evolve Urbit IDs into a true decentralized DNS structure. 

Domain names run over Web2 stack & current technological stack is in a transition state. For example, Web3 domains, let’s say john.eth or john.crypto are not recognized by the existing DNS and hence the resolvers & browsers. Typing john.eth in Chrome will not take a user to john.eth even if a dAPP is running over john.eth 

Additionally, with the Decentralized Identifiers (DIDs) evolving as the perfect way to identify the assets over the chain, it becomes imperative to look-up for DIDs and resolve them for multiple use cases. 

To fill the technical discontinuity amongst Web2 domainers & Web3 domainers, we propose a hinge between Urbit IDs & Web2 domains and also propose to build the DID resolver.

# Why?
  - Web2 domains still serve as the starting points for most of the things on the Internet. (Even when Web3 products start their journey, maybe one of the first steps is to register a Web2 domain.) 
  - People across the world know, understand & value Web2 domains more than any other thing (for example, a dot com) 
  - There are millions of Web2 domainers who have no idea of Web3 landscape & considering them the long tail it is far more easier to use Web2 domains and nudge them towards Web3 

# The Proposal

1. Chain agnostic Web23 domain centric wallet, first of it’s kind with the capabilities of Ethereum, Solana, Hedera Hashgraph to allow: 
1
  - Existing Web2 domainers (likes of .com, .link) to explore, mint new Urbit IDs (from within the wallet) - pulled via GoDaddy, Tucows etc. 
  - Existing Web3 domainers (likes of .eth, .sol, .hbar) to explore, mint new Urbit IDs (from within the wallet) 
2. Decentralized application with the web interface to allow minting of new Urbit IDs via:
  - Web2 domains pulled over GoDaddy & Web3 domains pulled via Metamask (for Ethereum) or Phantom (for Solana) or Blade (for Hedera Hashgraph) 
3. Integrated DID resolver: 
  - To be accessed within the entire galaxy/ships of Urbit - an application layer in the form of NPM based libraries - could be used by all the calls/requests 
  - To be accessed within the Web23 wallet as eventually DIDs would be the best fit & initial hook for the wallet - allowing end users to map multiple assets along with their DIDs 

# Timeline and Compensation

This proposal will be completed in multiple phases, beginning with: 

Web23 wallet in the form of Chrome Extension for the Urbit community with the capabilities to map Web2  domains + Web3 domains of Ethereum, Solana, Hedera Hashgraph, Concordium along with the Urbit IDs:
  - Option to buy new Urbit IDs 
  - Option to configure existing Urbit IDs 
  - Access to Urbit IDs via sub-domains of the existing Web2 domains in question. For example, john.com may have ~Urbit ID.john.com 
  - Option to exchange DMs (Direct Messages) within the wallet amongst each other

Timeline: 8 weeks from start of project

Reward: 5 Stars

# Future Work

The next two phases of work will consist of: 

1. Web based decentralized application to allow Web2 domain holders + Web3 domain holders of Ethereum, Solana, Hedera Hashgraph & Concordium to: 
  - Map their existing Urbit IDs with the Web2 or Web3 domains (as indicated above) 
  - Buy new Urbit IDs
  -  Configure Urbit IDs 
  - Decentralized application to allow connectivity for the respective wallets of the chains (one wallet each chain)
  - Exchange DMs using the Urbit IDs as hook and accessible over decentralized application


2. Integration of DID Resolver for Urbit allowing: 
  - Ships to resolve to DIDs 
  - Web23 wallet to resolve DIDs since Urbit IDs would be mapped to the 
wallet 
  - Decentralied apps to resolve DIDs

# Overall Benefits

  - Web2 domains get coupled with Urbit IDs for future sign-ups over dApps - for enhanced utilities of Urbit IDs 
  - Insertion of Urbit IDs into the zone files of Web2 domains - for future readiness when DNS resolvers may have to query about the Urbit IDs 
  - Easy access of Urbit IDs or dApp running web pages via integrated hosting services. For example, ravmel-ropdyl.john.com if Urbit ID ~ravmel-ropdyl creates a hinge with john.com 
  - Integration of DID resolving part from within the proposed Web23 wallet- allowing users to keep & manage Urbit IDs, DIDs, Web2 domains and even Web3 domains -lying over Ethereum, Solana & Hedera Hashgraph 
  - Push of Urbit IDs to all the Web2 domainers 

# Why Us? 

  - Our core expertise & experience run in decades of man hours in the Unix/Linux & domains, DNS at large 
  - [Web23](https://web23.io/) is one of the grantees of Hedera Hashgraph - we have developed complete naming system for .hbar and various project TLDs over Hedera 
  - Web23 has collaborated with many ICANN registrars & registries to bring in the Web2 domainers to the evolving webspace of Web3 
  - Web23 is working to transform any Web2 domain to a Web3 domain 

# Specific Deliverables

  - Web23 domain centric wallet 
  - DID resolver as NPM based library 
  - Integrated DID resolver within the Web23 wallet as well as the application layer for the ships 
  - A decentralized web application with integrations of Metamask, Phantom & Blade to allow buying, mapping of Urbit IDs to Web2 domains 

