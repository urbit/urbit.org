---
title: Obelisk urQL Sample
app: "%obelisk"
reference_type: app-examples
app_metadata_reference: "../README.md"
related_references:
  - "README.md"
  - "examples.md"
  - "syntax.md"
dependencies: []
---

# urQL examples

Canonical examples drawn from the Obelisk docs. All keywords UPPER CASE (encouraged), object names lower-case `@tas`, aliases title-case.

## DDL — database / namespace

```urQL
CREATE DATABASE db1;
```

```urQL
CREATE DATABASE db1 AS OF ~2023.7.9..22.35.35..7e90;
```

```urQL
ALTER DATABASE db1 RENAME TO db2;
```

```urQL
CREATE NAMESPACE ns1 AS OF ~2023.7.9..22.35.35..7e90;
```

```urQL
CREATE NAMESPACE ns2;
ALTER NAMESPACE ns2 TRANSFER TABLE my-table;
```

```urQL
CREATE DATABASE db2;
CREATE NAMESPACE db2.ns2;
ALTER NAMESPACE db2.ns2 TRANSFER TABLE db1..my-table AS OF ~2026.5.1;
```

## DDL — table

```urQL
CREATE TABLE db1..my-table
  (col1 @t, col2 @da, col3 @ud)
  PRIMARY KEY (col1);
```

```urQL
CREATE TABLE order-detail
  (invoice-nbr @ud, line-item @ud, product-id @ud, message @t)
  PRIMARY KEY (invoice-nbr ASC, line-item DESC);
```

```urQL
CREATE TABLE parent (id @ud, label @t) PRIMARY KEY (id);
CREATE TABLE child
  (id @ud, parent-id @ud, note @t)
  PRIMARY KEY (id)
  FOREIGN KEY (parent-id) REFERENCES parent (id)
  ON DELETE CASCADE;
```

```urQL
CREATE TABLE tenant-codes
  (tenant-id @ud, code @ud, label @t)
  PRIMARY KEY (tenant-id, code);
CREATE TABLE tenant-items
  (id @ud, tenant-id @ud, code @ud, item @t)
  PRIMARY KEY (id)
  FOREIGN KEY (tenant-id, code)
    REFERENCES tenant-codes (tenant-id, code)
    ON DELETE CASCADE ON UPDATE CASCADE;
```

```urQL
ALTER TABLE my-table
  ADD COLUMN (created @da, balance @sd, ratio @rd),
  COLUMNS (col1, col2, col3, created, balance, ratio);
```

```urQL
ALTER TABLE my-table
  RENAME TO full-table,
  ADD COLUMN (created @da),
  DROP COLUMN (col2),
  RENAME COLUMN (col1 TO name),
  ALTER COLUMN (col3 @sd),
  COLUMNS (name, col3, created),
  PRIMARY KEY (name, col3)
  AS OF ~2026.5.1;
```

```urQL
ALTER TABLE child
  ADD FOREIGN KEY (parent-id) REFERENCES parent (id)
  ON DELETE RESTRICT ON UPDATE CASCADE;
```

```urQL
ALTER TABLE child DROP FOREIGN KEY (parent-id) parent;
```

```urQL
DROP TABLE my-table-1;
DROP TABLE FORCE my-table-2;
```

## DML

Multiple value rows are NOT comma-separated:

```urQL
INSERT INTO calendar
VALUES
  (~2023.12.21, 2023, 12, 'December', 21, 'Thursday', 355, 5, 51)
  (~2023.12.22, 2023, 12, 'December', 22, 'Friday', 356, 6, 51)
  (~2023.12.23, 2023, 12, 'December', 23, 'Saturday', 357, 7, 51);
```

```urQL
INSERT INTO db1..my-table AS OF ~2000.1.2..12.12.12
  (col1, col2, col3)
VALUES ('cord2', ~2000.1.2, 42);
```

UPSERT overwrites rows whose primary key already exists:

```urQL
UPSERT INTO my-table-2
VALUES
  ('today', ~2024.9.26, 4)
  ('next week', ~2024.10.3, 7);
```

```urQL
DELETE FROM calendar AS OF ~2012.5.1
WHERE day-name = 'Sunday'
   OR (day-name = 'Saturday' AND day-of-year = 357);
```

