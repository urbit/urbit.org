---
title: "Update Commands For Your Urbit"
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

# Update Commands For Your Urbit

Your urbit is generally auto-updating, but in the event of an incompatible application or a kernel update that would conflict with existing apps, you may need to decide which software to run

```
|bump
```

Occasionally, you will have an app on your ship that has not been updated by it's developer in some time, and an inbound kernel upgrade will conflict with this existing application. Running `|bump` will apply the kernel update and suspend any incompatible desks in the process.

```
|ota ~sampel
```

Another common reason for not getting commands can come from having a derelict sponsor, or otherwise having a poor connection with your 'Over The Air' (OTA) update provider. You can chose an alternative provider for your kernel updates by running `|ota` and providing the `@p` of a valid ota provider as an argument. You can get OTAs from any ship, but by default you get them from your networking sponsor.

## References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#bump) — Key commands for keeping your urbit up to date
