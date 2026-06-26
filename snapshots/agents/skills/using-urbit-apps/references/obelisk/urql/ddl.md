---
title: Obelisk urQL DDL
app: "%obelisk"
reference_type: app-subtopic
app_metadata_reference: "../README.md"
related_references:
  - "README.md"
  - "syntax.md"
  - "queries.md"
dependencies: []
---

# DDL — schema commands

Implemented: `CREATE/ALTER/DROP DATABASE`, `CREATE/ALTER/DROP NAMESPACE`, `CREATE/ALTER/DROP TABLE`.
Parsed but **not yet executed**: `CREATE/ALTER/DROP INDEX`, `CREATE/DROP VIEW`.

All DDL takes an optional trailing `AS OF` clause ([time-travel.md](time-travel.md)). `FORCE` is required to drop populated objects.

## Database

```
CREATE DATABASE <database> [ <as-of> ]
ALTER DATABASE <database> RENAME TO <new-database>
DROP DATABASE [ FORCE ] <database>
```

- Creating the first user database also creates the `sys` database.
- `sys` cannot be renamed or dropped; rename target must not already exist.
- `ALTER DATABASE` records in `sys.sys-log` and updates `sys.sys.databases`; it cannot appear after a query in a script.
- `DROP DATABASE` is **permanent and leaves no trace for time travel**. Without `FORCE` it succeeds only when no populated tables exist (a database with only future-dated content drops without `FORCE`).
- `ALTER DATABASE` and `DROP DATABASE` do **not** take `AS OF`.

## Namespace

```
CREATE NAMESPACE [ <database>. ] <namespace> [ <as-of> ]

ALTER NAMESPACE [ <database>. ] <namespace>
  TRANSFER TABLE [ <db-qualifier> ] <table> [ <as-of> ]

DROP NAMESPACE [ FORCE ] [ <database>. ] <namespace> [ <as-of> ]
```

- Default namespace is `dbo`. `sys` is reserved.
- `ALTER NAMESPACE ... TRANSFER TABLE` moves a table to another namespace (not a rename — use `ALTER TABLE RENAME TO`). The target may be in another database, **except** a table participating in a foreign key may only move within its own database. Cannot transfer into/out of database `sys` or namespace `sys`.
- `DROP NAMESPACE` without `FORCE` requires all tables empty and no orphaned foreign keys; `dbo` and `sys` cannot be dropped. Dropped tables remain readable via `AS OF` before the drop.

## Table

```
CREATE TABLE [ <db-qualifier> ] <table>
  ( <column> <aura> [ ,...n ] )
  PRIMARY KEY ( <column> [ ASC | DESC ] [ ,...n ] )
  [ FOREIGN KEY ( <column> [ ,...n ] )
      REFERENCES [ <namespace>. ] <table> ( <column> [ ,...n ] )
      [ ON DELETE { RESTRICT | CASCADE | SET DEFAULT } ]
      [ ON UPDATE { RESTRICT | CASCADE | SET DEFAULT } ]
    [ ,...n ] ]
  [ <as-of> ]

DROP TABLE [ FORCE ] [ <db-qualifier> ] <table> [ <as-of> ]
```

- Columns are `name <aura>` pairs. Exactly one `PRIMARY KEY`; key columns default to `ASC`.
- `DROP TABLE` needs `FORCE` when the table is populated, referenced by a view, or used in a foreign key; `FORCE` cascades the dependent drops.

### ALTER TABLE

```
ALTER TABLE [ <db-qualifier> ] <table>
  [ RENAME TO <table> ]
  [ COLUMNS ( <column> [ ,...n ] ) ]
  [ PRIMARY KEY ( <column> [ ASC | DESC ] [ ,...n ] ) ]
  [ ADD COLUMN ( { <column> <aura> } [ ,...n ] ) ]
  [ DROP COLUMN ( <column> [ ,...n ] ) ]
  [ RENAME COLUMN ( { <column> TO <column> } [ ,...n ] ) ]
  [ ALTER COLUMN ( { <column> <aura> } [ ,...n ] ) ]
  [ ADD FOREIGN KEY ( <column> [ ,...n ] )
      REFERENCES [ <namespace>. ] <table> ( <column> [ ,...n ] )
      [ ON DELETE { RESTRICT | CASCADE | SET DEFAULT } ]
      [ ON UPDATE { RESTRICT | CASCADE | SET DEFAULT } ] ]
  [ DROP FOREIGN KEY ( <column> [ ,...n ] ) [ <namespace>. ] <table> ]
  [ <as-of> ]
```

- At least one clause required. Clauses combine to produce a new schema version; `AS OF` reads still see the prior schema and data.
- `COLUMNS` sets canonical order **after** ADD/DROP/RENAME apply; it must include every still-existing column and must actually change the existing order (no-op reorder fails). If omitted, added columns append and renamed columns keep their positions.
- Added columns populate existing rows with each aura's bunt value.
- New `PRIMARY KEY` must reference existing columns, change the existing key, and be unique over existing data.
- Duplicate names within any clause fail.

## Foreign keys / referential integrity

Foreign keys are runtime-enforced on `INSERT`, `UPSERT`, `UPDATE`, `DELETE`, and `TRUNCATE TABLE`, at the mutation's effective content time (including under `AS OF`).

- Source columns must match the parent table's **complete** `PRIMARY KEY`, in key order; partial or non-PK references are invalid. Auras must match pairwise.
- Referenced table must be in the same database. Foreign keys are unnamed — identified by ordered source columns + referenced table.
- Default action is `RESTRICT` for both `ON DELETE`/`ON UPDATE`.
  - `RESTRICT` — reject the parent change while child rows reference the key.
  - `CASCADE` — propagate parent key delete/update to child rows.
  - `SET DEFAULT` — set child key columns to their aura bunt values; the parent must contain that bunt key.
- `ON UPDATE` fires only when the parent's **primary-key** columns change.
- A column participating in a foreign key cannot be dropped or aura-altered; renaming it is allowed (Obelisk rewrites the FK metadata). Changing a parent's primary key requires dropping referencing FKs first.
- Self-referential FKs are allowed; cyclic FK dependencies are allowed only when every action in the cycle is `RESTRICT`.
- Multi-row `INSERT` into a self-referential table sees all rows of the statement when checking.

```
CREATE TABLE parent (id @ud, label @t) PRIMARY KEY (id);
CREATE TABLE child
  (id @ud, parent-id @ud, note @t)
  PRIMARY KEY (id)
  FOREIGN KEY (parent-id) REFERENCES parent (id)
  ON DELETE CASCADE;
```

Composite FK (matching parent key order):

```
CREATE TABLE child
  (id @ud, parent-tenant @ud, parent-code @ud)
  PRIMARY KEY (id)
  FOREIGN KEY (parent-tenant, parent-code)
    REFERENCES parent (tenant-id, code);
```

Inspect declared foreign keys with `sys.foreign-keys` ([system-views-and-api.md](system-views-and-api.md)).
