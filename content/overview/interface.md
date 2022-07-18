+++
title = "Interface"
description = "What Urbit feels like to an everyday user"
weight = 4
[extra]
+++

We built Urbit OS + Urbit ID to be the software stack for human-scale computing in the cloud. This system wasn’t built solely to be new infrastructure—it was built so that we can build better interfaces on top and people can use Urbit without having to know about the technology at all. For Urbit to actually matter, we have to go all the way from VM to UI.

Landscape {% .font-bold .subpixel-antialiased .pt-8 %}

To address the interface component of the stack, Tlon built Landscape: a simple, calm, browser-based interface for building digital communities. 

Today, once you have an Urbit OS node up and running, you can access Landscape from a desktop or mobile browser to pseudonymously chat, write, and share links with a group of friends.

![](https://media.urbit.org/site/understanding-urbit/uu-interface-3.png)

Landscape is by no means the only possible interface for Urbit OS + Urbit ID, but it’s the one that we need the most. In the future, we look forward to there being lots of different Urbit interfaces (and if you’re at all interested in experimenting with building one, please do.)

What problem is Landscape solving? Let’s start with the current situation when it comes to cloud services.

In today’s world of apps and services, there’s no operating system in any meaningful sense. Our communities, co-workers, and lives are spread between these services—and the work of combining them is left to the user. It’s completely up to you to remember all your passwords, who sent what message where, what files are on which platform, and so on.

It’s annoying and confusing to switch between interfaces, you can’t extend or build on top, and privacy and security are out of your hands. This fragmented, siloed, closely surveilled experience is simply a byproduct of having other people run and control your software. For the ordinary user, the result is restrictive, boring, and painful to manage. The possibility for everyday creativity with the tools we’re stuck with is close to zero. Wasn’t the computer supposed to be a bicycle for the mind?

Operating systems for the PC took the desk of the 1970s and made it digital. Paper, drawers, and envelopes became ‘files’ and ‘folders’. It’s a great abstraction, but it’s ancient. We live in a connected, multiplayer world; we need an operating system that acknowledges this world.

The ‘desk’ of today is cluttered with apps and services, data structures, and interfaces. Unifying this disjointed user experience is the most important problem that a platform like Urbit can solve. Landscape is built to bring everything together into a unified interface again. Without Urbit ID + Urbit OS, this would be impossible.

Landscape is a minimal, multipurpose interface for bringing a group together to chat, share links, write and engage in discussion. It’s free of any ads, tracking, or surveillance (as is the norm for anything built on Urbit). It’s a stripped-down social utility designed for high-trust, direct communication and collaboration. It’s the perfect place for small communities to feel at home.

Design {% .font-bold .subpixel-antialiased .pt-8 %}

Landscape has two basic building blocks: groups and modules. A group is exactly what it sounds like: one or more people. A module is sort of like an app without the data lock-in. A module is just a tool for getting something done, like ‘tasks’, ‘links’ or ‘votes’ that’s shared by a group.

To give a few simple examples, a group of family members may just chat and share photos. A group of traders might share annotated research, watch the markets, and manage payments on a blockchain.

The idea is this: any community should be able to customize their digital environment freely. For most users, this is just about choosing the right modules. For anyone with a bit of free time, adding your own modules should only be as difficult as building a simple webapp.

When we look forward to what we can do with Landscape in the future, it’s hard to see ourselves going back to the tools we use today. The centralized services we have now are like broadcast media: they’re for distributing content from a producer to a bunch of followers.

Landscape is for everything else. Landscape is for actual two-way communication.