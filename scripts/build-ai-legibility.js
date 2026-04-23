#!/usr/bin/env node

/**
 * AI Legibility Builder
 *
 * Generates:
 * - public/content-index.json
 * - public/llms.txt
 * - public/agents.md
 */

const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const { llmsConfig } = require("./ai-legibility-config");
const {
  buildSummaryInfo,
  normalizeArray,
  normalizeSearchTerms,
  parseFrontMatter,
  splitAgentContent,
  toTitleCase,
  uniqueStrings,
} = (() => {
  const content = require("./lib/content-parse");
  const split = require("./lib/agent-split");
  return {
    ...content,
    splitAgentContent: split.splitAgentContent,
  };
})();
const {
  CONTENT_DIR,
  EXCLUDED_FILE_NAMES,
  buildBlurbRouteMap,
  getCanonicalBaseUrl,
  resolveSearchEntry,
  resolveSourceDescriptor,
} = require("./lib/route-utils");

const OUTPUT_INDEX = path.join(process.cwd(), "public/content-index.json");
const OUTPUT_LLMS = path.join(process.cwd(), "public/llms.txt");
const OUTPUT_AGENTS = path.join(process.cwd(), "public/agents.md");
const SUMMARY_RECOMMENDED_MAX = 280;
const SUMMARY_ENFORCED_DIRS = ["blog/", "blurbs/", "overview/"];
const EXCLUDED_SECTIONS = new Set(["grants", "events", "singles"]);

const loadConfigFrontMatter = (relativePath) => {
  const filePath = path.join(CONTENT_DIR, relativePath);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const parsed = parseFrontMatter(rawContent, filePath);
  return parsed?.data || null;
};

const toAbsoluteUrl = (relativePath, canonicalBase) => new URL(relativePath, canonicalBase).toString();

