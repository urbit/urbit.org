+++
title = "Stable Arvo"
date = 2019-11-20
description = "This year we set out to get Arvo to a point that we can credibly call ‘stable.' "
[extra]
author = "Anthony Arroyo"
ship = "~poldec-tonteg"
image = "https://media.urbit.org/site/posts/essays/stable-arvo.png"
+++

![](https://media.urbit.org/site/posts/essays/stable-arvo.png)

### A contract by which Arvo evolves

We want your Urbit to last forever. We want an ordinary Urbit user to never worry about their Urbit breaking, going away or failing unexpectedly. We don’t just want this — we think this is one of the most incredible things Urbit can actually deliver.

In order to get closer to an Urbit that can last forever, we set for ourselves the goal of getting Arvo (the kernel of what we’ve been calling ‘Urbit OS’) to a point that we can credibly call ‘stable’ by the end of 2019. 

But what do we mean exactly by ‘stable’? For something meant to last far into the future, stability really means *resilience*. Arvo has to both run and upgrade itself without ever breaking or falling into an unrecoverable state. 

Getting Arvo to this point doesn’t quite achieve the user-level goal we’re hoping to achieve. But if you’re comfortable doing a bit of system administration, Arvo itself should need almost no maintenance – and from a system's level perspective, that is sufficiently stable.

To achieve stability in practice Arvo needs three things:

- The Arvo network (Ames) has to be reliable 
- Arvo can’t easily fall into an unrecoverable state
- Arvo has to have a clear and formalized upgrade mechanic

All of these are actively being worked on, and are mostly near completion. Let’s walk through them one by one.


### A new Ames

To ensure that Arvo can upgrade itself forever, it needs a network to deliver the updates. Toward this end we’ve put a lot of work into making Ames, the Urbit networking protocol, as reliable as possible.

Ames is a big part of what makes Urbit Urbit. It guarantees exactly once message delivery, it’s encrypted and authenticated. The original Ames design is pretty good. But it’s also incredibly difficult to maintain and had a few really painful edge case bugs. When the network has fallen over in the past, it has been far too hard to debug the original Ames code.

We managed to update this original Ames code to use Ethereum as the source of truth for keys and key updates. We also made significant changes by introducing a new version of Jael, our kernel module for managing keys and signing inside of Urbit. While this change was significant, Ames still had some pretty nasty occasional bugs related to subscriptions and subscription updates. In order to get Ames to be truly reliable, it needed a rewrite.

We’ve been working on that rewrite, codenamed Alef, for a few months now. Alef doesn’t aim to add any new functionality — it’s simply a drop-in replacement that’s cleaner and more reliable. We currently have Alef running on a testnet and sending packets with an industry-standard congestion control algorithm. There’s still some work to do, but it’s coming along nicely. Some early tests even show it to be faster, which is great.

We expect to switch to Alef in a continuity breach (network reset) during this quarter. This will be a huge step toward resilience, and accomplishes the first of our three stability criteria. A networking protocol we can trust to deliver updates is essential for a computer that will last a long time.


### Recoverability

Another barrier to stability with existing Urbit is that a ship can, under specific conditions, fall into a terminal state. If part of your ship’s state relies on an event in the future which crashes, then that part of the state can become unrecoverable. Consider, for example, an event that is set to be triggered by a timer. If this timer crashes, that event will never happen. This is a huge problem.

In order to understand the difficulties with error handling and how we’re dealing with it, we have to understand the Arvo operating system. Arvo is responsible for coordinating messages being sent from the outside world (Unix in our case) and messages sent from one vane, or kernel module, to another. Both Arvo and the vanes are explicit state machines, meaning that they must specify every possible state and the transitions between them. These properties make it possible for the system to be fully updated (we’ll discuss such upgrades below).

This architecture means that errors have to be considered not simply as an exception, but as a possible state in the explicit state machine. In practice, we have to account for both deterministic errors like semantically invalid formulas and non-deterministic errors like running out of memory or a plug getting pulled.

Deterministic errors are currently handled within the virtual interpreter, Mock, and result in a “bail: exit.” They can be handled “within” Arvo and are never written to the event log. The real difficulty lies with non-deterministic errors, specifically ones can potentially cause other events.

An obvious case of causally-connected events is a timer; any code that sets a timer eventually suspends itself, waiting to be awoken. And yet, if the subsequent timer event were to crash, the state machine awaiting it would remain suspended, expecting a transition that can and will not 
occur.

We believe that we have a general scheme that accounts for both classes of error. We’ve formalized this and will use it going forward to avoid falling into inconsistent states. 

Our solution to this problem is simple: if Arvo or one of its vanes crashes while processing an event, the fact of the failed event itself becomes a new event. The runtime injects an error notification in the event log, named, as is befitting of a failed event: %crud.

In the case of a failed timer event, the error notification is routed back to the code that set the timer and communicates the following: you were expecting to be woken up, but, when you were, you crashed. The code in question could then consider the logical operation of which the timer was a part to have failed, or perhaps it could try again. In any case, it must not crash when handling the error notification, and it must not continue to expect to be woken up.

This quarter, building on previous work, we’ve built on the %crud pattern and mapped the protocols between the vanes and between arvo and vere. This allows us to make sure that %cruds are all handled (so as to avoid the crash discussed above) and, in future iterations of the vanes, know what conditions need to be accommodated to avoid introducing regressions. 

By adopting this pattern and virtualizing userspace, we can make completely sure that code running in the kernel or an app can’t cause your ship to get into an inconsistent state. This accomplishes the second of our three criteria for stability. 


### Telescoping Kelvins

Finally, in order for a ship to reliably receive and apply upgrades, we need to formalize and enforce a versioning scheme inside the system. 

Most software simply increases its version number on each release. Nock (our VM spec) and Hoon, on the other hand, uses kelvin versioning. Kelvin versioning doesn’t infinitely increase version numbers. Instead, we decrease the version number on each significant change in the hope that our software will eventually not need to change at all. Infrastructure, if it’s going to be truly reliable, should eventually reach absolute zero. 

Nock is already nearly frozen at 4K. A change to Nock is a major event.

At the level of the kernel (including Arvo proper, Zuse, and the Vanes), we’ve never fully followed a kelvin versioning scheme. The bottom of the stack always had to freeze first. But now the system is starting to stabilize such that we need a path toward a ‘cool’ system all the way up in the vanes. Versioning the kernel is a different challenge than the VM or language since the vanes interoperate with one another.

We have a formalized scheme for how we think kelvin versioning should work at the Arvo level in process now. This year we’ll start tagging each version of the kernel with an appropriate kelvin. This scheme means not only applying a version tag to each kernel, but also making sure there are transition functions written between versions. Additionally, it will include a versioning mechanism for the interface between the kernel and the runtime.

Let’s dive into the details, but just a bit:

The mechanism for the kernel is pretty simple. In short, we’ll enforce that everything above a particular layer must ‘cool’ (or upgrade, by shedding a version number) when something underneath drops a version number. This ensures that the system can’t fall into an incorrect state due to simple incompatibility. For example, if Hoon changes, all of the Arvo kernel must similarly drop a kelvin to ensure compatibility.

The versioning scheme between the runtime and Arvo is similarly straightforward. We’ll build in an affordance for notifying the user if we need them to manually upgrade the interpreter. This ensures that API changes between interpreter and kernel can always be non-breaking. Someday interpreter changes can be done over the air (like your browser downloading its own upgrades), but we’re not there yet.

What’s important about these two things is that they let us take continuity seriously. "Continuity" or "permanence" is arguably Urbit's killer feature: you start your ship, it just works, forever. Back it up on a USB drive, throw it in a drawer for forty years, and upon reconnecting to the network in 2059 (and pulling down all the updates you've missed) you're back in the game. 

With the recent 0.9.0 release we’ve gotten to the point where we can make almost all our upgrades over the air. Even the language is now upgradeable over the wire.

But — in order for that scene in 2059 to actually work, these upgrade mechanisms have to be in place. As your ship upgrades itself, the system needs a way to ensure that each upgrade gets applied in a compatible way. Right now we’re careful about deploying over the air updates such that they don’t break, but that’s obviously not sustainable.

Once this versioning scheme – our third criterion of stability – gets released later this year, there’s nothing technically preventing you from starting a late-2019 Urbit in 2039. We hope you’ll use it a lot in the interim — but this is an essential feature for a decentralized system that claims to upgrade itself. We’re really excited to get it implemented.

These three areas of work are all due to complete later this quarter. Once they're implemented, Arvo will be fundamentally stable, and we can begin to put some serious weight on the system.
