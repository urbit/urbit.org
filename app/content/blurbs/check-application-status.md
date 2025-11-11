+++
title = "Check application info and status"
description = "Running `+vats` will output the state of your apps and related metadata that can help with troubleshooting"
tags = ["dojo"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/os/dojo-tools#vats", description = "Technical Doccumentation on understanding the metadata and status around your applications" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

```
+vats %some-app
```

The `+vats` command can be run without any arguments and will print out the metadata of all the apps, or '[desks](https://docs.urbit.org/urbit-os/kernel/clay/filesystem#desks)', currently on your ship. If you provide the name of `%some-app`, it will print out only the metadata for that app. Particularly helpful elements of this data include:
- `%cz hash` - helpful to know what version of an app you are on, developers or support will often ask for this info to figure out if you are encountering a known issue.
- `app status` - helpful to know if the app is `suspended` or `running`, which may impact intended functionality
- `publishing ship` - desks of the same name can be distributed by different ships, and may offer different functionality, e.g ~ridlyd might distribute a version of `%gora` that is cross-compatible with `%gora` from ~talwet, but which offers a different front end client.
- `pending updates` - Will let you know if there is an issue getting updates due to kernel version incompatibility
