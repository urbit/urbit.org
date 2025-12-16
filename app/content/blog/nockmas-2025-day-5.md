+++
title = "Nockmas 2025: Day 5"
date = "2025-12-09"
description = "12 days of Nockmas: Incement, opcode 4"
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

Since increment is the only arithmetic operation, other arithmetic operations must be built from it.  For instance, decrement requires counting up from 0, and addition requires repeated incrementing.  Thus all arithmetic in Nock is theoretically $O(n)$ or worse, where n is the size of the numbers involved.  In practice, interpreters “jet” (accelerate) known arithmetic patterns (see [opcode 11](opcode-11.ipynb) and [jet-accelerated code](../hints-jetting/index.md)).

```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

```nock
[4 0 1]
```

**Output:**
```
43
```

```nock
[4 4 4 4 4 4 4 4 4 0 1]
```

**Output:**
```
51
```

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

Atoms are formally unbounded in size, so incrementing the largest possible atom is not a problem in Nock itself.  However, practical interpreters may have limits on the size of atoms they can represent.

In this interpreter, which is written in Python, there are only practical limits (the size of RAM) to integers and thus to atom size.

```nock
[4 1 999999999999999999999999999999999999999999999999999999999]
```

**Output:**
```
1000000000000000000000000000000000000000000000000000000000
```
