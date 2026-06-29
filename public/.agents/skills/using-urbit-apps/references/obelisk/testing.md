---
title: "Obelisk Testing"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Obelisk Test Reference

Write unit tests for obelisk database operations using the test-helpers library at `desk/lib/test-helpers.hoon`. Tests live in `desk/tests/lib/`.

## File structure

Every test file:
1. Imports test-helpers: `/+  *test-helpers`
2. Opens a core: `|%`
3. Optionally defines reusable data (table DDL, insert statements, expected row sets) as arms before the test arms
4. Each test arm is named `++  test-<feature>-<nn>` for success tests or `++  test-fail-<feature>-<nn>` for failure tests
5. Closes with `--`

Some test files define a local `bowl` and `state` in a door before `|%` (see `delete.hoon`). Most test files rely on the `bowl` and `state` from test-helpers directly.

## Test helper naming convention: `exec-<actions>-<resolves>`

The helper name encodes the test shape:

- **actions** = number of setup/mutation pokes *after* init (0, 1, 2, ... 9)
- **resolves** = number of verification pokes at the end (r, l, 1, 2, ... 6)

Resolve suffixes:
- `r` = single `cmd-result` comparison via `eval-results`
- `l` = single `(list cmd-result)` comparison via `expect-eq`
- `1`, `2`, ... `6` = that many `cmd-result` comparisons via `eval-results` (welded/zinged)
- `ls` = first resolve is `(list cmd-result)`, second is `cmd-result`
- `ll` = both resolves are `(list cmd-result)`

### Common helpers and when to use them

| Helper | Shape | Use case |
|--------|-------|----------|
| `exec-0-r` | init, compare cmd-result only | DDL-only tests (CREATE DATABASE, CREATE TABLE) |
| `exec-0-l` | init, compare (list cmd-result) | Multi-result init |
| `exec-0-1` | init + 1 resolve | Schema setup then query |
| `exec-0-02` | 2 resolves (no init poke) | Two independent queries |
| `exec-1-1` | init + 1 action + 1 resolve | Setup, mutate, verify |
| `exec-1-2` | init + 1 action + 2 resolves | Setup, mutate, verify two things |
| `exec-2-1` | init + 2 actions + 1 resolve | Setup, two mutations, verify |
| `exec-2-2` | init + 2 actions + 2 resolves | Setup, two mutations, two verifications |
| `exec-3-1` | init + 3 actions + 1 resolve | Three setup steps then verify |
| `exec-5-1` | init + 5 actions + 1 resolve | Complex multi-step setup |

### Failure helpers

| Helper | Shape | Use case |
|--------|-------|----------|
| `failon-0` | init should crash | Init poke expected to fail |
| `failon-1` | init + action that should crash | Setup then failing action |
| `failon-1c` | init + action (raw `action` type) crashes | Failing typed action poke |
| `failon-1cc` | init (raw action) + action (raw action) crashes | Both pokes use raw action type |
| `failon-c` | init + action (embedded `=action`) crashes | Variant with embedded action face |
| `failon-2` | init + 1 action + failing 2nd action | Two actions, second fails |
| `failon-2c` | init (raw) + 1 action (raw) + failing action (raw) | All raw action types |
| `failon-3` | init + 2 actions + failing 3rd action | Three actions, third fails |
| `failon-3c` | init + 2 actions + failing 3rd (raw action) | Mixed tape/raw |
| `failon-4` | init + 3 actions + failing 4th action | Four actions, fourth fails |

### Debug helpers

Replace `exec-` with `debug-` (e.g., `debug-0-1`, `debug-2-1`) to get crash output instead of comparison. These use `%test` mark and `expect-fail-message` with `'placeholder for debugging'`.

## Poke tuple format

Each poke (init, action, resolve) is a triple:

```hoon
[tmsp=@da db=@tas uql=tape]
```

- `tmsp`: timestamp for the bowl (simulates server time)
- `db`: database name (use `%sys` for system-level commands like CREATE DATABASE, `%db1` for database-scoped commands)
- `uql`: the urQL command string as a tape

For raw action pokes (in `failon-1c`, `failon-1cc`, `exec-0-0c2`, `exec-5-2xx`):

```hoon
[tmsp=@da cmds=action]
```

## Constructing expected results

### `cmd-result` structure

A `cmd-result` is a tagged union with `%results` head followed by a list of result entries:

```hoon
:-  %results
    :~  [%action 'SELECT']           :: or 'INSERT INTO db1.dbo.my-table', etc.
        [%result-set <list of vectors>]    :: only for SELECT results
        [%server-time ~2012.5.3]
        [%relation 'db1.dbo.my-table']      :: source table(s)
        [%schema-time ~2012.5.1]
        [%data-time ~2012.5.2]
        [%vector-count 3]
        ==
```

For JOINed queries, each source table gets its own message/schema-time/data-time block:

```hoon
[%relation 'db1.dbo.calendar']
[%schema-time ~2012.4.30]
[%data-time ~2012.4.30]
[%relation 'db1.dbo.holiday-calendar']
[%schema-time ~2012.4.30]
[%data-time ~2012.4.30]
```

### Result vectors

Each row is a `%vector` containing a list of `[column-name [aura value]]` cells:

