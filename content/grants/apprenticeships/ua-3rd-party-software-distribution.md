+++
title = "Kernel Apprenticeship: 3rd Party Software Distribution"
date = 2021-02-01
[taxonomies]
grant_type = ["apprenticeships"]
grant_category = ["App Dev: Core"]
[extra]
image = ""
description = "3rd party software distribution infrastructure"
reward = 5
mentor = "~wolref-podlex"
assignee = "~sovmep-ripsum"
completed = false
work_request_link = "https://airtable.com/shr4qt9t9kz7RaOIa?prefill_Grant+ID=B0025"
+++

## Scope

Ultimate goal: 3rd party software distribution

Key results:
- Virtual desks
- Tools to manipulate and inspect them

Background reading:
- Thread about 3rd party software distribution: https://groups.google.com/a/urbit.org/g/dev/c/zNK_-Z4gDNk/m/FM4PP2kxCAAJ
- Description of merge strategies: https://github.com/urbit/urbit/blob/729802102b788fd51e4e9afe8580b370f5119073/pkg/arvo/gen/hood/merge/help.txt

Step 1 is to build a simple tool to see the difference between desks.  For an example of a file diff, try running `-diff %/app/lens/hoon %/app/glob/hoon`.  Mainly, we want a recursive version of that, with options to display the full diff or just list the files which changed.  Ideally we'd also have a 3-way diff, but that could be delayed.

Step 2 is the hard one: as described in that urbit-dev thread, add "virtual" desks to clay.  These represent the continual merge of several other desks.  Their main properties are:

- No committing directly to the desk, the only permitted manual modification is to change the list of source desks (including order and merge strategy)
- Every time a source desk is updated, the next commit is a brand new merge of all the source desks, in order according to their merge strategy.  Possibly the previous version should also be listed as a parent.
- The list of source desks is ordered, includes a merge strategy, and each desk may be pinned to a revision.

Step 3 is to make the %home desk virtual.  There should probably be another local desk which is a source of %home for local modifications.  This step could be a bit finicky but shouldn't be too hard.

With these steps complete, the infrastructure side of 3rd party software distribution should be complete.

Future work:
- UI stuff
- Port forward pottery for debugging (https://github.com/urbit/pottery)

## Compensation

* Parts 1 & 2: Two stars, one awarded after a month of work, another awarded after completion of Part 2. 
* Part 3: One star awarded after one month of work, two additional stars awarded after completion of Part 3, which is completion of the project.
* Total: 5 stars for ~2.5 months of estimated work. 
* "One month of work," if not resulting in a finished milestone, will be evaluated by the Tlon engineer working on the project with you for determination of reward eligibility.
