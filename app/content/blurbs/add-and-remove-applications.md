+++
title = "Add and remove applications"
description = "3rd-party software distribution enables any urbit node to distribute software to the network, these commands help you manage your installed apps."
tags = ["dojo"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/os/dojo-tools#install", description = "Technical Documentation on urbit dojo commands relating to adding and removing applications from your ship" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = true
+++

```
|install ~dister-hoster %some-app
```

If you know the name of the app, and the `@p` of the ship distributing it, `|install` is the most direct way to get new apps. You can also visit `<your-domain>/apps/landscape` and click the `Get Apps` button to discover apps. 

```
|nuke %some-app, =desk &
```

Running `|nuke` will destroy, or 'nuke', all the state relating to that application. **This is an irreversible action**, so ensure you know you want to delete any related data. It is effectively a factory reset of that application, but it can have unintended consequences if done haphazardly.


```
|uninstall %some-app
```

The `|uninstall` command is slightly unintuitive. Typically you might expect that it wipes any app data, similar to `|nuke`, but technically it archives app data and stops all microservices, or 'agents', relating to the app. It is possible to recover this state by reinstalling the app.
