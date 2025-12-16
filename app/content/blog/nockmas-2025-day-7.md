+++
title = "Nockmas 2025: Day 7"
date = "2025-12-09"
description = "12 days of Nockmas: Conditional, opcode 6"
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

# Opcode 6: Conditional

## Syntax

```nock
*[a 6 b c d]       *[a *[[c d] 0 *[[2 3] 0 *[a 4 4 b]]]]
```

## Explanation

Opcode 6 implements a conditional branch.  Evaluate test formula b; if true (0), evaluate and return c; if false (1), evaluate and return d. Crashes on non-boolean test results.

1. Evaluate `b` against the subject, which must produce 0 or 1.
2. If 0 (true): evaluate `c` against subject and return.
3. If 1 (false): evaluate `d` against subject and return.

Any other value crashes (as enforced by the macro expansion).

In fact, much of the weirdness of the macro expression can be explained by its parsimonious use of the boolean result.  From right to left:

1. `*[a 4 4 b]` evaluates b, then adds 2 (so 0 → 2, 1 → 3).
2. `*[[2 3] 0 ...]` uses the result as an address into `[2 3]`.
3. `*[[c d] 0 ...]` uses 2 or 3 as address into `[c d]`.

This cleverly selects `c` (at address 2) for true, `d` (at address 3) for false.  (It does not pass through directly to avoid other results selecting other possible slots.)

```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

You need an expression that results in 0 or 1 to use as the test.  For example, to test whether the subject is equal to a value such as 42, use opcode 5:

```nock
[6 [5 [1 42] [0 1]] [1 100] [1 0]]
```

**Output:**
```
100
```

This is how to implement a `NOT` operator on a loobean value:

```nock
:subject 0
```

**Output:**
```
Subject set to: 0
```

```nock
[6 [5 [1 0] [0 1]] [1 1] [1 0]]
```

**Output:**
```
1
```
