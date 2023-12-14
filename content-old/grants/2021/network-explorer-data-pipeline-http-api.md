+++
title = "Network Explorer: Data Pipeline & HTTP API"
date = "2021-03-11"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Build a public, open HTTP API for exploring metrics about the Urbit network."
reward = "5 stars"
assignee = ["~dinleb-rambep"]
id = "1101665172"
completed = true
canceled = false
link = ""
+++

## Overview

![network explorer screenshot](https://wolref-podlex.s3.us-west-2.amazonaws.com/wolref-podlex/2021.2.23..20.58.30-Screen%20Shot%202021-02-23%20at%209%2C01%2C03%20AM.png)

### Goal

Build a public, open HTTP API for exploring metrics about the Urbit network.

### Background

The project known as the **Network Explorer** has been in the works at Tlon for
quite some time. The idea is to build a publicly-accessible tool (hosted on
https://network.urbit.org) that provides key metrics and insights into the state
of the Urbit network. A series of high-fidelity designs have been produced.

### Scope

This bounty covers the creation of the:

- **data pipeline**: we're concerned with data from the PKI (Azimuth) and
  the Urbit network itself. These two datasets will need to be aggregated and
  indexed for efficient querying.
- **HTTP API**: the interface for querying data from a client, like the Network
  Explorer.

The Network Explorer interface will be covered in a separate bounty.

## Implementation

### Data Model

Let's start with the data model. There are two sources of data that we need:

- **PKI (Azimuth)**: The public-key infrastructure, currently known as Azimuth,
  is our primary source of data. This information is currently found on Ethereum
- **Radar output**: [`radar`](https://github.com/urbit/urbit/blob/2c412d658a74dca3b3f584b92f8b390f38a05ba1/pkg/arvo/app/radar.hoon) is a program run from within an Urbit
  ship that pings (`|hi`) every Urbit ship and records the results. This data is exposed in a single JSON file that is added to over time as the script runs.

Most of the required information in the Network Explorer will come from Azimuth.
It's important to know though that the source of PKI information will likely
change in the near future in light of [ongoing work to reduce the
cost](https://groups.google.com/a/urbit.org/g/dev/c/p6rP_WsxLS0) of bringing
nodes onto the network.

The below [entity-relationship
diagram](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)
defines a data model in terms of a relational database:

![erd diagram](https://wolref-podlex.s3.us-west-2.amazonaws.com/wolref-podlex/2021.2.23..20.58.39-Network%20Explorer%20ERD.png)

Some notes about the above diagram:

- The data model should be _agnostic to any particular PKI storage
  infrastructure_ to future-proof it against PKI changes.
- For non-`ping` data, it should be possible to compute the table of `node` from
  a time-ordered traversal of `pki_event` (kind of like Arvo!). This means that
  many fields listed on the `node` table could instead be derived from analysis
  of the `pki_event` table. The implementer will be responsible for determining
  which fields should be represented on the `node` directly and which should be
  determined from `pki_event` for performance purposes.
- We don't have data for comets or moons, because they're not registered on
  Azimuth and `radar` only checks for activity from ships with keys that have
  been set on Azimuth. There will likely be a future in which we'll have a way
  to provide data about these ship types though.

### Data Ingestion

Data from Azimuth and `radar` will need to be regularly extracted, parsed, and
persisted to the local database for querying.

For Azimuth, using a tool like [infura](https://infura.io) should be used.. Tlon
currently uses infura, so it should be possible to use a free account for
development and Tlon's pre-existing service in production.

The output of the `radar` script is saved to a JSON file that can be found
[here](http://35.247.74.19:8080/~radar.json). This file is updated as new ping
information is obtained, so data ingestion from this service should happen on
some regular schedule.

### API

The following are are necessary API endpoints for the Network Explorer UI to
function properly. It's likely that some details have been missed, so apply your
own judgement when designing the API.

This interface is meant to be agnostic to the API mechanism you choose, which
could be either REST or GraphQL.

#### get-node

Produce the details for a single node.

**Parameters**

- `urbit_id`: `@p`

**Returns**

- `urbit_id`: `@p`
- `node_type`: `#{galaxy,star,planet,moon,comet}`
- `status`: `#{locked,unlocked,spawned,activated,online}`
- `continuity`: `int`, current continuity
- `key_revision`: `int`, current revision of keys
- `num_owners`: `int`, number of owners
- `sponsors`: `[node]` (sponsor and sponsor's sponsor, if applicable)
- `kids`: `[node]` (nodes sponsored by this one)
- `proxy_addresses`:
  - `ownership`
  - `spawn`
  - `transfer`
  - `voting`
  - `management`

#### get-nodes

Produce a list of nodes, optionally with parameters. Absence of parameters queries all nodes.

**Parameters**

- `q`: `string` (optional: query term to search for)
- `node_types`: `[node_type]` (optional: produce just events for specific node types)
- `limit`: `int` (number of results to return)
- `offset`: `int` (number of results to offset by)

**Returns**
An array of `node` in ascending order by `point`.

#### get-pki-events

Produce the stream of PKI events for a specific Urbit ID, or globally in descending order of `time`.

**Parameters**

- `urbit_id`: `@p` (optional: unspecified implies global)
- `since`: `timestamp` (optional: unspecified implies all events)
- `node_types`: `[node_type]` (optional: produce just events for specific node types)
- `limit`: `int` (number of results to return)
- `offset`: `int` (number of results to offset by\*\*

**Returns**
An array of `pki_event` in descending order of `time`.

#### get-activity

Produce the network activity of a node or nodes.

**Parameters**

- `urbit_id`: `@p` (optional: specific ship to pull activity for)
- `since`: `timestamp` (optional: activity since provided time)
- `until`: `timestamp` (optional: activity up until the provided time)

If `urbit_id` is unspecified, implies all ships.

If `since` and `until` are unspecified, produces all activity for all time. If
only `since` is provided, produces activity from `since` to the present. If only
`until` is provided, produces activity for all of time up until `until`. If both
are provided, queries activity within a range.

**Returns**
Array of:

- `urbit_id`: `@p`
- `date`: `date` (no time)
- `active`: `boolean` (active or inactive)

### Technology Requirements/Guidelines

That which is not explicitly specified here is up to the choice of the
implementer.

- **Database**: PostgreSQL
- **Ethereum Interaction**: Infura
- **HTTP API methodology**: GraphQL or REST
- **ORM**: None. Implementer should be sufficiently familiar with SQL.
- **API Hosting**: The API will be hosted on `api.network.urbit.org` or
  `network.urbit.org/api`.

## Requirements

- 2+ years of experience with developing HTTP APIs
- 2+ years of experience working with relational databases
- Code hosted at https://github.com/urbit/network-api
- Attend regular (weekly or bi-weekly) checkin meetings with the director of
  urbit.org to provide status updates

## Resources

- A complete set of high-fidelity designs in Figma will be made available to the
  worker.
- The director of urbit.org will ensure access to other resources or personnel
  as needed.

## Milestones

### Data ETL

2 stars
The database has been designed and data from both sources is ingested
(extracted, transformed and loaded) on a regular schedule. Analysis can be
performed at the database layer.

### HTTP API

2 stars
An HTTP API is written per the above specification and deployed to
`https://api.network.urbit.org`.

### UI Integration

1 stars
The Network Explorer UI will be a separate proposal, but integration with an
interface inevitably surfaces oversights in the original design. An additional
star will be awarded for providing ongoing maintenance as-needed during
front-end integration.
