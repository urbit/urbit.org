+++
title = "What is Urbit For?"
date = 2016-05-11
description = "A vision of the Urbit-powered future."
aliases = ["/posts/essays/what-is-urbit-for"]
[taxonomies]
posts = ["Essays"]
[extra]
author = "Galen Wolfe-Pauly"
ship = "~ravmel-ropdyl"
+++
![](https://media.urbit.org/site/blog-1.jpg)

Open platforms don't beat closed systems just because they're open.
They win because you can do more exciting things with them.  We
believe we're overdue for new infrastructure not purely on principle:
but because we think you can build better products on top.

We look forward to a future where your fleet of Urbits run the devices
throughout your house, keep your biometric data in sync with the data
center and hold your secure medical and financial data.  Today Urbit
is just a proof of concept — but we see a road from here to there.

## Today

These are things that work but are under development today.  We expect
them to improve and stabilize in the coming months.

### Making the web programmable

The first thing your Urbit can do is act as a transparent layer to
your existing services.  We'd like urbit to be usable as a self-hosted
IFTTT for geeks.  Your urbit can hold your keys, store data, run
programs and seamlessly connect to your existing services.  Plus, with
a global revision controlled filesystem it's easy to share API
connectors and keep them up to date.

With an Urbit running on your machine you can `ls` your Gmail from
Unix.  Write a short script to poll Twitter on a keyword and deliver
the results to your email or into a Slack channel.  Send an SMS when
an HTTP request doesn't resolve.  These are just a few examples.  Your
Urbit is designed to make data trapped in your existing services feel
like an extension of your local programming environment.

### Self-hosted publishing and communication

Additionally your Urbit is a flexible platform for publishing data to
the web and communicating with others.  Sort of like a self-hosted
Slack, WordPress and Wiki in one.  It's more common to use many tools
for sharing our content and communicating.  Urbit is designed to bring
those tools together; giving the individual control over their
creative output.

Simply write markdown in your favorite editor and have an Urbit sync
them to the cloud.  Use React components to control your layout and
extend our toolset.  Host your own discussion channels and comment
threads.  On a computer you own and control, whose source is 100%
open.

### Cryptographic identity

Your Urbit is your digital identity, cryptographically secured but not
controlled by any central authority.  The Urbit PKI fills a gap that
remains unsolved on the web.  We can send encrypted messages, securely
exchange digital currency, but how do I know who anyone is?

Your Urbit can post public proof to your third party services and its
validity is easily auditable.  Using Urbit as an identity scheme for
new services would be a great decentralized alternative to 'Sign in
with [company x]'.

## Tomorrow

Urbit's crypto isn't tested, the network still gets rebooted from time
to time.  The next milestone comes when Urbit matures to the point
that it's as reliable as its SaaS counterparts.

### Lifestreams, finally

The combination of great API tools and great publishing tools means we
can finally build an integrated interface for today's social networks.
The web is full of streams of data.  For the user there's not much
utility in bouncing from service to service.  Instead, it'd be great
to have general-purpose tools for consuming and publishing data.
Imagine a Medium-quality interface that makes no distinction between
Facebook and Twitter; SMS and Skype.

### Secret storage, web3

Bitcoin and Ethereum are both part of a new era of decentralized
infrastructure that's just beginning.  For the blockchain to realize
its potential individuals need ought to have a way to host their own
nodes.  At the very least, individuals need a reliable place to keep
their secrets.  What's more, the blockchain isn't designed for
computation.  It's great for contracts and currency, but too slow for
practical computing.

Urbit is a great complement to the blockchain.  Your Urbit can safely
store your keys, providing an always-available keychain on the
network.  Even better, your Urbit can hold your blockchain assets and
provide an off-chain computation layer.  Urbit's computation doesn't
provide any kind of distributed consensus, but our computation model
is very simple and lends itself well to auditing.  This makes it a
very blockchain-friendly platform.

## Over the horizon

If there's one thing we know from the history of personal computers
it's that computers are always expanding into more and more of our
lives.  The more _personal_ our computers get the more they need to
reflect our thinking and our relationships.  We don't know exactly
what this will look like, but we can certainly speculate on the areas
that deserve the most attention.

### Data permanence and software competition

Right now applications and data are practically the same thing.
There's no practical way for the user to separate them.  Apps come and
go, either by falling out of fashion or actually shutting down.  In
both cases our data becomes orphaned.  There's no practical way for us
to get it back.  The raw data from your LiveJournal is as good as a
floppy disk from the 80s.  Computers hold the records of our lives.
Losing the history of the world to bitrot is a preventable problem.

Since each person owns their own Urbit there's no way to separate the
user from their data.  When you run software on your Urbit you
_actually run it_ and your programs manipulate data that _you own_.
The individual has permanent access to their data by design.  Ensuring
its durability is a technical problem, not a license agreement
problem.

When individuals are running their own software it's no longer
possible to lock them in by controlling their data.  Instead, software
has to actually compete on utility.  If one could trivially replace
the interface for Evernote with one from another developer for $10
wouldn't it be worth it?  Even more so with Urbit, since after
installing software you're not dependent on the developer staying
alive.  You're running a local copy.  This model puts pressure on
applications to interoperate better and become more modular.

### Reputation

With a working identity system it's possible to build up contextual
reputation systems that aren't held hostage by their applications.
Just like the marriage of applications and data, reputation is
permanently tethered to and jealously guarded by the services we use.

For example, today we have karma systems on a per-site basis, like
Reddit.  Is there any reason that individuals shouldn't have karma
scores per-topic?  An individual's authority on a certain topic could
be verified by other experts while still denied by detractors.  It's
easy to extend this to services like Yelp.  With a strong identity
system it's possible for pseudonymous reviews to be counted with real
value.  We'd no longer need a central authority for deciding on the
reputation of a restaurant, but just a way to pseudonymously aggregate
individual opinions.  There's a broad swath of territory ripe for
exploration here.

### Privacy

With a reliably secure place to store your data on the network,
wouldn't you want to store even more personal information yourself?
Why is it that we don't store our own medical records, biometric data
or financial data?  In a world where we have a safe place to keep them
we wouldn't require anyone else to keep them for us.

Furthermore, we'd be able to share them pseudonymously.  One could
imagine medical research or census-like polling being done without
compromising the privacy of those involved.  This also lowers the
barrier to entry for fintech and medical software developers.  If I
can run my own personal health and finance software that can reliably
access my own transactions and medical records, what would developers
come up with?

### IoT

What needs a network _and_ computation?  Devices.  Turning a unix box
into a usable platform for hardware isn't something that any
individual manufacturer is incentivized to do.  For the internet of
things to actually work we need a platform for devices to interoperate
simply and securely.  Urbit is up to the task.  Your Urbit isn't just
a single instance, it can sign the keys for a whole network of Urbits
intended to be used for your devices, sensors, appliances, machines,
robots, VR helmet, etc.

The future of the individual's computing experience may very likely be
among many different devices.  Bret Victor's 'Seeing Spaces' is a
great exploration of what this future may look like.  For the
industrial enterprise there's a whole other set of parallel problems:
tracking inventory, controlling a vast array of machines, and managing
logistics.  In both cases we need a decentralized network and
computing platform.  Urbit is up to the task.
