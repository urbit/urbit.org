+++
title = "Minimal Urbit OS"
date = "2021-01-19"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Core" ]

[extra]
image = ""
description = "A Linux based host OS with only the essentials needed to run Urbit, designed to help the process of getting Urbit running on bare metal"
reward = "6 stars"
assignee = ["~forfel-norfel"]
id = "1935638429"
completed = false
canceled = true
link = ""
+++

This will be a minimal Linux-based operating system designed for running Urbit. It will include only components essential to keeping a ship running smoothly in a specific but reasonably obtainable x86 environment (UEFI, Ethernet with DHCP, generic Intel or VMware hardware, etc).

It will be designed and built with the larger goal of identifying and isolating all functionality that is missing from Urbit so that those features can be added and Urbit will gradually move closer to running directly on hardware.

This OS is intended to be a foundation for most of the different environments where people will want to run Urbit. It will be simple for future projects to combine this OS with an overlay that includes software specific to the target environment.

Possible environments:

- local server
- single cloud server
- planet hosting provider
- laptop running Urbit with a native interface for Landscape
- one click Windows app that runs everything in WSL or a VM

All management functionality that will be essential regardless of environment will be included and exposed through a basic API. This API will most likely be a command line program, and it will simplify tasks like breaching by combining multiple steps into a single, reliable command. While there are most likely existing scripts to handle some of these tasks, it will be necessary to adapt those processes to this new OS since some things will be missing or work differently.

Qualifications: I recently installed Gentoo on a 20 year old ThinkPad for fun.

## Milestones

### Proof of concept

1 stars
A minimal VM that supports booting and running a comet for several hours with a small amount of manual setup

### System architecture plan

1 stars
A diagram and written overview of all components and their dependencies, explaining how the system works and why those components were chosen. I will seek input from Tlon.

### Usable OS image

2 stars
A reasonably stable and complete OS image that testers can use for hosting their planets

### Documentation and fixes

2 stars
Documentation for the entire system and build process, including specs for each component and ideas for replacements within Urbit. The OS will be updated to address known problems.
