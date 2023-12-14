+++
title = "Introducing OS 1"
date = "2020-04-29"
description = "OS 1 is somewhere between ‘productivity software’ and a ‘social network’. We think it’s the beginning of an altogether new breed of social computing."

[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
image = "https://media.urbit.org/site/posts/essays/intro-os1-landscape.png"
+++

<video class="ba w-100" autoplay loop src="https://media.urbit.org/site/posts/essays/intro-os1.mov"></video>

## Introducing OS 1

OS 1 is a simple, unified system for building digital communities. OS 1 is for groups of people sharing messages, links, and notes on Urbit.

We designed and built OS 1 for ourselves, and we’re really enjoying using it every day. Instead of figuring out how to duct tape together apps and services, we use a single system to stay connected with the company and broader Urbit community that we really trust. OS 1 makes it feel like our company and community has a place in the digital world to call home.

Most groups of friends and collaborators juggle apps and services to stay connected in the digital world today. We think OS 1 is a much better model. It’s still too early to ask the whole world to switch over to it — but we’re ready to help onboard our friends and adjacent communities into Urbit to have them try it out and get their feedback.

First, let’s walk through what OS 1 is and how we’ve been using it. Then, if OS 1 is interesting to you, we’ll tell you how to apply for a community grant.

Here we go:

## What is OS 1?

OS 1 is a very simple, integrated tool for messaging, sharing links, and writing with a group of people. OS 1 is somewhere between ‘productivity software’ and a ‘social network’. We think it’s the beginning of an altogether new breed of social computing.

OS 1 isn’t our first attempt to build an interface for Urbit, but it’s certainly the most complete. OS 1 is the first Urbit interface that doesn’t feel like an experiment.

Today, when you boot Arvo (the Urbit OS kernel) and connect your browser to it, you’ll see OS 1. OS 1 isn’t the only possible client for Arvo, though. Anyone could build their own client or, since it’s completely open source, modify OS 1 however they like.

For most people, out of the box, OS 1 feels like an app. Given that it’s running on Urbit OS — it’s much more than that. It’s a full-fledged general purpose virtual computer that’s secure and private to you. We’ll come back to what that means at the end.

Let’s walk through the features of OS 1 one by one to see what it’s like.

### Groups

![](https://media.urbit.org/site/posts/essays/intro-os1-groups.png)

The group is the main building block in OS 1. A group is simply a list of people that share a set of chat, links, and publish channels. A group is sort of like a super powerful group chat.

A group of friends might just share a few chat channels. A reading group might just share a publish channel for discussion of what they’re reading and a links channel for upcoming books. As a company, we share a variety of chat, publish, and links channels to get things done and communicate. There are chats for each area of work, publish channels for digests and feature discussion, and links channels for music, influences and references, for example.

Each person in a group is identified by their [Urbit ID](https://urbit.org/understanding-urbit/urbit-id/): a short, memorable name that you own with a private key (and belongs to you completely). Each group is private and requires an invite. Groups aren’t discoverable. They’re meant to be high-trust communities of people. More like a commune than a public event.

Let’s walk through each module and talk about what they can do.

### Chat

![](https://media.urbit.org/site/posts/essays/intro-os1-chat.png)

Chat is chat: a sequential list of messages meant for synchronous communication. There are already a million ways to chat — but Urbit chat differs in a few important ways.

First, each chat channel is only shared between the host and the members of a chat. When you DM with people, messages are sent peer to peer. The system is, in fact, decentralized and pseudonymous by default. No one knows anything about you outside of your Urbit ID.

Second, each chat message is encrypted and signed by your Urbit ID. Again, we don’t call Urbit ‘secure’ yet since it’s unaudited — but we’re working to have Urbit audited this year.

Third, chat in Urbit OS is a protocol for sending messages between computers on the network (known as “[ships](https://urbit.org/docs/glossary/ship/)” and identified by their Urbit IDs). It’s easy to imagine extending chat in all kinds of fun and interesting directions: chats that only accept certain message types, chats that have disappearing history, chats that you can only post to during certain times of day, and so on.

(If you’re curious to try one of these things, or have an idea about something you’d like to experiment with — consider submitting a proposal in our [grants program](https://grants.urbit.org/). We regularly reward contributor work with address space.)

We think of chat as a primitive, not simply a ‘better IRC’. But even in the rudimentary form it’s in today, chat is essential to delivering a feeling of being at home. There’s no way to deliver a complete interface for groups without chat.

Anyway, not everything can happen in a chat. Let’s keep moving.

### Links

![](https://media.urbit.org/site/posts/essays/intro-os1-links.png)

Links is a bit like Hacker News or Reddit. It’s just a collection of links with comments. There’s no upvoting or sorting. We decided that with a small group it’s more about collecting references than deciding what’s most exciting — but permutations of Links could be a great area for contributors to experiment with.

We use links to collect external references and track things we’re thinking about. We’re always looking at things going on outside our small digital universe and talking about them. Links lets us keep an archive of those discussions.

We originally imagined links as evolving into more of a general-purpose ‘collection creation’ interface. One where you can pull together images, video, URLs, maybe even runnable code and so on into a single channel. We’ll get there.

### Publishing

![](https://media.urbit.org/site/posts/essays/intro-os1-publish1.png)

Publishing is somewhere between a blog and a note-taking system. A Publish notebook is a list of markdown files with optional comments. A private Publish notebook is like a journal, a group notebook can be like a forum (with comments on) or a collaborative blog.

We use publish for both long-form discussion and one-way communication about what we’re working on in its current form. The editor is calm and simple. In distraction-free mode, it’s a nice place to put a note together.

Publish, like all our other modules, is an interface to a generalized protocol for storing text. We have high hopes for how Publish can evolve into a flexible tool for notetaking and discussion with richer content types and better controls over structuring discussion.

### Modules

![](https://media.urbit.org/site/posts/essays/intro-os1-home.png)

You’ll find a few other things on the home screen: a clock, the weather, and a simple command-line that we call the Dojo. These are system-wide utilities that aren’t group-specific.

The clock and weather tiles are simple indications of the state of the outside world. We built them because they’re things we wanted to be able to check in on often. When you’re spending much of the day in front of a computer, it’s nice to know if you have enough daylight left to get some exercise in.

### Dojo

![](https://media.urbit.org/site/posts/essays/intro-os1-dojo.png)

The Dojo gives you a quick way to see that, under the hood, Urbit OS is a powerful general-purpose system. The system hasn’t evolved to the point that our libraries, frameworks, and modules are polished to our standards. Since it’s still early, we can’t claim that it’s easy to develop on top of this platform. But we want it to become much easier.

## Why we made OS 1

We made OS 1 because we wanted to begin the process of re-centralizing our digital lives on a platform we actually control. Replacing all the services we use all at once is impossible — so we picked a suite that we felt would work nicely together. We’ve always felt that one of the most exciting things about Urbit is in bringing your digital life together in a way that feels like home.

The digital home, we think, is what our computers are meant to be but simply can’t be in a world of cloud services. Once upon a time, thirty years ago, your personal computer was an open-ended tool that was reasonably simple to understand and use, lasted a pretty long time, and belonged to you in every way.

OS 1 is a first step down the road back to a system that’s simple, durable, and belongs to you in every way. It’s a long road, and we feel like we’ve made a very significant step forward.

One really critical thing about OS 1 is the pattern of ‘groups sharing modules’. This pattern makes it perfectly clear how a virtual computer can outcompete a bunch of different services. As the collection of modules in OS 1 → N grows, we make it easier for others to contribute modules, and we increase the flexibility of connecting modules our system quickly outruns the messy, disconnected world we’re currently stuck in.

OS 1 isn’t mature enough to be _easy_ for outside contributors to add modules — but it is [open source](https://github.com/urbit/urbit), and anyone is welcome to tinker and experiment with modifying it. We run a [grants program](https://grants.urbit.org/) to reward contributors for improving any part of Urbit OS. As the system matures we expect this program to expand and accelerate.

## Looking ahead

By using OS 1 you inherit all the benefits of running Urbit OS. Each user runs their own node completely independently. Everyone using Urbit OS owns their own identity and data. And every Urbit OS node communicates over an encrypted and authenticated network. (Again, We don’t yet call Urbit OS ‘secure’ because it hasn’t been audited.)

OS 1 is just a client for Urbit OS, of course. Other people could write their own clients that are completely different — like different windowing systems for Linux. Our hope is to build a client that includes interface components and frameworks that make it exceptionally easy to build modules for groups of people to share. Other clients could potentially invent entirely new ways of interacting with the underlying system.

There are two threads by which OS 1 evolves into OS 2 and beyond. First, by becoming a more powerful system and second, by adding modules to expand our supported modes for interacting.

In its current form, OS 1 by no means exposes all the power of the underlying system. Our approach to building OS 1 was to focus on the quality of the UI, and accept that it will feel like a monolithic app. We’re already working to evolve our interface into something that feels flexible to an ordinary user and developers can easily extend and build on top of.

Specifically, we want better affordances for putting multiple streams of data on the screen at once, better keyboard shortcuts and navigation affordances, better libraries and frameworks for building modules. We want a standalone client and a single login system. These are some of the things currently on the drawing board.

As far as modules are concerned, there are too many things we’d like to build to list them all. We’d really like to have threaded conversations; short, Twitter-style messages; biometric and status tracking; an e-book reader and annotations system — and that’s just to name a few we see in the near term.

We’ve long since felt that the most powerful thing about Urbit is that it’s a general-purpose system. OS 1 puts us on the road to giving people an actual material sense of what using a general-purpose networked computer feels like.

As we expand the affordances of the system and add modules over the course of OS 1, 2, and beyond we expect to deliver a system that can foster everyday creativity. There’s a long road ahead, in the best possible sense. We’re really excited about what the future holds.

### Becoming a homesteader

![](https://media.urbit.org/site/posts/essays/intro-os1-landscape.png)

As a distributed team trying to stay connected, we like using OS 1 from day to day. We’d really like to hand-onboard a small group of like-minded groups of people who want to experiment with living on the fringe of the digital world. Toward this end, we started the community grants program.

Each community that’s selected will get a block of address space to share, direct support, and (in the near future) free hosting.

Please tell us a bit about yourselves [here](https://urbit.org/community/community-grants/).
