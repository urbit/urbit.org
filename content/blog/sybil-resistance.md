+++
title = "How Sybil resistance shaped the internet"
date = "2022-01-28"
description = "Why spam prevention centralized the "

[extra]
author = "Jonathan Paprocki"
ship = "~datnut-pollen"
image = ""
+++


In this essay we give a historical perspective on the development of the internet into the form
it has taken today from the point of view of Sybil resistance. In the broadest
terms, Sybil resistance is a key characteristic that may be possessed by
networks, digital and otherwise, to resist negative behavior committed by bad
actors. In the digital world, this mostly means stopping bad actors from
breaking the computational rules of the network, e.g. impersonating someone
else, or preventing large amount of traffic which stay within the rules but make
the network unusable, e.g. spam and denial of service (DoS) attacks. When a network is Sybil
resistant, it means you can reasonably assume that a randomly chosen actor in
that network probably doesn't mean you harm. It manifests similarly in the
physical world, as networks and communities where you can safely assume that
most people are not there to create mischief.

We frame the current state of affairs, an internet dominated by megacorporations
running the software and users running clients, as a practically inevitable side
effect of the lack of built in Sybil resistance at the networking layer. Our
ultimate goal is to shed some light on why Urbit ID is structured as it is,
in particular address the counterintuitive choice to utilize a 32-bit address
space (approximately 4 billion addresses) for nodes intended for humans (called [planets](/docs/glossary/planet)) when it has been widely understood for
a long time that 32 bits are insufficient to handle all networked devices. Our key argument for why Sybil
resistance needs to be baked in at the networking layer is that putting it any
higher dooms the network to be captured by powerful centralized actors which act as guards
who decide who may participate in the network, which inevitably forces those
guards to behave in a way that is not in the best interest of the users by doing
things like collecting their personal data and showing them ads.

What do digital networks without Sybil resistance look like? To answer this question,
you need look no farther than your spam folder. Since it is practically free to
spin up a new email address, there is effectively no cost to send an unlimited
number of messages from an unlimited number of addresses. It doesn't matter if
99.999% of it does not achieve the spammer's goal, which is typically either
acquiring money or personal information. Since there is no cost, spamming is
profitable. Thus the traffic on any sufficiently large and valuable non-Sybil
resistant network will always overwhelmingly consist of spam. Ordinary
good-faith actors will only send a messages that they need to, while spammers are
incentivized to send as many messages from as many addresses as they possible
can to maximize their return.

Thus while email is a bona fide peer-to-peer protocol, in practice it grew into
a client-server protocol controlled almost entirely by megacorporations who act as a guard against
spam. Since email addresses are unlimited and free, they step in and provide
Sybil resistance at a higher layer than the address space.
Anybody
with the technical know-how can set up their own personal email server, but
because megacorporations try their best to close spammer accounts utilizing
their service, the vast majority of independent email servers are run by
spammers. Thus most email service providers just block traffic from unknown
servers as part of their spam prevention strategy. Unless you're a VIP with
powerful connections, Google is always going to block email you send from your
personal email server to a gmail.com address. You can message your geek friend that
also runs their own email server, but to talk to grandma you have no choice but to submit
to utilizing a megacorp service.

Running servers and committing resources to spam prevention costs money. Thus if
email service is being provided at no monetary cost like with Gmail, the service
provider needs to find another way to make ends meet. This dynamic is what gave
rise to surveillance capitalism. By an enormous margin, the most popular way to
make running an email service profitable has been to harvest personal data and
serve ads to the users.

This is somewhat ironic since the original goal was to prevent spam, and in
order to do so the service providers needed to become spammers themselves. Thus
the end user reaps very little benefit from this arrangement: they're still
being spammed, but now they're also giving up personal data. They don't need to
go through the hassle of running their own server, but they sacrifice privacy.

