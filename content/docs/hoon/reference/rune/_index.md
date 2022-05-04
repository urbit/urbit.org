+++
title = "Runes"
weight = 20
sort_by = "weight"
template = "sections/docs/chapters.html"
aliases = ["docs/reference/hoon-expressions/rune/"]
insert_anchor_links = "right"
+++

Runes are a way to form expressions in Hoon.

## Non-Rune Expressions

### [Constants](/docs/hoon/reference/rune/constants)

Hoon uses runes to form expressions, but not all expressions have runes in them. First, we have constant expressions (and also expressions that would be constant, but that they allow for interpolations).

### [Limbs and Wings](/docs/hoon/reference/limbs/)

Limb and wing expressions also lack runes.

## Runes Proper

### [`. dot` (Nock)](/docs/hoon/reference/rune/dot)

Runes used for carrying out Nock operations in Hoon.

### [`! zap` (wild)](/docs/hoon/reference/rune/zap)

Wildcard category. Expressions that don't fit anywhere else go here.

### [`= tis` (Subject Modification)](/docs/hoon/reference/rune/tis)

Runes used to modify the subject.

### [`? wut` (Conditionals)](/docs/hoon/reference/rune/wut)

Runes used for branching on conditionals.

### [`| bar` (Cores)](/docs/hoon/reference/rune/bar)

Runes used to produce cores.

### [`+ lus` (Arms)](/docs/hoon/reference/rune/lus)

Runes used to define arms in a core.

### [`: col` (Cells)](/docs/hoon/reference/rune/col)

Runes used to produce cells, which are pairs of nouns.

### [`% cen` (Calls)](/docs/hoon/reference/rune/cen)

Runes used for making function calls in Hoon.

### [`^ ket` (Casts)](/docs/hoon/reference/rune/ket)

Runes that let us adjust types without violating type constraints.

### [`$ buc` (Structures)](/docs/hoon/reference/rune/buc)

Runes used for defining custom types.

### [`; mic` (Make)](/docs/hoon/reference/rune/mic)

Miscellaneous useful macros.

### [`~ sig` (Hints)](/docs/hoon/reference/rune/sig)

Runes that use Nock `11` to pass non-semantic info to the interpreter.

### [`/ fas` (Imports)](/docs/hoon/reference/rune/fas)

Ford runes which import files.

### [`--`, `==` (Terminators)](/docs/hoon/reference/rune/terminators)

Runes used to terminate expressions.
