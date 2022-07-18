+++
title = "The Value of Urbit Address Space (2 of 3)"
date = "2020-04-12"
description = "Scarcity, utility, liquidity, and network effect."

[extra]
author = "Erik Newton + Galen Wolfe-Pauly"
ship = "~patnes-rigtyn + ~ravmel-ropdyl"
image = "https://media.urbit.org/site/posts/essays/value-of-address-space-pt2.jpg"
+++

![](https://media.urbit.org/site/posts/essays/value-of-address-space-pt2.jpg)

_This is the second in a series of three posts on Urbit address space. See also [part 1](https://urbit.org/blog/value-of-address-space-pt1/) and [part 3](https://urbit.org/blog/value-of-address-space-pt3/)._

## Measuring value

Value and price are distinct concepts that often get conflated. In our view, Urbit address space has value for four fundamental reasons: it’s scarce; it has utility; it has some limited liquidity; and it has network effect. Price, on the other hand, is always a function of supply and demand, and it's not something we – as builders – concern ourselves with very much. Let’s take a look at these fundamentals within the Urbit ecosystem.

## Scarcity

256 galaxies, ~65,000 stars, ~4B planets.

![](https://media.urbit.org/site/posts/essays/value-of-address-space-pt2a.svg)

A foundational design principle of the Urbit network is that the address space is limited. This rarity helps qualify Urbit as a [collectible](https://nakamotoinstitute.org/shelling-out/), and thus creates a non-zero acquisition cost for an address. This cost discourages abuses like spam and bot-net attacks. Traditionally, these attacks are made with quasi-unlimited access to IP addresses. The unit economics of acquiring planets for these nefarious purposes is a strong deterrent.

There are 256 galaxies on the network. Each galaxy is initialized with ownership of 255 stars. Galaxies act as root nodes for peer discovery and packet routing within the Urbit network, and they are each also entitled to vote on updates to the smart contracts which govern the network. To date, galaxies trade primarily on OTC (over the counter) desks, and rarely appear on the open market.

There are 65,280 total stars on the network. In turn, each star is initialized with ownership of 65,535 planets. Stars currently trade on platforms independent of Tlon, such as [urbit.live](https://urbit.live/) and [opensea.io](https://opensea.io/). The current price range can easily be ascertained on those sites, but as of the time of this writing, stars are selling at a price that greatly discounts their planet holdings.

One would expect that in an efficient market the relative pricing of stars on one hand, and planets on the other hand would eventually align (so to speak). This may come to pass as the Urbit community increases education about Urbit, and as additional planet sellers and hosting providers enter the space.

Finally, there are 4,294,901,760 (or ~2^32^) planets on the network. Planets currently trade largely in a range of $10 to $15. We expect planet prices to fluctuate from provider to provider as described in the previous post, based on the quality of services various providers offer. That said, it's worth noting that the cost to configure addresses for distribution is fairly static and this may act as something of a lower bound.

That said, we also anticipate that planet prices will be abstracted away from most purchasers, and will be included in bundled annual packages of hosting and data routing services. For this reason, infrastructure service providers (i.e. hosting providers) will likely be the best positioned parties to capture value from planet distribution.

While an increase in the supply of Urbit address space is a technical possibility, it would run counter to the economic incentives of Urbit address space owners. This is why we view a galaxy vote to dilute address space as improbable.

Scarcity may be sufficient alone to drive value, but it’s much more impactful when the unit has some underlying purpose, which brings us to utility.

## Utility

Utility (i.e. what Urbit addresses can be used for) has largely been addressed in the previous installation of this series. Briefly, our view is that stars and galaxies are useful for more than simply selling their subsidiary address space. Their use value encompasses their unique functionality on the network and the business models that functionality represents.

As a refresher, this use value falls in five broad categories.

1. Authentication technology is broadly useful. All Urbit identities — planets, stars, and galaxies — can be used for authenticating one’s Urbit computer, and for authentication in general. Urbit ID was designed for Urbit-specific authentication, but a lot of general functionality can be built on top of this infrastructure. Urbit ID is simple, extensible, and easy to use, making PGP style claims much more useful than they are today.
2. Network infrastructure services represent a potential revenue stream. Stars and galaxies specifically should be understood as providing their owners the opportunity to develop and use network infrastructure. We anticipate that stars and galaxies will eventually charge for infrastructure related services, like hosting and packet routing, and will distinguish themselves on quality and service.
3. Stars and galaxies are well positioned to offer additional services. Because of their role as high level network nodes, stars and galaxies are uniquely positioned to offer additional services, including content delivery networks (CDNs), Bitcoin and other blockchain-related nodes, 0x relays, and Tor exit nodes.
4. Schelling points have value. Because stars and galaxies hold a certain authority on the network (by dint of their relationship to their subsidiary nodes), they act as [Schelling points](https://nav.al/schelling-point), or default hubs, for various activities that will arise as the network grows. Already various groups and communities are beginning to collect around stars. This gravity has value and will eventually be priced.
5. Voting has value. Galaxies exclusively hold a vote on the network. This voting right can be separated from the galaxy itself and transferred, and we anticipate that this will happen eventually. The value of this right has not and may never be priced into the market, though as Urbit adoption grows, the value of a vote may emerge.

Utility is only one component of a value calculation. To further develop the inquiry into value, let’s move on to trading factors.

## Trading, volume, and liquidity

Urbit IDs are individually represented by non-fungible ERC-721 tokens, and can therefore be sold by any platform that supports this token standard. Currently there are three known Urbit-exclusive sales platforms and one generalized ERC-721 platform that list Urbit IDs. Prices for stars and planets are readily available. Volume is low, as no effort has been made to promote the fact of availability, yet the number of [total transactions](https://azimuth.network/stats/events.txt) has increased steadily since the network was launched to Ethereum in 2019, even absent public messaging.

![](https://media.urbit.org/site/posts/essays/value-of-address-space-pt2-tps.svg)

![](https://media.urbit.org/site/posts/essays/value-of-address-space-pt2-tss.svg)

Buying non-fungible tokens like Urbit IDs is rather different than trading quasi-fungible tokens like Bitcoin (even setting aside the issue of volume). Each Urbit ID is unique, and so they tend to be purchased by end users for their specific characteristics, rather than generically. As an example, the planet `~parret-barret` sold for about $1,000 at a time when most planets were selling for $10-20, perhaps due to its rhyming name. Planets with circular sigils also often sell for significantly more than other planets — we’re not entirely sure why this is the case.

## Planet Sales

![](https://media.urbit.org/site/posts/essays/value-of-address-space-pt2e-price-eth.svg)

![](https://media.urbit.org/site/posts/essays/value-of-address-space-pt2e-price-btc.svg)

## Star Sales

![](https://media.urbit.org/site/posts/essays/value-of-address-space-pt2e-price-btc-usd.svg)

This ID-specific trading pattern is generally appropriate in our view: Urbit ID isn’t designed to be rapidly traded at high volume. Urbit is more like a house than a fungible good like a currency.

For the time being buying and selling of Urbit IDs happens through auctions on specific platforms, and via person-to-person transactions, because each transaction is for a _specific_ Urbit ID. Again, Urbit ID is designed in the spirit of property titles, rather than currencies, so this makes sense.

Strictly speaking, liquidity is a measure of the degree to which a given asset will change in value due to a given transaction. In that sense, Urbit address space is likely fairly illiquid. But liquidity can’t be properly understood without volume. As noted above, the volume of transactions on the network has been steadily increasing since inception, and yet the price has remained fairly constant. This seems to indicate a healthy ratio.

![](https://media.urbit.org/site/posts/essays/value-of-address-space-pt2b.svg)

A further impact on liquidity and volume is that of available supply. At present, the majority of Urbit address space is locked by smart contracts. These lockups began to release at varying linear rates in January 2019. All address space will be completely unlocked and tradeable by January 2025. Eventually as both understanding and demand increase, we anticipate that planets will find an equilibrium price, and stars will be repriced accordingly.

We’ll discuss lockups and spawning limits in more detail in the third installment of this series.

In our view, this combination of scarcity, utility, and the above trading factors is a useful description of existing market dynamics for Urbit address space. A further description of why Urbit has value lies not just in its trading characteristics, but in the utility of human interaction. This brings us to network effect.

## Network effect

Much is made of the concept of network effect and its impact on network valuations generally. The concept is fairly straightforward so long as numbers aren’t applied. Broadly speaking, networks are interconnected systems of people or things. Network effects are mechanisms wherein every new user of a given system makes the system more valuable to every other user.

Urbit is a network of networks, and it’s designed specifically for communities — for communication and collaboration. The more people who use Urbit, the more communities get started by design. The more communities there are, the more likely outsiders get pulled in to join them, and so the virtuous network effect cycle continues.

Digging deeper, Urbit is unusual as a network for the following interrelated reasons:

1. Urbit is a platform in the true sense; wherein
2. connections are peer-to-peer;
3. privacy is high;
4. discoverability is low;
5. customization and autonomy are nearly limitless; and yet
6. the number of possible groups and node connections is essentially unbounded.

The upshot is that Urbit can serve as the meta-network for many different kinds of individual networks, each with their own value. Urbit is much more akin to the internet itself than it is to, say, Facebook. Reed’s and Metcalf’s laws therefore apply to Urbit in some very interesting ways.

## Network laws

Before diving into a discussion of network effect, it's worth noting that although individual tokens and users of those tokens benefit in various ways from a thriving network, the structure of the Urbit network does not grant token holders any rights to profits or losses "generated by the network" as a whole. In fact the very notion is counter to the intent of Urbit's ethos of decentralization. Individuals on the network may profit by their own activities, but there is no central authority profiting off activity in the aggregate; there is no ownership of the network as a whole, and so there are no centralized profits and losses to share. Address space tokens represent one's ownership of their own parcel of land as it were.

That said, an entire continent may have aggregate value even though it is distributed. To explore this notion with regards to Urbit, it's worth reviewing the three laws typically cited to express the value of a network as a whole:

- Sarnoff’s law states that the value of a network increases proportionally to its size. This is widely understood to understate the value of most modern networks.
- Metcalf’s law states that the value of a network is the square of the number of users (n^2).
- Reed’s law states that the value of a network increases with the number of groups that can be built on the network. This is expressed as 2^n, where n is the number of groups.

Reed’s law captures the notion that groups vastly increase the density of connections on a network and so scale value more quickly.

Urbit is a network of networks, and so is best described by Reed’s law.

Urbit’s unique approach to groups also helps resolve two other problems which lead to value loss in many networks: Urbit’s design significantly reduces both network pollution (i.e. irrelevant feeds) and network congestion (clogged bandwidth), as individual clusters can easily separate their activity from other networks on the platform.

## Urbit is a platform network

It’s important to note that Urbit has utility absent the network, as Urbit OS is in fact a Turing-complete virtual computer. Though the system is designed around communities, individuals can use Urbit to create personal documents, archive data, and write code for the system. This is how Urbit’s total network size can be relatively small and still provide value for individual users and clusters. However, Urbit already has users, and for many of these, critical mass — the point at which the network is more valuable than its cost — has already been reached. In addition, as each of these individual clusters writes code for the platform, positive indirect network effects increase (more utility arises from these individual development efforts).

This combination of effects makes Urbit significantly more robust than non-platform networks which can’t rely on this intrinsic utility.

That said, we do not intend to ever rely simply on this individuated computing utility alone. Urbit is for communities, and Tlon’s primary focus is to increase adoption of the system as a whole, including the network. To this end we’re working steadily to increase functionality of the system, improve messaging, and actively onboard communities.

## Network identity

Another distinguishing characteristic of Urbit is that identities are pseudonymous but can easily be de-pseudonymized by users at will (though not by outside authorities). This flexibility combined with identity reputation accrual means people can behave in different ways depending on the social context. People can communicate privately, publicly, or in small groups, and they can do it anonymously or otherwise. This natural and extensible approach to social engagement results in personal comfort and drives adoption.

## Extensibility

Because Urbit is vastly customizable, and because it’s a network platform for other networks, it can and should grow in ways we can’t predict. Each new use case that develops creates a new market, new communities, and new hubs. Each of these contributes to the diversity of the overall ecosystem, making it vastly more interesting and diverse than anything we might create alone. We expect this extensibility to contribute greatly to retention as users are able to build the world they want to inhabit.

Urbit is a deeply extensible platform for communities: it’s a network of networks. Users join to be part of communities, then launch communities of their own, further driving growth and engagement in a virtuous cycle.

In the next installment of this series, we’ll describe lockups and availability in more detail and will share the data we’ve managed to compile about address space distribution.
