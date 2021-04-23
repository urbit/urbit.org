+++
title = "Lunar Urbit and the Internet of Things"
date = 2021-04-23
description = "Potential future usecases of moons for industry and consumers"
[extra]
author = "Jonathan Paprocki"
ship = "~datnut-pollen"
image = "https://media.urbit.org/site/posts/essays/phobos.jpeg"
+++

<br>

![phobos](https://media.urbit.org/site/posts/essays/phobos.jpeg)

<br>

Each of the ~4B 32-or-fewer-bit or [Azimuth](@/docs/glossary/azimuth.md)
identities, namely [planets](@/docs/glossary/planet.md),
[stars](@/docs/glossary/star.md), and [galaxies](@/docs/glossary/galaxy.md),
may spawn ~4B 64-bit child identities known as [moons](@/docs/glossary/moon.md).
Moons are the totally undeveloped wild outback of Urbit, with a story waiting to
be told that promises to be just as enormous in scale as the cloud personal
computing story told by planets, and possibly even more so. In this post, we
review the prehistory of moons on Earth, give a snapshot of how moons are being
utilized on Mars in 2021, cover existing issues with consumer IoT and how Urbit
resolve them, and then go on to speculate what the lunar locus of the Urbit ID
address space may develop into in the future. To keep the futurist scope
limited, we primarily speculate on the usage of moons in (industrial) internet
of things settings, especially with respect to agriculture, and how they may
manifest as the workhorse collection unit of decentralized data markets.

For those unfamiliar, moons differ from all other
[ships](@/docs/glossary/ship.md) in that they are not independent identities
with total sovereignty over their data and keys. Instead, their cryptographic
keys are issued and controlled by their parent identity. The relationship
between the keys of a parent ship and its moons are analogous to the
relationship between primary keys and subkeys in a system like
[PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy). The parent may revoke
or change its child moons' keys at any time. A typical relationship between a
planet and a moon may be one of a human and their smartphone. If you lose your
phone, you don't want someone able to start pretending they are you, operating
one of your moons, on the network. The planet is able to revoke the keys, and
the moon stored on the phone becomes inert, no longer able to communicate with
the network. While planets and stars also depend on their sponsor to assist with
peer discovery and software updates, this relationship is more mutualistic,
since either party may choose to discontinue this relationship and establish a
new one elsewhere. Moons possess no such freedom.

### Lunar prehistory

![luna](https://media.urbit.org/site/posts/essays/luna.jpg)

It may come as a surprise to you that you are already very familiar with moon
identities - they've just never been explained to you in such terms because
their existence on Earth is obscured. Moons, in fact, are not a new concept at
all. Virtually your entire experience of the internet on Earth in the modern era
is the experience of someone who possesses a large quantity of moons subordinate
to planets who mostly refuse to talk to one another. The feeling you get of
constantly moving between silos, juggling accounts, not controlling your own
data, etc. is a direct result of the fact that, on Earth, you only possess
moons. No planets.

We're speaking, of course, of the client-server relationship. In Martian
terminology, the Facebooks, Twitters, and Googles of the world are planets, and
accounts held with these services may be thought of as moons subordinate to
those planets. Your account with these megacorps is only yours for as long as
they please. If you happen to step on a digital landmine - such as a virus that
causes Google's servers to believe you are a bot - you are suddenly banned from
their service, often with no recourse. All your data, your connections, your
network - vanished. We are all Mark Zuckerberg's moons, and his moons are armed
to the teeth with surveillance equipment.

The story of internet on Earth is that of the haves - those with servers,
holding all of the power, and the have-nots - those who only have access to
clients, who may only perform predetermined actions prescribed by those with the
servers. Running a server is theoretically accessible to anyone, but practically
locked behind the fact that server maintenance is a professional occupation
rather than something simple like riding a bike. Urbit aspirationally levels the
playing field by elevating everyone to the rank of planet by making server
maintenance comparable to bicycle maintenance. Not completely unskilled, but
within the capabilities of almost everyone willing to learn without an enormous
time investment, and never something needed on a regular basis. We aren't quite
there yet, but we've made leaps and bounds over the past couple of years.

Of course, this analogy isn't perfect - Urbit moons are servers themselves, but
as they may only act in accordance with the wishes of its parent, they are
effectively as locked in degrees of freedom as a client is to a server. Any
deviation risks the moon's keys being revoked. To distinguish these prehistoric
moons from Urbit moons, we will refer to them later as "primitive moons".

Urbit contends that moons are not the appropriate digital exocortex for a
responsible adult. They are for devices, experiments, or your children. We hope
that the dark prehistory of moons as the primary weapon of the
surveillance-industrial complex will meet its end in the near future.

### Moons in the early Martian era

![sputnik](https://media.urbit.org/site/posts/essays/sputnik.jpg)

In 2021, moons are mostly unused on Urbit. There's a smattering of minor use
cases which we'll describe here, but they represent only a tiny fraction of
their ultimate potential.

Tlon recently launched a survey bot called [Eliza](@/blog/eliza.md), which was
initially a comet. We frequently got questions on whether Eliza was actually
Tlon's bot, because it could just as easily be a malicious actor posing as Tlon.
We soon plan to relaunch Eliza as a moon of `~zod`. This is to establish that
the bot is indeed official - only someone with access to `~zod` is capable of
creating a moon of `~zod`, and so a moon of `~zod` automatically carries with it
a cryptographic guarantee that you are communicating with an official digital
representative of Tlon. On Earth, something like this would need to be
accomplished with certificate chains, but on Mars this sort of authentication is
baked into the very fabric of the network, rather than as an additional layer on
top. This is a very good representative case of how moons naturally inherit the
reputation of their parent, even in the absence of any formal reputation systems
on Urbit.

We see folks using moons as backup identities, in case they cannot or don't want
to access their primary planet for one reason or another. Again, since anyone
may verify the parent of a moon, the moon inherits the reputation of its parent.
These backups could be vanity identities - for instance, every `~sampel-palnet`
has underneath it a moon named `~master-sampel-palnet`[^0].

Some use moons to host group(s). Hosting a group inevitably means that that ship
will process more network traffic, and a heavily trafficked group may impact a
ship's performance. Thus one may wish to offload group hosting duties to a moon
to maintain a more performant planet.

As we currently lack a real system for 3rd party software distribution (though
see this recent [developer call](https://youtu.be/XwICC6Its1E) on a solution in
progress), one stopgap solution has been downloading software by syncing a
foreign [desk](@/docs/glossary/desk.md) to your ship. This is risky, as buggy
software may make break your ship and make it difficult to get running properly
again. Thus testing new software on the livenet is frequently performed on
moons, so as not to risk the parent ship if something were to go wrong.

### Internet of Things

![telstar](https://media.urbit.org/site/posts/essays/telstar.jpg)

Now we start to look torwards the future by examining the problems faced by IoT
in the present, and speculating on how Urbit might solve them.

The Internet of Things is much maligned by technologists as a privacy, security,
and maintenance nightmare. These products usually depend on phoning home to
perform their service, which is inevitably a funnel by which personal data is
harvested, an attack surface for hackers to gain access to your home network,
and a single point of failure which may render the device useless, all in one!
One need look no further than the recent [Ubiquiti
breach](https://krebsonsecurity.com/2021/03/whistleblower-ubiquiti-breach-catastrophic/)
to see all of these failure modes happening on a massive scale, and this is par
for course. This sort of dynamic is completely antithetical to the Urbit
philosophy, and so any involvement of Urbit with IoT will soundly reject all of
these weaknesses as nonstarters.

However, it's important to understand why the current IoT model works like this
at all. we posit that it ultimately stems from the fact that today's IoT
products are primitive moons for which you do not operate the parent planet. On
Earth, almost every IoT device is necessarily married with the Software as a
Service (SaaS) paradigm because most people don't have personal servers that
could do all the grunt work actually necessary for an IoT device to operate.
This is not the _only_ reason for this - it's also just more profitable to
collect consumer data. However, it's the SaaS aspects which make the whole thing
such a catastrophic mess. If the server that your device phones home to is your
own, there is no loss of control over personal data. If the network on which the
device operates is local, hackers cannot access it from the web. If your
internet connection is lost, the devices still work since they do not require an
internet connection to function. And if the manufacturer goes out of business,
the loss of support is equivalent to the same event happening to every other
product, rather than the product ceasing to work entirely.

The wants and needs of the individual are at odds with the wants and needs of
the megacorp, and that mismatch manifests as the antifeatures that plague IoT.
By eliminating the SaaS aspect, Urbit solves the largest outstanding issues with
IoT in a single blow. Digital personal AI assistants have long been an
anticipated science fiction prediction, and their full realization is on the
horizon. But in their current manifestation, many privacy- and
security-conscious people would never consider using them at all, since they are
inevitably presented as SaaS that requires intimate knowledge of your devices
and their stored data. Recommendation engines such as the one used by YouTube
are offer helpful guidance towards content you'll find appealing, but they're
also designed to keep you hooked to the service as long as possible. These kinds
of programs can be tremendously helpful, but they're dystopian when they come
saddled with anti-consumer subroutines. Since your Urbit belongs to you, it can
never act against your own interests without your consent. In our lunar vision,
we imagine that your digital personal AI assistant will live on one of your
moons rather than on megacorp's cloud.

For web-exposed devices, Urbit offers the same security guarantees that it does
for your personal computer: everything is end-to-end encrypted by default. Urbit
still has a while to go before we can truly declare it secure, but once it is
there, you'll be assured the same level of protection for your devices that your
Urbit has.

[Vint Cerf](https://en.wikipedia.org/wiki/Vint_Cerf) has unwittingly taken the
effort to outline the case for a system like Urbit ID for IoT use
[here](https://cacm.acm.org/magazines/2018/12/232883-self-authenticating-identifiers/fulltext).
The short version of it is that the Urbit ID system allows one to match public
keys with devices, bestowing devices with self-authenticating identities. This
allows one to trust the communications received from the device to whatever
degree the private key is held secure. IP addresses, GPS coordinates, MAC
addresses, etc, are not sufficient to generate high levels of trust - they're
all temporary, easily spoofed, or both.

> One might imagine applying this to the Internet of Things (IOT) in which the
> IOT device self-generates a public- and private-key pair and registers the
> public key. For example, with a hub or controller so the hub can confirm it
> has reached the right IOT device. By the same token, configuration of the IOT
> device into an ensemble could include incorporation of the public key of the
> controller into a list of valid devices that can command or obtain data from
> the now-configured IOT device. Both ends can verify they are talking to the
> originally configured devices, assuming no device has lost its private key.

Here, the hub or controller that he refers to would be your planet. Thanks Vint,
you're making our job simpler.

Urbit has many other features that make it well-suited for IoT, above and beyond
just eliminating the SaaS model and providing self-authenticating identities.
Many of these additional advantages derive from the fact that Urbit is a [solid
state interpreter](@/docs/arvo/overview.md#solid-state-interpreter) and that
[Ames](@/docs/glossary/ames.md) is a network of solid-state interpreters
equipped with cryptographic identity. We explore this in the next section.

### Future lunar cosmotechnics

![farm](https://media.urbit.org/site/posts/essays/farm.jpg)

We now polish off the old crystal ball and imagine how the usage of Martian
lunar technology may develop over time once it becomes widely exposed to the
evolution-inducing forces of industry and culture. This section is pure
speculation, and we only aim to paint a small glimpse of a potential future
rather than a prescriptive and exhaustive one. This picture will necessarily be
biased by my personal proclivities and expertise, or lack thereof.

Any discussion on the future of moons is incomplete without mentioning the
possibility of [lunar emancipation](https://urbit.org/faq/#more-planets) to
increase the number of planets. This fascinating topic sees regular discussion
on Urbit Community, but is beyond the scope of this article.

To avoid completely open-ended and rambling discussion, we narrow our scope to a
particular context that seems both within close reach and which exhibits many of
the important characteristics possessed by the whole.

First, we remark that Urbit is intended first and foremost as a personal
computer. When we unravel its potential usage in industry here, we are
considering this in the context of a widely predicted future in which the trend
that the scale of manufacturing and production that individuals or small groups
of individuals are capable of continues to grow. Agriculture is a great
microcosm of this long-standing trend, as the growth of civilization has closely
tracked with the ever-decreasing manpower required to grow crops and manage
livestock. The modern era is distinguished by the fact that small numbers of
people can manage enormous farms and thus provide food for vast quantities of
people. Thus, computation on modern automated farms may be thought of as at the
intersection of both personal and industrial scale, and we predict that the set
of trades that exists at this intersection will only grow over time.
 
Agricultural automation has been one of the primary engines for the growth of
civilization, but as it has become digitized it has frequently brought with it
the downsides of IoT elaborated on in the previous section. [John
Deere](https://www.thetruthaboutcars.com/2020/03/its-payback-time-right-to-repair-movement-targets-john-deere/)
has famously been at the center of the controversy around the right to repair.
Farmers have lost the ability to repair their own equipment due to vendor locks
and a dependency on phoning home. Furthermore, any suite of sensor products
designed to gather important data such as genomics, hydrology, soil health,
weather, etc, inevitably is designed to only work with other products by the
same vendor. It's the same story all over again - you have a bunch of primitive
moons belonging to different planets, and no planet to call your own.

Again, Urbit resolves these issues in the same fashion as above, and there is no
need to step through the argument again. One might argue that using Urbit is
another form of vendor lock-in - but this is evaluating Urbit at the incorrect
level. Since Urbit is an open source operating system, its functionality may be
extended and modified arbitrarily by any party. _Some_ system is necessary -
that fact can never be escaped. But you can escape from systems that do not
grant you the freedom to modify it to your heart's content, and that requires
one to use open source software. Thus we do not consider using open source
software to be a form of lock-in, or at least a much milder and inescapable form
of lock-in as compared to something like Apple's walled garden.

So let us focus on the additional meritorious aspects of Urbit (or more
generally, solid state interpreter networks) that propel it above and beyond
merely escaping the antifeature pit of modern IoT.

#### Solid state interpreter networks

![cubesats](https://media.urbit.org/site/posts/essays/cubesats.jpg)

Urbit is the world's first solid-state interpreter (SSI). This concept is
summarized in the [white paper](https://media.urbit.org/whitepaper.pdf) as
follows:

> Imagine it as a chip. Plug this chip into power and network; packets go in and
> out, sometimes changing its state. The chip never loses data and has no
> concept of a reboot; every packet is an ACID transaction.

Also,

> Briefly, an SSI is an interpreter which is also a database. In more depth, an
> SSI combines three properties: uniform persistence, source independent packet
> networking, and high-level determinism.

We do not wish to segue into a lengthy examination of what this really means -
that's what the white paper is for - but we will attempt to explain why these
properties are of great benefit in an industrial IoT context such as
agriculture. We'd also like to predict that Urbit will not be the only SSI.
Other sorts of SSI's specialized to various tasks, may one day roam the planet,
and these may be better suited for particular IoT tasks than
[Arvo](@/docs/glossary/arvo.md) is. For now though, we will only speculate on
this to the extent that the remainder of this article is couched in terms of
SSI's communicating with an [Ames](@/docs/glossary/ames.md)-like networking
protocol and Urbit ID-style cryptographic identity, rather than Urbit itself.

For a SSI, losing power is much less of a catastrophic event than it is for
ordinary computers with volatile memory. Knowing that you can never lose any
state is a powerful guarantee on the integrity of your data. Loss of power will
always mean loss of any data that could have been collected while power is down,
no matter what sort of device you use, but with a SSI you at least have
assurance that you will never lose data that had already been collected before
it had a chance to be transferred from the cache to the disk. Of course, this is
actually the sort of guarantees that [ACID
transactions](https://urbit.org/docs/arvo/overview/#acid-database) have - it is
just that this set of guarantees emerges naturally as a consequence when you
have a SSI. Put another way - every SSI is a database, and having every device
be a database is a massive boon in situations where enormous quantities of data
are being collected across a distributed network. The standard today is that
data is only collected at hubs, and any data that doesn't reach a hub is
irretrievably lost.

SSIs are also deterministic at a high level. While all computers are
deterministic at the CPU level, interruptions to power can result in an
undefined semantic state and result in the random erasure of half of its brain.
This determinism is what begets the ease of maintainability of Urbit - problems
generally only need to be solved once by experts, and the solution propagates to
the rest of the network via [OTA updates](@/docs/glossary/ota-updates.md). We
addressed this maintenance issue previously - we only remark now that this is
property is derived from being a SSI, rather than something particular only to
Arvo or Urbit. When one has hundreds or thousands of devices to manage, the
guarantees on ease of maintenance provided by determinism are extraordinarily
convenient.

Packet routing on SSI networks is source-independent, and in the context of an
Ames-like networking protocol, are always delivered exactly once and in a
precise order due to the fact that nodes on an Ames network are in a permanent
session. Source-independent means that the identity that originated a packet
does not need to be the one to deliver it - packets are _facts_, and the truth
of a fact does not depend on the one you heard it from. This means that it is
possible, for instance, to send instructions to a moon before it even exists,
and be guaranteed that that moon will receive it and perform the tasks given to
it, even if the device which originally sent the packets no longer exists. As
long as somebody has kept the packets on hand, they will eventually be
delivered. So, one could imagine transmitting directions to a crop harvesting
robot into which a moon will be installed before the robot has even been
purchased, know that once it is delivered it will automatically begin its task,
and know that those tasks will be completed in the correct order, without any
accidental repeats. Taken to the limit, one can imagine preplanning the
automated tasks for an entire farm before a single device is purchased, with
powerful guarantees on the integrity of those instructions no matter how long
elapses between sending and receiving.

#### P2P data markets

![knots](https://media.urbit.org/site/posts/essays/knots.jpeg)

As was mentioned above, today's IoT devices ferry all sorts of your personal
data to megacorp, where they package it and sell it to the highest bidder. While
it is difficult to imagine that most individuals would get much out of selling
their own personal data, industrial scale data such as that collected on
digitized farms could be quite valuable. Here we briefly examine how Urbit can
be utilized to populate and facilitate a market for such things.

All data collected by your moons may be digitally signed by that moon, ensuring
you and anyone else of the exact origin of that data. This is one advantage of
having cryptographic identity baked into the core of the operating system and
networking protocol. One could imagine collecting large amounts of such data and
packaging it for exchange with other local and regional farmers. This can, of
course, already be done in principle with current systems. But current systems
do not automatically come equipped with the sort of provenance, immutability,
and reputation that comes for free when you make use of SSI networks like those
outlined here. Manipulated or faked data becomes easier to spot, and you'll know
who it came from, and so supplying such data puts one's reputation at stake.

One major issue facing conjoining data gathered from disparate sources is simply
how to do it. Data arriving in random order, from different software versions,
running different hardware, is all very difficult to bundle into a good
dataset - and indeed wrangling this sort of task forms a large part of the data
scientist profession. As devices in SSI networks utilizing an Ames-like protocol
are engaged in permanent sessions, leading to properties such as exactly-once
delivery and well-ordered message sequences, issues about the order in which
data arrives are dramatically simplified. I do not wish to get mathematical
here, but I personally have confidence that the emerging discipline of
[categorical informatics](http://math.mit.edu/~dspivak/informatics/), as well as
the relevance of [low-dimensional topology to data
fusion](https://arxiv.org/abs/1409.5505), resolves many of these issues. I
promise to explain this in more detail in the future. For now, it suffices to
say that SSI networks seem well-positioned to utilize these techniques.

Cryptographic techniques such as [(composable) zero-knowledge
proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof), [secure multi-party
computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation),
[ring signatures](https://en.wikipedia.org/wiki/Ring_signature), and even
[homomorphic encryption](https://en.wikipedia.org/wiki/Homomorphic_encryption)
offer a variety of ways in which data may be shared in an IoT context with
mathematical guarantees on what sort of privacy is maintained. This is perhaps
less relevant in the context of agricultural IoT, where personal private data is
largely absent, but we mention them here to invite further speculation from the
reader about the possibilities of IoT and SSI networks.

We end our discussion with an adaptation of a scenario that I borrow from my
brief time working on [Ceptr](http://ceptr.org/) in 2018 that begins to show dim
outlines of how a lunar IoT-connected world evokes phantoms of the properties of
a hypothetical ["global nervous
system"](https://en.wikipedia.org/wiki/Global_brain). This example is
purposefully mundane to illustrate how deficient our Earth systems are, and
while it is possible to accomplish in theory, it is impractical on a wide scale
due to the numerous problems with IoT discussed here. Imagine that you suffer
headaches from low atmospheric pressure. You'd like to know when a low-pressure
front is an hour away from you so that you can pre-emptively take aspirin to
prevent the headache. Your personal digital assistant, running on Urbit, can
then periodically query sensors in your region hooked up to moons for weather
data to predict whether or not you will be soon be passing through a low
pressure front. This could be a free service, or paid for automatically with
cryptocurrency microtransactions. This task will someday be trivial on Mars, and
is merely a stone's throw away from a vast and undiscovered universe of other
possibilities unlocked by SSI networks.


[^0]: Of course, all moon names have four words, not three. What the fourth word
    needs to be for only three words to display is a matter of Urbit lore that
    is more fun to discover yourself than have it told to you, so we won't spoil
    it here.
