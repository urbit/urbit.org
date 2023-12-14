+++
title = "Native Planet Phase 2"
date = "2022-04-07"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Other" ]

[extra]
image = ""
description = "Native Planet - A domestic hosting solution for Urbit"
reward = "6 stars"
assignee = ["~dalhec-banler"]
champion = ["~poldec-tonteg"]
grant_id = "P0126"
completed = true
canceled = false
+++

## Native Planet Phase 2 - Software Stack Development + Integration, Service development, Production model

## Overview

The purest Urbit experience is hosting your own ship at your home, on your desk at work, or wherever you want to keep a small, well-designed piece of hardware. This "box" will include a small but powerful chipset that will be custom built for Urbit's unique needs, featuring fast read/write speeds, a durable HD to handle re-writes, RAID or remote encrypted backup, and easily expandable storage. Ideally, the components should be available as an open source hardware project. The Native Planet is a powerful, simple and hackable implementation of these features. You will be able to purchase the Native Planet as a hacker kit, or as a fully assembled piece of high-end hardware that offers a plug and play solution for less tech-savvy users. Building hardware for Urbit is a bit of a moving target this early in the game, but building something that is modular, customizable, hackable, and powerful enough for now, and the foreseeable future, will both aid in development of future hardware and satisfy the needs of current users.

Phase two of the project will focus on UX and custom integration of the Home-Urbit software with the Native Planet Hardware. It is worth noting that the Home-Urbit software project is currently being developed by Odysseas Lamtzidis under a separate grant, and work will continue on Home-Urbit outside of its Native Planet integration. That said, integration of these two projects is key to building a true plug-and-play product for the NativePlanet end-user. Integrations will require front-end development, hardware specific low level programming, UX design, and documentation for future development and initial customer service. Phase two will grow the Native Planet team and add features to the project, such as encrypted backup, hosted web endpoints , and native S3 buckets.

## Home-Urbit Integration + Front End Development

The final version of the Native Planet will extend the proof-of-concept prototype to a consumer-ready, first class Urbit device. Thoughtful design, a pre-configured software stack, and powerful hardware will make the experience of running a ship akin to operating a simple home appliance. A non-technical user will be up and running within minutes of downloading their keyfile, with all of the accouterments available to technical enthusiasts and none of the maintenance burden.

## Milestones

### Phase Two - Milestone 1 - Anchor server and Onboard Screen UI

Expected Completion: 30 May 2022

Payment: 3 stars

Anchor Server

- Hassle-free provisioning of a publicly-accessible proxy for Ames and Landscape

- Transparent NAT traversal via automated WireGuard configuration

- Automatically configured domain and TLS for HTTPS ship access

- Automated provisioning of public S3 bucket accessible via hosted subdomain

- Ships with commercial version, open source/self-hosted version of server software available

Onboard screen UI

- Simple informational screen on the chassis

- Display access URL information & access code on initial boot

- Display ship information and hardware diagnostics post-boot

- Idle screen ‘planet pass’ graphic a la Bridge (contingent on HDMI screen)

- User interaction via pleasant analog dial knob

### Phase Two - Milestone 2 - Production

Expected Completion: 30 July, 2022

Payment: 3 stars

Production UX

- True plug-and-play – copy keyfile onto a USB drive, insert, and turn on

- Zero-configuration setup for public web access

- Simple web management UI for device & underlying OS

- Automated, secure remote backup

- Support multiple ships on one device

Production hardware

- Sourcing and assembling the consumer model of the Native Planet

- Open source design and configuration

- Optional RAID1 configuration for auxiliary Sata SSD drives

- 3D printer STL models for case components
