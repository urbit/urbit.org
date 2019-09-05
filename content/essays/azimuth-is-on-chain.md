+++
title = "Azimuth is On-Chain"
date = 2019-01-14
description = "The Urbit address space, now called Azimuth, is on the blockchain. And too many other things to fit into a single post."
aliases = ["/posts/essays/azimuth-is-on-chain"]
[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
+++

![](https://storage.googleapis.com/media.urbit.org/site/arvo-4.svg)

The Urbit address space is now live on the Ethereum blockchain. We’re calling the PKI ‘Azimuth’ and you can find it at [`0x223c067f8cf28ae173ee5cafea60ca44c335fecb`](https://etherscan.io/address/0x223c067f8cf28ae173ee5cafea60ca44c335fecb) or [`azimuth.eth`](https://etherscan.io/address/azimuth.eth). Owners of Azimuth ‘points’ (galaxies, stars or planets) can use [Bridge](https://github.com/urbit/bridge/releases) to manage them and view their balance now.

Sometime in the next few days, owners of Azimuth points will be able to boot Arvo, the Urbit OS, from their Azimuth point and request access to one of our 'cities': private communities for chat and discussion. These new cities use Landscape, a brand new UI for using Urbit in the browser.

This means you can boot a deterministic OS from an identity you own, join a totally independent, decentralized and self-governing network and run a clean, simple UI. Pretty exciting. Is it ready for ordinary users? Definitely not.

Since 2013, you've been able to boot an Urbit and join our test network. And, since 2013, we've always had our sights set on building a personal server that can both last 100 years and be delightful to use. Urbit isn't meant just to be as good as the MEGACORP software we use today. It's meant to be much, much better.

But Urbit is not a 'product' in the conventional sense. Urbit is a public thing. It's meant to belong to everyone. For the past six years, much of our work was research and design work. Which means lots of weird ideas thrown away, and others rewritten or redesigned many times over. Our work has always been open source, but we tend to be pretty quiet about it.

With Azimuth on the blockchain, it's time for us to start engaging with the world more directly.

We aren't calling this a launch. There's no keynote. There's no dancing on stage. I mean, it's 2019. You must be pretty sick of being marketed to. We'll try to stick to the specifics here. What's new, what we've been up to and what works. There's too much to fit into a single post, so we'll keep it pretty light for now. Each of these sections will probably get its own post in the near future.

> Note: As of `~2019.1.14` we're in the process of rebooting the Arvo network. We expect it to be back online before the end of the week. We'll update this post and [tweet](https://twitter.com/urbit) when the network is online and stable.

## Rethinking the stack

We've started to talk about Urbit as a stack of three parts: Azimuth, the address space and identity layer on Ethereum; Arvo, the OS and overlay network; and Aegean, a pattern for building decentralized communities on the Arvo network.

We tried to capture this separation in [the primer](/primer), a new overview of Urbit. Explaining Urbit has always been challenging. A monolithic project that is OS, network, language, VM and UI barely makes sense. Separating the layers helps, we think.

Let's step through them to see what's new.

## Azimuth

![](https://storage.googleapis.com/media.urbit.org/site/bridge-0.png)

As a quick refresher: Urbit addresses, now called Azimuth 'points', are short names like `~diblun-tidduc`. You own your Azimuth point with a private key and can use it as a routable network address on the Arvo network. You can read more about Azimuth in [the primer](/primer#what-azimuth-is). If you're curious who owns all this address space, you can find that [in there too](/primer#azimuth-distribution).

In late 2017 we decided to migrate the yet-to-be-named Azimuth to a system of Ethereum contracts. After a year of coding, testing, auditing and migrating — they're now fully deployed to the Ethereum mainnet.

Azimuth is basically two parts, a database of who owns which points, and a set of rules about what points and their owners can do. That set of rules is called Ecliptic, and can be found at [`0x6ac07b7c4601b5ce11de8dfe6335b871c7c4dd4d`](https://etherscan.io/address/0x6ac07b7c4601b5ce11de8dfe6335b871c7c4dd4d) or [`ecliptic.eth`](https://etherscan.io/address/ecliptic.eth). The top-level Azimuth points, the galaxies, can vote on upgrades to the Ecliptic contract, but they can't edit the database of who owns what.

The ownership database contract is called Azimuth, which you can find at [`0x223c067f8cf28ae173ee5cafea60ca44c335fecb`](https://etherscan.io/address/0x223c067f8cf28ae173ee5cafea60ca44c335fecb) or [`azimuth.eth`](https://etherscan.io/address/azimuth.eth). For those of you who own address space, you can use the `getOwnedPoints` function in the 'Read Contract' tab to check your balance. The function returns the number (not the phonemic string like `~ravmel-ropdyl`) of your points. Each Azimuth point is an ERC-721, non-fungible piece of digital property.

To manage your points, we built [Bridge](https://github.com/urbit/bridge/releases), a completely custom interface for interacting with our Solidity contracts. Interface quality is really important to us, and we couldn't find anything in the 'crypto' world that met our standards. Bridge is good, but crypto UX is a hard problem. We've already got some ideas for improvements.

If you're curious, you can find the source for the contracts in the [`urbit/azimuth`](https://github.com/urbit/azimuth) repo. The Bridge source is in the [`urbit/bridge`](https://github.com/urbit/bridge) repo.

We had the source for our contracts audited by Open Zeppelin, Blockchain at Berkeley and Bloctrax. Did we miss something? We sure hope not — but we'd happily compensate anyone who can find bugs. Please reach out to security@urbit.org if you find something of concern. We'd be happy to hear from you.

![](https://storage.googleapis.com/media.urbit.org/site/sigils.svg)

Azimuth names have always had a pronunciation system. `~ronryd-nidseg` is 13,695,781, for example. Now, they also have a visual system. We call these strange crests from another planet 'sigils', and you'll notice them used throughout all our new interfaces. You can find the source in the [`urbit/sigil-js`](https://github.com/urbit/sigil-js) repository. Building these was a lot of fun — we'll save the details for a future post.

So, how do you get an Azimuth point? We've left that question unanswered intentionally. Azimuth points are meant to be like digital land, not currency. They should change hands slowly. In order to get an Azimuth point, you'll need to find someone who already has one and is willing to part with it.

## Arvo

![](https://storage.googleapis.com/media.urbit.org/site/fast-lux-3.gif)

Arvo boots from Ethereum, is no longer embarrassingly slow, and has a brand new build system. [Our documentation](https://urbit.org/docs/learn/arvo/hoon) has also improved quite a lot. Hoon, Arvo's programming language, has had a lot of work done to its type system and compiler. We built new tooling for generating static sites (you're probably reading this on one right now) that are much, much faster and easier to use.

It's tough to talk about the progress we've made on Arvo without writing a long technical post. We'll save that for later. In a way, what's remarkable about Arvo is that it has become *less* remarkable. It's more stable, faster, and the code quality has improved.

There's plenty of work to do, though. Should you be building on top of Arvo? Probably not yet. The kernel and kernel modules are really where the work still lies. We build things on top of Arvo, and in doing so it's pretty clear that the system can be better. Clay (the filesystem) and Gall (the application model) are due for a rewrite. A complete rewrite of the web server, Eyre is almost finished.

## Aegean

![](https://storage.googleapis.com/media.urbit.org/site/landscape-inbox.png)

Aegean is a pattern for building 'cities': groups of people running the same 'agent' on their Arvo servers. Agents aren't just 'apps' or programs. An agent rolls together the tools that a community needs. Today, our companies, communities, cults, cliques all have to duct tape together separate MEGACORP apps and services to compute together.

Aegean reverses this pattern. A community on Arvo is a city: just a bunch of people running the same agent. Each city is in control of its own codebase: the interface, application code _and_ data storage. This means a community can have complete agency over how to compute together.

Aegean cities can be completely different without impacting one another at all. Cities share the neutral infrastructure of Arvo and Azimuth — but they may never even know others exist. An archipelago of hypercultures.

It's important to note: the pattern of these cities is _not_ the pattern of Azimuth. The network hierarchy should impact the society of Urbit as much as the electrical grid impacts the life of the street in Manhattan. It matters when the power goes out — but most of the time groups form and dissipate continuously.

Before we can let the ocean of cities grow we have to homestead a few of our own.

Our first agent is called [Landscape](https://github.com/urbit/landscape), an agent for chat and longform discussion. We are using Landscape to run a few experimental cities over the next month or so. If you have an Azimuth point, you'll need to [request access](mailto:support@urbit.org) to join.

Anyone can create their own city, of course. The source is open. But we're not going to encourage you to just yet. Feel free to explore, but also be patient. We've got a lot planned around this. If Azimuth is done and Arvo is young, Aegean is just being born.

## Tlon

![](https://storage.googleapis.com/media.urbit.org/site/office-1.jpg)

So who is behind all of this? A team of collaborators and contributors. Many of us work at [Tlon](https://tlon.io) — the company we started in 2013 to advance Urbit platform development. Tlon has attracted an incredible group of smart, talented people who want the world to be able to own and control their computers. I'm proud to work alongside them.

One important omission on `tlon.io` is Curtis. As of today, he's no longer working on Urbit. [His own words](/posts/essays/a-founders-farewell) are the best way to understand his thinking. It's an achievement for the team, I think, that he can depart with confidence.

One major reason for that confidence is that Erik and Anthony have now become COO and CPO respectively. Having thoughtful, organized people leading the project is a huge benefit to the whole team. I'm very glad to have them on board.

## Looking ahead

I certainly forgot at least a thing or two. We'll dive in to more detail in the coming weeks.

There's a lot for you to explore. Have fun!
