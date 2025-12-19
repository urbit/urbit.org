+++
title = "Nockmas 2025: Day 0"
date = "2025-12-09"
description = "12 days of Nockmas: Autocons, welcome to Nock"
# aliases = []

[extra]
# author = ""
ship = "~mopfel-winrux"
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Social+16x9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Building+on+Urbit_Tall+Banner.png"
# imageDark =
# imageCardDark =
# imageIndexDark =
tags =  ["nock", "nockmas", "autocons"]
+++


Welcome to Nockmas! Over the next 12 days, we'll explore the beautiful simplicity of Nock, Urbit's foundation layer, and it's 12 opcodes. Each day will cover an opcode, `0` through `11`. 

We begin with autocons—the most fundamental rule of Nock evaluation:

## Syntax
```nock
*[a [b c] d]        [*[a b c] *[a d]]
```

## Explanation
Autocons is not an opcode (and thus appears as day 0 of Nockmas). It's the very first rule Nock checks when evaluating a formula. The rule is simple: **when your formula is a cell, Nock builds a cell**.

Think of it this way: if you want to create a cell in the result, you write a cell in the formula. The structure of your formula becomes the structure of your result.

Here's what happens: when Nock sees `*[a [b c] d]`, it evaluates both parts of the formula cell separately against the same subject `a`, then constructs a cell from the results: `[*[a b c] *[a d]]`.

## Examples

Let's start simple. In Nock, we use `[1 b]` to return a constant value `b` (we'll see this opcode in detail on Day 2). 

```nock
:subject 42
```

**Output:**
```
Subject set to: 42
```

Now, what if we want to return not one value, but two? We write a cell in the formula:

```nock
[[1 10] [1 20]]
```

**Output:**
```
[10 20]
```

Autocons does the work: it evaluates `[1 10]` (which gives `10`) and `[1 20]` (which gives `20`), then builds a cell `[10 20]`.

We can build three-element lists the same way:

```nock
[[1 1] [1 2] [1 3]]
```

**Output:**
```
[1 2 3]
```

Remember that `[a b c]` is shorthand for `[a [b c]]`, so this is really `[[1 1] [[1 2] [1 3]]]`. Autocons applies recursively to build the nested structure.

## Why This Matters

Autocons is why Nock is so small. In most languages, you need a special operation to construct pairs or lists—something like `cons` in Lisp or `tuple` in Python. 

In Nock, cell construction is free. You just write the structure you want. Want a cell? Write a cell in your formula. Want a nested cell? Write nested cells. The formula structure is the data structure.

This is Nock's first lesson: **form follows function, and function follows form**.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
