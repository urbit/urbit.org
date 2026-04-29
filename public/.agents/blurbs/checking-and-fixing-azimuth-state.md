---
title: "Checking and fixing Azimuth state"
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

# Checking and fixing Azimuth state

Monitor and repair your PKI state synchronization

```
+azimuth/block
```

Check which Ethereum block your ship has processed with `+azimuth/block`. This can be helpful to compare against other sources, e.g. [Etherscan](https://etherscan.io), to ensure that your ship understands the current height of the ethereum blockchain and any attendent Azimuth state.

```
-azimuth-load
```

If your Azimuth state is out of sync, use `-azimuth-load` to refetch a snapshot and catch you up to the current state of the Azimuth.

## References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#azimuthblock) — Azimuth state management commands
