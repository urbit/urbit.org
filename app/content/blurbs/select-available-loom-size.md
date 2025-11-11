+++
title = "Select available loom size"
description = "Configure memory allocation for your urbit"
tags = ["runtime"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/running/vere", description = "Loom configuration options" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

```
./urbit --loom 32 /path/to/pier
```

The loom is your urbit's memory space. Use the `--loom` flag with a power-of-two exponent: `30` for 1GB, `31` for 2GB (default), `32` for 4GB, or `33` for 8GB. Larger looms allow for more apps and data but will consume more available RAM. Choose based on your available system resources and usage needs.
