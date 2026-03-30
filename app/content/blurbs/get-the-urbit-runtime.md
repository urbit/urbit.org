+++

title = "Get the Urbit runtime"
description = "Download the runtime binary for your host platform"
summary = "Install the Urbit runtime with the guided `get-runtime.sh` helper or use direct per-platform commands for macOS and Linux."
tags = ["runtime", "install", "command-line"]
search_terms = [
    "get runtime",
    "install runtime",
    "download urbit binary",
    "get-runtime.sh",
    "macos runtime",
    "linux runtime",
    "install vere"
]
lastest-update = ""
image = ""
imageDark = ""
references = [
    { title = "CLI Setup Guide", link = "https://docs.urbit.org/get-on-urbit#get-the-urbit-runtime", description = "Official guide to downloading the runtime and booting your first ship." },
]

[call-to-action]
label = "Read the full CLI guide"
link = "https://docs.urbit.org/get-on-urbit"
description = "Learn how to get the runtime, boot a ship, and log into Landscape."

[extra]
wip = false

[[tabs]]
title = "macOS (Apple Silicon)"
content = """
Open a terminal and run:

```sh
curl -L https://urbit.org/install/macos-aarch64/latest | tar xzk -s '/.*/urbit/'
```
"""

[[tabs]]
title = "macOS (Intel)"
content = """
Open a terminal and run:

```sh
curl -L https://urbit.org/install/macos-x86_64/latest | tar xzk -s '/.*/urbit/'
```
"""

[[tabs]]
title = "Linux (x86_64)"
content = """
Open a terminal and run:

```sh
curl -L https://urbit.org/install/linux-x86_64/latest | tar xzk --transform='s/.*/urbit/g'
```
"""

[[tabs]]
title = "Linux (aarch64)"
content = """
Open a terminal and run:

```sh
curl -L https://urbit.org/install/linux-aarch64/latest | tar xzk --transform='s/.*/urbit/g'
```
"""
+++

The quickest way to get the runtime is with the guided installer below. It defaults to a basic install, but you can also choose a specific architecture and download location if you want more control.

```sh
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

If you'd rather fetch the runtime binary directly, use the tab for your platform.
