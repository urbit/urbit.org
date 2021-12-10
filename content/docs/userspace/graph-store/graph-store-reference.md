+++
title = "Graph Store - Reference"
weight = 5
template = "doc.html"
+++

## Pokes

Graph Store can be poked with a `graph-update`, which can:

### Add and remove a graph

- `[%add-graph =resource =graph mark=(unit mark) overwrite=?]`

- `[%remove-graph =resource]`

### Add and remove a node

- `[%add-nodes =resource nodes=(map index node)]`

- `[%remove-posts =resource indices=(set index)]`

### Add and remove signatures

- `[%add-signatures =uid =signatures]`

- `[%remove-signatures =uid =signatures]`

### Add and remove tags

- `[%add-tag =term =uid]`

- `[%remove-tag =term =uid]`

### Archive and unarchive a graph

- `[%archive-graph =resource]`

- `[%unarchive-graph =resource]`

### Manually process an update log on a resource

- `[%run-updates =resource =update-log]`

## Scries

What follows is a summary of the scries available in graph-store.

<!-- enhancement: add examples -->
<!-- enhancement: add refrences to relevant sections in data structures explanation -->

### Export State

Obtain a vase of the current state of graph-store as a noun.

- Path: `/x/export`
- Output Type: `network:store`

### Fetch keys

Fetch the resources of all graphs that graph-store is currently tracking.

- Path: `/x/keys`
- Output Type: `(set resource)`

### Fetch tag queries

Fetch the available tag queries from graph-store.

- Path: `/x/tag-queries`
- Output Type: `tag-queries`

### Fetch tags

Fetch all available tags from graph-store.

- Path: `/x/tag-queries/tags`
- Output Type: `(list term)`

### Fetch the update log by resource

This returns the full update log for the graph associated with the given resource.

- Path: `/x/update-log/[ship]/[name]`
- Inputs
  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
- Output Type: `update-log:store`

### Fetch time of the latest log entry by resource

Fetch the time of the latest log entry by resource, if the update-log for the given resource exists.

- Path: `/x/update-log/[ship]/[name]/latest`
- Inputs
  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
- Output Type: `(unit time)`

### Fetch a subset of the update log

- Path: `/x/update-log/[ship]/[name]/subset/[start]/[end]`
- Inputs
  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
  - **start** and **end** (`@da`) - All logs after **start** and before **end** are to be included in the result.
- Output Type: `update-log:store`

### Fetch a specific graph by resource

Returns the full graph for a given resource.

- Path: `/x/graph/[ship]/[name]`
- Inputs:
  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
- Output Type: `update:store`, `%add-graph`

### Request the mark of a graph

Returns the mark associated a given graph, if one exists.

- Path: `/x/graph/[ship]/[name]/mark`
- Inputs:
  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
- Output Type: `(unit mark)`

### Request a subset of the graph

Returns a subset of nodes from a graph, with or without descendants, optionally filtering for ones that fall between the start and end indexes.

- Path: `/x/graph/[ship]/[name]/subset/[mode]/[start?]/[end?]`
- Inputs:
  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
  - **mode** (`?(%kith %lone)`) - `%kith` to include descendants, `%lone` to exclude.
  - **start** and **end** (`(unit atom)`) - Atoms used to start and end the subset. If these are unable to be parsed, the subset will start at the smallest node.
- Output Type: `update:store` `%add-nodes`

### Check if node exists

Returns a flag, `%.y` if the node exists and `%.n` otherwise.

- Path: `/x/graph/[ship]/[name]/node/exists/[index+]`
- Inputs:
  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
  - **[index+]** `(list atom)`- The index of the node to check. The index should be appended to the path as a list.
- Output Type: `flag`

### Request a node

Returns an `%add-nodes` update containing the node that was requested.

- Path: `/x/graph/[ship]/[name]/node/index/[mode]/[index+]`
- Inputs
  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
  - **mode** (`?(%kith %lone)`) - `%kith` to include descendants, `%lone` to exclude
  - **[index+]** `(list atom)`- The index of the node being requested. The index should be appended to the path as a list.
- Output Type: `update:store` `%add-nodes`

### Request a node's children

Returns a subset of a node's children, with or without descendants, optionally filtering for ones that fall between the start and end indexes.

- Path: `/x/graph/[ship]/[name]/node/children/[mode]/[start?]/[end?]/[index+]`
- Inputs

  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
  - **mode** (`?(%kith %lone)`) - `%kith` to include descendants, `%lone` to exclude.
  - **start** and **end** (`(unit atom)`) - Atoms used to start and end the subset. If these are unable to be parsed, the subset will start at the smallest node.
  - **[index+]** `(list atom)`- The index of the node being requested. The index should be appended to the path as a list.

- Output Type: `update:store` `%add-nodes`

### Request a node's siblings

<!-- todo figure out behavior of %newest and %oldest -->

- Path: `/x/graph/[ship]/[name]/node/siblings/[direction]/[mode]/[count]/[index+]`
- Inputs
  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
  - **direction** (`?(%older %newer %oldest %newest)`)-
    - `%newer` - Load the siblings with keys larger than the requested node.
    - `%older` - Load the siblings with keys smaller than the requested node.
    - `%newest` - Load the siblings with the largest keys.
    - `%oldest` - Load the siblings with the largest keys.
  - **mode** (`?(%kith %lone)`) - `%kith` to include descendants, `%lone` to exclude.
  - **count** (`atom`) - A limit to the number of nodes to return.
  - **[index+]** `(list atom)`- The index of the node being requested. The index should be appended to the path as a list.
- Output Type: `update:store` `%add-nodes`

### Request a node's firstborn child

<!-- todo explanation -->

- Path: `/x/graph/[ship]/[name]/node/firstborn/[index+]`
- Inputs:

  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
  - **[index+]** `(list atom)`- The index of the node being requested. The index should be appended to the path as a list.

- Output: `update:store` `%add-nodes`

### Request nodes, depth first

- Path: `/x/graph/[ship]/[name]/node/depth-first/[count]/[start]`
- Input

  - **ship** (`ship`) - The ship of the resource.
  - **name** (`@tas`) - The name of the resource.
  - **count** (`(unit atom)`) - A limit to the number of nodes to return.
  - **start** (`(unit atom)`) - The index fragment to start at.

- Output Type: `update:store` `%add-nodes`

## Agent State

The following is the definition of the agent state, known as `network`.

```hoon
+$  network
  $:  =graphs
      =tag-queries
      =update-logs
      archive=graphs
      ~
  ==
```

Briefly,

- `graphs` represents all graphs that graph store is aware of an is storing data about.
- `tag-queries` is how graph store implements its tagging system, and uses it to keep track of associations between tags and the respective index.
- `update-logs` is where graph-store stores the update-log that backs each graph, keyed by resource. <!-- refrence to advanced section talking about how this is the source of truth -->
- `archive` is where graph-store stores archived graphs. These are graphs which can no longer be updated through `%run-updates`. <!-- this nuance should/could also be present in the advanced info -->

For more information on these types, please take a look at the [data structure overview](/docs/userspace/graph-store/data-structure-overview).
