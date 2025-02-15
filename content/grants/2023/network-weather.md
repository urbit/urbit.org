+++

title = "Network Weather Simulator for %pyro/%aqua"
date = "2023-03-02"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Core"]

[extra]
image = ""
description = "Network Weather Simulator for `%pyro`/`%aqua"
reward = "TBD"
assignee = [""]
champion = [""]
grant_id = "B0362"
completed = false
canceled = true
+++

`%pyro` and `%aqua` are virtualization tools that allow developers to run one or many virtual ships within their ship. This opens up many testing possibilities, since it's possible to spin up an entire fleet of virtual ships with state and orchestrate them within your ship. But since all of hte ships run one one computer, the network conditions are unrealistically good. In the real world, network connections fail, time out and generally perform in unexpected ways.

Write a library that allows developers to easily add realistic "network weather" to fleet testing in `%pyro`/`%aqua`

