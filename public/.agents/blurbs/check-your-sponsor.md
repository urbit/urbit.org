---
title: "Check your current sponsor"
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

# Check your current sponsor

Understanding your networking sponsor can help with troubleshooting connectivity issues

```
+sponsor
```

This command will print out the `@p` of your ship's current sponsor. This is helpful for troubleshooting connectivity issues, as if there is a ship in your sponsorship hierarchy that is offline, it can result in difficulty finding new network piers. You can also check the [Network Explorer](https://network.urbit.org) to retrieve this information, but it is important to note that because Urbit is a distributed system, it is possible that your ship has a different understanding of it's sponsorship chain, particularly if you just executed onchain identity management actions, e.g. changing your sponsor in [Bridge](https://bridge.urbit.org).
