---
name: urbit-development
description: Core entrypoint for developing on Urbit. Keeps the default context small and points to deeper references for Hoon, generators, agents, desks, and related developer workflows.
user-invocable: true
disable-model-invocation: false
---

# Urbit Development

Use this as the thin entrypoint for development work on Urbit.

This file should stay short. Pull in the reference docs below only when they are relevant to the task at hand.

## Scope

- Hoon language fundamentals
- generators, threads, Gall agents, desks, and Clay workflows
- debugging and testing development patterns
- Kelvin decrement and desk migration workflows
- local fake-ship or MCP-backed scratch desk workflows when explicitly requested
- source and documentation discovery for Urbit developer work

## Dependencies and canonical sources

- `https://developers.urbit.org/`
- `https://github.com/urbit/urbit`
- the source repository for the specific app or desk you are working on

## Working rules

1. Start with the smallest relevant reference.
2. Prefer upstream docs and source code over folklore.
3. Add long-form material to `references/`, not this file.
4. When contributing, keep changes narrow: one reference doc and one index entry when possible.

## Reference index

- [Hoon basics](references/hoon-basics.md) — quick syntax and common gotchas
- [Generators](references/generators.md) — naked, `%say`, and `%ask` generators
- [Kelvin migrations](references/kelvin-migrations/README.md) — nested migration workflow index, including version-specific references such as 409k to 408k
- [MCP desk workflow](references/mcp-desk-workflow.md) — use an MCP-backed scratch desk for source-controlled Hoon experiments and tests

## Contribution pattern

To extend this skill, add a focused markdown file under `references/` and then add a short bullet here. Use nested reference folders for multi-part topics such as Kelvin migrations. Do not create nested `SKILL.md` files for subtopics.
