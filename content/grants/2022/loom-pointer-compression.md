+++
title = "Loom Pointer Compression" 
date = "2022-08-11"

[taxonomies]
grant_type = [ "Apprenticeship" ]
grant_category = [ "Core Dev", "Runtime" ]

[extra]
image = ""
description = "Expand the maximum addressable loom size"
reward = "1 star"
mentor = ["~fanfun-mocbud"]
assignee = ["~barter-simsum"]
grant_id = "A0173"
completed = true
canceled = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=A0173&prefill_Grant+Name=Loom%20Pointer%20Compression"
+++

# Loom Pointer Compression Apprenticeship

This project makes it possible to at least double the maximum addressable loom space, which is constrained by the number of bits in a loom offset (`u3_post`).

U3 uses 32-bit noun references, and 2 of those bits are used for type tags (in the case of indirect references to loom allocations). The remaining bits are availabe for use as word-aligned (4-byte) offsets/indexes into the memory of the loom, and all allocations are sized and aligned in terms of words.

Increasing the alignment boundaries of loom allocations to some larger power-of-two (call it `X`) lets us effectively use additional bits (`log2(X)` to be precise) in our loom offsets -- since those bits will always be zero, we can shift them off and don't need to store them inside our 32-bit references. Each additional bit doubles the size of the addressable space; in this way, we can grow the loom without switching from 32-bit to 64-bit references (which should also be done, but is a larger project subject to other constraints). This "pointer compression" trick is used to great effect by the JVM.

Switching to 8-byte (2-word) alignment buys us one additional bit, and since our minimum allocation (the size of a cell) is 6 words, it does so without imposing costly padding. Higher levels of alignment should be considered, but may not be worthwhile outside of specialized use-cases, as they will involve padding of all cell allocations (barring more dramatic changes to the memory layout of nouns).

## Deliverables

- an updated allocator (`u3a_walloc()` and friends) that ensures at least 8-byte (2-word) alignment for all loom allocations
- an updated de/reference api that compresses pointer-to-offset (`u3a_outa()`) and decompresses offset-to-pointer (`u3a_into()`)
- a migration from the old to new heap layout (`u3m_pack()`, but capable of reordering the heap to adjust minimum allocation alignment)

## User Stories

- moar nouns

## Prequisites

- proficiency in C
- familiarity with custom allocators, bit-twiddling, &c

## Educational Outcomes for the Apprentice

The apprentice will learn about:

- vere/u3
- the loom and road system
- our allocator

## Responsibilities of the Mentor

- technical direction
- code review
- release plan

## Duration and Compensation

Expected duration is two months. Compensation is 1 star upon successful completion of the apprenticeship.
