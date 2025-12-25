+++
title = "Nockmas 2025: Day 1"
date = "2025-12-25"
description = "12 days of Nockmas: Address, opcode 0"
# aliases = []

[extra]
# author = ""
ship = "~lagrev-nocfep"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+1/nockmas-day-1-tree-addressing-Social.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Tall+Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["nock", "nockmas", ""]
+++

For our first full day of Nockmas, we will look at Nock's first opcode. If you have a running urbit, you can experiment with this from the Arvo command line, or 'dojo'. No running ship yet? [Get started here](https://urbit.org/overview/running-urbit). Of course, you can just follow along in this article, or even sketch out the basic Nock formulas and tree structures on a piece of paper as you go.

# Opcode 0: Address

## Syntax

Opcode 0 implements the idiomatic `/` "fas" slot operator, which retrieves a noun at a specified address within the subject.

```nock
*[a 0 b]            /[b a]
```

Before discussing opcode 0, the addressing operator, we need to explore how nouns are structured in Nock.

## Nouns

The fundamental data structure of Nock is the noun, which is either an atom (a non-negative integer) or a cell (an ordered pair of two nouns).  Nouns can be visualized as [binary trees](https://grokipedia.com/page/Binary_tree), in which atoms are leaves and cells are internal nodes.

This leads to a convenient addressing scheme for nouns, for which each noun and sub-noun can be assigned a unique address based on its position in the binary tree. The addressing scheme works as follows:

```nock
/[1 a]              a
/[2 a b]            a
/[3 a b]            b
/[(a + a) b]        /[2 /[a b]]
/[(a + a + 1) b]    /[3 /[a b]]
/a                  /a
```

![Example Tree #1 diagram](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day%201/nockmas-day-1-tree-1.png)

That is, the left-hand daughter of a cell is addressed by doubling its mother's address, while the right-hand daughter is addressed by doubling its mother's address and adding one. The root of the tree is always at address 1.

Of course, that's just an addressing scheme:  it tells you how a noun is laid out, but not which positions are actually occupied.  Let's see some examples.  In these, we will use `⬡` to denote atoms (leaves) and `▢` to denote cells (internal nodes).

### `[[41 42] [43 44]]`

![Example Tree #2 diagram](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day%201/nockmas-day-1-tree-2.png)

### `[1 [2 3]]`

![Example Tree #3 diagram](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day%201/nockmas-day-1-tree-3.png)

```nock
[a b c]             [a [b c]]
```

We often omit the right-hand cells since cells tend to branch strongly right in practice.  (This saves us from Lisp-style end-paren piles.)

```nock
[a b c]             [a [b c]]
```

Thus, `[1 [2 3]]` can be written equivalently as `[1 2 3]`.

### `[[1 2] 3]`

![Example Tree #4 diagram](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day%201/nockmas-day-1-tree-4.png)

## Syntax (Redux)

```nock
/[1 a]              a
/[2 a b]            a
/[3 a b]            b
/[(a + a) b]        /[2 /[a b]]
/[(a + a + 1) b]    /[3 /[a b]]
/a                  /a

*[a 0 b]            /[b a]
```

## Explanation

The `/` fas or slot operator describes how to navigate a noun given an address as an atom.  The address is interpreted as a path through the binary tree, starting at the root (address 1).  Each even number indicates a left branch, and each odd number indicates a right branch.  The process continues until the address 1 is reached, at which point the corresponding noun is returned.

Most of the time, we expand the tree out to the conceptual binary tree map above rather than recursively apply the `/` fas slot rule.

Opcode 0 is used to retrieve the noun at address `b` within the subject.  `b` must be a positive atom (the address).

Opcode 0 crashes if the address doesn't exist (e.g., addressing into an atom).  Since there is no address 0, we use `/[0 a]` or `[a 0 0]` to denote a crash.

### Binary

Addressing becomes particularly easy to read in binary form, in which a 0 bit corresponds to a left branch and a 1 bit corresponds to a right branch.  We ignore the first bit (`1`, the root) and read the path in binary:

![tree addressing diagram](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day%201/nockmas-day-1-tree-addressing.png)

You will notice other patterns, e.g., that the rightmost child at a particular level is equal to a power of 2 minus 1.

## Examples
Imagine you have the following noun in your subject, represented here as a binary tree:
![Example Tree #5 diagram](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day%201/nockmas-day-1-tree-5.png)

Or as a Nock formula:
```nock
:subject [[[41 42 [43 44] [45 46] [47 48] [49 50]]] [51 52]]
```

If you had this as your subject in your dojo, and ran Nock 0: 
**Input:**
```nock
[0 2]
```

**Output:**
```
[41 42 [43 44] [45 46] [47 48] 49 50]
```

**Input:**
```nock
[0 3]
```

**Output:**
```
[51 52]
```

Join us tomorrow when we cover Nock 1, Constant.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
