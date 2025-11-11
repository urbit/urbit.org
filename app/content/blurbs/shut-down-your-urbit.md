+++
title = "Shut down your urbit"
description = "Gracefully stop your urbit instance"
tags = ["dojo", "runtime"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation (Dojo)", link = "https://docs.urbit.org/user-manual/os/dojo-tools#exit", description = "Shutdown from dojo" },
    { title = "Technical Documentation (Vere)", link = "https://docs.urbit.org/user-manual/running/vere", description = "Runtime shutdown options" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

**From dojo:**
```
|exit
```
Or press `Ctrl-D`

Use `|exit` or `Ctrl-D` to gracefully shut down your running urbit. While you should try to shut down gracefully to ensure your urbit's state is properly persisted, one of Urbit's affordances as a 'solid state interpreter' means that it technically has no internal conception of being on or off. It's state is a pure function of it's input events, and those need to be recorded before an atomic update of your state. So while an elegant shutdown is ideal, incidents such as power loss are straightforward to recover from.
