+++
title = "Layer 2 Overview"
weight = 5
template = "doc.html"
+++

This document provides technical details on Azimuth's "Layer 2" scaling solution
for Azimuth, known more formally as "naive rollups". We focus here primarily on the
"Hoon smart contract" located at `/lib/naive.hoon` in your ship's pier, as well
as other proximal topics.

This is intended for developers that desire a deeper understanding of how this
protocol works, how secure it is, and how to extract data from layer 2 to obtain
a complete picture of the Arvo network.

This is not intended for everyday users who only wish to know how
to either transfer their ship to layer 2 or perform layer 2 actions. This is a
functionality of [Bridge](https://bridge.urbit.org) for which documentation will
soon be available. For a casual overview of the
rationale and functionality of layer 2, please see this [blog
post](/blog/rollups). For more information on how Azimuth works more generally,
including interactions with Bridge and Ethereum, see the page on [Azimuth data flow](/docs/azimuth/flow).

This page is also not where to find instruction on how to run your own
"aggregator"/"roller". Documentation for this process is found
[here](/docs/azimuth/l2/roller-tutorial). However, this page does contain
essential background information for anybody in this category.

## Summary

Naive rollups were developed in response to rising gas costs for performing
Azimuth actions. They also serve the dual purpose of making onboarding easier,
as it is now possible to acquire a planet and get on Urbit without any knowledge
of Ethereum or cryptocurrency.

In this section we give a high-level summary of how naive rollups function and
how they affect the end user. Later sections elaborate on this summary.

### Layer 1

We briefly review how "Layer 1", i.e. the [Azimuth](/docs/glossary/azimuth) smart
contract suite, functions. An update to the Azimuth PKI data stored on your urbit
occurs with four steps:

1.  A transaction is posted to the Ethereum blockchain.
2.  The [Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/evm/)
    calculates the resulting state transition and checks its validity, then
    updates the state if it is a valid transition.
3.  Your urbit downloads the new state from an Ethereum node.
4.  Your urbit makes the final decision on whether the new state is valid.

By default, step four always succeeds. It has always been possible in theory for
your urbit to dispute what it read on Ethereum, but there has never been any
reason to do so.

### Layer 2 {#layer-2}

Layer 1 still functions identically today as it did before naive rollups. Naive
rollups work via the following process.

1.  A batch of one or more transactions is posted to the Ethereum blockchain by
    an urbit node called a roller or aggregator.
2.  Your urbit downloads the transactions from an Ethereum node.
3.  Your urbit computes the resulting state transitions from the transactions
    and checks them for validity.
4.  Your urbit updates its locally stored Azimuth state using state transitions
    from the batch that have been deemed valid.

In comparison with Layer 1, the EVM no longer checks the validity or computes
the state transitions for any given transaction. It is now being used solely as
a database of submitted transactions, and the business logic of computing what
these transactions mean has been offloaded to your urbit. Thus we think of
`naive.hoon` as being the first "Hoon smart contract". You could also consider
steps 3 and 4 of the Layer 2 process as being a fattening of the trivial step 4
of the layer 1 process.

Here we briefly elaborate on the layer 2 steps, but see below for more technical
detail.

A roller is any urbit node - even a moon, comet, or fakezod will do - to which
batches of transactions are submitted. You could use your own ship as a roller
if you wanted. The roller collects batches of transactions from whichever
parties they choose and submits them to the Ethereum blockchain all at once.
We expect this to either happen on a regular interval, or once some minimum
threshold of transactions is reached, but the decision on when to submit is
ultimately up to the roller.

Computing the resulting state transitions obtained from downloaded Ethereum
transactions is done using `/lib/naive.hoon`, which is a gate that accepts both layer
1 transaction logs and layer 2 batches, and then computes the resulting state
transitions and updates the ship's internal Azimuth data held in
the Gall agent `/app/azimuth.hoon` accordingly.

### Savings in gas costs

There are several dimensions by which naive rollups saves on gas over layer 1.
They are:

1.  Gas is not spent on instructing the EVM to compute state transitions and
    confirm validity.
2.  Layer 2 Azimuth state is not stored on Ethereum, so the only data storage
    gas costs is for the transactions themselves.
3.  Layer 2 transactions are written in a highly compressed form. E.g., instead
    of calling the spawn action by name, it is simply referred to as action `%1`.
4.  By collecting multiple layer 2 transactions and submitting them as a single
    "batch transaction", additional gas savings are achieved by not needing to
    duplicate information such as which smart contract the transactions are
    intended for.

Put together, these create a reduction in gas costs of at least 65x when adding
a transaction to a sufficiently large batch (approximately 30 or more
transactions). A single transaction submitted as a batch is approximately 5x
cheaper, while 10 transaction submitted as a batch is approximately 30x cheaper.
Thus using one's own ship to submit a single-transaction batch is still a
cost-saving measure.

### One way trip

Moving to layer 2 is a one-way trip for now. This means that once a ship moves
to layer 2, it cannot be moved back to layer 1. We believe it to be technically
possible to engineer a return trip, and expect that someday this will be the
case, but there are no plans to implement this in the near future.

## Interacting with L2

Layer 2 ships can perform the same actions on layer 2 that they could on
layer 1, but are no longer able to perform any layer 1 actions. Layer 1 ships
can also perform a subset of layer 2 actions - namely the ones related to
sponsorship.

For a complete list of what layer 2 actions each ship rank, layer, and proxy can
perform, see [Layer 2 Actions](/docs/azimuth/l2/l2-actions). For an explicit
description of the byte format of Layer 2 Ethereum transaction, see [Bytestring format](/docs/azimuth/l2/bytestring).

### Sponsorship {#sponsorship}

Due to the possibility of sponsors and sponsees existing on different layers,
the precise logic of how sponsorship works is complex. However, under common
circumstances it is simple.

If either the sponsor or sponsee are on layer 2, then sponsorship actions must
occur on layer 2. The only exception to this is detaching. A sponsor on layer 1
may perform a layer 1 detach action on a layer 2 sponsee, and this will result
in the sponsee having no sponsor on layer 1, and layer 2 as well if they were
the sponsor on layer 2. This is necessary to simplify the logic, but it also
guarantees that there is no hard requirement to ever utilize layer 2. Without
this exception, sponsors with sponsees that move to layer 2 would be forced to
detach them as a layer 2 action if they wanted to cease sponsorship. This would
also have an unacceptable impact on ships owned by [smart contracts](#smart-contracts).

If both sponsor and sponsee are on layer 1 then sponsorship actions may occur on
either layer. As long as all sponsorship actions betweeen the two parties occur
on a single layer, behavior will be as expected.

In most cases this is sufficient to understand how sponsorship works. However
there are a number of edge cases that make this more complicated that developers
may need to concern themselves with in scenarios where layer 1 sponsor and
sponsees are mixing layer 1 and layer 2 actions. In the [Sponsorship state
transitions](#sponsorship-state-transitions) section below, we give a table that
shows how the sponsor and escape status of a ship changes according to which
actions are taken.

### Smart contracts {#smart-contracts}

Smart contracts are unable to own layer 2 ships, and thus cannot sign layer 2
transactions. This creates a hard requirement that layer 1 ships be allowed to
perform a layer 1 detach operation on a layer 2 ships.

## Azimuth state {#state}

The introduction of layer 2 presents additional complication in understanding
Azimuth state. In order to be precise we define the following terminology:

- _Layer 1 Azimuth state_ refers to the state of Azimuth as reflected on the
  Ethereum blockchain. This excludes all layer 2 transactions. Depositing to
  layer 2 is considered a layer 1 action, so the layer 1 Azimuth state is aware
  of which ships are on layer 2, but is blind to everything that happens to
  them afterward.
- _Layer 2 Azimuth state_ refers to the state of Azimuth as stored in
  `/app/azimuth.hoon` on your ship. The state here takes into account
  transactions that occur on both layers. No distinction between the
  layers is made in the state here - e.g. a ship only has one sponsor in Layer 2
  Azimuth state, not a layer 1 sponsor and a layer 2 sponsor. This is the state
  actually in use by Urbit. Layer 1 Azimuth state is now only an input for
  generating Layer 2 Azimuth state, so any time a ship needs to check e.g. the
  public key of a ship (regardless of which layer it is on), it will check the
  Layer 2 Azimuth state, not the Layer 1 Azimuth state.
- _Layer-2-Only Azimuth state_ refers to the state of Azimuth as reflected
  solely by layer 2 transactions. This state is not explicitly stored anywhere,
  but is computed as part of the process to create the Layer 2 Azimuth state.
  We do not make any further references to this state, but it is important to
  keep in mind conceptually.

Layer 1 Azimuth state is computed by the Ethereum Virtual Machine. Layer 2
Azimuth state is computed by taking in the Layer 1 Azimuth state and modifying
it according to layer 2 transactions using `/lib/naive.hoon`. When we are being
precise about which state we are referring to we will utilize capitalization as above.

Layer 2 Azimuth state is held by the Azimuth Gall app located at
`/lib/azimuth.hoon`. Layer 1 and layer 2 state are not held separately - your
ship holds only one canonical Azimuth state, generated by parsing both layer 1
and layer 2 Ethereum transactions using `/lib/naive.hoon`. It is important to
keep in mind that Layer 1 Azimuth state is entirely unaware of Layer 2 Azimuth
state. Thus, for instance, the Azimuth PKI on Ethereum (Layer 1 Azimuth state)
may claim that the sponsor of `~sampel-palnet` is `~marzod`, while the Azimuth
state held on your ship (Layer 2 Azimuth state) claims that the sponsor of
`~sampel-palnet` is `~dopzod`. Under this circumstance, this would mean that the
sponsor of `~sampel-palnet` was `~marzod` before `~sampel-palnet` was deposited
to layer 2, and thus the Azimuth PKI on Ethereum will forever reflect this.

For more information on how Azimuth state is handled, including how this
integrates with Bridge and Ethereum, see [Azimuth data flow](/docs/azimuth/flow).

### Sponsorship state transitions

When either a sponsor or sponsee is on layer 2, then all sponsorship actions
occur on layer 2 and layer 1 Azimuth state is ignored. The exception to this, as
noted [above](#sponsorship), is when a layer 1 sponsor performs a layer 1 detach
action on a layer 2 sponsee. Furthermore, any time a ship moves from layer 1 to
layer 2, its sponsorship status is automatically maintained in layer 2.

The only potentially complicated scenario is when both sponsee and (potential)
sponsor exist on layer 1. Then because layer 1 actions can modify layer 2 state,
careful consideration is required for interactions that mix the two. If you
and your sponsor/sponsee are not mixing layer 1 and layer 2 sponsorship actions
between yourselves, then you have nothing to worry about and may safely ignore this
section.

But, for instance, if both `~sampel-palnet` and `~dopzod` are on layer 1, it is
technically possible for `~sampel-palnet` to escape to `~dopzod` on layer 1, and
then `~dopzod` can accept the escape on layer 2. This will result in `~dopzod`
appearing as the sponsor in the Layer 2 Azimuth state (and thus be
`~sampel-palnet`'s "true" sponsor), and the sponsor in the Layer 1 Azimuth state
will remain unchanged. While it is difficult to imagine a good reason to do
this, developers working with layer 2 need to keep in mind these edge cases and
ought to read on.

In the following table, columns `E_1` and `S_1` represent the escape status and
sponsor of a given ship as reflected by the Layer 1 Azimuth state. Columns `E_2`
and `S_2` represent the escape status and sponsor of a given ship as reflected
in the Layer 2 Azimuth State. The "true" escape status and sponsor of a ship is
always what is listed in the Layer 2 Azimuth state. In other words, at the end
of the day, `S_2` is always the sponsor that matters, but layer 1 actions can
affect the values of `E_2` and `S_2`.

A tar `*` entry represents any value and if an event shows a transition
from `*` to `*` that means that value is not altered by the transition. The
transitions marked with `!!` are prohibited by the layer 1 Azimuth smart
contract and thus never occur. `A1` and `A2` represent two distinct ships.

```
Event        | E_1 | E_2 | S_1 | S_2 | -> | E_1 | E_2 | S_1 | S_2
L1-escape A1 | *   | *   | *   | *   | -> | A1  | A1  | *   | *
L1-cancel A1 | ~   | *   | *   | *   | -> !! :: no cancel if not escaping
L1-cancel A1 | A1  | *   | *   | *   | -> | ~   | ~   | *   | *
L1-adopt  A1 | A1  | *   | *   | *   | -> | ~   | ~   | A1  | A2
L1-adopt  A1 | ~   | *   | *   | *   | -> !! :: no adopt if not escaping
L1-adopt  A1 | A2  | *   | *   | *   | -> !! :: no adopt if not escaping
L1-detach A1 | *   | *   | A1  | A1  | -> | *   | *   | ~   | ~
L1-detach A1 | *   | *   | A1  | A2  | -> | *   | *   | ~   | A2
L1-detach A1 | *   | *   | A1  | ~   | -> | *   | *   | ~   | ~
L2-escape A1 | *   | *   | *   | *   | -> | *   | A1  | *   | *
L2-cancel A1 | *   | *   | *   | *   | -> | *   | ~   | *   | *
L2-adopt  A1 | *   | A1  | *   | *   | -> | *   | ~   | *   | A1
L2-adopt  A1 | *   | A2  | *   | *   | -> | *   | A2  | *   | *
L2-adopt  A1 | *   | ~   | *   | *   | -> | *   | ~   | *   | *
L2-reject A1 | *   | A1  | *   | *   | -> | *   | ~   | *   | *
L2-reject A1 | *   | A2  | *   | *   | -> | *   | A2  | *   | *
L2-reject A1 | *   | ~   | *   | *   | -> | *   | ~   | *   | *
L2-detach A1 | *   | *   | *   | A1  | -> | *   | *   | *   | ~
L2-detach A1 | *   | *   | *   | A2  | -> | *   | *   | *   | A2
L2-detach A1 | *   | *   | *   | ~   | -> | *   | *   | *   | ~
```

## Aggregators

An "aggregator" or "roller" is any Urbit node that collects signed layer 2
transactions (typically via `/app/azimuth-rpc.hoon`), combines them into a
"batch", and then submits the batch as an Ethereum transaction. Any urbit can be
a roller, including moons, comets, and even fakezods. You can also use your own
ship as a roller.

Tlon has set up our own roller that is free to use by the community. Using
Bridge, a ship may submit X transactions to Tlon's roller per Y period free of
charge. Tlon's roller submits on a regular schedule: a submission occurs when a
total of A layer 2 transactions have been submitted to it since the the previous
submitted Ethereum transaction, or every Z time, whichever occurs first.

There are no security risks in utilizing an aggregator. The transactions you
submit to it are signed with your private key, and so if an aggregator alters
them the signature will no longer match and `naive.hoon` will reject it as an
invalid transaction. The worst an aggregator can do is not submit your transaction.

## Multi-keyfiles

As part of the layer 2 upgrade, Tlon has expanded the role of
[keyfiles](/docs/glossary/keyfile). One of our goals with layer 2 was to reduce
the amount of friction experienced when getting onto Urbit. The enormous
reduction in fees has made a new boot method which allows instantaneous sale of
layer 2 planets or stars to be cost effective.

The ideal situation would be for the end user to be able to buy or receive a
planet and immediately boot it without having to wait for an aggregator to
submit a transaction that spawns the planet. In order to bring about this
circumstance, "multi-keyfiles" have been introduced.

Multi-keyfiles are keyfiles used to boot an urbit for first time that contains
more than one set of keys, the purpose of which is to initially utilize one set
of keys on a temporary basis, and then the other set of keys soon after. This
works as follows. A star owner prespawns a number of layer 2 planets ready to be
sold at any time for which they posess the initial key. When a user acquires a
planet from a star owner, the star owner immediately hands the initial keys to
boot the planet to the buyer. The buyer then queues a transaction at a roller to
rotate the keys to a new value only known by the buyer (this step is performed
automatically by Bridge). The buyer then downloads a keyfile from Bridge
containing both keys and uses that to boot their planet for the first time.
After the transaction setting the new keys is submitted by the roller to
Ethereum, the purchased planet will automatically switch to them once it reads
the corresponding transaction from Ethereum.

This process introduces a short period of time in which both the buyer and
seller are in possession of the keys of a planet. A malicious seller could
theoretically sell a planet to more than one party in this time period. However,
they would quickly be found out as two identical ships on the network
immediately creates problems, and the seller's reputation would be tarnished.
Due to the expense or effort needed to acquire a star, this seems an unlikely
scenario as the reward is much less than the cost. Nonetheless, buyers should
always make an effort to purchase from a reputable star, as is the case with all
transactions in life. If you want to be absolutely sure that you've received the
planet, just wait for the batch to be sent and confirmed.

Multi-keyfiles were possible before layer 2, but as the cost of configuring keys
was comparable to the cost of buying a planet, they were not practical.

## Security measures

In the process of designing naive rollups, we felt it to be of the utmost
importance that there not be any loss in the security of a layer 2 ship over a
layer 1 ship. In this section we outline several relevant facets of Urbit as
well as particular measures that were taken to ensure that naive rollups were
free of bugs and exploits. We think of `naive.hoon` as being the first "Hoon
smart contract", and thus its functionality needs to be as rock-solid and
guaranteed as the Azimuth Ethereum smart contracts.

### Arvo is deterministic

Crucial to the functionality of Ethereum smart contracts is that they work the
same way every time since the Ethereum Virtual Machine is deterministic.
Similarly, as the state of Arvo is evolved via [a single pure
function](/docs/arvo/overview#an-operating-function), Arvo is deterministic as
well. This property makes it well-suited for cases where side effects are
unacceptable such as smart contracts, and thus `naive.hoon` is worthy of the
name "Hoon smart contract".

### Restricted standard library

A standard security practice is to reduce the surface area of attack to be as
minimal as possible. One common source of exploits among all programming
languages are issues with the standard library of functions, and this is one factor
that leads to the existence of multiple implementations of standard library functions for
a given programming language. For instance, `glibc` is the most widely used
standard library for the C programming language, but sheer size gives a large
surface area in which to find exploits. Thus, other standard libraries have been
written such as `musl` that are much smaller, and some argue to be more secure
at least partially due to fewer lines of code. Hoon is not yet popular enough to have
multiple standard library implementations, but `naive.hoon` shucks the usual
standard library and so its subject contains only the exact standard library
functions needed for it to function. This library is known as `tiny` and is
found at `/lib/tiny.hoon`.

### Unit tests

`naive.hoon` is among the most well-tested software in Urbit. The test suite,
which may be run with `-test %/lib/tests/naive ~` from dojo, is larger than any
other test suite both in number of lines of code and number of tests. We believe
branch coverage to be at or very close to 100%

### Nonces

In the Layer 2 Azimuth state, each proxy belonging to a given ship (including
the ownership "proxy") has a non-negative integer associated to it called a
"nonce". Each transaction submitted by a given proxy also have a nonce value. If
the current nonce of a proxy in the Layer 2 Azimuth state is `n`, then only a
transaction from that proxy with a nonce of `n+1` will be considered valid.
Otherwise the transaction is discarded. A valid transaction, by which we
mean one in which the nonce and signature are correct, will increment the nonce
of the proxy in the Layer 2 Azimuth state by one once processed by `naive.hoon`.
Note that "valid transactions" also include ones where the action will fail,
such as a planet attempting to `%spawn` another planet. For the purposes of
incrementing the nonce, only the nonce and signature matter.

The use of nonces prevents "replay attacks", which is when a malicious party collects
valid transactions and attempts to resubmit them in order to perform the action
again. Since a valid transaction increments the nonce associated to the proxy
that submitted it, it is only ever possible for a given transaction to alter the
Layer 2 Azimuth state once.

The use of nonces also eliminates potential issues caused by submitting a
transaction to more than one roller. This might happen if the first roller
submitted to is taking too long for your liking, and you want to try again with
another. If both rollers end up submitting the transaction, only the first one
will succeed, as the second one will be ignored by `naive.hoon` for having the
wrong nonce.
