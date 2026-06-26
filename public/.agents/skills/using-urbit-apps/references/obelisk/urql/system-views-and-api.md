---
title: "Obelisk System Views and API"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# System views, result molds, and the Hoon API

## System views

Read-only introspection. `sys.sys.databases` lives in database `sys`; all others live in the `sys` namespace of each user database (`db1.sys.tables`, or `sys.tables` when `sys`/the user db is the default).

| View | Description | Default order |
|:--|:--|:--|
| `sys.sys.databases` | all databases + schema/data state history (database `sys` only; the one non-idempotent query) | database, sys-tmsp, data-tmsp |
| `sys.namespaces` | namespaces in a database (`namespace @tas`, `tmsp @da`) | namespace |
| `sys.tables` | tables (`namespace`, `name`, `agent @ta`, `tmsp @da`, `row-count @ud`) | namespace, name |
| `sys.table-keys` | primary-key columns (`namespace`, `name`, `key-ordinal @ud`, `key @tas`, `key-ascending @f`) | namespace, name, key-ordinal |
| `sys.foreign-keys` | declared FKs, one row per ordered parent/child column pair | parent-namespace, parent-table, child-namespace, child-table, ordinal |
| `sys.columns` | columns (`namespace`, `name`, `col-ordinal @ud`, `col-name @tas`, `col-type @ta`) | namespace, name, col-ordinal |
| `sys.sys-log` | schema state-change history (incl. dropped tables) | component, database, namespace, relation, tmsp |
| `sys.data-log` | data state-change history (`tmsp`, `ship @p`, `agent`, `namespace`, `table`, `row-count`) | tmsp desc, namespace, table |
| `sys.view-cache` | view cache state — *not implemented* | — |

`sys.sys.databases` columns: `database @tas`, `sys-agent @ta`, `sys-tmsp @da`, `data-ship @p`, `data-agent @ta`, `data-tmsp @da`.

`sys.foreign-keys` columns: `parent-namespace`, `parent-table`, `child-namespace`, `child-table`, `ordinal @ud`, `parent-column @tas`, `child-column @tas`, `on-delete @tas` (`restrict`/`cascade`/`set-default`), `on-update @tas`. Schema only — no live referencing counts. Composite FKs produce multiple rows differing by `ordinal`.

`sys.sys-log` columns: `tmsp`, `agent`, `action @tas`, `component @tas`, `database`, `namespace`, `relation @tas`, `target-database`, `target-namespace`, `target-relation`, `message @t`. Rename-style events populate the `target-*` fields; e.g. `ALTER TABLE` logs `action=alter-table` with the rename targets or a `message` listing clause names.

```
FROM sys.columns WHERE name = 'my-table' SELECT col-name, col-type;
FROM sys.table-keys WHERE name = 'calendar' SELECT name AS Table-Name, key-ordinal, key;
```

## Result molds

Every command returns `cmd-result` (`sur/obelisk-ast.hoon`); one per command in a script.

```hoon
+$  cmd-result  [%results (list result)]
+$  result
  $%  [%action @t]              :: command/query executed
      [%relation @t]            :: source table/view used or affected
      [%message msg=@t]
      [%vector-count count=@ud] :: rows affected or returned
      [%server-time date=@da]   :: wall clock (now.bowl)
      [%security-time date=@da]
      [%schema-time date=@da]   :: schema (DDL) time of queried objects
      [%data-time date=@da]     :: data (DML) time of queried objects
      [%result-set (list vector)]
  ==
+$  vector-cell  [p=@tas q=dime]   :: column-name/alias → [aura atom]
+$  vector       [%vector (lest vector-cell)]
```

### SELECT result sequence

Simple query (single relation, no CTE/join):

```
[%action 'SELECT'] [%result-set ...] [%server-time] [%schema-time] [%data-time] [%vector-count]
```

Query with CTEs/joins — each real source table is emitted first (sorted by ship, database, namespace, name, then timestamps), then the SELECT block:

```
:: per source table (non-CTE, non-sys):
[%relation '<db>.<ns>.<table>'] [%schema-time] [%data-time]
:: then:
[%action 'SELECT'] [%result-set ...] [%server-time] [%vector-count]
```

Internal CTE tables (ship `~`, database `%cte`, namespace `%cte`) are skipped in the header output.

## Hoon API

Molds live in `/sur/obelisk-ast.hoon`; import with `/-  ast=obelisk-ast`. The canonical client is `templates/obelisk-template.hoon` (arms `call-obelisk`, `query-obelisk`, `parse-obelisk`, `query-result-set`, `poke-result-vectors`, `result-vectors`).

Poke mark is always `%obelisk-action`. Prefer sending urQL text and letting Obelisk parse — building command ASTs by hand is advanced and fragile.

```hoon
+$  action
  $%  [%tape default-database=@tas urql=tape]        :: parse + execute; results on /server
      [%tape-print default-database=@tas urql=tape]  :: same, also prints to dojo via lib/print.hoon
      [%commands cmds=(list command)]                :: pre-built AST, bypasses parser
      [%parse default-database=@tas urql=tape]        :: parse only, return (list command)
  ==
```

`default-database` qualifies unqualified table references in the script.

`%obelisk` does not support scrying — even `SELECT` may make silent caching mutations, so all access is via poke. Flow: watch `/server` on a unique wire → poke `%obelisk-action` → take one `%fact` → take `%kick` → decode the vase.

Responses are `each`-wrapped: success `[%.y payload]`, failure `[%.n =tang]` (crash trace / parser error). Decode with the expected mold:

```hoon
+$  poke-result   (each (list cmd-result:ast) tang)   :: %tape, %tape-print, %commands
+$  parse-result  (each (list command:ast) tang)      :: %parse
```

```hoon
++  call-obelisk
  |=  [id=@ta kind=?(%tape %parse) default=@tas query=tape]
  =/  m  (strand ,vase)
  ^-  form:m
  ;<  our=@p     bind:m  get-our
  =/  dock    [our %obelisk]
  =/  action  ;;(action:ast [kind default query])
  =/  cage    obelisk-action/!>(action)
  =/  wire=path  ?-(kind %tape /query/[id], %parse /parse/[id])
  ;<  ~                  bind:m  (watch wire dock /server)
  ;<  ~                  bind:m  (poke dock cage)
  ;<  [mark=@tas =vase]  bind:m  (take-fact wire)
  ;<  ~                  bind:m  (take-kick wire)
  (pure:m vase)
```

Then cast: `;;(poke-result +:response)` (or `parse-result`). To flatten just the rows, walk every `%result-set` across the script (`poke-result-vectors`/`result-vectors`), and read a named field by matching `p` in each `vector-cell` and returning `q`.

Use `%tape` for programmatic consumers, `%tape-print` for interactive debugging (prints first 10 + last row of large result sets; the `%fact` always carries the full list). A successful `%parse` returns one `command` per top-level urQL command in source order; parser errors are often terse — inspect the script closely.
