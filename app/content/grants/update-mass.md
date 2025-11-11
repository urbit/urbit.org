+++

title = "Modernize |mass"
date = "2023-03-02"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Dev: Core"]

[extra]
image = ""
description = "Update the |mass utility to reinject the output into arvo from the runtime."
reward = "6 Stars"
assignee = ["~rivmud-fabwen"]
champion = [""]
grant_id = "P0294"
completed = true
canceled = false

+++

`|mass` is a utility for measuring a pier's resource usage. It is used for debugging and development. Currently, the output of this utility is a mixture of data from within arvo and from the runtime. This heterogeneity means that what is produced is not a noun but interleaved print statements to the terminal. 

Once `|mass` produces a noun, it can be sent to other ships over `%ames` for bug reports, collected in a central location or analyzed for further action by arvo.

Update the `|mass` utility to reinject the output into arvo from the runtime.
