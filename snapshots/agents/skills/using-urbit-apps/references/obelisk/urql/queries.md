---
title: Obelisk urQL Queries
app: "%obelisk"
reference_type: app-subtopic
app_metadata_reference: "../README.md"
related_references:
  - "README.md"
  - "syntax.md"
  - "scalars.md"
dependencies: []
---

# Queries — SELECT, joins, CTEs, predicates, set operations

## SELECT grammar

```
[ WITH [ <common-table-expression> [ ,...n ] ] ]
[ FROM <relation> [ <as-of> ] [ [AS] <alias> ]
    { { JOIN | LEFT JOIN | RIGHT JOIN | OUTER JOIN } <relation> [ <as-of> ] [ [AS] <alias> ] [ ON <predicate> ]
      | CROSS JOIN <relation> [ <as-of> ] [ [AS] <alias> ] } [ ...n ]
]
[ SCALARS { <name> <scalar-function> } [ ...n ] ]
[ WHERE <predicate> ]
[ GROUP BY { <qualified-column> | <column-alias> | <column-ordinal> } [ ,...n ] [ HAVING <predicate> ] ]
SELECT [ TOP <n> ]
  { * | { <table-or-alias>.* } | <scalar-node> [ AS <column-alias> ] } [ ,...n ]
[ { UNION | EXCEPT | INTERSECT | DIVIDED BY [ WITH REMAINDER ] } <query> ] [ ,...n ]
[ ORDER BY { <qualified-column> | <column-alias> | <column-ordinal> } { ASC | DESC } [ ,...n ] ]
```

- `SCALARS` appears **after the joins, before WHERE** (see [scalars.md](scalars.md)).
- Simplest query: `SELECT 0`. `SELECT` without `FROM` can use literals and scalar functions. Selecting from a single CTE alias with no `FROM` is also valid.
- `SELECT *` returns all columns; for production scripts list every column (an `ALTER TABLE` can otherwise silently change a `SELECT *` result).
- `<column-ordinal>` is 1-based.

### Implementation status

| Feature | Status |
|:--|:--|
| `JOIN` (natural, no ON) | supported |
| `JOIN ... ON` | supported |
| `CROSS JOIN` | supported |
| `LEFT`/`RIGHT`/`OUTER JOIN` | parsed, not executed |
| `GROUP BY`, `HAVING`, `ORDER BY`, `TOP` | parsed, not executed |
| aggregate functions | not implemented |
| `DIVIDED BY [ WITH REMAINDER ]` | parsed, not executed |
| `EQUIV`, `EXISTS` | parsed; pending outer joins |
| `ALL`, `ANY` | not implemented |

`TOP` requires `ORDER BY` with a total ordering. Avoid `ORDER BY` inside CTEs or before the last step of a set-operation query unless `TOP` requires it.

## Joins

Any number of tables/views/CTEs may be joined. Cross-database joins allowed; cross-ship joins not.

**Natural join** (`JOIN` with no `ON`): joins on every column the two relations share by **name and aura type** (need not be primary keys). Joining on the full primary key is indexed/fastest; a partial key (leading columns only — trailing-only subsets invalid) or non-key columns require a scan. If no column matches by name+aura, the natural join **crashes** (it never silently produces a cartesian product — use `CROSS JOIN` for that).

**`JOIN ... ON`**: the `ON` predicate may contain only column-equality conditions joined by `AND`. No other operators, no `OR`.

```
FROM adoptions A
JOIN vaccinations V ON A.name = V.name AND A.species = V.species
SELECT A.name, A.species, V.vaccine, V.vaccination-time;
```

**`CROSS JOIN`**: cartesian product, no predicate. Use with `WHERE` for any join condition that `ON` cannot express (inequalities, `OR`, expressions).

```
FROM adoptions A
CROSS JOIN vaccinations V
WHERE A.name = V.name
  AND A.species = V.species
  AND V.vaccination-time > A.adoption-date
SELECT A.name, A.species, V.vaccine, V.vaccination-time;
```

## WHERE / predicates

