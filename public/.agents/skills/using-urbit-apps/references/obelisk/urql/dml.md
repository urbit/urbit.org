---
title: "Obelisk urQL DML"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# DML — data manipulation

`INSERT`, `UPSERT`, `UPDATE`, `DELETE`, `TRUNCATE TABLE`. All take an optional `AS OF` ([time-travel.md](time-travel.md)). Data in the `sys` namespace cannot be mutated.

## INSERT / UPSERT

```
INSERT INTO <table> [ <as-of> ]
  [ ( <column> [ ,...n ] ) ]
  VALUES ( <value> [ ,...n ] ) [ ...n ]

UPSERT INTO <table> [ <as-of> ]
  [ ( <column> [ ,...n ] ) ]
  VALUES ( <value> [ ,...n ] ) [ ...n ]
```

- If the column list is omitted, values must be in the table's **canonical column order**. If present, it must list every column and sets the value order.
- **Value rows are NOT comma-separated** — each `( ... )` row stands alone, one after another.
- `DEFAULT` in place of a value uses the column aura's bunt value.
- Source auras must match target columns pairwise.
- `INSERT` rejects an existing primary key (`cannot add duplicate key`). `UPSERT` overwrites the existing row instead. If one `UPSERT` lists the same key twice, the last row wins.
- `INSERT ... <crud-txn>` (INSERT from SELECT) parses but is not yet executed; only literal `VALUES` run.

```
INSERT INTO my-table-1
  (col1, col2)
VALUES
  ('today', ~2024.9.26)
  ('tomorrow', ~2024.9.27);

UPSERT INTO my-table-2
VALUES
  ('today', ~2024.9.26, 4)
  ('next week', ~2024.10.3, 7);
```

## UPDATE

```
[ WITH [ <common-table-expression> [ ,...n ] ] ]
[ SCALARS { <name> <scalar-function> } [ ...n ] ]
UPDATE [ <ship-qualifier> ] <table> [ <as-of> ]
  SET { <column> = <scalar-node> } [ ,...n ]
  [ WHERE <predicate> ]
```

- `WHERE` is **optional** — omitting it updates every row.
- `SET` values are `<scalar-node>`s: literals, columns, scalar functions, or CTE columns. `DEFAULT` resets to the aura bunt value.
- `WITH` CTEs, `SCALARS`, and `AS OF` are supported. Note `SCALARS` precedes `UPDATE`.
- When no rows match, the message is `'no rows updated'` and no data-time is recorded.

```
UPDATE my-table-2 SET col3=99 WHERE col1 = 'today';
UPDATE my-table-2 SET col3=DEFAULT;   :: every row

WITH (FROM my-table-2 WHERE col4 = 'row3' SELECT col1, col3) AS my-cte
UPDATE my-table SET col1='updated'
WHERE my-cte.col1 = my-cte.col3;
```

## DELETE

```
[ WITH [ <common-table-expression> [ ,...n ] ] ]
[ SCALARS { <name> <scalar-function> } [ ...n ] ]
DELETE [ FROM ] <table> [ <as-of> ]
  WHERE <predicate>
```

- `DELETE` **requires** a `WHERE` predicate (unlike SQL). To clear a table use `TRUNCATE TABLE`.
- `WITH` CTEs, `SCALARS`, and `AS OF` supported; `SCALARS` precedes `DELETE`.
- `RAND` in the predicate makes the result non-deterministic.

```
DELETE FROM my-table-2 WHERE col1 = 'tomorrow';
```

## TRUNCATE TABLE

```
TRUNCATE TABLE [ <ship-qualifier> ] <table> [ <as-of> ]
```

- Clears the table directly. For referential integrity it behaves like `DELETE FROM <table>` with no `WHERE`: foreign-key `ON DELETE` actions still fire, so tables with related rows do work proportional to the affected FK relationships and rows.
- `sys`-namespace tables cannot be truncated.
