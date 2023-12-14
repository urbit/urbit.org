+++
title = "The Shape of DAO Governance to Come"
date = "2022-08-17"
description = "When building the Combine DAO, we conducted a survey of DAO governance and tooling and came to the conclusion that the many theoretical approaches to the problem of governance were tied to the implementation details of the DAO stack. Since we were building everything on Urbit—as opposed to through the typical combination of Solidity contracts, Web2 tools and Snapshot—we realized that we’d have to do some rethinking. A new approach for a new stack."

[extra]
author = "Anthony Arroyo"
ship = "~poldec-tonteg"
image = "https://storage.googleapis.com/media.urbit.org/blog/2022.7.29..17.14.22-image.jpg"
+++

![Image](https://storage.googleapis.com/media.urbit.org/blog/2022.7.29..17.14.22-image.jpg)

On Urbit, the risk of a governance attack is reduced because the Combine DAO’s founding team was selected based on their on-Urbit track records. All participants had skin in the game. This allowed us to focus on workaday consensus building, which forms the bulk of any organization’s activities. We use Holium’s Ballot app, which integrates with all aspects of Urbit OS and gives complete flexibility for automating the execution of a winning proposal via [Custom Actions](https://docs.holium.com/ballot/custom-actions/intro).

Let’s walk through the thought process that led us to adopt an Urbit-centric approach to DAO governance.

## Reputation’s Effect on DAO Governance

In our last blog, we discussed how Urbit’s pseudonymous reputation model frees DAOs from the constraints of “trustless” systems. Urbit IDs also mitigate the inflexibility that plagues DAO governance. Here’s what we mean.

One of the primary objectives of DAO governance systems is to prevent governance attacks. A governance attack occurs when one or more actors changes the internal processes to benefit themselves, for example transfering the entire treasury to himself. 

The risk of governance attacks means DAO governance is either 1) very rigid or 2) vulnerable. The vast majority of DAOs, Moloch for example, opt for the former. Thus the rules around upgrading smart contracts are constrained. Once systems are in place, they can’t be changed. On-chain activity is limited. Voting procedures are either distilled or taken off-chain (and usually onto Web2.) This leaves DAOs inflexible.

