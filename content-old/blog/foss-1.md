+++
title = "Urbit's Open Source Culture, Part I"
date = "2023-05-31"
description = "How did Urbit cultivate a unique open source software culture? Let's take a look at how we got to where we are today."

[extra]
author = "N E Davis"
ship = "~lagrev-nocfep"
image = "https://upload.wikimedia.org/wikipedia/commons/a/a9/SR71_factoryfloor_SkunkWorks.jpg"
+++

![](https://upload.wikimedia.org/wikipedia/commons/a/a9/SR71_factoryfloor_SkunkWorks.jpg)

> “Open source is an intellectual property destroyer. I can't imagine something that could be worse than this for the software business and the intellectual-property business.”  (Jim Allchin, Microsoft executive)

A founder's personal enquiry into the foundations of practical computing grew into a skunkworks startup to build an alternative basis for principled computing, and has now evolved into a burgeoning open source platform and community.

- [Moron Lab, “Maxwell's equations of software (Nock)” (~2010.1.9)](https://moronlab.blogspot.com/2010/01/nock-maxwells-equations-of-software.html)
- [Moron Lab, “Urbit: functional programming from scratch” (~2010.1.13)](https://moronlab.blogspot.com/2010/01/urbit-functional-programming-from.html)

How did Urbit cultivate a unique open source software culture? Let's take a look at how we got to where we are today.

Open source culture really got going in the 1980s with the restrictive Unix licensing scheme and the consequent publication of the GNU software tools. With the marriage of GNU to Linux ([“I'd like to interject for a moment”](https://copypastatext.com/id-just-like-to-interject-for-a-moment/)), a full stack, from the bare metal to the end user, was possible. Usenet and early Internet forums furthermore encouraged interested developers to start contributing actively.

The ethos of open source software drew on a number of sources, from William Gibson's _Neuromancer_ trilogy to “A Cypherpunk's Manifesto.” Those involved were often motivated by a healthy distrust of proprietary software. The big break for open source software (OSS) came with the [Unix ownership lawsuits](https://en.wikipedia.org/wiki/Unix_wars), which gave GNU/Linux a chance to break into the bigtime for systems software. The [2001 case against Microsoft](https://en.wikipedia.org/wiki/United_States_v._Microsoft_Corp.) as a monopoly lent further credence to the open source mandate.

During this time, Urbit began life as a personal dissertation, in a sense, to derive a minimalist practical set of computing expressions as a combinator calculus. The early concepts that became part of Urbit, such as kelvin versioning and Maxwellian code, show up during its first decade. Nock was not open source for two reasons: the founder's conviction that as software it was already public domain, and the fact that there was no one yet to collaborate with.

It was about a decade before Tlon was started as a small bespoke programming house to work on the esoteric project of defining something usable on top of the minimalist Nock specification. No one knew about Urbit besides some blog readers, and unless you worked in or next to Tlon you had basically zero chance of following the project via software alone.

Early Tlon did a fairly good job of putting their software out there, but the documentation and nomenclature were considered obscurantist and the project was described as performance art or a deliberate wild goose chase. These combined to make Urbit appear fairly opaque, despite open development using GitHub and the liberal MIT license. System components like Nock and Arvo were declared public domain or liberally licensed.

To this point (let's say 2019), Urbit was by license and by code an open source project, but had a reputation for being basically impossible for an outsider, even one with a fair amount of coding experience, to really figure out what's going on without serious handholding from the core devs.  (Nor is this inappropriate for a small startup at this stage—it simply is the way most nominally OSS projects function.) However, the mystery engaged others beyond Tlon to brave the wilds and figure out what this Urbit project was all about.

Urbit’s goal has always been to produce a stable kernel for all time, referred to by a metaphor of losing heat energy and entropy. As Urbit gradually cooled from red hot slag to what we'll call a developer alpha, Tlon began a project of greater outreach to the developer community. In particular, crypto software developers saw attractive aspects in Nock's concision and apparent provability and in Urbit's functional-as-in-math approach to operating system and application state. Tlon started a Discord for onboarding and troubleshooting, including community concierges who were tasked with engaging anyone with ship troubles. This tapped into and fostered a culture of Urbiters aggressively helping others debug and troubleshoot their ships, which continues to this day. Tlon also began Hoon 101 to teach outsiders how to actually build things on Urbit.

As Urbit slowly grew into a larger developer community, some hard strategic questions about project scope and direction came into focus. There had always been a provision for Urbit to have some sort of foundation with stewardship over the project—either the Urbit Educational Foundation or something similar. Like the Linux Foundation, this organization would serve to coordinate activity between various companies and individuals contributing to the Urbit project. The foundation would receive an endowment of galaxies earmarked to fund Urbit's development.

Urbit's use of address space to fund development means that the builders, even those who have discovered Urbit relatively recently, are able to acquire a significant stake in the project and its success.

In practical terms, Tlon started the Urbit Foundation internally first as `urbit.org`, then rolled it out as a standalone company with a mandate to first build itself into a viable cultivator of Urbit, then to take over Urbit core development. By early 2023, the Urbit Foundation was in a position to take over core development for the platform.

There have been several aspects of this journey that have led Urbit to have a thriving and promising open source software culture:

1. Urbit's nature as a functional operating system has a deep appeal to software developers and others who find appeal in a mathematically elegant system, including the guarantees made by innovations such as the scry namespace bindings and the public key infrastructure.
2. Hoon is a mood. What I mean by that is that Hoon's unique aesthetics, subject-oriented paradigm, and the utility of cores give coders a unique experience, like systems programming in APL would feel like.
3. The developer docs are finally prioritized and made publicly legible. Large swaths of the operating system and standard library are finally documented.
4. Third-party software distribution is made trivial. Decentralized peer-to-peer open source software distribution without having to go through a GitHub intermediary changes the game.
5. Urbit's educational program expands from Tlon's initial offerings to a community program (Hooniverse/Hooniversity), then to a dedicated program with specific course milestones under the auspices of the Urbit Foundation.
6. Urbiters start meeting in person at Assembly and other events. After the 2020 efflorescence of the Urbit community, this is the first time most of the newer people were able to meet in real life. (This is a substantially different situation than the pre-2019 Urbit environment—most people didn't know Tlonners first, they knew Urbit first and mainly online.)
7. Three major active groups form dedicated to all-purpose coding on Urbit:
  A. Hooniverse, ~hiddev-dannut/new-hooniverse, originally strictly for the community Hoon School but now for all of the UF's educational efforts.
  B. The Forge, ~middev/the-forge, for advanced technical discussion.
  C. `[battery payload]`, ~dister-dozzod-lapdeg/battery-payload, the UF's developer community group.
8. The Urbit Foundation begins an active grants program. At first focusing on userspace and cultural grants, this eventually leans back into kernel work.
9. As the Urbit Foundation takes over core development, this necessitates changing that process from being a one-company project to requiring coordination, said coordination being much easier in the open than in closed meetings. (This also enables Tlon to focus on product delivery over core development.)
10. The Urbit Foundation begins using a `gather.town` “Urbit Hacker House,” which puts people together for synchronous interrupts. Any community member can wander in and be a fly on the wall or an active interlocutor.
  A. This enables the UF to start hosting daily pull request triage and a rapid assignment of tasks in the open.
  B. Communications strategy meetings are also public.
  C. Build parties (originally conceived as app-in-a-day) demonstrate pair programming, achieve inter-programmer communication of information akin to IRL programming, and allow anyone to participate.

We find ourselves, as Urbit developers, having grown together a strong and unique culture of open source software development verging on radical transparency. It's not just code and license being open—it's the entire ensemble of programmer culture and on-platform dogfooding (to the extent possible). The greybeards and the noobs encounter each other directly and openly all the time, in `gather.town` and in Urbit groups.

From modest beginnings, Urbit has achieved some small traction in the world and grown an exemplary open source culture. What will it take for Urbit to succeed in the future?  That's the next entry.
