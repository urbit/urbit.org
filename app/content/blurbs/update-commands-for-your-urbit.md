+++
title = "Update Commands For Your Urbit"
description = "Your urbit is generally auto-updating, but in the event of an incompatible application or a kernel update that would conflict with existing apps, you may need to decide which software to run"
tags = ["dojo"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/os/dojo-tools#bump", description = "Key commands for keeping your urbit up to date" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = true
+++

```
|bump
```

Occasionally, you will have an app on your ship that has not been updated by it's developer in some time, and an inbound kernel upgrade will conflict with this existing application. Running `|bump` will apply the kernel update and suspend any incompatible desks in the process.

```
|ota ~sampel
```

Another common reason for not getting commands can come from having a derelict sponsor, or otherwise having a poor connection with your 'Over The Air' (OTA) update provider. You can chose an alternative provider for your kernel updates by running `|ota` and providing the `@p` of a valid ota provider as an argument. You can get OTAs from any ship, but by default you get them from your networking sponsor.

