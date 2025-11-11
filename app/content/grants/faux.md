+++

title = "Faux"
date = "2022-06-13"

[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps"]

[extra]
image = ""
description = "Discord Bridge"
reward = "2 stars"
assignee = ["~midsum-salrux"]
champion = ["~littel-wolfur"]
grant_id = "P0145"
completed = true
canceled = false
link = "~tomdys/the-faux-shore"
deliverable = "~midsum-salrux/faux"

+++

# Background

Every community should be on urbit. Currently, many of them are on discord. This is particularly true of DAOs and creator-centered groups who would be a natural fit for us. But even if some members are interested in urbit, it's not easy to get everyone to pack their bags and move to a new platform all at once.
This was the motivation behind the first version of Faux, a bridge between discord and urbit groups. When a member posts a new message in your discord group, a bot reposts it in your urbit group, and vice versa. This is implemented with a python program over the urbit airlock. It works, and is in use by several groups, but it's difficult and frustrating to set up and configure.

For this project, I will rewrite the Faux discord bridge as a native gall agent and create a frontend app to configure it.

# User Stories

- As a community runner, I can create a bridge between my discord group and my urbit group.
- When the bridge is established, I can talk to my discord friends from urbit, and they can talk to me from discord.
- I can choose which channel on my urbit group corresponds to a given channel on my discord group.

# Milestones

### Milestone One - Implement discord bridge backend

Expected Completion: Mid-July 2022 (six weeks)

Payment: One star

Feature parity with current python implementation: select a discord channel and an urbit groups channel, and your ship will echo messages between them.
Configuration will be through dojo commands at this stage.

### Milestone Two - Create configuration app

Expected Completion: Early September 2022 (six weeks)

Payment: One star

This will be the flow for bridging a new group:
- Guide the user through obtaining their discord bot token and inviting their bot to their discord group (with links and screenshots in the app).
- Have the user choose an urbit group to bridge.
- Show the user a list of their discord channels. When they choose one, show them a list of their urbit channels to link it to.
- The user can also view and manage their existing bridged groups through the frontend.
