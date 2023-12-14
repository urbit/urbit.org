+++
title = "Introduction"
description = "We think the internet can’t be saved."
sort_by = "weight"
+++

We think the internet can’t be saved. The way things are going, MEGACORP will always control our apps and services because we can no longer run them ourselves.

The only way out of this mess is with a completely new platform that’s owned and controlled by its users.

Urbit is a new OS and peer-to-peer network that’s simple by design, built to last forever, and 100% owned by its users. Under the hood, Urbit is a clean-slate software stack compact enough that an individual developer can understand and control it completely.

We built this new stack to give people a single integrated tool for communicating and building communities – a tool they can trust, control, and extend to their liking. We want to do away with the terrible user experience of the current ‘frankenstack’ of apps and services that we all use today.

Urbit is designed to become an effective, customizable productivity tool for collaborators, and a calm noninvasive communication tool for friends and families.

This probably sounds crazy, so let’s get concrete and talk about (1) Urbit as a piece of technology and (2) Urbit as a user experience.

Technology {% .font-bold .subpixel-antialiased .pt-8 %}

Technically, Urbit is two components: Urbit OS and Urbit ID.  Both are completely open source and MIT licensed.

{% div className="flex justify-between space-x-4" %}
{% div %}
![](https://media.urbit.org/site/understanding-urbit/uu-intro-2.svg) 
{% /div %}

{% div %}
![](https://media.urbit.org/site/understanding-urbit/uu-intro-3.svg)
{% /div %}

{% /div %}

**Urbit OS** is a new, carefully architected software stack: a VM, programming language and kernel designed to run software for an individual.

Urbit OS is a program that runs on almost any cloud server, most laptops and many phones: anything with Unix and an internet connection. Urbit OS is completely sealed from the system it runs on, sort of like WASM or the JVM. We sometimes call it an ‘overlay OS’.

In an Urbit world, each person has their own Urbit OS node, or ‘urbit’. Your urbit is secure and private to you and entirely under your control. When you want to connect with others, you connect to their urbit directly — rather than going through a centralized service.

If you’re curious to dive even deeper into Urbit OS, feel free to skip ahead.

**Urbit ID** is an identity and authentication system specifically designed to work with Urbit OS. When you boot or log in to Urbit OS, you use your Urbit ID.

Your Urbit ID is a short, memorable name (like ~ravmel-ropdyl) that’s a username, network address and crypto wallet all in one. It’s registered on a blockchain, you own it with a key and no one can take it away from you. Urbit IDs are cryptographic property.

Urbit IDs aren’t money, but they are scarce, so each one costs something. This means that when you meet a stranger on the Urbit network, they have some skin in the game and are less likely to be a bot or a spammer.

Experience {% .font-bold .subpixel-antialiased .pt-8 %}

We want Urbit to be a single, simple interface for your whole digital life.

Over the years, Urbit has been built in public as an open source project. Anyone can join the network and check out what we’re up to. It’s a bit like signing on to IRC in the early 90s.

In early 2020, Tlon released Urbit OS 1, now called Landscape: a minimal interface for group communication, and our first complete interface. Landscape is a tool to chat, share notes and links, and stay connected.

Over time, Urbit will grow into a system that can bring together all our different modes of communicating: chat, payments, documents, images, biometric data. We want individuals and their communities to be able to both control their software in fact, through the source code, and in action, through a simple interface.

We want to leave behind a world of apps and services for one where we can bring everything together in one place. And, in doing so, ordinary users can create customized digital environments for their friends and communities.

To see how we’re going to get there, let’s walk through these two pieces of new technology individually, Urbit OS and Urbit ID. We’ll then talk about our vision for the future and how we’ll get there.

For technical people, it’s important to note that Urbit as a stack is in no way required to be used together. Don’t like our client? Feel free to build your own. Just like the Urbit ID system? No problem — use it!

Ultimately, we think that new technology is most likely to get adopted if it can provide a much, much better user experience. So that’s what we’re focusing on creating.