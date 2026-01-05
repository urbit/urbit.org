+++
title = "Nockmas 2025: Day 12"
date = "2026-01-05"
description = "12 days of Nockmas: Hint, opcode 11"
# aliases = []

[extra]
# author = ""
ship = "~lagrev-nocfep"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+12/nockmas-day-12-hint-social.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Tall+Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["nock", "nockmas", ""]
+++

![nockmas day 12 hint image](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+12/nockmas-day-12-hint-social.png)

Welcome to this twelfth, and last, day of Nockmas where we will be discussing opcode 11, Hint, which is used as a way to attach metadata to a Nock expression.

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

Hints are intended to queue a particular Nock runtime environment, so the exact hints available may vary across runtimes. Check out [Hints and Jetting](https://nock.is/content/hints-jetting/index.html) for a more on how Nock 11 side effects can be used by a runtime. 

As our core exploration, though, we will take for the last time our favorite subject:
```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

And we can then use this with opcode 11 in the following two patterns. 

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

As the hint opcode is intended to be used by the interpreter for functionality such as performance optimizations (e.g. jets), it's includsion in a Nock expression may not have any impact. For example, the Python interpreter on [nock.is](https://nock.is) does not currently implement any hints, so all hints are effectively no-ops. However, they must be computed since they could crash.

## What next?

Thank you for joining us on these 12 days of Nockmas, exploring the Nock ISA's 12 opcodes. If this has captured your interest, let us know either [on X](https://x.com/urbit) or by getting on the Urbit network. Options exist for Quickstart via Tlon Messenger, or [self-hosting your own Urbit](https://urbit.org/overview/running-urbit).

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
