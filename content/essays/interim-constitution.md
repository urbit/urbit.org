+++
title = "Interim Constitution"
date = 2016-05-16
description = "The governing rules for the early days of the Urbit network."
aliases = ["/posts/essays/interim-constitution", "/posts/interim-constitution"]
[extra]
author = "Tlon"
ship = ""
+++
![](https://media.urbit.org/site/blog-7.jpg)

## Declaration of purpose

Urbit is a new network created by the Tlon Corporation.  Tlon's
broad intention is to surrender governance of Urbit to its users,
as soon as the community is collectively ready to receive it.

This constitution (which is not a legal contract, just our present
intent, which may be updated arbitrarily) describes our governance
process during this interim period.  Its design borrows from validated
historical structures, mainly Roman and Anglo-American.

The last and most important task of the interim government is to
write the next version of the constitution.  This document may or
may not incorporate any or all of the interim structures.

## Beliefs and principles

See our document of [beliefs and principles](../beliefs-and-principles).

## Governance structures

The interim republic has four branches: an executive consulate, a
galactic senate, a stellar congress and a planetary assembly.

For the interim, full authority is held by the (Roman style)
consulate.  The legislature (senate, congress, assembly) is
advisory.  The senate is never consulted and the congress is
almost never consulted.

In the future, the assembly of planets specializes in technical
governance.  The congress of stars specializes in internal, but
nontechnical, governance.  The senate of galaxies selects the
consuls and holds them accountable, and specializes in compliance
with external powers.  All votes, elections and other public
actions are logged in the Urbit global namespace.

As in most parliamentary systems, each of these structures sets
and enforces its own internal rules of operation.

### Consulate

A consulate is a two-person executive.  The consuls must work out
their own organization and division of labor.  Disagreements
between consuls are resolved by the senate.

A consul must be a senator.  The senate, voting per galaxy,
replaces the consulate whenever either a vacancy exists, or a
vote of no confidence gains a majority.  When electing consuls,
first a plurality selects one consul; then the plurality of those
who voted for anyone but the winner selects the second.

### Senate

The _senate_ is the set of all galaxy holders, voting per galaxy.
It does not convene except to replace the consuls.  Its
proceedings are in private.

To avoid growing the network too quickly, galaxies are activated
gradually.  Initially, only one galaxy is active, the root `~zod`
(galaxy 0).

Further activation is at the discretion of the consuls, who
control `urbit.org` and will only bind activated galaxies to
`galaxy.urbit.org`.  Routing at the galaxy layer is by DNS, so
unbound galaxies, and any stars or planets they launch, hear no
packets.

When any galaxy, activated or not, creates its initial
certificate, the consuls add its fingerprint to the galaxy table.
Non-activated galaxies can still be rekeyed.

### Congress

The _congress_ is the set of all active independent stars.
voting per star.  An _independent star_ is any star _not_ owned
by anyone who is either a senator, or has some connection to one
that would pose a conflict of interest.

The congress of stars is designed to exercise project and
community governance.  Its proceedings are in private.  The
consuls convene it at their pleasure, and keep it informed.

### Assembly

The _assembly_ is the set of all active primary planets, voting
per planet.  A _primary planet_ is the main planet of a unique
human (no sockpuppets).

The assembly is responsible for technical governance.  Its
proceedings are in public.

### The next constitution

The congress proposes, and the senate approves, the next version
of this constitution.  Future constitutions should be defined in
a smart contract platform, such as Ethereum.

## Galaxy table

95 galaxies are held by the [Tlon Corporation](https://tlon.io/).  50,
reserved for urbit.org, the future community foundation.  40, by
Tlon employees and their family members (24 by Curtis, who
started in 2002; 16 by everyone else, who started in 2014).  34,
by outside investors in Tlon.  37, by 33 other individuals, who
donated to the project, contributed code or services, won a
contest, or were just at the right place at the right time.

Note that while Tlon and its employees still control a majority
of galaxies, the senate is a ceremonial body; the consulate is
effectively equivalent to Tlon.

## Inception

This constitution takes effect as soon as the initial public
presale of Urbit address space is complete.

## Endowment

The 50 galaxies marked "urbit.org" in the galaxy table are
intended as property of the republic, and will be used only in
the interests of the republic and Urbit as a whole.

Externally, these galaxies are held by Tlon; internally, they are
managed and voted by Tlon.  Once the republic acquires a legal
identity and an independent human organization, Tlon pledges to
donate the `urbit.org` galaxies, the DNS domain, and the Github
`urbit` account to it.

## First consuls

The first consuls are Galen Wolfe-Pauly and Raymond Pasco.
