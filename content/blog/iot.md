+++
title = "Lunar Urbit and the Internet of Things"
date = 2019-11-27
description = "Potential future usecases of moons for industry and consumers"
[extra]
author = "Jonathan Paprocki"
ship = "~datnut-pollen"
image = ""
+++

Each of the ~4B 32-bit [Azimuth](@/docs/glossary/azimuth.md) identities - namely
planets, stars, and galaxies, may spawn ~4B 64-bit child identities known as
[moons](@/docs/glossary/moon.md). Moons are the totally undeveloped wild outback
of Urbit, with a story waiting to be told that promises to be just as enormous
in scale as the cloud personal computing story told by planets, and possibly
even more so. In this post, I review the prehistory of moons on Earth, give a
snapshot of how moons are being utilized on Mars in 2021, and then go on to
speculate what the lunar locus of the Urbit ID address space may develop into in
the future. To keep scope limited, I primarily speculate on the usage of moons
in (industrial) internet of things settings, especially with respect to
agriculture, and how they may manifest as the workhorse collection unit of
decentralized data markets.

For those unfamiliar, moons differ from all other
[ships](@/docs/glossary/ship.md) in that they are not independent identities,
free to behave on the network however they please. Instead, their cryptographic
keys are issued and controlled by their parent identity. The cryptographic
relationship between the keys of a parent ship and its moons are analogous to
the relationship between primary keys and subkeys in a system like PGP. The
parent may revoke or change its moons' keys at any time. A typical future
relationship between a planet and a moon may be one of a person and their
smartphone. If you lose your phone, you don't want someone able to start
pretending they are you, operating one of your moons, on the network. The planet
is able to revoke the keys, and the moon stored on the phone becomes inert, no
longer able to communicate with the network.

### Lunar prehistory

It may or may not come as a surprise to you that you are already very familiar
with moon identities - they've just never been explained to you in such terms
because their existence on Earth is obscured by lack of terminology that
referred to them as such. Moons, in fact, are not a new concept at all.
Virtually your entire experience of the internet on Earth in this modern era is
the experience of someone who possesses a large number of moons subordinate to
planets who mostly refuse to talk to one another. The feeling you get of
constantly moving between silos, juggling accounts, not controlling your own
data, etc. is a direct result of the fact that, on Earth, you only possess
moons. No planets.

I'm speaking, of course, of the client-server relationship. In Martian
terminology, the Facebooks, Twitters, and Googles of the world are planets, and
accounts held with these services may be thought of as moons. Your account with
these megacorps is only yours for as long as they please. If you happen to step
on a digital landmine - such as a virus that causes Google's servers to believe
you are a bot - you are suddenly banned from their service, often with no
recourse. All your data, your connections, your network, just vanished. We are
all Mark Zuckerberg's moons, and his moons are loaded to the brim with
surveillance equipment.

The story of internet on Earth is that of the haves - those with servers,
holding all of the power, and the have-nots - those who only have access to
clients, who may only perform predetermined actions prescribed by those with the
servers. Running a server is theoretically accessible to anyone, but practically
locked behind the fact that server maintenance is a professional occupation
rather than something simple like riding a bike. Urbit levels the playing field
by elevating everyone to the rank of planet by making server maintenance as easy
as bike maintenance. Not completely unskilled, but within the capabilities of
almost everyone.

Of course, this analogy isn't perfect - Urbit moons are servers themselves, but
as they may only act in accordance with the wishes of its parent, they are
effectively as locked in degrees of freedom as a client is to a server. Any
deviation risks the moon's keys being revoked. To distinguish these prehistoric
moons from Urbit moons, we will refer to them later as "primitive moons".

Urbit contends that moons are not the appropriate digital vehicle for a
responsible adult. They are for devices, experiments, or your children. We hope
that the dark prehistory of moons as the primary weapon of the
surveillance-industrial complex will soon meet its end.

### Moons in the early Martian era

In 2021, moons are mostly unused on Urbit. There's a smattering of minor use
cases which we'll describe here, but they represent only the tiniest fraction of
their ultimate potential.

