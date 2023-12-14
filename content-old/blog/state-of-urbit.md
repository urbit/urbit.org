+++
title = "State of Urbit"
date = "2021-08-24"
description = "A year in review"
[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
image = "https://media.urbit.org/site/posts/essays/cities-6.jpg"
+++

![](https://media.urbit.org/site/posts/essays/cities-6.jpg)

In the past year, as Urbit has become more reliable and easier to use, we find that we&#39;re spending almost all of our time on the network. We&#39;ve disappeared into the system we&#39;ve been building, and it&#39;s a pleasure to be on Urbit. There&#39;s nowhere else we&#39;d rather be.

If you&#39;re on the network with us you can see the system being built and getting better in real time. Bug fixes and new features appear on your ship constantly. The community is actively planning the future of the system _using the system itself_. At Tlon, we have the unparalleled pleasure of working on the system, _on the system_. This feels great, but for those of you who aren&#39;t on the network, it can look as if we&#39;ve disappeared.

Right now, Urbit is not for my non-technical friends. But everyone can tell that mainstream apps are getting worse and most feel a desire for change. We want Urbit to be as easy to use as a conventional service. Or, at least as easy to use as Signal. And we&#39;re getting pretty close to that.

In this post I&#39;ll cover the progress we&#39;ve made since releasing OS 1 so those who aren&#39;t on the network can get a sense of what we&#39;ve been up to and where we&#39;re going. We&#39;ve built a great communication tool called Landscape, we are improving Urbit&#39;s ease of onboarding, and we&#39;re launching an entire software distribution system. We have a lot of work on our plate.

Okay, let&#39;s talk about where we currently stand and where we&#39;re heading.

**Arc**

Let&#39;s start at the top: we&#39;re working to build a new network and operating system for everyday cloud computing. We think everyone deserves to control and shape the tools they use to communicate and collaborate.

Or, to put it another way: the apps and services we have today are confusing, annoying, and overly complicated. The only way out is to start at the foundation by building a new software stack. Once we have a cloud computing stack that an individual can own and completely control, the old hope that computers can be tools of freedom will return. We haven&#39;t forgotten the original vision of software as a fun, free, flexible everyday tool.

This is a hilariously ambitious thing to try to do, we know. This is what makes it fun. So far, we just try to move step-by-step without overhyping what we&#39;re doing. Building a new platform for networked computing is both a technical and social problem. The technology has to work exceptionally well and the community has to care for it and move it forward.

Our first step was simply to build a prototype, then to refine it into something that could plausibly work. Then, most recently, take that plausible prototype and build a user experience we liked enough to depend on it from day-to-day.

In the last eighteen months we&#39;ve done exactly that. We depend on Urbit day-to-day and have shipped a tool that has become a home for numerous cultures and communities who are invested in moving the system forward. We first called that tool OS 1 but now it&#39;s known as Landscape.

First, let&#39;s talk about the general arc of OS 1 → Landscape, both the successes and challenges. Then we&#39;ll talk about our next step, which is to create an independent and community supported software ecosystem.

**OS 1 → Landscape**

The tools we use shape the way we think. So how could we build better tools with old broken ones? We needed to cut our reliance on old tools that couldn&#39;t care less about how people actually work and live. The only thing they maximized was distraction and dependence. We needed something that was fundamentally private, durable, and flexible. Above all, we needed something that actually belonged to us.

Building Urbit involves a lot of communication and collaboration. In order to move Urbit forward we knew that we needed a place to converse and connect, and we knew that place had to be on Urbit itself. We didn&#39;t need a Slack or a Discord or a Google Drive or a Reddit. We needed all of those things, in one place, that actually belonged to us.

We experimented, built things, threw them away, and then eventually built and [launched OS 1](https://www.youtube.com/watch?v=71ViyftPkGk).

OS 1, now Landscape, is a simple tool for bringing groups together to communicate and stay connected. When a real physical community goes online they immediately become fragmented between various apps. Perhaps a Slack channel coupled with some Notion notebooks and a Telegram channel works for some people. It&#39;s easy to imagine other permutations, and you probably are already in at least two or three. These duct-taped stacks are not only ugly and confusing, but your day to day computing is spread thin and remains in the control of companies—not you.

Urbit is a decentralized network but Landscape is for re-centralizing your communication. Users can form groups which share a set of channels; each channel can be either a chat, a notebook or a collection of links. This means groups can communicate flexibly, exactly how they want. And since Landscape is built on Urbit, each group is private and peer to peer; data is only shared between people in the group; each community on Landscape is completely independent. Communities own their data and last as long as they need to.

This combination of a flexible unified interface on a decentralized platform you can trust feels really good.

When OS 1 was first released, it was slow, buggy, and frustrating—but we loved it and wanted it to be better. We spent the next nine months making sweeping changes to take it from releasable prototype to pretty-nice first version. We rewrote the frontend completely, massively improved the performance of Urbit OS itself, and overhauled the interface. It was an enormous collective effort.

By the end of 2020 we had renamed OS 1 to Landscape and the user experience was far better. We [announced our hosting service](https://www.youtube.com/watch?v=w3qKe_WZr50) and onboarded close friends to help us test the system. I [wrote a little](<[https://tlon.io/news/landscape-now/](https://tlon.io/news/landscape-now/)>) about using Landscape from day-to-day around that time.

Landscape wasn&#39;t just a useful tool for us, but it was something that other communities were starting to use in earnest. It seemed like Landscape could be a great place for people to grow new private communities, so long as we could onboard new users effectively. Hosting is a huge piece of the puzzle, since we need non-technical people to be able to use this wonderful platform as easily as its mainstream competitors.

At this point (early this year), we encountered some pretty serious hurdles.

To use Urbit, you need an Urbit ID. Each one of these is an NFT (something that no one cared about when we first launched Urbit ID). The basic idea is that an ID should cost something so that they aren&#39;t used abusively. But, in late 2020 the combination of a crypto bull market and congestion on the Ethereum network caused the transaction fee for buying an Urbit ID to increase from ~$1-2 to ~$100. An Urbit ID should cost _something_, but \&gt;$100 is too much of a barrier for entry. We knew that this could happen and started researching solutions late last year, ultimately deciding to [implement a solution ourselves](https://urbit.org/blog/rollups/).

The tough part about having an identity verified on the blockchain is that you become vulnerable to unpredictable volatility. We saw a period of painfully high prices, followed by a dip, followed by another stretch of extremely high prices. We opted to continue releasing Landscape updates and moving the system forward despite the fact that it became prohibitively expensive to onboard people. Luckily, our solution to this problem should go live this summer, and will reduce the cost of onboarding about 60x. The best part is that it is a permanent solution so we&#39;ll never have to face this problem again.

The other challenge to scaling the onboarding process is hosting.

We have a functional hosting structure but we want it to be fully automated and featured. We&#39;ve been able to onboard friends and enthusiasts which has taught us a lot about how the system should work. But hosting has to be easy for anyone to join and get online quickly. Without an automated invite flow and it&#39;s not ready for prime time.

We&#39;ve made great progress on this front. We are currently testing improvements internally and aim to have a final version ready simultaneously with lower planet fees. Then, at long last, we can comfortably invite friends to get on the network without ever leaving the browser.

It&#39;s worth mentioning that hosting is very much a Tlon Corporation project. Urbit is a platform owned, maintained, and developed by the people that use it (along with the nascent Urbit Foundation). Tlon, while also contributing to the Urbit project, ultimately wants to produce applications and services on Urbit. Hosting is one of those projects. Hosting makes Urbit easy, approachable, and usable without the compromises involved in using a conventional service. Since we&#39;ll be one of many Urbit-related providers, Tlon won&#39;t be the only host. There are already a few others (like [UrbitHost](https://urbithost.com/)) getting off the ground, which is fantastic.

**Landscape → Grid**

As the world has become more physically distributed we rely on our digital tools to keep our communities connected. The rise of DAOs, collectives, squads, and alternative community governance structures underscores the importance of tools like Landscape that communities can actually own and control.

Our first goal was to find out if we could build something really good on top of Urbit. We did that. And we&#39;re continuing to lower the barrier to entry. We&#39;ve also got an Urbit &#39;messenger&#39; iOS app in the works that&#39;s really nice.

Landscape is great, but in the long run Urbit is meant to be a platform for anyone to build on top of. Urbit is a computer, not just a single communications app like Landscape. The whole point of Urbit is to make it easy for an individual to run their own general-purpose computer in the cloud. Your Urbit isn&#39;t just meant to run Landscape it&#39;s meant to run any sort of application. And that&#39;s where we&#39;re going next.

Grid is a holistic interface for interacting with your Urbit node. Landscape, as it&#39;s known today, will become one of many apps that can be launched. Perhaps most importantly, Grid will have peer-to-peer software distribution over the network. This means you can, as a developer, build something, let a friend sync it over the network, and never have to run a dedicated distribution server. Or, as an everyday user, you can run software on your private Urbit node without the developer ever being involved.

Urbit isn&#39;t an OS in the traditional sense—it&#39;s an &#39;overlay&#39; OS. It has to run on top of something else. But Urbit _is_ an OS in the sense that it&#39;s general-purpose. And our goal in building interfaces for Urbit is to deliver that feeling of openness and flexibility to the user. Grid is a major step toward that goal.

Not only should a community own their communication tools, they should be able to run and host their own cloud software. They shouldn&#39;t need to rely on providers to store their data, run the application, and determine how their digital life will function.

Grid will surely go through the same process that Landscape did. It&#39;ll start as a working first version that will inspire us to refine and make it better. But, unlike Landscape, Grid opens up an entirely new frontier for what can be done on Urbit.

We&#39;re putting together our first conference on Oct 15-17th to inaugurate Urbit as an integrated platform and distribution system for new applications. [Tickets for Assembly 2021 are already available](https://checkout.eventcreate.com/assembly2021/select-buy). Tlon is going to Austin!

**Closing**

Urbit is a deeply optimistic project. Although the digital world seems more broken than ever, we&#39;re confident that something else is possible. We have already created software that people use everyday. We want everyone to have the experience that we do, and we want that experience to continue to get better. Beautiful, reliable infrastructure that communities can build on will have a significant impact on the world. The end game of connected computers doesn&#39;t have to be dystopian.

For those of you who aren&#39;t directly involved with the project, I hope this gives you a snapshot of where we are. If we were on an Antarctic expedition the postcard would read something like &#39;Team is well-fed, healthy and motivated. Making great progress.&#39;

With that, I&#39;ll get back to work.
