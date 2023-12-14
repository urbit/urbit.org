+++

title = "Urbit Query"
date = "2023-08-30"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = "A standard interface for querying Urbit from React"
reward = "3 Stars"
assignee = ["~polwex"]
champion = [""]
grant_id = "P0285"
completed = false
canceled = false

+++

# Description
While the JavaScript ecosystem remains famously fluid and fragmented, there's also been a clear move towards standardization of tooling. React can be said to be the industry standard for being web applications today, and it has produced its own ecosystem of libraries to handle all common needs of frontend development.



Most Urbit applications also use React in the frontend, but the tooling remains fragmented, with every developer choosing its own libraries for data querying or state management. Urbit as a backend, however, offers a unified API, so it stands to reason that Urbit frontends should have a single standard way of interacting with the backend. This proposal aims to provide one, building on long experience building complex frontends for Urbit agents.



Urbit being a personal server is, in principle, the ideal platform to run purely server-side rendered applications, yet that remains impractical due to performance reasons and the fact that most ships are run remotely. What is needed is a middleware that syncs application state on Urbit with the state of frontend, but does it out of sight, so developers can focus on building the UX and not the nuts and bolts of data management.



Urbit Query is inspired by [react-query](https://github.com/TanStack/query), a popular React library that provides a state-of-the-art interface to query data, cache it automatically and handle data mutations, prefetching and other aspects of frontend data management. Urbit Query will build on react-query and add specific Urbit features, such as first-class support for SSE, noun channels and all idiosyncrasies of Eyre's API.



# Milestones

## Milestone 1

Deliver TypeScript library providing React hooks for querying data from Urbit ships, handling loading, caching, mutation, prefetching and refetching for the developer.

**Reward: 2 Stars**

## Milestone 2

Add support for noun channels and provide a smooth interface to add noun-JS data conversion.

**Reward: 1 Star**


# Total Compensation

3 Stars
