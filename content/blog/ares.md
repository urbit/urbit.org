+++
title = "Ares"
date = "2023-06-26"
description = "A light technical description of Ares, the new Urbit runtime"

[extra]
author = "Noah Kumin"
ship = "~librex-dozryc"
image = "https://storage.googleapis.com/media.urbit.org/blog/ares-header.png"
+++

![Image](https://storage.googleapis.com/media.urbit.org/blog/ares-header.png)

## What is Ares?

Ares is a new Urbit runtime that will be much faster and manage a much larger amount of data than previous versions of the runtime. Those new to Urbit commonly ask if they will be able to host photos and videos on their Urbit ships. Ares—a joint project from the Urbit Foundation, Tlon, and Zorp—sets the stage for us to be able to answer, simply, “Yes.” Ares is still a work in progress, but we expect to see the new binaries rolled out later this year. There are three components to the project. Let’s talk about them one by one.

## 1. Code Generation

Modern CPUs are extraordinarily fast. But until now your Urbit hasn’t been able to take full advantage of this fact. One way to conceptualize the problem is to imagine a train that is only able to go as fast as a track-worker can lay down track for it. In this analogy, your CPU is the train, and the track-worker is the Urbit runtime. The aim is to have large sections of track laid down ahead of time. Ares includes a codegen system that compiles Nock, Urbit’s assembly language, to machine code that the CPU can predict well.

This system addresses what has until now been a problem: Nock is meant to invoke other code in a given Urbit computer’s “subject.” Or, in more common parlance, in the computer’s “state.” Your state changes with every new message your Urbit computer sends and receives, or with any new event in any app. That makes it hard to make the resulting machine code run fast, since the CPU needs to read from the subject while it’s running in order to figure out what machine code will be run next.

The new code generation process in Ares solves this problem by using a system which the developers have called “subject knowledge analysis.” What does this mean? By analyzing how an Urbit subject might change over the course of a Nock computation, Ares will learn about the subject's tree shape and about its data dependencies (*i.e.*, the way that later parts of the computation depend on earlier parts of the computation). This allows those parts of the subject which are known at the time of compiling Nock to machine code to remain known at later points in the computation.

To go back to our metaphor of train tracks, this is what allows the “track” to be laid down ahead of time. This set of known parts of the subject typically includes Nock formulas stored in [cores](https://developers.urbit.org/guides/core/hoon-school/F-cores#cores). This allows the resulting machine code to use direct jumps to perform Nock function calls. Without this “subject knowledge analysis,” the CPU would have had to perform an “indirect jump” by calculating the location to which a later instruction would jump. Now your computer’s CPU can jump directly to where it’s supposed to go.  

## 2. 2stackz Noun Allocator

Ares will make use of what we’re calling the *2stackz noun allocator*. With the advent of Ares, your Urbit will be a virtual machine with two stacks and no heap. What does this mean? Traditionally, a program has a *stack* and a *heap*. The stack is a linear data structure within a program used for the program’s execution. The heap is a less structured region of memory that is used for storing large pieces of data or data that you want to keep around for a while without taking up space in the stack. However, the heap is slower, because its system for allocating memory is less orderly. (Imagine, say, trying to find a specific pair of socks in a heap of clothing.) 

Ares recognizes that because Nock is much more constrained than most languages, the Urbit runtime doesn’t actually need a heap. Instead you can take the function call stack and split it in two. The top of either stack can then be used as a little temporary heap. Whenever a function executes, you copy the data that gets returned from one stack to the other. And all the intermediate products that get created when running that function (*i.e.*, other functions that got called by the initial function) sit there as *garbage* (unwanted or unused data) in between the two stacks. But you don’t have to do the same sort of bookkeeping—tracking and updating these values—that you would have to do with a heap.

Every piece of data in your Urbit computer is a noun. A noun is an atom (a positive integer or zero) or a cell (a pair of nouns). Before Ares, both allocating and freeing a noun in the Urbit runtime were processes that took a lot of time. (To *allocate* a noun is to put that noun in memory and to *free* it is to tell your urbit that you don’t need it any more.) Ares should make both of these processes much faster. This is good news because the Urbit runtime allocates nouns (particularly pairs of nouns, known as cells) like nobody’s business. 

## 3. Persistent Memory Arena

Ares’s Persistent Memory Arena is for managing large amounts of data within your urbit in such a way that your urbit does not get slow. If you have terabytes of data within your Urbit, you can only have a very small subset of that within your hardware’s RAM at a given time. The rest of that data is going to have to live on disk—the section of your hardware that is more capacious but takes more time to access. 

To deal with this fact, your motherboard moves data back and forth between RAM and disk depending on what data needs to be accessed at a given time. This is known as *paging*, because it does so one *page* (usually four kilobytes) at a time. Traditionally operating systems will handle paging for you, but they do it in a generic way. The Persistent Memory Arena is designed specifically for managing Urbit's single-level store.

A *single-level store* means that there’s no distinction in the operating system between data that lives in RAM and data that lives on disk. Instead of having two levels from which you can access data, you only have one, and the system itself manages which parts of the data are in RAM and which are in disk. The Persistent Memory Arena is an optimization for handling a large amount of data in a single level store. It is for nouns that persist between computations. Using the PMA, your urbit’s state can grow large without being hemmed in by the limitations of your hardware’s RAM.


## Updates and Links

You can find the Ares GitHub repository [here](https://github.com/urbit/ares). The technical proposal is [here](https://github.com/urbit/ares/blob/status/docs/proposal/proposal-nock-performance.md). Check back at the Urbit Google Groups [listserv](https://groups.google.com/a/urbit.org/g/dev/), the [@zodisok](https://twitter.com/zodisok) Twitter account, and the Urbit Foundation [group](https://tlon.network/lure/~halbex-palheb/uf-public) for updates about the upcoming release.

–

*Noah Kumin is the founder and editor in chief of the [Mars Review of Books](https://marsreview.org/).*
