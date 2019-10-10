+++
title = "Urbit ID"
description = "An overview of the Urbit ID system"
weight = 4
+++

![](https://media.urbit.org/site/understanding-urbit/urbit-id/megacorp.svg)

Every time you post a comment, like something, send a message or use any app or service, you need an account. (And, behind the scenes, a network address.) Neither of these things belongs to you. The way things are going, they never will. No matter what you’re up to with your phone or laptop, you’re dependent on MEGACORP.

We don’t like being owned by someone else. We think your identity and wallet should feel like a unique and precious object that you can always carry with you. So we built Urbit ID.

![](https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-3.svg)

Urbit ID is meant to feel like a civilizational key. If your Urbit ID were a piece of hardware, you could tap it to unlock a door, swipe it to buy a coffee, and plug it into any computer to log in. It’s a unique, beautiful, object that’s both an address and a wallet. It’s a key to a secret club and the ticket to your digital life.

Your Urbit ID isn’t a physical object (yet). Instead, it’s even simpler. Your Urbit ID is a name and passkey that’s easy to memorize.

If you wake up in the desert, unsure how you got there, you’ll be fine so long as you remember your Urbit ID and passkey. With it, you still own your digital identity and your digital assets. If you remember your friend’s Urbit ID you can always connect with them and send them money or messages.

Urbit ID is a simple, decentralized system for people to own their digital addresses and crypto wallets. Urbit ID is a system owned by its users, designed to last far into the future, that’s live and usable today.

Urbit ID is a completely separate system from Urbit OS. It’s finished and deployed to Ethereum already. We designed Urbit ID to log in to Urbit OS, but it can be used for anything.

For those curious to understand Urbit ID a bit better, we’ll cover the basics of how Urbit ID works here; how addresses are distributed and who owns what.

![](https://media.urbit.org/site/understanding-urbit/urbit-id/card.svg)

Your Urbit ID is a short, memorable address that anyone can use to connect with you that *doesn’t* depend on any company. It’s an address you own completely and can keep forever.

For most people, an Urbit ID looks something like `~tinbel-picpel`. You own it with a simple, memorable key twice its length, like `~winter-paches-palfun-foslup`. Urbit IDs are designed not to have any personally identifying information attached to them at all, sort of like a phone number. Each name and password is automatically generated — so we don’t accidentally leak data when we meet a stranger in the digital world.

Your Urbit ID and passkey are all you need to log into Urbit OS and send and receive crypto payments. Together, they’re a simple keypair that an ordinary person can easily memorize. We think it’s the perfect form factor for ordinary people to take control of their digital lives.

![](https://media.urbit.org/site/understanding-urbit/urbit-id/urbit-id-4.svg)

We want everyone to own their own identity and wallet. One way to do this would be to build a MEGACORP or a State Department of Urbit. But we prefer decentralized, collectively owned systems. So that’s what we built. Let’s look briefly at how that system works.

At a high level, there are three important things to understand about the overall Urbit ID system design.

First, there are only so many Urbit IDs, so they cost something. Since they cost something, people are less likely to use them to spam or abuse the network. And, when you meet a stranger with an Urbit ID you know they have some skin in the game.

<table class="w-100 w-80-xl m0a f5 pt4 mono">
<tr><td>2<sup>8</sup> </td><td> <code>256</code> <span class="fr">galaxies</span></td></tr>
<tr><td>2<sup>16</sup></td><td> <code>65,536</code> <span class="fr">stars</span></td></tr>
<tr><td>2<sup>32</sup></td><td> <code>4,294,967,296</code> <span class="fr">planets</span></td></tr>
<tr><td>2<sup>64</sup></td><td> <code>rly big number</code> <span class="fr">moons</span></td></tr>
</table>

<table class="w-100 w-80-xl m0a pt4 pb4 f5 mono">
<tr><td>1 galaxy</td><td><span class="fl"> =</span> <span class="fr"><code>2<sup>8</sup> (256)</code> stars</span></td></tr>
<tr><td>1 star</td><td><span class="fl"> =</span><span class="fr"><code>2<sup>16</sup> (65K)</code> planets</span></td></tr>
<tr><td>1 planet</td><td><span class="fl"> =</span><span class="fr"><code>2<sup>32</sup> (4B)</code> moons</span></td></tr>
</table>

Second, Urbit IDs are distributed by a sponsorship tree. Each sponsor issues a fixed number of addresses. Since there are lots of sponsors, there are lots of ways to get an Urbit ID — not just one central authority.

Urbit IDs need a sponsor even after they’re issued, but you can always change sponsors and sponsors can always reject children. This means bad actors can be banned, and abusive sponsors can be ignored. We think this strikes a nice balance between accountability and freedom.

Finally, galaxies form a senate that can upgrade the logic of the Urbit ID system by majority vote. We think Urbit ID should last for quite a long time, but if it ever needs to be changed, the galaxies can facilitate upgrades. Code may be law, but ultimately we acknowledge that human judgement can’t be factored out.

(For a bit more on how all this works, see the [FAQ](@/faq.md).)

Urbit ID isn’t just a design. It’s [live and deployed](https://azimuth.network) to the Ethereum blockchain.

![](http://media.urbit.org/site/understanding-urbit/urbit-id/distribution.svg)

Urbit IDs are digital property. The entire address space of Urbit IDs is like a vast territory of digital land. Over time, we’ve used this land to fund the development of Urbit as a whole by selling some of it to people we felt would be great stewards of this new frontier.

When we launched the Urbit ID system, in January of 2019, there were a few thousand different star and galaxy holders. Since then, that number is on the rise.

The scarcity tree of Urbit ID address space drives decentralization even while the project is young, which is great. If Urbit ID is going to last a long time and succeed as neutral infrastructure, it has to be owned and controlled by a wide variety of people.
