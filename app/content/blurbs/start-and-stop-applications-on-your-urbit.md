+++
title = "Start and stop applications on your urbit"
description = "Control application lifecycles with dojo commands"
tags = ["dojo"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/os/dojo-tools#start", description = "Application control commands" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

```
|start %some-app %some-agent
```

Use `|start` to manually start a specific agent on a desk, defining first the desk name and then the agent name 

```
|suspend %some-app
```

Alternatively, you can `|suspend` to stop all agents on a desk. 

```
|pause %some-app
```
The `|pause` command prevents a desk from receiving updates from the app distributor. This can be helpful for freezing an app from receiving any undesired changes. Take that, MEGACORP SaaS.

```
|revive %some-app
```

Running `|revive` restarts previously suspended agents for a given desk.