Here’s an example of said inflexibility gone wrong. In March of this year, the DAO that runs the Ethereum Name Service [held a vote](https://www.coindesk.com/layer2/2022/03/07/ens-and-the-limitations-of-dao-governance/) to oust its director Brantly Millegan. Brantly had recently been canceled for 2016 tweets dug up by an anonymous DAO member, fired from his role as director of operations at ENS’ non-DAO corporate parent True Names Limited. ENS iself, however, was governed by a typical 1 share: 1 vote system (plus delegates). Unsurprisingly, Millegan owned or controlled a large block of votes, and was able to overcome the ouster vote 1.6 million tokens to 1.4 million, with holders of roughly one third of the tokens abstaining or not participating.

Now, this is indeed a DAO working as it should, a democratic decision unswayed by the influence of insiders or elites. At the same time, the natural functioning of the DAO was derailed by mass distraction. Instead of focusing on ENS, for nearly a year the DAO’s function was to address a controversy raised by an anonymous member who, if we’re being honest, most likely intended to disrupt its active functioning from the start. 

We arrive back again at the inflexibility inherent to anonymity—if just anyone can buy a token, bad actors will buy them. Yet currently most DAOs intentionally eschew reputation. The incentives for good behaviors are thus only economic.

[Pseudonymous reputation](https://urbit.org/blog/pseudonymous-reputation) changes this calculus, adding incentives beyond money for both security and participation. This means when built on Urbit, DAOs are less susceptible to governance attacks, and more flexible. Having a baseline of trust allows DAOs to experiment with different governance tools and structures.

In order to understand how DAOs are more free to experiment on Urbit and what they can experiment with, it’s first important to understand the history of DAO governance, why it developed the way they did, and where it’s at currently.


## A Little DAO Governance History Lesson

The first DAO, The DAO, was also the most disastrous. A recursive calls flaw in the governance code led to the only hack-related hard fork in Ethereum History. 

Recursive call weaknesses in DAO code are somewhat like endlessly automated micro-pyramid schemes. An attacker can call a transaction, mark its benefit, then initiate another transaction before the original transaction is completed, over and over until the block limit is reached. Bernie Madoff paid off old investments with new investments while marking fake gains, took out fees, then reinvested before the prior investments could be properly marked. Both schemes work when automated governance fails.

While The DAO’s shoddy governance was its downfall, it was Ethereum’s good governance that saved ETH. Ethereum leadership proposed a hard fork and 97% of holders voted in favor. The transaction was undone. Money returned. Ethereum Classic was born.

While The DAO failed, its happy ending paved the way for the DAO boom of today. DAO creators learned the security lesson: there hasn’t been a major DAO hack since 2016. They built better governance—a combination of visionary leadership, trustless voting, and vigorous participation—that steered the ETH ship to calmer waters. 


## Birth of the Ragequit

Moloch DAO was born in the shadow of The DAO fiasco; its governance was expressly designed in response to it. Unlike The DAO, Moloch is a charity; it exists only to give money away to Ethereum infrastructure projects. Its on-chain governance is extremely_ _simple. Members can do only one of two things. 

The first thing is submitting and voting on proposals for new members. Votes are majority rule with one vote per Moloch share. Only an existing member can propose a new member, so prospective members must convince an existing one to nominate them. 

New member proposals double as funding proposals, a clever wrinkle which demonstrates just how much can be done on-chain with a single function. Every proposal must include a fundable ETH infrastructure project and a fundee to execute it. If approved, Moloch accepts the fundee as a new member and grants them a number of Moloch shares exchangeable 1:1 for ETH.

![Moloch DAO](https://storage.googleapis.com/media.urbit.org/blog/moloch-dao.png)

How the fundee exchanges the shares for ETH brings us to the second thing Moloch members can do: ragequitting.

Ragequitting is a smart contract function that allows members to rescind their shares—and thus their membership—during a seven day waiting period between approval of new members and disbursement of their funds. Its primary purpose is to allow members to opt out of the DAO if they don’t like a new member or proposal. If they ragequit, they automatically receive ETH equal to their shares. 

Ragequitting thus provides a major safeguard against the kinds of attack that took down The DAO. Members can simply ragequit en masse to invalidate any harmful action, thereby looting their own DAO and stopping bad actors in their tracks. Ragequitting is Moloch’s “ultimate safety net for malicious attacks.” 

Like member voting, ragequitting also has a dual purpose. In order to receive their funding, new fundees must ragequit, discharging their shares, receiving ETH, and thereby immediately becoming non-members. Thus, the only time someone becomes a permanent member is if they are granted more shares than they ragequit, which usually happens for non-fundee members, i.e. philanthropic members, not fundees.  

This is all to say that Moloch, a very successful DAO, has reduced its governance to the simplest imaginable framework. Members can take one of two actions—that’s it. While it makes for a functional secure on-chain charity, the ragequit process isn’t exactly dynamic governance. It’s too low-res for the vast majority of organizations.

## Ouroboros

In a way, ragequitting uses pyramid scheme logic to its advantage. The only thing members can do is add other members or quit; and it’s through these cyclical actions that the DAO gains members, disburses funds, and maintains security. But it also opens up new problems. For example, what happens if a disgruntled member intentionally votes yes on a harmful proposal, only to ragequit their shares just after the proposal passes? You might call it a murder suicide problem.

DAOs supposedly solve the Principal Agent Dilemma; an ancient problem faced by all resource-distributing organizations where an agent’s self-interest inevitably runs counter to principles’ assets. The most common example is a non-shareholding manager of a company (agent) versus its shareholders (principal). The manager is in charge of spending shareholders’ money, but doesn’t suffer the financial consequences from her decisions. Theoretically, DAO principles and DAO agents are indistinguishable—everyone is both investor and employee—which solves the dilemma.

But anonymous shareholders often act badly, or they don’t act at all. Even the [DAOs with the highest participation](https://www.businessofbusiness.com/articles/ranking-daos-we-computed-their-net-community-score-to-see-how-they-stack-up/) top out around 75%, and that’s rare. A DAO with low voter participation can become either paralyzed, if a quorum is required, or oligarchical if one isn’t. On-chain voting requires high gas fees and time spend, prohibitively high when it comes to the many technical decisions that need to be made. This is why every successful DAO has naturally developed sets of working groups who make decisions off-chain with the blessing of the body politic. The vast majority of these “governance forums” use a patchwork of Web2 apps.

For the bigger decisions, avoiding high gas fees and low participation can mean voting with literal Discord emojis, then having small groups of trusted “delegates” enter on-chain decisions via multi-sigs. This is both sloppy and defeats the purpose of the DAO.

More serious solutions make up the primary class L2 products. “Dynamic governance” adds granularity to voting systems, allowing for more complex on-chain voting with different rights for different member classes. “Holographic consensus” gamifies participation by appending a prediction market to every vote. Some are even trying “[Meta Governance](https://indexcoop.com/blog/early-2022-survey-of-metagovernance)”—DAOs governing DAOs. L2 decisions are even further analyzed by deep risk analyzers like Gauntlet that stress test decisions via simulated protocols before they’re executed on-chain.

The simple solution is conducting votes using decentralized apps that verify shareholder status. Snapshot is an IPFS voting app that holds votes off-chain, weighing and verifying member votes by reading members’ wallets. It’s a quick and secure way to stage off-chain votes, but it’s still pretty limited. Snapshot is called that because all it really does is take a picture of the result of a vote. All the activity resulting from said vote must still be manually undertaken by DAO operators.

Traditional DAOs suffer from what we like to call the Self-Enforcement Problem. Smart contracts enforce themselves, a stark difference from traditional corporations where bylaws and operating rules are met by employees using the best tools for the job. With DAOs, the bylaws and the tools that enforce them are one and the same. This adds up to yet another layer on inflexibility: traditional orgs can adopt new tools for old problems, DAOs cannot.


## The Right Tool for the Job

This all brings us finally back to Urbit. In the Urbit OS using Urbit IDs, DAOs can integrate every governance solution discussed above without touching Web2. Tailor DAO governance to your own precise needs. Download someone else’s voting app, or spin up your own. Using Urbit blurs the boundaries between on-chain and off-chain actions, eliminating the need for ad hoc fixes then fixes to fix those fixes. It all occurs in one landscape, and can pivot with new information

One Urbit app is called Ballot. Ballot most closely resembles Snapshot. It’s like a decentralized version of Snapshot that works without the need for Discord—everything is on the Urbit OS—that can also be modified to execute custom off-chain actions after a vote is held.

![Ballot](https://storage.googleapis.com/media.urbit.org/site/ecosystem/applications/ballot.png)

Ballot allows for this sort of dynamic governance enhancement, or what we call Custom Actions. In a way, Custom Actions make the dream of smart contracts a reality: instead of being constrained to ragequitting or not ragequitting, you can create automated granular responses to Ballot votes. In other words, smart contracts that are actually smart. One action could be “tweet something” or “ping someone” once a vote is recorded in Ballot. You can write any if-then you want on the outcomes of a vote. For example, instead of relegating membership to simplistic on-chain democracy, a la ragequitting, Ballot has a function for inviting or kicking members via Urbit native logic.  Imagine if Snapshot could both conduct a Moloch-style membership vote, and then automatically add or kick the member depending on the result. That’s Ballot.

What about the small technical decisions, like the ones that took down The DAO, like booting someone from a chat or paying a contractor through treasury? All of those actions are programmatic, irreversible, and immutable on Urbit, eliminating concerns about gas fees and participation.

If Ballot doesn’t suit your DAO’s needs, it’s easy to use Urbit’s primitives to write a custom voting application. Since Urbit has ring signature support built in, you can build a simple, anonymous voting app in just 15 minutes, following [this tutorial](https://developers.urbit.org/guides/quickstart/voting-guide). The combination of cryptographic identity and an append-only event log means that you are free to experiment with different tools to support whatever governance process your DAO adheres to.

The Combine DAO uses Ballot for voting on proposals as it integrates cleanly with Urbit ID and provides flexibility for setting different quora for votes and Custom Actions to automate outcomes. There is thus no need to distinguish between the tool used for a “real vote” such as deploying Stars in exchange for tokens and the tool used for a “fun vote” like choosing a date for a meetup.This flexibility and interoperability is a hallmark to the burgeoning supply of [applications](https://urbit.org/ecosystem?type=applications) being built for Urbit.

—

*Anthony Arroyo is the Director of [The Combine DAO](https://blog.the-combine.org/introduction-to-the-combine-dao)*
