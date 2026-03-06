+++

title = "Create a moon identity"
description = "Spawn subordinate identities tied to your planet"
summary = "Use |moon to generate moon identities linked to your planet, with additional commands like |moon-breach for factory resets and |moon-cycle-keys to update cryptographic keys."
tags = ["dojo", "urbit-id"]
search_terms = [
    "moon identity",
    "spawn moon",
    "urbit moon",
    "moon keyfile",
    "moon breach",
    "moon cycle keys",
    "azimuth moon",
    "dojo moon",
    "sub identity",
    "moon reset"
]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "Technical Documentation", link = "https://docs.urbit.org/user-manual/os/dojo-tools#moon", description = "Moon management commands" },
]

[call-to-action]
label = ""
link = ""
description = ""

[extra]
wip = false
+++

```
|moon
```

Azimuth-based identities can use `|moon` to generate a new moon identity, linked to it's parent identity. The command returns a keyfile you'll use to boot the moon.

```
|moon-breach ~sampel-sampel-palnet
```

If your moon gets into a bad state, `|moon-breach` performs a factory reset. 

```
|moon-cycle-keys ~sampel-sampel-palnet
```

The `|moon-cycle-keys` command updates your moon's cryptographic keys—useful for security or recovery purposes.
