---
title: "Check and reduce memory usage"
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

# Check and reduce memory usage

Monitor and optimize your urbit's memory consumption

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

## References

- [Technical Documentation (Dojo)](https://docs.urbit.org/user-manual/os/dojo-tools#mass) — Memory management from dojo
- [Technical Documentation (Vere)](https://docs.urbit.org/user-manual/running/vere#meld-1) — Memory management from runtime
