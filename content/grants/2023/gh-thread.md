+++

title = "GitHub Installation Thread"
date = "2023-08-07"

[taxonomies]
grant_type = ["Bounty"]
grant_category = ["Other"]

[extra]
image = ""
description = "Allow direct installation of repos from GitHub."
reward = "2 Stars"
assignee = [""]
champion = ["~lagrev-nocfep"]
grant_id = ""
completed = false
canceled = false

+++

# Description

While the Urbit network has on-network code distribution support, most code is still posted primarily to GitHub.

Developers tend to work with either fresh moons or fakeships.  This means that `|install` from the live network is frequently not a good option.

Having a thread to directly install code from a GitHub repo to a new desk will ease the development experience and provide a new way to provision ships.

A command such as

```
-install 'https://github.com/sigilante/l10n'
```

should be able to pull a copy of the contents in `/src` or `/desk` in that repo and `|install` it to a new desk of the same name (in this case, `%l10n`).  The desk should be installed and operational after the thread completes.  (Perhaps an option to the thread to not `|install` would be appropriate.)

# Milestones and Compensation

## Milestone: Thread-Based Installation

Reward: 2 Stars

Timeline: 2 Months

Deliverables: 
 - A thread which successfully installs a GitHub Urbit app (with a specified repo structure) to a new Clay desk.
 - Documentation for `developers.urbit.org` and a good working example.
