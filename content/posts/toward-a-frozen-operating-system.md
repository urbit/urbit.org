+++
title = "Toward a Frozen Operating System"
date = 2017-05-10
description = "Is it possible to freeze an entire OS?"
aliases = ["/posts/essays/toward-a-frozen-operating-system"]
[taxonomies]
posts = ["Essays"]
[extra]
author = "Curtis Yarvin + Galen Wolfe-Pauly"
ship = "~sorreg-namtyv + ~ravmel-ropdyl"
+++
Is it possible to freeze an entire OS, so that its codebase never changes and
never has to change?  Is the proposition even meaningful?  Is it practical?
And if so, why would we want a frozen OS?

Think about it intuitively.  There's a reason we call an OS a "platform."  It's
a piece of permanent infrastructure.  Paul Graham wrote a
[great essay](http://www.paulgraham.com/hundred.html) about the
"hundred-year language," but the language is only one part of any complete
platform.  And in infrastructure terms, a hundred years isn't that long.

Why not think of structures that have lasted _thousands_ of years?  An aqueduct,
a pyramid, a Parthenon?  Why set our sights lower?  Why isn't it time to aim for
perfect and timeless code?  If not now, when?

## Scope of the problem

More prosaically, a frozen OS just means your OS never changes.  A frozen OS
never gets any updates.  Not because it can't update itself, just because it
doesn't need to.

Is this even a meaningful concept?  A frozen OS?  First we'll have to decide
what "OS" even means.  Certainly, if "OS" means "the code that your hardware
boots into," hardware always changes and so will the OS.

A broader, more useful definition: the "OS" is _an opaque model of a persistent
general-purpose computer_.  This definition allows for arbitrary levels of
virtualization.  Linux on a droplet is an OS.  A browser is an OS, because it's
persistent (sorta) and opaque.  But `node.js` is not an OS, because it's not
opaque: it exports Linux system calls.

Within this opaque model, we have to decide what's "system" and "user" software.
It clearly makes no sense to freeze userspace.  Let's use the
[trusted codebase](https://en.wikipedia.org/wiki/Trusted_computing_base): code
is system software, if compromising it would compromise the whole system.

## Infinite maturity

It's important to remember that just because a system is designed to achieve
frozenness, doesn't mean it's useless until it's frozen.  It doesn't even mean
it's immature.  It just means that in the very long term, the system's maturity
goals are infinite.

Systems designed to diverge infinitely (with normal X.X.X semantic versioning),
even those designed to converge infinitely (as with
[Knuth versioning](http://www.tex.ac.uk/FAQ-TeXfuture.html)), also achieve
maturity, often great maturity, without being quite frozen.

For example, C is a very mature language.  C has long since mastered backward
compatibility.  We can be sure that any C program which compiles on today's
correct C compilers will compile on any future correct C compiler.

But, since C is not frozen, we can't be sure that today's C compilers will
compile any future C program.  So C has not yet achieved perfect _forward_
compatibility.  By definition, a frozen system is compatible both forward and
backward.  So C is mature, but it could still get more mature.

The point of a frozen OS is to shoot for _infinite_ maturity.  Obviously a
frozen platform is compatible forever in both directions.

Infinite maturity does exist in the real world.  But only in a few simple file
formats and protocols — IP, JSON, XML.  And not all this maturity is the result
of perfection.  Some is just the accident of a missing update mechanism.

But IP, JSON, XML... this is how stable, how taken for granted, system software
should be.  And can be.  Certainly, any JSON parser today will parse any JSON
document made in the future.

The dream of absolute zero is an OS whose core components are so simple, so
boring, and so mechanically straightforward that we can imagine them becoming
finished and never changing.  We need to freeze not just a format or a protocol,
but a language, a kernel, a standard library.  To succeed, we need to flush out
each quirk, complexity, and creeping feature, until the system is so boring and
obvious that no one even wants to change it.

## Kelvin versioning

"Kelvin versioning" is one way to track a project designed to be frozen.

In Kelvin versioning, a version is an integer in degrees Kelvin.  Absolute zero
is frozen — no further updates are possible.  If your Kelvin versions don't
track your actual progress, you run out of integers.  This danger is a concrete
incentive for the project to track its own progress accurately.

(Kelvin versioning isn't useful only at lifecycle scale.  It can be used for any
development process with an irreversible end — as build numbers for a release,
for example.)

## The palm-tree dependency model

A whole OS can't have a single Kelvin number.  It has to consist of multiple
components which depend on each other.  What's the right dependency model for
the parts of a frozen OS?

One way to think about dependencies across a whole OS is the "palm-tree model."
Fundamentally, there are two kinds of components in a system: "exclusive"
components (where we have to choose one version of the code), and "inclusive"
ones (where different users can see different versions).

The exclusive components are the trunk of the palm tree: a stack of layers, each
of which has one active copy.  For instance, you are only running one kernel at
a time.  Different apps cannot use different versions of the kernel.

The inclusive components are the fronds, branching out in any direction they
want.  Not only can two apps use different versions of the same library, in
many situations _one_ app needs to be able to use two different versions of the
same library.

## The palm trunk: telescoping Kelvins

Any subsystem that serves as any kind of platform is exclusive, since anything
that runs on top of the platform has to choose one version of the platform to
run on.  Since layers are good, this creates a natural stack which can get quite
tall — and include components which are technically in userspace.

The right way for this trunk to approach absolute zero is to "telescope" its
Kelvin versions.  The rules of telescoping are simple:

1. If tool B sits on platform A, either both A and B must be at absolute zero,
or B must be warmer than A.

2. Whenever the temperature of A (the platform) declines, the temperature of B
(the tool) must also decline.

3. B must state the version of A it was developed against.  A, when loading B,
must state its own current version, and the warmest version of itself with which
it's backward-compatible.

Of course, if B itself is a platform on which some higher-level tool C depends,
it must follow the same constraints recursively.

The important effect of obeying rule 2: in a tall trunk, it's sufficient to
state your dependency on the platform directly below you.  Suppose C sits on B,
which sits on A and exports features of A.  C can state only the version of B
it's written against, because when A chills, B must also chill.

If A could chill without B chilling, we could modify C to use new features of A.
Then our new C would silently fail to work on an A-B stack which had not
received the A update.

## The palm fronds: total flexibility

The goal of the trunk is to get to the fronds.  In the fronds, no one should
ever worry about dependency conflicts.  And nothing is ever frozen, or has to be
frozen.

The right way to solve dependencies in userspace is: within an organization, use
a monorepo and link relative to its head.  Between organizations, use pinned
version numbers that are as immutable as possible.  Avoid programming
environments that create exclusion problems in userspace — for instance, that
compel a single process to choose one version of a library when a diamond
dependency exists.

There is almost never any good reason to automatically update dependencies with
fresh versions of foreign code.   In the case of a security update, the
maintainer of an app which depends on a patched library needs to catch the
patch and propagate the update in a new version of the app.  An app shouldn't be
security-critical to begin with, and propagating updates is a basic function of
a modern OS.  Also, if the app is security-critical, it could have its own bugs,
so it needs a maintainer and an update pathway anyway.

## Urbit: status and prospects

Yes, we do believe it's possible to write a freezable OS.  In fact, we wrote
one.  And it works.  It's not yet frozen (except at the bottom layer), but it's
getting there.

Urbit, a clean-slate functional OS, has been under development since 2002.  It
took a decade (as a one-man project) just to build a prototype of a freezable OS.
The result in 2017 (now with a small company) is a telescoping Kelvin stack of
layers from VM to UI.

At the bottom (the VM Nock), this stack is slightly warmer than liquid helium
(5K).  It's easy for Nock to get this cold, because it's defined in a page of
axioms that gzips to 340 bytes.  We are in no hurry to declare zero, but any
change at this point would be both very unlikely and very difficult to
implement.

Urbit's typed functional language, Hoon, which compiles itself to Nock, is
closing in on liquid krypton at 143K.  Hoon is defined in about 5,000 lines of
Hoon, or 10,000 if you count the deep standard library.  Nock will never need to
change; Hoon is perfectly serviceable but has some well-known rough spots.

Above Hoon, the stack rapidly gets much warmer.  Arvo is an event-driven
microkernel that's 1,000 lines of Hoon.  Above this are another 5,000 lines of
system library, then 12,000 lines of Arvo modules: a peer-to-peer network, a
PKI and private ledger, a revision-control system, an HTTP gateway, a functional
build system, and an application sandbox.  A trivial working system needs
another 5,000 lines for basic chat and shell apps.

We haven't had meaningful Kelvin numbers for the Arvo layer, but this release
will change that.  About a third of Arvo has been or will be rewritten in the
last year; we'll assign Kelvins once this code (which now compiles) is tested
into existence, largely based on how close the last compiling draft was to the
first working draft.  But you'll certainly be able to cook eggs on it.

(Once again, not being frozen doesn't mean not working.  Until all these layers
are finished, we'll be updating them over the air.  To be exact, Urbit
distributes its own updates through subscriptions in its own revision-control
system.)

The actual status of Urbit is that in 2017, we hope to make our last
discontinuous update — meaning that instead of your Urbit node updating itself
silently, you destroy and recreate it.  Urbit works today, but it isn't really
alive until today's Urbit data lives forever.

Even committing to continuity is a significant step toward the frozen OS,
because we're committing to never making another change that the present
platform can't install.  Fortunately, the only layer that has to stay frozen for
this is Nock.

## The style of convergent system software

We're obviously in no position to declare victory at any layer above Nock, but
aiming at absolute zero creates a system design style we think works very well —
even if we never get to zero.

Deep, onion-like layering is essential.  A thin layer has no room to grow.  A
good example of this principle is the difference between Urbit and Lisp
machines.  Both Nock and Lisp are very simple axiomatic definitions of
computing.  But practical Lisp systems expand by extending the model, whereas
Urbit layers over a frozen axiom system.

Software that expands by extension is inevitable.  But we need to be able to
kick it up to userspace.  System software should be concerned with the
fundamental problems of computing, which don't change.  The few cases in which
they do change — like crypto algorithms — are special cases, easily
encapsulated.  And even these changes can be expected to slow down in the long
term.

Perhaps the best example of the convergent style in existing, mature system
software is the relational database.  The genius of the relational model is that
it's designed to never grow hair.  Even SQL, with its COBOL-era syntax, is
essentially invulnerable to any significant non-cosmetic improvement.

The lesson: when we see a system that seems to want to expand indefinitely, we
can and should look for a layer division within this system, separating an inner
layer that tends to converge from an outer layer that naturally diverges.
Layering is what distinguishes true system software from the giant balls of mud
that all deep codebases want to become.

Are all balls of mud, or at least all the muddy parts of an OS, susceptible to
this transformation?  We think so.  But we'll see.

As usual, comments are on fora.  Check out
[this thread](https://urbit.org/fora/posts/~2017.5.12..20.30.11..0050~/).
