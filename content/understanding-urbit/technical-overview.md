+++
title = "Technical Overview"
description = "A quick tour of the technology"
weight = 6
+++

<picture class="full c4-10-lg mt4">
<source srcset="https://media.urbit.org/site/understanding-urbit/technical-overview/technical-overview-1.png,
https://media.urbit.org/site/understanding-urbit/technical-overview/technical-overview-1%402x.png 2x">
<img src="https://media.urbit.org/site/understanding-urbit/technical-overview/technical-overview-1%402x.png">
</picture>

Owning a computer, especially a server, can feel like a part time job. Urbit, on the other hand, is engineered to be maintenance free. We figure, if people are actually going to use a new computing platform, it can’t feel like work. At all.

So we built our whole stack, starting with the VM, to be as simple and compact as possible. Let’s take a look at what the system looks like from a technical perspective and get a feel for how it’s built.

![](https://media.urbit.org/site/understanding-urbit/technical-overview/technical-overview-2.svg)

Under the hood, Urbit is two parts: an ID system and an OS. The ID system is live and deployed to Ethereum. The OS is a program that runs on top of any Unix machine with an internet connection.

Urbit ID is incredibly simple. An Urbit ID is just a pair of an ID and a public key. Some IDs have the ability to issue a finite number of other IDs. Galaxies, the top-tier of Urbit IDs, have the ability to upgrade the Urbit ID contracts by a majority vote. Each Urbit ID also has a cascade of keys that can perform specific actions which make securing your Urbit ID simple and straightforward. For example, the key for booting Urbit OS is separate from the key for issuing children — keep that one in a safe.

All of this is implemented as a [suite of Solidity contracts](https://github.com/urbit/azimuth) that are [deployed to Ethereum](https://etherscan.io/address/azimuth.eth) that we call ‘Azimuth’. We’re not wedded to using Ethereum forever — but it works well for now. Someday we’d like to host Azimuth on Urbit itself.

As a compliment to Urbit ID, we implemented the [Urbit HD wallet](https://github.com/urbit/urbit-wallet-generator) which lets most people own their Urbit IDs using a simple passkey that’s easy to remember. This means you own your Urbit ID and can log in to Urbit OS with something like `~ravmel-ropdyl`, `~poldec-tonteg-palfun-foslup`.

Until Urbit OS is completely secure (in the next year or so, we hope), you can interact with Urbit ID through a standalone, browser-based interface called [Bridge](https://bridge.urbit.org). Bridge lets you securely manage your keys, transfer your Urbit ID, log in to Urbit OS and so on.

![](https://media.urbit.org/site/understanding-urbit/technical-overview/technical-overview-3.svg)

In the simplest terms, Urbit OS is three things: a file, a key and a program. The file is a log of everything that has ever happened to your Urbit. The key is derived from the same key you own your Urbit ID with.

The program is mostly Arvo — our name for the Urbit OS kernel. Arvo is implemented in Hoon, a functional language that compiles down to Nock, our tiny set of opcodes.

Arvo’s behavior is completely defined by a transition function that goes from `[event, current-state]` to `[effects, next-state]`. An event might be a keypress, an HTTP request, or a UDP message from another Arvo. An effect might be a command to the Unix terminal, an HTTP response, a UDP message to another Arvo or a move to one of Arvo’s kernel modules or vanes.

We currently have vanes for networking (`%ames`), timers (`%behn`), a filesystem (`%clay`), a terminal driver (`%dill`), an http server (`%eyre`), a functional build system (`%ford`), an application server (`%gall`) and a module for managing private keys (`%jael`).

The operating system has a runtime called Vere that performs I/O for your OS. Think about it as the way your Urbit can interact with the outside world. It also handles your event log and runs Nock, our machine language.

Nock is like a pico-Lisp with no symbols. It's a homoiconic purely functional machine code with 12 opcodes and one universal datatype, the noun: an acyclic binary tree that is either a number (which can also represent an arbitrarily large bytestream) or a cell, which is a pair of nouns.

Hoon, the language in which the operating system is implemented is a purely functional, statically typed, strictly evaluated programming language that compiles to Nock. It’s a little quirky, but at its core it’s a macro extension of Nock.

Perhaps most interesting: our whole stack (except for Nock and Vere) is designed to be updated over the air. This is what makes it possible for Urbit to be a computer for life — it can grow with you.
