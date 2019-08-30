+++
title = "~2019.5 Roadmap"
date = 2019-05-16
description = "Where we are and where we're going as of mid-2019."
aliases = ["/posts/essays/2019-5-roadmap"]
[taxonomies]
posts = ["Essays"]
[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
+++

![](https://media.urbit.org/site/posts/essays/2019-5-roadmap-1.png)

We often get so busy that we forget to tell you what we’ve been up to. Here’s an update on what we’re doing and where we’re headed with each layer of the stack.

At a very high level we have two goals for 2019: make Azimuth easier to use, and get Arvo to a 1.0.

Next year we’ll begin to move away from some of the MEGACORP software we use in the office, and replace it with our own tooling. There’s some exciting work happening in that department, but we’ll cover that in a future post.

For some related recent thinking on all of this, see [The 100 Year Computer](/posts/essays/the-100-year-computer/), [The State of Landscape](/posts/essays/the-state-of-landscape/) and [Azimuth as MultiPass](/posts/essays/azimuth-as-multipass/).

For now, let’s just look at what’s on the immediate horizon:

## Azimuth

At lunch the other day someone on our team said something like, ‘We built a complete and working public key infrastructure, but we haven’t told anyone.’

It’s true. Azimuth is operational, secure, and well tested. It’s a pretty cool piece of technology and it’s out there in the world for anyone to use. It also doesn’t require that you use Arvo — Arvo happens to make use of Azimuth, but Azimuth itself is a completely separate system.

So the question is why haven’t we told the world about it?

I tend to think that in order for a technology to succeed it has to not only be an important technical innovation, it also has to be easy to understand as a product. And that’s our answer: we’ve undersold Azimuth because we want it to be easier to understand by *using*, not just by reading the code. Azimuth is quite an elegant piece of technology — but that doesn’t matter until it has a great user experience to match.

That’s why, in the near term, we’re focused on building on top of Azimuth ourselves. We can’t ask others to go down roads if we haven’t already been down them.

Here’s what we’re building first:

### Q2 2019

- A simplified onboarding flow for getting an Azimuth point that’s simple to share with friends over email, text or as a URL.
- A redesigned and improved Bridge for managing your points.
- An interface that allows you to easily send money between Azimuth points without running Arvo.

### Q3 2019

- Expanded Azimuth-centric example modules, documentation and developer tooling.

Still under consideration:

- An OAuth server or JWT flow for logging into any service with an Azimuth point.
- A mobile app for point to point payments using Azimuth.

### 2020

Azimuth is beginning to feel like [multipass](/posts/essays/azimuth-as-multipass/), with a variety of ways to use Azimuth points without ever booting Arvo

## Arvo

The Arvo interface has always been held back by Arvo’s technical immaturity. This is still true to some degree. The system has not stabilized completely.

But! We’ve been using Landscape quite a lot lately. I use it daily, in fact — even [on my phone](https://itunes.apple.com/us/app/landscape-urbit/id1393148862). An encrypted (although not audited — so let’s not call it ‘secure’), authenticated chat where I own the keys and can read the source code feels really nice to use. The interface isn’t as good as we’d like, but it’s not bad. Landscape is a great preview of where we’re going: a simple, permanent, self-sovereign computer.

There are still rough edges, and Landscape is not nearly general purpose enough, but we have plans:

### Q2 2019

- A new update to the Arvo interface that we’re calling Modulo. Modulo expands beyond chat and longform discussion to make your Arvo interface feel much more like the computer it actually is.
- Upgrades to our event persistence, networking, and DNS integration aimed at much better stability. Arvo instances don’t crash that often, but with these changes it should be very rare.
- Significant improvements to testing with a new simulation testing framework and integration testing pipelines.

### Q3 2019

- A significant overhaul to Gall, our application model, making it much simpler for users to write apps or ‘agents’ in Arvo.
- A new version of the compiler that makes us less reliant on jets. This will eliminate a major obstacle to achieving network continuity, or the ability for ships to upgrade themselves totally over-the-air, forever.
- A significant overhaul and stability update to Clay, our filesystem, making it possible for us to trust it for self-hosting, search it easily, and depend on it for long-term data storage.
- Tooling for hosting and hopefully a beta program for hosted Arvo instances run by Tlon.

### 2020

- A completely overhauled Arvo interface, Daigo, with a complete but simple set of messaging and collaboration tools. Modulo is meant to be fun to experiment with, but we aim to make Daigo part of our daily workflow.
- We come to work every day, use Arvo, go home.

## Community

We’ve often felt like it was far too early to invite others in to the system.

As long as we’re up front about the state of this 100 year computer -- that it’s live, but incomplete — I think it’s a good thing to welcome people on board. There’s plenty to play with, experiment with and explore.

Hoon school was the first effort in this direction. We intend to do a lot more:

### Q2 2019

- Scaling Hoon school up to include both a track for experts and for beginners, and allowing many more participants.
- Holding more meetings and events on Landscape, experimenting with Arvo-native discussion.
- A clear program for address space grants for developers + contributors.
- New documentation site with searchable library docs.

### Q3 2019

- Hoon School participants understand clearly how to build a Modulo agent, and invite others into it.
- The road toward building an Azimuth module is well understood, paved, and clear.
- We have clear instructions and tutorials for building Azimuth modules and using Azimuth as a login or reputation primitive.
