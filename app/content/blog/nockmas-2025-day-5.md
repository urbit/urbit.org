+++
title = "Nockmas 2025: Day 5"
date = "2025-12-29"
description = "12 days of Nockmas: Increment, opcode 4"
# aliases = []

[extra]
# author = ""
ship = "~lagrev-nocfep"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+5/nockmas-day-5-increment-social.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Tall+Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["nock", "nockmas", ""]
+++

![nockmas day 5 increment image](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+5/nockmas-day-5-increment-social.png)

On this fifth day of Nockmas, we explore opcode 4, Increment, which is the second of our axiomatic Nock instructions.  

# Opcode 4: Increment

## Syntax

Opcode 4 implements the idiomatic `+` lus increment operator, which adds 1 to an atom.

```nock
*[a 4 b]            +*[a b]
```

## Explanation

Opcode 4 adds 1 to the product of formula `b`. This is Nock's only arithmetic primitive—all other arithmetic must be built from increment.

1. Evaluate `b` against the subject, which must produce an atom.
2. Return that atom plus 1.

```
+[a b]              +[a b]
+a                  1 + a
```

We can increment atoms, but not cells (which makes sense).  Every natural number (atom) has a successor, so there is no possible crash here (as long as our interpreter actually supports arbitrarily sized integers).

Since increment is the only arithmetic operation, other arithmetic operations must be built from it.  For instance, decrement requires counting up from 0, and addition requires repeated incrementing.  Thus all arithmetic in Nock is theoretically ***O(n)*** or worse, where ***n*** is the size of the numbers involved.  In practice, interpreters “jet” (accelerate) known arithmetic patterns (see [opcode 11](https://nock.is/content/specification/opcode-11.html) and [jet-accelerated code](https://nock.is/content/hints-jetting/index.html)).

We'll continue with our favorite basic subject:
```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

And call Nock 4 on that subject:
```nock
[4 0 1]
```

**Output:**
```
43
```

This of course can be called in a nested fashion:
```nock
[4 4 4 4 4 4 4 4 4 0 1]
```

**Output:**
```
51
```

Or against the result of some other Nock formula:
```nock
[4 1 42]
```

**Output:**
```
43
```

Expect failure on incrementing a cell:

```nock
[4 1 [42 43]]
```

As a note on Nock specification versus implementation, atoms are formally unbounded in size, so incrementing the largest possible atom is not a problem in Nock itself.  However, practical interpreters may have limits on the size of atoms they can represent. This kind of design decision is part of what makes it possible for Nock-based computation to expand beyond current technical implementations.

For exmaple, in the interpreter on [nock.is](https://nock.is), which is written in Python, there are only practical limits (the size of RAM) to integers and thus to atom size. Meaning you might find an atom size limit on a formula such as: 

```nock
[4 1 999999999999999999999999999999999999999999999999999999999]
```

**Output:**
```
1000000000000000000000000000000000000000000000000000000000
```

Join us tomorrow when we cover Nock 5, Equality Check.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
