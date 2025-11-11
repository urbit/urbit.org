+++
title = "Building Your DAO with Pseudonymous Reputation on Urbit"
date = "2022-07-19"
description = "Using Urbit ID’s pseudonymous reputation model, DAO participants know Urbit ID holders’ past behavior before relying on them, and without sacrificing anonymity."

[extra]
author = "Anthony Arroyo"
ship = "~poldec-tonteg"
image = "https://storage.googleapis.com/media.urbit.org/blog/2022.7.14..19.19.05-image.jpg"
+++

![](https://storage.googleapis.com/media.urbit.org/blog/2022.7.14..19.19.05-image.jpg)

_This is cross-posted from [The Combine DAO Blog](https://blog.the-combine.org). If you'd like to comment, join the public [Urbit group](https://urbit.org/groups/~famreb-todmec/the-combine-public)._

[The Combine DAO](https://blog.the-combine.org/introduction-to-the-combine-dao) is a DAO built on Urbit to invest in promising projects on the network. While building the DAO, we did a survey of the existing identity solutions and found our solution close to home: Urbit ID provided the best balance of trust and anonymity due to the Urbit networks’ pseudonymous reputation. In this post, we’ll discuss the challenges facing DAOs and discuss why Urbit ID presents advantages over current approaches like token gated DAOs.
 
## Trust, Anonymity and Pseudonymous Reputation
 
Anonymity is a core feature of most DAOs. It’s great in theory. No one wants to trust that the humans operating Robinhood will execute trades how and when they say they will (much less know their names.) We’d all prefer if a smart contract handled it for them.
 
The problem is that trust and anonymity don’t mix, and trust is essential to the practical operation of any organization. This is why existing DAOs take shortcuts to establish trust hierarchies—things like delegating multi-sigs to small groups of trusted leaders, or trusted leaders establishing authority via exclusive Discord channels.
 
Put simply, if there’s no human to trust, there’s no human to hold accountable. Lack of accountability is a major hurdle for any organization.
 
We were aware of this fundamental flaw when building Combine DAO on Urbit, and we’ve found a solution in Urbit ID. Urbit ID is the decentralized identity system at the core of the Urbit project. Urbit IDs are the “decentralized IDs” that [DAO builders yearn](https://thmueller.medium.com/decentralized-identity-3-ways-to-build-trust-in-your-dao-4871491903c8) for. They’re endowed with what we call pseudonymous reputations that unlock the ability to run DAOs in ways that more closely resemble successful IRL organizations, while maintaining the automation that makes them so attractive. 
 
## What is Urbit ID? 
 
Why is your Urbit ID so different from every other online identity you’ve ever had? The substantive answer is simple: it’s a lot more like your IRL identity. It’s permanent and owned by you. And because it’s the same throughout the Urbit network, it can accrue a reputation. 
 
You’ve probably seen Urbit IDs like `~ravmel-ropdyl` or `~mogmet-tadnem` in Twitter profiles. Each is a unique NFT that can be transferred and sold like any other cryptographic asset. Your Urbit ID is your username, network address and crypto wallet all in one.

Like wallet addresses, Urbit IDs are anonymous. Like Discord, Twitter, or Notion accounts, they are also pseudonymous. Pseudonymity is the kind of anonymity you find in most online communities: a common username that people recognize even if it’s not your “real” name.

Your Urbit ID is to your urbit ship what your deed is to your house or your keys to your car. It encrypts all of your ship’s communications and provides access to your online communities, which in this instance are DAOs. 

Using Urbit ID’s pseudonymous reputation model, DAO participants know Urbit ID holders’ past behavior before relying on them, and without sacrificing anonymity. Why do reputations stick to Urbit IDs? Because, like your physical person, every action you take with your Urbit ID affects your reputation. Urbit maximalists often ask “How high of a ransom would you pay if your Urbit ID were ‘kidnapped?’” That’s because the reputation of your Urbit ID is the result of years of labor. Imagine every social account you’ve ever had in one immutable chain tied to one immutable pseudonym. 
 
Thus, unlike an anonymous wallet address, Twitter handles or Discord accounts, there are high incentives for keeping your Urbit ID’s reputation squeaky clean.
 
## Urbit ID for DAOs
 
Many DAOs gate their membership on the ownership of a cryptographic asset like an ERC-721 or an ERC-20 token. Token gating is used to create a flat, anonymous membership. This was initially seen as a good thing. “One member, one voice.” All decisions made anonymously via multi-sigs and voting apps secured via smart contract.
 
Token gating also adds utility to NFTs; it unlocks access to perks like special releases or events apart from the core asset. To get into the Milady Rave you need to buy a Milady NFT. It doesn’t matter who you are, what you’ve done, or how capable you are of participating in the community’s goals, if you buy a Milady, you’re in. You have the same rights and privileges as everyone else. 
 
In reality, many DAOs move inexorably back towards a more conventional model of “human trust” simply because organization requires it. That’s why DAO builders have long sought “decentralized IDs” for members. “One member, one voice” doesn’t work for complex, efficient decision making; it risks chaos and endless discussion. It creates the need for offchain governance executed by smaller groups, which is cumbersome, requires a patchwork of Web2 apps (i.e. Google and Notion), and undermines the “trustless” nature of the DAO. 
 
To return to a prior example, imagine Robinhood was a DAO of its members. If it was run like DAOs today—e.g. those not built on Urbit—a group of Robinhood “elites” make and execute trade decisions via private Discord channels. DAO members vote to approve, but participation is low. Some DAOs even cold-call members to garner participation. Not only is participation low, it’s also low quality: banter about the issues of the day. 
 
Urbit ID mitigates membership participation issues by adding permanent, pseudonymous reputations to the mix. As in: Who are you letting into your DAO? And whose DAO are you joining?

As a leader of an organization, you want high quality members. You want to avoid Dumb Money: people passively investing in your DAO because it’s cool, but without the ability to add value. You also want to avoid oversubscription/underparticipation: a dropoff in engagement from most members as they become interested in newer, shinier things.

When it came time to recruit members for Combine DAO, we didn’t have to leave Urbit. We only considered those with strong pseudonymous reputations on the network, many of whom were anonymous outside of Urbit. Some of the Urbit IDs in Combine DAO like `~bitmep-faswyn` have been on the network for years. Some like `~timluc-miptev` have created valuable groups and built companies on Urbit. Selection blindness was both unneeded and unnecessary—members were selected not in spite of “who” they were on Urbit, but because of it. 

Pseudonymous reputations also allow prospective DAO members to better evaluate leaders. Urbit ID reputations subsume the need for patchworks of authority. You know exactly “who” `~mogmet-tadnem` is. You don’t need to google his Twitter handle and figure out, oh maybe he’s also the guy behind this or that DAO or NFT release. Leaders benefit from the past and are held accountable for future actions. 
 
Now, the organizing forces behind Combine DAO are `~poldec-tonteg` and `~wolref-podlex`. In this case, their real world identities are known to many, but they needn’t be: their actions on the network speak for themselves. `~poldec-tonteg` is the former CPO of Tlon and `~wolref-podlex` is the Executive Director of the Urbit Foundation. Prospective members of Combine DAO know who they are aligning themselves with.
 
To sum it up, Urbit ID is a solution for the reputational problems faced by DAOs in their current form. While good in theory, the trustless nature of DAOs leads to practical issues around organization, leadership, membership, voting, and participation. This is why DAO builders need ways to give their membership durable reputations that can travel with the members as they participate. 
 
Urbit offers just such cryptographic identities with portable reputations in the form of Urbit IDs. We put pseudonymous reputations to the test in building Combine DAO, and discovered they enhanced leadership formation and membership curation, eliminating some of the organizational problems that DAOs struggle with today.
