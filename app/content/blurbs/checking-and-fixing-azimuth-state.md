+++

title = "Checking and fixing Azimuth state"
description = "Monitor and repair your PKI state synchronization"
summary = "Check Ethereum block sync with +azimuth/block and use -azimuth-load to fetch snapshots if your ship's Azimuth state is out of sync with the blockchain."
tags = ["dojo", "azimuth"]
search_terms = [
    "azimuth state",
    "pki sync",
    "azimuth block",
    "ethereum block",
    "azimuth load",
    "pki snapshot",
    "dojo azimuth",
    "state sync",
    "azimuth snapshot",
    "bridge azimuth"
]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/os/dojo-tools#azimuthblock", description = "Azimuth state management commands" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

```
+azimuth/block
```

Check which Ethereum block your ship has processed with `+azimuth/block`. This can be helpful to compare against other sources, e.g. [Etherscan](https://etherscan.io), to ensure that your ship understands the current height of the ethereum blockchain and any attendent Azimuth state.

```
-azimuth-load
```

If your Azimuth state is out of sync, use `-azimuth-load` to refetch a snapshot and catch you up to the current state of the Azimuth.
