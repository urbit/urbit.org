+++
title = "Nockmas 2025: Day 6"
date = "2025-12-30"
description = "12 days of Nockmas: Equality Check, opcode 5"
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

On this sixth day of Nockmas, we visit opcode 5, Equality Check. The last of the axiomatic operators, nock 5 different but closely related to opcode 3 which we discussed previously.

# Opcode 5: Equality Check

## Syntax

Opcode 5 implements the idiomatic `=` tis equality operator, which tests for deep equality between two nouns.

```nock
*[a 5 b c]          =[*[a b] *[a c]]
```

## Explanation

Opcode 5 tests whether the products of formulas `b` and `c` are structurally identical.  It returns 0 if equal, 1 if not.

1. Evaluate `b` against the subject to produce noun `l`.
2. Evaluate `c` against the subject to produce noun `r`.
3. Return 0 if `l` and `r` are identical nouns, 1 otherwise.

```
=[a a]              0
=[a b]              1
```

Like opcode 3, `=` tis checks by structure, and also by value.  Equality is deep structural comparison: two cells are equal iff their heads are equal and their tails are equal.

Taking our basic subject:
```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

We can call a nock 5 on two cells:
```nock
[5 [0 1] [1 42]]
```

**Output:**
```
0
```

If we expand our subject:
```nock
:subject [42 43]
```

**Output:**
```
Subject set to: [42 43]
```

Two common patterns recur.  The first checks whether a computed noun is equal to a specific target constant noun:

```nock
[5 [0 2] [1 42]]
```

**Output:**
```
0
```

The second compares two slots in the subject to see if they hold equal values:

```nock
[5 [0 2] [0 3]]
```

**Output:**
```
1
```

Of course we can use this in conjunction with the computed results of any other noun:
```nock
[5 [4 0 2] [0 3]]
```

**Output:**
```
0
```

Join us tomorrow when we cover Nock 6, Conditional.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