Email is a microcosm of the larger problem - this model of service providers
harvesting personal data to form psychological profiles on their users in order
to charge advertisers a premium for targeted ads is now the foundation of the
entire internet. When you look beyond email the issue is compounded. Megacorp
apps like Facebook and Twitter makes almost all of their revenue by selling ads,
and so the more somebody uses their service, the more ads they sell, and the
more money they make. So they are further incentivized to make their apps as
addictive as possible. With flashy, colorful UI's and sophisticated
recommendation algorithms, they exploit human psychology to create dopamine
feedback loops that keep you coming back. All of these downstream effects, we
claim, ultimately stem from two facts: the networking layer is not
inherently Sybil resistant, and running a server is both technically challenging
and time intensive.

We haven't yet touched on the second fact, that running a server is hard. This
is what Urbit OS aspirationally solves, and this is a fascinating topic in its
own right, but for this essay we're focusing on Sybil resistance.

### Sybil resistance costs resources

Endowing a network with Sybil resistance ultimately requires some kind of
resource to be spent, so the question of how to get a Sybil resistant network
boils down to what resources ought to be spent to do so, and what layer should
it be done at. Let's start by focusing on resource cost, first for the users,
then the service providers.

Users pay for Sybil resistance by exposing their personal data as well as the
invisible psychic cost of utilizing services designed to be addictive. Service
providers pay for Sybil resistance by utilizing the monetary value they extract
from personal data and selling ads to pay network engineers that prevent hacks
and DoS attacks, computer scientists that write spam prevention algorithms, and
hardware built to handle much more traffic than it would need to if they could
somehow only serve ordinary users. They also need to pay data scientists to
figure out how to best utilize user data, marketers to sell ad space to
advertisers, UX designers to make their service addictive, and all the
additional overhead required to manage all of this.

What are some alternative resource expenditures we could utilize to achieve
Sybil resistance? We present a few alternatives here, but this list is not
exhaustive.

A minority of internet companies promise not to harvest your
data and show you ads by asking their users for money instead. By paying to use your account, you
solve their issue of having to come up with a way to become profitable without
harming their users. They still need some measure of spam prevention, as
spammers are incentivized to use a service as long as the expected gain of
spamming is larger than the cost of an account. This ultimately increases the
monetary cost to the user than it would otherwise have been.

We've mentioned briefly so far that Sybil resistance is not only a property of
digital networks, but real life ones as well. Every group, organization,
community, corporation, etc employs some way of letting people in and/or turning
them away. Even entirely open organizations who let anybody join will inevitably
kick you out if you're causing too much trouble. You can't just show up one day
at Megacorp HQ and start doing your own thing: you need to apply for a job first
and pass an interview. You also can't just walk in to a college classroom and
start taking a course and expect an official grade: you need to apply to be a
student. Real world communities only have so many resources, and so barriers
need to be built to prevent people from showing up, consuming resources, and
contributing nothing.

Digital networks can piggyback off of Sybil resistant physical networks. One
frequently used method is to require a .edu email address to join a network. Facebook did this by initially requiring a harvard.edu
address, when soon after expanded to include .edu addresses from other Ivy
League schools, then any .edu address, and finally any email address at all.
They piggybacked off of the fact that .edu email addresses are scarce, e.g. most
universities only allow their students and employees a small finite number of
.edu addresses, and that universities are exlusive. Early Facebook did not have
the resources to set up enough servers to handle the traffic for anyone to sign
up, nor to prevent abusive network use, so they had to make use of another
pre-existing Sybil resistant digital network, their email networks, to stem the
flow of incoming users to a manageable quantity. And their email networks are exclusive because you
typically need to be either a student or employee to use one, and the
application process to become one makes the physical human network of the
university Sybil resistant. While many professors will let anybody sit in on
their class, they typically will not give such auditers a grade, because grading
costs time and money and they aren't paying tuition.

Citizenship is also a method of Sybil resistance for states. The
social contract is that citizens of a country pay taxes and in exchange reap the
benefits of being a full-fledged member of that state, such as being able to
obtain a passport. This passport proves to other states that you're less of a
legal liability if you get into trouble in a foreign land, among other things.

