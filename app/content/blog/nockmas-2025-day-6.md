+++
title = "Nockmas 2025: Day 6"
date = "2025-12-09"
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

```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

```nock
[5 [0 1] [1 42]]
```

**Output:**
```
0
```

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

```nock
[5 [4 0 2] [0 3]]
```

**Output:**
```
0
```
