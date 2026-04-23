---
title: "Create a moon identity"
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

# Create a moon identity

Spawn subordinate identities tied to your planet

```
|moon
```

Azimuth-based identities can use `|moon` to generate a new moon identity, linked to it's parent identity. The command returns a keyfile you'll use to boot the moon.

```
|moon-breach ~sampel-sampel-palnet
```

If your moon gets into a bad state, `|moon-breach` performs a factory reset. 

```
|moon-cycle-keys ~sampel-sampel-palnet
```

The `|moon-cycle-keys` command updates your moon's cryptographic keys—useful for security or recovery purposes.

## References

- [Technical Documentation](https://docs.urbit.org/user-manual/os/dojo-tools#moon) — Moon management commands
