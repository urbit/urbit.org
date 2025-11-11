+++
title = "Check and reduce memory usage"
description = "Monitor and optimize your urbit's memory consumption"
tags = ["dojo", "runtime"]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation (Dojo)", link = "https://docs.urbit.org/user-manual/os/dojo-tools#mass", description = "Memory management from dojo" },
    { title = "Technical Documentation (Vere)", link = "https://docs.urbit.org/user-manual/running/vere#meld-1", description = "Memory management from runtime" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

Both the urbit dojo and the Vere runtime are capable of handling commands for managing your urbit's memory consumption and loom size. 

Use `|mass` or `./urbit mass` to print a memory report showing where your loom space is allocated. Run `|meld` (or `./urbit meld`) to deduplicate memory—this can reduce usage by up to 50% but takes time. For faster compression with smaller gains, use `|pack`. These operations help keep your ship running smoothly, especially on resource-constrained systems.

**From dojo:**
```
|mass
```

```
|meld
```

```
|pack
```

**From runtime (ship offline):**
```
./urbit mass /path/to/pier
```

```
./urbit meld /path/to/pier
```

```
./urbit pack /path/to/pier
```

These can also be run from a 'docked' pier, using the following syntax:
```
./path/to/pier/.run <command>
```

