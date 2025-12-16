+++
title = "Nockmas 2025: Day 8"
date = "2025-12-09"
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

Increment, then increment again:

```nock
[7 [4 0 1] [4 0 1]]
```

**Output:**
```
44
```

Increment, then increment again, then check if it's a cell:

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

(This is typically paired with [opcode 8](./opcode-8.ipynb) to build the context.)

```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

```nock
[7 [[0 1] [1 41]] [5 [0 2] [4 0 3]]]
```

**Output:**
```
0
```
