#!/usr/bin/env node

/**
 * AI Legibility Builder
 *
 * Generates:
 * - public/content-index.json
 * - public/llms.txt
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { glob } = require("glob");
const toml = require("@iarna/toml");
const { llmsConfig } = require("./ai-legibility-config");

const CONTENT_DIR = path.join(process.cwd(), "app/content");
const OUTPUT_INDEX = path.join(process.cwd(), "public/content-index.json");
const OUTPUT_LLMS = path.join(process.cwd(), "public/llms.txt");
const EXCLUDED_FILE_NAMES = new Set(["config.md"]);
const SUMMARY_RECOMMENDED_MAX = 280;
const SUMMARY_ENFORCED_DIRS = ["blog/", "blurbs/", "overview/"];
const EXCLUDED_SECTIONS = new Set(["grants", "events", "singles"]);

const normalizeArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
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

const stripMarkdown = (value) => {
  if (!value) return "";
  let text = String(value);
  text = text.replace(/```[\s\S]*?```/g, " ");
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/!\[[^\]]*\]\([^\)]+\)/g, " ");
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/_([^_]+)_/g, "$1");
  text = text.replace(/^#+\s+/gm, "");
  text = text.replace(/^>\s+/gm, "");
  text = text.replace(/\s+/g, " ").trim();
  return text;
};

const extractFirstParagraph = (content) => {
  if (!content) return "";
  const chunks = content
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  for (const chunk of chunks) {
    const cleaned = stripMarkdown(chunk.replace(/\n+/g, " "));
    if (cleaned) {
      return cleaned;
    }
  }

  return "";
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
    const { data, content } = matter(raw, options);
    return { data: data || {}, content };
  } catch (error) {
    console.error(`Failed to parse frontmatter for ${filePath}:`, error);
    return null;
  }
};

const toTitleCase = (value) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

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

  return { path: pathSuffix };
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
      const parsed = parseFrontMatter(rawContent, homepageConfigPath);
      if (parsed) {
        const frontMatter = parsed.data;
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

    const parsed = parseFrontMatter(rawContent, filePath);
    if (!parsed) {
      continue;
    }

    const blurbs = normalizeArray(parsed.data.blurbs);
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

  if (relativePath === "index.md") {
    return { path: "/", section: "homepage" };
  }

  if (section === "overview") {
    const overviewEntry = resolveOverviewEntry(segments, slug, relativePath);
    return overviewEntry ? { ...overviewEntry, section: "overview" } : null;
  }

  if (section === "blog") {
    return { path: `/blog/${slug}`, section: "blog" };
  }

  if (section === "blurbs") {
    const targetPath = blurbRoutes?.get(slug);
    if (!targetPath) {
      console.warn(`Blurb missing route mapping: ${relativePath}`);
      return { path: `/#${slug}`, section: "blurbs" };
    }

    return { path: targetPath, section: "blurbs" };
  }

  if (section === "homepage") {
    return { path: `/#${slug}`, section: "homepage" };
  }

  if (section === "grants") {
    return { path: `/grants/${slug}`, section: "grants" };
  }

  if (section === "events") {
    return { path: `/events/${slug}`, section: "events" };
  }

  if (section === "communities") {
    return { path: `/communities/${slug}`, section: "communities" };
  }

  if (section === "ecosystem") {
    return { path: `/ecosystem/${slug}`, section: "ecosystem" };
  }

  if (section === "singles") {
    return { path: `/${slug}`, section: "singles" };
  }

  if (section === "communities") {
    return { path: `/communities/${slug}` };
  }

  if (segments.length === 1) {
    return { path: `/${slug}`, section: "pages" };
  }

  return { path: `/${relativePath.replace(/\.md$/, "")}`, section: "other" };
};

const getCanonicalBaseUrl = () => {
  const configPath = path.join(CONTENT_DIR, "config.md");
  if (!fs.existsSync(configPath)) {
    return "https://urbit.org";
  }

  const rawContent = fs.readFileSync(configPath, "utf-8");
  const parsed = parseFrontMatter(rawContent, configPath);
  const url = parsed?.data?.site_metadata?.canonicalUrl;
  return url || "https://urbit.org";
};

const loadConfigFrontMatter = (relativePath) => {
  const filePath = path.join(CONTENT_DIR, relativePath);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const parsed = parseFrontMatter(rawContent, filePath);
  return parsed?.data || null;
};

const buildSummaryInfo = (frontMatter, content) => {
  const rawSummary = frontMatter?.summary;
  const summaryText = stripMarkdown(rawSummary || "");
  if (summaryText) {
    return { summary: summaryText, source: "summary" };
  }

  const firstParagraph = extractFirstParagraph(content);
  if (firstParagraph) {
    return { summary: firstParagraph, source: "content" };
  }

  const description = stripMarkdown(frontMatter?.description || "");
  if (description) {
    return { summary: description, source: "description" };
  }

  return { summary: "", source: "missing" };
};

const collectAliases = (frontMatter) =>
  uniqueStrings(normalizeArray(frontMatter.aliases).map((alias) => String(alias).trim()));

const buildContentIndex = async () => {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const blurbRoutes = await buildBlurbRouteMap();
  const overviewExplainedConfig = loadConfigFrontMatter("overview/urbit-explained/config.md");
  const overviewRunningConfig = loadConfigFrontMatter("overview/running-urbit/config.md");
  const postPaths = await glob(path.join(CONTENT_DIR, "**/*.md"));
  const entries = [];
  const summarySourcesByUrl = new Map();
  const warnings = {
    missing: [],
    long: [],
    fallback: [],
  };

  const canonicalBase = getCanonicalBaseUrl();
  const canonicalUrl = new URL(canonicalBase);

  for (const filePath of postPaths) {
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

    const parsed = parseFrontMatter(rawContent, filePath);
    if (!parsed) {
      continue;
    }

    const relativePath = path
      .relative(CONTENT_DIR, filePath)
      .replace(/\\/g, "/");
    const routeInfo = resolveEntry(relativePath, blurbRoutes);
    if (!routeInfo) {
      continue;
    }

    if (EXCLUDED_SECTIONS.has(routeInfo.section)) {
      continue;
    }

    let title = parsed.data.title || toTitleCase(path.basename(filePath, ".md"));
    let description = stripMarkdown(parsed.data.description || parsed.data.extra?.description || "");
    const tags = uniqueStrings(
      normalizeArray(parsed.data.tags)
        .concat(normalizeArray(parsed.data.extra?.tags))
        .map((tag) => String(tag).trim())
        .filter(Boolean)
    );
    const searchTerms = normalizeSearchTerms(
      parsed.data.search_terms || parsed.data.searchTerms
    );
    const summaryInfo = buildSummaryInfo(parsed.data, parsed.content);

    if (relativePath === "overview/urbit-explained/intro.md" && overviewExplainedConfig) {
      title = overviewExplainedConfig.title || title;
      description = stripMarkdown(overviewExplainedConfig.description || description);
    }

    if (relativePath === "overview/running-urbit/intro.md" && overviewRunningConfig) {
      title = overviewRunningConfig.title || title;
      description = stripMarkdown(overviewRunningConfig.description || description);
    }

    const url = new URL(routeInfo.path, canonicalUrl).toString();

    if (summaryInfo.source === "missing") {
      warnings.missing.push({ path: relativePath, url });
    }

    if (summaryInfo.source !== "summary") {
      warnings.fallback.push({ path: relativePath, url, source: summaryInfo.source });
    }

    if (summaryInfo.summary && summaryInfo.summary.length > SUMMARY_RECOMMENDED_MAX) {
      warnings.long.push({ path: relativePath, url, length: summaryInfo.summary.length });
    }

    summarySourcesByUrl.set(url, summaryInfo.source);
    entries.push({
      id: relativePath,
      url,
      type: routeInfo.section,
      title,
      summary: summaryInfo.summary,
      description,
      tags,
      search_terms: searchTerms,
    });
  }

  const overviewUrl = new URL("/overview", canonicalUrl).toString();
  const explainedUrl = new URL("/overview/urbit-explained", canonicalUrl).toString();
  const hasOverview = entries.some((entry) => entry.url === overviewUrl);
  if (!hasOverview) {
    const sourceEntry = entries.find((entry) => entry.url === explainedUrl);
    if (sourceEntry) {
      entries.push({
        ...sourceEntry,
        id: "overview/redirect",
        url: overviewUrl,
        title: "Overview",
      });
      summarySourcesByUrl.set(overviewUrl, "summary");
    }
  }

  entries.sort((a, b) => a.url.localeCompare(b.url, undefined, { sensitivity: "base" }));

  return { entries, warnings, summarySourcesByUrl };
};

