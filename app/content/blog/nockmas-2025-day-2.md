+++
title = "Nockmas 2025: Day 2"
date = "2025-12-26"
description = "12 days of Nockmas: Constant, opcode 1"
# aliases = []

[extra]
# author = ""
ship = "~lagrev-nocfep"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+2/nockmas-day-2-constants-Social.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Tall+Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["nock", "nockmas", ""]
+++

![nockmas day 2 constants image](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+2/nockmas-day-2-constants-Social.png)

Here on the second day of Nockmas, our focus is on opcode 1, Constant.

# Opcode 1: Constant

## Syntax

```nock
*[a 1 b]            b
```

## Explanation

In many respects, opcode 1 is the simplest conceivable Nock operation:  it simply returns its argument `b`, ignoring its subject `a` entirely.

Opcode 1 is used to store data for use in later computations.  This can either be conventional data as atoms (including byte arrays) and structured data in a cell format; or it can be Nock code itself, which can be retrieved and executed later using [opcode 9](./opcode-9.ipynb).

Imagine we have the following subject:
```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

And then we call Nock 1:
```nock
[1 1000]
```

**Output:**
```
1000
```

While you haven't seen the full Nock specification for the other opcodes yet, observe how evaluating a stored noun with opcode 1 results in an executable Nock expression.

```nock
[1 4 0 1]
```

**Output:**
```
[4 0 1]
```

In the following expression, we use opcode 2 to evaluate the noun stored in the subject `[0 1]`, then we retrieve the constant code stored using opcode 1, and finally we execute that code with the result of the first evaluation as its subject.  A bit roundabout, in this case, but it demonstrates how stored code can be executed later.

```nock
[2 [0 1] [1 4 4 4 0 1]]
```

**Output:**
```
45
```

Join us tomorrow when we cover Nock 2, Evaluate.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
