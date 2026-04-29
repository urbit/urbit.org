---
title: "Get the Urbit runtime"
source_kind: "blurb"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies:
  - "/overview/running-urbit/common-commands.md"
  - "/overview/running-urbit/run-urbit-os.md"
related_pages:
  - "/overview/running-urbit/common-commands.md"
  - "/index.md"
  - "/overview.md"
---

# Get the Urbit runtime

Download the runtime binary for your host platform

The quickest way to get the runtime is with the guided installer below. It defaults to a basic install, but you can also choose a specific architecture and download location if you want more control.

```sh
curl -fsSL https://urbit.org/get-runtime.sh | sh
```

If you'd rather fetch the runtime binary directly, use the tab for your platform.

## Options

### macOS (M-series)

Open a terminal and run:

```sh
curl -L https://urbit.org/install/macos-aarch64/latest | tar xzk -s '/.*/urbit/'
```

### macOS (Intel)

Open a terminal and run:

```sh
curl -L https://urbit.org/install/macos-x86_64/latest | tar xzk -s '/.*/urbit/'
```

### Linux (x86_64)

Open a terminal and run:

```sh
curl -L https://urbit.org/install/linux-x86_64/latest | tar xzk --transform='s/.*/urbit/g'
```

### Linux (aarch64)

Open a terminal and run:

```sh
curl -L https://urbit.org/install/linux-aarch64/latest | tar xzk --transform='s/.*/urbit/g'
```

## References

- [CLI Setup Guide](https://docs.urbit.org/get-on-urbit#get-the-urbit-runtime) — Official guide to downloading the runtime and booting your first ship.

## Next step

- [Read the full CLI guide](https://docs.urbit.org/get-on-urbit) — Learn how to get the runtime, boot a ship, and log into Landscape.
