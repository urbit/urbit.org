---
title: "Directly contact another urbit"
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

# Directly contact another urbit

Urbit's most basic messaging protocol can send a quick hi in the dojo

```
|hi ~zod 'optional message'
```

Running `|hi` is Urbits most basic p2p messaging affordance and offers a quick and reliable way to see if you have a direct connection to a peer. If you are connecting to a ship for the first time you may get a message in the dojo like `~zod is your neighbor`.

## References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#hi) — Running `|hi` will ping a ship with an optional message
