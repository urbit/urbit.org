# urbit.org
> Guidance for automated agents and crawlers.

## Entry points
- https://urbit.org/llms.txt
- https://urbit.org/content-index.json

## Content format
- Primary content is Markdown with Markdoc frontmatter.
- Use canonical URLs for citations.

## content-index.json schema
Each entry is a flat object with these fields:
- `url`: canonical URL for the page
- `type`: one of `homepage`, `overview`, `blog`, `blurbs`, `ecosystem`, `communities`, `pages`, `other`
- `title`: page title
- `summary`: 1-2 sentence plain-text summary (may be fallback)
- `description`: existing SEO description
- `tags`: array of strings
- `search_terms`: array of strings

## Quoting and attribution
- Prefer quoting from canonical pages on urbit.org.
- Use docs.urbit.org for developer references when it is the authoritative source.

## Notes
- This site is statically generated; content is updated via source control.