const summarizeWarnings = (warnings) => {
  const listWarnings = (label, items) => {
    if (!items.length) return;
    console.warn(`\n${label} (${items.length}):`);
    items.slice(0, 25).forEach((entry) => {
      const suffix = entry.length ? ` (${entry.length} chars)` : "";
      const source = entry.source ? ` [${entry.source}]` : "";
      console.warn(`- ${entry.path}${suffix}${source}`);
    });
    if (items.length > 25) {
      console.warn(`- ...and ${items.length - 25} more`);
    }
  };

  listWarnings("Missing summary", warnings.missing);
  listWarnings("Summary exceeds recommended length", warnings.long);
  listWarnings("Summary fallback used", warnings.fallback);
};

const buildLlmsText = (entries) => {
  const indexByUrl = new Map(entries.map((entry) => [entry.url, entry]));
  const lines = [];
  lines.push(`# ${llmsConfig.title}`);
  lines.push(`> ${llmsConfig.description}`);
  lines.push("");

  llmsConfig.sections.forEach((section) => {
    lines.push(`## ${section.title}`);
    section.entries.forEach((entry) => {
      const indexed = indexByUrl.get(entry.url);
      const title = indexed?.title || entry.title || entry.url;
      const summaryText = indexed?.summary || entry.summary || "";
      const summaryPart = summaryText ? ` — ${summaryText}` : "";
      lines.push(`- [${title}](${entry.url})${summaryPart}`);
    });
    lines.push("");
  });

  return lines.join("\n").trim() + "\n";
};

