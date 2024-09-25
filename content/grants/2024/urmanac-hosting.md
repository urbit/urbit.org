+++

title = "Urmanac Operationalization and Hosting"
date = "2024-09-25"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Other"]

[extra]
image = ""
description = "Support and host the Urmanac, a repository of information about the Urbit ecosystem."
reward = "4 Stars"
assignee = ["~socryx-topled"]
champion = ["~tamlut-modnys"]
grant_id = "P0394"
completed = false
canceled = false

+++

## Overview

The Urmanac is a user-friendly catalog of all the apps that are known to be
available, or have ever been on Urbit. While the creation of this content and
the structure is largely complete thanks to volunteer efforts, keeping it
up-to-date is something that will fall on the community to ensure long-term
viability. Ongoing maintenance will require input from numerous contributors.

Operationalizing Urmanac is both a technology issue and a community-organizing
problem. On the front end, operational affordances are needed such as: domain
name, hosting service, and a site administrator in charge of general upkeep.

On the back end, for community organization, an ideal solution enables many
parties to contribute, enjoining many authors, editors and perhaps a board of
admins if the project is to attain long-term success and true longevity.

## Background

This project builds on work from "Urbit Encyclopedia, Vol. 1", a failed grant
proposal which succeeded in creating a catalog of Urbit applications. It was
designed to be accessible and comprehensive, with basic information about every
Urbit app: status, authorship, how to contribute, and other encyclopedic data.

The first Urbit Encyclopedia grant was shelved due to challenges, including:

### Challenges

* While one person could gather all this information, keeping it up-to-date is
  a fully separate and non-trivial matter. The ideal solution is for Urbit app
  authors to maintain their own Wiki page, and that represents a significant
  effort of community management, plus shepherding of an editorial process.

* The Urbit-based solution that was chosen (`%wiki`, from another UF grant,
  [wiki][wiki-stella-fixa-rfp] and [wiki (2)][wiki]) is a work of art, and that
  software represents an essential component of this work; however, hosting a
  wiki on Urbit and using it as a public-facing website for mass-adoption
  presents other difficulties related to performance and site reliability.
  (I need this page to survive being posted to Hacker News.)

* Hosting providers such as Tlon and Red Horizon represent a kind of solution
  to that problem, and while they have done great things and I have no doubt
  they will continue to build up a thriving ecosystem, making a production
  website that depends on them may represent an unacceptable delegation of
  responsibility, in terms of being able to serve hundreds or thousands of
  visitors while providing for basic, reasonable service-level guarantees.

* Similarly, self-hosting a single Urbit planet on bespoke hardware "the easy
  way" or with a Native Planet, relying on `%wiki` to serve requests, may also
  represent unacceptable compromises in terms of performance, uptime guarantees
  for public-facing pages, as well as on-call and administrative scalability.

[urbit-encyclopedia-1]: https://urbit.org/grants/urbit-encyclopedia-1
[wiki-stella-fixa-rfp]: https://urbit.org/grants/wiki-stella-fixa-rfp
[wiki]: https://urbit.org/grants/wiki

### Project Invariants

* The permissions in `%wiki` are not fine-grained, perhaps nor should they be.
  (Anyone should be able to fix an issue, not only a page owner. But we should
  gate editorial controls, to promote content quality and prevent vandalism.)

* Someone responsible has to be on-call for every part that can break. Some of
  that responsibility can be delegated. We should not aim to boil the ocean!

* Static site generators and third-party provider tooling all may enable us to
  meet operational goals without compromising on performance, enabling scaling
  to a much greater number of visitors and editors.

* There must be continuity in case some third-party hosting proves unreliable.

### Decision Points

* Choosing a traditional, non-Urbit hosting provider is a reversible decision.
  We will use Fermyon Cloud to host Urmanac, and we can rely on SpinKube or
  Hippo Factory (related open source solutions) if Fermyon Cloud ever fails.
  (If Urbit and `%wiki` are mature enough for production, we could use them.)

