+++
title = "Nockmas 2025: Day 10"
date = "2025-12-09"
description = "12 days of Nockmas: Invoke, opcode 9"
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

# Opcode 9: Invoke

## Syntax

```nock
*[a 9 b c]          *[*[a c] 2 [0 1] 0 b]
```

## Explanation

Opcode 9 enables the invocation pattern.  Produce a core (code + data bundle) from formula c, then execute the arm (code) at axis b within that core, with the core itself as subject.

Briefly, a core in Nock/Hoon is a cell [battery payload]:

* `battery` (address 2):  one or more formulas (the “arms”) as a noun.
* `payload` (address 3):  the data upon which the formulas operate.

Opcode 9 is how you call a core's arm.

1. Evaluate `c` against the subject to produce a new core.
2. Look up the formula at address `b` in the core (the arm).
3. Evaluate that formula with the core as subject.
4. Return the result.

(Note, however, that there is nothing intrinsic to Nock about the core, `[battery payload]`.  It's a convenient pattern to repeat and reason over, but Nock itself does not enforce any special semantics on it.  See [Detailed Examples](detailed-examples.ipynb) and [Idioms, Gates, Patterns](../examples/idioms-gates-patterns.ipynb) for further discussion.)

While understanding cores is key to understanding Hoon and Jock, we will defer deeper discussion of cores and arms until later in the tutorial.

This example subject pins a bit of operational code as a constant for later use:

```nock
:subject [1 4 1 0]
```

**Output:**
```
Subject set to: [1 4 1 0]
```

This code retrieves and evaluates it.

```nock
[9 1 [0 3]]
```

**Output:**
```
1
```

There are more complicated patterns to build on top of this once we look at cores in detail.
