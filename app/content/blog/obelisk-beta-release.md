+++

title = "Obelisk Beta Release"
date = "2026-04-23"
description = "A first look at Obelisk, a relational database for Urbit with time travel, composable queries, and no nulls."
summary = "Obelisk brings a time-traveling relational database to Urbit. This post outlines urQL, why composability matters, what the beta makes available, and where to go for docs, roadmap, and the Hawk UI."

[extra]
ship = "~sarlev-sarsen"
# aliases = []
image = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Obelisk+Beta+Release/Blog_Obelisk_Social.png"
imageCard = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Obelisk+Beta+Release/Blog_Obelisk_Social16_9.png"
# imageIndex = "https://s3.us-east-1.amazonaws.com/urbit.orgcontent/Blog/Blog_Obelisk+Beta+Release/Blog_Obelisk_Banner.png"
# imageDark = ""
# imageCardDark = ""
# imageIndexDark = ""
tags = ["obelisk", "databases", "urql", "developers"]
search_terms = [
    "obelisk beta",
    "~nomryg-nilref",
    "urql",
    "urbit database",
    "relational database",
    "time travel database",
    "sql for urbit",
    "common table expressions",
    "scalars clause",
    "sample database",
    "hawk ui",
    "no nulls"
]

+++

Obelisk is a relational database management system for Urbit built around a simple question: if SQL were reinvented today, with nearly fifty years of hindsight, what would it look like?

As the first relational database built for Urbit, its answer starts with a few strong constraints:

- Every database state is indexed by time.
- Queries are implicitly idempotent.
- Tables, views, and query results are proper sets of rows.
- There are no nulls.
- Scripts are atomic: they either succeed or fail as a whole.

It also has a key advantage in contrast to the legacy stack: It is without obligation to preserve every historical compromise of legacy SQL, as there is no backwards compatiblity requirement. That said, Obelisk's SQL-derived query language, urQL, should be familiar enough for SQL users to read, and due to it's syntactic similarity to SQL is straightforwared to write for both humans and agents. What else does Oblelisk hand to Urbit Developers?

## Time travel as a database primitive

One of Obelisk's biggest departures from legacy SQL is that old states do not disappear. Queries can use `AS OF` to inspect the state of a table, view, or schema at another point in time. In everyday use, that can stay mostly invisible. When you need it, it means history, auditing, and rollback-oriented reasoning are already part of the data model.

## Composability first

Obelisk also rethinks query shape. In urQL, clauses are arranged in the same order the engine evaluates them. Combined with Common Table Expressions (CTEs) and the `SCALARS` clause, the goal is to make complex queries easier to read and easier to build up in stages. The point is not novelty for its own sake; it is to make relational work feel more legible and more composable.

## What the beta opens up

The beta is an initial working release that developers can use today, either by installing manually from [the GitHub repo](https://github.com/jackfoxy/obelisk) or directly over the network: `|install ~dister-nomryg-nilref %obelisk`. Included in this beta release are CTEs, `SCALAR` functions, and expanded joins. Also included is a sample `animal-shelter` database for learning and testing. That matters because Obelisk is not being released as a paper design. It is being released as something developers can start building against.

The sample database also means new users are not staring at a blank page after installation. You can immediately start running queries, reading the users guide, and getting a feel for the model with concrete data.

The beta also comes with a `%hawk` UI. If you do not already have `%hawk`, you can install it with `|install ~dister-migrev-dolseg %hawk`. `%hawk` itself now comes with an `%obelisk` UI compiled directly into the app. Early alpha users will find that they no longer need to create a dedicated template, and that performance is improved over early template versions of the UI. The repo also includes an `obelisk-urql` skill file, a practical sign that the project is being built with agent-assisted development in mind.

## Why it matters on Urbit

Urbit needs local software primitives that are durable, inspectable, and pleasant to compose. A relational database with built-in history, proper set semantics, and no nulls opens up a cleaner foundation for apps running on personal servers. It also makes a strong claim about what local-first infrastructure can look like: not less powerful than legacy systems, but simpler and more coherent.

While this doesn't wholesale replace other patterns for data storage, such as directly using Gall state, or the Clay filesystem, it offers an additional option for persistence of data that can be used across applications. 

## What comes next

Obelisk is still marching toward 1.0. The roadmap includes views, `GROUP BY`, aggregate functions, `ORDER BY`, outer joins, and more. But the beta already gives developers something concrete: a relational database for Urbit that treats time, sets, and composability as first-class design constraints.

## Learn more

`~nomryg-nilref`, Obelisk's creators, makes available comprehensive resources for getting started with Obelisk, and an active developer community on Tlon Messenger at `~pitlyn-mintul-nomryg-nilref/obelisk`.
- [Obelisk: Reinventing SQL for Modern Computing](https://urbitsystems.tech/article/v03-i01/obelisk-reinventing-sql-for-modern-computing)
- [Obelisk on GitHub](https://github.com/jackfoxy/obelisk)
- [Obelisk roadmap](https://github.com/jackfoxy/obelisk/blob/master/roadmap.md)
- [Obelisk skills](https://github.com/jackfoxy/obelisk/blob/master/.claude/skills)