const buildSyntheticEntries = (canonicalBase) => {
  const siteConfig = loadConfigFrontMatter("config.md") || {};
  const homepageConfig = loadConfigFrontMatter("homepage/config.md") || {};
  const overviewConfig = loadConfigFrontMatter("overview/config.md") || {};

  return [
    {
      id: "synthetic/homepage",
      url: toAbsoluteUrl("/", canonicalBase),
      type: "homepage",
      source_kind: "homepage",
      title: siteConfig.title || "Urbit",
      summary:
        homepageConfig.description ||
        siteConfig.site_metadata?.description ||
        "Overview of Urbit with links to getting started, running a ship, and the broader ecosystem.",
      description: siteConfig.site_metadata?.description || homepageConfig.description || "",
      tags: [],
      search_terms: [],
      human_md_url: toAbsoluteUrl("/index.md", canonicalBase),
      agent_url: toAbsoluteUrl("/.agents/index.md", canonicalBase),
      agent_available: true,
      agent_mode: "fallback",
    },
    {
      id: "synthetic/overview",
      url: toAbsoluteUrl("/overview", canonicalBase),
      type: "overview",
      source_kind: "overview-index",
      title: "Overview",
      summary:
        overviewConfig.summary ||
        "Overview section navigation hub providing entry points to conceptual and practical Urbit guides.",
      description: overviewConfig.summary || "Overview section navigation hub for urbit.org.",
      tags: [],
      search_terms: [],
      human_md_url: toAbsoluteUrl("/overview.md", canonicalBase),
      agent_url: toAbsoluteUrl("/.agents/overview.md", canonicalBase),
      agent_available: true,
      agent_mode: "fallback",
    },
    {
      id: "synthetic/blog",
      url: toAbsoluteUrl("/blog", canonicalBase),
      type: "blog",
      source_kind: "blog-index",
      title: "Blog",
      summary: "Latest updates, developer spotlights, and technical deep dives from the Urbit community.",
      description: "Latest updates, developer spotlights, and technical deep dives from the Urbit community.",
      tags: [],
      search_terms: [],
      human_md_url: toAbsoluteUrl("/blog.md", canonicalBase),
      agent_url: toAbsoluteUrl("/.agents/blog.md", canonicalBase),
      agent_available: true,
      agent_mode: "fallback",
    },
    {
      id: "synthetic/ecosystem",
      url: toAbsoluteUrl("/ecosystem", canonicalBase),
      type: "ecosystem",
      source_kind: "ecosystem-index",
      title: "Ecosystem",
      summary: "Selected organizations and external coverage from the wider Urbit ecosystem.",
      description: "Selected organizations and coverage from the wider Urbit ecosystem.",
      tags: [],
      search_terms: [],
      human_md_url: toAbsoluteUrl("/ecosystem.md", canonicalBase),
      agent_url: toAbsoluteUrl("/.agents/ecosystem.md", canonicalBase),
      agent_available: true,
      agent_mode: "fallback",
    },
  ];
};

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

    const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
    const routeInfo = resolveSearchEntry(relativePath, blurbRoutes);
    if (!routeInfo) {
      continue;
    }

    if (EXCLUDED_SECTIONS.has(routeInfo.section)) {
      continue;
    }

    const descriptor = resolveSourceDescriptor(relativePath, blurbRoutes);
    const split = splitAgentContent(parsed.content || "");
    let title = parsed.data.title || toTitleCase(path.basename(filePath, ".md"));
    let description = parsed.data.description || parsed.data.extra?.description || "";
    const tags = uniqueStrings(
      normalizeArray(parsed.data.tags)
        .concat(normalizeArray(parsed.data.extra?.tags))
        .map((tag) => String(tag).trim())
        .filter(Boolean)
    );
    const searchTerms = normalizeSearchTerms(
      parsed.data.search_terms || parsed.data.searchTerms
    );
    const summaryInfo = buildSummaryInfo(parsed.data, split.humanContent);

    if (relativePath === "overview/urbit-explained/intro.md" && overviewExplainedConfig) {
      title = overviewExplainedConfig.title || title;
      description = overviewExplainedConfig.description || description;
    }

    if (relativePath === "overview/running-urbit/intro.md" && overviewRunningConfig) {
      title = overviewRunningConfig.title || title;
      description = overviewRunningConfig.description || description;
    }

    const url = toAbsoluteUrl(routeInfo.path, canonicalBase);

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
      source_kind: descriptor?.sourceKind || routeInfo.section,
      title,
      summary: summaryInfo.summary,
      description,
      tags,
      search_terms: searchTerms,
      human_md_url:
        descriptor?.hasStandalonePage && descriptor.humanMdPath
          ? toAbsoluteUrl(descriptor.humanMdPath, canonicalBase)
          : null,
      agent_url: descriptor?.agentPath ? toAbsoluteUrl(descriptor.agentPath, canonicalBase) : null,
      agent_available: Boolean(descriptor?.agentPath),
      agent_mode: descriptor ? (split.hasDedicatedAgentContent ? "dedicated" : "fallback") : null,
    });
  }

  buildSyntheticEntries(canonicalBase).forEach((entry) => {
    const existingIndex = entries.findIndex((candidate) => candidate.url === entry.url);
    if (existingIndex === -1) {
      entries.push(entry);
      summarySourcesByUrl.set(entry.url, "summary");
      return;
    }

    entries[existingIndex] = {
      ...entries[existingIndex],
      ...entry,
      summary: entry.summary || entries[existingIndex].summary,
      description: entry.description || entries[existingIndex].description,
    };
    summarySourcesByUrl.set(entry.url, "summary");
  });

  entries.sort((a, b) => a.url.localeCompare(b.url, undefined, { sensitivity: "base" }));

  return { entries, warnings, summarySourcesByUrl, canonicalBase };
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

const buildLlmsText = (entries, canonicalBase) => {
  const indexByUrl = new Map(entries.map((entry) => [entry.url, entry]));
  const lines = [];
  lines.push(`# ${llmsConfig.title}`);
  lines.push(`> ${llmsConfig.description}`);
  lines.push("");
  lines.push(
    "> Human markdown mirrors live alongside page routes with a .md suffix. Agent-specific companions live under /.agents/*. When a source file includes ---agent---, the companion uses only that appendix and points back to the human mirror."
  );
  lines.push("");

  lines.push("## Machine-readable surfaces");
  [
    {
      url: `${canonicalBase}/index.md`,
      title: "Homepage markdown mirror",
      summary: "Human-oriented markdown mirror of the homepage content.",
    },
    {
      url: `${canonicalBase}/.agents/index.md`,
      title: "Agent index",
      summary: "Top-level machine entry point for overview, blog, blurbs, ecosystem, wiki, and skills.",
    },
    {
      url: `${canonicalBase}/.agents/overview.md`,
      title: "Overview agent index",
      summary: "Machine-facing index for conceptual and setup guides.",
    },
    {
      url: `${canonicalBase}/.agents/blog.md`,
      title: "Blog agent index",
      summary: "Machine-facing index for blog companions and human markdown mirrors.",
    },
    {
      url: `${canonicalBase}/.agents/wiki/index.md`,
      title: "Wiki snapshot",
      summary: "Committed wiki-style snapshot content published under /.agents/wiki/.",
    },
    {
      url: `${canonicalBase}/.agents/skills/index.md`,
      title: "Skills snapshot",
      summary: "Committed skill snapshot content published under /.agents/skills/.",
    },
  ].forEach((entry) => {
    lines.push(`- [${entry.title}](${entry.url}) — ${entry.summary}`);
  });
  lines.push("");

  llmsConfig.sections.forEach((section) => {
    lines.push(`## ${section.title}`);
    section.entries.forEach((entry) => {
      const indexed = indexByUrl.get(entry.url);
      const title = indexed?.title || entry.title || entry.url;
      const summaryText = indexed?.summary || entry.summary || "";
      const summaryPart = summaryText ? ` — ${summaryText}` : "";
      lines.push(`- [${title}](${entry.url})${summaryPart}`);
      if (indexed?.human_md_url) {
        lines.push(`  - Human markdown mirror: ${indexed.human_md_url}`);
      }
      if (indexed?.agent_url) {
        lines.push(`  - Agent companion: ${indexed.agent_url}`);
      }
    });
    lines.push("");
  });

  return lines.join("\n").trim() + "\n";
};

