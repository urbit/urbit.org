+++
title = "The Value of Urbit Address Space (1 of 3)"
date = 2020-04-07
description = "An expansion of our position on Urbit's address space value."
[extra]
author = "Erik Newton + Galen Wolfe-Pauly"
ship = "~patnes-rigtyn + ~ravmel-ropdyl"
image ="https://media.urbit.org/site/posts/essays/value-of-address-space-pt1.jpg"
+++

<br>

<img class="ba" src="https://media.urbit.org/site/posts/essays/value-of-address-space-pt1.jpg">

<br>

## Part One – What/why, a history, and some analogies

Does Urbit address space have value?

The short — but perhaps not very useful — answer to this question is that yes, the market appears to believe that it does have value. This series of posts digs a bit deeper into why.

As developers, we at Tlon tend to focus on building functionality rather than valuation models – possibly to our detriment. When we discuss Urbit address space, it’s typically about the technical elements, or the use cases.

Now that people are using Urbit on a daily basis, we want to make sure that Urbit IDs (collectively “Urbit address space”) are well-understood. We thought it would be useful to explain our thinking about value, and to provide some of the building blocks that others can use to create their own valuation models.

There’s a lot to discuss, so we’re breaking this discussion into three posts. The first explores what Urbit ID is, shares some history, and provides a few analogies that can help in understanding value on the network. The second looks at scarcity, utility, liquidity, and network effect. The third post explains lockups and availability.

