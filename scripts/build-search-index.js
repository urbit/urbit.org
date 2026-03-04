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
const matter = require("gray-matter");
const { glob } = require("glob");
const toml = require("@iarna/toml");

const CONTENT_DIR = path.join(process.cwd(), "app/content");
const OUTPUT_PATH = path.join(process.cwd(), "public/search-index.json");
const EXCLUDED_FILE_NAMES = new Set(["config.md", "index.md"]);
const EXCLUDED_SLUGS = new Set(["get-on-the-network"]);
const EXCLUDED_DIRECTORIES = new Set(["blurbs", "homepage"]);
const SECTION_ORDER = ["overview", "blog", "grants", "events", "pages", "other"];
const SECTION_LABELS = {
  overview: "Overview",
  blog: "Blog",
  grants: "Grants",
  events: "Events",
  pages: "Pages",
  other: "Other",
};

const toTitleCase = (value) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

const normalizeArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const collectTags = (frontMatter) => {
  const tags = [
    ...normalizeArray(frontMatter.tags),
    ...normalizeArray(frontMatter.extra?.tags),
    ...normalizeArray(frontMatter.taxonomies?.tags),
    ...normalizeArray(frontMatter.taxonomies?.grant_type),
    ...normalizeArray(frontMatter.taxonomies?.grant_category),
  ]
    .map((tag) => String(tag).trim())
    .filter(Boolean);

  return Array.from(new Set(tags));
};

const parseFrontMatter = (raw, filePath) => {
  const trimmed = raw.trimStart();
  const usesToml = trimmed.startsWith("+++");
  const options = usesToml
    ? {
        engines: { toml: toml.parse.bind(toml) },
        language: "toml",
        delimiters: "+++",
      }
    : undefined;

  try {
    const { data } = matter(raw, options);
    return data || {};
  } catch (error) {
    console.error(`Failed to parse frontmatter for ${filePath}:`, error);
    return null;
  }
};

const resolveEntry = (relativePath) => {
  const segments = relativePath.split("/");
  const filename = segments[segments.length - 1];
  const slug = path.basename(filename, ".md");
  const section = segments[0];

  if (EXCLUDED_SLUGS.has(slug)) {
    return null;
  }

  if (section === "overview") {
    const overviewSection = segments[1];
    if (!overviewSection) {
      console.warn(`Skipping overview content without subsection: ${relativePath}`);
      return null;
    }

    const isIntro = slug === "intro";
    const pathSuffix = isIntro
      ? `/overview/${overviewSection}`
      : `/overview/${overviewSection}/${slug}`;

    return {
      path: pathSuffix,
      section: "overview",
      subsection: overviewSection,
      subsectionLabel: toTitleCase(overviewSection),
    };
  }

  if (section === "blog") {
    return { path: `/blog/${slug}`, section: "blog" };
  }

  if (section === "grants") {
    return { path: `/grants/${slug}`, section: "grants" };
  }

  if (section === "events") {
    return { path: `/events/${slug}`, section: "events" };
  }

  if (section === "singles") {
    return { path: `/${slug}`, section: "pages" };
  }

  if (segments.length === 1) {
    return { path: `/${slug}`, section: "pages" };
  }

  return {
    path: `/${relativePath.replace(/\.md$/, "")}`,
    section: "other",
  };
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

  const postPaths = await glob(path.join(CONTENT_DIR, "**/*.md"));
  const entries = [];
  const errors = [];

  for (const filePath of postPaths) {
    const relativePath = path
      .relative(CONTENT_DIR, filePath)
      .replace(/\\/g, "/");
    const filename = path.basename(filePath);
    const segments = relativePath.split("/");

    if (EXCLUDED_FILE_NAMES.has(filename)) {
      continue;
    }

    if (segments.some((segment) => EXCLUDED_DIRECTORIES.has(segment))) {
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

    const frontMatter = parseFrontMatter(rawContent, filePath);
    if (!frontMatter) {
      errors.push({ filePath, error: new Error("Frontmatter parse failed") });
      continue;
    }

    const routeInfo = resolveEntry(relativePath);
    if (!routeInfo) {
      continue;
    }

    const title = frontMatter.title || toTitleCase(path.basename(filePath, ".md"));
    const description =
      frontMatter.description ||
      frontMatter.summary ||
      frontMatter.extra?.description ||
      "";
    const tags = collectTags(frontMatter);
    const sectionLabel = SECTION_LABELS[routeInfo.section] || toTitleCase(routeInfo.section);
    const searchText = [
      title,
      description,
      tags.join(" "),
      routeInfo.path,
      sectionLabel,
      routeInfo.subsectionLabel || "",
    ]
      .join(" ")
      .toLowerCase();

    entries.push({
      title,
      description,
      tags,
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
