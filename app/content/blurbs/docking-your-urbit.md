+++
title = "Docking your urbit"
description = "Install a specific runtime version into your pier"
tags = ["runtime"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/running/vere", description = "Vere runtime management" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = true
+++

Typically, when using modern versions of the Vere runtime, if you have ever elegantly shut down your Urbit, it should have gon through an auto-'docking' process. If trying to start your urbit using `./path/to/pier/.run` doesn't work, try manually docking:
```
./urbit dock /path/to/pier
```

The `dock` command copies the current vere runtime binary into your pier. This makes your pier self-contained with a specific runtime version, which is useful for version pinning or ensuring your urbit can run independently of system-level vere installations.
