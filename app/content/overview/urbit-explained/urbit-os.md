---
title: "Urbit OS"
description: "A new operating system designed to give individuals control of their digital lives"
---

While some interpretations of the question *“What is Urbit?”* take the stance that “Urbit is anywhere you use your `@p`”, the canonical usage of Urbit ID is to run Urbit OS. Every node, or ‘ship’, on the Urbit network must first start with an identity. A knowledge of ‘self’ which is embedded in every action that it takes on the network. 

The main thing to understand about Urbit OS is that it takes everything we’ve learned from humanity’s first decades of networked computing and rewrites the entire technical stack from a clean slate. It throws out effectively everything but UDP and ASCII, in order to get rid of the layers of duct tape and super glue built up over the years as humanity discovered what it wanted to do with computers (e.g. have them talk to each other). 

Naturally, rewriting the entire stack is a huge undertaking, so to bootstrap the system without also having to rebuild hardware manufacturing and supply chains, Urbit OS is constructed as an ‘overlay OS’. This means it can run on any computing substrate (present runtimes are focused on Unix-based systems), and its networking protocol is transport layer agnostic. While today it generally uses the legacy internet infrastructure, network packets could in fact be delivered between nodes via a sneakernet or by carrier pigeon.

The foundation of the entire technical stack is a single, simple function. This function is the Urbit OS virtual machine. We call it ‘Nock’. The entire Urbit OS system compiles down to Nock, and Nock is just 33 lines of code–—the whole specification fits on a t-shirt.

Nock is similar in spirit to WASM or the JVM: it’s a uniform machine code for every Urbit ship. Its small size and principled approach mean that it can exist as a solid and unchanging layer upon which to build a networked operating system. And since Nock is a protocol for computing itself, any two nodes on the Urbit network can easily share data, communicate and connect their software. The fact that 20th century systems could never do this is why we are perpetually led towards a MEGACORP acting as the intermediary for our networked computing experiences.

On top of the tiny Nock VM we built a self-hosting, purely functional programming language, a kernel written in that language and a set of kernel modules that serve all the needs of personal computing. Specifically: a filesystem, build system, application sandbox, secret storage, web server, terminal driver and a networking protocol.

The result of this design is that the state of your Urbit OS is a pure function of its event history. It’s auditable, inspectable, repeatable. The entire Urbit OS stack, from programming language to applications, is upgradeable over the network.

Since every node computes exactly the same way, writing decentralized apps becomes vastly simpler than in the old world and resisting the draw of centralization into MEGACORP walled gardens becomes easier.  For ordinary users, the idea is that running your urbit forever should be easy as caring for a cactus and you can actually trust it to be working for you.

This sounds like a lot—but the whole stack is incredibly compact. The whole system clocks in at around 50K lines of code. We’ve seen individual developers understand the entire thing.   

But why did we build all this technology? It goes well beyond just liking functional programming or technical computer science problems. We wanted to solve the problems with our computers that mean they keep getting more, rather than less, complex. Who is the last person you met that actually understands their entire computer? Urbit OS is like the 1968 Porsche 911 of operating systems: extremely simple, elegant, and built for the individual.
