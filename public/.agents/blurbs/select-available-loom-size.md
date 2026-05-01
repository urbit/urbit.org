---
title: "Select available loom size"
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

# Select available loom size

Configure memory allocation for your urbit

```
./urbit --loom 32 /path/to/pier
```

The loom is your urbit's memory space. Use the `--loom` flag with a power-of-two exponent: `30` for 1GB, `31` for 2GB (default), `32` for 4GB, or `33` for 8GB. Larger looms allow for more apps and data but will consume more available RAM. Choose based on your available system resources and usage needs.

## References

- [Technical Documentation](https://docs.urbit.org/user-manual/running/vere) — Loom configuration options
