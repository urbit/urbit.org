+++
title = "Run Urbit Using Groundseg"
description = "Groundseg is free and open-source software for running urbits, developed by Native Planet"
tags = ["urbit-os", "docker", "native-planet"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "GitHub Repository", link = "https://github.com/Native-Planet/GroundSeg", description = "The official Git repository for Groundseg, from Native Planet" },
    { title = "Native Planet Software", link = "https://nativeplanet.io/software", description = "Native Planet's official software page for downloading Groundseg" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

Groundseg is, in the words of Native Planet, "The best way to run an Urbit ship". Practically speaking, it gives the Urbit user a straightforward GUI for booting a new urbit ship, or uploading an existing pier, and then managing the operation of that instance of Urbit OS. You can adjust the available loom space to make room for additional apps or content in your urbit, you can truncate your event log to save space on your host machine, and you can even adjust automatic maintenance routines that keep your urbit running smoothly.

Distributed by default with every Native Planet hardware device, Groundseg also comes as the core focus of ColonyOS, a bespoke Linux distribution designed for exactly this purpose. Technically speaking, Groundseg does two core functions: it orchestrates docker containers running urbit instances, and it handles the networking flows of those containers—including to any attached Startram or Anchor instances to support streamlined clearweb access to your Urbit's web interfaces.


**Disclaimer**: GroundSeg runs with `sudo` privileges on your device. This is required for controlling various aspects of the device. For this reason, we (and the Native Planet team) recommend a dedicated device. Luckily, just about any old computer from the last 15 years will be able to run urbit, just keep in mind that the `urbit` process is heavy on disk writes, so expect that both read/write speeds will impact performance, and you should keep an eye on drive health over time.