```
<predicate> ::=
  { [ NOT ] <predicate> | [ ( ] <simple-predicate> [ ) ] }
  [ { AND | OR } [ NOT ] <predicate> [ ...n ] ]

<simple-predicate> ::=
    expression <binary-op> expression
  | expression [ NOT ] EQUIV expression
  | expression [ NOT ] IN { <cte-column> | ( <value> ,...n ) }
  | expression [ NOT ] BETWEEN expression [ AND ] expression
  | [ NOT ] EXISTS { <column> | <cte-column> }
  | expression <inequality-op> { ALL | ANY } { ( <cte-column> ) | ( <value> ,...n ) }

<binary-op> ::= = | <> | != | > | >= | !> | < | <= | !< | EQUIV | NOT EQUIV
```

- **Column references in predicates must be unqualified names or the alias** assigned in `FROM`/`JOIN`. Raw table names and fully-qualified table names are **not** valid in predicates — assign an alias to disambiguate. `SCALARS` names and CTE columns are also valid.
- `OR` takes precedence over `AND`; use parentheses to override.
- `NOT` negates the following predicate.
- `BETWEEN` is inclusive on both ends; test, begin, and end must be the same type and end > begin.
- `IN` tests membership in a value list or a single-column CTE.
- A `<cte-column>` used with `=`/inequality requires the CTE to return exactly one row (singleton).
- `EQUIV`/`EXISTS` pending outer joins; `ALL`/`ANY` not implemented.

## Common table expressions (CTEs)

```
<common-table-expression> ::= ( <query> ) [ AS ] <name>
```

- `WITH` defines one or more CTEs, referenced by alias in `FROM`, `WHERE`, `SELECT`, `JOIN`, or by later CTEs (chaining). Always referenced by alias, never inlined.
- CTE bodies cannot contain their own `WITH`; earlier CTEs act as a virtual `WITH`.
- **Output column names within a CTE must be unique.** A join sharing a column name (e.g. `date`) must disambiguate with aliases (`T1.date AS cal-date, T2.date AS hol-date`). `SELECT *` on a joined CTE is valid only when all names are unique.
- A single-column CTE serves as a set for `WHERE col IN my-cte.col`, or as a singleton value with `=` when it returns exactly one row.
- CTEs may appear in `UPDATE`/`DELETE` `WHERE` predicates.

```
WITH (FROM adoptions
      WHERE species = 'Dog'
      SELECT name, adopter-email, adoption-fee) AS dog-adoptions,
     (FROM dog-adoptions
      WHERE adoption-fee > 75
      SELECT name, adopter-email) AS premium-dogs
FROM premium-dogs
SELECT *;
```

## Set operations

`UNION`, `EXCEPT`, `INTERSECT` combine complete queries, written between them, evaluated **left-to-right** (no precedence). `DIVIDED BY [ WITH REMAINDER ]` parses but does not execute.

- `UNION` — rows from either side.
- `EXCEPT` — left rows not present on the right. Empty right removes nothing; empty left → empty result.
- `INTERSECT` — rows on both sides. Either side empty → empty result.
- `UNION` with an empty side returns the non-empty side.

Results are true sets; equality is **exact** — output column names, column order, and auras all participate, not just raw values. So `SELECT name` vs `SELECT name AS animal-name` do not match.

Unlike SQL, operands need not return the same row type: `UNION` can hold distinct row shapes side by side; `EXCEPT`/`INTERSECT` only match complete vectors that are exactly equal.

If a set query contains `UNION`, **every operand `SELECT` must have unique output column names** (selecting a column twice, or two `AS` to the same name, crashes with `duplicate output column`). `EXCEPT`/`INTERSECT` alone do not impose this.

Set operations may appear in CTE bodies and in outer queries over CTEs. Reported source relations are the underlying real tables, not internal CTE names.

```
FROM animals
WHERE species = 'Dog'
SELECT name, species
UNION
FROM animals
WHERE species = 'Rabbit'
SELECT name, species
EXCEPT
FROM adoptions
SELECT name, species;
```

## Result shape

A `SELECT` returns rows as `(list vector)`; a `vector` is a non-empty list of `[p=@tas q=dime]` cells (column name/alias → `[aura atom]`), in `SELECT` column order. Full result molds and the per-source metadata sequence are in [system-views-and-api.md](system-views-and-api.md).
