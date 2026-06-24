---
title: Obelisk urQL Examples
app: "%obelisk"
reference_type: app-examples
app_metadata_reference: "../README.md"
related_references:
  - "../README.md"
  - "README.md"
  - "../testing.md"
dependencies: []
---

# Obelisk urQL Examples

```urQL
CREATE DATABASE db1;
```

```urQL
CREATE DATABASE db1 AS OF ~2023.7.9..22.35.35..7e90
```

```urQL
CREATE NAMESPACE ns1 AS OF ~2023.7.9..22.35.35..7e90
```

```urQL
CREATE TABLE db1..my-table
  (col1 @t, col2 @da, col3 @ud)
  PRIMARY KEY (col1);
```

```urQL
INSERT INTO calendar
VALUES
  (~2023.12.21, 2023, 12, 'December', 21, 'Thursday', 355, 5, 51)
  (~2023.12.22, 2023, 12, 'December', 22, 'Friday', 356, 6, 51)
  (~2023.12.23, 2023, 12, 'December', 23, 'Saturday', 357, 7, 51)
  (~2023.12.24, 2023, 12, 'December', 24, 'Sunday', 358, 1, 52)
  (~2023.12.25, 2023, 12, 'December', 25, 'Monday', 359, 2, 52);
```

```urQL
INSERT INTO db1..my-table AS OF ~2000.1.2..12.12.12
VALUES ('cord2', ~2000.1.2, 42);
```

```urQL
DELETE FROM calendar AS OF ~2012.5.1
WHERE day-name = 'Sunday'
   OR day-name = 'Monday'
   OR day-name = 'Tuesday'
   OR day-name = 'Wednesday'
   OR day-name = 'Thursday'
   OR day-name = 'Friday'
   OR (day-name = 'Saturday'
       AND day-of-year = 357);
```

```urQL
TRUNCATE TABLE my-table;
```

```urQL
DROP TABLE FORCE my-table;
```

```urQL
SELECT 0;
```

```urQL
SELECT ~2024.10.20, 'hello' AS Greeting, 42 AS Answer;
```

```urQL
FROM sys.tables
SELECT ~2024.10.20, tmsp AS Time, ~sampel-palnet AS Home;
```

```urQL
FROM my-table AS OF ~2000.1.3
SELECT *;
```

```urQL
FROM calendar T1
JOIN holiday-calendar T2
SELECT T1.day-name, T2.*;
```

```urQL
FROM calendar T1
JOIN holiday-calendar T2
WHERE T1.date BETWEEN ~2025.1.1 AND ~2025.12.31
SELECT T1.date, day-name, us-federal-holiday;
```

```urQL
FROM calendar T1
JOIN holiday-calendar T2
JOIN tbl3 T3
SELECT row-name, T1.day-name, T2.*, T3.*;
```

```urQL
FROM tbl1
CROSS JOIN cross-tbl
SELECT year, month, day, month-name, cross-key, cross-2, cross-3;
```

```urQL
FROM tbl1
CROSS JOIN cross-tbl AS OF ~2000.1.3
SELECT year, month, day, month-name, cross-key, cross-2, cross-3;
```

```urQL
WITH (FROM calendar T1
      JOIN holiday-calendar T2
      WHERE T1.day-name = 'Monday'
        AND T2.us-federal-holiday = 'Christmas Day'
      SELECT T1.day-name, T2.*, T2.us-federal-holiday AS Fed)
      AS My-Cte
FROM My-Cte SELECT *;
```

```urQL
FROM sys.columns
WHERE name = 'my-table'
SELECT col-name, col-type;
```

```urQL
FROM sys.table-keys
WHERE name = 'calendar'
SELECT name AS Table-Name, key-ordinal, key;
```
