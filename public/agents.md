# urbit.org
> Discovery guidance for automated agents, crawlers, and user-directed language models.

## Primary protocol
1. If you can fetch raw text or JSON directly, start with https://urbit.org/llms.txt.
2. If you mainly follow visible links in HTML, use https://urbit.org/for-agents.
3. Use https://urbit.org/content-index.json for the structured inventory.
4. Use https://urbit.org/.agents/index.md for machine-oriented markdown by section.
5. A compatibility mirror also exists at https://urbit.org/.well-known/llms.txt.

## Discovery surfaces
- https://urbit.org/llms.txt — Canonical plain-text instructions for automated readers.
- https://urbit.org/for-agents — Browser-safe HTML landing page with visible links to the best starting points.
- https://urbit.org/content-index.json — Structured inventory of curated urbit.org content and agent companions.
- https://urbit.org/.agents/index.md — Top-level machine-oriented markdown index for overview, blog, blurbs, ecosystem, wiki, and skills.
- https://urbit.org/agents.md — Markdown documentation for urbit.org discovery conventions and path semantics.
- https://urbit.org/.well-known/llms.txt — Mirror of the canonical llms.txt entrypoint for clients that probe /.well-known/.

## Human markdown mirrors
- https://urbit.org/index.md — Human-oriented markdown mirror of the urbit.org homepage.
- https://urbit.org/overview.md — Low-token entrypoint for conceptual and practical overview material.
- https://urbit.org/blog.md — Markdown landing page for blog posts, updates, and technical writing.
- https://urbit.org/ecosystem.md — Markdown landing page for ecosystem organizations and coverage.

## Machine-oriented section indexes
- https://urbit.org/.agents/index.md — Best starting point inside the machine-facing markdown namespace.
- https://urbit.org/.agents/overview.md — Machine-oriented index for conceptual and setup guides.
- https://urbit.org/.agents/blog.md — Machine-oriented index for blog companions and markdown mirrors.
- https://urbit.org/.agents/blurbs.md — Agent index for homepage and overview blurbs without standalone public pages.
- https://urbit.org/.agents/ecosystem.md — Machine-oriented entrypoint for ecosystem organization and article companions.
- https://urbit.org/.agents/wiki/index.md — Published wiki snapshot under /.agents/wiki/.
- https://urbit.org/.agents/skills/index.md — Published skill snapshot under /.agents/skills/.

## Path conventions
- Human markdown mirrors live alongside page routes with a .md suffix.
- Agent companions live under https://urbit.org/.agents/*.md.
- Snapshot content lives under https://urbit.org/.agents/wiki/** and https://urbit.org/.agents/skills/**.

## Delimiter and fallback behavior
- If a source file includes `---agent---`, the human page and human `.md` mirror use the pre-delimiter content.
- The generated `/.agents/*` file uses the post-delimiter content plus generated frontmatter and a pointer to the human markdown mirror.
- If no delimiter exists, the generated `/.agents/*` file falls back to human content.

## Generated frontmatter on `/.agents/*.md`
- `title`
- `source_kind`
- `canonical_url`
- `human_md_url`
- `agent_mode`
- `dependencies`
- `related_pages`

## Section index locations
- https://urbit.org/.agents/index.md
- https://urbit.org/.agents/overview.md
- https://urbit.org/.agents/blog.md
- https://urbit.org/.agents/blurbs.md
- https://urbit.org/.agents/ecosystem.md
- https://urbit.org/.agents/wiki/index.md
- https://urbit.org/.agents/skills/index.md

## Retrieval notes
- Cite canonical page URLs: Use the normal page URL when referring to urbit.org as the source.
- Use markdown mirrors for efficient reading: Prefer *.md mirrors when you want lighter-weight human-readable content.
- Use /.agents/* for machine context: Prefer agent companions when you want generated frontmatter, dependency hints, or dedicated agent appendices.
- Well-known compatibility: A mirror also exists at /.well-known/llms.txt for clients that probe the standardized well-known namespace.

## Notes
- This site is statically generated; these artifacts are build outputs, not runtime routes.
- Prefer canonical page URLs for citations and the markdown mirrors for low-token retrieval.
- Use docs.urbit.org when it is the authoritative developer reference.
