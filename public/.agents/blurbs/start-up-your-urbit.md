---
title: "Restart up your urbit after initial boot"
source_kind: "blurb"
canonical_url: null
human_md_url: null
agent_mode: "fallback"
dependencies:
  - "/overview/running-urbit/common-commands.md"
related_pages:
  - "/overview/running-urbit/common-commands.md"
  - "/index.md"
  - "/overview.md"
---

# Restart up your urbit after initial boot

Restarting your urbit after intial boot is straightforward and doesn't require additional cryptographic secrets

```
./urbit /path/to/pier
```

You can start your urbit by running `./urbit` followed by your pier name (e.g., `./urbit sampel-palnet`). 

```
./path/to/pier/.run
```

That said, typically after first boot in modern runtimes, your ship should have auto-'docked' (put a copy of the runtime in it's own pier), such that you can use `./path/to/pier/.run` to restart. This can also take any of your regular runtime arguments, like `meld` or `--loom 32`.

## References

- [Technical Documentation](https://docs.urbit.org/user-manual/running/vere) — Vere runtime commands and options
