+++

title = "Hoon Linter"
date = "2023-03-21"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Core Dev"]

[extra]
image = ""
description = ""
reward = "2 Stars"
assignee = ["~watter-parter"]
champion = ["~rovnys-ricfer"]
grant_id = "P0224"
completed = false
canceled = false

+++

# Description #

Most languages have some form of "linter" available that reports potentially-problematic code. Typically, such code will successfully compile, but will fail at runtime or produce otherwise undesirable results. Because the code is technically valid, it cannot be rejected by the compiler (at least, not without changing the language spec, which risks breaking existing programs), but we can still warn the programmer that what they are doing is likely to cause problems.

I have started work on a "Hoon linter" that serves this purpose. The linter is integrated with %language-server, and can thus report warnings directly in any editor that supports the Language Server Protocol. The linter can also be invoked as a standalone generator. Currently, the linter only checks for duplicate union tags. I would like to add more checks to the linter, such as detecting when a noun is pinned to the subject but never used. There are also a few warts that I would like to eliminate, with guidance from someone more experienced.

# Compensation #

Reward: 2 Stars