```hoon
:-  %vector
    :~  [%col1 [~.t 'cord']]
        [%col2 [~.p ~nomryg-nilref]]
        [%col3 [~.ud 20]]
        [%col4 [~.da ~2010.6.1]]
        ==
```

Aura tags use `~.` prefix: `~.t` for `@t`, `~.da` for `@da`, `~.p` for `@p`, `~.ud` for `@ud`, etc.

Default values when not explicitly set: `@da` defaults to `~2000.1.1`, `@t` defaults to `'Default'`, `@p` defaults to `~zod`, `@ud` defaults to `0`.

### INSERT result pattern

INSERT results do not contain a `%result-set`. Instead:

```hoon
:-  %results
    :~  [%action 'INSERT INTO db1.dbo.my-table']
        [%server-time ~2012.5.3]
        [%schema-time ~2012.5.1]
        [%data-time ~2012.5.1]
        [%message 'inserted:']
        [%vector-count 2]
        [%message 'table data:']
        [%vector-count 2]
        ==
```

### Failure result pattern

For `failon-*` helpers, the `expect` argument is a `@t` cord with the expected error message:

```hoon
%-  crip  "%date is duplicate column name in "
          "common table expression %my-cte"
```

Or simply:

```hoon
'expected error message'
```

## Complete test examples

### Simple query test (exec-0-1: init then resolve)

```hoon
++  test-cte-00
  =|  run=@ud
  %-  exec-0-1
        :*  run
            :+  ~2012.4.30
                %db1
                %-  zing  :~  "CREATE DATABASE db1;"
                              create-table
                              insert-table
                              ==
            ::
            :+  ~2012.5.3
                %db1
                "FROM my-table SELECT *"
            ::
            :-  %results  :~  [%action 'SELECT']
                              [%result-set expected-rows]
                              [%server-time ~2012.5.3]
                              [%relation 'db1.dbo.my-table']
                              [%schema-time ~2012.4.30]
                              [%data-time ~2012.4.30]
                              [%vector-count 7]
                              ==
            ==
```

### Insert + verify test (exec-1-2: init + action + 2 resolves)

```hoon
++  test-insert-01
  =|  run=@ud
  %-  exec-1-2
  :*  run
      [~2012.4.30 %sys "CREATE DATABASE db1"]
      ::
      :+  ~2012.5.1
          %db1
          "CREATE TABLE db1..my-table ".
          "(col1 @t, col2 @p, col3 @ud) ".
          "PRIMARY KEY (col1)"
      ::
      :+  ~2012.5.3
          %db1
          "INSERT INTO db1..my-table (col1, col2, col3)  ".
          "VALUES ('cord',~nomryg-nilref,20) ('Default',Default, 0)"
      ::
      [~2012.5.4 %db1 "FROM my-table SELECT *"]
      ::
      :-  %results  :: expect-1 (INSERT result)
          :~  [%action 'INSERT INTO db1.dbo.my-table']
              [%server-time ~2012.5.3]
              [%schema-time ~2012.5.1]
              [%data-time ~2012.5.1]
              [%message 'inserted:']
              [%vector-count 2]
              [%message 'table data:']
              [%vector-count 2]
              ==
      ::
      :-  %results  :: expect-2 (SELECT result)
          :~  [%action 'SELECT']
              [%result-set expected-2-rows]
              [%server-time ~2012.5.4]
              [%relation 'db1.dbo.my-table']
              [%schema-time ~2012.5.1]
              [%data-time ~2012.5.3]
              [%vector-count 2]
              ==
      ==
```

### Failure test (failon-1: init + failing action)

```hoon
++  test-fail-cte-00
  =|  run=@ud
  %-  failon-1  :*  run
                    :+  ~2012.4.30
                        %db1
                        %-  zing  :~  "CREATE DATABASE db1;"
                                create-calendar
                                insert-calendar
                                ==
                    ::
                    :+  ~2012.5.5
                        %db1
                        "FROM bad-table SELECT *"
                    ::
                    'expected error message'
                    ==
```

## Combining multiple urQL statements in init

Use `zing` to concatenate multiple urQL statements (each ending with `;`) into a single tape for the init poke:

```hoon
:+  ~2012.4.30
    %db1
    %-  zing  :~  "CREATE DATABASE db1;"
                  create-table
                  insert-table
                  ==
```

## Reusable DDL/DML arms

Define reusable DDL and DML as tape arms at the top of the test file:

```hoon
++  create-table   "CREATE TABLE db1..my-table ".
                   "(col0 @da, col1 @t, col2 @p) ".
                   "PRIMARY KEY (col0, col2);"
::
++  insert-table   "INSERT INTO db1..my-table (col0, col1, col2) ".
                   "VALUES (~2010.5.3, 'cord', ~nomryg-nilref);"
```

Note: DDL/DML arms that will be `zing`ed into an init must end with `;` followed by a space or be followed by statements that do.

## Timestamp conventions

- Init timestamps typically start at `~2012.4.30`
- Subsequent action timestamps increment: `~2012.5.1`, `~2012.5.2`, `~2012.5.3`, etc.
- The `schema-time` in expected results matches when the schema was created
- The `data-time` matches when data was last modified
- The `server-time` matches the resolve poke's timestamp
