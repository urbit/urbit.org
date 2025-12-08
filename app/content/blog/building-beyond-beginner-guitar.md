+++
title = "Building 'Beyond Beginner Guitar' on Urbit"
date = "2025-12-07"
description = "~nordus-mocwyl walks through what it took to build a guitar course and member community on Urbit"
# aliases = []

[extra]
# author = ""
ship = "~nordus-mocwyl"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_QA+mastyr-bottec_Social.png"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_QA+mastyr-bottec_Social.png"
imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_QA+mastyr-bottec_Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["courseware", "hawk", "userspace"]
+++


By way of introduction, I am `~nordus-mocwyl`. While my background is in music, with credentials including a degree in guitar performance, I also am a graduate of [Hoon School](https://docs.urbit.org/build-on-urbit/hoon-school) Live and [App School](https://docs.urbit.org/build-on-urbit/app-school) Live, and former Urbit Foundation grantee. Urbit captured my attention as a way to own the full networked computing stack, and be able to create digital experiences that I control from top to bottom. One such experience is the recent ['Beyond Beginner Guitar'](https://howmbase.com/demo) course that I created. It is my own little 'Urbit powered business'. While it will continue to evolve (and become more fully Urbit-native), it works *today* and it doesn't demand my creative life energy to be strip-mined, cataloged, quantified, and sold to the highest bidder.

Designed for early intermediate guitarists who completed beginner lessons but are now stalled out wondering, "What do I do next?", the course is built in an Urbit app called [Hawk](https://hawk.computer/~~/overview/). Hawk allows you to build powerful and flexible web pages served from your Urbit to the clearweb, and it is an excellent platform on top of which I can build my own little digital business. In this article, we'll cover:

- How 'Beyond Beginner Guitar' works today
- The external dependencies on which it depends
- My dream for a 100% Urbit-native future
- A bit of detail on what it will take to get there

## An Urbit Powered Business. Today.
As an artist and creator, drawing people towards my work is a critical effort. While my Urbit acts as the central server for my course, the place all students come for the lessons, I maintain a presence in the external world by way of [my YouTube channel](https://www.youtube.com/@brbenji) where I share videos on both Urbit and music. Drawing a connection between this MEGACORP domain, and the sovereign landscape of my urbit server is a necessary function in today's world.

![beyond beginner guitar pipeline wireframe](https://s3.howm.art/uploads/bbg-pipeline.excalidraw.png)

These videos are the main way students discover the guitar course. From the descriptions of my videos, and often as an included call to action in the video itself, I send people to a page hosted by my urbit where I can collect their emails. I also use this link to do a small bit of metric-tracking, to understand which videos are attracting new students to sign-up.

Once the email is collected, I use it to communicate with them. This external dependency on email is a necessary compromise, as not everyone can be assumed to have an Urbit in our current world. A second compromise involves using Google forms in a follow-up flow to learn more about students and determine if they are a good fit for the course. While this form process could easily be done in an Urbit-native manner in the near future, for now, if they are a good fit, I send them a link which brings them back to a pay page served by my Urbit.

On the pay page, there are instructions for manual crypto payments:
1. They pay my ethereum account the proper amount
2. They copy the transaction hash
3. They send it to me over email
4. I verify it and send them the secret URL for the course.

The primary flow, however, uses Stripe for credit card payments. This is another entry point into the legacy world that is presently necessary, largely because we can reliably assume someone who wants to improve their guitar skills has a credit card. The pay page includes a Stripe embed. Clicking the Buy button sends them to a secure, Stripe checkout.

When they pay, they are automatically redirected to another part of my urbit serving the guitar course behind a secret URL. This includes a little hash in the URL path to keep it secret, if not secure. Anyone with that URL can get in, but for my immediate use case the tradeoff is not too extreme.

And that completes the onboarding flow. From this point forward, all of the courseware and course content is served natively from my urbit via Hawk. 

Overall, the experience uses a variety of tools to get interested guitarists in the door:
- Discovery: YouTube. 
- Communication: Email. 
- Delivery: Served from my urbit. 
- Access Control: Secret URL.
- Payment: Stripe.
  - Or manual Crypto option 
  
For me, I see much of this as a compromise due to the creation of external dependencies on MEGACORP service providers, but at least the core connection with my students is free of exploitative middle men. Of course, this all gets much more interesting if every bit of this took place on Urbit.

Let's take a moment here and try to dream up what that 100% Urbit flow would look like. We'll come at it from a world where Urbit is ubiquitous, everyone has an urbit, and Urbit's near-term capabilities are realized.

Assuming this 100% Urbit context let's imagine the same guitar course sales funnel.

## The Dream, that isn't too far off

`~sampel-palnet` taught herself guitar several years ago. Outside of the initial stages of learning, she hasn't made any progress in a long time. Today she's looking for a way back into playing. 

She and her pals all have their own urbits and find themselves in a group together. They have an LLM sidecar with access to all of the group conversations they have had over the years. 

So `~sampel-palnet` asks their LLM,

> Do any of my pals know anything about picking up the guitar again? I want to get back into it and need some help relearning.

The LLM pops up,

> Yes! Two of your pals have talked about a guitar course on Urbit by `~nordus-mocwyl`.
> They both noted enjoying the course and recommending it for others guitar players stuck at an intermediate level.
> Here's a link: `ames://~nordus-mocwyl/beyond-beginner/guitar/intro/pine`

`~sampel-palnet` clicks on the link and sees, 
```
*Welcome ~sampel-palnet!*
I'm ~nordus-mocwyl.

We have these mutuals in common: 
~migrev-dolseg, ~sarlev, ~niblyx-malnus,
~sicdev-pilnup, ~bantus-follus.

This is *Beyond Beginner Guitar* where you 
relearn the fundamentals from first principles 
to regain momentum.

[Get started]
[Learn more]
[Message me]
```

For ~sampel-palnet, the recommendation of her friends is enough. She clicks `Get started`.
```
*Beyond Beginner Guitar* is 179.99 USDC.

You can purchase with any equivalent cryptocurrency.

_All of it gets converted to bitcoin anyways :)_

[Purchase]
```

~sampel-palnet clicks the `[Purchase]` button,
```
Please confirm: Do you want to send 179.99 USDC to ~nordus-mocwyl?

What would you like to spend? 
[ ] USDC
[x] TUSD
[ ] ETH
[ ] BTC

[Confirm and Send]
```

`~sampel-palnet` decides to send 179.99 TUSD. The money goes directly to `~nordus-mocwyl`.

Behind the scenes `~nordus-mocwyl`'s urbit verifies `~sampel-palnet`'s purchase by checking the relevant blockchain. And begins the automated process of registering `~sampel-palnet` into the course.

This looks like adding `~sampel-palnet` into a group, assigning relevant roles, and whitelisting their ship for syncing the course into their own namespace.

After a bit of waiting, `~nordus-mocwyl` returns,

```
Thank you for your payment!

You now have an invite to the group:
~nordus-mocwyl/beyond-beginner-guitar

You have the role:
new-student

You now have permission to sync the course:
[Begin Sync]

[Message me]
```

`~sampel-palnet` clicks `[Begin Sync]` and a dialogue box pops up,

```
Where in your namespace do you want to start syncing:
~nordus-mocwyl/beyond-beginner/guitar/course

our/beyond-beginner/guitar/course

[Confirm and Sync]
```

`~sample-palnet` is a bit neurotic and changes the path to:

`our/purchases/courses/guitar/beyond-beginner-guitar`

And hits `[Confirm and Sync]`.

It starts syncing the latest version of the course from `~nordus-mocwyl`.

They'll receive all updates and retain all versions from this point on. 

As a nice little bonus. They'll get a message automatically from `~nordus-mocwyl`:

```
I'm glad you joined!
You have 2 pals in our group: ~sarlev and ~sicdev-pilnup.
You should say, "hello!"

You can tell me more about your journey with guitar.
What do you think is the biggest thing holding you back?

Feel free to start watching the lessons. If you have questions, 
the group is a great place to ask or ask them to me directly.

Let's check back in a week to see how you're doing.

Cheers!
```

So what's the structure of the 100% Urbit solution?

- Discovery: Organic peer-to-peer.
- Communication: All through Urbit.
- Delivery: The course is synced from my urbit, but served from their own urbit
- Access control: Sync permissions are determined by a whitelist.
- Payments: All crypto with everything automated. Urbit checks blockchains directly.

Technically speaking, this is mostly doable today. Projects like Privateer/[WhiteMarbleDAO](https://whitemarble.ai) have tooling for LLM sidecars. [Tlon Messenger is open-source](https://github.com/tloncorp/tlon-apps) so connecting to it for things like automated messaging can be unlocked by reading their code. And existing tooling like `%eth-watcher` make it possible to check chain state without needing any middle men. It's on me to chip away at it. The only outstanding hurdle is the exact details of how to sync the course. Gall and Clay have some solutions for this, but so too does the next version of Hawk, [499k](https://willhanlen.com/~~/outbox/25/11/hawk-499-demo-vid/).

But I expect to continue improving the experience and further refine towards the most maximally Urbit-oriented implementation not only to get away from MEGACORP dependencies, but because understanding the full stack grants the opportunity to improve things at every step of the way.

# Potential next steps
A couple of steps could be taken now to improve the course, particularly in areas like self-sovereignty, security, and privacy (read: less MEGACORP-spyware dependent). Some improvements are straightforward, only requiring writing code (e.g. a Google Forms replacement), while others come with decisions about significant tradeoffs.

## MetaMask login

In terms of making the courseware more 'secure', or otherwise tightening access controls, We could use Metamask to verify ownership of Urbit-ID NFTs. Successful checks will allow genuine logins of Urbit ships. And since the course is served from my Urbit it will work for both L1 and L2 planets, while allowing users to not have a running ship (which would be necessary for something like [eAuth](https://docs.urbit.org/build-on-urbit/core-academy/ca09#eauth).

This is a great fully crypto option. However it has limitations. First of all, only those familiar with crypto could use it and it doesn't do anything to solve the 'communication' issue. Yes, it gives me an identity to allow access and that identity could be more directly owned by the user, but it still doesn't afford me a way to 'push' communications. This means email would still be used, because the use of MetaMask login comes with the expectation that most Urbit ID NFT owners don't have running Urbit ships (which may or may not be an accurate assumption).

It also would be dependent on either the hawk-499 upgrade, or building my own more bespoke granular access controls. In exchange, it does enable much greater opportunity with regards to automating actions around payments, though, without needing to integrate with a MEGACORP API such as Stripe, which could be liable to change (or charge me) at any time.

## One-click login

This would add actual security by combining guest comets with email for a one-click login.

For a bit of technical background, when someone visits an Urbit served site, `%eyre` sets a cookie and presents the browser session as a comet. But this _guest_ comet has your `@p` tacked onto the end. ex: `~tillus-nodhus-nidsud-pontug--rammeb-sicpur-nordus-mocwyl`

In effect, it's a fingerprint for that specific browser session and lasts for seven days. As far as the Urbit is concerned, this means the user will retain the same guest comet identity for seven days, provided they do not switch browsers or devices.

The process could look something like this:
- The student purchases the course using Stripe and provides their email.
- Upon their first visit, the course requests email verification.
- A transactional email service sends the student a one-click login link.
- Clicking the link maps their email address to the relevant guest comet.
- This grants them access from that browser session for 7 days.
- After 7 days, they would need to request a new one-click login email.

This requires using an email service that can handle transactional emails, which is a bit of a bummer. But not only would this allow security in my access control, it would also open the door for personalization and progress tracking.

## Service-specific micro hosting provider

Another option I can pursue today addresses the ubiquity problem by onboarding more people onto their own instance of Urbit OS. I could have a dozen pre-configured ships ready: Hawk installed, course imported, group membership accepted, and roles assigned.

Stripe payments could still be used, or crypto payments could be integrated more deeply. The actual product, however, is a hosted ship. I would essentially act as a small hosting provider for this specific service—the guitar course.

Instead of purchasing access to a secret URL, purchasing the guitar course grants access to a one of these Urbit ships that has the guitar course pre-installed. The fact that an Urbit is a full computer is incidental to the student.

I could offer either a moon for users not yet ready for full self-sovereignty, or sell them a planet from my star. I could then branch between the two options based on whether they used Stripe or a crypto payment method. Even for moon-based users, I could assign them a moon connected to an equivalent planet earmarked from my star's children. For example, `~tortus-sopbel-dozzod-forryx` could be assigned to a credit card user; when they are ready to upgrade, `~forryx` could issue `~tortus-sopbel` to their self-custody wallet. Crucially, all coordination and communication for this process could be handled on Urbit via the moon, eliminating the dependency on email.


The business would still need emails for marketing purposes and making sales. But once that's done, and they're on Urbit I could communicate with them through the moon. I can do fun things like, announce to the group:

> Hey, we're going to meet on `%radio` and watch one of the lessons together to talk about it.

They will receive that message directly in the group. Since I will have already installed `%radio` on all hosted moons, I can send them guaranteed working links. Best of all, they will have a way to offboard into their own self-managed solution should they be ready for the responsibility.

# What's next, actually?

There are a variety of decisions to make here: what kind of identities my students most want, how crypto-savvy they want to be, or if and how to get them a running instance of Urbit OS. But what is great about building this as a minimally viable Urbit-powered business is that now I have total power of choice over making that happen. And so really the immediate next step is to keep teaching guitar and getting feedback from my students to find out what *they need*, and then be able to deliver on that without needing to hope that some SaaS service will find it profitable or will add it to their roadmap.

Curious to learn more? Join the next ['Beyond Beginner Guitar'](https://howmbase.com/gtr?vid=spotlight) cohort, or hop into my ["Hanging Out With Musicians"](https://tlon.network/lure/0v6.8qaha.or244.tc569.lmpse.2njca) group on Tlon Messenger.
