---
title: Obelisk urQL Scalars
app: "%obelisk"
reference_type: app-subtopic
app_metadata_reference: "../README.md"
related_references:
  - "README.md"
  - "syntax.md"
  - "queries.md"
dependencies: []
---

# Scalar functions

Named computed expressions in the optional `SCALARS` clause (after `FROM`/joins, before `WHERE` in a query; before the verb in `UPDATE`/`DELETE`). Reference scalar names in `SELECT` and `WHERE`; later scalars may reference earlier ones.

```
SCALARS { <name> <scalar-function> } [ ...n ]

<scalar-node> ::= <scalar-function> | <qualified-column> | <unqualified-column> | <cte-column> | <literal>
```

A `<cte-column>` operand requires the CTE to have returned exactly one row.

```
FROM adoptions A
SCALARS full-label CONCAT(name, ' (', species, ')')
        fee-tier IF adoption-fee > 75 THEN 'premium' ELSE 'standard' ENDIF
SELECT name, species, adoption-date, full-label, fee-tier;
```

## Control flow

```
IF <predicate> THEN <scalar-node> ELSE <scalar-node> ENDIF
CASE [ <scalar-node> ] WHEN { <scalar-node> | <predicate> } THEN <scalar-node> [ ...n ] [ ELSE <scalar-node> ] END
COALESCE ( <scalar-node> [ ,...n ] )
```

- `IF` — `ELSE` is required; `THEN`/`ELSE` must be the same type.
- `CASE` — **simple form** with a leading expression compares it to each `WHEN` value; **searched form** omits it and evaluates each `WHEN` as a predicate. First match wins. `ELSE` optional; with no match and no `ELSE` the query crashes. All `THEN`/`ELSE` must share a type.
- `COALESCE` — first existing argument. Useless until outer joins exist (no nulls otherwise).

## Arithmetic

```
<arithmetic-op> ::= + | - | * | / | % | ^
```

- Operands are `@ud`, `@sd`, or `@rd`; both sides same type, result same type. `%` (modulo) does **not** accept `@rd`.
- An arithmetic scalar must **terminate with `END`**: `col1 + col2 * 3 END`.
- Whitespace required before each operand: `1+ 1` or `1 + 1`, never `1+1`.
- Precedence: `^` (highest), then `*` `/` `%`, then `+` `-`. `^` is right-associative; the rest left-associative. Parentheses override.
- Only mathematical functions and constants (below) may appear inside arithmetic — not string functions.

```
2 + 3 * 4 END            :: 14
2 ^ 3 ^ 2 END            :: 512 (right-assoc)
(ABS(--3) + FLOOR(.~2.9)) * SQRT(16) END
```

## DateTime

`GETUTCDATE()` · `YEAR(t)` · `MONTH(t)` · `DAY(t)` · `HOUR(t)` · `MINUTE(t)` · `SECOND(t)` · `ADD-TIME(t, dr)` · `SUBTRACT-TIME(t, dr)`

- `t` is `@da` or `@dr`. For a `@dr`, the component functions return whole units (`HOUR(~d1h3)` → 27). `YEAR`/`MONTH` apply to `@da`.
- `ADD-TIME`/`SUBTRACT-TIME` take a date-or-duration plus a `@dr`; result type matches the first arg.

## Mathematical

`ABS` · `LOG` (natural; crashes ≤0) · `FLOOR` · `CEILING` · `ROUND(value, length)` · `SIGN` · `SQRT` (crashes <0) · `MAX(a,b)` · `MIN(a,b)` · `RAND(low,high)` · `DEGREES` · `SIN` · `COS` · `TAN` · `ASIN` · `ACOS` · `ATAN` · `ATAN2(y,x)`

- All accept `@ud`/`@sd`/`@rd`; two-arg functions need matching types. Result type generally matches input (`LOG`/`ATAN2` return `@rd`).
- `ROUND` length: positive rounds to that many decimals; negative (`@sd` only) rounds to `10^|length|`; round-half-up toward +inf.
- `RAND(low, high)` is inclusive both ends; **the only non-deterministic `SELECT`** — emits `warning: results are non-deterministic`.

Constants (`@rd`, usable in arithmetic): `PI`, `TAU`, `E`, `PHI`.

## String

`LEN` · `LEFT(s,n)` · `RIGHT(s,n)` · `SUBSTRING(s, start [, len])` (1-based) · `LOWER` · `UPPER` · `LTRIM(s [,pat])` · `RTRIM(s [,pat])` · `TRIM(s [,pat])` · `CONCAT(s [,...n])` · `REPLACE(s, pat, repl)` · `REPLICATE(s, n)` · `REVERSE(s)` · `STRING(num)` · `STRING-CONCAT(s [,...n], delim)` · `PATINDEX(s, pat)` (1-based, 0 if absent) · `QUOTESTRING(s [, open, close])` (default `[ ]`) · `STUFF(s, start, del-count, repl)` (1-based)

- String args/returns are `@t`. `STRING` converts a number to `@t`; `LEN`/`PATINDEX` return `@ud`.
- `STRING-CONCAT`'s **last** argument is the delimiter.