```urQL
UPDATE my-table-2 SET col3=99 WHERE col1 = 'today';
```

```urQL
UPDATE my-table-2 SET col3=DEFAULT;
```

```urQL
WITH (FROM my-table-2 WHERE col4 = 'row3' SELECT col1, col3) AS my-cte
UPDATE my-table SET col1='updated'
WHERE my-cte.col1 = my-cte.col3;
```

```urQL
TRUNCATE TABLE my-table;
```

## Queries — basics

```urQL
SELECT 0;
```

```urQL
SELECT ~2024.10.20, 'hello' AS Greeting, 42 AS Answer;
```

```urQL
FROM reference.calendar AS OF ~2000.1.3
SELECT *;
```

```urQL
FROM reference.calendar
WHERE day-name = 'Thursday'
SELECT date, year, month, day-name;
```

## Queries — scalars

Arithmetic scalars must end with `END`:

```urQL
FROM adoptions A
SCALARS full-label CONCAT(name, ' (', species, ')')
        fee-tier IF adoption-fee > 75 THEN 'premium' ELSE 'standard' ENDIF
        net-fee  adoption-fee - discount END
SELECT name, species, adoption-date, full-label, fee-tier, net-fee;
```

```urQL
FROM animals A
SCALARS size-class CASE
                     WHEN weight > 30 THEN 'large'
                     WHEN weight > 10 THEN 'medium'
                     ELSE 'small'
                   END
SELECT name, species, size-class;
```

## Queries — joins

Natural join (shared name + aura columns, aliases disambiguate):

```urQL
FROM reference.calendar T1
JOIN reference.calendar-us-fed-holiday T2
WHERE T1.date BETWEEN ~2025.1.1 AND ~2025.12.31
SELECT T1.date, day-name, us-federal-holiday;
```

JOIN ON (equality conditions joined by AND only):

```urQL
FROM adoptions A
JOIN vaccinations V ON A.name = V.name AND A.species = V.species
SELECT A.name, A.species, A.adoption-date, V.vaccine, V.vaccination-time;
```

CROSS JOIN + WHERE for conditions ON cannot express:

```urQL
FROM adoptions A
CROSS JOIN vaccinations V
WHERE A.name = V.name
  AND A.species = V.species
  AND V.vaccination-time > A.adoption-date
SELECT A.name, A.species, A.adoption-date, V.vaccine, V.vaccination-time;
```

## Queries — CTEs

```urQL
WITH (FROM persons P
      JOIN staff S
      SELECT P.first-name, P.last-name, P.email, S.hire-date) AS shelter-staff
FROM shelter-staff
WHERE hire-date > ~2018.1.1
SELECT first-name, last-name, hire-date;
```

Chained CTEs:

```urQL
WITH (FROM adoptions
      WHERE species = 'Dog'
      SELECT name, adopter-email, adoption-fee) AS dog-adoptions,
     (FROM dog-adoptions
      WHERE adoption-fee > 75
      SELECT name, adopter-email) AS premium-dogs
FROM premium-dogs
SELECT *;
```

Single-column CTE as a predicate set:

```urQL
WITH (FROM reference.species
      WHERE species = 'Dog'
         OR species = 'Cat'
      SELECT species) AS target-species
FROM adoptions
WHERE species IN target-species.species
SELECT name, species, adoption-date, adoption-fee;
```

## Queries — set operations

Evaluated left-to-right; exact-vector equality (column names, order, auras all matter):

```urQL
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

```urQL
FROM adoptions
SELECT name, species
INTERSECT
FROM vaccinations
SELECT name, species;
```

```urQL
WITH (FROM adoptions
      SELECT name, species
      INTERSECT
      FROM vaccinations
      SELECT name, species) AS adopted-and-vaccinated
FROM adopted-and-vaccinated
SELECT *;
```

## System views

```urQL
FROM sys.sys.databases SELECT *;
```

```urQL
FROM sys.columns WHERE name = 'my-table' SELECT col-name, col-type;
```

```urQL
FROM sys.table-keys WHERE name = 'calendar' SELECT name AS Table-Name, key-ordinal, key;
```

```urQL
FROM sys.foreign-keys
SELECT parent-namespace, parent-table, child-namespace, child-table,
       ordinal, parent-column, child-column, on-delete, on-update;
```
