---
title: "Introduction"
description: "Urbit is a practice in building a forever computer"
---

Urbit grew out of a thought experiment: What would the software of a timeless Martian society look like, given 50 million years of development? Would it be an indeterminable ball of mud, endlessly large and complex? Or a diamond perfect stack, unchanging over aeons, simple and solid as a foundation for humanity’s lasting needs?

Urbit contends it would be the latter, and is thus humanity’s first attempt at building a computing stack that will last generations. We could describe this endeavor in contrast to the ‘ball of mud’ that is the current networked computing stack: 

- Why the Von Neumann architecture makes it so painful to turn your computer on and off (or why that is so often proposed as the first step in troubleshooting\!)  
- Why x86, ARM, or RISC-V are shaky foundations for a low level instruction set architecture for a computer designed to persist for hundreds of years  
- Why digital commerce is plagued with warnings to ‘click only once’, man in the middle attacks, and impersonation scams   
- Why the duct tape and superglue approach to current networking is doomed to endless spam and megacorp centralization 

Naturally, if we are trying to build the perfect software stack, we need to cast out the mistakes of the last 70 odd years, and so describing Urbit in contrast to the present can be educational. But so too is it worth describing Urbit as a positive vision of the future—particularly because building Urbit is an intergenerational endeavor and current development has only scratched the surface of the work to be done. There is a long, hard road ahead of us before we can solve the computing problems of the everyman. 

So what is Urbit today? Unlike in [the original Moron Labs blog post in which Urbit is first proposed](https://moronlab.blogspot.com/2010/01/urbit-functional-programming-from.html), contemporary Urbit is not vaporware. Early adopters and technical developers will find a vast landscape of interesting ideas, novel approaches to computing, and opportunities for increasing their independence from the legacy internet that is crumbling around us.

In practice, your urbit comes in two parts–identity and operating system–and with it, becoming a node in a networked whole.

## The identity layer

[Urbit ID](/overview/urbit-explained/urbit-id) is an identity and authentication system specifically designed to work with Urbit OS. Your Urbit ID is a name (like \~ravmel-ropdyl) that’s a username, and network address. If someone knows your name, they also know how to contact you across Urbit’s end-to-end encrypted, peer-to-peer network. 

Urbit IDs are digital property, owned with a cryptographic key and impossible for anyone to take away from you. 

If you’re curious to dive even deeper into Urbit ID, feel free to skip ahead.

## The operating system

[Urbit OS](/overview/urbit-explained/urbit-os) is a new, carefully architected software stack: a VM, programming language and kernel designed to run software for an individual.

Urbit OS is a program that runs on almost any cloud server, as well as most laptops and home computers–anything with Unix and an internet connection–and can be accessed from most phones. Urbit OS is completely sealed from the system it runs on, sort of like WASM or the JVM. We sometimes call it an ‘overlay OS’.

In an Urbit world, each person has their own Urbit OS node, or ‘urbit’. Your urbit is secure and private to you and entirely under your control. When you want to connect with others, you connect to their urbit directly — rather than going through a centralized service controlled by a MEGACORP that is trying to exploit you.
