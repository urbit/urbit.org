+++

title = "%work"
date = "2024-08-18"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Other"]

[extra]
image = ""
description = ""
reward = "1000 USDC"
assignee = ["~polrel-witter"]
champion = ["~tamlut-modnys"]
grant_id = "P0385"
completed = false
canceled = true

+++

# Proposition
As a Userspace developer interested in contributing to apps I have installed on my Urbit, or as someone who has written a popular app interested in outsourcing some of its development, it'd be nice to have a central place for "pending work" such that open tasks for a given desk can be surfaced to possible contributors. Currently, pending work on Urbit is mostly managed through Github repos, inline TODOs, or private roadmaps making it difficult for collaboration to take place.

%work enables desk developers to surface inline tasks within desk files to subscribers (an audience likely to have an interest in improving it) and easily generate %funding campaigns to finance their execution.


# User flow
- ~zod, developer of %some-desk, installs %work and defines the task hint (e.g. TODO, XX), which is used to parse out tasks within %some-desk to surface in %work's frontend, and configures some rudimentary permissions such as whether task assignment must be approved by the desk developer before claimed.
- ~bus is already subscribed to %some-desk and sees its tasks in %work, along with other desk tasks that have been configured. Here they can browse tasks to possibly take up.
- ~bus claims a batch of tasks for %some-desk which gives them the option to generate a %fund campaign to finance the execution. It's also possible - - ~zod included a bounty amount for the tasks selected, which will be auto-populated as pledges by ~zod when the campaign is created. Alternatively, ~bus also has the option to claim them charitably.
- The campaign will launch according to the rules ~zod configured.


# My background
I've been developing on Urbit since 2022. Projects include:

%gather: A meetup app for Urbit. It was executed as a UF Grant.
%talk-cli: Apprenticed under ~palfun-foslup to revive Tlon's command-line chat app.
%live: A general-purpose, event coordination app.
%cave: A small art project.

*%work will be distributed from ~mocbel. Apps I currently maintain can be found there, too.


# Funding proposal
Since %work's core proposition is to provide better UX for Userspace developers to fund apps they maintain, my plan is to test this workflow by crowdfunding %work itself. Consequently, I'm submitting this grant proposal as a request for contribution to the crowdfunding campaign that launched in July of 2024.

Currently, ~tocwex's %fund only supports USDC and WSTR currencies so my request is for a portion of the campaign total, denominated in USDC, or help in finding donors. The total amount I'm requesting is $1,000 + 2 Stars. 

[Here's a link to the campaign](https://zyx.polrel-witter.xyz/apps/fund/project/~polrel-witter/work-discovery)


# Milestone 1: %work desk creation and task surfacing
Install %work in Landscape and see a list of tasks across all desks installed. Desk developer can configure a custom hint (e.g. TODO, XX) which will be used to hunt for tasks within desk files to surface on the frontend.

Scope:
- Agent types, state, and subscriptions
- Task parsing
- Local desk commit tracking and updates
- Basic frontend that organizes lists of tasks by desks installed


# Milestone 2: Contributor request and assignment flow
As a desk developer, permission tasks by desk to require approval before assignment and perform basic contributor management such as seeing contributors by tasks and being able to quickly open a DM channel. As a contributor, claim or request to be assigned to batches of tasks and see a list of tasks assigned to you, organized by desk.

Scope:
- Permissioning functions
- Task claim and request functions
- Tlon message channel connection
- Expand frontend to accommodate these features


# Milestone 3: %fund integration
Generate %fund campaigns to finance task execution. Contributors can batch up tasks and programatically bridge them into a %fund campaign. Desk developers can bake dollar amounts into an inline task, and if %fund is installed on their ship and a campaign is launched with it included, the amount will auto-populate as a pledge backed by the desk developer.

Scope:
- Programatically bridging batches of tasks into %fund
- Dollar amount parsing
- Automatic %fund pledge creation
- Trusted oracle connection
- Expand frontend to accommodate these features