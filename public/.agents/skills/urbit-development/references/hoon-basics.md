---
title: "Hoon Basics"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Hoon Basics Reference

Concise syntax reference for core Hoon patterns and common operations.

## Rune Forms

### Tall vs Wide vs Irregular

```hoon
::  Tall form (multi-line, explicit)
%-  add
:-  2
3

::  Wide form (single-line, compact)
%-(add [2 3])

::  Irregular form (syntactic sugar)
(add 2 3)
```

**Gotcha**: Irregular forms are preferred for readability but compile identically.

### Brackets, Parentheses, and Tall Form

`[]` tuple syntax and `()` gate-call syntax are single-line irregular forms. When an expression contains tall-form runes, use tall form for the containing cell or call too.

```hoon
::  CORRECT: all on one line
=/  foo  [(heading i.selected name.i.selected) 42]

::  WRONG: [] cannot contain a multi-line tall-form expression
=/  foo  [(heading i.selected name.i.selected)
            (%-  selected-cte-dime  [i.selected named-ctes])]

::  CORRECT: use tall cell construction
=/  foo
  :-  (heading i.selected name.i.selected)
  %-  selected-cte-dime
  [i.selected named-ctes]
```

### Face Labels Cannot Directly Take Tall-Form Values

Face-label syntax like `name=value` is only safe when `value` is a regular single-expression form. Do not put a tall-form rune immediately after `=`.

```hoon
::  WRONG: face label directly before tall list syntax
:-  columns=~[col1 col2 col3]
    values=:~  [value-type=%t value='foo']
              [value-type=%tas value=%foo]
              ==

::  CORRECT: bind the tall list first
=/  vals
  :~  [value-type=%t value='foo']
      [value-type=%tas value=%foo]
      ==

:-  columns=~[col1 col2 col3]
    values=vals
```

## Core Data Types

### Atoms (unsigned integers with auras)

```hoon
42              ::  @ud (unsigned decimal)
0x2a            ::  @ux (hexadecimal)
~zod            ::  @p (ship name)
'Hello'         ::  @t (text/cord)
0b101010        ::  @ub (binary)
```

### Cells (ordered pairs)

```hoon
[1 2]           ::  Two-element cell
[1 2 3]         ::  Right-branching: [1 [2 3]]
[[1 2] [3 4]]   ::  Nested cells
```

## Gates (Functions)

### Basic Gate Syntax

```hoon
|=  a=@ud           ::  Gate with typed argument
(add a 10)

|=  [a=@ud b=@ud]   ::  Multiple arguments
(add a b)

|%                  ::  Core with multiple arms
++  increment
  |=  a=@ud
  (add a 1)
++  decrement
  |=  a=@ud
  (sub a 1)
--
```

## Conditional Logic

```hoon
?:  condition       ::  If-then-else (wutcol)
  true-branch
false-branch

?~  list            ::  If null/not-null (wutsig)
  null-case
not-null-case

?@  value           ::  If atom/cell (wutpat)
  atom-case
cell-case
```

### Single-Expression Branch Rule

Conditional runes such as `?:`, `?~`, and `?@` take exactly one Hoon expression for each branch. If a branch requires multiple statements, extract them into an arm or otherwise wrap them as one expression.

`~&` and `~|` hint runes fuse with their following rune, so a hinted expression still counts as one expression.

```hoon
::  CORRECT: one expression in the branch
?~  tbl  (from-cte qualified-table named-ctes)

::  CORRECT: hint fused with following expression
?~  tbl  ~|("not found" !!)

::  WRONG: multiple statements in one branch
?~  tbl
  =/  x  (some-gate ...)
  =/  y  i.x
  (another-gate y)
```

### Tall-Form `?+` and `?-` Must End With `==`

Tall-form switch runes open a clause block that must be closed with `==`. If the closing `==` is missing, the parser often reports the syntax error at the next arm or top-level form.

```hoon
?+  -.result  ;/("")
  %result-set
    (print-result-export-set +.result)
==
```

## Lists

