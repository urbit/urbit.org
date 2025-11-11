+++
title = "UTurn"
date = "2021-10-28"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["Dev: Apps", "Dev: Tool"]
[extra]
image = ""
description = "TURN server support for WebRTC"
reward = "1 star"
assignee = ["~martyr-binbex"]
grant_id = "P0088"
completed = true
link = ""
+++

## Overview

WebRTC over Urbit needs TURN servers to relay the voice and video data. TURN servers are relay servers used when peers are behind NATs and can't make direct connections. Because they relay video and voice data they consume a lot of bandwidth. Therefore there are no free TURN servers on the internet. This makes running one a great service for stars to provide.

We need a way for a ship operator to easily run coturn (an open source TURN server) and allow other ships to use it.

## Deliverables

Expected completion: 31 Dec 2021
Payment: 1 star

### coturn docker container

coturn has an official Docker container. Create a new container from the official one with easy customization so that ship operators can drop it in a container service and go.

### uturn gall agent

Write a gall agent called uturn which makes calls into coturn's rest interface. It needs a generator to configure the url of the coturn server (which is not necessarily running on the same machine as the ship) and whatever authentication password is retrieved from the docker container. uturn should also be able to find authenticated STUN servers. The agent should have a poke to open a new TURN session for a client and return a one-time password. It should use a whitelist to gate access from ships.

### icepond integration with uturn

Integrate icepond with uturn so that it can find configured TURN and STUN servers and advertise them back to clients. This requires writing a thread that pokes uturn and returns a list of server/auth details.
