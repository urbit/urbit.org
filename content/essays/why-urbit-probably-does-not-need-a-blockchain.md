+++
title = "Why Urbit Probably Doesn't Need a Blockchain"
date = 2016-07-14
description = "Urbit (probably) doesn't need a blockchain, because the Urbit address-space PKI is a special case of a consensus ledger."
aliases = ["/posts/essays/why-urbit-probably-does-not-need-a-blockchain/", "/posts/why-urbit-probably-does-not-need-a-blockchain/"]
[extra]
author = "Curtis Yarvin"
ship = "~sorreg-namtyv"
+++
![](https://media.urbit.org/site/blog-1.jpg)

TLDR: Urbit (probably) doesn't need a blockchain, because the Urbit
address-space PKI is a special case of a consensus ledger (itself a
special case of Byzantine agreement).

Special cases are often easier to solve than general problems. The
"New Jersey" or "worse-is-better" school of systems design emphasizes
solving any problem with the weakest possible tools.

## The worse-is-better school

Culturally, Urbit is best described as a functional stack built in the
"New Jersey" school of system software design, as described in Richard
Gabriel's famous
["worse is better"](https://en.wikipedia.org/wiki/Worse_is_better) essay.

There are two kinds of mindsets when approaching hard technical
problems.  The "MIT" mindset, more typical among mathematicians and
scientists, wants to attack the problem as its simplest and broadest
case, producing the most general and powerful solution available.  In
short: better-is-better.

The "New Jersey" worse-is-better mentality, more typical among
programmers and engineers, wants to do everything possible to _not_
attack the problem.  Can I produce a serviceable approximation to a
true solution?  Do I actually have to solve the general problem, or
can I reduce it to an easier special case?  Can I change the product
so it doesn't have this problem?

Ideally, anyone building anything has both these mindsets in their
toolbox.  But it's worth noting that (a) Jersey designs (meaning the
Bell Labs school that produced Unix, C, and Go) tend to beat MIT
designs in the marketplace, and (b) there are very few pure-functional
systems built with the true Jersey spirit.

## Why Urbit (probably) doesn't need a blockchain

Nakamoto consensus is an example of better-is-better.  The blockchain
design is actually more powerful than it needs to be. It's not just a
trustless decentralized ledger; it's a trustless decentralized
database and (as Ethereum has realized; but this idea is clearly
present in Bitcoin's scripting language) a general-purpose, zero-trust
decentralized computer.

Again, Urbit is not a general-purpose decentralized database or
consensus computer.  It's a special case of the former, which is a
special case of the latter.  Urbit is nothing but a digital title
chain for network addresses.  Our belief is that the special case is
much easier than the general case, which is why Urbit (probably)
doesn't need a blockchain.

The rest of this essay describes what makes this special case special,
and how we can use that to not need full Nakamoto  consensus, or any
kind of general-purpose Byzantine agreement.

## The double-sell problem

Urbit has the same basic "double-spend" issue as Bitcoin.  As Satoshi
puts it: "The problem of course is the payee can't verify that one of
the owners did not double-spend the coin." But Urbit is not a
currency, so we say "double-selling."

"Double-selling" means signing over an Urbit address (_ship_) to  two
different parties at the same time, presumably with the intent to sell
it to both and skip town with the loot.

Again, the logical problem is the same.  Bitcoin attacks it as a broad
theoretical breakthrough: better-is-better.  Urbit attacks it as a
narrow special case: worse-is-better.

Intuitively, Urbit's answer is that a real-estate transaction is
substantively a very different thing from a credit-card payment. No
real-estate agent ever has ever leaned over the desk, quickly grabbed
_both_ the check and the keys, and run laughing out the door.

To understand more rigorously how Urbit is a special case, let's take
a quick look at the Urbit address space and PKI.

## The Urbit address space and PKI

(NB: this description differs in minor ways from the running code.
Where they differ, the description is right.  Urbit is not at present
secure: use for entertainment purpose only.)

An Urbit ship is an unsigned integer that serves four purposes: a
cryptographic identity, a packet routing address, a stateful virtual
computer, and a unique, human-memorable name.

Each ship is owned by a private key.  To transfer a ship to a new
keypair, sign the new public key with the old private key.  This
revokes the old key and activates the new key.  Propagating this
update globally makes the revocation global.  This is essentially the
digital title system a smart 12-year-old would design.

### Ships and wills

Ships are 128-bit numbers classified into tiers by bitwidth.  An 8-bit
ship (a number less than 256) is a _galaxy_.  A 16-bit ship is a
_star_.  A 32-bit ship is a _planet_.  A 64-bit ship is a _moon_.  A
128-bit ship is a _comet_.

The chain of signatures for each ship is called a _will_.  Unlike most
certificate systems, there is no metadata in an Urbit will. Nothing is
signed but the public-key fingerprint.  The length of the will is the
keypair version that owns the ship.  This version is called its
_life_.  Each new signed fingerprint in the will is a _deed_.

Who gets to create a ship?  Comets are fingerprints of a random
keypair.  Moons, planets and stars are created by their _prefix_,  the
ship whose bits are the bottom half of their formal width. For
instance, the star `0xbeef` is the prefix of the planet `0xdeadbeef`.
Galaxies have their fingerprints hardcoded in the official kernel.

Ship numbers are not generally written in hex.  They're written in
Hoon's `@p` syntax, a phonemic base-256.  `@p` also permutes within
tiers, to superficially conceal prefix structure; for instance,
`0xdead.beef` is `~firbyr-napbes`, while `0xcafe.beef` is
`~nissep-sopnub`.

### Parent hierarchy

The prefix of a moon, planet, or star also becomes its _parent_. The
parent of a ship is its natural locus of federated services. The most
basic such service is to mediate P2P routing, as a so-called
"supernode."  But the set of potential federated services is
unbounded.

For moons, each new key update is signed by the parent.  Planets and
stars sign their own updates, making them independent.  To prevent
denial-of-service attacks by parents against children, stars and
planets can _exit_, choosing a new parent.  An exit deed is a key
update also signed by the new parent.

The full public cryptographic record of a ship is its _dossier_. The
dossier is the set of ship-will pairs, including all parents and
prefixes recursively, needed to validate the ship's current key.  A
ship can process a dossier from an untrusted source.

The full set of ship-will pairs a ship knows is its _cabinet_. So the
crucial question for PKI propagation is whether a submitted dossier is
accepted into a ship's cabinet.

### Propagation race

The rule is simple: any deeds in the dossier which are new (not
already in the cabinet) must not use keys superseded in the cabinet.
Otherwise revocation doesn't work.  But revocation affects only
dossiers received in the future; nothing already in the cabinet can be
revoked.

Intuitively, this algorithm creates a propagation race.  Life `2` of
`~firbyr-napbes` revokes life `1` of `~firbyr-napbes`, so propagating
life `2` to the whole network ensures that anyone who steals the
private key for life `1` can't use it in any way -- whether to launch
children, or to sign a new, bogus life `2`.

## Solving the special case

So how can we solve the double-sell problem, for the special case of
the system designed above?

### Double-spend relaying in Bitcoin

The first thing we need to notice about our special case is that _even
Bitcoin_, not considered as a general consensus problem but just as a
decentralized payment rail, isn't that far from _not_ needing a
blockchain.

As the Karame ["Two Bitcoins at the Price of
One"](http://eprint.iacr.org/2012/248.pdf) paper points out:

> An efficient countermeasure to combat double-spending on fast
  Bitcoin payments would be for Bitcoin peers to propagate alerts
  whenever they receive two or more transactions that share common
  inputs and different outputs.

"Fast Bitcoin payments" means zero-confirmation, ie, Bitcoin without
the blockchain.  These double-spend alerts have never been integrated
into Bitcoin Core, despite frequent proposals. Given that Bitcoin
_does_ have a blockchain, it seems quite sensible for purists to shun
hacks that make zero-conf transactions somewhat more secure.  Also,
double-spend alerts in Bitcoin are a DoS vulnerability; Bitcoin has
fees to control the cost of propagating transactions, but who pays for
an alert?

In principle, however, we could imagine a version of Bitcoin without a
blockchain, in which the mempool was the ledger, and there was an
alerting and/or conflict model to detect and resolve double spends.
An accepted transaction is simply one that propagates to one or more
randomly chosen observer nodes.

This design, for the problem that Bitcoin is solving, intuitively
feels weak and a little hacky.  The Karame paper is not actually
advocating for removing the blockchain from Bitcoin.  At the same
time, low-value zero-confirmation payments are commonly used.

One way to think about security is to flip the tables and think of the
defender as the attacker, and vice versa.  Just imagine you have some
moral right to double spend.  The rest of the world is unfairly trying
to stop you.  Can you defend yourself?

In the context of a gossip network that shares all the things, a
procedure that involves telling one person one thing, and another
person another conflicting thing, and not getting "hacked" by the
unfair world which believes there should be only one truth, is
inherently quite fragile.  And where the attack is fragile, the
defense is robust.

Most of the security in any digital title system comes from the PKI
itself.  The double-spend problem, the general issue of  Byzantine
failures in information propagation, is already a corner case.  So
perhaps we can solve it as a corner case.

Again: _even Bitcoin_ isn't that far from being able to build a
practical decentralized ledger without a blockchain.  The same gossip
model that broadcasts nonconflicting transactions is not at all
incapable of reacting to conflicting transactions. We're not really
recommending that Bitcoin ditch the blockchain, but this gives us hope
with our fundamentally easier problem.

## Various specific specialnesses

What are the differences between the Urbit double-sell problem and the
Bitcoin double-spend problem?  Is our special case really, truly,
special?

In worse-is-better mode, we want every special-case advantage we can
get.  Every difference we find is one we can use as a leverage point.

### Minimal transaction interdependency

The first major technical difference between the Urbit title history
and the Bitcoin blockchain is that Bitcoin and its relatives are
designed to secure a complete, interdependent, collective transaction
history.  Except for the parent-child relationship, Urbit wills are
independent of each other.

Bitcoin's use of UTXOs rather than balances reduces interdependency
somewhat.  But the validity of each transaction is still dependent on
all the transactions that created its inputs.  (Ethereum drops the
UTXO model, whose value in reducing dependencies may not match its
cost in complexity.)

Urbit is not a payment system or a shared ledger.  Bitcoins are
divisible, but Urbit ships aren't.  An Urbit will containing its
parent chain is self-validating and has no dependencies. There is no
collective history.  There is no Merkle tree.  There is no chain, with
or without blocks.

This simplification doesn't eliminate the double-sell problem in
theory, but makes it much more tractable in practice.  The set of past
transactions (key transfers) that a new transaction could conflict
with is much smaller.

### Trust hierarchy and governance structure

The second major technical difference is that Bitcoin is a flat,
trustless, fully decentralized system.  Urbit has a hierarchical,
polycentric governance system which is a trust hierarchy.

Now and for quite some time, urbits default to automatically accepting
OS updates from their parent, making this trust effectively absolute.
This is not a novelty -- all "evergreen" browsers now work this way.
You trust your browser quite a bit, which means you trust your browser
vendor.

And since few Bitcoin node operators code their own daemons, the same
dependency on a source distribution exists in Bitcoin.  It's informal
and off-chain, though, which is not really a good thing. (Urbit is
like if Bitcoin Core hotpatched itself automatically by publishing
source-code diffs on the blockchain.)

To be on the safe side, we should think of Urbit as a centralized
system until the OS update that turns off automatic updates is
shipped.  This of course requires a certain measure of perfection,
which cannot in any way be predicted.

After Arvo proper becomes "deciduous" (apps will of course always be
remotely hotpatched), child-to-parent trust should diminish to the
power of the parent to deny service to the child.  This will always be
present without some major redesign.

But it's opposed by the equal and opposite power of the child to
switch to a different parent, creating a competitive market in
governance.  This should deliver service at the highest quality and
lowest price, fortifying trust with incentives.  The power of a
restaurant owner to deny you service does not give the food industry
the power to starve you to death.

And if no parent wants your business, with 2^16 stars who could accept
it, you probably shouldn't be on the network at all. Urbit, like a
real society, is designed to be a network of incentives that holds
everyone in productive tension.  We want everyone to be free, and no
one to be unaccountable.

For example: a parent which extends its will also needs to send
updated signatures to its children and former children.  Either will
otherwise be unable to propagate their dossiers to ships whose
cabinets have the updated parent will, _even if some other parent
adopts them_.

But Urbit is a collectively governed and updatable system.  A star or
galaxy which denies service to its own children will (a) get a bad
reputation, (b) drive its children to other parents, and (c) force the
network to hardcode a ship-specific exception into the propagation
algorithm, overriding stale-key revocation.

In theory, a parent can extort its children by denying service. In
practice, since Urbit is self-governing, not ungoverned, and its
government can right this wrong with a source-code patch, the
extortion won't work.  So it won't happen.  So the act of government
won't be necessary, and won't happen either.

Of course a perfectly decentralized system would be freer.  But worse,
as usual, is better.  And since we are paying for this worseness,
imperfect decentralization, we'd like to get all the mileage out of it
that we can.

Again, Urbit, not being a trustless system, does not have to solve the
trustless consensus problem -- although we still very much want to
minimize and bound the delegation of trust.  This is an obvious
relaxation of Bitcoin's hard theoretical problem.

### Routing: security through topology

Please don't laugh.  Security through routing topology isn't a joke --
unless firewalls are a joke.  Cisco sells too many firewalls for them
to be a joke.

In Bitcoin we may have all sorts of reasons to ask what ship holds
what coins.  In Urbit, when we ask what key controls an ship, we are
either sending or receiving a message.  Is our outgoing message safely
sealed to the current owner?  Is our incoming message properly signed
by the current owner?

When the parent also forwards all packets until a P2P link is
established (Urbit forwarding resolves to STUN if either party has
full cone NAT, TURN if not), we can design in all kinds of
interactions between routing and certificate management.

In particular, a parent which is a single source of truth in some
sense is a very attractive design element.  Again, we're paying for
our imperfect decentralization.  We might as well use it.

For example: I want to send a packet to ship X.  Two parties, A and B,
are competing for ownership of X.  A is the rightful owner.  I am
secure against B if either of these conditions are true: my packet can
only be decoded by A, or my packet is not sent to B.  Both would be
ideal, of course.  Either will do.

### Latency and friction tolerance

Confirmed Bitcoin payments aren't especially low-latency by payment
standards.  They're reasonably low-friction by payment standards.  But
fees are certainly a thing.

Urbit is digital real estate, not digital money.  When we look at the
standards of latency and friction in actual real estate -- where a
transaction that takes a week is super-fast, a 5% payment overhead is
normal, and a third-party intermediary is standard -- we see a much,
much weaker set of requirements.

Obviously a week and a 5% overhead are incredibly sucky levels of
latency and friction.  The point is that even if this is the only
level of performance Urbit can achieve, that's not necessarily the end
of the world for Urbit.

For instance: if we wait a week for a double-sell alert, and we don't
see one, either the gossip network is totally hosed (to a point we'd
surely find out about), or there wasn't a double-sell. This stuff is
just not that hard.

(One little-made point about Bitcoin, by the way, is that Bitcoin
enables trust-free _payments_, but not trust-free _exchanges_. The
seller still needs to deliver the goods either before or after the
payment; in either case, there is trust.  Only Ethereum can solve this
problem -- and only for digital exchanges.)

## We can afford to be patient

With a better-is-better, general-purpose solution, one size fits all
until the end of time.  With a worse-is-better, special-case solution,
the details of that case are critical.

But we actually don't know these details.  One rule of the
worse-is-better school: never solve a problem before you have to. You
don't know all the details, and you need those details.  (Of course,
with the better-is-better approach, the details don't matter at all.)

Is there such a thing as a transitive adjective?  Grammarians are
unclear.  But technically, the adjective "secure" is always an error.
Nothing is "secure."  "Secure against X" is the correct usage, where X
is some threat model.

Urbit is an insecure test network with no sensitive data on it. This
will remain true for a while.  No Urbit ship has ever been transferred
cryptographically.  This will also remain the status quo for quite a
while.

We _don't know the threat model_.  We _can't solve the problem_. It's
as simple as that.  The best Urbit can do, at the present time, is map
out the ballpark of solutions.

And we have time to proceed patiently.  One way to think about the
timing of cryptographic decentralization is to look at the DNS.  It's
clear that now, a decentralized DNS with cryptographic domain-name
titles would be extremely desirable.  It was never designed to happen.
It will probably never happen.

But if we look at when cryptographic DNS with allodial title _should_
have happened, it's probably sometime in the mid-90s. Ie, after over a
decade of production use of the Domain Name System.  In short: there's
no need to hurry here.

## A map of the solution space

But we still need a map of the worse-is-better ballpark.  Let's look
at some options, from least secure to most.

The essential question we can't answer, without a better sense of the
threat model, is how aggressively we need to propagate wills. We
especially are not sure about the threat model of malicious stars
(16-bit ships) and/or galaxies (8-bit ships).

We need to know what kinds of double-sell attacks are plausible. Since
we don't know this yet, we need not one propagation design,  but a
range of designs -- stretching all the way up to a full blockchain.

### Acceptance model

What doesn't change is the will _acceptance_ model.  A ship will
always accept a new will if (a) the new will extends the old will, (b)
the parent signature on the initial public key is at least as recent
as the ship's current version of that parent.

The parent clause implies that when a parent extends its will, it
needs to send updated initial signatures to all the children it's
launched.  Otherwise, their own future updates will not be accepted by
ships that have seen the parent's update.

This is not a big deal in the world of parent responsibilities. But
like many such responsibilities, it lets a badly operated parent deny
service to its children.

A ship accepts all wills, new or updated, and stores them permanently.
If this is abused trivially as a DoS vector, Urbit will mitigate it by
the usual technique of degrading service to non-scarce ship tiers.
Scarcity rules.

### Level 0: passive propagation only

The Ames protocol can piggyback a will on any packet.  Each ship also
permanently records which other ships hold which version of its own
will.  An update is automatically sent when needed.

With level 0 propagation, all key exchanges in Ames are passive and
invisible to the programmer.  When the sender has no will or symmetric
key for the receiver, the packet is signed, bundled with the will, and
sent as cleartext.

Signed cleartext?  If you have no will for a peer, you've never talked
to this ship before.  Your first words to a stranger probably won't be
super secret.  If this isn't true, the programmer has to send an
innocuous message first and wait for it to be acknowledged.  Kicking a
rare corner case up to the programmer is a classic worse-is-better
move.

With level 0 propagation only (the current implementation, because we
don't even care about key updates yet), an updated does not
effectively revoke the old key.  If Alice updates to a new key,
Mallory steals the old key, then Mallory talks to Bob before Alice
does, Mallory can impersonate Alice.

So not only does level 0 not solve double-sell, it's also quite
insecure.  But it's still fine for now (because Urbit isn't really
decentralized yet).

### Level 1: neighbor-only propagation with parent filtering

The list of other ships which hold your will, essentially the list of
all ships you've talked to, is your list of _neighbors_. You
essentially have permanent, if perhaps very sporadic, conversations
with all your cryptographic neighbors.  Symmetric keys time out fast,
but wills are held forever.

By proactively pinging all your neighbors when you extend your will,
you prevent anyone who finds the old private key (ideally you update
when your old key is stale, not when it's actually been _stolen_) from
jumping into these conversations.

What about non-neighbors?  We add a second feature: a parent will only
forward a packet if its sender matches the current will.  So updating
your parent (who is always your neighbor) transforms it

There are two cases: where Alice's parent Trent is also Bob's parent,
and where Bob has a separate parent Walter.  In the first case, the
expected packet flow is that Alice will send the packet to Trent, who
sends it to Bob.  In the second case, Trent sends it to Walter, who
sends it to Bob.

In either flow, Bob or Walter is sure that the packet came through
Trent.  Since Trent is Alice's parent and hence Alice's neighbor, and
hence is updated, Trent will forward no packets from Mallory.  So
Mallory has no way to reach Bob.

Non-neighborly packets not matching this flow can't be accepted.
Suppose Mallory gets Bob's public IP address directly?  If Bob gets a
non-forwarded packet marked "Alice," but Alice is not his neighbor,
that's super weird.  He must reject the packet.

Level 1 is nice because it provides a reasonable level of security,
but it's still extremely simple.  Not only does it not use a
blockchain, it doesn't even need a gossip flood!

And level 1 propagation also does a competent worse-is-better job on
the double-sell problem.  Trent simply becomes the single source of
truth.  The buyer of Alice needs to check that Trent, her parent, has
Alice's latest will from the buyer's perspective. If Alice's seller
propagates a different fork to other ships, this damages Alice's
ability to communicate, but produces no obvious gain for the seller.

Level 1 puts a lot of security weight on the parent.  If Trent
misbehaves, for example by not filtering Mallory's packets, Alice can
be impersonated.  And its solution to the double-sell problem is
adequate, but not ideal.  Level 1 is the worse-is-better sweet spot
for a young Urbit, but will probably give way to level 2.

### Level 2: broadcast all wills

We can't say definitively that level 1 will be inadequate.  But
intuitively, it feels slightly weak.  We will probably need a gossip
protocol.

The only ships that can be transferred are galaxies, stars and
planets; if all updates of all wills of all these major ships are
broadcast, we hardly have a scaling problem like Bitcoin's.  Even if
changing the lock on your front door counted as a real-estate
transaction, there are a lot fewer real-estate transactions than
credit-card payments.

Moreover, conflict detection (double-sell alerts) is a natural part of
any gossip protocol.  Gossip should be between stars, not directly
between planets; horizontal gossip, vertical distribution.
Star-to-planet distribution may still be limited.

Especially since stars are somewhat trusted, ganking a gossip protocol
with random update edges is incredibly hard and requires a pretty
preposterous conspiracy.  And flooding all planet wills does a lot to
keep stars honest.  It would be incredibly stupid for a star to try a
double-sell attack against its own planets, but code is always more
powerful than mere incentives.

Finally, the exit model isn't fully baked yet, but it will probably
have more aggressive propagation needs.  What's clear is that an exit
statement is another type of will entry, involving a signature both
from the previous key and the new parent.  You can only escape to
another ship of your parent's class that agrees to adopt you.

In general, because escaping need to work for routing (without the
cooperation of the former parent), wills containing an exit statement
(a planet moving to a new star, or a star moving to a new galaxy)
exit) probably need to be flooded globally among all 8-bit galaxies
and 16-bit stars.  Exits should be rare, so they shouldn't present
much of a scaling problem.

### Level 3: full blockchain

Obviously a blockchain can solve Urbit's problem.  Probably the right
thing to do would be to use the Bitcoin blockchain, and confirm the
current Urbit key version with a "colored coin" of some kind.  (This
should not be confused with the orthogonal idea of representing Urbit
_invitations_ as colored coins.)

This involves making all Urbit ships into Bitcoin SPV nodes at the
least.  Not the worst fate in the world, but also a cost.
Alternatively, Urbit could have its own "altcoin" blockchain, with
actual Urbit-specific mining.

Again, given that level 2 seems like it should work quite well, it's
hard to see why level 3 propagation would be needed.  But we can't
really know at this point.  There's a reason Urbit can update itself
over the air.  That's why we say: Urbit (probably) doesn't need a
blockchain.  If it does, we can retrofit it.

## Retrospective note

This essay has presented the Urbit cryptographic title as a low-power,
stripped-down, worse-is-better variation of Nakamoto consensus.
That's clearly the right way to introduce it in 2016.

Actually, though, this part of Urbit was designed before the Bitcoin
paper was published.  There were other academic approaches to
Byzantine consensus, but certainly none validated on a large scale as
Nakamoto consensus has been.  It never seemed appropriate to treat
cryptographic titles to network addresses as a case of generalized
Byzantine consensus, and without the existence of Bitcoin there was no
temptation in this direction.

In a sense the secret of PKIs is that PKIs are easy.  What's hard is
adapting an existing identity and authorization structure into a PKI.
If you build the simplest possible PKI, then force the human processes
to fit themselves to the protocol instead of vice versa, you have a
much easier job.  Similarly, if you are not adding PKI to an existing
network, but building the network and the PKI as one system, many
simplifications are possible.  This is once again the classic
worse-is-better method.
