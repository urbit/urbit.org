+++
title = "Providers"
date = "2020-08-17"
description = "We’ve always assumed that providers would have to come into existence sooner or later. By the look of it, that time is now. Tlon and a few others have provider-like services in the works."

[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
image = "https://storage.googleapis.com/media.urbit.org/site/posts/essays/providers.png"
+++

![](https://storage.googleapis.com/media.urbit.org/site/posts/essays/providers.png)

We look forward to a future where your Urbit is an always-on, always-available service. You should be able to pick up any device and conjure up your whole digital life immediately.

Sounds good—but how does this actually come to pass? Urbit has to be technically robust and have a nice interface. Assuming we can deliver both of those things, your Urbit node also has to be safe, secure, and running somewhere with a network connection.

Urbit has been getting nicer to use and more stable every day. We use it constantly, both as a company (Tlon) and for the broader Urbit community. From what we can tell, people are using Urbit to start communities of their own here and there. The problem is: to use our platform, you’ve got to run it yourself. This limits our audience _a lot_. Setting up a VPS and running an Urbit OS node is pretty easy if you’re comfortable in the command line, which makes it completely impossible for most people.

We hear from people regularly who want to be able to sign up for Urbit like it was any cloud service. What they want is what we’ve been calling a _provider_: a service to provide easy onboarding and hosting. Given a good provider, we’d be pretty close to our long-term vision: Urbit would feel like a ubiquitous, easily accessible service.

We’ve always assumed that providers would have to come into existence sooner or later. By the look of it, that time is now. Tlon and a few others have provider-like services in the works. We’ll talk about the specifics of what Tlon is planning to do in a future post. In this one, we’ll talk about what a provider is, why anyone would start one, and give a few examples of what they might look like.

## What is a provider?

A provider is anyone (company, DAO, a group of friends) that provides easy onboarding and hosting.

From a user perspective, signing up with a provider should be as simple as picking a planet and hosting plan, paying, and getting connected to a running Urbit OS node. This should be able to be done entirely in a browser or a standalone app and feel more or less like signing up for a conventional service.

From a technical perspective, this means a provider needs to create an Ethereum wallet for the user (client-side, of course), deliver an Urbit ID to it, and boot an Urbit OS node for them. And, at some point in the process, collect payment.

As a user, your provider is somewhere between your ISP and your WordPress host. Your provider both runs the star that sponsors your planet (and provides peer discovery) as well as potentially providing both access to communities and even provider-specific software. We don’t really expect providers to be terribly generic—quite the opposite. Providers are likely to differentiate themselves on price, available software, and available communities. We’ll get into some examples later.

The utility that a provider offers involves quite a lot of trust on behalf of the user. While the provider never actually holds the keys to your Urbit ID, they do run your node and, in turn, can access its contents. Unlike giant cloud services, your data isn’t in an easily searchable database. Inspecting your data should be something explicitly protected by a good provider ToS.

If a strongly worded ToS isn’t enough for you, you can always host yourself. And, given the way Urbit works, downloading your Urbit from a provider and running it elsewhere should be both really simple and something a provider will _always_ let you do. It’s perfectly fine to run Urbit in your closet—which means that providers are really competing on ease of use and price.

Let’s move on and talk a bit about why starting a provider makes sense to begin with.

## Why would anyone start a provider?

Our aim is to make Urbit OS so obviously nice to use that it’s well worth paying for. Today, a planet goes for about $10–$20 and, once you buy one, you’ve got to figure out how to really put it to use. Which takes some work.

Any large holder of address space should immediately see the opportunity here: the more useful Urbit is, the more value can be captured by starting a provider. Providers make it possible to actually capture the value in address space, both by selling it and by operating nodes.

Let’s say the base cost of running an Urbit OS node, in a hosted environment, is $10 / node / month. If you can sell hosting for $200 / year, you’re making back the ‘cost’ of the planet when someone signs up. Given that it’s more desirable to buy a planet when you know the star is online and you can put it to good use, this seems like a pretty good proposition: both for the provider and the customer.

Starting a provider doesn’t _have_ to be done by address-space holders. You could start a provider with no address space of your own by custodying the address space of others. Then, you could take a cut of the address space sales and all of the hosting revenue. With a market of people looking to use Urbit, the crux of success with this approach is simply whether you can compete on user experience.

Providers are, in a way, like the miners of Urbit. They’re incentivized to run fleets of very specific VMs for profit. The profit motive, in Urbit’s case, is just a bit more conventional than a bitcoin miner. An Urbit provider is just offering a service in exchange for money.

## What are some examples of providers?

If you think of a provider simply as a business, its most basic incentive is to attract as many customers as possible. You can do that by competing on price or performance, or by competing on aesthetics and community—there are lots of ways that providers can compete.

As a roughly similar ecosystem, the world of webhosting is a great comparison. There are lots of small webhosts that all have very specific services: Dreamhost, MediaTemple, prgmr.com, and Linode all come to mind. Then there are the more generic, large-scale, performance-oriented options: AWS, GCP, Azure. It’s not quite time for an AWS-scale Urbit provider, but perhaps the AWS of Urbit will start as something much smaller.

Let’s walk through a few examples to get a feel for what’s possible:

Communities -

A provider could easily curate community content like news, events, and discussion that it only delivers to its customers. Think of it as a bit like the days of sharing a server among friends—only in this case it could be hundreds or thousands of people who form a collective to run infrastructure and share information.

Custom software -

There are so many ways that providers can offer custom software. Urbit isn’t ready for third party software distribution. When it is, subscribers to a specific provider could get unique modules and applications synced directly to their Urbit nodes along with their membership.

Aside from Urbit-specific software, providers could provide custom software services to their subscribers. A straightforward example of this could come in the form of Bitcoin or Ethereum nodes for processing transactions. Sign up with a provider and get the ability to send transactions to the chain quickly and reliably.

Security -

Let’s say our base cost of $10 / month / planet from above is correct (it’s probably high, but it’s a simple number). Would someone pay $100 / month for a planet hosted in a bunker or in the pylon of an abandoned oil rig? Maybe.

## What about Tlon?

Before there can be an ecosystem of providers, there has to be _one_ provider. While we’ve heard of a few other people working on things, we expect Tlon to be the first to try to really get into the provider business in earnest.

I’ll save the details of what we’re going to do for a future post. Launching Tlon as a separate business will be the beginning of the separation of Tlon and Urbit. I’m really quite excited about it. Tlon is only able to consider becoming a business of its own because Urbit is mature enough that we can actually do it.

For now, I’ll just say that Tlon will pick the low-hanging fruit first. Our goal is to make onboarding a group into Urbit incredibly simple. We want people to be able to go from email invite to running Urbit in a few minutes without ever knowing anything about Ethereum, Unix, or what a private key is.

Once we’ve laid the groundwork with something that _just works_, we plan to open-source some of our components. Scaling up Urbit isn’t going to be easy. We hope that others will help us, and will help explore what’s possible in supporting Urbit users in the future.