```hoon
~[1 2 3 4]         ::  List literal
[1 2 3 4 ~]        ::  Manual construction (equivalent)
~                  ::  Empty list (null)

::  List operations
(lent list)        ::  Length
(snag 2 list)      ::  Index access (0-based)
(weld list1 list2) ::  Concatenate
(turn list gate)   ::  Map
(roll list gate)   ::  Reduce/fold
```

### List Head/Tail Access

`i.list` and `t.list` are only valid after the compiler knows the list is non-empty. Use `?~` to narrow the type before accessing head or tail.

```hoon
=/  items=(list @ud)  ~[1 2 3]

::  WRONG before narrowing: i.items or t.items

?~  items  ~
::  CORRECT after ?~: compiler knows items is non-empty
=/  first  i.items
=/  rest   t.items
```

## Common Idioms

### Type Casting

```hoon
`@ud`0x10          ::  Cast hex to decimal → 16
`@t`'string'       ::  Cast to cord
^-  @ud  value     ::  Regular syntax for casting (kethep)
```

### Pinning Values (=/  tisfas)

```hoon
=/  x  42          ::  Pin value to face
=/  y  (add x 10)  ::  Use pinned value
(mul x y)          ::  Both available in subject
```

### Bunting for Defaults

`*` produces the bunt, or default value, for a mold. This is a common way to initialize empty containers and typed zero values.

```hoon
=/  users  *(map @ud @t)
=/  count  *@ud
```

### Pattern Matching with Faces

```hoon
=/  cell  [1 2]
=/  [a=@ b=@]  cell    ::  Destructure into faces
(add a b)              ::  → 3
```

## Gotchas

1. **Null is `~`** not `0` or `false` or `nil`
2. **Lists are right-branching**: `~[1 2 3]` = `[1 [2 [3 ~]]]`
3. **Runes are two characters**: `=+` not `=`, `|-` not `|`
4. **Hoon has no strings**: Use `@t` (cord) or `tape` (list of @tD)
5. **Subject-oriented**: Everything operates on implicit context (the subject)
6. **Whitespace matters in tall form**: Two spaces for indentation
7. **No mutation**: All data structures are immutable
8. **Number formatting**: Numbers over 999 MUST use dots every 3 digits: `1.000` not `1000`, `844.494` not `844494`. Omitting dots causes a parser error (e.g. `{1 52}`) with no hint about number formatting. This is a common source of hard-to-diagnose errors.
9. **Backtick escaping from Python**: When generating Hoon from Python, backticks (`` ` ``) conflict with string formatting. Use `\x60` as the Python-safe way to emit a backtick character in generated Hoon code. In bash, single-quoted strings (`'...'`) pass backticks through safely with no escaping needed.
10. **Tall form cannot be nested inside irregular single-line containers**: switch the containing expression to tall form before embedding tall runes.
11. **List heads/tails require non-empty narrowing**: use `?~` or another type-narrowing form before `i.` or `t.`.

## Fast Lookups

### Arithmetic

```hoon
(add a b)    ::  Addition
(sub a b)    ::  Subtraction
(mul a b)    ::  Multiplication
(div a b)    ::  Division
(mod a b)    ::  Modulo
(pow a b)    ::  Exponentiation
```

### Boolean Logic

```hoon
&(a b)       ::  AND (pam)
|(a b)       ::  OR (bar)
!(a)         ::  NOT (zap)
=(a b)       ::  Equality test
```

### Common Runes

```hoon
|=  ::  Gate (function definition)
|-  ::  Trap Kick (create trap and immediately run)
?:  ::  If-then-else
=/  ::  Pin value to face
=<  ::  Compose with subject on right
=>  ::  Compose with subject on left
^-  ::  Type cast
%+  ::  Call gate with two arguments
%-  ::  Call gate with one argument
```

## Resources

- [Hoon Rune Reference](https://developers.urbit.org/reference/hoon/rune)
- [Hoon Standard Library](https://developers.urbit.org/reference/hoon/stdlib)
- [Type System Documentation](https://developers.urbit.org/reference/hoon/hoon-school/types)
