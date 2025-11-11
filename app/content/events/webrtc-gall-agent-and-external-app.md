+++
title = "WebRTC Gall Agent and External App"
date = "2021-01-11"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps", "Dev: Tool" ]

[extra]
image = ""
description = "Add WebRTC support to Urbit, including call/stream setup and teardown messaging and ICE/STUN/TURN advertisement and authentication."
reward = "8 stars"
assignee = ["~ritpub-sipsyl"]
id = ""
completed = true
canceled = false
link = ""
+++

## Overview

Adding the ability to make encrypted media calls between Urbit ships, using only Urbit as a signalling channel, without a centralized intermediary, would provide real utility and an immediate boost in the excitement in the end user interface.

WebRTC provides media device (camera/speaker/microphone) discovery and peer-to-peer encrypted transit of media. It is supported by all major browsers as well as libraries for many major programming languages.

WebRTC relies on external signalling, implemented by the application developer, to handle connection negotiation and call setup and teardown.

This creates a natural synergy with URbit, as Urbit provides a hierarchical peer-communication system between known addresses with reputation. A WebRTC Gall agent would provide a solution for coordinating real-time media communications between Urbit ships.

## Deliverables

### WebRTC Gall Agent

This will serve as the signalling channel for Urbit WebRTC applications. WebRTC requires an out-of-band channel (in standard usage usually implemented as an HTTP REST API) which can receive connectivity information from peers and distribute it to peers.

### WebRTC calling app

This would be an external (probably in-browser) app which would provide the initial end-user interface for

- making two-way media calls
- making n-way media conference calls
- streaming media from one peer to many

## ICE/STUN/Turn advertising

A separate Gall agent would initially allow stars to advertise ICE and STUN servers for use by sponsored planets and their moons. WebRTC depends on ICE and STUN to allow NATed and firewalled peers to negotiate peer-to-peer connections.

The last milestone would be to add TURN advertising with authentication to this agent. TURN servers provide relay services for peers which cannot directly connect, thus they are much more expensive, especially in terms of bandwidth, than ICE and and STUN. This should permit stars to specify which planets are authorized to use the TURN server, and, in the planet instantiation of the agent, seamlessly offer this information to WebRTC and other applications using the agent.

## Beyond

The proposer would eventually like to see media streas themselves propagated via Urbit. To achieve this, however, it would be necessary to:

- Create a performant method (likely a vane) for passing network messages which are not retained in the event log
- Significantly improve Urbit's NAT traversal and firewall hole-punching abilities to match the state of the art. (this has been discussed with, among others, ~ritfed-tabrg and ~wolref-podlex).

## Team

Edward Amsden (~ritpub-sipsyl) is a vertan software developer and principal of Black River Software. He has spent the last 5+ years working on industrial IoT solutions in Haskell as a contractor for Plow Technologies.

## References

[Mozilla Developer Network WebRTC walkthrough Dealing with connectivity](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling)

## Milestones

### Gall agents (WebRTC, ICE/STUN)

2 stars
A Gall agent which handles exchanging SDP messages for WebRTC applications Another Gall agent which handles advertising ICE and STUN servers from stars to planets

### Standalone WebRTC-via-Urbit-app

4 stars
Urbit app running in browser and hosted/interfaced via Eyre which provides the three categories of calling functionality described in the body of the proposal

### Authenticated TURN advertising

2 stars
Extension of the ICE/STUN Gall agent to allow stars to advertise an authenticated TURN server to some or all of their sponsored planets. Extension of the WebRTC application to use TURN servers.
