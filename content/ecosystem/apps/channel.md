+++
title = "Channel"
shortcode = "~sitden-sonnet/channel"
license = "REKT"
image = "https://s3.us-east-1.amazonaws.com/haddefsigwen1/reciprocal/2022.7.09..22.54.53-channel.png"
bgColor = "#000000"
developer = "Quartus Co., Reciprocal Ltd."
website = "https://reciprocal.ltd"
description = "A distributed imageboard platform, with love"
+++

### An imageboard platform, with love

Developed as a collaboration between the Quartus Corporation and [Reciprocal Ltd.](https://reciprocal.ltd), Channel is an imageboard platform that leverages graph-store to allow any ship on the Urbit network to create and manage their own imageboard.

![](https://s3.us-east-1.amazonaws.com/haddefsigwen1/channel/2022.7.14..05.09.33-Screen%20Shot%202022-07-13%20at%2010.09.16%20PM.png)

Incoming posts have their authors scrambled with a per-ship, per-installation SHA-256 salt and thus get rotated into a "tripcode comet" visible when viewing the graph outside the interface. The interface by default hides all authors.

Board owners can ban ships (using their rotated names), delete threads, and ban words and URLs, as well as assign janitors. You can even connect two boards using Quartus' Orca tool to syndicate posts across boards.