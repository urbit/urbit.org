---
title: "Obelisk urQL Time Travel"
source_kind: "skill"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies: []
related_pages:
  - "/.agents/skills/index.md"
---

# Time travel (AS OF)

Every state change — schema or content — is indexed by time, which makes every query idempotent (re-runnable to the same result by pinning `AS OF`).

```
<as-of> ::=
  AS OF { NOW
        | <timestamp>            :: any @da
        | n { SECOND[S] | MINUTE[S] | HOUR[S] | DAY[S] | WEEK[S] | MONTH[S] | YEAR[S] } AGO
        | <as-of-offset>         :: any @dr timespan, back from NOW
        }
```

- Default is `NOW` (the agent's `now.bowl`). All commands in a script default to one shared `NOW`.
- Supported by almost every command. **Exceptions: `ALTER DATABASE` and `DROP DATABASE` take no `AS OF`.**

## Time-ordering rule

Each database tracks a latest schema time and a latest content time. Any new state change must be **after the later of the two**. A back-dated change (`AS OF` in the past) must still satisfy this against existing state, or the script fails atomically.

- `CREATE DATABASE` sets the first schema and content times.
- For DDL, `AS OF` back-dates (or future-dates) schema changes. New `NAMESPACE`/`TABLE` and `TRUNCATE TABLE` may be back-dated to any time after the latest schema/content time.
- `INSERT`, `UPDATE`, `DELETE` apply to content state `NOW` by default; `AS OF` applies them to a prior content state, **discarding subsequent content changes** for that table.

## Reading the past

In `FROM <relation> AS OF <time>`, `AS OF` selects which schema+data state of the table/view is queried. You need only a time ≥ the desired state and < any later state — not the exact timestamp. The `schema-time`/`data-time` returned with a query are the de-facto `AS OF` needed to reproduce it.

```
FROM db2..my-table-1 AS OF ~2024.10.3 SELECT *;
FROM sys.sys.databases AS OF ~2030.1.1 SELECT *;
```

## Future dating warning

`CREATE DATABASE`, `CREATE NAMESPACE`, `CREATE TABLE`, `ALTER TABLE`, and `TRUNCATE TABLE` can be future-dated. **This locks all schema and data updates in the database until that future time.**

`DROP DATABASE` is the only command that leaves no trace for time travel — the database is erased entirely.
