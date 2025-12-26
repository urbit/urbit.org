+++
title = "Nockmas 2025: Day 4"
date = "2025-12-28"
description = "12 days of Nockmas: Cell Check, opcode 3"
# aliases = []

[extra]
# author = ""
ship = "~lagrev-nocfep"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+4/nockmas-day-4-cell-check-Social.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Tall+Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["nock", "nockmas", ""]
+++

![nockmas day 4 cell check image](https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/day+4/nockmas-day-4-cell-check-Social.png)
On this fourth day of Nockmas we explore opcode 3, the first of our axiomatic functions. 

# Opcode 3: Cell Check

## Syntax

Opcode 3 implements the idiomatic `?` wut cell check operator, which tests whether a noun is a cell.

```nock
*[a 3 b]            ?*[a b]
```

## Explanation

Opcode 3 tests whether the product of formula b is a cell or an atom.  It returns 0 (yes) if it's a cell, 1 (no) if it's an atom.

1. Evaluate `b` against the subject to produce a noun.
2. Test if that noun is a cell.
3. Return 0 if cell, 1 if atom.

One implication of nouns is that an easy way to tell data apart is by their structure:

```
?[a b]              0
?a                  1
```

`?` wut is useful to ask whether a given noun is a cell or an atom.  (Like C's `int main()` return type and error codes, `0` means `TRUE` and `1` means `FALSE`.)

It is worth noting here, that Nock takes the sometimes controversial stance of ['loobeans'](https://docs.urbit.org/build-on-urbit/hoon-school/n-logic#loobean-logic) or an inverse of the tradiational boolean where `1` is `TRUE` and `0` is `FALSE`. Much discussion has been had on this topic. Want to share your two cents? Join the [\[battery payload\] group on Tlon Messenger](https://join.tlon.io/0v1.thdiu.q9kem.a0gtu.438pi.544q5).

([Opcode 5](https://nock.is/content/specification/opcode-5.html) is closely related, as it tests whether one noun is equal to another.)

Opcode 3 is used for type discrimination (by structure before pattern matching) and for validating noun data shapes.

Join us tomorrow when we cover Nock 4, Increment.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
