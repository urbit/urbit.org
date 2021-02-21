+++
title = "Urbit and the Blockchain Wars"
date = 2017-09-25
description = "A bit about the 'idea maze' of choosing to bootstrap from Ethereum."
aliases = ["/posts/essays/urbit-and-the-blockchain", "/posts/urbit-and-the-blockchain", "/blog/2017.9-critique/"]
[extra]
author = "Curtis Yarvin"
ship = "~sorreg-namtyv"
image = "https://storage.googleapis.com/media.urbit.org/site/posts/essays/urbit-and-the-blockchain-1.jpg"
+++

![](https://storage.googleapis.com/media.urbit.org/site/posts/essays/urbit-and-the-blockchain-1.jpg)

One core principle of the Urbit network is that *Urbit doesn't take sides*.
This is true in all kinds of conflicts -- and especially blockchain wars.

We're [moving the Urbit PKI onto Ethereum](https://urbit.org/blog/2017.9.20-bootstrapping-urbit-from-ethereum/)
not because we like Ethereum, but because it's the most practical thing for
Urbit right now.  This is not a moral or aesthetic choice.

Some have objected to this decision.  Some of these objections are excellent.
The rest are understandable.

Let's review our decision, responding to objections along the way.  Not everyone
has to agree on everything.  No one should stay confused.  And we welcome
further comment.

## Urbit is not endorsing or supporting Ethereum

There are many technical criticisms of Ethereum.  We agree with many of these
criticisms -- even most.  But still more important: Bitcoin is the strongest
chain.  If Bitcoin could directly enforce Urbit's PKI rules, we'd use Bitcoin,
for this reason alone.  (That said, Ethereum may be less exposed to Chinese
politics.)

We chose ETH because it is the strongest *computational* chain.  It is certainly
stronger than the way we're storing the Urbit land registry now: GitHub, plus
internal records.

Urbit is not endorsing Ethereum.  Urbit is not creating any appreciable monetary
demand for Ethereum.  Urbit is not even locked in to Ethereum: with a fully
self-governing constitution, the Urbit galaxies can decide to migrate to another
consensus engine, or no consensus engine, or even our own consensus engine, any
time we like.

And even if the whole Ethereum network unexpectedly implodes, and stops
generating meaningful new blocks, we (or more generally: the set of active
Urbit galaxies) cannot abandon the social power to manually hard-fork the
network.  Ultimately, the Ethereum contract is just a hardcoded address in a
piece of Urbit source code.

Let's address each of these points at a little more length.

## On moving to a blockchain

The first point to remember: our choice wasn't between Ethereum and nothing.  It
wasn't between a blockchain and nothing.  It was a choice between 21st-century
tools and 20th-century tools.

The current Urbit land registry is divided into parts stored in various places:
GitHub commits, database records held by Tlon Corporation, and insecure keys on
a test network.  This might have been fine, for us, in 2015.  In 2017, it's
borderline unacceptable.

## On choosing a chain

Our first decision point: whether the public chain enforces the rules of Urbit,
or just logs raw data that anyone can interpret.

The simplest procedure, with the strongest blockchain, would be just to encode
each Urbit event as raw (OP_RETURN) data on the Bitcoin blockchain.  Or we could
use another simple layer on top of Bitcoin; classic "colored coins," for
instance.

The resemblance between Urbit land-registry titles and colored coins is one we
noticed a long time ago, of course.  For a long time it wasn't that relevant,
because colored coins remained largely theoretical.

The larger problem is just that a non-computational blockchain can't enforce the
specific rules of the Urbit land registry (like the right of a star to create
specific planets).

You can put arbitrary data into a blockchain and enforce it off-chain.  This
strikes us as unsatisfactory, though.  For instance, you have to define the
semantics of erroneous or malformed operations.  If this is not done perfectly,
it's a short road to major weirdness.  Also, your interpretation tools are a
special-purpose one-off not shared with anyone.

There are other second-order "virtualchains" (Blockstack is one example), which
build computation layers on top of arbitrary chains. These tools are interesting
and cool.  They are also quite young.  As is Urbit, so we need all the maturity
we can get.

Also, our use case, as a land registry, is quite simple -- we don't have any
desire to pay (in complexity) for power we don't use.  A two-layer solution
just seems to leave more room for bad weirdness.

## As normal Urbit state?

The original design was for Urbit to host its own primary copy of the PKI state,
not mirror some external master.

As more people start believing in Urbit, this makes us extremely nervous.  Being
the single source of truth implies a strong commitment to security and
continuity.  Urbit needs to get there, but it isn't there yet.

Trust in the security, continuity, and general maturity of Urbit needs to
develop gradually.  An Urbit that isn't ready to store crypto-assets can still
be a great product.  But it can't be a great product if its supposedly valuable
keys are in fact insecure, yet needed to operate on the network.

In short: we can't follow this original plan.  It has the same chicken-egg
problem we discussed [last time](https://urbit.org/blog/2017.9.20-bootstrapping-urbit-from-ethereum/).

## An Urbit consensus engine?

Urbit is itself a deterministic computer.  Building a consensus computer within
Urbit, which is actually a general-purpose OS, is an attractive long-term
possibility.

But Urbit lacks the principal feature of Ethereum: deterministic performance.
In both Ethereum and Urbit, the semantics of a computation are precisely
defined.  In Ethereum, the computation's cost is also precisely defined.

This would be quite hard to do in Urbit.  We traded deterministic performance
off for semantic simplicity.  Designing a consensus computer without a
performance definition is a research problem.

We have solved a number of research problems here at Urbit.  Could we build an
Urbit blockchain?  This problem doesn't seem utterly intractable.  For instance,
we could leverage the semi-trusted hierarchy in some direction resembling proof
of stake.

One thing is certain, though: research problems don't solve themselves
overnight.  If you have any ideas on this one, give us a holler.

In any case, if Urbit got its own consensus engine, it's obvious that we'd
simply copy the state of the Urbit PKI on Ethereum, and shut it down.  Or we
could migrate to another computational blockchain which works better than
Ethereum.

## An existing computational blockchain

So we need an existing, mature, computational blockchain.  There are only two
major candidates: ETH and ETC (Ethereum Classic).

It's no secret that we prefer the governance model of ETC.  It's also no secret
that the whole Ethereum system, especially Solidity, isn't exactly put together
in the way we would do it.

But an optimal governance model is just one virtue among many others we need to
consider.  ETH's network capitalization is 25x that of ETC.  Its hashrate is 15x.
Its tooling support -- in software, hardware, vaulting, exchanging, etc -- is
considerably stronger.

ETC's governance model is Bitcoin's: code is law.  For the network, this is
better.  But we are considering threats to Urbit, not threats to the rest of
Ethereum.

ETH has embraced discretionary human governance.  It's quite plausible that this
will lead to total political collapse.  But the human political structure of ETH
seems reasonably strong at the moment.  It's relatively difficult to imagine
successful, near-term "proof of Vitalik" attacks via Ethereum on Urbit.  Political
conflict tends to develop over longer periods of time, giving us room to migrate.

Ultimately we decided that the minority power of ETC outweighs the governance
issues with ETH.  This is of course how imperfect standards win.  Betamax had
better resolution than VHS.

## One reminder

For Bitcoin maximalists in particular (some of our best friends are Bitcoin
maximalists), it's important to note that (besides the gas price of
transactions) putting Urbit on Ethereum *does not create any net monetary demand
for Ethereum*.

Yes, you will get an Urbit ship through an Ethereum transaction.  However, no
value stays in ether.  If you want to buy a ship with bitcoin, you are just
going through a conversion layer.  These conversion layers work pretty well
these days.  If you have a religious objection to handling altcoins, have a
friend help.

Bitcoin maximalists understand that all monetary energy should concentrate in a
single currency.  But land isn't money.  And the technical details of the
implementation of the Urbit registry -- whether `OP_RETURN`, Ethereum, or GitHub
-- have no effect on Bitcoin supply and demand.

## Another reminder

Ethereum is not using Urbit.  Urbit is using Ethereum.  We know every cool
alternative band that gets signed to a major label says this, but we mean it.

Urbit, as a land registry, is almost a textbook example of very weak, boring use
of a computational blockchain.  We're not expecting a lot out of Ethereum.
Ethereum does not feel like a system whose technical envelope should be pushed.
We have no intention of pushing it.

Moreover, the ability to vote formally in an Ethereum constitution will allow us
to migrate in a cohesive way to *any other formalization of the Urbit PKI*.
This could be another Ethereum contract.  Or another blockchain.

This "clean escape" implies that Ethereum is still operating normally, or at
least normally enough to conduct a galaxy vote.  What could happen to Ethereum?
The blockchain could stop generating new blocks; it could fork; it could be
filtered by some kind of collective attacker; it could even start accepting invalid transactions.  What seems implausible is destruction of all copies of the whole chain.

When Ethereum ceases to be functional or trustworthy for any reason, a "dirty
escape" becomes necessary.  The galaxy operators need to identify the last point
in the Ethereum chain at which the Urbit constitution remains valid, copy that
data to the new primary record, and resume from there.

But unlike other blockchains that have wrestled with human-centric governance,
Urbit still has a formal procedure for making this decision.  With the Ethereum
chain compromised, we no longer have an automated system that implements the
rules.  The rules remain, though.  Humans have spent thousands of years
following non-automated rules.

Basically, we're just using ETH as a self-validating ownership record.  So long
as the chain isn't destroyed and owners retain their secrets, Urbit retains the
power to migrate to any record that works better.

## And one literally constructive criticism

One excellent criticism (credited to `@sorpaas`) is that just having the Urbit
galaxies mirror the state of Urbit's Ethereum constitution is insufficient.
This design gives Urbit nodes a choice: either mirror the whole Ethereum
blockchain (which is ginormous and certainly not shrinking), or don't validate
the Urbit PKI at all.

In Urbit, if your parent galaxy is sending you fraudulent reports about the
blockchain (any blockchain), you have a very serious problem which goes way
past blockchains.  It's time to switch galaxies.

The trust relationship between an urbit and its parent is like the trust
relationship between you and a gas station.  For all you know, what's coming
out of the hose could be Welch's grape juice.  But why have you never, ever worried about cheap surplus vegetable products destroying your engine?

ExxonMobil has no business motivation to ruin its customers' engines.  If it
did, it would just destroy its business, and gain… what?  If you don't have an
attack motivation, you don't have a threat model.  If you don't have a threat
model, you don't have a threat.  This is why we don't tend to worry about
"parent attacks" in Urbit.

But that said: there's no reason not to make Urbit's cryptographic structure as
strong as possible.  If you don't want to trust your gas station -- you
shouldn't have to.  We don't need to eliminate reliance on trust.  We do prefer
to *minimize* it.

Therefore, the Urbit Ethereum mirror needs to track all the Ethereum
transactions that touch the Urbit constitution, and propagate these raw
transactions into Urbit.  Urbit nodes can check the transactions and their
signatures themselves, without relying on Ethereum.  Then, anyone in Urbit can
validate the Urbit PKI without an Ethereum node.

(We don't anticipate running a node *in* Urbit, eg an EVM in Hoon -- for now,
galaxies will just RPC to a local Unix node.)

## And in closing

We appreciate everyone's feedback and hope no one remains confused.

We're happy to address any remaining concerns -- and happier still if someone
finds a mistake on our end.  If you have a good counterargument, now is better
than later!

Fora thread for discussion is here:
[urbit.org/fora/posts/~2017.9.25..20.34.38..8e27~](https://urbit.org/fora/posts/~2017.9.25..20.34.38..8e27~).