Thus another avenue towards Sybil resistance for digital networks is to exploit
the fact that Sybil resistance is transitive - if you only let people on your
network who came from a real world or digital network that is already Sybil resistant, your network is
Sybil resistant as well. This is one of the main approaches utilized by [Proof
of Personhood](https://en.wikipedia.org/wiki/Proof_of_personhood) projects,
which aim to give exactly one digital identifier to each person. This has its
own hazards: namely that such a system requires one or more central authorities
to verify this and prevent anyone from acquiring a second identity. This is the
same hazard exhibited by most Sybil resistance strategies. If a well-intentioned
authority is subverted, or an imposter pretends to be you and misbehaves, you
may have little recourse to correct things.

Another digital strategy is CAPTCHAs. By presenting a challenge that humans are
good at solving and machines are poor at, you at least prevent bots from
participating, and introduce a time cost to a potential spammer that would like
to make thousands of accounts. CAPTCHAs are an appropriate strategy for many
circumstances, such as preventing DoS attacks, but fail in other circumstances
((examples?)).

Cryptocurrencies offer another method of spam resistance in the form of
transaction costs. Transaction costs serve the dual purpose of incentivizing
mining as well as preventing the network from being overwhelmed with pointless
transactions. We've witnessed many blockchain projects that promise a high
transactions per second (TPS) figure and almost zero fees suffer enormous
performance issues due to bots spamming tiny transactions into hundreds of
thousands of wallets. (should I give examples here? Solana is a recent example,
and Nano is an interesting example of a zero fee network that requires proof of
work to send a transaction, but I don't want to distract the essay from its
focus on Urbit)

While there are other roads to Sybil resistance, we've covered enough to prove
our point that Sybil resistance is never free, but the resources that one can
consume to achieve it are widely varied, and the economic and social dynamics
that that choice makes has enormous downstream effects.

So how does Urbit ID achieve Sybil resistance then? An Urbit planet, the ID
intended for human use, costs money. As long as the expected gain of spamming is
lower than the cost of an ID, spamming is losing proposition, and so spammers
will stay away.

((the following paragraphs are just repeating what's been said elsewhere on the
blog, I should link those pages and try to keep this short))

How then do we manage to make an Urbit ID worth more than the expected gain from
spamming? The answer is by making it scarce. Urbit ID has nonzero value since it
gives you access to the Urbit network with a short, human memorable name, like
`~ravmel-ropdyl`. Urbit ID's are basically like IP addresses, meaning they're
just numbers, but since numbers are less memorable than words, we use a funny
system that converts numbers into words to get a meaningless but memorable name.
When you have a name that people can remember, its easier for people to find
you. While you can use Urbit with a [comet](/docs/glossary/comet), which can be
generated in a few short moments and costs nothing, they have long names like
`~ralwel-linwet-fanwyc-banrun--wiswel-tapbus-noctuc-marzod`. Comets run the
exact same software as planets, and so can do everything on the network a planet
could do besides join one of the few groups that don't allow them. But from a Sybil resistance
point of view, comets are like email addresses: free and unlimited, but doomed
to be dominated by spam in the long run. Thus we expect that ultimately most
people will simply block traffic from comets and bar from them groups, since
they will overwhelmingly consist of bots.

Since planets are scarce, they cost something. You could try and sell comets,
but once somebody learns that they could have generated their own in a few
seconds for free, they're likely to accuse you of cheating them. Since we've
concluded that we can't have an unlimited number of free addresses if we want to
avoid the growth of extremely powerful megacorporations that control all
communication, we literally have no choice but to make them scarce.

So what is the right number then? We've chosen 32 bits, which means 2^32 or approximately 4 billion,
for simplicity. Multiples of 2 work well with existing hardware. The next
multiple of 2 is 64, which is a 20 digit number. That's so many that there would
be a race to the bottom in price, ultimately making them so cheap that spam
would likely be profitable. 16 bits is only about 65 thousand, which is
obviously far too few for a network intended to be used by everyone. Thus 32
bits is in the Goldilocks zone. Urbit ID is flexible though - if someday 32 bits
proves to not be enough, there are several methods by which the address space
could be expanded, such as by liberating [moons](/docs/glossary/moon) or
launching a second copy of the address space and building a bridge between the two networks.

#### Stopping impersonation

#### Which layer

Which layer should Sybil resistance be implemented at? What are the benefits of
doing it at the networking layer instead of the application layer? Is doing
Sybil resistance at the networking layer a leaky abstraction (no)?