* We will use GitHub Pull Requests, a battle-hardened solution for accepting
  contributions and for community scaling, to manage the editorial controls.

* We can incorporate Git in a way that still leverages the `%wiki` interface
  and use automation to allow Urbit IDs to continue to contribute via Git or
  non-git interfaces (eg. via ordinary edits on the `%wiki` app.)

* We can scale without requiring all contributors to know Git or be on GitHub.
  The main event is the `%wiki` app; GitHub is only a tool to enable scaling.
  The third-party hosting solution is also necessary to guarantee reliability.

This project can be completed in a way that the content and the contributor
funnel remains accessible for visitors and contributors on both sides of the
"Earth" and "Mars" divide; Urbit people, GitHub users, and plain Earth-Web
folks just visiting should all have a first-class experience of the Urmanac.

Future grant proposals might incorporate Urbit ID in the clearweb site, but
this proposal is limited in scope to compartmentalize and prove that we can
quickly solve some hard problems, making use of best-of-breed technologies with
competitive capabilities like GitHub Actions, Web Assembly, and static content.

## Milestones

### Milestone 1 - Hosting Pipeline

- Estimated Completion: November 2024-January 2025
- Compensation: 2 stars

At the end of this phase, the Urmanac Wiki is live on Urbit for contributors,
a read-only mirror of Urmanac is live and production-ready on `urmanac.com`,
and an Urbit-facing Urmanac is available to contributors, where anyone with an
Urbit ID can submit their contributions for maintainers to review in public.

The clearweb mirror is "production" and Git serves as an operational backup,
where contributors can make their proposed updates in a similar way, even when
"Urbit comms are down" for whatever reason.

Changes on the Urbit pages from arbitrary contributors get scraped and promoted
to the public site by an automatic process. The clearweb site is a static site.
It is a mirror of the Urbit wiki that is kept up-to-date by scraping the wiki.

The automated promotion results in pull requests that are reviewed by the host
of the GitHub repository (the grantee), and merging a pull request is followed
immediately by the admin manually copying the updated content back to the wiki.
The automation is a one-way sync, so changes on the wiki reflect into Git.

This is a manual process so GitHub can be leveraged for collaborative editing
with as little machinery as necessary to get a web site to production-ready.
The purpose of this promotion pipeline is to enable many authors to be safely
corralled and onboarded, and so their changes can go through editorial review
before being promoted onto the production website.

A scheduled (hourly) job scans every Wiki page and copies changes into a PR
for review.

#### Success Criteria

This milestone is complete when there is a simple flow that can demonstrate
how many authors can get their changes reviewed by a single editor, and an
"editorial board" can scale up by adding more repo maintainers on GitHub.

The production website must be continually protected from broken links. There
will be workflow automation to prevent any bad links from being approved and
promoted. This will also enable live-preview before the changes are approved.

Issue reports will be generated in an automated way whenever links go bad on
the production site, so the grantee can take action to correct them.

The products of this milestone will all be published under an MIT license.

### Milestone 2 - Operationalization

- Estimated Completion: February 2025-November 2025
- Compensation: 2 stars

The first milestone represents a "production-ready" site. The second milestone
improves upon that, to enable app authors to manage their own page's content.

The second milestone is also intended to resolve scaling issues that would have
been foreseen (and some that may only reveal themselves through experience.)

#### Scaling the Community

The `%wiki` app currently does not have fine-grained permissions, and neither
do I think it necessarily should. We can use facilities like `CODEOWNERS` to
make different individuals responsible for their own sub-section of the wiki.

A two-way sync process is part of this milestone, so not only are changes from
the Urbit Wiki copied into PRs, the merge of a Pull Request will automatically
clone accepted changes from GitHub back into the Wiki as the source-of-truth.

