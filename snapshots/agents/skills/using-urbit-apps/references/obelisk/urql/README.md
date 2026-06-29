---
title: Obelisk urQL
app: "%obelisk"
reference_type: app-subtopic
app_metadata_reference: "../README.md"
related_references:
  - "../README.md"
  - "examples.md"
  - "../testing.md"
dependencies: []
---

# Obelisk urQL Reference

Master urql's differences from standard sql syntax and expected results.

## syntax overview

urQL is derived from SQL with significant variations that enhance readability, promote composability, and are consistent with set and relational theory.

## clause ordering

urQL syntax requires clauses in the internal evaluation order, not SQL's SELECT-first order:

1. FROM clause (with JOINs)
2. WHERE clause
3. GROUP BY clause
4. HAVING clause
5. SCALARS clause
6. SELECT clause
7. ORDER BY clause

## object qualification

Objects are qualified by database and namespace using dot notation:

```
<db-qualifier> ::=
  { <database>.<namespace>.
  | <database>..
  | <namespace>. }
```

- `<database>` defaults to the current-database property of the Obelisk agent
- `<namespace>` defaults to `dbo` (database owner)
- double dot `database..object` means "use default namespace dbo"
- single dot `namespace.object` means "use default database"
- the SQL "schema" concept is called NAMESPACE in urQL

## naming rules

- object names (databases, namespaces, tables, views, columns) follow hoon term rules: type @tas, lower-case alphanumeric and hyphens, must start alphabetic
- aliases may be mixed case (title case encouraged for readability), evaluation is case agnostic (T1 and t1 are the same alias)
- the keyword "inner" does not exist; inner joins are designated simply as JOIN

## literals

Literals are hoon data literals following aura rules. Key supported types:

| Aura | Description | Example |
|:-----|:------------|:--------|
| @da  | date | ~2024.10.27, 2024.10.27 |
| @dr  | timespan | ~d71.h19.m26.s24 |
| @f   | loobean | Y, N (not %.y %.n) |
| @if  | IPv4 address | .195.198.143.90 |
| @p   | ship name | ~sampel-palnet |
| @rs  | single float | .3.14, .-3.14 |
| @rd  | double float | .~3.14, .~-3.14 |
| @sd  | signed decimal | --20, -20 |
| @t   | UTF-8 cord | 'text', 'it\\\\'s' |
| @ub  | unsigned binary | 10.1011 |
| @ud  | unsigned decimal | 2.222 or 2222 |
| @ux  | unsigned hex | 0x12.6401 |

Cord values use single quotes. Embed single quotes with double backslash: `'it\\'s'`

Unsigned decimal can be written without the dot thousands separator (2222 instead of 2.222).

Dates and ships can optionally omit the leading `~` in INSERT.

## comments

```
:: line comment (two colons), comments out remainder of line
CREATE DATABASE db1; :: inline comment

/* block comment
must start with /* in columns 1 and 2
must end with */ in columns 1 and 2
*/
```

## no inlined sub-queries

Sub-queries must be referenced by the alias of a common table expression (CTE), never inlined. See CTE section below.

## results are always proper sets

- query results always return proper sets (no duplicate rows)
- there are no nulls; instead outer joins may return rows of varying lengths

## scripts

- multiple commands delimited by semicolons form a script
- scripts are atomic: all commands succeed or the entire script fails
- all commands in a script share the same timestamp (as if they happened simultaneously)
- once a SELECT appears in a script, all subsequent commands must also be SELECTs

## DDL commands

### implemented

```
CREATE DATABASE <database> [ <as-of-time> ]

CREATE NAMESPACE [ <database>. ] <namespace> [ <as-of-time> ]

CREATE TABLE [ <db-qualifier> ] <table>
  ( <column> <aura> [ ,...n ] )
  PRIMARY KEY ( <column> [ ,...n ] )
  [ <as-of-time> ]

DROP TABLE [ FORCE ] [ <db-qualifier> ] <table> [ <as-of-time> ]

DROP DATABASE [ FORCE ] <database>
```

FORCE is required to drop populated tables or databases with populated tables. DROP DATABASE is permanent and leaves no trace for time travel.

### not yet implemented

ALTER INDEX, ALTER NAMESPACE, ALTER TABLE, CREATE INDEX, CREATE VIEW, DROP INDEX, DROP NAMESPACE, DROP VIEW

## data manipulation commands

### INSERT

```
INSERT INTO <table> [ <as-of-time> ]
  [ ( <column> [ ,...n ] ) ]
  VALUES ( <value> [ ,...n ] ) [ ...n ]
```