Tlon recently launched a survey bot called [Eliza](@/blog/eliza.md), which was
initially a comet. We often got questions on whether Eliza was actually Tlon's
bot, because it could just as easily be a malicious actor posing as Tlon. We
soon plan to relaunch Eliza as a moon of `~zod`. This is to establish that the
bot is indeed official - only someone with access to `~zod` is capable of
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
moons, so as not to risk the parent ship if something were to go wrong. This is
not ideal, as there currently isn't an easy way for a parent ship to access
software running on their moons.

Lastly, we see moons used as vanity identities. For instance, every
`~sampel-palnet` has underneath it a moon named `~master-sampel-palnet`[^0].

### Internet of Things

Now we start to look torwards the future by examining the problems of the
present and speculating on how Urbit might solve them.

The Internet of Things is much maligned by technologists as a privacy, security,
and maintenance nightmare. These products usually depend on phoning home to
perform their service, which is inevitably a funnel by which personal data is
harvested, an attack surface for hacker to gain access to your home network, and
a single point of failure which may render the device useless, all in one! One
need look no further than the recent [Ubiquiti
breach](https://krebsonsecurity.com/2021/03/whistleblower-ubiquiti-breach-catastrophic/)
to see all of these failure modes happening on a massive scale, and this is par
for course. This sort of outcome is completely antithetical to the Urbit
philosophy, and so any involvement of Urbit with IoT will soundly reject all of
these weaknesses as nonstarters.

However, it's important to understand why the current IoT model works like this
at all. I posit that it ultimately stems from the fact that today's IoT products
are primitive moons for which you do not operate the parent planet. On Earth,
almost every IoT device is necessarily married with the Software as a Service
(SaaS) paradigm because people don't have personal servers that could do all the
grunt work actually necessary for an IoT device to operate. This is not the
_only_ reason for this - it's also just more profitable to collect consumer
data. However, it's the SaaS aspects which make the whole thing such a
catastrophic mess. If the server that your device phones home to is your own,
there is no loss of personal data. If the network on which the device operates
is local, hackers cannot access it from the web. If your internet connection is
lost, the devices still work since they do not require an internet connection to
function.

By eliminating the SaaS aspect, Urbit solves the largest outstanding issues with
IoT in a single blow. Many privacy- and security-conscious people would never
consider using a personal digital AI assistant with complete knowledge of all of
your devices and their current state if it means giving up all that data to a
megacorporation. Recommendation engines such as the one used by YouTube are
designed to keep you hooked to the service as long as possible, not just find
content you're interested in. The wants and needs of the individual are at odds
with the wants and needs of the megacorp, and that mismatch manifests as the
antifeatures that plague IoT. Since your Urbit belongs to you, it can never act
against your own interests.

For web-exposed devices, Urbit offers the same security guarantees that it does
for your personal computer: everything is end-to-end encrypted by default. Urbit
still has a while to go before we can truly declare it secure, but when it is
there, you'll be assured the same level of protection for your devices that your
Urbit has. The Urbit ID system also allows one to match public keys with
devices, allowing devices to have self-authenticating identities, the importance
of which was pointed out by Vint Cerf
[here](https://cacm.acm.org/magazines/2018/12/232883-self-authenticating-identifiers/fulltext).

Urbit has many other features that make it well-suited for IoT, above and beyond
just eliminating the SaaS model and providing self-authenticating identities.
Many of these additional advantages derive from the fact that Urbit is a [solid
state interpreter](@/docs/arvo/overview/#solid-state-interpreter) and that
[Ames](@/docs/glossary/ames.md) is a network of solid-state interpreters
equipped with cryptographic identity. We explore this in the next section.

### Future lunar cosmotechnics

We now polish off the old crystal ball and imagine how the usage of Martian
lunar technology may develop over time once it becomes widely exposed to the
evolution-inducing forces of industry and culture. This section is pure
speculation, and I only aim to paint a small glimpse of a potential future
rather than a prescriptive and exhaustive one. This picture will necessarily be
biased by my personal proclivities and expertise, or lack thereof.

Any discuss on the future of moons is incomplete without mentioning the
possibility of [lunar emancipation](@/faq/#more-planets) to increase the number
of planets, but we leave this to the side for our discussion.

We narrow our scope to a particular context that seems both within close reach
and which contains many of the important characteristics possessed by the whole.

First, we remark that Urbit is intended first and foremost as a personal
computer. When I unravel its potential usage in industry here, I am considering
this in the context of a widely predicted future in which the trend that the
scale of manufacturing and production that individuals or small groups of
individuals are capable of continues to grow. Agriculture is a great microcosm
of this trend, as the growth of civilization has closely tracked with the
ever-decreasing manpower required to grow crops and manage livestock. The modern
era is marked by the fact that small numbers of people can manage enormous farms
and thus provide food for vast quantities of people. Thus, computation on modern
automated farms may be thought of as at the intersection of both personal and
industrial scale, and we predict that the set of trades that exists at this
intersection will only grow over time.
 
Agricultural automation has been one of the primary engines for the growth of
civilization, but as it has become digitized it has frequently brought with it
the downsides of IoT elaborated on in the previous section. [John
Deere](https://www.thetruthaboutcars.com/2020/03/its-payback-time-right-to-repair-movement-targets-john-deere/)
has famously been at the center of the controversy around the right to repair.
Farmers have lost the ability to repair their own equipment due to vendor locks
and a dependency on phoning home. Furthermore, any suite of sensor products
designed to gather important data such as crop and soil health, microclimates,
etc, will inevitably be designed to only work with other products by the same
vendor. It's the same story all over again - you have a bunch of primitive moons
belonging to different planets, and no planet to call your own.

Again, Urbit resolves these issues in the same fashion as above, and there is no
need to step through the argument again. One might argue that using Urbit is
another form of vendor lock-in - but this is evaluating Urbit at the incorrect
level. Since Urbit is an operating system, its functionality may be extended and
modified arbitrarily. _Some_ operating system is necessary - that fact can never
be escaped. But you can escape from systems that do not grant you the freedom to
modify it to your heart's content. Thus Urbit offers the maximum possible
freedom.

So let us focus on the additional meritorious aspects of Urbit (or more
generally, solid state interpreter networks) that propel it above and beyond
merely escaping the antifeature pit of modern IoT.

#### Solid state interpreter networks

Urbit is the world's first solid-state interpreter (SSI). This concept is
summarized in the [white paper](https://media.urbit.org/whitepaper.pdf) as
follows:

"Imagine it as a chip. Plug this chip into power and network; packets go in and
out, sometimes changing its state. The chip never loses data and has no concept
of a reboot; every packet is an ACID transaction."

We do not wish to segue into a lengthy examination of what this really means,
but we will attempt to explain why these properties are of great benefit in an
industrial IoT context such as agriculture. We'd also like to predict that Urbit
will not be the only SSI - and other sorts of SSI's will one day roam the
planet, but we declare this to be beyond the scope of this article and will not
be elaborated on any further.

For a SSI, there is no functional difference between losing power and losing
network connectivity. Knowing that you can never lose any state is a powerful
guarantee on the integrity of your data. Loss of power will always mean loss of
any data collected while power is down, no matter what system you use, but with
a SSI at least you have assurance that you will never lose data that had already
been collected. Of course, this is actually the sort of guarantees that [ACID
transactions](https://urbit.org/docs/arvo/overview/#acid-database) have - it is
just that this set of guarantees emerges naturally as a consequence when you
have a SSI.

SSIs are also deterministic at a high level. While all computers are
deterministic at the CPU level, interruptions to e.g. power can result in an
undefined semantic state, and result in the random erasure of half of its brain.
This determinism is what begets the ease of maintainability of Urbit - problems
generally only need to be solved once by experts, and the solution propagates to
the rest of the network via [OTA updates](@/docs/glossary/ota-updates.md). We
addressed this maintenance issue in the previous section - we only remark now
that this is property is derived from being a SSI. When one has hundreds or
thousands of devices to manage, the guarantees on ease of maintenance provided
by determinism are extraordinarily convenient.

Packet routing on SSI networks is source-independent, and in the context of
Ames, are always delivered exactly once. This means that it is possible, for
instance, to send instructions to a moon before it even exists, and be
guaranteed that that moon will receive it and perform the tasks given to it. So,
one could imagine transmitting directions to a crop harvesting robot into which
a moon will be installed before the robot has even been purchased, and know that
once it is delivered it will automatically begin its task. Taken to the limit,
one can imagine preplanning the automated tasks for an entire farm before a
single device is purchased.

#### P2P data markets

As was mentioned above, IoT devices send all sorts of your personal data to
megacorp, where they package it and sell it to the highest bidder. While it is
difficult to imagine that most individuals would get much out of selling their
own personal data, industrial scale data such as that collected on digitized
farms could be quite valuable. Here we briefly examine how Urbit creates a
market for such things.

All data collected by your moons may be digitally signed by that moon, ensuring
you and anyone else of the exact origin of that data. This is one advantage of
having cryptographic identity baked into the core of the operating system. One
could imagine collecting large amounts of such data and packaging it for
exchange with other local and regional farmers. This can, of course, already be
done in principle with current systems. But current systems do not automatically
come equipped with the sort of provenance, immutability, and reputation that
comes for free when you make use of a system like Urbit. Manipulated or faked
data becomes easier to spot, and you'll know who it came from, and so supplying
such data puts one's reputation at stake. Data collected by SSI networks also
has stronger guarantees than data collected by disparate systems of dubious
security and poor immutability gurantees, so it is overall of higher quality.

One major issue facing conjoining data gathered from disparate sources is simply
how to do it. Data arriving in random order, from different software versions,
running different hardware, is all very difficult to bundle into a good
dataset - and indeed wrangling this sort of task forms a large part of the data
scientist profession. I do not wish to get overly mathematical here, but I
personally have confidence that the emerging paradigm of [categorical
informatics](http://math.mit.edu/~dspivak/informatics/) resolves many of these
issues. I promise to explain this in more detail in the future. For now, it
suffices to say that the high-level determinism of SSI's simplifies many aspects
of this task, which is sometimes more generally known as [data
fusion](https://en.wikipedia.org/wiki/Data_fusion).

Cryptographic techniques such as [(composable) zero-knowledge
proofs](https://en.wikipedia.org/wiki/Zero-knowledge_proof), [secure multi-party
computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation),
[ring signatures](https://en.wikipedia.org/wiki/Ring_signature), and even
[homomorphic encryption](https://en.wikipedia.org/wiki/Homomorphic_encryption)
offer a variety of ways in which data may be shared in an IoT context with
mathematical guarantees on how much privacy is maintained. This are perhaps less
relevant in the context of agricultural IoT, where personal private data is
absent, but we mention them here to invite further speculation from the reader
about the possibilities of IoT and Urbit.

We end our discussion with an adaptation of a scenario that I borrow from my
brief time working on [Ceptr](http://ceptr.org/) in 2018 that begins to show the
dim outlines of how a lunar IoT-connected world begins to evoke properties of a
"global nervous system". Imagine that you suffer headaches from low atmospheric
pressure. You'd like to know when a low-pressure front is an hour away from you
so that you can pre-emptively take aspirin to prevent the headache. Your
personal digital assistant, running on Urbit, can then periodically query
sensors in your region hooked up to moons for weather data to predict whether or
not you will be in a low pressure atmosphere. This could be a free service, or
paid for automatically with cryptocurrency microtransactions. Doing this on
Urbit grants you the same guarantees we've discussed ad nauseum in this
article - you know the request will be secure, you know it will come from a node
with good reputation, you know that the response will be deterministic, and you
know that your privacy can be maintained by some combination of cryptographic
methods.




[^0]: Of course, all moon names have four words, not three. What the fourth word
    needs to be for only three words to display is a matter of Urbit lore that
    is more fun to discover yourself than have it told to you, so I won't spoil
    it here.
