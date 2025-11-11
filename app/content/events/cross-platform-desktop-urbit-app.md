+++
title = "Cross-Platform Desktop Urbit App"
date = "2021-02-22"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Apps" ]

[extra]
image = ""
description = "A native app that makes running Urbit near friction-less for everyone."
reward = "10 stars"
assignee = ["nocsyx-lassul"]
id = "740109059"
completed = true
canceled = false
link = ""
+++

# Taisho, A native cross-platform desktop Urbit app

## Introduction

Urbit is gaining momentum, and soon we'll have apps that people really want to use. Currently people from outside Urbit see joining as something of a hassle or time investment that they may not want to make. Taisho will help alleviate those fears and ease people into the process of joining Urbit by running it for them.

## Features

The main feature of Taisho is that it runs Urbit for you, offering a simple interface without need for explanation to get running.

- Ease of install, simply download and run
- Boots and runs new and existing planets, moons and comets (maybe stars in the future)
- **Ship management**: keeps track of ships, auto-resumes ships when launching, giving them a user selected name, place them in a folder of your choosing, one-click ejection for moving to hosting
- **Azimuth integration**: operates locally for greater security
  - generate arvo keyfile for booting planets
  - handles keyfiles for user making first time booting less complicated
  - ensures keyfiles get deleted after use

## Potential Future Paths Unlocked

- **Plugin/Marketplace system**: would open pathways for easy transitions to hosting, planet buying, downloading and managing Urbit apps/plugins
- **Native integration**: if we were to integrate Landscape, Taisho could provide a bridge to OS operations that might be currently difficult to accomplish with the Urbit binary.
- **Education**: operations being run could be exposed through the UI so that people could learn what's going on behind the scenes in context.

## App Architecture

The current architecture is an Electron app which wraps the Urbit binary. This gets packaged into a simple zip or package installer which can be run immediately.

### Electron

The app uses principles based on this article by James Long, [The Secret of Good Electron Apps](https://archive.jlongster.com/secret-of-good-electron-apps). It is split into a main, renderer, and background process which keeps performance high. Urbit itself is spawned as a separate process which also helps keep things performant.

### Front-end

The renderer or front-end of the app is built with React, Typescript, and TailwindCSS. This should allow people who have worked on Landscape to have familiarity, and give an easier path if we were to incorporate Landscape itself in the future.

## Current Progress

Currently, Taisho is able to run on both MacOS and Linux. It can boot new comets, keep record of comets booted with it, and resume the Urbit process of the comet if it gets killed. It is code-signed with Apple so that it can be distributed easily and not require special permissions.

## Star Usage

If awarded stars, most of them would go towards offering the ability to purchase planets and immediately host them from a service I plan to build in the future, after reaching a stable point in Taisho.

## Final Thoughts

People like to jump in and experiment with things first. I think this app provides an extremely easy way to do that before committing to spending time on the network, getting hosting or buying a dedicated device, because it provides a no-knowledge way of running Urbit. It also opens a lot of avenues for Urbit. For one, it can be a kind of hub for different services, plugins, apps etc. Another possibility is embedding Landscape, to bring features that wouldn't be possible in a plain web app. I think Taisho can act as a helpful guide for many people's first trek into Urbit.

---

## About Me

My name is Hunter Miller, and I've been building on the web for 7 years. I currently work as a Senior Software Engineer for This Dot building websites and web apps for our clients. I'm focused on delivering the best user experience, which takes delicate coordination between back-end and front-end architecture to really achieve near-perfection. Throughout my time as a developer I've gained a variety of experience starting at an advertising and design agency, moving to a half a billion dollar e-commerce website, and then on to a high-level contracting and consulting firm.

You can checkout [my website](https://hmiller.dev/), [LinkedIn](https://www.linkedin.com/in/hunter-miller-dev/), and [Twitter](https://twitter.com/hmillerdev) to see more about me.

## Milestones

### Ability to run basic ship features

1 stars
Includes start/stop/restart ship, show status, eject ship for hosting, boot new planets, moons, and comets, boot existing planets and comets, act as browser for hosted ships, and ship removal.

### (Timeboxed) Proof of Concept for Windows

1 stars
To include the Windows' user base, the PoC should enable running on Windows either through WSL or some other means. Two week timebox to make sure we don't spend too much time here.

### Urbit Client Beta Release

4 stars
Significant testing during this time. Cross-platform, include all basic ship features, with no major bugs. Renamed to Urbit Client and added to urbit.org as an easy download.

### Azimuth Integration and Official Release

4 stars
Integrating Urbit key generation for easy booting of new planets. Adding further refinements to UI, all moderate issues resolved, and documentation for users and contributors.