- if column list is omitted, values must be in the table's canonical column order
- multiple value rows are NOT comma separated (each row is its own parenthesized group)
- the DEFAULT keyword specifies the column type's bunt (default) value
- INSERT from SELECT is parsed but not yet supported in Obelisk engine

### DELETE

```
DELETE [ FROM ] <table> [ <as-of-time> ]
  WHERE <predicate>
```

- DELETE requires a WHERE predicate (unlike SQL)
- to delete all rows use TRUNCATE TABLE instead

### TRUNCATE TABLE

```
TRUNCATE TABLE [ <ship-qualifier> ] <table> [ <as-of-time> ]
```

Executes in O(1) time regardless of data volume.

### UPDATE (not yet implemented)

```
UPDATE <table> [ <as-of-time> ]
  SET { <column> = <value> } [ ,...n ]
  [ WHERE <predicate> ]
```

## SELECT (query)

```
[ FROM <relation> [ <as-of-time> ] [ [AS] <alias> ]
    { JOIN <relation> [ <as-of-time> ] [ [AS] <alias> ] }
    | { { JOIN | LEFT JOIN | RIGHT JOIN | OUTER JOIN }
          <relation> [ <as-of-time> ] [ [AS] <alias> ]
          ON <predicate> }
    | CROSS JOIN <relation> [ <as-of-time> ] [ [AS] <alias> ]
]
[ WHERE <predicate> ]
[ GROUP BY { <qualified-column> | <column-alias> | <column-ordinal> } [ ,...n ]
  [ HAVING <predicate> ]
]
[ SCALARS { <alias> <scalar-function> } ]
SELECT [ TOP <n> ]
  { * | { <table-or-alias>.* } | <expression> [ AS <column-alias> ] } [ ,...n ]
[ ORDER BY { <qualified-column> | <column-alias> | <column-ordinal> } { ASC | DESC } [ ,...n ] ]
```

- simplest query: `SELECT 0`
- SELECT without FROM can use literals and scalar functions
- SELECT from a CTE alias alone (no FROM) is valid

### current implementation status

- JOIN (inner, no ON predicate): supported
- JOIN with ON predicate: supported in parser, not in engine
- LEFT JOIN, RIGHT JOIN, OUTER JOIN: not yet supported
- CROSS JOIN: supported
- GROUP BY, ORDER BY, TOP: parsed but not yet supported in engine
- aggregate functions: not yet implemented

## joins

### natural joins

Joins without an ON predicate. Obelisk automatically joins on matching primary keys (all key columns must match on name, aura type, and sequence; ASC/DESC may differ).

If no matching primary key or foreign key exists, the query crashes.

### CROSS JOIN

Cartesian join of two tables. Takes no predicate.

## predicates

```
<predicate> ::=
  { [ NOT ] <predicate> | [ ( ] <simple-predicate> [ ) ] }
  [ { AND | OR } [ NOT ] <predicate> [ ...n ] ]

<simple-predicate> ::=
  expression <binary-operator> expression
  | expression [ NOT ] IN { <scalar-query> | ( <value> ,...n ) }
  | expression [ NOT ] BETWEEN expression [ AND ] expression
  | [ NOT ] EXISTS { <column-value> | <scalar-query> }
  | expression [ NOT ] EQUIV expression
  | expression <inequality-operator> { ALL | ANY } { <scalar-query> | ( <value> ,...n ) }
```

### binary operators

```
= | <> | != | > | >= | !> | < | <= | !<
```

Whitespace is not required between operands and operators, except when the left operand is a numeric literal.

### logical operators

- AND: logical conjunction
- OR: logical disjunction (takes precedence over AND)
- NOT: negates the succeeding predicate
- use parentheses to override precedence

### BETWEEN

Tests for inclusion in a range (inclusive on both ends). Test expression, begin, and end must be the same type. End must be greater than begin.

### IN

Tests membership in a set of values or a scalar CTE query.

### EXISTS, EQUIV, ALL, ANY

Defined in parser; EXISTS and EQUIV available when outer joins are implemented. ALL and ANY not yet implemented.

### scalar queries in predicates

A `<scalar-query>` is a CTE alias that selects one column. It can be used with IN, EXISTS, ALL, ANY operators.

## common table expressions (CTEs)

CTEs are defined with WITH and referenced by alias:

```
WITH ( <selection> ) [ AS ] <alias>
```

- CTEs produce a relation for further use by other CTEs, JOINs, SELECT, or predicates
- always referenced by alias, never inlined
- multiple CTEs can be chained
- predicates can reference CTEs (e.g., WHERE col IN cte-name)

## scalar functions (under development, not yet available in engine)

### control flow

