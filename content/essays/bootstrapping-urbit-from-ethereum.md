+++
title = "Bootstrapping Urbit from Ethereum"
date = 2017-09-20
description = "We've decided to launch Urbit's constitution as a system of Ethereum contracts."
aliases = ["/posts/essays/bootstrapping-urbit-from-ethereum", "/posts/bootstrapping-urbit-from-ethereum", "/blog/2017.9.20-bootstrapping-urbit-from-ethereum/", "/blog/2017.9-eth/"]
[extra]
author = "Curtis Yarvin + Galen Wolfe-Pauly"
ship = "~sorreg-namtyv + ~ravmel-ropdyl"
+++
*TL;DR:*

We've decided to launch Urbit's constitution as a system of Ethereum contracts.

We'll instantiate a land registry for Urbit address space; an ERC20 "spark"
token which is burned to create a generic star; and a voting system for
self-governance. We'll also create template contracts which galaxies can use to
auction stars, and stars to distribute planets.

## A bit of background

One thing we realized after the last sale was, 'oh hey, the network has been up
for about a year.'  Not bad!  It wasn't that long ago that we were rebooting the
universe every few weeks.  We still have plenty of work to do — but Urbit has
matured to the point where public ownership of the network really should be
cryptographically real.

But even when the servers stay up, Urbit is still a testnet and remains
centralized in practice.  We (Tlon) retain the ability to reset the network keys
at any time.  This just isn't very 2017.

In theory, Urbit doesn't need a blockchain, because real estate moves slowly.
In digital real estate, as opposed to digital currency, a low-friction,
zero-trust solution to the double-spend problem isn't an economic necessity.

In practice, though, we have a hard chicken-egg problem.  In the current design,
the key you use to secure your urbit is the same key that you use to sign your
network packets.  Abstractly, this is the right design -- you want one
definition of who owns an identity.

But concretely, since Urbit keys are valuable, you don't want to put them in an
operating system that isn't generally recognized as systematically secure.  It's
hard to achieve this status while you're a testnet.  So the virtuous cycle never
gets started.

Moving the Urbit land registry to Ethereum is an easy and obvious solution to
this problem.  If your urbit is owned by an offline Ethereum key, there's now a
mature ecosystem for protecting this property.  And its security doesn't depend
on the security of Urbit. So, we realized, maybe Urbit actually does need a
blockchain for its land registry.  While the system matures, we can bootstrap
off of Ethereum, without changing the design of the Urbit cryptosystem.

And best of all, you can get your Urbit star or planet entirely through the
blockchain, without interacting with any centralized database or payment
mechanism.  So we're really living in 2017.

Sounds good, right?

It does sound good.  Although, as usual, we care about making things that *work*
above all else.  So, rather than a 'announcing the Urbit token sale' post, this
is going to get fairly technical.  We want to start the discussion about how
this change is going to work, and how it's going to get implemented.  We'll save
the hype for later.

First, we'll walk through the costs and benefits of using Ethereum.  Then,
we'll refresh our memories on how the Urbit address space works, and finally
we'll walk through some of the details of how we plan on implementing this.
We've thought quite thoroughly about these things, but public criticism is
really important.

## Weighing the choice of Ethereum

Our engineering style is to build the whole stack, from axioms to UI, from
custom, super-minimal parts. When these parts don't fit perfectly, we rewrite
them until they do. With a few exceptions, such as crypto algorithms, Urbit
doesn't reuse existing code or designs, depend on existing tools, or expect
outside contributors to solve problems essential to a complete experience.

Instinctive minimalism is essential in a custom full stack. The best solution is
always to not solve the problem. The natural engineering response to the
pre-blockchain difficulty of solving Byzantine consensus agreement was: do we
really need it?

### The case against Ethereum

Since Urbit network address space is a land registry, not a currency,
transactions are low-frequency. A low-frequency transaction system can succeed
economically even if it has high friction. The double-spend problem, which
consensus computing solves, becomes easy or at least tractable given high
friction.

We reinvent the wheel if we have to, throw it away if we can. So depending on
Ethereum goes against all Urbit's instincts.

Let's enumerate the problems, as critically as we can:

And Ethereum's user experience is notorious; its governance is suspect and
unstable; its dilution rate is unconscionable; its dev environment is full of
bugs and misfeatures; in short, it's a classic MVP. It has only one real goal:
success. It seems to be doing pretty well with that.

