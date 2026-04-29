---
title: "Start and stop applications on your urbit"
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

# Start and stop applications on your urbit

Control application lifecycles with dojo commands

```
|start %some-app %some-agent
```

Use `|start` to manually start a specific agent on a desk, defining first the desk name and then the agent name 

```
|suspend %some-app
```

Alternatively, you can `|suspend` to stop all agents on a desk. 

```
|pause %some-app
```
The `|pause` command prevents a desk from receiving updates from the app distributor. This can be helpful for freezing an app from receiving any undesired changes. Take that, MEGACORP SaaS.

```
|revive %some-app
```

Running `|revive` restarts previously suspended agents for a given desk.

## References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#start) — Application control commands
