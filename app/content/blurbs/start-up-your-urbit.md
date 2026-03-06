+++

title = "Restart up your urbit after initial boot"
description = "Restarting your urbit after intial boot is straightforward and doesn't require additional cryptographic secrets" 
summary = "Boot your urbit with ./urbit /path/to/pier, or use the auto-docked .run script after initial boot for version-pinned, standalone execution."
tags = ["runtime"]
search_terms = [
    "restart urbit",
    "run urbit",
    "urbit runtime",
    "pier run",
    "docked pier",
    ".run",
    "loom flag",
    "boot ship",
    "urbit restart"
]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/running/vere", description = "Vere runtime commands and options" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

```
./urbit /path/to/pier
```

You can start your urbit by running `./urbit` followed by your pier name (e.g., `./urbit sampel-palnet`). 

```
./path/to/pier/.run
```

That said, typically after first boot in modern runtimes, your ship should have auto-'docked' (put a copy of the runtime in it's own pier), such that you can use `./path/to/pier/.run` to restart. This can also take any of your regular runtime arguments, like `meld` or `--loom 32`. 
