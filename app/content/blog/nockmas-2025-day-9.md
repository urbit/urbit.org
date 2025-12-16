+++
title = "Nockmas 2025: Day 9"
date = "2025-12-09"
description = "12 days of Nockmas: Extend, opcode 8"
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

Opcode 8 extends the subject, while [opcode 7](./opcode-7.ipynb) replaces it:

```nock
*[a 7 b c]  →  *[*[a b] c]       :: New subject is *[a b]
*[a 8 b c]  →  *[[*[a b] a] c]   :: New subject is [*[a b] a]
```

There are two primary patterns for using opcode 8.  In the first, a local variable is bound for use in a computation:

```nock
*[data [8 [compute-value] [body-using-value-at-+2]]]
```

```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

```nock
[8 [1 41] [[0 2] [0 3]]]
```

**Output:**
```
[41 42]
```

The other, more complex, pattern is to pin a core and its arms to the subject for invocation later.  We'll see this pattern in detail in [opcode 9](./opcode-9.ipynb)'s discussion.

```nock
*[context [8 [1 battery] [9 2 [0 1]]]]
```