The process for change review and promotion should not depend on a single Git
owner or repo maintainer. It should scale past tens of editors, and editorial
controls must be decentralized and community-driven in the spirit of Urbit.

A new rolodex of developers is maintained on GitHub (as a simple yaml file) to
pair Urbit app authors' GitHub account with a `@p`, so that edits to an app page
can request the author's review on GitHub whenever any change is submitted.

Responsive, interested app maintainers who submit their GitHub ID and Urbit ID
to the rolodex can make their own changes live on the public-facing Urmanac
production website without further review. In the absence of a responsive Git
identity for an author, editorial control reverts to Urmanac Git repo owners.

#### Service Level Transparency

A status page will show the uptime of the Urmanac.com website, and the grantee
pledges to maintain a long-term Service Level of at least 99.5% availability.
The number of visitors is also counted with some granularity; it should be
possible to maintain these availability levels, even as Urmanac's popularity
grows into hundreds or thousands of daily unique visitors.

#### Contributor Flexibility

In this milestone, changes can come from either planets editing on the Wiki
app, or directly as a pull-request on GitHub.

This milestone ensures one Urmanac maintainer (or even an editorial board) is
not to be permanently required "in the hot seat." Arbitrary app authors should
be able to own their own Wiki page, and they can merge their own changes or
those submitted by drive-by contributors without involving an "Urmanac owner."

#### Onboarding App Maintainers

Some rudimentary onboarding instructions for Urbit are part of this milestone.
They will be published in place of the Wiki chrome on the clearweb mirror site.

We should take Urmanac clearweb visitors through the process of getting an
Urbit planet, with references to one or more outside guides for hosted options
or self-hosting. Once users have their own planetary ID, they are given further
instructions on how to install `%pals` and `%wiki` so they can locate the
Urmanac through peer discovery and begin to contribute changes.

No contributor is required to use either GitHub or Urbit ID; they can choose
either one. Through Red Horizon's APIs, it will be possible to streamline this
path even further, but "login with Urbit" on the static production site is not
considered to be in scope for this grant.

An alternative path guide will show how anyone with a GitHub account can
propose edits or submit new content. The changes are automatically reflected
into the `%wiki`, and GitHub itself allows resolving of merge conflicts, in
case there's ever more than one person who proposed updates to the same page.

#### On-Call Contributor Support

The grantee is on-call to support contributors, and will establish some model
for Office Hours as a component of this milestone. There will be a calendar page
where folks with specific needs can book an appointment, to enable visitors who
are in need of assistance to feel supported and enabled as part of a community.

A public calendar will also provide visibility into the times when the grantee
is making themself available to provide regularly scheduled open office hours.

The code products of this milestone and the "infrastructure plan" will also be
published with a FOSS or copy-left license. I will build on existing well-known
solutions, favoring tools with strong Open Source communities who are on Urbit
wherever a viable option is available.

The grantee commits to run the site for at least a year, to fulfill the grant.

## About Me

I am a long-time Urbit user, CNCF project maintainer (Flux), app developer, and
community manager. With `~hassun-hassel`, I helped to get a first iteration of
Urmanac to content-complete. I am a regular on `%turf` Thursdays, I am a former
Galaxy holder, and proprietor of the "Galactic Embassy Hotel" - a public group
on Tlon's app, located at `~fipdel/galactic-embassy-hotel`.

My primary goal in this project is to ensure the longevity and viability of the
Urbit Encyclopedia project, such that continuity and forkability are supported.
It should be readily accessible for the community and product resulting from
this effort to outlive my participation and for my work to become an enduring
part of the Urbit ecosystem.

I also own the `urmanac.com` domain, a private asset attached to this effort.

An earlier version of this proposal is available at [gist.github.com][gist-1].

[gist-1]: https://gist.github.com/kingdonb/49b64bb35e1de41bc19b140dfc4c5d32/10ab954f38fe36bd1df0dc588c9c884ee0246174