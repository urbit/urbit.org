const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const {
  normalizeArray,
  parseFrontMatter,
  toTitleCase,
} = require("./content-parse");

const CONTENT_DIR = path.join(process.cwd(), "app/content");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SNAPSHOT_DIR = path.join(process.cwd(), "snapshots/agents");
const BLOG_CUTOVER = "2025-10-01";
const EXCLUDED_FILE_NAMES = new Set(["config.md"]);

const splitHash = (value = "") => {
  const [pathname, hash = ""] = String(value).split("#");
  return {
    pathname: pathname || "/",
    hash: hash ? `#${hash}` : "",
  };
};

const stripHash = (value = "") => splitHash(value).pathname;

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
    isIntro,
  };
};

const normalizeInternalPath = (value, canonicalBase = "https://urbit.org") => {
  if (!value || typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const url = new URL(trimmed);
      const canonical = new URL(canonicalBase);
      if (url.host === canonical.host) {
        return `${url.pathname}${url.search}${url.hash}`;
      }
    } catch (error) {
      return null;
    }
  }

  return null;
};

const routeToHumanMarkdownUrl = (route) => {
  if (!route) return null;

  const normalized = normalizeInternalPath(route) || route;
  const { pathname, hash } = splitHash(normalized);

  if (pathname === "/") {
    return `/index.md${hash}`;
  }

  if (pathname === "/overview" || pathname === "/blog" || pathname === "/ecosystem") {
    return `${pathname}.md${hash}`;
  }

  if (pathname.startsWith("/overview/") || pathname.startsWith("/blog/")) {
    return `${pathname}.md${hash}`;
  }

  return null;
};

const routeToAgentMarkdownUrl = (route) => {
  if (!route) return null;

  const humanMdPath = routeToHumanMarkdownUrl(route);
  if (!humanMdPath) {
    return null;
  }

  const { pathname } = splitHash(humanMdPath);
  if (pathname === "/index.md") {
    return "/.agents/index.md";
  }

  return `/.agents${pathname}`;
};

const publicFilePathFromUrl = (urlPath) => {
  const { pathname } = splitHash(urlPath);
  return path.join(PUBLIC_DIR, pathname.replace(/^\//, ""));
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

const buildBlurbRouteMap = async () => {
  const map = new Map();
  const manualMappings = {
    "troubleshooting-your-urbit": "/overview/running-urbit/support",
    "common-pitfalls-of-running-urbit": "/overview/running-urbit/support",
    "groundwire-based-urbit-ids":
      "/overview/running-urbit/get-urbit-id#groundwire-based-urbit-ids",
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
        const homepageIntroTarget = sections[0]?.["section-id"] ? `/#${sections[0]["section-id"]}` : "/";

        sections.forEach((section) => {
          if (!section) return;
          const sectionBlurb = section["section-blurb"];
          addBlurbRoute(map, sectionBlurb, `/#${sectionBlurb}`);

          const subsectionBlurbs = normalizeArray(section["subsection-blurbs"]);
          subsectionBlurbs.forEach((blurbSlug) => {
            addBlurbRoute(map, blurbSlug, `/#${blurbSlug}`);
          });
        });

        addBlurbRoute(map, frontMatter.sidebar_blurb, homepageIntroTarget, { overwrite: true });
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

    const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
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

const resolveSearchEntry = (relativePath, blurbRoutes) => {
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

    const stripped = stripHash(targetPath);
    const parts = stripped.split("/").filter(Boolean);
    if (parts[0] === "overview") {
      return {
        path: targetPath,
        section: "overview",
        subsection: parts[1],
        subsectionLabel: parts[1] ? toTitleCase(parts[1]) : undefined,
      };
    }

    return {
      path: targetPath,
      section: "pages",
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

  if (section === "communities") {
    return { path: `/communities/${slug}`, section: "communities" };
  }

  if (section === "ecosystem") {
    if (segments[1] === "orgs") {
      return { path: "/ecosystem#companies", section: "ecosystem" };
    }

    if (segments[1] === "articles") {
      return { path: "/ecosystem#articles-press", section: "ecosystem" };
    }
  }

  if (segments.length === 1) {
    return { path: `/${slug}`, section: "pages" };
  }

  return {
    path: `/${relativePath.replace(/\.md$/, "")}`,
    section: "other",
  };
};

const resolveSourceDescriptor = (relativePath, blurbRoutes) => {
  const segments = relativePath.split("/");
  const filename = segments[segments.length - 1];
  const slug = path.basename(filename, ".md");
  const root = segments[0];

  if (root === "overview") {
    const overview = resolveOverviewEntry(segments, slug, relativePath);
    if (!overview) {
      return null;
    }

    return {
      root,
      slug,
      relativePath,
      sourceKind: "overview",
      sourceKey: overview.path,
      canonicalPath: overview.path,
      contextPath: overview.path,
      humanMdPath: routeToHumanMarkdownUrl(overview.path),
      agentPath: routeToAgentMarkdownUrl(overview.path),
      section: overview.section,
      subsection: overview.subsection,
      subsectionLabel: overview.subsectionLabel,
      isIntro: overview.isIntro,
      hasStandalonePage: true,
    };
  }

  if (root === "blog") {
    const canonicalPath = `/blog/${slug}`;
    return {
      root,
      slug,
      relativePath,
      sourceKind: "blog",
      sourceKey: canonicalPath,
      canonicalPath,
      contextPath: canonicalPath,
      humanMdPath: routeToHumanMarkdownUrl(canonicalPath),
      agentPath: routeToAgentMarkdownUrl(canonicalPath),
      section: "blog",
      hasStandalonePage: true,
    };
  }

  if (root === "blurbs") {
    const contextPath = blurbRoutes?.get(slug) || `/#${slug}`;
    return {
      root,
      slug,
      relativePath,
      sourceKind: "blurb",
      sourceKey: `blurb:${slug}`,
      canonicalPath: null,
      contextPath,
      humanMdPath: null,
      agentPath: `/.agents/blurbs/${slug}.md`,
      section: "blurbs",
      hasStandalonePage: false,
    };
  }

  if (root === "ecosystem") {
    if (segments[1] === "orgs") {
      return {
        root,
        slug,
        relativePath,
        sourceKind: "ecosystem-org",
        sourceKey: `ecosystem-org:${slug}`,
        canonicalPath: null,
        contextPath: "/ecosystem#companies",
        humanMdPath: null,
        agentPath: `/.agents/ecosystem/orgs/${slug}.md`,
        section: "ecosystem",
        hasStandalonePage: false,
      };
    }

    if (segments[1] === "articles") {
      return {
        root,
        slug,
        relativePath,
        sourceKind: "ecosystem-article",
        sourceKey: `ecosystem-article:${slug}`,
        canonicalPath: null,
        contextPath: "/ecosystem#articles-press",
        humanMdPath: null,
        agentPath: `/.agents/ecosystem/articles/${slug}.md`,
        section: "ecosystem",
        hasStandalonePage: false,
      };
    }
  }

  return null;
};

module.exports = {
  BLOG_CUTOVER,
  CONTENT_DIR,
  EXCLUDED_FILE_NAMES,
  PUBLIC_DIR,
  SNAPSHOT_DIR,
  buildBlurbRouteMap,
  getCanonicalBaseUrl,
  normalizeInternalPath,
  publicFilePathFromUrl,
  resolveOverviewEntry,
  resolveSearchEntry,
  resolveSourceDescriptor,
  routeToAgentMarkdownUrl,
  routeToHumanMarkdownUrl,
  splitHash,
  stripHash,
};
