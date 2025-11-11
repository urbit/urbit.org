+++
title = "Check your current sponsor"
description = "Understanding your networking sponsor can help with troubleshooting connectivity issues"
tags = ["dojo"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    # { title = "Technical Documentaion", link = "https://docs.urbit.org/user-manual/os/dojo-tools#sponsor", description = "Technical documentation on checking sponsorship of your ship" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

```
+sponsor
```

This command will print out the `@p` of your ship's current sponsor. This is helpful for troubleshooting connectivity issues, as if there is a ship in your sponsorship hierarchy that is offline, it can result in difficulty finding new network piers. You can also check the [Network Explorer](https://network.urbit.org) to retrieve this information, but it is important to note that because Urbit is a distributed system, it is possible that your ship has a different understanding of it's sponsorship chain, particularly if you just executed onchain identity management actions, e.g. changing your sponsor in [Bridge](https://bridge.urbit.org).
