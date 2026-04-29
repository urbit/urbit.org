---
title: "Shut down your urbit"
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

# Shut down your urbit

Gracefully stop your urbit instance

**From dojo:**
```
|exit
```
Or press `Ctrl-D`

Use `|exit` or `Ctrl-D` to gracefully shut down your running urbit. While you should try to shut down gracefully to ensure your urbit's state is properly persisted, one of Urbit's affordances as a 'solid state interpreter' means that it technically has no internal conception of being on or off. It's state is a pure function of it's input events, and those need to be recorded before an atomic update of your state. So while an elegant shutdown is ideal, incidents such as power loss are straightforward to recover from.

## References

- [Technical Documentation (Dojo)](https://docs.urbit.org/user-manual/os/dojo-tools#exit) — Shutdown from dojo
- [Technical Documentation (Vere)](https://docs.urbit.org/user-manual/running/vere) — Runtime shutdown options
