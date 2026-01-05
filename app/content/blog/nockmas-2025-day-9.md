+++
title = "Nockmas 2025: Day 9"
date = "2026-01-02"
description = "12 days of Nockmas: Extend, opcode 8"
# aliases = []

[extra]
# author = ""
ship = "~lagrev-nocfep"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+9/nockmas-day-9-extend-social.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Tall+Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["nock", "nockmas", ""]
+++

![nockmas day 9 extend image](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+9/nockmas-day-9-extend-social.png)

On this ninth day of Nockmas, we will explore opcode 8, Extend and how Nock implements variable binding.

# Opcode 8: Extend

## Syntax

```nock
*[a 8 b c]          *[[*[a b] a] c]
```

## Explanation

Opcode 8 pins a new value to the head of the subject, then evaluate the body.  This is how Nock implements variable binding—the new value becomes accessible at address 2.

1. Evaluate `b` against subject to produce a new value.
2. Construct `[new-value subject]` as the extended subject.
3. Evaluate `c` against the extended subject.

After opcode 8, addresses shift:

* Address 2 → the new pinned value
* Address 3 → the original subject
* Address 6 → what was address 2
* Address 7 → what was address 3

Opcode 8 extends the subject, while [opcode 7](https://nock.is/content/specification/opcode-7.html) replaces it:

```nock
*[a 7 b c]  →  *[*[a b] c]       :: New subject is *[a b]
*[a 8 b c]  →  *[[*[a b] a] c]   :: New subject is [*[a b] a]
```

There are two primary patterns for using opcode 8.  In the first, a local variable is bound for use in a computation:

```nock
*[data [8 [compute-value] [body-using-value-at-+2]]]
```

We start with our subject:
```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

And call a Nock 8 with the following formula:
```nock
[8 [1 41] [[0 2] [0 3]]]
```

**Output:**
```
[41 42]
```

The other, more complex, pattern is to pin a [core](https://docs.urbit.org/build-on-urbit/hoon-school/f-cores) and its [arms](https://docs.urbit.org/build-on-urbit/hoon-school/f-cores#arms) to the subject for invocation later.  We'll see this pattern in detail in [opcode 9](https://nock.is/content/specification/opcode-9.html)'s discussion.

```nock
*[context [8 [1 battery] [9 2 [0 1]]]]
```

Join us tomorrow when we cover Nock 9, Invoke.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
