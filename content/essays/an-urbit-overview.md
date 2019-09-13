+++
title = "An Urbit Overview"
date = 2016-05-11
description = "A high-level overview of Urbit."
aliases = ["/posts/essays/an-urbit-overview", "/posts/an-urbit-overview"]
[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
+++
![](https://media.urbit.org/site/blog-0.jpg)

## What Urbit is

Urbit is a virtual city of general-purpose personal servers.

## Your old personal server

What's a personal server?  In a sense, you already have one.  Your
personal server is the combination of all the cloud services you use
now.

This "server" is a mess.  It's broken into 17 different fragments
which are scattered all over the planet.  You have no control at all
over any of the pieces.  The more we depend on Web services, the more
we realize how unsustainable this situation is.

Can you remember all the services you have accounts for?  How about
the username and password for each?  Some of them will let you pull
your data out somehow, some won't.  Sometimes you can move your data
between them, sometimes you can't.  But they're all good at
showing you ads.

## Your new personal server

Your urbit is your own general-purpose server.  It holds your
data; runs your apps; wrangles your connected devices; and
defines your secure identity.  If you still need your old
services, it drives them with APIs.

Your urbit presents your whole digital life as a single web
service.  And since it's yours, open source and patent-free, it
never shows you ads.  Or loses your data.  Or updates without
your consent.

Technically, Urbit is a new kind of OS that has a precise formal
definition.  (Urbit is actually a [single mathematical function](https://media.urbit.org/whitepaper.pdf).)  One advantage of a math-based OS is that Urbit is perfectly
portable.  It can't tell whether it's in a cloud data center or on
your home PC.

Concerned about mass surveillance?  Download your urbit and restart it
on your laptop, or move to a new host in Iceland.  Urbit's formal
simplicity makes managing it as easy as managing an iPhone: all you
have to decide is what apps to add.

Each urbit is a node on a global, encrypted P2P network.  Your Urbit
name, a generated pseudonym like `~talsur-todres`, is also your
network address.  Like Bitcoin, Urbit address space is a cryptographic
asset with a limited supply.

By keeping addresses scarce, we make spam and abuse expensive.  Urbit
is a "friendly network," like the Internet in 1986, where a stranger
is nice until proven nasty.  As it matures, Urbit will grow into a
decentralized, self-governing virtual city both safe and free.

## The Urbit future

In an Urbit world, your data is no longer trapped in a jumble of
proprietary servers.  Your urbit is a permanent, versioned, typed
archive the size of your digital life.  Even before you move your data
from a Web service to a local Urbit app, your urbit can drive your
account with an API or scraper.

And within Urbit, data is never locked inside apps.  Imagine if you
could painlessly switch between Facebook and Google+, Asana and
Trello, Tumblr and WordPress.  Not only does your urbit upgrade itself
and its apps automatically, you can "sidegrade" a running app to
another vendor without losing data.

Your urbit is also your digital identity.  Along with your data
lifestream of media, messages and documents, it has the keys and
tokens to manage all your legacy Web services.  It holds the keys
for your cryptocurrency wallets, so it can buy and sell for you.
(With one personal server to secure, not 17 different accounts,
you actually have the bandwidth to take security seriously.)

You still use network services.  But instead of interacting with
the service provider's HTML UI, which phones home using
proprietary HTTP APIs, you interact with a third-party app on
your urbit, which talks to multiple service providers using
public, typed Urbit protocols.  For example, your urbit runs a
single shopping app, which downloads catalogs and uploads orders.
This app is one store which sells everything in the world, with a
salesman who's 100% on your side and always has the best price.
Every computing experience is different when the UI is working
exclusively for the user.

Finally, your urbit is the hub for your network of connected
devices.  Your smart thermostat, your wristband, your phone and
tablet, all run satellite urbits which talk securely to your main
urbit in the cloud.

## A chance for digital freedom

The promise of the personal server isn't just convenience.
General-purpose computing is magic.  This magic must be in the
hands of all, not just those who can master Unix.   The computer
is a bicycle for the mind.  It's an open vehicle for exploration
and discovery.  It's not a way to optimize ad delivery.

Urbit, as virtual city, is a platform that brings together all our
datastreams -- from emails to heartbeats -- in a way that we ourselves
control.  Can we work together to match faces in photos, without
submitting to some panopticon in Mountain View?  While the first step
in freedom is the right to be left alone, the second is the power to
form new intentional communities, to create and evolve a voluntary
definition of public space.  We have no idea at all what people will
do with this power.

General-purpose computing is digital freedom.  And today, a cloud data
center is the technically optimal locus of computation.  The cloud is
always on, always available, never loses data.  Hosts are sometimes
attacked; but they never intentionally tamper with their virtual
computers.  The cloud can never be secure against a global adversary;
but most people don't have a global adversary.  A single portable
platform provides "herd immunity" for the few who do need direct
physical control over their main computers.

Though even laptops are atrophying into mere browsers, mass-market,
general-purpose computing on the client side remains an endangered
species that must be protected.  But on the server side, this species
has never even _existed_.  There has never been anything like a
mass-market personal server.  Why not?

## Freedom is an engineering problem

Urbit is not a difficult idea.  Urbit is like a flying car: the idea
is not the hard part.  Almost everyone we talk to about Urbit turns
out to have had pretty much the same idea themselves.  The problem is
building it.

A server is a computer.  It's running some operating system.  This OS
is a flavor of Unix.  There are no alternatives.  It's connected to
some network.  This network is the Internet.  It has no competitors.
You can have a personal server, if it's a Unix server on the Internet.

Almost no one thinks being a Unix system administrator is fun.  Not
even Unix system administrators think running an Internet server is
fun.  So the personal Unix/Internet server is like the personal
bulldozer.  This is not a consumer product.  Any number of engineers
can't turn a bulldozer into a bicycle.

How did we build the personal bulldozer?  We didn't.  We started
from scratch.  (The people who built the first PCs didn't start
with a mainframe OS, either.)  We created a new platform: Urbit.

Urbit doesn't compete with Unix and the Internet.  It's a new,
opaque layer on top of them.  Your browser runs on a native OS,
but it doesn't give Web apps any way to talk to the native OS.
Urbit is like a browser for the server side: code within Urbit is
formally isolated from the platform it runs on top of.

Your urbit is a Unix process, in a data center or your PC.  It sends
UDP packets over the Internet.  It can both load and serve web pages
over HTTP.  Except for character sets and crypto, nothing in Urbit
reuses or depends on any 20th-century code.

Urbit is a complete, clean-slate system software stack: a
non-lambda interpreter (Nock), a functional language (Hoon), and
an event-driven OS (Arvo), with its own encrypted protocol
(Ames), typed revision control (Clay), reactive web server (Eyre)
and functional build system (Ford).  The full system, including
basic apps, is only 30,000 lines of Hoon.

The first end-to-end prototype of Urbit took one engineer eleven
years.  The current beta took three more years, with about three
engineers on average.

How does it take 14 years to write 30,000 lines of code?  The code
wasn't the hard part.  The hard part was rewriting it until it was
right.  We think we've solved all the real CS problems, and we're
certainly done changing major interfaces.  But it will take more than
our small team to deliver a polished Urbit user experience that can
actually challenge modern web apps.

## Where we are, what we're doing

Urbit is in feature freeze.  It's a minimum viable product in
early beta.  It still needs quite a bit of fit-and-finish work.
We certainly don't recommend it for end users or consider it in
any way secure.  But it's fun to play with, if you're a hacker.

This summer, we're making the switch to an open and transparent
development and specification process.  A system as unusual as
Urbit can't be invented in public.  But it has to be finished and
maintained in public.

Additionally, we're creating an open political and economic process,
with a small, fixed-price public presale of Urbit address space.  Join
us and help make this future actually happen.

To keep reading, learn more about [Urbit's address
space](../the-urbit-address-space); share our vision of the Urbit user
experience, from the [top down](../what-is-urbit-for) or the [bottom
up](../magic); check out the [development roadmap](../roadmap);
evaluate Urbit's [beliefs and principles](../beliefs-and-principles) or its
[interim constitution](../interim-constitution).

(For technical readers, check out our [documentation](https://urbit.org/docs/) or
the [whitepaper](https://media.urbit.org/whitepaper.pdf)).
