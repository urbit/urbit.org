+++

title = "Success Metrics for Urbit Apps"
date = "2023-02-09"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Success Metrics for Urbit Apps"
reward = "5 Stars"
assignee = ["~bacwyl-samweg"]
champion = [""]
grant_id = "P0235"
completed = true
canceled = false

+++

# Description

The current absence of success metrics for Urbit apps makes it challenging for developers to determine the reach and impact of their software. Without a central app store, it is difficult to obtain information on the number of downloads or daily active users for a given application. This proposal aims to address this problem by providing developers with low-level access to the number of downloads and higher-level tools to facilitate the privacy-compliant collection of daily active user metrics. This will provide valuable insights for developers and support informed decision making for urbit app development.

# Milestones and Compensation

## Milestone 1 - Surface App Downloads Data

Create access to the total set of users who are synced to a local desk. This currently represents the total userbase of an app, since almost all apps on urbit are distributed from a single source. It could also be useful for other purposes, such as the ability to anticipate congestion when shipping an OTA.

There is already [an open PR](https://github.com/urbit/urbit/pull/6136) for this milestone.

Reward: 1 Star

## Milestone 2 - Collect App Downloads/Time

Create an agent that periodically records the data from milestone 1 for locally published apps. This represents growth data, or how many ships-per-day are downloading an app. It’s helpful to visualize this as a multiple line graph. For example, a developer can see the point in time when App A surpasses App B in downloads.

The state of the agent would be something like `(map app-desk=term [users=(set ship) growth-data=(map time number-of-users=@ud)])`

The agent should expose a local scry endpoint for this data that is available as CSV so that developers can easily export and analyze.

Reward: 1 Star

## Milestone 3

### Package and Distribute

When milestone 2 is completed, it can immediately be published as an urbit app that developers can |install to their distributor ships. Further milestones can be incremental improvements to this app. The app must be stable for initial release and available for at least the following few months. The codebase will be open sourced with sufficient documentation for developers to install manually. The app will be fully workable from the dojo, and will not depend on a javascript frontend.

### Collect Daily Active Users

This milestone can be considered complete when app developers can optionally collect ‘daily active users’ without having to intrude on privacy, and without having to reimplement code specifically for this purpose. For this milestone to be complete, some solution to this problem has to be made available to app developers. This code will also need to be open sourced and sufficiently documented. The exact nature of this solution has not yet been determined, but it will most likely conform to the following architecture.

### Architecture

A central, developer-hosted poke endpoint where logs can be sent from user agents.

1. Bob installs :app-metrics on ~dister

2. He can use this agent to access milestone 1, 2 data for his apps

3. He can optionally add a wrapper agent to his apps to send some logs to ~dister:app-metrics

    a. This requires some self-poke to be added to the inner-agent which will be ignored by the inner-agent but caught by the wrapper agent. The wrapper will then send a poke to the central :app-metrics agent, indicating user activity. This poke should be added in a place that indicates real user interaction, such as opening a frontend subscription or sending a DM.

    b. To avoid creating too much network activity, the wrapper agent will send a maximum of one poke per day, just to indicate that the user used the agent that day.

4. Users can opt-out by setting a boolean in the wrapper agent.

5. Daily-active-users data can now be scry’d as a csv file from the central agent.

Reward: 3 Stars
