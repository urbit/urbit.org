+++
title = "Nockmas 2025: Day 4"
date = "2025-12-09"
description = "12 days of Nockmas: Cell Check, opcode 3"
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

([Opcode 5](opcode-5.ipynb) is closely related, as it tests whether one noun is equal to another.)

Opcode 3 is used for type discrimination (by structure before pattern matching) and for validating noun data shapes.
