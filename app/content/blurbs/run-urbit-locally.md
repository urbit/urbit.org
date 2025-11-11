+++
title = "Run urbit locally"
description = "Quickly and easily run urbit on your laptop, or home desktop computer"
tags = []
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/get-on-urbit", description = "A step by step guide to running urbit locally" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

Because Urbit runs on any host OS, it is trivially easy to run an urbit ship on your laptop or home computer and connect to the Urbit network. After getting a copy of [the urbit runtime for your system](https://docs.urbit.org/get-on-urbit?#get-the-urbit-runtime) you can follow the instructions to "Boot up your urbit" and you will find that your local device has connected to the Urbit network and is now able to communicate peer-to-peer with other Urbit nodes.

There are some considerations worth mentioning about running your urbit locally and on a home network, though. "Out of the box" you get connectivity with other Urbit ships over [Ames](https://docs.urbit.org/urbit-os/kernel/ames), Urbit's p2p networking protocol, and this will persist even if your IP address changes (for example, if your ISP rotates your IP or if you are running on a laptop moving from coffee shop to coffee shop) thanks to Urbit ID's routing and peer-discovery mechanisms. You will also be able to easily access your urbit's web interface at `http://localhost:80` from the device running the urbit process or `http://<hostname>.local:80` from devices on your home network. 

But, what you won't get "out of the box" is a publicly accessible domain on the internet. This means, for example, that you won't be able to access something like `https://sampel-palnet.arvo.network` on your phone in order to connect to the [Tlon Messenger](https://tlon.io/posts/about-tlon-messenger) mobile app while you are on the go, or that you won't be able to use your urbit to publish a blog to the open internet. 

If you are technically inclined, running an urbit locally at home and setting up the networking can be a fun project, and there are plentiful reasons for why you might just want your urbit to avoid the public internet as a whole, but it is only fair to let you know that running urbit locally without any further configuration can give a somewhat truncated experience. That said, local instances are a great way to run ['fakeships'](https://docs.urbit.org/build-on-urbit/environment#creating-a-fake-ship) for development purposes.
