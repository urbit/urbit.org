+++
title = "Self-hosted Uniswap"
date = "2022-06-22"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Host a Uniswap frontend trading UI on your urbit"
reward = "1 star"
assignee = ["~togtyr-roplux"]
champion = ["~dinleb-rambep"]
grant_id = "B0155"
completed = true
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0186&prefill_Grant+Name=Uniswap"
deliverable = "~maptyl-lapsyl/uniswap"
+++

# Overview

Self-host Uniswap on your Urbit 

# Rationale 

Uniswap is a decentralized exchange with no order books, that simply facilitates peer to peer trades between its users through an efficient automated market making algorithm. Uniswap Labs is the main developer of Uniswap, but has no control over how tokens are traded or which tokens are listed. Since the entire Uniswap protocol runs on Ethereum and is open source, any development team can build on top of the protocol. 

The SEC launched an investigation into Uniswap at the end of 2021, with Gary Gensler the Chairman of the SEC stating that there can be some sort of “protocol control” from DeFi developers, and that DEXs could be violating banking laws (in addition to securities laws) by hosting securities and making them available to trade for their users. 

The operative word here is hosting, because Uniswap, while it is a decentralized exchange with no order books that simply facilitates P2P trades, still uses centralized servers to host its frontend trading UI. This SEC statement has broad ranging implications for all of crypto, going beyond the specific example of Uniswap. 

Binance comes to mind as another example, for it is the largest crypto exchange worldwide in terms of volume and the fastest progressing one, shipping new features and products that push forward the limits of what is possible within a financial system. They have been able to innovate so quickly because from the start they did a macro hedge, moving their servers out of China and now use a network of servers distributed across the world in mostly unknown locations in favorable jurisdictions. 

As more regulatory crackdown occurs within crypto, Urbit emerges as a useful tool for regulatory arbitrage and progressing further decentralization within the DeFi space. With a native, self-hosted, Uniswap app, Urbit can sustain the financial freedom of its crypto users, set a precedent of collaboration and extend its self-sovereign reach for other web3 platforms.  

Also, Urbit can extend the possibilities of DeFi by adding a cohesive identity and a social layer to the trading experience. Most crypto traders have private group chats where they discuss their positions, then separately they go and trade on DEXs. Other traders use WallStreetBets or similar forums to do research from their peers into what they should invest in. UrbitSwap could provide a unified experience for chatting with fellow traders while taking new financial positions. 

# Scope / Implementation 

Develop an Urbit application that serves the [open-source Uniswap UI](https://github.com/Uniswap/interface). The app should only be served if the user is logged in to the Urbit ship running it– it should not be publicly accessible for anyone to access. Distribute the application on Urbit so that anyone on Urbit can install it. See [this guide](https://urbit.org/docs/userspace/dist/guide) for a walk-through example of developing and distributing an app or “desk” on Urbit. A great submission will maximize user choice i.e. using or not using Uniswap’s [unsupported token list](https://github.com/Uniswap/uniswap-interface/blob/main/src/constants/tokenLists/unsupported.tokenlist.json). A stellar submission will creatively integrate Urbit’s native ID and network (i.e. groups and/or the “Pals” app) into the Uniswap experience.

# Compensation

1 Star upon successful distribution of the app to the network

# Future Work

- By integrating Urbit ID with Uniswap, traders (who often work with many wallets for different purposes) can operate under a unified identity system. 

- Once a clear identity is established, new features can be unlocked:

- Set yourself to public, to be discoverable (either by anyone or just by your Pals) so they can see your trading performance

- Follow top traders and learn from their positions, with potential to follow on 

- Add a social layer to trading: spin up a chat with the traders you follow to discuss trades as you take on positions, or even create a group for a broader discussion about investing

- Create a leaderboard of best traders to promote discovery and foster a competitive spirit 
