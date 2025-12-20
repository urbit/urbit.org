+++
title = "Nockmas 2025: Day 11"
date = "2026-01-04"
description = "12 days of Nockmas: Edit, opcode 10"
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

On this eleventh day of Nockmas, discuss opcode 10, Edit, one of the later additions to the Nock ISA.

# Opcode 10: Edit

## Syntax

Opcode 10 implements the axiomatic `#` hax edit operator, which replaces a noun at a given address within a noun with a new noun evaluated against the same subject.

```nock
#[1 a b]            a
#[(a + a) b c]      #[a [b /[(a + a + 1) c]] c]
#[(a + a + 1) b c]  #[a [/[(a + a) c] b] c]
#a                  #a

*[a 10 [b c] d]     #[b *[a c] *[a d]]
```

## Explanation

Opcode 10 takes four arguments: a subject `a`, an address `b`, a replacement expression `c`, and a target structure `d`.

1. `b` is the target address (atom).
2. Evaluate `c` against subject to produce the replacement value.
3. Evaluate `d` against subject to produce the target structure.
4. Return the target with address `b` replaced by replacement.

Opcode 10 is important for 'gate calls' (aka function calls), which require looking up a stored procedure noun, modifying its arguments at a fixed address, and then evaluating the modified noun.

Opcode 10 was implemented relatively late in Nock's development (Nock 4K) as an expedient for the Vere runtime's memory management.  Many cells were being produced in memory, and the edit operator allowed for in-place modification of these cells without requiring the allocation of new memory.

As `~fodwyt-ragful`, one of the chief architects of this change, explained,

> "It carries the intent better than the equivalent autocons, which can (and does, in Vere’s case) carry into implementation. Vere’s edit operation checks if the target of the edit is 1) \[in the current memory arena] and 2) has a [refcount](https://en.wikipedia.org/wiki/Reference_counting) of 1, and if so it does the edit in-place – meaning, it mutates the memory rather than consing up a new object."


To explore Nock 10, let's take the following subject:
```nock
:subject [[42 43] [45 46]]
```

**Output:**
```
Subject set to: [[42 43] 45 46]
```

And then make an edit to the subject:
```nock
[10 [2 1 47 48] 0 1]
```

**Output:**
```
[[47 48] 45 46]
```


For a more in depth discussion of opcode 10, read [“Deriving Nock Opcodes 6–11”, section “Explaining Opcode 10”](https://urbitsystems.tech/ustj/v02-i01/mss1.html#x1-180007) by `~niblyx-malnus` in [USTJ](https://urbitsystems.tech) volume 2, issue 1.

And of course, you are invited to join us tomorrow where we will cover our last opcode: Nock 11, Hint.

> *12 Days of Nockmas is an exploration of Nock, Urbit's instruction set architecture. This ISA is used by both Urbit and Nockchain, [has interpreters written in many languages](https://docs.urbit.org/nock/implementations), with production versions in both C and Rust. The content of this series is drawn from the [Nock language site](https://nock.is/). Visit the site for interactive code examples and more Nock related content.*