We prefer [SLC](https://blog.asmartbear.com/slc.html) to MVP. Urbit under
construction is fun to play around in. But we certainly won't ask real users or
real developers to set foot in Urbit until their experience is truly simple,
lovable and complete. The original iPhone set the bar for this, and we'll get
as close as we can.

### The case for Ethereum

It's obvious that Urbit has a practical problem in deploying a self-hosted PKI.
When does the testnet become a realnet? You wouldn't put real, valuable keys in
your urbit, until you know the system is mature and secure.

But how does anyone know that Urbit is mature until more daring users have used
it with real, valuable keys? But who wants to be the first person to hop into
the box?

There is no clear way to bootstrap past the testnet phase. Except, well, reboot
Urbit onto an existing blockchain, with a tested and reasonably-secure
key-handling infrastructure, that can also validate the Urbit PKI rules. Then
each user can decide on their own whether sensitive data is safe in their own
urbit.

## An Urbit refresher

Maybe some people are here because they know what Ethereum is, but not so much
Urbit.

For those of you not familiar, let's try to refresh your memories.

### What Urbit is

One simple way to think about Urbit is as a "personal blockchain." Like a
blockchain, Urbit is a deterministic virtual computer. Its semantics are defined
by a frozen lifecycle function, which maps its event history to its current
state. But, unlike a blockchain, an Urbit instance is a private computer for one
user, not a public record for everyone.

Urbit's lifecycle function is a nano-interpreter called Nock. A typed functional
language, Hoon, compiles itself to Nock. An event-driven OS, Arvo, is written in
Hoon. Everything above Nock can upgrade itself over Urbit's own overlay packet
network, Ames. Ames is live and stable with test keys.

Our Urbit interpreter runs on any Unix machine. The Urbit server is a
single-level store -- both database and application engine. Every Urbit event is
a transaction. Urbit is semantically frozen and cannot call out to Unix.

Your Urbit instance is your personal server. Your urbit should eventually
contain and manage your whole digital life. You may compute at home or in the
cloud, based on your security/privacy tradeoff, but Urbit's formal semantics
makes ships trivial to migrate. You'll never be locked in to one computing
provider.

### The Urbit address space

An Urbit address is called a "ship." A ship is a network address, a
cryptographic identity, a pronounceable name, and a permanent memory. A ship's
name is just its numeric address, written in a syllabic base-256.

Smaller addresses mean shorter, more memorable ships. Ships are classified in a
hierarchy: 8-bit "galaxies" (like `~dyl`), 16-bit "stars," (`~ropdyl`), and
32-bit "planets" (`~ravmel-ropdyl`). Galaxies and stars are network
infrastructure. Regular users have planets. The tight 32-bit address space makes
names short enough to remember, and costly enough to deter Sybil attacks.

Planets are created by their prefix star; stars are created by their prefix
galaxy; galaxies were created by the founders. Parents assist their children,
providing essential services like peer-to-peer packet routing, but don't own or
control them. The prefix is just an initial default -- a ship can switch to any
parent that's willing to adopt it.

## Summary of the integration model

In the new integrated model, every planet, galaxy or star is owned by an
Ethereum address. The secret that controls this address is the ship's "master
key."

The master key is not needed to operate the ship and should not be stored on it,
at least not until Urbit is more mature. Master keys should be kept as "cold" as
possible. They are only used to perform lifecycle operations on your ship, by
signing Ethereum transactions which are sent to the Urbit constitution.

We'll fork an open-source Ethereum browser and add a custom UI for Urbit
transactions. New users will acquire their urbits entirely on the blockchain.

The most basic Urbit transaction is starting a ship you own. To start your ship,
you use Urbit to generate an Urbit keypair, and use Ethereum to register the
Urbit public key (a 512-bit pair of Curve25519 for encryption and Ed25519 for
signature) on the Ethereum blockchain.

For users who want to hold generic stars without starting or even selecting
specific ships, we'll create a divisible "spark" (USP) ERC20 token. A spark is
the right to create one star. Sparks are a convenience tool: they leverage the
mature ERC20 infrastructure for holding and trading token utility rights.

Instead of launching stars directly, galaxies can cede their unlaunched stars to
the Urbit constitution. The issuing galaxy receives one spark in exchange for
this star. Any Ethereum address can redeem one spark in exchange for the right
to start one star from the constitution's pool.

Once all the galaxies are created, Urbit is fully decentralized. We retain no
ownership powers over the Urbit constitution.

The Urbit galaxies will mirror the state of the constitution, distribute its
state and events within Urbit, and post any transactions created within Urbit.
Generally an Urbit ship trusts its parent -- if not, it should find a new one
fast. But a deeply paranoid ship can still listen to Ethereum directly.

## Contract designs

The Urbit constitution is four contracts: certificate storage, spark storage,
election storage, and logic controller.

Following Ethereum best practice, we'll use separate storage and logic
contracts. The logic contract is stateless, and can upgrade itself without
replacing the storage contracts.

We'll walk through how we have designed these contracts in detail here.  You can
also view our in-progress source at the
[`urbit/constitution` GitHub repo](https://github.com/urbit/constitution).

### Certificate storage contract

For every galaxy, star or planet, the certificate contract holds a current
state: `%latent`, `%locked`, `%liquid` or `%living`.

The default/empty state is `%latent` (nothing has happened to this ship). The
contract stores no data for a latent ship.

A `%locked` ship has an owner and an activation date. It cannot be activated
until the given date. Until activated, the locked ship can't be transferred,
vote, liquidate or launch children.

A `%liquid` ship is held by the Urbit constitution to be redeemed for a spark.
It has no other state.

A `%living` ship is active. Its state: an Ethereum address which owns it; an
Urbit public key; a revision number, which increments on any lifecycle
operation; and (for planets and stars) both current and requested (for escaping)
parent ships.

The certificate contract throws an event on every state change.

### Spark storage contract

The spark contract is a divisible ERC20 token (you can't hold half a star, but
you can hold half a spark). Only the logic contract can create and destroy
tokens.

### Governance storage contract

The governance contract records galaxies' votes on governance proposals.

There are two kinds of proposals: concrete and abstract. A concrete proposal is
the address of a new logic contract for the constitution. An abstract proposal
is the hash of a document.

Voting is one-bit -- the default vote is "no" -- and irreversible. A 256-bit
bitfield records the set of galaxies that have voted for each proposal.

Only active galaxies may vote. A counter records the number of active galaxies.
A proposal passes if more than 50% of active galaxies support it. If the
proposal is concrete, the old logic contract is terminated and the new one
receives storage control. Abstract proposals have no further effects on the
blockchain.

### Logic contract

The logic contract is stateless and supports the following ops:

#### Create a galaxy

What: move a galaxy from `%latent` to `%locked` state.

Who: the founders only.

Comments: this is the only founder-privileged operation.

#### Liquidate a star

What: move a specific star from `%latent` to `%liquid` state, granting one spark
to the galaxy owner.

Who: owner of the active galaxy which is the star's prefix.

#### Claim a star

What: move a specific star from `%liquid` to `%locked` state, with the
activation date set to the present, and the owner as claimer; remove one spark
from the owner.

Who: any Ethereum address which owns a spark.

#### Launch a star or planet

What: move a specific star or planet from `%latent` to `%locked` state, with the
activation date set to the present, and set the Ethereum address which owns the
ship.

Who: owner of the parent of the launched ship.

#### Start a ship

What: move a specific ship from `%locked` to `%living` state, setting its Urbit
public key.

Who: owner of the locked ship.

#### Transfer a ship

What: change the owner of a `%living` ship, also resetting the Urbit public key.

Who: current owner of the ship.

#### Rekey a ship

What: in a living ship, change the Urbit public key, without changing the
Ethereum address that owns the ship.

Who: owner of the ship.

#### Request adoption

What: in a living ship, set the requested-parent field.

Who: owner of the ship.

#### Accept adoption

What: in a living ship, set the current parent to the requested parent, and
clear the requested parent.

Who: owner of the requested parent.

#### Create a proposal

What: create a proposal, which is either the hash of a document (abstract) or
the address of a new logic contract (concrete).

Who: owner of any living galaxy.

#### Endorse a proposal

What: register support for a proposal. If the proposal is concrete and this
vote takes it over 50%, upgrade the contract.

Who: any galaxy who has not yet voted on this proposal.

### Planet sales and spark auctions

We'll also write contracts that help galaxies and stars distribute their stars
and planets.

#### An auction contract for spark sales

The ERC20 spark token creates a liquid market in stars, or rather star
precursors. But a galaxy liquidating sparks may not want to just sell a large
block into this market, which may have weak depth, especially when the token is
initially launched.

So we'll validate and deploy the Nick Johnson design for an
[off-chain second-price auction](https://www.reddit.com/r/ethereum/comments/6igsdq/a_proofofconcept_of_a_better_crowdsale_contract/)

To run an auction, the seller liquidates a block of stars, then transfers the
spark tokens to a seller-owned copy of the auction contract. The Urbit
constitution is not involved with the auction.

#### A distribution contract for planet sales

There is no generic token for planets. To start a planet, you need a star to
launch it with your Ethereum address as the owner.

To distribute planets on the blockchain, a star instantiates a private copy of
the planet sale contract. Since the star is the contract's owner, the contract
can send launch operations to the Urbit constitution.

The star owner configures the planet sale contract with two parameters: the
price in ether of a planet, and the number of planets available.

## Okay, so

That was quite a lot of information!  We've created a fora thread
[here](https://urbit.org/fora/posts/~2017.9.20..22.56.04..47ce~) for discussion,
and would be glad to hear your feedback.  GitHub issues on the
[urbit/constitution repo](https://github.com/urbit/constitution) are also more
than welcome.

There's a lot more to come on this front as our contracts get closer to getting
live, and we begin migrating toward an on-chain Urbit PKI.
