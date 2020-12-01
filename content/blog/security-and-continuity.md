+++
title = "Security and Continuity"
description = "An update on our primary infrastructure milestones for 2020."
date = 2020-12-01
[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
image = "https://media.urbit.org/site/posts/essays/land4.jpg"
+++

![Security and Continuity](https://media.urbit.org/site/posts/essays/land4.jpg)

## Security and Continuity

In 2018, when we launched the Urbit ID contracts (also called ‘Azimuth’), we committed to yearly infrastructure goals for 2019 and 2020. This wasn’t an informal commitment — it’s part of the contracts that were published to the blockchain, which you can read [here](https://raw.githubusercontent.com/urbit/azimuth/edf68b8da04806dd5b95994daf14cf1e7e226829/proposals/0xcb1f81e42b5e75f000f94fc71a3ea70cab4bfc6f236b91e717f1b9516e5596b5.txt). At the end of each year, we ratify our accomplishment of these goals with a galaxy vote.

Since the year is coming close to an end, and this year’s vote is on the horizon, it’s time for an update on our progress.

For this year, we committed to completing two things: passing a third-party security audit of our networking protocol (Ames) and getting Urbit OS (both Arvo and the interpreter) to the point where we can reasonably expect the Urbit network to continue without any hard forks (which we call ‘breaches’). A world with no network breaches is one where the network should be able to run indefinitely without any interruption. We also call this ‘continuity’.

We’ve been steadily making progress on these two fronts, and I’m happy to report both are nearly complete. We’ll walk through some of the details here and then follow up in another post soon to report on how the final work turned out.


## Ames Audit

Urbit OS is an ‘overlay OS’: it runs on top of (pretty much) any flavor of Unix. Each Urbit OS node communicates with other nodes over UDP using Ames, the Urbit-specific networking protocol.

There are two things worth worrying about when it comes to Urbit OS security: someone breaking into Urbit from the machine it’s running on, and someone compromising the network protocol itself. As to the first, there are probably ways that we can harden the OS sandbox, but if the machine it’s running on is secure we can feel reasonably safe. Since there’s lots of prior art on how to secure a Unix machine, we can leave hardening the runtime for later and simply encourage everyone to secure the boxes they run their Urbit nodes on.

Assuming each node on the network can run on a locked-down machine, it’s really important that the protocol for communicating between these nodes is secure. Also, since Ames uses other Urbit nodes for peer discovery, we want to make sure no ‘relay node’ can inspect data not meant for them.

The question “Is Ames secure?” is too vague for an auditor, of course. The audit was scoped to determine that the following three criteria are met:

- No one can impersonate another ship on the network
- No one (including relays) can intercept and decrypt messages not meant for them
- Ames messages don’t leak keys that could endanger the sender’s data

Our goal with this scope is to focus exclusively on the design and implementation of Ames itself. Basically, the crypto should be correct and there should be no flaws in either the protocol design or its implementation. Our interpreter can still be hardened against other potential attacks, which is work we’ll undertake in the future. We asked our auditors to flag all of these potential issues, so we know what needs to be addressed in the future.

The good thing about an audit scoped in this way is that we can trust the protocol to authenticate people and shuttle packets back and forth safely. We’ve always been reasonably confident about Ames, but having an external stamp of approval will be great.

As of the end of November 2020, the audit is very nearly complete, and we’ve handled all the important issues that were brought up. We’ll post the results and talk about our mitigation strategies in a future writeup.


## Continuity

Urbit is designed to last a long time. What’s the use of a personal computer if it’s gonna disappear along with all the data you put in it? Ideally, you can put your Urbit on a USB stick, forget about it for ten years and have it work again when you plug it in. It’ll need to update for a while, but once our work on continuity is complete, your urbit should be able to upgrade itself through ten years of updates, all over the air.

While Urbit is designed to upgrade seamlessly over the network we have occasionally run into issues that have caused us to reboot the entire network. Most of the time this is when some incompatibility between the interpreter and the kernel means we have to force everyone to do a hard reset to ensure compatibility between the two. Our current work on continuity addresses this. Soon, your urbit will tell you when your interpreter needs to be upgraded. At first this won’t  be that different from an application notifying you to download an update. Eventually, we think we can make this a lot smoother.

A network reboot isn’t the only way that we can break continuity. Urbit is a general-purpose computer — which means you’re free to attempt to destroy it. If, for any reason, you do manage to screw the system up we want you to be able to get your data out and effectively reset continuity on a single node. We built the affordance for that a while ago, but before the end of the year we’ll also distribute tooling to migrate userspace data between hard resets.

The combination of version negotiation and data migration should afford us the ability to run the network indefinitely into the future. Unfortunately, to get this change in, we’ll need to reset the network. We’re optimistic that this will be the last time we ever do it. And, given our data migration tooling, this breach won’t involve losing data.


## Status + conclusion

We have been working with auditors since this summer and should have a report ready to publish in the next few weeks. Both version negotiation and data migration are in testing and are ready to be deployed.

Our goal is to have all of this work complete by `~2020.12.10`. This means we should be able to start a galaxy vote right around that time. Galaxy votes (as specified in the contracts) run for a month, which should have this whole process ending on `~2021.1.10`.

It's going to be an exciting couple of weeks!
