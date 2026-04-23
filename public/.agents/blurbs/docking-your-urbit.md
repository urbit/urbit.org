---
title: "Docking your urbit"
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

# Docking your urbit

Install a specific runtime version into your pier

Typically, when using modern versions of the Vere runtime, if you have ever elegantly shut down your Urbit, it should have gon through an auto-'docking' process. If trying to start your urbit using `./path/to/pier/.run` doesn't work, try manually docking:
```
./urbit dock /path/to/pier
```

The `dock` command copies the current vere runtime binary into your pier. This makes your pier self-contained with a specific runtime version, which is useful for version pinning or ensuring your urbit can run independently of system-level vere installations.

## References

- [Technical Documentation](https://docs.urbit.org/user-manual/running/vere) — Vere runtime management
