#!/usr/bin/env node

/**
 * Search Index Builder
 *
 * Builds a static JSON index from app/content for the homepage search modal.
 *
 * Usage: node scripts/build-search-index.js
 */

const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const {
  collectAuthors,
  collectFrontMatterValues,
  collectTags,
  isSearchExcluded,
  normalizeSearchTerms,
  parseFrontMatter,
  parsePublishedTimestamp,
  toTitleCase,
  uniqueStrings,
} = require("./lib/content-parse");
const {
  CONTENT_DIR,
  EXCLUDED_FILE_NAMES,
  buildBlurbRouteMap,
  resolveSearchEntry,
} = require("./lib/route-utils");

const OUTPUT_PATH = path.join(process.cwd(), "public/search-index.json");
const INCLUDED_DIRECTORIES = new Set(["blog", "blurbs", "homepage", "overview"]);
const SECTION_ORDER = ["overview", "blog", "grants", "events", "pages", "other"];
const SECTION_LABELS = {
  overview: "Overview",
  blog: "Blog",
  grants: "Grants",
  events: "Events",
  pages: "Pages",
  other: "Other",
};

const getSectionRank = (section) => {
  const index = SECTION_ORDER.indexOf(section);
  return index === -1 ? SECTION_ORDER.length : index;
};

async function buildSearchIndex() {
  console.log("Building search index...\n");

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const blurbRoutes = await buildBlurbRouteMap();
  const contentGlob = path.join(
    CONTENT_DIR,
    `{${Array.from(INCLUDED_DIRECTORIES).join(",")}}/**/*.md`
  );
  const postPaths = await glob(contentGlob);
  const entries = [];
  const errors = [];

  for (const filePath of postPaths) {
    const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
    const filename = path.basename(filePath);
    const segments = relativePath.split("/");

    if (EXCLUDED_FILE_NAMES.has(filename)) {
      continue;
    }

    if (!INCLUDED_DIRECTORIES.has(segments[0])) {
      continue;
    }

    let rawContent;
    try {
      rawContent = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      console.error(`Failed to read ${filePath}:`, error);
      errors.push({ filePath, error });
      continue;
    }

    const parsed = parseFrontMatter(rawContent, filePath);
    if (!parsed) {
      errors.push({ filePath, error: new Error("Frontmatter parse failed") });
      continue;
    }

    if (isSearchExcluded(parsed.data)) {
      continue;
    }

    const routeInfo = resolveSearchEntry(relativePath, blurbRoutes);
    if (!routeInfo) {
      continue;
    }

    const title = parsed.data.title || toTitleCase(path.basename(filePath, ".md"));
    const description =
      parsed.data.description ||
      parsed.data.summary ||
      parsed.data.extra?.description ||
      "";
    const tags = collectTags(parsed.data);
    const searchTerms = normalizeSearchTerms(
      parsed.data.search_terms || parsed.data.searchTerms
    );
    const authors = collectAuthors(parsed.data);
    const publishedTimestamp = parsePublishedTimestamp(parsed.data);
    const sectionLabel = SECTION_LABELS[routeInfo.section] || toTitleCase(routeInfo.section);
    const entryId = relativePath;
    const source = segments[0];
    const frontMatterValues = collectFrontMatterValues(parsed.data);
    const searchText = uniqueStrings([
      title,
      description,
      tags.join(" "),
      searchTerms.join(" "),
      authors.join(" "),
      routeInfo.path,
      sectionLabel,
      routeInfo.subsectionLabel || "",
      ...frontMatterValues,
    ])
      .join(" ")
      .toLowerCase();

    entries.push({
      id: entryId,
      title,
      description,
      tags,
      searchTerms,
      authors,
      publishedTimestamp,
      source,
      path: routeInfo.path,
      section: routeInfo.section,
      sectionLabel,
      subsection: routeInfo.subsection,
      subsectionLabel: routeInfo.subsectionLabel,
      searchText,
    });
  }

  entries.sort((a, b) => {
    const sectionRank = getSectionRank(a.section) - getSectionRank(b.section);
    if (sectionRank !== 0) return sectionRank;
    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  });

  const output = {
    generatedAt: new Date().toISOString(),
    total: entries.length,
    entries,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf-8");

  console.log(`✓ Search index written to ${OUTPUT_PATH}`);
  console.log(`✓ Indexed ${entries.length} content entries`);

  if (errors.length > 0) {
    console.error(`Search index completed with ${errors.length} errors.`);
    process.exitCode = 1;
  }
}

buildSearchIndex().catch((error) => {
  console.error("Search index build failed:", error);
  process.exit(1);
});
