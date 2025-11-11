+++
title = "Chess Improvements"
date = "2022-08-22"

[taxonomies]
grant_type = [ "Bounty" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "Improvements to the Chess app, creating an Urbit Chess experience comparable to that of any modern Chess website"
reward = "3 stars"
assignee = ["~bonbud-macryg", "~nordus-mocwyl", "~rovmug-ticfyn"]
grant_id = "B0175"
champion = ["~finmep-lanteb"]
completed = true
link = ""
deliverable = "~finmep-lanteb/chess"
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0175&prefill_Grant+Name=Chess%3A%20Improved%2C%20Timed%2C%20%26%20Rated"
+++

# Rationale
[Omitted long matching line]

The goals of this bounty are to resolve the quality of life issues present in the Chess app, as well as enable timed and rated games.

# Deliverables
## Enhanced Chess Experience
Resolve the open issues on the [Chess app GitHub page](https://github.com/ashelkovnykov/urbit-chess/issues). Prior to starting work, the grantee and champion will meet and mutually agree to a specific list of numbered issues included in the scope of this deliverable.

## Timing Server
Design and implement a timing server which can be operated by a third-party to play timed games. Ideally, this would be a generic timing server so that any future game could use it as a piece of infrastructure.

# ELO Rating Server
Design and implement an [ELO rating](https://en.wikipedia.org/wiki/Elo_rating_system) server which can be operated by a third-party to track player skill ratings. Ideally, this would be a generic ELO server so that any future game could use it as a piece of infrastructure.

# Code Reviews
The grantees would be encouraged to perform reviews of each other's code. As champion, I will perform code reviews, test all of the submitted changes, and grant final approval by merging the PRs. Since the Foundation is sponsoring the ELO and timing servers, I think it's fair if it appoints a secondary reviewer to represent their interests for those two milestones. Otherwise, I'm perfectly satisfied to take on the above responsibility for those two milestones as well.

# Champion Time Commitment
~finmep-lanteb is able and willing to spare approximately an hour per day for the purposes of meetings, design aid, or to otherwise supporting the bounty. Travel and family matters crop up, so this can instead be measured as "~7 hours per week".

# Expected Completion Time:
For a team of 3, this should take no more than 2 months

# Number of Grantees
Never say never, but there is a strong preference for 3 novice developers to work on this. This bounty is just begging for people breaking into Urbit/coding to take it on.

# Milestones and Compensation
Each of the three Deliverables above is a milestone. However, since the reward is 3 stars and designed to be completed by a 3-person team, it seems likely that the compensation schedule would be "1 star per person upon full completion". Specific details will be agreed upon with the contributor team prior to starting work.

**Bonus** 3 additional stars will be paid to the contributors (1 each) if work is completed before October 2023


