+++

title = "Seguro MVP"
date = "2022-07-27"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Runtime"]

[extra]
image = ""
description = "Implement a working FoundationDB event read/write layer that is as ready as possible for interfacing with the Urbit runtime."
reward = "5 stars"
assignee = ["~mastyr-bottec"]
champion = ["~master-morzod"]
grant_id = "P0168"
completed = true
canceled = false
link = ""

+++

# Seguro

A production wrapper around FoundationDB, ready for integration with `vere`.

## Background

The results of Phase 1 of the Seguro project demonstrate that FoundationDB is
the best choice of distributed databases to utilize for the project. This is
Phase 2 of the Seguro project, which implements an MVP event reader/writer
module using FoundationDB as the underlying data store.

See below for additional context:

- [Seguro Prototype (Phase 1) Grant](https://urbit.org/grants/seguro-prototype)
- [Seguro Prototype (Phase 1) Repository](https://github.com/wexpertsystems/seguro)
- [Seguro & Armada Paper](https://gist.github.com/wexpert/0485a722185d5ee70742570036faf32f)

## Objectives

Phase 2 of the Seguro project can be considered as "all work up to actual
integration with `vere`". Limiting Phase 2 to this is desirable because it i.)
keeps the grant's scope of work at a reasonable level, and ii.) it allows more
time for the following three ancillary runtime projects/considerations to
achieve resolution:

1. Asynchronous reads in `vere`
2. Merging/releasing event log truncation
   [urbit/urbit#7501](https://github.com/urbit/urbit/pull/5701)
3. A decision on whether or not to add another process to the overall Urbit
   runtime architecture

Each of these three workstreams need to be resolved before Seguro can be
integrated with `vere`.

### Event Fragmentation Scheme

FoundationDB supports a maximum value size of 100KB and recommends limiting
value size to only 10KB for best performance. Since our data model requires
arbitrarily sized byte buffer values for events, an event fragmentation
algorithm is required to support events with larger payloads.

Events which exceed the size limit of a single database value must be fragmented
so that such events are stored across multiple database key/value pairs. To
achieve event fragmentation, key/value pairs will be formatted like so:

#### Keys/Values

|           | encoding                      | format                                |
| --------- | ----------------------------- | ------------------------------------- |
| **key**   | ASCII string, null-terminated | `"<event id>:<fragment id>"`          |
| **value** | raw bytes                     | `<fragment header><fragment payload>` |

`event id`s and `fragment id`s are both contiguous, non-negative integers.

#### Fragment Header

`fragment header`s are raw byte strings with byte-widths determined by the total
size of the event payload. By default, fragment headers have a byte-width of 4:

| byte | bucket     | format                           | example     |
| ---- | ---------- | -------------------------------- | ----------- |
| 0    | byte-width | overflow toggle bit, fragment id | `0000 0000` |
| 1    |            | ASCII `':'` character            | `0011 1010` |
| 2    | length     | total fragments                  | `0000 0001` |
| 3    |            | ASCII `':'` character            | `0011 1010` |

The overflow toggle bit is the high bit of byte 0.

The default fragment header byte-width of 4 supports events which can be
fragmented with 127 or less total fragments.

For events which require greater than 127 fragments to be stored, the overflow
toggle bit is set to 1 and the low 7 bits are used to encode the fragment header
byte-width instead of the `fragment id`. If those 7 bits encode a value of _x_
bytes, the following _x_ bytes in the fragment header will contain the
`fragment id`. Note that, no matter the value of the overflow toggle bit, the
byte-width and length buckets _always_ have the same byte-widths. Thus, the
total byte-width of any fragment header is _2x+2_, where _x_ is 1 when the
overflow toggle bit or the encoded value of the low 7 bits when the overflow
toggle bit is set to 1.

Let's see how the 255th fragment of an example event which requires 255
fragments to be stored would look:

| byte | bucket     | format                                 | example     |
| ---- | ---------- | -------------------------------------- | ----------- |
| 0    | byte-width | overflow toggle bit, bucket byte-width | `1000 0010` |
| 1    | byte-width | fragment id                            | `1111 1111` |
| 2    |            | ASCII `':'` character                  | `0011 1010` |
| 3    | length     | total fragments                        | `0000 0000` |
| 4    | length     | total fragments continued              | `1111 1111` |
| 5    |            | ASCII `':'` character                  | `0011 1010` |

In this case, _x_ is 2, so the total byte-width of the fragment header is _2x+2
= 2\*2+2 = 6_.

#### Fragment Payload

The `fragment payload` is the raw bytes of the event, as encoded by `vere`,
which are appended to the end of the fragment header byte string.

The maximum size of each event's `fragment payload` is simply:

```
(maximum db value size) - (fragment header size)
```

For instance, if the `maximum db value size` is 10KB and the
`fragment header size` for the given event is the default of 4 bytes, each
fragment payload can hold up to 9,996 bytes.

#### Fragmentation Tests

Tests ensuring multi-fragment events are written and read correctly and without
corruption must be included in this work.

### Reads

Single and batch reads must be supported, with the following function
signatures, or similar:

- `event read_event(int event_id);`
- `event[] read_event_batch(int min_event_id, int max_event_id);`

### Writes

Single transaction batch writes and multiple, simultaneous, asynchronous writes
must be supported as well:

- `int write_event_batch(event[]);`
- `future write_event_async(event);`

Additional requirements for writes include:

- A benchmark determining which of the above perform best
- A brief analysis of pros/cons of integrating the two, based on whether the
  overall architecture is in- or out-of-process

## Future Work

1. Integration with `vere`
2. Release
3. Automatic failover

## Milestones

Phase 2 - Implement a working FoundationDB event read/write layer that is as
ready as possible for interfacing with the Urbit runtime.

Deliverables:

1. Implementation using the
   [FoundationDB C API](https://apple.github.io/foundationdb/api-c.html)
2. Event fragmentation scheme, including correctness tests
3. Single and batch reads
4. Writes

   1. Single transaction batch writes
   2. Multiple, simultaneous transaction writes (race a bunch of futures)
   3. Benchmark determining best performance write strategy
   4. Brief analysis of implementation pros/cons based on in- or out-of-process
      architecture

5. Linux compatibility (macOS, Windows can be supported later)

Payment: 5 stars

Expected Completion: October 2022
