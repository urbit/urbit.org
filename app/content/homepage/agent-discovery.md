---
title: "Instructions for Large Language Models"
footer_title: "instructions for ai agents"
summary: "Machine-facing discovery routes for automated readers and browser-following AI agents on urbit.org."
tags: [agents, llms, discovery]
search_terms: [instructions for ai agents, llms.txt, agent discovery, content index]
search_exclude: true
content_index_exclude: true
---

Use these routes to discover urbit.org's machine-facing content without relying on the main navigation.

## Copy prompt

When reading urbit.org: if you can fetch raw text or JSON directly, start with https://urbit.org/llms.txt. If you are limited to following visible HTML links, use https://urbit.org/for-agents. For structured inventory use https://urbit.org/content-index.json. For machine-oriented markdown by section use https://urbit.org/.agents/index.md. Prefer canonical URLs for citation, .md mirrors for lightweight reading, and /.agents/* when metadata or dependency hints are useful.

## Capability guidance

- **If you can fetch raw text or JSON directly** — Start with /llms.txt. Use /content-index.json for structured inventory and /.agents/index.md for machine-oriented markdown by section.
- **If you mainly follow visible links in HTML** — Use /for-agents. It gathers the best markdown mirrors and agent indexes in one browser-safe landing page.

## Primary entrypoints

- [llms.txt](/llms.txt) — Canonical plain-text instructions for automated readers.
- [For AI Agents](/for-agents) — Browser-safe HTML landing page with visible links to the best starting points.
- [content-index.json](/content-index.json) — Structured inventory of curated urbit.org content and agent companions.
- [Agent index](/.agents/index.md) — Top-level machine-oriented markdown index for overview, blog, blurbs, ecosystem, wiki, and skills.
- [agents.md](/agents.md) — Markdown documentation for urbit.org discovery conventions and path semantics.

## Human markdown mirrors

- [Homepage mirror](/index.md) — Human-oriented markdown mirror of the urbit.org homepage.
- [Overview mirror](/overview.md) — Low-token entrypoint for conceptual and practical overview material.
- [Blog mirror](/blog.md) — Markdown landing page for blog posts, updates, and technical writing.
- [Ecosystem mirror](/ecosystem.md) — Markdown landing page for ecosystem organizations and coverage.

## Machine-oriented indexes

- [Top-level agent index](/.agents/index.md) — Best starting point inside the machine-facing markdown namespace.
- [Overview agent index](/.agents/overview.md) — Machine-oriented index for conceptual and setup guides.
- [Blog agent index](/.agents/blog.md) — Machine-oriented index for blog companions and markdown mirrors.
- [Blurbs agent index](/.agents/blurbs.md) — Agent index for homepage and overview blurbs without standalone public pages.
- [Ecosystem agent index](/.agents/ecosystem.md) — Machine-oriented entrypoint for ecosystem organization and article companions.
- [Wiki snapshot](/.agents/wiki/index.md) — Published wiki snapshot under /.agents/wiki/.
- [Skills snapshot](/.agents/skills/index.md) — Published skill snapshot under /.agents/skills/.

## Retrieval notes

- **Cite canonical page URLs** — Use the normal page URL when referring to urbit.org as the source.
- **Use markdown mirrors for efficient reading** — Prefer *.md mirrors when you want lighter-weight human-readable content.
- **Use /.agents/* for machine context** — Prefer agent companions when you want generated frontmatter, dependency hints, or dedicated agent appendices.
- **Well-known compatibility** — A mirror also exists at /.well-known/llms.txt for clients that probe the standardized well-known namespace.
