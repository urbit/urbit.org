+++

title = "Implement a Git server on Urbit"
date = "2023-06-01"

[taxonomies]
grant_type = ["RFP"]
grant_category = ["App Dev"]

[extra]
image = ""
description = "Implement a Git server capable of hosting desks as repos"
reward = "TBD"
assignee = [""]
champion = [""]
grant_id = "P1001"
completed = false
canceled = false

+++

A Git server backend would open up the use of Urbit ships to interface with remote developers and resources.
An Urbit implementation of Git would not have to implement all of the features that a Git server typically
expects, merely the ability to interface through clone, fetch, and merge operations and through the https and git
protocols.  (Obviously sufficient internal representations of Git objects, diffs, and so forth are necessary as well.)

Having an Urbit-native Git server-side representation has the potential to revolutionize the Urbit developer
experience.  Not only would it become possible to synchronize Clay and host OS files through `git`, but Urbit would
also have direct access to the wealth of Git-based resources on the broader web.  More than this, **Urbit would
immediately become capable of being a fully decentralized Git repository system.**

A solution could be built directly in userspace or on top of Clay.  If Clay is used, then there would need to be a
way for an unvalidated desk (no mark validation) to store data prior to use in Urbit, e.g. fed up to a functioning
regular desk or read out (via remote scry or otherwise) to the Git-based world. In this case, Git operations would
be done at a Unix command line regularly and Urbit would serve as a central repo or distribution point. (This could
ease development through the appropriate use of scripts, CI and testing, and hooks.)

A fully userspace solution would be viable, as long as it was able to export a Git-compatible representation via the
API, and as long as it spoke `https` and `git` at a minimum.

(Note particularly that this is not an implementation of `git` on Urbit, but an implementation of a Git repository
server.  The `git` CLI would encompass a complementary set of concerns and operations.)
