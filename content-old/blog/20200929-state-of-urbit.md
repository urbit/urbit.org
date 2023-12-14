+++
title = "Late 2020 Progress Update: OS 1 -> OS 1.N"
date = "2020-09-28"
description = "When we announced OS 1, in April, we started to disappear into Urbit. Since then, we’ve been living on Urbit like we never have before."

[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
image = "https://storage.googleapis.com/media.urbit.org/site/posts/essays/state-of-urbit-1.jpg"
+++

![Grassy Knoll](https://storage.googleapis.com/media.urbit.org/site/posts/essays/state-of-urbit-1.jpg)

When we announced OS 1, in April, we started to disappear into Urbit. Since then, we’ve been living on Urbit like we never have before. This has been our goal for years: to mature the system we’re building by becoming its first committed users. We knew that critical step toward Urbit’s maturity was being able to depend on it ourselves, but the system itself had to mature to the point that we could do that practically.

We’ve done this in fits and starts. We’ve _tried_ and failed a few times over the years. We’ve always _used_ Urbit to some extent, but we’ve never _relied_ on it. These past six months have been different. I can’t tell whether it was out of sheer determination and commitment, or that the system was just genuinely ‘there’. Either way, both Tlon and the Urbit Community genuinely live on Urbit now.

In a way, our ability to use Urbit day to day doesn’t make sense. When we shipped OS 1, it was full of holes. There were serious performance, stability, and reliability issues. Plenty of people showed up and thought, ‘I don’t understand why you think this is useful.’ But, it was good enough that we wanted to use it. And since we wanted to use it, we put our energy into making it better like we hadn’t ever before. Being able to use a system that you can really trust is a wonderful feeling. It’s Computing Without Compromises.

All of the sudden, it’s Fall. We never found the time to name any of our releases or write announcements. We’ve just been making the system better in every way we can find. We’ve got a lot of exciting things planned for the last few months of the year — but I wanted to recap the progress we’ve made for those following along from the outside. If you haven’t been on the network, it’d be impossible to see.

The tl;dr is that Urbit is much faster, more reliable, and nicer to use than it was six months ago. Things have gotten much better, across the board. We threw ourselves into OS 1 admittedly underprepared, but we’ve learned a lot and matured the system a lot along the way.

Anyway, let’s walk through the details. We’ll talk about our infrastructure and interface work independently, since that’s how we organize things internally. Then we’ll talk a bit about what’s going on on the network.

### Infrastructure

![Debugging Interface](https://storage.googleapis.com/media.urbit.org/site/posts/essays/state-of-urbit-2.png)

In April, Urbit was slow, fragile, and didn’t always update itself properly. We made enormous progress on all of these.

First off, Urbit is about 10x faster for most users. With some careful debugging, we were able to locate a few really [high](https://github.com/urbit/urbit/pull/3029) [impact](https://github.com/urbit/urbit/pull/3054) [improvements](https://twitter.com/pcmonk/status/1276327036722704385). There’s still performance work to do, but the effects of this work are widespread. Boot times are faster, local compute is faster, the network is faster. It’s a huge improvement.

Second, we got our memory usage under control. Urbit still uses a 2GB memory arena. If the state of your Urbit grows to over 2GB things, uh, fall apart. This used to happen regularly, and now it’s pretty much unheard of. We implemented [tooling](https://github.com/urbit/urbit/pull/3235) to compact and deduplicate the memory image when it’s growing too large. We brought the memory usage of the compiler [down ~90%](https://github.com/urbit/urbit/pull/3041). There are areas where we can be more disciplined about how we use memory, but this is more or less a solved problem for the near term.

Third, we implemented a completely new build system. Well, we actually [got rid of the build system](https://urbit.org/blog/ford-fusion/) altogether and [made it a part of the filesystem](https://github.com/urbit/urbit/pull/3060). This made it possible for us to fix our over the air (OTA) updates and make them both fast and reliable. In April, an OTA could bring down your node and would take hours or even days to apply. Today, we regularly deploy OTAs with no fear of them breaking any nodes — they often go from galaxy → planet in a minute or less.

We also rewrote a large part of our runtime in Haskell and made overall progress on [network scaling](https://github.com/urbit/urbit/pull/3174). And: we implemented a [principled approach](https://github.com/urbit/urbit/pull/2366) to [error handling](https://github.com/urbit/urbit/pull/3064), making nodes much less likely to become unrecoverable.

The network is stable, fast, and safe from day to day. We’re pretty confident it can grow quite a bit without serious issues. When we shipped OS 1 we really weren’t sure what we could handle. Now we’re standing on much more solid ground.

### Interface

![](https://storage.googleapis.com/media.urbit.org/site/posts/essays/state-of-urbit-3.jpg)

When we shipped OS 1 it was a bunch of separate pages (that were slow to load), all with separate ways of storing and processing data. Our interface work over the past six months is all about unification and simplification.

First, we pulled OS 1 together as a [single page app](https://github.com/urbit/urbit/pull/3025). Using OS 1 involves a good amount of moving around and refreshing the page each time was pretty painful. Now it’s snappy to move between pages and keep up with what’s going on. In tandem, we started using our own component library, [Indigo](https://github.com/urbit/indigo-react). This makes frontend development much cleaner and more efficient.

Next, we unified the way we store data and compute. It used to be that each individual module (chat, publish, and links) used their own ‘agents’ to store and process data on the Urbit side. (An agent is the Urbit equivalent of a datastore + business logic.) With a lot of moving parts, this approach caused all kinds of synchronization challenges. Rather than a module-per-agent model we’ve started to move toward a type-of-data-per-agent model. The first of these is [graph store](https://github.com/urbit/urbit/pull/3110). We’re presently in the process of migrating all our modules to graph store.

Those two are by far the most significant, but there’s so much more. We [rewrote](https://github.com/urbit/urbit/pull/2937) the `group-store`, allowing for different roles (admin, moderators, and so on) in a group. We shipped better debugging tools, automatic reconnection, a settings panel, and overall visual polish and refinement.

![](https://storage.googleapis.com/media.urbit.org/site/posts/essays/state-of-urbit-4.jpg)

And I almost forgot [Leap](https://github.com/urbit/urbit/pull/3231): an omnibox for navigating around OS 1 with the keyboard. We have plans to make Leap much more powerful — but it’s a great first start toward making OS 1 keyboard accessible. I almost exclusively use [Leap](https://upload.wikimedia.org/wikipedia/commons/0/06/Canon_Cat_keyboard.jpg) to get around OS 1 these days.

### Community + network

![Fishing Village](https://storage.googleapis.com/media.urbit.org/site/posts/essays/state-of-urbit-5.png)

Our primary goal with OS 1 was to get both Tlon and the Urbit Community living entirely on Urbit. We did that, and in doing so we’ve seen how nice it is to grow a community in a calm, non-invasive environment. We started doing regular [Urbit](https://twitter.com/urbit/status/1308875082312364048) [Dialogues](https://twitter.com/urbit/status/1304139629948329985) with friends and peers in the absence of physical meetups, which have been fun.

Getting onto Urbit is still relatively challenging. By the standards of software you run yourself, it’s not so bad at all. But by comparison to ordinary consumer software, it’s way too hard. Tlon is [working on that](https://tlon.io) — but these last six months have been only for the brave. That is, those that want to host their own nodes.

Turns out, there are plenty of people who are up for running Urbit themselves and quite a few small communities have sprouted around the network. Overall the network has a fun, cozy feeling. It’s nice.

### What’s next

We’re still more or less flat-out, full speed ahead into an even better Urbit-world. The seeds of change were planted when we made Josh the [interim technical director of urbit.org](https://urbit.org/blog/first-steps-towards-urbit-org/). Urbit itself is getting close to the point where the separation between Urbit and Tlon has to become more real. Urbit is aimed at being an ubiquitous platform, Tlon is aimed at making it as usable and useful as possible.

We’ll talk about some of this on [October 9th](https://www.meetup.com/urbit-sf/events/273439025/), and you can see a bit of what’s coming on [tlon.io](https://tlon.io) today. If you tried booting Urbit in April and it was tough, try again. We’re easy to find on the network, and we’d love to get reacquainted.
