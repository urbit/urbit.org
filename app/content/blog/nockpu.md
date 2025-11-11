+++
title = "NockPU"
date = "2023-08-02"
description = "A light technical description of NockPU, a hardware system for running Nock"

[extra]
author = "Noah Kumin"
ship = "~librex-dozryc"
image = "https://mopfel-winrux-s3.nyc3.digitaloceanspaces.com/mopfel-winrux/NPU/State_Diagrams/MTU_State_diagram.png"
+++

![Image](https://mopfel-winrux-s3.nyc3.digitaloceanspaces.com/mopfel-winrux/NPU/State_Diagrams/MTU_State_diagram.png)

Since the early days of Urbit, enthusiasts have floated the idea of hardware specifically designed for running Urbit’s software stack. This has mostly seemed like a distant dream—but in 2023 it’s on its way to becoming a little more real.

Urbit engineer and hardware aficionado ~mopfel-winrux always knew that Nock, Urbit’s lower level language, could run on bare metal. That is, one could design computer hardware to run this unique instruction set, which is so compact that it fits on a T-shirt. And so he decided to take the first steps toward doing so. He is calling his project NockPU (Nock Processing Unit). 
Like Linus Torvalds, the inventor of Linux, ~mopfel-winrux began this project “just for fun.” But in a future where Urbit is the operating system of choice, NockPU could be a critical part of global computing. We’re far off from that now. But crazier things have happened. Torvalds certainly never expected that the operating system he wrote as a lark would become necessary to keep the world’s governments, banks, and businesses afloat.

Before getting into NockPU, let’s look at what traditional computer hardware architecture looks like, and then we can dive into some of the ways that NockPU changes direction in order to complete its unique task.

**What goes into building hardware for a traditional computer?**

Consider the original Turing machine architecture, wherein a (possibly infinite) tape is read and processed by a single head. We don’t have any machine like this in the real world, but it turns out that we can build many possible actual chips that carry out equivalent operations.

The typical hardware architecture for the personal computers we use today is called the [von Neumann architecture](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Von_Neumann_Architecture.svg/300px-Von_Neumann_Architecture.svg.png). With a von Neumann architecture, you have a processor on one side and the memory unit on the other. Your processor both reads from and writes to that memory unit. In order to go fast, CPUs with this architecture will perform sequential reads and writes. In this paradigm, different stages of the computing process can happen simultaneously.
For example, while you’re waiting to fetch instruction 2, you can be decoding instruction 1. You can read memory at the same time that another process is executing. This is the principle that allows us to watch a movie on our computers while we simultaneously write an email and receive a calendar notification. For this principle to work effectively, modern programming relies heavily on [linear arrays](https://www.tutorialspoint.com/data_structures_algorithms/array_data_structure.htm) and on modern CPUs being well-equipped to pre-retrieve and cache such arrays intelligently.

**What goes into building NockPU?**

A hardware system dedicated to pure Nock execution implies a different set of principles. Because a tree structure is inherent to Nock, you need to traverse a [binary tree](https://davis68.github.io/martian-computing/img/05-binary-tree-15.png) of operations in order to execute a given function. Within a given Nock Formula you have opcodes (i.e., [Nock formulas](https://developers.urbit.org/reference/nock/definition)) which modify the tree in one manner or another. NockPU breaks up the CPU into traversal and execute components. This allows NockPU to "search" the binary tree for some nock to execute. It searches it by traversing it and looking for a cell tagged with an execute bit. A normal CPU doesn’t need this, because traversal is not the majority of what a normal CPU does. But when you’re working with pure Nock, tree traversal plays a much larger role than array processing.

Usually tree traversals require a [stack](https://www.techopedia.com/definition/9523/stack). A stack is a memory structure that keeps track of where you’ve been and where you’re going. But ~mopfel-winrux has built NockPU to operate stacklessly. How did he do this? NockPU stores the history of traversal in memory, and cleans it up when it leaves.

The final major component of NockPU is memory MUX (Multiplexer), which is a component that acts as a switch over which component controls the memory. The memory MUX lives in front of the memory unit, and determines whether it listens to the traversal unit or to the execute unit.

**What’s the Upshot?**

Like traditional CPUs, NockPU could, in the future, utilize various hardware optimization components. Traditional CPUs are chock-full of these. In the Urbit universe, we call such optimization components hardware jets.

Nock on bare metal is still a distant prospect. We’ve had 60 years of optimization for the von Neumann architecture, and it’s no easy task to start from scratch. But it was a big lift to get Urbit’s software stack off the ground, too. 

A hardware system built for Nock has one major advantage over traditional CPUs, which will be familiar to those who are actively programming on Urbit. That is, Nock is extremely simple, and is designed to be frozen in time. A comparison of Nock with, for example, the gargantuan [x86 instruction set](https://en.wikipedia.org/wiki/X86_instruction_listings), will give one a good sense of the difference. The x86 instruction set gets bigger and bigger over time. Eventually this complexity makes it difficult for different pieces of computer architecture to work together. Nock hardware could reduce this complexity and free engineers to work on more exciting tasks. Thus we revisit the perennial complex instruction set (CISC) v. reduced instruction set (RISC) [debate](https://cs.stanford.edu/people/eroberts/courses/soco/projects/risc/risccisc/).

To learn more about ~mopfel-winrux’s work, join his NockPU group on Urbit at ~mopfel-winrux/nockpu.



