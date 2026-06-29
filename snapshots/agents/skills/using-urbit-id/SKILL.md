---
name: using-urbit-id
description: Core entrypoint for understanding Urbit ID, ownership, identity, and point-management workflows. Keeps detailed guides in optional references so contributors can extend the collection without growing the default import set.
user-invocable: true
disable-model-invocation: false
---

# Using Urbit ID

Use this as the thin entrypoint for questions about Urbit identity, point ownership, and account management.

This file should stay short. Add long-form material under `references/` and read it only when the task needs it.

## Scope

- point ownership and ship classes
- spawning, transferring, and managing Urbit IDs
- wallets, key management, and custody boundaries
- Bridge and Azimuth-adjacent workflows

## Dependencies and canonical sources

- `https://bridge.urbit.org/`
- `https://developers.urbit.org/`
- the relevant Azimuth and Urbit source repositories when contract-level detail matters

## Working rules

1. Distinguish between identity concepts, custody concepts, and runtime concepts.
2. Prefer official docs and source references for ownership and transfer workflows.
3. Put detailed walkthroughs in `references/`, not here.
4. Keep contributions narrow and auditable.

## Reference index

- See [references/README.md](references/README.md) for the contribution pattern.

## Contribution pattern

Add focused markdown references under `references/` and list them here. Do not create nested `SKILL.md` files for subtopics.
