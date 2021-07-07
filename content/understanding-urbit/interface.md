+++
title = "Interface"
description = "What Urbit feels like to an everyday user"
weight = 3
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
+++

We built Urbit OS + Urbit ID to be the software stack for human-scale computing in the cloud. This system wasn’t built solely to be new infrastructure—it was built so that we can build better interfaces on top and people can use Urbit without having to know about the technology at all. For Urbit to actually matter, we have to go all the way from VM to UI.

This is why we built Landscape: a simple, calm, browser-based interface for building digital communities. We use Landscape to bring together our separate ways of communicating and collaborating.

Landscape isn’t just an idea—it’s a real thing. Today, once you have an Urbit OS node up and running, you can access Landscape from a desktop or mobile browser to pseudonymously chat, write, and share links with a group of friends.

We see Landscape as a new form of social software that can continue to grow and evolve for quite some time. We use the first version of Landscape, ‘OS 1’ every day. OS 1 is simple to the point of being simplistic. We look forward to evolving Landscape for a long time.

Landscape is by no means the only possible interface for Urbit OS + Urbit ID, but it’s the one that we need the most. In the future, we look forward to there being lots of different Urbit interfaces (and if you’re at all interested in experimenting with building one, please do.)

But we’ll get into that later. First, we’ll talk about why we built Landscape, where it is now, and where it’s going. Then we’ll cover a bit about other interface possibilities.


<img class="" src="https://media.urbit.org/site/understanding-urbit/project-history/uu-osn-1.svg">

What problem is Landscape solving? Let’s start with the current situation when it comes to cloud services.

In today’s world of apps and services, there’s no operating system in any meaningful sense. Our communities, co-workers, and lives are spread between these services—and the work of combining them is left to the user. It’s completely up to you to remember all your passwords, who sent what message where, what files are on which platform, and so on.

Above all else, our digital lives today are missing a sense of place, a sense of home.

It’s annoying and confusing to switch between interfaces, you can’t extend or build on top, and privacy and security are out of your hands. This fragmented, siloed, closely surveilled experience is simply a byproduct of having other people run and control your software. For the ordinary user, the result is restrictive, boring, and painful to manage. The possibility for everyday creativity with the tools we’re stuck with is close to zero. Wasn’t the computer supposed to be a bicycle for the mind?

Operating systems for the PC took the desk of the 1970s and made it digital. Paper, drawers, and envelopes became ‘files’ and ‘folders’. It’s a great abstraction, but it’s ancient. We live in a connected, multiplayer world; we need an operating system that acknowledges this world.

The ‘desk’ of today is cluttered with apps and services, data structures, and interfaces. Unifying this disjointed user experience is the most important problem that a platform like Urbit can solve. Landscape is built to bring everything together into a unified interface again. Without Urbit ID + Urbit OS, this would be impossible.

In March 2020 we shipped the first public version of Landscape, OS 1, to the network and have been using it ever since to communicate, collaborate, and keep in touch.

OS 1 is a minimal, multipurpose interface for bringing a group together to chat, share links, write and engage in discussion. OS 1 is free of any ads, tracking, or surveillance (as is the norm for anything built on Urbit). OS 1 is a stripped-down social utility designed for high-trust, direct communication and collaboration. OS 1 is the place for small communities to feel at home.

<img class="ba" src="https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-3.png">

We built OS 1 for ourselves. We were sick of using centralized, mainstream software. We didn’t want to be stuck switching between bloated, monolithic services in order to keep in touch and move our work forward. We were done relying on some third party to take care of our community—so we exited to Urbit, and it feels good.

If you’re curious to get a complete overview of OS 1, check out [this post](https://urbit.org/blog/introducing-os1/), watch the [release event](https://www.youtube.com/watch?v=71ViyftPkGk&feature=youtu.be&t=3963) or feel free to [boot a node](@/getting-started/_index.md) to come talk to us.

Our target with OS 1 was to produce the [Nokia 3310](https://en.wikipedia.org/wiki/Nokia_3310) of cloud computers. Something bordering on simplistic, but still nice to use. We hit that target, but it’s just the first milestone. Let’s talk a bit about how Landscape grows and matures at a high level (for more specifics on the near-to-medium term, check out [the roadmap](https://urbit.org/understanding-urbit/roadmap/)).

<img class="ba" src="https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/uu-interface-4.png">

Landscape has two basic building blocks: groups and modules. A group is exactly what it sounds like: one or more people. A module is sort of like an app without the data lock-in. A module is just a tool for getting something done, like ‘tasks’, ‘links’ or ‘votes’ that’s shared by a group.

To give a few simple examples, a group of family members may just chat and share photos. A group of traders might share annotated research, watch the markets, and manage payments on a blockchain.

Today, Landscape only has a few modules that come out of the box: chat, links, and publish. Our plan is to keep expanding this suite such that the default suite of modules feels like a nicely balanced toolkit for building community and staying connected. We’d also like to make it easy for anyone to build their own module and share it with others directly over Urbit’s network.

The idea is this: any community should be able to customize their digital environment freely. For most users, this is just about choosing the right modules. For anyone with a bit of free time, adding your own modules should only be as difficult as building a simple webapp.

When we look forward to what we can do with Landscape in the future, it’s hard to see ourselves going back to the tools we use today. The centralized services we have now are like broadcast media: they’re for distributing content from a producer to a bunch of followers.

Landscape is for everything else. Landscape is for actual two-way communication.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/your-last-computer/your-last-computer-waves%402x.png">

Our desire to build a single place to work together isn’t driven just by convenience
(although it is quite convenient). The way we see it, [real communities need to have real ownership over the spaces they inhabit](https://urbit.org/blog/urbit-is-for-communities/). When communities use industrial-grade, one-size-fits-all software they feel as sterile as the software they use. That world always felt a bit like living in a planned community. We’d rather live in the countryside.

We think Landscape can evolve into something even *more* powerful, cleaner, and more satisfying to use. Landscape is neither a social network nor productivity software. Landscape isn’t centrally controlled or passively surveilled. Landscape is something entirely new. It’s software that’s tailored to the people who use it, by the people who use it.
