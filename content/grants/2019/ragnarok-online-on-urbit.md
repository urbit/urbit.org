+++
title = "Ragnarok Online on Urbit"
date = "2019-08-29"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "App Dev" ]

[extra]
image = ""
description = "Landscape app that supports registering an urbit ID with an RO server, exposing various account management actions and guild / channel chats"
reward = "3 stars"
assignee = ["~littel-wolfur"]
id = "2084005955"
completed = false
canceled = true
link = ""
+++

# Ragnarok Online on Urbit

This is a Landscape / Gall app proposal for registering an urbit ID with an account in an MMORPG, with initial support for Ragnarok Online and exposing various actions like inventory management, friend lists, guild / main chat, and in-game market tools. Most importantly, account state will be persisted on your ship and can be transferred between supported servers.

RO has a large but fragmented private server community. Both the server and game clients are heavily customizable, and there are open source tools that can manipulate the server state through the browser (create accounts, browse in-game player shops, etc).

Since these servers are usually run by individuals, there is a very high turnover rate, with some servers not even lasting a couple months. This is very frustrating for players and is one of the main reasons people stick with the official servers, even though they are plagued with gold sellers and bots.

But if your character state is linked to your urbit, this frustration is mitigated - you can just move to another server that will accept you. You could even register that character with another game, provided that there is some sort of mapping for acceptable character states.

I see this as an ideal test bed for demonstrating the practical value of urbit ideals like persistence (never regret the grind again!), digital ownership (virtual items tied to your urbit id), and networked computing (automatic guild <-> group mappings, persisted friend lists). It could also be a way to get a sizeable and dedicated gaming community onto urbit. Custom quests / areas where players can learn about urbit could easily be implemented.

Other potential outcomes:

- In game chat channels can be mapped to urbit chats, or to urbit itself, meaning you can get in-game code evaluation. Ad-hoc addons for boss fights, guild events, and market trading maybe?
- An emergent reputation system - players won't want to join servers that have corrupt GMs or excessive botting, since those servers will likely be blacklisted and your character won't be transferable. Servers might also identify stars that sell planets to gold sellers and ban planets under them.
- Patreon-esque donation system when we get bitcoin wallet support.

## Milestones

### Gall app

1 stars
A gall app that handles updates to all linked character states and relevant game state. The data model should be constructed with an eye towards supporting multiple games and permissioning

### Frontend UI

1 stars
Character and game state display. Should be able to view various server and character stats as well as read chat channels. Character creation and account deletion as well.

### Working connection to RO server

1 stars
A customized urbit RO server that only accepts @p logins and a documented communication pattern with the gall app.
