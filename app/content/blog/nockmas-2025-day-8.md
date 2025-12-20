+++
title = "Nockmas 2025: Day 8"
date = "2026-01-01"
description = "12 days of Nockmas: Compose, opcode 7"
# aliases = []

[extra]
# author = ""
ship = "~lagrev-nocfep"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Tall+Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["nock", "nockmas", ""]
+++

On this eighth day of Nockmas (and first of the New Year), we look at opcode 7, Compose. 

# Opcode 7: Compose

## Syntax

```nock
*[a 7 b c]          *[*[a b] c]
```

## Explanation

Opcode 7 provides function composition. It evaluates `b` against the subject, then uses that result as the subject for evaluating `c`. This produces a classic “pipe” pattern.

1. Evaluate `b` against subject to produce an intermediate noun.
2. Evaluate `c` against that intermediate to produce the final product.

When reading it, think of it as “then” or “pipe”.  The first formula changes the subject and the second operates on the new subject.

Again, our subject:
```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

There are two common patterns for using opcode 7.  The first is simply to chain multiple computations together in sequence:

```nock
*[x [7 transform1 [7 transform2 transform3]]]
```

In the most simple case; increment, then increment again:

```nock
[7 [4 0 1] [4 0 1]]
```

**Output:**
```
44
```

Or continuing the chain: Increment, then increment again, then check if it's a cell:

```nock
[7 [4 0 1] [7 [4 0 1] 3 0 1]]
```

**Output:**
```
1
```

Make a cell of the subject repeated, then check if it's a cell:

```nock
[7 [[0 1] [0 1]] 3 0 1]
```

**Output:**
```
0
```

The second is to set up a context for a computation by first extending the subject with additional data, then performing the computation in that extended context:

```nock
*[input [7 [build-context] [main-computation]]]
```

(This is typically paired with [opcode 8](https://nock.is/content/specification/opcode-8.html) to build the context.)

Revisiting our basic subject:
```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

We then call a Nock 7 to build a context and run a computation:
```nock
[7 [[0 1] [1 41]] [5 [0 2] [4 0 3]]]
```

**Output:**
```
0
```

Think through the formula above; What is it doing? 

Having trouble? Shoot a note to [@urbit](https://x.com/urbit) or join us on Tlon Messenger in the [\[battery payload\] group](https://join.tlon.io/0v1.thdiu.q9kem.a0gtu.438pi.544q5).

Join us tomorrow when we cover Nock 8, Extend.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
