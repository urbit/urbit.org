+++

title = "Modernize |mass"
date = "2023-09-01"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = "Updates the |mass utility to reinject the output into arvo from the runtime."
reward = "1 Wrapped Star"
assignee = ["~dozreg-toplud"]
champion = [""]
grant_id = "P0294"
completed = false
canceled = false

+++

# Description
Currently, memory reports are produced with |mass command. This command passes a %heft task to Dill, that in response passes a %whey note to Arvo, which in turn triggers mass report printouts in the runtime. In this implementation the report is not accesible from within Arvo, which makes it more difficult to manage the reports: storing it, sending to other ships for debugging or analyzing it locally.

An alternative to this would be a -mass thread, which would subscribe for a memory report result. The thread would have to pass the task to a vane, because Gall agents do not have a direct access to Arvo IO. It could be Dill like it is done right now, or Khan since it allows to handle threads. The vane that handles the task would produce a unix card for the runtime, which in response would inject a noun into the vane. The vane would then forward the noun back to the thread to return it.


# Milestones

## Milestone 1

Have a thread that ends up sending a %whey gift through a vane to the runtime, and have the runtime to return a noun [0 1 0], which then gets routed back and returned by the thread as *mass = [%$ %.n ~]

## Milestone 2

Update runtime to have it returning the actual memory report instead of the placeholder.


# Total Compensation

Reward for each milestone: 0.5 WSTR

Estimated time for each milestone: 1-2 months

