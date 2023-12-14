+++
title = "Layer 2 FAQ"
date = "2022-03-01"
description = "Answers to all your lingering L2 questions."
[extra]
image = "https://media.urbit.org/site/posts/essays/l2-faq-artwork.jpg"
+++

The launch of our [Layer 2](https://urbit.org/blog/layer-2-guides) was met with
a lot of excitement and a few questions. Don’t fret, we have answers. Below is a
selection of the most frequently asked questions and our responses.

If you're still stumped, head to `~bitbet-bolbel/urbit-community` or give us a
shout online.

### Questions:

#### Planet Booting, Buying, Custody

1. [Do I need ETH to boot my planet?](#1-do-i-need-eth-to-boot-my-planet)
2. [Do I have full custody of my L2 planet?](#2-is-there-anything-i-need-to-do-to-ensure-full-custody-of-my-planet)
3. [Where can I buy a planet?](#3-are-there-any-platforms-where-i-can-buy-a-planet-for-btc-or-usd)
4. [How do I get a hosted planet?](#4-how-do-i-get-a-cloud-hosted-planet)

#### Layer 2 Architecture & Migration

5. [Why did you decide to build your own Layer 2 rollup?](#5-there-are-plenty-of-organizations-dedicated-to-customizable-rollup-solutions-why-did-you-decide-to-build-your-own)
6. [Should I migrate my L1 planet to L2?](#6-if-i-currently-have-an-l1-planet-are-there-any-advantages-to-migrating)
7. [Where did the old Bridge go? Can I still use it?](#7-is-it-possible-to-use-the-old-bridge-for-l1-operations)
8. [Why is the cost reduction so significant?](#8-why-is-the-cost-reduction-so-significant)
9. [What exactly is the mechanism for the “naive” consensus?](#9-what-exactly-is-the-mechanism-for-the-naive-consensus)
10. [When I spawn L2 planets via Metamask, I'm prompted to sign every transaction. Do you have plans to remedy this?](#10-when-i-spawn-l2-planets-via-metamask-im-prompted-to-sign-every-transaction-do-you-have-plans-to-remedy-this)

#### 1. Do I need ETH to boot my planet?

If you were invited to claim a L2 planet, you **do not** need ETH to claim
that Urbit ID. Anyone can get on Urbit without ETH or a crypto wallet via L2.
Inviting your mom to Urbit just got a lot easier.

If you have a L1 planet, you **do** need ETH to claim that Urbit ID.

Once you have claimed your Urbit ID and have recorded your master ticket,
you **do not** need ETH to boot Urbit. That Urbit ID is now yours, forever.

Unsure whether you have been invited to claim a L2 or L1 planet? The quickest
way to identify a L2 planet is if you used the below flow to claim.

![](/images/planet-l2-claim.gif)

For those with L1 planets, you can avoid future transaction fees by migrating
your L1 planet to L2. Read the migration instructions
[here](https://urbit.org/getting-started/layer-2-for-planets).

#### 2. Is there anything I need to do to ensure full custody of my planet?

If you were sent a direct link to claim an L2 planet (see above), it’s
in your full custody by design. Bridge generates your master ticket, which you
downloaded during the claiming process.

#### 3. Are there any platforms where I can buy a planet for BTC or USD?

There are a few ways to procure a planet, including some platforms that offer
BTC and USD payment options.

To purchase a L2 planet, we direct you to:

- [Networked Subject](https://subject.network/buy/) for payment in BTC.
  Brought to you by `~sitful-hatred`.
- [planets.lanlyd.net](https://planets.lanlyd.net) and
  [tomdys.gumroad.com](https://tomdys.gumroad.com) for payment in USD.

To purchase a L1 planet with ETH, there are a number of platforms dedicated
exclusively to Urbit ID. These include:

- [urbit.live](https://urbit.live/buy)
- [urbitex.io](https://urbitex.io)
- [urbit.me](https://urbit.me)

You can also acquire L1 Urbit IDs with ETH on [OpenSea](https://opensea.io/collection/urbit-id).

Once you purchase a planet, the easiest way to manage your cryptographic asset
is through [Bridge](https://bridge.urbit.org/), which is our Urbit ID management
interface, wallet navigator, and governance portal.

You can use Bridge to perform any desired
[Azimuth](https://urbit.org/docs/glossary/azimuth) interactions or download your
planet’s keyfile. As an alternative, [Metamask](https://metamask.io) is an
easy-to-use Ethereum wallet with a browser extension that integrates easily with
Bridge.

#### 4. How do I get a cloud-hosted planet?

There are a number of ways to host a planet in the cloud. Your options:

- DIY:
  The most cost-effective method is [setting it up
  yourself](https://urbit.org/using/running/hosting), though this route requires
  some system administration, and troubleshooting if any issues arise.

- Via a Hosting Provider:
  The more “headache-free” option is paying for a
  hosting provider to take care of all these processes for you, plus support. The
  following service providers offer hosting (some include a free planet):
  [Tlon](https://urbit.typeform.com/to/zQ9QOV3Z?typeform-source=tlon.io#source=tlon_io),
  [UrbitHost](https://urbithost.com/landing), [Get Urbit
  ID](https://www.geturbitid.com), [Escape Pod
  Store](https://www.escapepod.store), [Nodestead](https://www.nodestead.dev), and
  [ThirdEarth](https://third.earth/en/).

#### 5. There are plenty of organizations dedicated to customizable rollup solutions. Why did you decide to build your own?

Simply put, we designed and engineered our own rollup because we can’t depend
on the success or longevity of another organization. As they currently exist,
outsourced rollups are too immature and compromised in ways that undermine the
integrity of our technical principles. We also can’t restrict the aggregators to
a waitlist, another issue which might eventually be resolved, but one that we
can’t count on to be resolved soon.

#### 6. If I currently have an L1 planet, are there any advantages to migrating?

One of the most significant advantages to migrating is the reduced cost of
Azimuth-event related transactions. On L2, you can change sponsors or reset your
network keys for free with our roller. An important note: migration is currently
one-way. If you want to hold onto your L1 planet as a novelty, migration isn't
recommended.

#### 7. Is it possible to use the old Bridge for L1 operations?

The old version of Bridge will remain live, but unmaintained and eventually
decommissioned. You can access it at
[bridge-sunset.urbit.org](https://bridge-sunset.urbit.org). If you run into
something you can only do with the older version of Bridge,
[let us know on Github](https://github.com/urbit/bridge/issues/new?assignees=&labels=bridge&template=bridge-bug-report.md&title=).

#### 8. Why is the cost reduction so significant?

On L1, every operation is an Ethereum transaction, with logic and state, etc.
On L2, these operations are reduced and simplified into a
no-logic-involved Ethereum transaction. This is what makes L2 transactions
cost-efficient: multiple transactions happen simultaneously to share the cost of
just one L1 transaction.

#### 9. What exactly is the mechanism for the “naive” consensus?

Our engineering team has written extensively about the technical features of
our L2 rollup. To learn about its intricacies, we encourage you to read
`~datnut-pollen`’s comprehensive
[overview](https://urbit.org/blog/rollups#technical) and `~wicdev-wisryt`’s
original
[proposal](https://groups.google.com/a/urbit.org/g/dev/c/p6rP_WsxLS0/m/hQBX0modAwAJ?pli=1)
on the Urbit developer mailing list.

#### 10. When I spawn L2 planets via Metamask, I'm prompted to sign every transaction. Do you have plans to remedy this?

We realize this UX headache and are taking active steps to devise a more efficient transaction scheme. The new method will reduce the number of manual signatures needed for each spawned L2 planet. At the time of this FAQ's publication, we haven't publicized the release timing for the improvement. A provisional solution: set the star's spawn proxy to a custodied L2 planet secured via Master ticket and log in to Bridge as that planet to spawn invites.
