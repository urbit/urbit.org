+++
title = "Nockmas 2025: Day 12"
date = "2025-12-09"
description = "12 days of Nockmas: Hint, opcode 11"
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

# Opcode 11: Hint

## Syntax

Opcode 11 comes in two forms, the first a “dynamic hint” which involves an evaluation, and the second a “static hint” which simply provides a bare noun as a runtime hint.

```nock
*[a 11 [b c] d]     *[[*[a c] *[a d]] 0 3]
*[a 11 b c]         *[a c]
```

Note that even if `b` is not retained, the computation of `b` must still be performed, as it could result in a crash itself or other nested side effects.

## Explanation

Hints are a way to attach metadata to Nock expressions without affecting their evaluation.  They signal to the runtime to produce certain side effects or optimizations, but the hint itself does not change the result of the computation.

Hints are intended to queue a particular Nock runtime environment, so the exact hints available may vary across runtimes.

* [Hints and Jetting](../hints-jetting/index.md)

```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

Static hints are simple tags for the interpreter to recognize:

```nock
*[subject 11 tag formula]  → *[subject formula]
```

```nock
[11 42 0 1]
```

**Output:**
```
42
```

Dynamic hints actively generate data for the runtime:

```nock
*[subject 11 [tag clue] formula]
```

1. The `clue` formula is evaluated (its result may be used by the interpreter).
2. The `formula` is evaluated and returned.
3. The hint `tag` and `clue` value are available to the interpreter for side effects.

Hint tags tend to be expressed in code as ASCII text, which reduces unambiguously to a numerical atom in Nock as a byte pattern.

This Python interpreter for Nock does not currently implement any hints, so all hints are effectively no-ops.  However, they must be computed since they could crash.