For a refresher about what we’re doing, check out our [introductory materials](https://urbit.org/understanding-urbit/) or [Urbit for Normies](https://urbit.org/blog/urbit-for-normies/).

## Urbit ID basics

In order to explore why Urbit IDs have value, we’ll start by explaining the basics of how they function.

From one perspective, Urbit ID is simply a means of logging into Urbit OS. From another, Urbit IDs represent a new class of digital asset.

From the standpoint of an ordinary Urbit user, Urbit ID is designed to be simple: it’s a login system for a new OS, but with one or two unusual qualities. Under the hood, your Urbit ID is your network address, your username, and a digital asset wallet. Anyone can use your Urbit ID to locate you on the network, and then send you messages (i.e. packets), or digital assets.

We say that Urbit IDs represent a new form of digital asset for three reasons.

1. Urbit ID is designed such that the user actually _owns_ their name. This means that Urbit IDs are transferable and tradeable. Conventional username and password schemes are merely claims to a bit of data on another party’s server. An Urbit ID, on the other hand, is a piece of cryptographic property on a public key infrastructure.
2. Urbit IDs have utility: they’re currently useful in the Urbit ecosystem, but beyond that they’re vastly extensible and they can be used for many more purposes. Owning an Urbit ID is a bit like holding a self-authenticating property title. If Bitcoin is money and smart contracts are law, Urbit ID is land.
3. Urbit IDs are scarce in order to discourage spam and abuse.

We’ve often said that Urbit IDs have value because they’re useful and scarce. The fact that they’re being traded on platforms independent of Tlon seems to bear this out.

## Urbit network structure

The network of IDs is structured as a sponsorship tree consisting of 256 galaxies, ~65,000 stars, ~4B planets.

Galaxies are the root nodes on the network. They each have a vote on upgrades to the rules that govern the network, they provide packet-routing and peer-discovery services, and they spawn stars. Each galaxy has 256 (2<sup>8</sup>) stars to spawn.

Stars similarly provide packet-routing and peer-discovery services, and spawn planets. Each unbooted star contains ~65,000 planets (2<sup>16</sup>).

Planets are the individual IDs that most people use on the network. There are a total of ~4B (2<sup>32</sup>) planets all combined. Planets can also each spawn ~4B ‘moons,’ which are Urbit IDs intended to be used for IoT and other devices. Moons are permanently locked to their planets for security and to protect the network from sybil attacks.

Stars and planets can leave their sponsors (i.e. the star or galaxy currently providing peer discovery and packet routing) if they wish, and sponsors can choose to stop servicing any given star or planet. This is intended to prevent lock-in and to encourage good behavior from both parties. This mutual accountability is important in a network of finite identities that accrue reputation.

Essentially Urbit ID is 2<sup>32</sup> individual names that are bundled into blocks that are larger and larger in size. You might think of a planet like an individual house, a star like a town or a city, and a galaxy like a county or a state.

The Urbit ID registry and its rules are built on a set of smart contracts called [Azimuth](https://github.com/urbit/azimuth). These contracts are registered on the Ethereum blockchain. Galaxies can upgrade the mechanics of Azimuth by majority vote.

Today, Urbit ID is live and deployed. Each Urbit ID is represented by an ERC-721 non-fungible token. People buy and sell Urbit IDs every day and the number of transactions has been steadily increasing.

So, fundamentally, Urbit ID is just a finite set of names and a system for assigning them. We’ve left out a few technical details here, but if you’re curious you can read our [introductory](https://urbit.org/understanding-urbit/urbit-id/) materials or, to go deeper, read the [docs](https://urbit.org/docs/) or the [source](https://github.com/urbit/azimuth).

## Why we need a new address space

In our view, the short history of the Internet has been a lesson in centralization and consolidation. DNS is a cabal of root servers. IP is essentially controlled by a single entity. All of our naming schemes have been more or less centralized. Certificate-signing is a mess of competing authorities. Search is Google. Hosting is AWS. And don’t even get us started on social networks.

Centralization on its own isn’t bad, but it certainly has some negative implications, privacy being the most obvious. Beyond that, the naming schemes we have on the Internet today aren’t _personal;_ they’re not controlled by their users.

Simultaneously working against this trend are a variety of decentralized web projects, various digital currencies, and dozens of protocols that are all focused on individual use and distributed ownership. But how do any of those actually surface to the mainstream? How do people identify themselves in this new digital world? Where do they call home? Where’s the Schelling point when they want to connect and work together?

Urbit ID is the missing piece. It’s the minimally viable substrate for the digital world that’s been sketched out by Bitcoin, Ethereum, and all of their decentralized kin. From our perspective, the kit of decentralized technologies that exist today is designed for a world that’s only just coming into existence. That new world shouldn’t be owned by any one entity; it should be distributed. We believe that Urbit OS and Urbit ID are the right foundation for interacting in that world.

The ownership structure of a new territory has a huge impact on its future shape. While most of Urbit ID remains an uninhabited grid, we see it as most likely to become a varied array of neighborhoods and cities. Not because this is a nice outcome, but because it’s the most economically likely one. More on the concept of neighborhoods below.

## History and distribution

So how did these ~4B names get initialized and distributed? Urbit address space was created _ex nihilo_ — from nothing but an idea — and then distributed directly to project contributors who helped develop the system.

Now that the system is up and running, Urbit address space has steadily become more distributed. This arguably follows the distribution patterns of the Bitcoin UTXO set, and even historical distribution patterns of physical land.

Let’s take a look at how  this came to be.

Urbit was originally an experimental personal project. The original Urbit address space registry was just a text file in the source code at that time. At the very beginning, all of the address space was owned by Curtis — its creator — and it was all pretty much worthless. In the years leading up to 2013, Curtis gave away galaxies to anyone who would help or contribute to the project, and to several people who were simply in the right place at the right time.

Once Urbit became a working prototype, in mid 2013, a company (Tlon) got off the ground to help develop Urbit and a number of other developers joined. At this point, Tlon bought half the address space from Curtis for what now looks like an exceptionally good deal. Then Curtis and Tlon each earmarked a significant chunk of address space for infrastructure and community development — we refer to this as the urbit.org address space, and it’s held by Tlon.

From 2014-2018 Tlon and Curtis both gave away address space to individual contributors who were helping with the project. In 2016 and 2017, Tlon sold some of its address space in two crowdsales to fund the development of Urbit (which formatted the Urbit address space as a user-facing system).

It was then decided that a public key infrastructure was the most logical way to instantiate ownership of Urbit address space. Thus, after much [consideration](https://urbit.org/blog/urbit-and-the-blockchain/), Urbit ID was deployed to Ethereum in January 2019 under a set of contracts called Azimuth. At this point, there were about 2000 star holders and around 80 galaxy holders. We can’t be sure how many independent holders there are now — the address space is entirely out of our hands — but the distribution has been steadily increasing. Addresses trade regularly on urbit.live and Opensea, and are sold by a few other smaller outlets like planet.market and Urbit Marketplace, all of which are independent of Tlon.

## Analogues and the intrinsic value of address space

We’ve often said that Urbit address space, particularly stars and galaxies, have intrinsic value that should be understood beyond simply the price of the planets they contain. Another way of putting this is that, because stars and galaxies are infrastructure nodes, they’re uniquely positioned to generate cash flow from activities on the network beyond simply selling their planets.

Let’s dig a bit deeper into these activities through the lens of some analogues to the existing world.

### DNS

We’ve often compared Urbit ID to the IPv4 and IPv6 systems. In this scheme, galaxies are much like [/8 blocks](https://en.wikipedia.org/wiki/List_of_assigned_/8_IPv4_address_blocks) of IPv4 addresses, while planets are much like individual IP addresses. The difference is that IP addresses are rarely owned by end users, and they’re typically assigned dynamically, so they tend to change. This is why IP addresses can’t be used to accrue reputation for end users or to prevent spam. It’s worth noting that while most of us don’t own our IP addresses; they are currently [traded](https://auctions.ipv4.global/) on the open market. As of the time of this writing, individual addresses are selling for ~$20. /8 blocks are extremely valuable, and none are currently on the market.

### ISPs

Another analogy that we often use is that of ISPs (Internet service providers). Stars in the Urbit network are the closest approximation here in that they help planets connect to the network. Ultimately, connections on Urbit are peer-to-peer, but stars provide initial connections, distribute software updates, and route packets when peer-to-peer connections don’t yet exist. These services all represent a cost, and we believe they’ll eventually be metered and priced.

### CDNs

CDNs (content delivery networks) are another useful comparison. Stars are perfectly positioned to play this role in the Urbit ecosystem. Because stars are designed as packet-routing infrastructure, they’re able to easily spin up greater bandwidth to service high-demand content, or to aggregate content. Stars can also act as content curators and providers, or as content filters for those who want a more narrow range of access. On the other end of that spectrum, stars could easily function as something similar to VPNs (virtual private networks) for any type of content.

### Software distribution

An infrastructure innovation that’s relevant here is that Urbit OS is specifically designed to make over-the-air (OTA) updates to the system — meaning software and updates are distributed automatically with no effort on the part of the end user. By default, planets and stars get their system updates from their sponsors. As the system evolves, we expect stars and galaxies to not only provide core system (kernel) updates, but also to act as software distribution hubs. This service likewise represents a potential profit center.

### Payments and transactions

On top of routing and software distribution, there are likely other worthwhile services for stars and galaxies to provide. A payments-focused star could run Bitcoin, Lightning or Ethereum nodes exclusively for sponsored planets. A trading-focused star could run a 0x relayer and provide an order book for sponsored planets. It’s easy to imagine machine learning or compute services being offered as a service; for example, a star could bolt on a TensorFlow chip and allow its sponsored planets to run computer functions for a fee.

### Land

We often use land as an analogy to describe Urbit address space. This is not simply because Urbit address space is finite or because IDs act as addresses on the network. It’s because Urbit is designed to be extremely extensible. Once you take possession of your Urbit — whether it’s a galaxy, star, or planet — you have immense flexibility: you can use it as-is out of the box, you can rearrange your environment, or you can go as far as writing code to create new functionality. Urbit address space is meant to be used productively. Urbit is very much territory for homesteaders.

We expect that certain groups of Urbit IDs will be more valuable than other groups. There is no unit price for physical land — rather, price depends on location and a host of other factors. Similarly, we expect a range of prices to develop for Urbit IDs. We’ve already seen price variation around specific names and [sigil](https://urbit.org/blog/creating-sigils/) shapes.

In the long term, the real value of an infrastructure node (a star or galaxy) is not simply in trading on the unit price of planets, but in developing and improving the real estate.

### Dealer-operators

Another approach to developing the value of address space that is already emerging is that of the dealer-operator. The most convenient way for an ordinary person to use Urbit is to have a planet hosted in the cloud so they can log in from any device. Because the long-term value of a star or galaxy is in providing services, and because most planets and stars need to be hosted, providers of these services have begun to emerge.

These providers sell users a planet, host it for them, and deliver related services through their stars and galaxies. This means that with a couple of clicks an ordinary user could buy a planet, sign up for a hosting/routing bundle, get access to a set of services, and be immediately ready to interact with the community of their choice.

There are plenty of other examples that we haven’t even imagined yet. The important thing is that stars will likely distinguish themselves through the services they provide. Since planets and stars can always change sponsors, a large part of the long-term monetization of a star or galaxy lies in the quality of service.

This independent ecosystem has a secondary benefit of creating a varied tapestry of digital environments on Urbit, since every community and every dealer-operator can customize as they see fit. That variety will make the landscape much more interesting and ripe for exploration than anything we might create with the top-down approach found on centralized services. That variety will also likely cause a range of values for planets depending on their sponsor or “location”.

This ecosystem has already begun to emerge. Both Tlon and urbit.live are working on developing services along these lines, and we’ve heard from several other entrepreneurs considering similar offerings. This is emerging not simply because it serves a user need, but because it’s the directional flow of the system. In other words, it’s the simplest way to monetize address space while avoiding the oligarchic, surveillance-based, advertising-oriented systems we’re stuck with today.

To summarize, our view is that Urbit address space is valuable because it’s useful and it’s scarce (also, it’s tradable and has network effect, but more on those later). What’s more, while the use case has already begun to take shape, it will grow in directions we can’t yet imagine because the system is designed to be extensible — Urbit is a homestead, not a hotel.

We’re looking forward to seeing what the world builds with Urbit.

In the next post in this series, we’ll explore the issues of scarcity, utility, liquidity, and network effect.