const assertRequiredSummaries = (entries, summarySourcesByUrl) => {
  const requiredUrls = [];
  llmsConfig.sections.forEach((section) => {
    section.entries.forEach((entry) => {
      if (entry.required) {
        requiredUrls.push(entry.url);
      }
    });
  });

  if (!requiredUrls.length) {
    return [];
  }

  const indexByUrl = new Map(entries.map((entry) => [entry.url, entry]));
  const failures = [];

  requiredUrls.forEach((url) => {
    const entry = indexByUrl.get(url);
    const source = summarySourcesByUrl?.get(url) || "missing";
    if (!entry || source !== "summary") {
      failures.push({ url, source });
    }
  });

  return failures;
};

async function buildAiLegibility() {
  console.log("Building AI legibility artifacts...\n");

  const outputDir = path.dirname(OUTPUT_INDEX);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const { entries, warnings, summarySourcesByUrl } = await buildContentIndex();
  const indexOutput = {
    generatedAt: new Date().toISOString(),
    total: entries.length,
    entries,
  };

  fs.writeFileSync(OUTPUT_INDEX, JSON.stringify(indexOutput, null, 2), "utf-8");
  fs.writeFileSync(OUTPUT_LLMS, buildLlmsText(entries), "utf-8");

  console.log(`✓ Content index written to ${OUTPUT_INDEX}`);
  console.log(`✓ llms.txt written to ${OUTPUT_LLMS}`);
  console.log(`✓ Indexed ${entries.length} content entries`);

  summarizeWarnings(warnings);

  const requiredFailures = assertRequiredSummaries(entries, summarySourcesByUrl);
  if (requiredFailures.length) {
    console.error("\nRequired pages missing summary:");
    requiredFailures.forEach((failure) => {
      console.error(`- ${failure.url} [${failure.source}]`);
    });
    process.exitCode = 1;
  }

  const enforcedOverages = warnings.long.filter((entry) =>
    SUMMARY_ENFORCED_DIRS.some((dir) => entry.path.startsWith(dir))
  );
  if (enforcedOverages.length) {
    console.error("\nSummary length exceeds enforced limit in:");
    enforcedOverages.forEach((entry) => {
      console.error(`- ${entry.path} (${entry.length} chars)`);
    });
    process.exitCode = 1;
  }
}

buildAiLegibility().catch((error) => {
  console.error("AI legibility build failed:", error);
  process.exit(1);
});
