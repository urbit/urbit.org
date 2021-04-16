+++
title = "Urbit OS"
description = "What Urbit should feel like to an everyday user"
weight = 1
[extra]
flatten_pagination = "true"
hide_next_title = "true"
hide_previous_title = "true"
image = "https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/intro/intro-5.jpg"
+++

For the most part, we use our laptops simply as access points to MEGACORP services. Our phones are the same. These services are amazing and convenient. But for that convenience we’ve traded away control, ownership and privacy. The way we live our digital lives is completely out of our hands. 

<img class="ba" src="https://storage.googleapis.com/media.urbit.org/site/understanding-urbit/intro/intro-5.jpg">

Today’s MEGACORP monopolies retain their control because of one central technical advantage: they make the server side usable. 

Urbit OS is built to break these monopolies at this central point of control. Urbit OS makes the server side usable for individuals without the need for MEGACORP to run their software. 

We’ve already been through this before. In 1974 a computer was a mainframe the size of a room and was shared by hundreds of people. By 1984 a computer was the size of a desk and everyone had their own PC. The PC was more flexible and more fun, so it won by a wide margin. Then, with the rise of the internet, the PC’s flexibility slowly became irrelevant. 

Today, we’re more or less back to the timesharing model of the 1970s. Urbit OS is the PC to MEGACORP’s mainframe. It’s more flexible, more fun, and most of all, poised to capture the everyday creativity of the individual.

Let’s talk about how we think we’re going to pull this off from a technical standpoint, and our vision for using Urbit. 

If you’d like to skip ahead to what Urbit will be like to use [go ahead](/understanding-urbit/interface). Or if you’re someone who just wants to head to the source, [it’s here](https://github.com/urbit/urbit#urbit). In that case you may also want to [read the docs](https://urbit.org/docs/) to get up and running.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/technical-overview/technical-overview-kernel@2x.png">

Urbit OS is a completely new, carefully architected software stack: a VM, programming language, and kernel designed to run software for an individual. Urbit OS is a program that runs on almost any cloud server, most laptops and many phones: anything with Unix and an internet connection. 

The main thing to understand about our ‘overlay OS’, as we call it, is that the foundation is a single, simple function. This function is the Urbit OS virtual machine. We call it ‘Nock’. The entire Urbit OS system compiles down to Nock, and Nock is just 33 lines of code.

Nock is similar in spirit to WASM or the JVM: it’s a uniform machine code for every Urbit [ship](https://urbit.org/docs/glossary/ship/). A frozen foundation makes for some nice features: 

The state of your Urbit OS is a pure function of its event history. It’s auditable, inspectable, repeatable. You can actually trust it.
Writing decentralized apps becomes vastly simpler than in the old world, since every node computes exactly the same way.
The entire Urbit OS stack, from programming language to applications, is upgradeable over the network. For ordinary users, this makes for almost no system administration.

Since Nock is a protocol for computing itself, any two nodes on the Urbit network can easily share data, communicate and connect their software. 20th century systems could never do this without a MEGACORP acting as the intermediary.

<img class="full ba w-100 mv4" src="https://media.urbit.org/site/understanding-urbit/network-os/urbit-os-diagram-apart.svg"/>

On top of this tiny VM we built a self-hosting, purely functional programming language, a kernel written in that language and a set of kernel modules that serve all the needs of personal computing. Specifically: a filesystem, build system, application sandbox, secret storage, web server, terminal driver and a networking protocol. 

This sounds like a lot — but the whole stack is incredibly compact. The whole system clocks in at around 50K lines of code. We’ve seen individual developers understand the entire thing. Who is the last person you met that actually understands their entire computer? Urbit OS is like the 1968 Porsche 911 of operating systems: extremely simple, elegant, and built for the individual.

<img class="ba" src="https://media.urbit.org/site/understanding-urbit/project-history/uu-os-4.jpg">

But why did we build all this technology? 

First and foremost, to deliver a better user experience. Urbit OS alone is just a new layer for personal computing in the cloud. But with this new layer we open up the possibility of building a completely unified interface for people to compute in the cloud. (If you’d like to skip to how we envision that interface, [go for it](/understanding-urbit/interface).)

From a broader perspective, it’s clear that connected computing is important and that it’s here to stay. We just want it to be as calm, simple and reliable as possible, and we don’t think that can happen using existing technology. 

All of Urbit is built to function as a single stack, and we think that building a useful product is the best way to mature the system as a whole. That said, each component of this system can be used on its own. Don’t like our client? That’s okay, you can build your own. Don’t want to use Urbit OS? No problem — you can use Urbit ID as an authentication system for some other OS, or for anything, really. 

Speaking of Urbit ID, let’s talk about what that actually is.
