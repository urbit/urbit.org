+++
title = "Urbian: a customized Linux distribution for Urbit appliances"
date = "2020-10-05"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Tool" ]

[extra]
image = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bromeliaceae20020312.JPG/640px-Bromeliaceae20020312.JPG"
description = "A package for the generation of custom Linux images with Urbit running as service, for the backend of a turnkey Urbit appliance or IoT hub."
reward = "2 stars"
assignee = ["~botter-nidnul"]
id = "337545546"
completed = false
canceled = true
link = ""
+++

### Purpose

This is meant to serve as a backend for future turnkey Urbit appliances or IoT hubs by providing a collection of scripts, config files, and supporting infrastructure to enable the generation of custom Armbian Linux images with Urbit ready to run as service out of the box.

### Background & Motivation

![Bromeliaceae on a tree, Costa Rica (Atlantic area)](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Bromeliaceae20020312.JPG/640px-Bromeliaceae20020312.JPG)

_“An epiphyte uses a tree for physical support but does not drawn nourishment from it.”_

I’ve been running Urbit on various ARM powered devices since November 2019 and have seen Urbit on ARM evolve from a curious toy into a viable platform for daily Urbit usage, ready to be used on the cloud or a credit card sized microserver hidden in the corner of a room.

As Urbit has matured, the flaws with some of those credit card sized devices have become increasingly apparent. On the dominant platform, the Raspberry Pi, the default 32-bit software and limited storage interfaces have made running Urbit on them sometimes difficult even for the hardy explorers that Urbit attracts.

Urbit is often explained as an “overlay OS” but this term encourages an idealism that neglects the importance of what is underneath Urbit. A more complete term might be “epiphyte OS”, which prompts thoughts about what is supporting Urbit and allowing it to reach its heights.

In order for Urbit to thrive on small, cheap, and locally hosted devices a more solid foundation needs to be built, one that will allow for flexible experimentation with devices bought for the purpose of running Urbit - not just some neglected Raspberry Pi pressed into service on a whim.

This is a first attempt at building such a base.

### Implementation

This is a package of scripts and configuration files intended to be used in a userpatches overlay for Armbian. Though deliverables include an image intended for a particular device (the NanoPi M4V2) the advantage of Armbian over other methods of creating an embedded Linux image is the ease of targeting a diverse set of devices without time consuming setup.

It should be possible to take this overlay and use it with the [Armbian build tool](https://github.com/armbian/build) to create Urbit ready images for about [38 different platforms](https://docs.google.com/document/d/e/2PACX-1vRo8VKU4oUQQN9Z94vu2lYP2iSb75MRwKLtLGnfTkShmUw7kupjg1cYOryT1Tw1lwczw2Eu8nyIlfKQ/pub) with little or no modification.
The scripts and configuration files that provide the turnkey Urbit functionality should be universally applicable to most Linux distributions with udev and systemd, and can be installed separately or integrated into other embedded Linux images.

Core functionality will be handled by a service which runs at boot:

- It waits for the insertion of a USB drive, and when one is automatically mounted checks for the presence of an Urbit keyfile and an extremely basic wifi configuration file (for users who don’t want to use the bluetooth setup method for wifi).
- The script will configure the wifi device if a wifi file was found
- On finding a keyfile it will check for the presence of an already booted Urbit and will not proceed if one is found.
- If there’s no pre-existing Urbit, it will check for a more recent version of both Urbit binaries and its own script and system configuration packages, updating if necessary.
- Handoff to a monitor script, start the boot of the Urbit, and also pipe the output to a tty device for low level debug.
- Monitor script watches the boot process, reporting on progress to a file which can be used by a higher level frontend to display basic status and common errors (e.g. failed to contact ethereum node, failed to download boot pill, keyfile invalid).
- Upon successful completion of the boot process, run the Urbit service.

Outside infrastructure for this is an APT repository to hold the most up-to-date AArch64 versions of Urbit and other packages required to enable turnkey functionality.

Armbian image to additionally include:

- [RPi-Monitor](https://github.com/XavierBerger/RPi-Monitor) for real time monitoring
- nymea-networkmanager for [wifi configuration over bluetooth](https://berrylan.org)

### Deliverables

An image file ready to flash to a device (I’ve chosen the NanoPi M4V2) and the files used to generate it, published in a [github repository](https://github.com/botter-nidnul/userpatches). Service and script files will be published in a [separate repository](https://github.com/botter-nidnul/urbit-scripts), with additional repositories for the deb package control files and scripts for building the [urbit](https://github.com/botter-nidnul/urbit.deb) and [urbit-scripts](https://github.com/botter-nidnul/urbit-scripts.deb) .deb packages.

Finally, a rough example of a rudimentary frontend will be demonstrated in a blog post style write-up with screenshots/pictures/videos as necessary to illustrate: the process of creating an image with the Armbian build tool, flashing it to a device, and the device giving information to the user about the process of starting Urbit and where to access landscape after the boot finishes.

### Basis for future integration

This is meant to be the start of a Linux distribution designed for self-hosted Urbit devices, but which provides more than just Urbit.

It has the potential to evolve into a system that makes it easier for users to self host their own S3 buckets with MinIO, run IoT gateways on the device which can communicate with Urbit, and help with the setup of a local bitcoin node.

The development of this backend will support UX experiments with a frontend meant to create a user friendly, turnkey-style Urbit device.

## Milestones

### An Armbian userpatches overlay for Urbit

1 stars
Overlay with scripts and services integrated, used to create an image for installation to a device, which will setup Urbit upon being booted.

### Demo of image generation and boot

1 stars
Blog style write-up of how to create an image with the Armbian build tool, flashing it to a device, and how it might work with a simple frontend to communicate with the user.
