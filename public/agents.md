# urbit.org
> Guidance for automated agents and crawlers.

## Entry points
- https://urbit.org/llms.txt
- https://urbit.org/content-index.json
- https://urbit.org/.agents/index.md

## Path conventions
- Human markdown mirrors: https://urbit.org/index.md, https://urbit.org/overview.md, https://urbit.org/blog.md, https://urbit.org/ecosystem.md, plus page-backed mirrors like https://urbit.org/blog/llms-on-urbit.md
- Agent companions: https://urbit.org/.agents/*.md
- Snapshot content: https://urbit.org/.agents/wiki/** and https://urbit.org/.agents/skills/**

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

## Notes
- This site is statically generated; these artifacts are build outputs, not runtime routes.
- Prefer canonical page URLs for citations and the markdown mirrors for low-token retrieval.
- Use docs.urbit.org when it is the authoritative developer reference.
