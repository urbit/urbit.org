# Testing

Run these commands from the repository root after installing the existing dependencies:

```sh
npm run build
npm run lint
npm run test:article-lists
npm run test:agent-snapshot
npm run test:umami-guard
git diff --check
```

The build refreshes the generated Markdown mirrors and indexes before exporting the site. Review generated diffs alongside source changes.

## Article list regression guard

`scripts/test-article-lists.js` uses the existing PostCSS, Markdoc and HTML parser dependencies with Node's built-in test runner. It checks:

- Ordered items use outside markers and a gutter, so paragraph-wrapped items do not place their numbers on separate lines.
- Marker rules use direct-child selectors. Numbering must not leak into nested bullets, and dash markers must not leak into nested ordered lists.
- Loose lists preserve multiple paragraphs, nested bullets and continuation text within the correct step.
- Tight lists preserve unordered/ordered/unordered nesting.

The CSS assertions protect the relevant utility rules; they do not replace browser layout checks.

## Responsive typography checks

For list-style changes, also inspect the built article in Chromium at desktop (1600px) and mobile (390px) widths:

1. Confirm each number aligns with its item's first line, including items containing paragraphs.
2. Confirm nested bullets have one dash and no decimal marker.
3. Confirm ordered lists nested inside bullets have numbers but no inherited dash.
4. Confirm continuation paragraphs remain within their step and neither layout overflows horizontally.
5. Confirm tight lists, article headings, subtitle and artwork still render correctly.

Use a fresh browser context and the production export or deployment preview. Offline layout fixtures must explicitly stub analytics: `/umami-script.js` is a Vercel proxy, not an exported file. Report any blocked external assets rather than treating that fixture as full network validation.
