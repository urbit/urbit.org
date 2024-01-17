+++
title = "Runtime Apprenticeship: Debugging Tools"
date = "2021-08-19"
[taxonomies]
grant_type = ["Apprenticeship"]
grant_category = ["App Dev", "Arvo"]
[extra]
image = ""
description = "Debugging Tools"
reward = "2 stars"
mentor = ["~master-morzod"]
assignee = ["~topfet-parmed"]
completed = true
canceled = false
work_request_link = ""
+++

Develop and integrate three hint handlers for printing information about hoon programs:

- measure and print the elapsed time for a computation
- print the current stacktrace (without interrupting the computation)
- print the bytecode of a computation

The first two deliverables are tightly scoped, while the third involves a fair amount of flexibility. The format of the bytecode output is to be determined (serialized and/or summarized?), as is the granularity of the output, which could be simply the current "program" (roughly, call target) or the specified computation (as a new "program").

Adding hoon syntax for the new hints is out of scope, this milestone only includes the runtime implementation. Hint handlers will be implemented using the dynamic hint protocol, which is still new and may require some refinement.
