+++
title = "The State of Landscape"
date = 2019-05-16
description = "An update on the state of Landscape and the Urbit network."
aliases = ["/posts/essays/the-state-of-landscape", "/posts/the-state-of-landscape"]
[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
+++

![](https://media.urbit.org/site/posts/essays/the-state-of-landscape-1.png)

The TL;DR is: if you’re really excited about living on Mars, Landscape is fun to try out. Come join `~dopzod/urbit-help`, experiment with creating your own chats and collections (did anyone find that easter egg, yet?), and see what you can do with the thing. 

Landscape today is for the intrepid adventurer. So is much of the system. If you want to read about what we’re doing to make it more welcoming, [check out the 2019 roadmap](/posts/essays/2019-5-roadmap/).

## The Broad View

We thought a lot last year about how to avoid the pitfalls of modern social networks. The services we all use today each feel like *one place*. It’s as if everyone on MEGANET is living together in the same city. 

In the real world, cities have their own cultures. So we thought: there must be some way to build more granular communities online. Living in a single world-city is kind of a bummer, honestly.

Landscape was our first experiment in this direction. It’s a ruthlessly simple interface for chat and discussion that runs on top of Arvo. You can connect to Landscape in a browser or in an app on your iOS device. All communication is pseudonymous and authenticated (as with everything in Arvo) with your Azimuth point. 

Over the past few months, we’ve been running small experiments, experimenting with ways to support our own work and finding the limits of what we can do on the network. Originally, we built Landscape out of our desire to get away from using MEGACORP communication tools in our daily work. We thought: if we’re trying to build a whole new network and society, we had better go live there first.

Landscape is an experiment — it’s supposed to be fun, above all, and a good way to help focus our efforts on maturing the platform. 

Anyway, let’s show off some of the specifics, and give an update on this experiment so far.

## A Quick Tour

Landscape is pretty simple. It lets you subscribe to chats, in the spirit of IRC, and ‘collections’, which are effectively forums or blogs with comments. You can also direct message with other running ‘ships’ or Arvo nodes. 

For the most part, this happens through a web interface that you can access at `https://ship.arvo.network` or via `localhost:80`.

There’s also an iOS app, [available in the app store](https://itunes.apple.com/us/app/landscape-urbit/id1393148862), that you link to your ship the same way you log in through a browser.

## Landscape: The Bad Parts

What’s keeping us from asking others to use this thing more aggressively? Let’s walk through the reasons (while keeping in mind, they’re all [things we’re working on](/posts/essays/2019-5-roadmap/)):

### 1 - Arvo has rough spots

They have gotten a lot better, but there are still a few things that can crash your Arvo ship. This, of course, has nothing to do with your Azimuth point, which is completely separate and, as far as we know, secure.

The first (and most severe) is a bug in our event persistence that occurs very rarely. Basically, there are conditions under which you can cause events not to be properly written to disk and corrupt your event log. It’s pretty unlikely, but it’s unacceptable for a real product since it basically causes you to have to wait out the current network era. 

The second is that Ames (our network protocol) has occasional connectivity problems. Originally, we thought we had found this issue as being related to [a timer bug](https://github.com/urbit/arvo/pull/1072). It may be, but the networking is in the process of a major overhaul — so we’ve implemented a few bandaids to make the situation workable. `|bonk` sometimes needs to be used to reset connections between peers, and `:ethmanage` sometimes need to be used to re-synchronize with the blockchain. It’s an ugly fix, but it usually works.

Relatedly, we have occasionally been seeing errors caused by the Arvo network being slow to register keys from the blockchain. If you’re a newly registered Azimuth point, and your keys were just put on-chain, it can take some time for that change to propagate. This can result in a confusing situation for new ships.

### 2 - There’s no ‘individual continuity breach’

One great thing about the Arvo network is that it’s more like a giant single computer than a network. When you talk to another ship, use remote files or sync data it’s almost the same as working with local data.

The main thing underlying this is *sequence numbers*. Your Arvo ship keeps track of every message it has exchanged with every other ship, and it never breaks that sequence. If our ships are talking, and we’re on packet `83910` but you reset and try to start again at `0` my ship just thinks you’ve lost your mind and won’t talk to you anymore. 

We’d like individual resets to work, and we’re [working on it](https://github.com/urbit/arvo/pull/1169). But, for the time being, if you have any fatal error on your ship, it means you’ve got to sit this era out. 

This is another unacceptable bug for anything we truly rely on.

### 3 - There are no push notifications, yet

What’s one thing that a chat application needs to do? Notify you of new messages. What does Landscape notify you about? Well, at the moment, basically nothing. 

We implemented and tested a push notifications server for iOS, which is slated for release in the next few months (it depends on things in our `cc-release` branch). We’d also love to work on having your ship connect to your email provider and send you alerts over email. We’re thinking about how to do that.

## What We’ve Learned and What We’re Doing

Many of us spend all day on Landscape, use it from our phones, and find it really fun. The bugs above bite less than you might think and, in many cases, the experience is quite nice. It’s a passive, distraction-free way to interact with others around the office. 

We operate one public channel, `~dopzod/urbit-help` for answering any of your questions about the system. And, from time to time, we have been creating topic-centric channels and announcing them publicly. This has been a lot of fun. Come join us if you’re feeling brave.

