+++
title = "~Home-Urbit"
date = "2021-09-14"
[taxonomies]
grant_type = ["Proposal"]
grant_category = ["App Dev", "Dev tool"]
[extra]
image = "https://user-images.githubusercontent.com/13405632/121785641-98599100-cbc3-11eb-861c-77a95a7db030.png"
description = "A turn-key Urbit deployment for your personal server"
reward = "4 stars"
assignee = ["~sipsen-pilser"]
id = ""
completed = false
canceled = true
link = ""
+++

# Urbit Grant for ~Home-Urbit

Home-Urbit is a turn-key solution for self-hosting Urbit

Goal: Create a productized version of Home-Urbit with an impecable UX. Setup Urbit on a dedicated piece of hardware (or a virtualized one) with as much less friction as possible.

Urbit is your last computer.

Vision: Create the software foundations for a dedicated piece of hardware that you can order, your own Urbit. It will enable to easily:

1. Install Urbit on the hardware during manufacturing.
2. Manage Urbit (and the hw) during usage.

Current implementation is based on balenaCloud and balenaOS.

[balenaOS](https://www.balena.io/os/?) is a lightweight OS that is crafted for container workloads. It has various optimizations for IoT, including minimal write by the OS on the disk.

[balenaCloud](https://www.balena.io/cloud/) is a PaaS to build, deploy and manage IoT workloads. Basically you send a docker-compose project, it is build on their build-servers and the container images are sent to the IoT devices to run. You can manage the whole lifecycle of the app through their web dashboard.

balenaCloud has a free tier for up to 10 devices per account, so that's perfect for our ~Home-Urbit application.

Moreover, with balenaCloud, users can easily run other applications alongisde Urbit. Whatever application that can run inside a container.

The angle is to run the software you need, on your own. With containers that's easier than before. A sovereign individual should own their device, applications and data.

Examples:

- Netdata monitoring agent
- [Radicle seed node](https://radicle.xyz/)
- Personal website server
- Media center
- NAS
- etc.

## Milestones

### Refine current setup (aarch64 architecture) - 1 Star

- Fix slow reverse-proxy by nginx (or replace nginx). This is needed so that the user can access Urbit and the various services that are hosted alongside (e.g minio S3) without having to remember ports.
- Make ~home-urbit play nice with external SSD. The plan is to install urbit on the SSD and the OS on the sd card. It should give us the speed bost that we are looking for.

### Make Home-Urbit compatible with x86 architecture - 1 Star

balenaOS is compatible with many different architectures. Make home-urbit compatible with x86, so that users can install balenaOS and run the urbit in computers such as Intel NUCs.

A NUC could house multiple Urbits or could enable the user to host many different groups with many users.

### Solve the wide accessibility issue - 2 Stars

Home-Urbit should be widely accessible for 2 reasons:

1. You should be able to access it no matter your location
2. MinioS3 demands accessibility by all the parties to be able to view the asset that you linked

BalenaCloud offers VPN accessibility that is hardcoded to port 80, doesn't cover requirement 2.

Another VPN service would cover both requirements, but not for everybody, just the users of the VPN. It's great to access your device, but not great for others to access your Minio instance.

Router forwarding is an option, but it's involved and requires the user to use 3rd-party intructions, since it's different for every router.

A universal solution should be found. For example, create a publicly accessible server that sustains reverse `ssh` tunnels to the home-urbit. It simply pipes all the connections that target a specific port to the `home-urbit` at another port. It works as a proxy.

Since it's a publicly accessible VM, it solves both requirements. The connection originate from home-urbit itself and it's a tunnel, so there is no need for port forwarding.

Alternative solutions will be researched. The chosen solution will be:

1. The most reliable
2. The easiest
3. The fastest

We will consider the above attributes in that order of importance.

For the upkeep cost, there are a couple of options:

1. Discuss with Urbit foundation, generalise solution and offer it to all Urbits. Upkeep cost to be covered by UF.
2. Create a simple SaaS with a very cheap free/paid option
3. Offer it for free, shoulder cost and use something like Patreon or a similar service.

### Make offline version - (> 2 Stars)

It is understandable that some users may not want to manage their Urbit via balenaCloud. This milestone will give enable them to install home-urbit in the same\* frictionless manner, while doing that offline.

Most likely, it will be more invovled than using balenaCloud.

It should have feature-parity with the balenaCloud deployment. For example, in place of the balenaCloud's VPN service, there will be an extra container that runs tailscale.

3 options:

- balenaOS (it's OSS) without the balenaCloud component. You manage it locally via balena-cli.
- Other OS angled for running container workloads (e.g bottleRocket )
- docker-compose + helper scripts.

### Make Content - 2 Stars

- Produce all relevant docs
- Produce a first-aid handbook (if X, do Y). Talk with Urbit employees and community members to identify causes.
- Produce video about the project
- Write technical blog post
  - Why home-urbit
  - Design choices (e.g why containers, why balena). Intro to technologies.
  - Running urbit in container, gotchas and bash scripts that were used.
  - Tips on running Urbit commands via HTTP
