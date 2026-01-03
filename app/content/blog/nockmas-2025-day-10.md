+++
title = "Nockmas 2025: Day 10"
date = "2026-01-03"
description = "12 days of Nockmas: Invoke, opcode 9"
# aliases = []

[extra]
# author = ""
ship = "~lagrev-nocfep"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+10/nockmas-day-10-invoke-social.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Tall+Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["nock", "nockmas", ""]
+++

![nockmas day 10 invoke image](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+10/nockmas-day-10-invoke-social.png)

On this tenth day of Nockmas, we explore opcode 9, Invoke, continuing the pattern of pinning a core and its arms which we saw in yesterday's discussion. 

# Opcode 9: Invoke

## Syntax

```nock
*[a 9 b c]          *[*[a c] 2 [0 1] 0 b]
```

## Explanation

Opcode 9 enables the invocation pattern.  Produce a core (code + data bundle) from formula c, then execute the arm (code) at axis b within that core, with the core itself as subject.

Briefly, a core in Nock/Hoon is a cell `[battery payload]`:

* `battery` (address 2):  one or more formulas (the “arms”) as a noun.
* `payload` (address 3):  the data upon which the formulas operate.

Opcode 9 is how you call a core's arm.

1. Evaluate `c` against the subject to produce a new core.
2. Look up the formula at address `b` in the core (the arm).
3. Evaluate that formula with the core as subject.
4. Return the result.

(Note, however, that there is nothing intrinsic to Nock about the core, `[battery payload]`.  It's a convenient pattern to repeat and reason over, but Nock itself does not enforce any special semantics on it.  See [Detailed Examples](https://nock.is/content/specification/detailed-examples.html) and [Idioms, Gates, Patterns](https://nock.is/content/examples/idioms-gates-patterns.html) for further discussion.)

While understanding cores is key to understanding [Hoon](https://docs.urbit.org/hoon/why-hoon) and [Jock](https://jock.org), we will defer deeper discussion of cores and arms. Visit [nock.is](https://nock.is) or [docs.urbit.org](https://docs.urbit.org) if you are eager to learn more.

This example subject pins a bit of operational code as a constant for later use:

```nock
:subject [1 4 1 0]
```

**Output:**
```
Subject set to: [1 4 1 0]
```

This code retrieves and evaluates it.

```nock
[9 1 [0 3]]
```

**Output:**
```
1
```

There are more complicated patterns to build on top of this once you look at cores in detail, but we will leave it here for our initial introduction. 

Join us tomorrow when we cover Nock 10, Edit.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
