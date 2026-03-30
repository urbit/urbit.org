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
const INCLUDED_DIRECTORIES = new Set(["blog", "blurbs", "homepage", "overview"]);
const EXCLUDED_FILE_NAMES = new Set(["config.md", "index.md"]);
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

const collectFrontMatterValues = (value, values = []) => {
  if (value === null || value === undefined) {
    return values;
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => collectFrontMatterValues(entry, values));
    return values;
  }

  if (typeof value === "object") {
    Object.values(value).forEach((entry) => collectFrontMatterValues(entry, values));
    return values;
  }

  if (typeof value === "string" || typeof value === "number") {
    const stringValue = String(value).trim();
    if (stringValue) {
      values.push(stringValue);
    }
  }

  return values;
};

const uniqueStrings = (values) => Array.from(new Set(values.filter(Boolean)));

const normalizeSearchTerms = (value) => {
  if (!value) return [];

  const values = normalizeArray(value).flatMap((entry) => {
    if (typeof entry === "string") {
      return entry
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (typeof entry === "number") {
      return [String(entry)];
    }

    return [];
  });

  return uniqueStrings(values);
};

const collectAuthors = (frontMatter) => {
  const values = [
    ...normalizeArray(frontMatter.author),
    ...normalizeArray(frontMatter.authors),
    ...normalizeArray(frontMatter.extra?.author),
    ...normalizeArray(frontMatter.extra?.authors),
  ]
    .map((entry) => String(entry || "").trim())
    .filter(Boolean);

  return uniqueStrings(values);
};

const parsePublishedTimestamp = (frontMatter) => {
  const dateValue =
    frontMatter.date ||
    frontMatter.published ||
    frontMatter.published_at ||
    frontMatter.updated ||
    frontMatter.extra?.date ||
    frontMatter.extra?.published ||
    frontMatter.extra?.updated;

  if (!dateValue) return null;

  const parsed = Date.parse(dateValue);
  return Number.isNaN(parsed) ? null : parsed;
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

const deriveSectionInfoFromPath = (targetPath) => {
  const parts = targetPath.split("/").filter(Boolean);
  if (!parts.length) {
    return { section: "pages" };
  }

  const [root, subsection] = parts;
  if (root === "overview") {
    return {
      section: "overview",
      subsection,
      subsectionLabel: subsection ? toTitleCase(subsection) : undefined,
    };
  }

  if (root === "blog") {
    return { section: "blog" };
  }

  if (root === "grants") {
    return { section: "grants" };
  }

  if (root === "events") {
    return { section: "events" };
  }

  return { section: "pages" };
};

const resolveOverviewEntry = (segments, slug, relativePath) => {
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
};

const addBlurbRoute = (map, slug, targetPath, { overwrite = false } = {}) => {
  if (!slug || !targetPath) {
    return;
  }

  if (!overwrite && map.has(slug)) {
    return;
  }

  if (overwrite && map.has(slug) && map.get(slug) !== targetPath) {
    console.warn(`Blurb ${slug} mapped to multiple routes; using ${targetPath}.`);
  }

  map.set(slug, targetPath);
};

const buildBlurbRouteMap = async () => {
  const map = new Map();
  const manualMappings = {
    "troubleshooting-your-urbit": "/overview/running-urbit/support",
    "common-pitfalls-of-running-urbit": "/overview/running-urbit/support",
    "groundwire-based-urbit-ids": "/overview/running-urbit/get-urbit-id",
  };

  Object.entries(manualMappings).forEach(([slug, target]) => {
    addBlurbRoute(map, slug, target, { overwrite: true });
  });
  const homepageConfigPath = path.join(CONTENT_DIR, "homepage/config.md");

  if (fs.existsSync(homepageConfigPath)) {
    try {
      const rawContent = fs.readFileSync(homepageConfigPath, "utf-8");
      const frontMatter = parseFrontMatter(rawContent, homepageConfigPath);
      if (frontMatter) {
        const sections = normalizeArray(frontMatter.sections);
        const homepageIntroTarget = sections[0]?.["section-id"]
          ? `/#${sections[0]["section-id"]}`
          : "/";
        sections.forEach((section) => {
          if (!section) return;
          const sectionBlurb = section["section-blurb"];
          addBlurbRoute(map, sectionBlurb, `/#${sectionBlurb}`);

          const subsectionBlurbs = normalizeArray(section["subsection-blurbs"]);
          subsectionBlurbs.forEach((blurbSlug) => {
            addBlurbRoute(map, blurbSlug, `/#${blurbSlug}`);
          });
        });

        const sidebarBlurb = frontMatter.sidebar_blurb;
        addBlurbRoute(map, sidebarBlurb, homepageIntroTarget, { overwrite: true });
      }
    } catch (error) {
      console.error("Failed to load homepage config for blurbs:", error);
    }
  }

  const overviewPaths = await glob(path.join(CONTENT_DIR, "overview/**/*.md"));
  for (const filePath of overviewPaths) {
    const filename = path.basename(filePath);
    if (EXCLUDED_FILE_NAMES.has(filename)) {
      continue;
    }

    let rawContent;
    try {
      rawContent = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      console.error(`Failed to read ${filePath}:`, error);
      continue;
    }

    const frontMatter = parseFrontMatter(rawContent, filePath);
    if (!frontMatter) {
      continue;
    }

    const blurbs = normalizeArray(frontMatter.blurbs);
    if (!blurbs.length) {
      continue;
    }

    const relativePath = path
      .relative(CONTENT_DIR, filePath)
      .replace(/\\/g, "/");
    const segments = relativePath.split("/");
    const slug = path.basename(filename, ".md");
    const routeInfo = resolveOverviewEntry(segments, slug, relativePath);

    if (!routeInfo) {
      continue;
    }

    blurbs.forEach((blurbSlug) => {
      addBlurbRoute(map, blurbSlug, `${routeInfo.path}#${blurbSlug}`, { overwrite: true });
    });
  }

  return map;
};

const resolveEntry = (relativePath, blurbRoutes) => {
  const segments = relativePath.split("/");
  const filename = segments[segments.length - 1];
  const slug = path.basename(filename, ".md");
  const section = segments[0];

  if (section === "overview") {
    return resolveOverviewEntry(segments, slug, relativePath);
  }

  if (section === "blog") {
    return { path: `/blog/${slug}`, section: "blog" };
  }

  if (section === "blurbs") {
    const targetPath = blurbRoutes?.get(slug);
    if (!targetPath) {
      console.warn(`Blurb missing route mapping: ${relativePath}`);
      return { path: `/#${slug}`, section: "pages" };
    }

    return {
      path: targetPath,
      ...deriveSectionInfoFromPath(targetPath),
    };
  }

  if (section === "homepage") {
    return { path: `/#${slug}`, section: "pages" };
  }

  if (section === "grants") {
    return { path: `/grants/${slug}`, section: "grants" };
  }

  if (section === "events") {
    return { path: `/events/${slug}`, section: "events" };
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

  const blurbRoutes = await buildBlurbRouteMap();
  const contentGlob = path.join(
    CONTENT_DIR,
    `{${Array.from(INCLUDED_DIRECTORIES).join(",")}}/**/*.md`
  );
  const postPaths = await glob(contentGlob);
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

    const frontMatter = parseFrontMatter(rawContent, filePath);
    if (!frontMatter) {
      errors.push({ filePath, error: new Error("Frontmatter parse failed") });
      continue;
    }

    const routeInfo = resolveEntry(relativePath, blurbRoutes);
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
    const searchTerms = normalizeSearchTerms(
      frontMatter.search_terms || frontMatter.searchTerms
    );
    const authors = collectAuthors(frontMatter);
    const publishedTimestamp = parsePublishedTimestamp(frontMatter);
    const sectionLabel = SECTION_LABELS[routeInfo.section] || toTitleCase(routeInfo.section);
    const entryId = relativePath;
    const source = segments[0];
    const frontMatterValues = collectFrontMatterValues(frontMatter);
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