const buildAgentsMd = (canonicalBase) => [
  "# urbit.org",
  "> Guidance for automated agents and crawlers.",
  "",
  "## Entry points",
  `- ${canonicalBase}/llms.txt`,
  `- ${canonicalBase}/content-index.json`,
  `- ${canonicalBase}/.agents/index.md`,
  "",
  "## Path conventions",
  `- Human markdown mirrors: ${canonicalBase}/index.md, ${canonicalBase}/overview.md, ${canonicalBase}/blog.md, ${canonicalBase}/ecosystem.md, plus page-backed mirrors like ${canonicalBase}/blog/llms-on-urbit.md`,
  `- Agent companions: ${canonicalBase}/.agents/*.md`,
  `- Snapshot content: ${canonicalBase}/.agents/wiki/** and ${canonicalBase}/.agents/skills/**`,
  "",
  "## Delimiter and fallback behavior",
  "- If a source file includes `---agent---`, the human page and human `.md` mirror use the pre-delimiter content.",
  "- The generated `/.agents/*` file uses the post-delimiter content plus generated frontmatter and a pointer to the human markdown mirror.",
  "- If no delimiter exists, the generated `/.agents/*` file falls back to human content.",
  "",
  "## Generated frontmatter on `/.agents/*.md`",
  "- `title`",
  "- `source_kind`",
  "- `canonical_url`",
  "- `human_md_url`",
  "- `agent_mode`",
  "- `dependencies`",
  "- `related_pages`",
  "",
  "## Section index locations",
  `- ${canonicalBase}/.agents/index.md`,
  `- ${canonicalBase}/.agents/overview.md`,
  `- ${canonicalBase}/.agents/blog.md`,
  `- ${canonicalBase}/.agents/blurbs.md`,
  `- ${canonicalBase}/.agents/ecosystem.md`,
  `- ${canonicalBase}/.agents/wiki/index.md`,
  `- ${canonicalBase}/.agents/skills/index.md`,
  "",
  "## Notes",
  "- This site is statically generated; these artifacts are build outputs, not runtime routes.",
  "- Prefer canonical page URLs for citations and the markdown mirrors for low-token retrieval.",
  "- Use docs.urbit.org when it is the authoritative developer reference.",
  "",
].join("\n");

const assertRequiredSummaries = (entries, summarySourcesByUrl) => {
  const requiredUrls = [];
  llmsConfig.sections.forEach((section) => {
    section.entries.forEach((entry) => {
      if (entry.required) {
        requiredUrls.push(entry.url);
      }
    });
  });

  const indexByUrl = new Map(entries.map((entry) => [entry.url, entry]));
  return requiredUrls.reduce((failures, url) => {
    const entry = indexByUrl.get(url);
    const source = summarySourcesByUrl?.get(url) || "missing";
    if (!entry || source !== "summary") {
      failures.push({ url, source });
    }
    return failures;
  }, []);
};

async function buildAiLegibility() {
  console.log("Building AI legibility artifacts...\n");

  const outputDir = path.dirname(OUTPUT_INDEX);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const { entries, warnings, summarySourcesByUrl, canonicalBase } = await buildContentIndex();
  const indexOutput = {
    generatedAt: new Date().toISOString(),
    total: entries.length,
    entries,
  };

  fs.writeFileSync(OUTPUT_INDEX, JSON.stringify(indexOutput, null, 2), "utf-8");
  fs.writeFileSync(OUTPUT_LLMS, buildLlmsText(entries, canonicalBase), "utf-8");
  fs.writeFileSync(OUTPUT_AGENTS, buildAgentsMd(canonicalBase), "utf-8");

  console.log(`✓ Content index written to ${OUTPUT_INDEX}`);
  console.log(`✓ llms.txt written to ${OUTPUT_LLMS}`);
  console.log(`✓ agents.md written to ${OUTPUT_AGENTS}`);
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
