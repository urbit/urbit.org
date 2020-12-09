+++
title = "Metaphase"
date = 2020-12-09
description = "On the upcoming and foregoing Landscape lifecycles, and other forms of mitosis across the Urbit project."
[extra]
author = "Matilde Park"
ship = "~haddef-sigwen"
image = "https://media.urbit.org/site/posts/essays/metaphase.jpg"
+++

<br>

![mitosis](https://media.urbit.org/site/posts/essays/metaphase.jpg)

<br>

A few weeks ago, the Landscape team — those of us building Tlon’s suite of userspace applications on top of Urbit— deployed our first over-the-air update for notifications. This is a big leap forward for us. Of course, getting notifications inside Landscape itself is a big deal, but getting a push notification on your phone, or an email digest based on activity inside Urbit is now just one step away, a weekend project for a hobby developer, not an indeterminate number of steps away.

After release, we received some feedback from users on the behaviour and design of this feature; beyond the obvious kinks that come from an initial release, it seemed to some like a minimum viable affordance pitched as a fully designed feature. This “bottom-up” development approach was, to us, fairly straightforward; to some of our users, it seemed that we had closed the door on the feature without even beginning to expose all its possibilities.

As I’ll describe, we haven’t just been iterating Landscape, but the way we develop Landscape, and the way we consider Landscape in relation to Arvo. Finally, we’ll discuss our upcoming two-stream release process: a “stable” release stream with updates every six weeks and a development stream, with ongoing changes continuously deployed on an opt-in basis.

To someone coming to Landscape for the first time, it is starting to look mature; and it is indeed maturing quickly. After all, these mismatches in expectations are pangs calling out for growth. Landscape truly has *users*, not just explorers, who are developing the same expectations they have with the other tools they use: predictability, reliability, and iterative improvements, not just leaps forward. So to meet those expectations, we’ve been working on the prerequisite work for a mature release schedule, with two different release streams for users and explorers: a lifecycle, with the cells, interlinked, dividing into a coherent higher being.

## Landscapers and lifecycles

For most of 2020, the core Landscape team has comprised of Liam (`~hastuc-dibtux`), Logan (`~tacryt-socryp`), and myself (`~haddef-sigwen`). Others at Tlon have rotated on and off, and some community members (`~radbur-sivmus` comes to mind) have also contributed a lot, but the three of us handle the core decisions and the entire stack for Landscape, working with designers, infrastructure, and third-party developers.

After OS1’s release in April 2020, Landscape’s back-end has changed quite a bit; the first rearchitecture we performed was in group-store, adding roles and simplifying quite a lot of the back-end logic at the same time.

Around May of this year, Logan flagged that our code surface was too large and had too much boilerplate by writing a set of bespoke full-stack applications when just one flexible userspace database would do. Our designers also had a vision of our interfaces being “modes and genres of the same data” that fit this vision as well; and so since then, we’ve put our resources into migrating all of Landscape to use graph-store (more information available in [this developer call](https://www.youtube.com/watch?v=E4DFuAZQ32Y)).

Obviously, developing userspace for distributed computing has some additional challenges that you don’t have to consider when writing software for a single server. Each ship interacting has to mutually coordinate the agents running and the events to be processed. If those fall out of synchronisation, the edge cases multiply.

We traditionally tended toward solving those problems by writing the simplest possible incarnation of an application or a solution first, triaging out additional complications until they can be most prudently addressed — usually when they are just one step away.

For most of its history, Landscape’s userspace suite had to be up-to-date on all ships to function at all, so multiple staging streams added quite a few complications. Since incompatible versions of applications on different ships would produce mutual fail states if they attempted to interact –and since each application had no sense of how to negotiate compatibility with older applications, each user had to keep up-to-date. Landscape was moving too fast, constantly reconfiguring (to give you a sense of this: we still refer to a month ago as “old”).

Historically, Arvo and Landscape were also considered just one object; changes in Landscape would often require refining the layers underneath it as well. We often aimed to use our interface’s requirements to refine Arvo in turn. But as Landscape’s cells continued to split, as it became a proper client *for* Arvo rather than a subsection *of* Arvo, it required its own planning and execution cycle that only came to fruition around April of this year.

The first thing we did was start recurring, six-week product backlogs with designers and engineers to occasionally reassess short-term priorities with a larger roadmap. Once we did that, we began working on opening our process to the public, migrating all tasks, priorities, and current decisions to a [product board](https://github.com/urbit/landscape). By doing this, community members could both suggest features *and* contribute features, with a centralised, transparent process for getting designer input and Tlon engineer priorities. This has also been a successful effort.

By adjusting ourselves to a six week rhythm for execution, it’s clearly time to slow down our release schedule and dedicate design and QA time to each release.

Since Arvo is still quite young, we can’t quite get to all the thornier aspects of instituting a lifecycle. For example, we can’t tackle agent version negotiation in full yet; and mark versioning is still not present. This means modifying the validators for our graph modules (that is, validating the graph structure of a notebook vs. a collection) presents a deployment challenge in a two-stream lifecycle.

That said, our userspace infrastructure is maturing, so we could at least organise the APIs to those agents; and we could at least slow the development cycle on those agents in favour of the more flexible components of the stack. The front-end specific features, for example, can be deployed on different ships without side effects for other users.

So now, before we could launch a stable stream, we had some things to do first:

- **We wanted to provide assurance that the userspace suite is relatively stable.** All our remaining stores (invite-store, metadata-store, and contact-store) needed to be modernised to use the same libraries and utilities inside Arvo as newer userspace applications.
- **We wanted all our applications to be using graph-store.** If we were going to migrate the entire network to a new userspace model, we shouldn’t undermine the new release cycle process and make it more difficult to test and deploy to meet higher user expectations. We needed to  migrate everything first.
- **We wanted to release the notification-store**. After the October 2020 groups release, Landscape simply wouldn’t be complete without it.
- Finally, **we wanted all of Landscape to use the [Indigo component library](https://github.com/urbit/indigo-react).** Landscape shipped with each application using its own build with handwritten, bespoke DOM components. Once we moved to a single-page application architecture in June 2020, we wanted the same guaranteed consistency for both back-end and front-end code.

Most of these are now accomplished; the remaining tasks are awaiting some final tests and UX work. We’re aiming for a stable stream of Landscape to deploy **December 11, 2020**.

What does this mean? For everyday users, you can expect Landscape releases every six weeks; the slate of features and any breaking changes will be flagged well in advance for third-party developers; and you can expect a more thoroughly considered user experience with notes and copy for each new release.

And for intrepid users, you can opt-in to a development stream and help us find and eliminate bugs before release to the wider public. This development stream is much like how we've been deploying Landscape up until now — but now it's optional.

## Mitosis

Describing our progress so candidly can feel strange — after all, it sounds so *early*. But to me, it’s exciting. It’s mitosis.

Take another example. For all of Urbit’s history — all until now — Tlon was playing the role of both parents to the project when it was really just an embryonic corporate vehicle itself, fated to become twins. But in the past few months the burgeoning Urbit Foundation’s interim Director, Josh Lehman (`~wolref-podlex`), has begun to ramp up responsibility, taking increasing stewardship over urbit.org and giving it a physical voice, an Otherness, apart from Tlon’s own goals.

Now, each day, we stray a little closer to these entities splitting apart, a step closer to the Urbit Foundation and the Tlon Corporation being completely different entities with completely different concerns.

The same has occurred with Landscape. Previously Landscape was “*the* interface to Urbit,” the proof that there was more to the project than a Unix executable. And slowly to those of us at Tlon, it became obvious what it was destined to become: a flagship client for an entire network, a tree branch rooting a world beneath clearnet, the first cell by which other clients might be born. Mitosis can be clumsy to watch; it can be nauseating to experience; it can be difficult to make out what will arrive where.

But this is, after all, how a body forms.
