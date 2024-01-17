+++
title = "Keep" 
date = "2022-11-25"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev"]

[extra]
image = ""
description = "Keep: Arbitrary Agent State Restoration Agent + Wrapper"
reward = "6 star"
assignee = ["~wicrum-wicrun", "~sogrum-savluc"]
grant_id = "P0184"
champion = ["~rabsef-bicrym"]
completed = false
+++

## Purpose
Keep is Urbit’s first agent-state backup utility. Outside of the Flag Day script and other areologic phenomena, the breach has been an impenetrable barrier for Urbit pilots and their data. Agent state has been, as a result, considered ephemeral trans-breach.

## Rationale - Keep

Urbit will eventually be a perfect diamond protocol at the center of a computing dynasty. Until that time, however, people will experience issues with their urbits. Sometimes, people will breach. 

Unfortunately, to date, data continuity across breach has remained technically possible but practically impossible for users.

![a recent question in urbit community about restoring groups across breaches](https://i.imgur.com/i1xMhH1.png)

Enter Keep!

### Keep

As new and interesting software appears on network, users create an ever-expanding series of data-persistence expectations that Urbit must uphold, in order to gain their trust. Backing up agent state, therefore, needs to be a protocol that a user can **_arbitrarily apply to any agent they use, regardless of whether the original code afforded for such backups_**. Keep is that protocol. Utilizing a wrapper library, a user can add backup functionality to any agent. With the Keep agent, that library-wrapped agent's state can be held and hot-reloaded into an agent, should it be `nuke`d or otherwise lose its state.

## User Stories

* Import
    * [ ] Recover an Agent's `state` from a saved file - potentially transferrable between ships, or at least over rifts
* Export
    * [ ] Export an Agent's `state` to a file on underlying file system (e.g. Unix) - in the `/path/to/pier/.urb/put` directory
* Backup/Restore
    * [ ] Backup an Agent's `state` to a central agent, on the same ship or a moon of that ship, or many ships (distributed backup)
        * [ ] Once and/or on a recurring basis
    * [ ] Restore an Agent's `state` from a central agent, on the same ship or a moon of that ship
    * [ ] Request from a backup provider that, should I ever breach in the future, they will automatically send me a DM with instructions on how to restore the agents whose states they store for me

### Export to Disk - Details
* [ ] User can see and select from available Agents that have been wrapped in Keep's library
* [ ] User can select an Agent to back up to disk
* [ ] User can click a button to begin the export
* [ ] User is told that the export will/has begun and is given an indicator as to where the file will go (this will always be the `/path/to/pier/.urb/put` directory, but we can also specify, a priori, the file name)
    * [ ] User's data is exported to an intelligibly named folder - if backups are recurring, some indication as to recency of the last backup is provided to the user.

### Import from File - Details
* [ ] User can import a `jam` file of agent-state, if that jam file is saved on a mounted disk available to the ship in question.
* [ ] User can import a `jam` file of agent-state through a web-portal to avoid impacting clay and loom size more than necessary.
* [ ] User's `jam` file is applied as restoration-of-state to the agent to which it belongs.
* [ ] User is informed that the restoration is underway/has completed

#### Network Restoration
* [ ] User is given instructions to wrap an agent
    * Currently, this requires a code modification, see implementation notes.
* [ ] User can see all "wrapped" agents

##### Backup (User)
* [ ] User can choose to backup an Agent's `state`:
    * `once` - an instant time
    * `many` - on a recurring basis, every `x-time`
* [ ] User is informted that a backup is underway/has completed successfully
* [ ] Users can see any backups they have currently stored, per Agent

##### Restore (User)
* [ ] Users can choose to restore an Agent's `state`
* [ ] User is informed that a restoration is underway/has completed successfully

##### Backup (Server)
* [ ] Admin can manually (de/)whitelist ships that can send them backups
* [ ] Admin can automatically (de/)whitelist ships using `gora` or the bitcoin wallet
* [ ] Visualize which pairs of ships and their agents are stored in backup, accompanied by their size

##### Restore (Server)
* [ ] Admin can toggle between automatically sending (or not sending) instructions via DM to any breached ships (by reading azimuth state) for which Admin holds backups

## Milestones

* **Milestone 1:**
    Delivery: November 20, 2022

    Reward: 5 stars

    Tasks:

    * [ ] Keep is available for installation from a distribution moon.
    * [ ] Keep distributes with its wrapper library and full documentation on `%docs` that walks a user through adding the wrapper library to a software of the user's choice
    * [ ] Keep's "server" system is implemented to install locally, however instructions for prospective providers are included in the `%docs`.

* **Milestone 2:**
    Delivery: Pending on Solid State Subscription

    Reward: 1 Star

    Tasks:

    * [ ] Keep is implemented with Glue + Bank - Glue is an upcoming middleware aggregator system that will make appending and prepending agent transformers to an agent easier. Bank is a system whereby use of an agent can be payrolled. With these two component parts, Keep will be a viable service model for providers - they could charge to back up and maintain state for their clients and gate restoration functions behind the same paywall.

* **Milestone 3**

    Delivery: After Milestone 2, Community Outreach Required

    No Additional Compensation

    Tasks:

    * [ ] Keep is in use by some hosting provider to provide backup and restoration utilities to their Urbit clients.
        * [ ] Provider speaks to this fact.
    * [ ] Agents are being shipped pre-wrapped in Keep for convenience.
        * [ ] Developers speak to this fact.
    **No Additonal Compensation**
