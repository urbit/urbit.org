+++
title = "Run urbit using Native Planet hardware"
description = "Placeholder description"
tags = []
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "NativePlanet.io", link = "https://nativeplanet.io", description = "Visit the official Native Planet website to purchase hardware optimized for self-hosting urbit" },
    { title = "Groundseg", link = "https://manual.groundseg.app/", description = "Groundseg is free and open source software for running and managing urbit ships with a easy to understand GUI" },

]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

[Native Planet](https://nativeplanet.io) is an organization that builds and sells beautiful computer hardware specifically optimized towards running Urbit nodes. Blending the benefits of hands-free managed hosting services, self-sovereign local hosting, and reliable cloud datacenters, running your urbit on Native Planet hardware is a highly recommended path for the Urbit 'power user', or even the technical developer who would rather spend time writing software than handling home networking issues.

Native Planet offers a variety of hardware devices designed to run one to many independent urbit instances, and all come preloaded with ColonyOS and Groundseg, Native Planet's open-source software for managing Urbit nodes and related services. Groundseg includes automatic MinIO setup as well, which is necessary for sending images in Tlon Messenger.

They also offer a SaaS service (a free year comes with each hardware purchase), Startram, which seamlessly handles DNS and networking so your urbit can be accessed from the open internet. Included in their offering is your own domain, like `https://sampel-palnet.startram.io`. 

Not big on SaaS services? Don't worry, they have made a single-tenant version of Startram called [Anchor](https://github.com/native-planet/anchor) which you can self-host if that is more your speed.
