---
title: Obelisk urQL Syntax
app: "%obelisk"
reference_type: app-subtopic
app_metadata_reference: "../README.md"
related_references:
  - "README.md"
  - "ddl.md"
  - "dml.md"
  - "queries.md"
dependencies: []
---

# urQL core syntax

Cross-cutting rules. Command-specific syntax: [ddl.md](ddl.md), [dml.md](dml.md), [queries.md](queries.md), [scalars.md](scalars.md), [time-travel.md](time-travel.md).

## urQL vs SQL differences

- Clauses are written in evaluation order: `FROM .. WHERE .. SELECT ..`, not SELECT-first.
- All results are proper **sets** — no duplicate rows. No `DISTINCT` keyword (it is always implicit).
- **No nulls.** Table columns are non-nullable typed atoms. Outer joins (when implemented) produce jagged rows of varying length instead of nulls.
- Columns are typed by hoon **auras**; literals follow hoon aura rules, not SQL literal rules.
- **No inlined sub-queries.** Use CTEs (`WITH`) or joins; reference by alias.
- The keyword `INNER` does not exist; an inner join is just `JOIN`.
- `DELETE` requires a `WHERE` predicate (use `TRUNCATE TABLE` to clear a table).
- SQL "schema" is called **NAMESPACE**.
- Comments use `::` (line) and `/* */` (block), not `--`.
- Set operands need not share a row type (see [queries.md](queries.md)).

## Clause ordering

Queries (canonical full order; not all executed yet — see [queries.md](queries.md)):

```
WITH → FROM → JOIN/CROSS JOIN → SCALARS → WHERE
     → GROUP BY → HAVING → SELECT → [UNION|EXCEPT|INTERSECT <query>] → ORDER BY
```

`UPDATE`/`DELETE` put `SCALARS` **before** the verb, not after `FROM`:

```
[WITH ..] [SCALARS ..] UPDATE <table> [AS OF ..] SET .. [WHERE ..]
[WITH ..] [SCALARS ..] DELETE [FROM] <table> [AS OF ..] WHERE ..
```

## Object qualification

```
<db-qualifier>   ::= <database>.<namespace>. | <database>.. | <namespace>.
<ship-qualifier> ::= @p.<database>.<namespace>. | @p.<database>.. | <db-qualifier>
```

- `<database>` defaults to the Obelisk agent's current-database property (set per-script as the parser default database).
- `<namespace>` defaults to `dbo` (database owner).
- `database..object` → default namespace `dbo`. `namespace.object` → default database.
- System views: `sys.sys.databases` lives in database `sys`, namespace `sys`; all other system views live in the `sys` namespace of each user database (e.g. `sys.tables`, `db1.sys.columns`).
- Cross-database joins are allowed; cross-ship joins are not.

## Naming rules

- Object names (database, namespace, table, view, column, index) are hoon terms (`@tas`): lower-case alphanumeric and hyphen, must start with a letter.
- Aliases may be mixed case; evaluation is case-agnostic (`T1` ≡ `t1`). The system displays aliases lower-case. Title-case is encouraged for readability.
- Keywords are case-insensitive; ALL CAPS is strongly encouraged.
- User databases may not use the namespace `sys`.

## Literals

Literals follow hoon aura notation. Some auras accept relaxed forms in `INSERT`/`UPSERT` that `SELECT` does not.

| Aura | Description | INSERT/UPSERT | SELECT/predicate |
|:--|:--|:--|:--|
| @da | date | `~2020.12.25`, `2020.12.25`, `~2020.12.25..7.15.0..1ef5` | same, but `~` required |
| @dr | timespan | `~d71.h19.m26.s24`, `d71.h19` | `~`-prefixed only |
| @f | loobean | `y` `n` `Y` `N` (not `%.y`/`%.n`) | `Y` `N` |
| @if | IPv4 | `.195.198.143.90` | same |
| @is | IPv6 | `.0.0.0.0.0.1c.c3c6.8f5a` | same |
| @p | ship | `~sampel-palnet`, `sampel-palnet` | `~`-prefixed only |
| @rs | single float | `.3.14`, `.-3.14` | same |
| @rd | double float | `.~3.14`, `.~-3.14` | same |
| @sd | signed decimal | `--20`, `-20` | same |
| @sx/@sb/@sv/@sw | signed | `--0x2004.90fd` / `-0x2004.90fd` | same |
| @t | UTF-8 cord | `'text'`, `'it\\'s'` | same |
| @ub | unsigned binary | `10.1011` | same |
| @ud | unsigned decimal | `2.222` or `2222` | `2.222` |
| @ux | unsigned hex | `0x12.6401` | same |

- **Cords** use single quotes. Embed a single quote with double backslash: `'it\\'s'`.
- **@rd floats need the `.~` prefix**: `3.14` → `.~3.14`, `0.1` → `.~0.1`. Bare `.3.14` is `@rs`.
- `@c`, `@q`, `@rh`, `@rq`, `@uv`, `@ta`, `@tas` literals are unsupported/pending; insert via the API.
- `DEFAULT` keyword = the column aura's bunt (default) value (valid in `INSERT`/`UPSERT` values and `UPDATE ... SET`).

## Comments

```
:: line comment — comments out the remainder of the line (may start anywhere)
CREATE DATABASE db1; :: inline comment

/* block comment
   the /* and */ delimiters MUST be in columns 1 and 2
*/
```

## Whitespace

- All whitespace is equivalent (space or newline). Whitespace around `;` and `,` is optional.
- Whitespace is **required outside** parentheses, optional inside.
- A binary operator needs whitespace before its operand only when the left operand is a numeric literal (`5 > x`, not `5>x`).

## Scripts and atomicity

- Multiple commands separated by `;` form a **script**.
- Scripts are **atomic**: all commands succeed or the whole script fails (crash with trace).
- All commands in a script share one timestamp — they "happen at the same time" unless overridden by `AS OF`.
- Once a result-returning query appears in a script, every later command must also be a query (no further schema or data changes).
