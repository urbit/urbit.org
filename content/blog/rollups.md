+++
title = "The Gang Solves the Gas Crisis"
date = 2021-05-06
description = "How we're making Urbit ID affordable again"
[extra]
author = "Jonathan Paprocki"
ship = "~datnut-pollen"
image = ""
+++

Anybody who has used Ethereum smart contracts recently is aware that it has
gotten _expensive_. There's all sorts of proposed solutions out there to make it
affordable again-Ethereum 2.0 being the big one-but there's also a variety of
complicated and clever mechanisms and proposals each with their own trade-offs
that are collectively referred to as "layer 2 solutions" (see [further
resources](#resources) for more information about these). This is in contrast to
the first and original computational layer of Ethereum called "layer 1", where
the brunt of the gas crisis is being felt.

The standard personal vehicle for a human on Urbit is the
[planet](@/docs/glossary/planet.md), the cost of which we've generally guessed to be
around 10-20 $USD. Unfortunately, with the ongoing Ethereum gas crisis, along
with the rising price of Ethereum itself, the gas cost of acquiring a planet
ends up being far more than the cost of the planet itself - perhaps as much as
$100 at time of wriitng! This additional cost goes to the miners - in other words, there is no
financial benefit to this for anybody working on Urbit or whoever you purchased
address space. Tlon has always covered gas costs for [Urbit
ID](@/docs/glossary/azimuth.md) up to a certain extent, but today's transactions
rarely meet that threshold. A couple of years ago the transactions needed to
spawn a planet, transfer it to a new wallet, and set its keys and proxies was
less than a dollar. We'd like to return to that state, and in fact make it even cheaper.

In response to the gas crisis, we have spent the last several months developing
a simple, in-house layer 2 solution by which we can return to these prices
without sacrificing any of the main value propositions of Urbit address
ownership.

This post is primarily a short explainer for what these changes mean for the
typical non-technical planet owner or those in the market for a planet, as well
as a status update on where we're at in development. We only offer minimal
technical details on how this is done, mostly at [the end](#technical). This is
also primarily aimed at those who currently self-host or plan to self-host their
urbit. For anybody utilizing a hosted service, this matter will all be handled
by your provider. We also have a [separate section](#stars) below addressed at
[star](@/docs/glossary/star.md) owners, and those who wish to build a ["gateway"
to layer 2](#rollers). Lastly, we emphasize that this system is 100% opt-in - if
you are satisfied with the current experience of Urbit ID, then nothing changes
for you whatsoever.

Perhaps the most pressing question held by anybody reading this is - when will
it be ready? It's not reasonable to give a timeline on difficult engineering
work, but rest assured that completing this upgrade is a top priority. Much
of the back-end is approaching completion, and we are confident in a release
well before the end of 2021.

### Naive rollups

Our layer 2 solution, designed primarily by Tlon lead engineer `~wicdev-wisryt`,
is known as "naive rollups" and we will be using this term interchangeably with
"layer 2" - though it is important to note that there are many layer 2 solutions
utilized by projects other than Urbit. As we're avoiding technicality here, we're only going to explain what
the user experience will be like - namely the advantages and disadvantages of
utilizing our layer 2 solution, and how that affects the management of your
[ship](@/docs/glossary/ship.md).

Very briefly, a rollup is a way to combine many transactions into one, and we
are building infrastructure so that any Urbit ship may be utilized as a "roller". A
roller will collect Urbit ID transactions, compute their effects, and post the
result of transactions onto the Ethereum blockchain. Anybody may set up their
ship to [act as a roller](#rollers). Tlon will be launching our own public
roller, but as Urbit is a decentralized network, by no means will we have a monopoly.

#### Pros and cons

The primary advantage to using naive rollups is that the gas cost for Urbit
ID-related actions will be dramatically reduced. It will be reduced by so much
that we expect that ordinary usage of Tlon's roller will not cost the end user
anything - submitting the transactions to our roller will be free, and we will
bear the gas cost of posting the results to the blockchain. That means that the
cost you see for a planet on a market that utilizes Tlon's roller ought to be
the final cost.

There are a few trade-offs for this, but none of them really sacrifice the core
value propositions of Urbit ID.

The biggest one is that ships on layer 2 are essentially completely isolated
from the rest of the Ethereum ecosystem. They can no longer interact with smart
contracts (of which there are very few, but there might be more in the future)
that have not been explicitly designed to work with naive rollups.

Compounding that factor, the journey to layer 2 is one-way only - at
least for now. There are theoretical ways a ship may move back to layer 1 (i.e.
where all ships currently exist), but they do not yet exist, and we cannot
promise that such a thing will be available in a timely manner. Anybody moving a
ship to layer 2, or buying a ship on layer 2, should assume that they will
remain on layer 2 for the foreseeable future. We do not expect this to be
permanent, but it is perhaps the most significant drawback for the time being.

Another one is that transactions may no longer be "instant". Effectively, this
was already the case on layer 1 - unless you paid a lot of gas, you could wait
hours or even days for your transaction to clear. But the way we are saving on
gas is essentially by "bundling" or "rolling up" many transactions into one, and
submitting them as a single transaction. The more transactions in the rollup,
the better the savings. This bundling is not the only factor at play here
though - costs are reduced other ways, but this is a technical detail we leave
[to the end](#technical). It is possible to use layer 2 to submit single
transactions (and this will still save on gas costs!), so utilization of layer 2
should not incur any delay over layer 1 when utilized in this fashion.

Tlon has not finalized the details on how our roller will work, but it will
probably involve waiting until a sufficient backlog of transactions have been
submitted to make it economical to bundle them up, or just submitting every set
time period, whichever arrives first. We do not see this as a big issue - we
view Urbit ID as "digital land", and a few hours to acquire land, or waiting for
your new personal computer to be delievered, is still lightning fast in
comparison to the real world.

What is this main value proposition that is not being lost? Your ship still
belongs to you forever, and this is guaranteed by very strong cryptographic and
game-theoretic guarantees comparable to the guarantees that exist on layer 1. We
consider this principle to be uncompromisable, and maintaining ultimate
sovereignty over your ship was totally central in choosing our solution.
We summarize the new security model [below](#technical), and `~wicdev-wisryt`
goes into greater detail in the [resources](#resources).

### Changes to User Experience

The primary way one manages their Urbit ID, namely performing tasks such as
transferring ships, setting networking keys, or setting
[proxies](@/docs/glossary/proxies.md), is with a web interface called
[Bridge](@/docs/glossary/bridge.md) found at
[bridge.urbit.org](https://bridge.urbit.org). If you already own a planet,
you've probably used Bridge before - perhaps only a single time.

Bridge will be getting a facelift to enable easy interfacing with layer 2,
including loud warnings about what is being gained and lost by doing so. From
here you will be able to transfer your ship to layer 2, and once there,
perform all the usual actions you can on layer 1.

The main difference for layer 2 transactions on Bridge will be an additional
choice of roller. Tlon's will be free for ordinary, non-time-sensitive usage.
You could use your own ship for a fast single transaction with a more marginal
reduction in gas cost. We expect that planet markets may wish to set up their
own rollers, and they could also be a service offered by a star.

Every planet has a sponsor star, which distributes [OTA
updates](@/docs/glossary/ota-updates.md) to their sponsored planets, as well as
assisting with peer discovery. Both layer 1 and layer 2 planets will be able to
sponsored by either layer 1 or layer 2 stars. So effectively nothing will change
in terms of how sponsorship works.

When you buy a planet, any reputable seller will inform you whether or not it is
on layer 1 or layer 2.

And that's it! If you'd like to know how things will be changing for
[stars](#stars), what goes into [setting up a roller](#rollers), and additional
[technical details](#technical), read on.

### Changes to stars {#stars}

Both planets and stars will be able to move to layer 2.
[Galaxies](@/docs/glossary/galaxy.md) must remain on layer 1 for technical
reasons, and [moons](@/docs/glossary/moon.md) and
[comets](@/docs/glossary/comet.md) never interacted with Ethereum anyways, so
they are completely out of the picture.

Stars will be able to remain on layer 1 with no action required. For star owners
that wish to take advantage of the cheaper gas costs, there are two possible
modes: ownership of the star on layer 2, or setting the spawn proxy to layer 2
with ownership remaining on layer 1.

The first mode-a star which is owned on layer 2-has the same advantages and
disadvantages as a layer 1 planet. Planets spawned by a layer 2 star will also
necessarily be on layer 2 - there is no way to spawn a layer 1 planet from a
layer 2 star, though any planets which had been spawned on layer 1 before the
star had migrated to layer 2 will remain on layer 1.

The second mode-ownership on layer 1, with spawn proxy on layer 2-is only a
little more complicated. Such a star will change its networking keys, transfer
between wallets, and set its management proxy all on layer 1, with the
corresponding higher gas prices. However, it will be able to spawn planets on
layer 2-and _only_ on layer 2-with the corresponding layer 2 tradeoffs. Like
moving ownership to layer 2, this will be a one-way journey for now. Planets
spawned before moving the spawn proxy to layer 2 will remain on layer 1, but
from then on, all planets spawned by that star will live on layer 2.

In either scenario, stars will still be able to create [invite
pools](@using/id/creating-an-invite-pool.md), which will now consist entirely of
layer 2 planets.

### Creating a roller {#rollers}

![gasprices](https://media.urbit.org/site/posts/essays/gasprices.jpeg)

Rollers are urbit nodes which users submit transactions to to be "rolled up"
into a bundle to be submitted to the Ethereum blockchain. The business logic for
a roller runs on the urbit node itself. Thus, anybody with an urbit ship may set
it up to act as a roller. While the details of how rollers work are still being
hammered out, one should expect that one can either set transactions to be
submitted at regular intervals, once a sufficient number of transactions have
been received (as more transactions means greater savings), manually, or some
combination of the above.

Tlon plans to release documentation on how to set up your own concurrently with
the release of our layer 2 solution.

Malicious rollers could potentially exist, but the worst they ought to be able
to do is simply not submit your transaction. The security factors for rollers
are briefly addressed [below](#technical), and elaborated upon in the
[resources](#resources), but you can expect full technical documentation on
these factors to be included in the roller documentation.

(Question: will rollers need to live on L2?)

### Changes to Azimuth

[Azimuth](@/docs/glossary/azimuth.md) is the set of Ethereum smart contracts
governing Urbit ID. They will require a few changes to accommodate the new
system. Some of this has been implicit above, but to be clear, we will only be
making a few minor alterations:
 - Once a star's spawn proxy is set to the layer 2 address, it can't be switched
   back, and they can no longer spawn layer 1 planets.
 - Galaxies cannot be deposited to layer 2.
 - When depositing to layer 2, proxies are reset. Some other minor details are
yet to be worked out, but again, nothing will change for those who wish to
remain on layer 1.

### Technical details {#technical}

What's really going on behind the scenes here? The short version of it is that
rollers will be utilized to perform the smart contract logic that is ordinarily
performed on Ethereum, and only the final resulting state of the computation
will be submitted to the Ethereum blockchain. In other words, when you submit
transactions to a roller, they will be running a "Hoon smart contract" on it,
and the results of that contract will be put on the Ethereum blockchain. Because
[Urbit OS](@/docs/glossary/arvo.md) is deterministic, and some of the formal
properties of Hoon, Hoon turns out to be a great language for writing smart
contracts.

In layer 1, the Ethereum Virutal Machine guarantees the validity of state
transitions, while for layer 2 transactions, each Urbit node guarantees the
validity of the state transitions.

In the layer 1 model, the source of truth of a state transition was:
 1. Post a transaction to the Ethereum blockchain
 2. Ethereum Virtual Machine checks and enforces the validity of the resulting
    state transition
 3. Your urbit downloads the new state from an Ethereum node
 4. Your urbit gets a final decision on whether the new state is valid.
 
In practice, the fourth step is never used in layer 1. The main change to our
security model is that we are cutting out step 2 and beefing up step 4. Your
ship will now perform validation of the transactions posted to the Ethereum
blockchain, rather than the Ethereum Virtual Machine.

#### Further Resources {#resources}

We want to keep this post brief and non-technical, so that's all we'll say about
it for now. To find out more, you have a few directions to go on. We held a
[Developer Call](@/events/2021-03-04-developer-call-scaling-azimuth.md) where
`~wicdev-wisryt` outlines the design in much more technical detail, and also
explains why we decided to utilize our own design rather than other known layer
2 solutions such as [Optimistic
rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/),
[ZK-rollups](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/),
etc, or other blockchains. For those who would rather read, see
`~wicdev-wisryt`'s [RFC: Naive rollup for cheaper Urbit ID
transactions](https://groups.google.com/a/urbit.org/g/dev/c/p6rP_WsxLS0/m/hQBX0modAwAJ)
post on the `urbit-dev` mailing list. Lastly, the primary working branch on
Github for the Urbit side of naive rollups is
[here](https://github.com/urbit/urbit/tree/philip/naive), though it is not the
only place code is accumulating.
