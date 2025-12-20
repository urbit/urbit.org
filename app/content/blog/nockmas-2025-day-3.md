+++
title = "Nockmas 2025: Day 3"
date = "2025-12-27"
description = "12 days of Nockmas: Evaluate, opcode 2"
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

On this third day of Nockmas, we will explore how opcode 2 is used to evaluate a subject and formula.

# Opcode 2: Evaluate

## Syntax

Opcode 2 implements the `*` tar evaluate operator, which dynamically computes a new subject and formula, then evaluates the formula against the subject.

```nock
*[a 2 b c]          *[*[a b] *[a c]]
```

## Explanation

The `eval` of Nock, opcode 2 computes a new subject from formula `b`, compute a new formula from formula `c`, then nock the results together.  This enables dynamic code execution.

1. Evaluate `b` against the subject to produce a noun (new subject).
2. Evaluate `c` against the subject to produce a noun (new formula).
3. Evaluate the new formula against the new subject to yield the final product.

Opcode 2 is the foundation for function calls, code generation, and metaprogramming in Nock.  However, it is not used directly by the Hoon and Jock compiler, which instead use opcode 2 via the opcode 9 macro.

Again let's assume the most basic subject:
```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

Then take the following simple formula to compute a constant function that always returns 100, then returns its subject (now 100).

```nock
[2 [1 100] [1 [0 1]]]
```

**Output:**
```
100
```

This formula acts as a dynamic formula selection, which sets the subject to 5 and then calculates its increment using opcode 4 (which we will discuss in two days):

```nock
:subject [5 [4 0 1]]
```

**Output:**
```
Subject set to: [5 4 0 1]
```

```nock
[2 [0 2] [0 3]]
```

**Output:**
```
6
```

Join us tomorrow when we cover Nock 3, Cell Check.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