```
IF <predicate> THEN <expression> ELSE <expression> ENDIF
CASE <expression> WHEN <expression> THEN <expression> [ ...n ] [ ELSE <expression> ] END
COALESCE ( <expression> [ ,...n ] )
```

### arithmetic operators

```
+ | - | * | / | ^
```

Precedence: `^` highest, then `*` `/`, then `+` `-`. Exponentiation is right-associative; all others left-associative. Whitespace required before the next operand.

### datetime functions

- GETUTCDATE() returns current UTC @da
- DAY(<expression>) extracts day (1-31) as @ud from @da
- MONTH(<expression>) extracts month (1-12) as @ud from @da
- YEAR(<expression>) extracts year as @ud from @da

### mathematical functions

- ABS(<expression>) absolute value
- CEILING(<expression>) smallest value >= expression
- FLOOR(<expression>) largest value <= expression
- LOG(<expression> [, <base>]) logarithm
- POWER(<expression>, <expression>) exponentiation
- ROUND(<expression>, <precision> [, <rounding-fn>]) rounding
- SIGN(<expression>) returns -1, 0, or 1
- SQRT(<expression>) square root

### string functions

- LEN(<expression>) string length as @ud
- LEFT(<expression>, <n>) leftmost n characters
- RIGHT(<expression>, <n>) rightmost n characters
- SUBSTRING(<expression>, <start>, <length>) substring (1-based start)
- TRIM([<chars>,] <expression>) remove leading/trailing characters
- CONCAT(<expression> [,...n]) concatenate strings

## time travel

Almost all urQL commands support an optional AS OF clause:

```
<as-of-time> ::=
  AS OF { NOW
        | <timestamp>
        | n { SECOND[S] | MINUTE[S] | HOUR[S] | DAY[S] | WEEK[S] | MONTH[S] | YEAR[S] } AGO
        | <time-offset>
       }
```

- default is NOW (current server time)
- in SELECT FROM, AS OF controls which data state of the table/view is queried
- in DDL commands, AS OF back-dates or future-dates schema changes
- WARNING: future dating locks the database until that future time
- DROP DATABASE leaves no trace for time travel

## query results

All commands return a `cmd-result` (`sur/obelisk.hoon:71`):

```hoon
+$  cmd-result  [%results (list result)]
+$  result
  $%
    [%action action=@t]          :: command or query executed
    [%relation relation=@t]  :: table used or effected
    [%message msg=@t]
    [%vector-count count=@ud]    :: number of rows affected or returned
    [%server-time date=@da]      :: current server wall-clock time
    [%security-time date=@da]    :: security timestamp
    [%schema-time date=@da]      :: schema (DDL) timestamp for queried objects
    [%data-time date=@da]        :: data (DML) timestamp for queried objects
    [%result-set (list vector)]  :: rows returned by a SELECT
    ==
```

A `vector` is one result row: a non-empty list of `vector-cell` (`sur/obelisk.hoon:154`):

```hoon
+$  vector-cell  [p=@tas q=dime]   :: p=column-name, q=[aura atom]
+$  vector       $:  %vector  (lest vector-cell)  ==
```

### SELECT result sequence

`select-results` (`lib/crud.hoon:503`) assembles the `(list result)` for a query. The sequence depends on whether CTEs or joins are present.

**Simple query (no CTEs / single relation):**

```
[%action 'SELECT']
[%result-set (list vector)]
[%server-time @da]
[%schema-time @da]
[%data-time @da]
[%vector-count @ud]
```

**Query with CTEs or joins** — each source table is listed first (sorted by ship, database, namespace, name, then timestamps), followed by the main SELECT block:

```
:: per source table (non-CTE, non-sys):
[%relation <database>.<namespace>.<table>]
[%schema-time @da]
[%data-time @da]

:: then the SELECT block:
[%action 'SELECT']
[%result-set (list vector)]
[%server-time @da]
[%vector-count @ud]
```

Internal CTE tables (ship=`~`, database=`%cte`, namespace=`%cte`) are skipped in the result header output.

## system views

Available for introspection queries:

| View | Description |
|:-----|:------------|
| sys.sys.databases | all databases on server and state change events (only in %sys database) |
| sys.namespaces | namespaces in a database |
| sys.tables | tables with admin info (namespace, name, agent, tmsp, row-count) |
| sys.table-keys | primary key columns per table |
| sys.columns | table columns (namespace, name, col-ordinal, col-name, col-type) |
| sys.sys-log | schema state change history |
| sys.data-log | data state change history |

## formatting conventions

1. keywords should be ALL UPPER CASE (not required, strongly encouraged)
2. aliases may be mixed case; title case (upper case first character) encouraged
3. object names always lower case per @tas rules
