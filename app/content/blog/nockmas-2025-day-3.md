+++
title = "Nockmas 2025: Day 3"
date = "2025-12-09"
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

```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

This simple formula computes the constant function that always returns 100, then returns its subject (now 100).

```nock
[2 [1 100] [1 [0 1]]]
```

**Output:**
```
100
```

This formula acts as a dynamic formula selection, which sets the subject to 5 and then calculates its increment.

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
