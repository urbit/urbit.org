#!/usr/bin/env node

/**
 * Agent Artifact Builder
 *
 * Generates:
 * - human markdown mirrors for selected public pages
 * - /.agents/* machine-facing markdown companions and indexes
 * - /.agents/wiki and /.agents/skills snapshot exports from committed sources
 */

const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const {
  buildSummaryInfo,
  collectAuthors,
  collectReferenceLinks,
  extractMarkdownLinks,
  normalizeArray,
  parseFrontMatter,
  stripMarkdown,
  toTitleCase,
  uniqueStrings,
} = require("./lib/content-parse");
const { splitAgentContent } = require("./lib/agent-split");
const {
  BLOG_CUTOVER,
  CONTENT_DIR,
  PUBLIC_DIR,
  SNAPSHOT_DIR,
  buildBlurbRouteMap,
  getCanonicalBaseUrl,
  normalizeInternalPath,
  publicFilePathFromUrl,
  resolveSourceDescriptor,
  routeToAgentMarkdownUrl,
  routeToHumanMarkdownUrl,
  stripHash,
} = require("./lib/route-utils");
const { deriveDependencies } = require("./lib/agent-dependency-rules");
const {
  renderBlurbSection,
  renderLinkBullet,
  renderLinkSection,
  renderPageHeader,
  renderYamlFrontmatter,
  writeTextFile,
} = require("./lib/markdown-export");

const GENERATED_ROOTS = [
  path.join(PUBLIC_DIR, ".agents"),
  path.join(PUBLIC_DIR, "index.md"),
  path.join(PUBLIC_DIR, "overview.md"),
  path.join(PUBLIC_DIR, "overview"),
  path.join(PUBLIC_DIR, "blog.md"),
  path.join(PUBLIC_DIR, "blog"),
  path.join(PUBLIC_DIR, "ecosystem.md"),
];

const canonicalBaseUrl = getCanonicalBaseUrl();

const readParsedFile = (relativePath) => {
  const filePath = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  const parsed = parseFrontMatter(raw, filePath);
  if (!parsed) {
    throw new Error(`Unable to parse ${relativePath}`);
  }

  return {
    filePath,
    relativePath,
    raw,
    ...parsed,
  };
};

const sortByTitle = (items = []) =>
  [...items].sort((a, b) => String(a.title || "").localeCompare(String(b.title || ""), undefined, {
    sensitivity: "base",
  }));

const sortByDateDescending = (items = []) =>
  [...items].sort((a, b) => {
    const aTime = Date.parse(a.date || 0) || 0;
    const bTime = Date.parse(b.date || 0) || 0;
    return bTime - aTime;
  });

const buildInternalPageLinks = ({ content = "", frontMatter = {}, contextPath = null }) => {
  const rawLinks = [...extractMarkdownLinks(content), ...collectReferenceLinks(frontMatter)];

  return uniqueStrings(
    rawLinks
      .map((link) => {
        if (String(link).startsWith("#") && contextPath) {
          return `${stripHash(contextPath)}${link}`;
        }

        return normalizeInternalPath(link, canonicalBaseUrl);
      })
      .filter(Boolean)
      .map((link) => routeToHumanMarkdownUrl(link) || null)
      .filter(Boolean)
  );
};

const buildRelatedPages = ({ artifact, explicit = [], inferred = [] }) => {
  const candidates = new Set();

  explicit.forEach((link) => {
    if (link) candidates.add(link);
  });

  inferred.forEach((link) => {
    if (link) candidates.add(link);
  });

  if (artifact.humanMdPath) {
    candidates.add(artifact.humanMdPath);
  }

  if (artifact.contextPath) {
    const contextMirror = routeToHumanMarkdownUrl(stripHash(artifact.contextPath));
    if (contextMirror) {
      candidates.add(contextMirror);
    }
  }

  return uniqueStrings(Array.from(candidates)).filter((link) => link !== artifact.agentPath);
};

const buildAgentFrontmatter = ({ artifact, title, agentMode, relatedPages, dependencies }) => ({
  title,
  source_kind: artifact.sourceKind,
  canonical_url: artifact.canonicalPath,
  human_md_url: artifact.humanMdPath,
  agent_mode: agentMode,
  dependencies,
  related_pages: relatedPages,
});

const buildAgentDocument = ({ artifact, title, body, agentMode, relatedPages, dependencies }) => {
  const frontmatter = renderYamlFrontmatter(
    buildAgentFrontmatter({ artifact, title, agentMode, relatedPages, dependencies })
  );

  const lines = [frontmatter.trimEnd(), ""];
  if (artifact.humanMdPath) {
    lines.push(`Human-oriented content: ${artifact.humanMdPath}`, "");
  }

  if (body) {
    lines.push(String(body).trim(), "");
  }

  return lines.join("\n").trim() + "\n";
};

const loadBlurb = (slug) => {
  const parsed = readParsedFile(`blurbs/${slug}.md`);
  const split = splitAgentContent(parsed.content);
  return {
    ...parsed,
    slug,
    title: parsed.data.title || toTitleCase(slug),
    description: parsed.data.description || "",
    summary: buildSummaryInfo(parsed.data, split.humanContent).summary,
    humanContent: split.humanContent,
    agentContent: split.agentContent,
    hasDedicatedAgentContent: split.hasDedicatedAgentContent,
    tabs: normalizeArray(parsed.data.tabs).map((tab) => ({
      title: tab.title,
      content: tab.content || "",
    })),
    references: normalizeArray(parsed.data.references),
    ctaButton: parsed.data["call-to-action"] || null,
  };
};

const renderBlurbMarkdown = (blurb, depth = 2) =>
  renderBlurbSection({
    title: blurb.title,
    description: blurb.description,
    body: blurb.humanContent,
    tabs: blurb.tabs,
    references: blurb.references,
    ctaButton: blurb.ctaButton,
    depth,
  });

const buildOverviewLandingMarkdown = ({ title, description, introContent, sectionEntries }) => {
  const lines = [renderPageHeader({ title, description }), String(introContent || "").trim(), ""];

  if (sectionEntries.length) {
    lines.push(
      renderLinkSection(
        "Pages",
        sectionEntries.map((entry) => ({
          title: entry.title,
          url: entry.humanMdPath,
          description: entry.description,
        }))
      ).trim(),
      ""
    );
  }

  return lines.join("\n").trim() + "\n";
};

const buildOverviewSectionMarkdown = ({ title, description, body, blurbs }) => {
  const lines = [renderPageHeader({ title, description }), String(body || "").trim(), ""];

  blurbs.forEach((blurb) => {
    lines.push(renderBlurbMarkdown(blurb, 2), "");
  });

  return lines.join("\n").trim() + "\n";
};

const buildBlogPostHumanMarkdown = (post) => {
  const metadataLines = [];
  if (post.date) metadataLines.push(`- Date: ${post.date}`);
  if (post.authors.length) metadataLines.push(`- Author: ${post.authors.join(", ")}`);

  return [
    renderPageHeader({
      title: post.title,
      description: post.description,
      metadataLines,
    }),
    String(post.humanContent || "").trim(),
    "",
  ].join("\n");
};

const buildHomepageHumanMarkdown = ({ siteConfig, homepageConfig, sidebarBlurb, sections }) => {
  const hero = homepageConfig.data.hero || {};
  const title = siteConfig.data.title || "Urbit";
  const description = hero.title || homepageConfig.data.description || siteConfig.data.site_metadata?.description;
  const ctaItems = [hero.primaryCta, hero.secondaryCta, hero.tertiaryLink]
    .filter(Boolean)
    .map((item) => ({
      title: item.label,
      url: item.link,
      description: null,
    }));

  const lines = [renderPageHeader({ title, description }), ""];
  if (homepageConfig.data.description) {
    lines.push(homepageConfig.data.description, "");
  }

  if (ctaItems.length) {
    lines.push(renderLinkSection("Primary links", ctaItems).trim(), "");
  }

  if (sidebarBlurb) {
    lines.push(renderBlurbMarkdown(sidebarBlurb, 2), "");
  }

  sections.forEach((section) => {
    if (section.sectionBlurb) {
      lines.push(renderBlurbMarkdown(section.sectionBlurb, 2), "");
    }

    section.subsectionBlurbs.forEach((blurb) => {
      lines.push(renderBlurbMarkdown(blurb, 3), "");
    });
  });

  return lines.join("\n").trim() + "\n";
};

const buildOverviewIndexMarkdown = ({ explainedLanding, runningLanding, overviewConfig }) => {
  return [
    renderPageHeader({
      title: "Overview",
      description:
        overviewConfig.data.summary ||
        "Entry points for understanding Urbit and getting a ship running.",
    }),
    renderLinkSection("Sections", [
      {
        title: explainedLanding.title,
        url: explainedLanding.humanMdPath,
        description: explainedLanding.description,
      },
      {
        title: runningLanding.title,
        url: runningLanding.humanMdPath,
        description: runningLanding.description,
      },
    ]).trim(),
    "",
  ].join("\n");
};

const buildBlogIndexMarkdown = (posts) => {
  const lines = [
    renderPageHeader({
      title: "Blog",
      description: "Latest updates, developer spotlights, and technical deep dives from the Urbit community.",
    }),
    "",
  ];

  const grouped = sortByDateDescending(posts).reduce((accumulator, post) => {
    const year = new Date(post.date).getFullYear();
    if (!accumulator[year]) {
      accumulator[year] = [];
    }

    accumulator[year].push(post);
    return accumulator;
  }, {});

  Object.keys(grouped)
    .sort((a, b) => Number(b) - Number(a))
    .forEach((year) => {
      lines.push(`## ${year}`, "");
      grouped[year].forEach((post) => {
        lines.push(renderLinkBullet({ title: post.title, url: post.humanMdPath, description: post.description }));
      });
      lines.push("");
    });

  return lines.join("\n").trim() + "\n";
};

const buildEcosystemLandingMarkdown = ({ orgs, articles }) => [
  renderPageHeader({
    title: "Ecosystem",
    description: "Selected organizations and coverage from the wider Urbit ecosystem.",
  }),
  renderLinkSection(
    "Companies",
    sortByTitle(orgs).map((org) => ({
      title: org.title,
      url: org.url,
      description: org.description,
    }))
  ).trim(),
  renderLinkSection(
    "Articles & Press",
    sortByDateDescending(articles).map((article) => ({
      title: `${article.publication}: ${article.title}`,
      url: article.url,
      description: `${article.author || "Unknown author"}${article.date ? ` • ${article.date}` : ""}`,
    }))
  ).trim(),
  "",
].join("\n");

const buildSectionAgentIndexBody = ({ title, description, entries }) => {
  const lines = [`# ${title}`, ""];

  if (description) {
    lines.push(description, "");
  }

  lines.push(
    ...entries.map((entry) => renderLinkBullet({ title: entry.title, url: entry.url, description: entry.description })),
    ""
  );

  return lines.join("\n");
};

const rewriteSnapshotContent = (content = "") =>
  String(content || "")
    .replace(
      /file:\/\/\/home\/[^\s\)]+\/urbit-agent-wiki\/wiki\//g,
      "https://urbit.org/.agents/wiki/"
    )
    .replace(
      /file:\/\/\/home\/[^\s\)]+\/urbit-skills\/skills\//g,
      "https://urbit.org/.agents/skills/"
    )
    .replace(/\/home\/[^\s\)]+\/urbit-agent-wiki\/wiki\//g, "https://urbit.org/.agents/wiki/")
    .replace(/\/home\/[^\s\)]+\/urbit-skills\/skills\//g, "https://urbit.org/.agents/skills/");

const writeSnapshotExports = ({ sourceDir, outputDir, sourceKind, indexFallbackTitle }) => {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Snapshot source not found: ${sourceDir}`);
    return [];
  }

  const filePaths = glob.sync(path.join(sourceDir, "**/*.md"));
  const written = [];

  filePaths.forEach((filePath) => {
    const relativePath = path.relative(sourceDir, filePath).replace(/\\/g, "/");
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = parseFrontMatter(raw, filePath);
    const content = rewriteSnapshotContent(parsed?.content || raw);
    const baseName = path.basename(relativePath, ".md");
    const title =
      parsed?.data?.title ||
      (relativePath === "index.md"
        ? indexFallbackTitle
        : baseName === "SKILL"
          ? toTitleCase(path.basename(path.dirname(relativePath)))
          : toTitleCase(baseName));
    const agentPath = `/.agents/${outputDir}/${relativePath}`;
    const artifact = {
      sourceKind,
      sourceKey: `${sourceKind}:${relativePath}`,
      canonicalPath: null,
      humanMdPath: null,
      agentPath,
    };
    const relatedPages = relativePath === "index.md" ? [agentPath] : [`/.agents/${outputDir}/index.md`];
    const dependencies = deriveDependencies({ artifact, inferredLinks: [] });
    const document = buildAgentDocument({
      artifact,
      title,
      body: content,
      agentMode: "fallback",
      relatedPages,
      dependencies,
    });

    writeTextFile(path.join(PUBLIC_DIR, ".agents", outputDir, relativePath), document);
    written.push({ relativePath, title, agentPath });
  });

  if (!written.some((entry) => entry.relativePath === "index.md")) {
    const agentPath = `/.agents/${outputDir}/index.md`;
    const artifact = {
      sourceKind,
      sourceKey: `${sourceKind}:index`,
      canonicalPath: null,
      humanMdPath: null,
      agentPath,
    };
    const body = buildSectionAgentIndexBody({
      title: indexFallbackTitle,
      description: `Published ${sourceKind} snapshot content available under /${outputDir}.`,
      entries: written.map((entry) => ({ title: entry.title, url: entry.agentPath })),
    });
    const document = buildAgentDocument({
      artifact,
      title: indexFallbackTitle,
      body,
      agentMode: "fallback",
      relatedPages: written.map((entry) => entry.agentPath),
      dependencies: [],
    });
    writeTextFile(path.join(PUBLIC_DIR, ".agents", outputDir, "index.md"), document);
  }

  return written;
};

const removeGeneratedRoots = () => {
  GENERATED_ROOTS.forEach((targetPath) => {
    if (!fs.existsSync(targetPath)) {
      return;
    }

    fs.rmSync(targetPath, { recursive: true, force: true });
  });
};

async function buildAgentArtifacts() {
  console.log("Building agent artifacts...\n");

  removeGeneratedRoots();

  const blurbRoutes = await buildBlurbRouteMap();
  const siteConfig = readParsedFile("config.md");
  const homepageConfig = readParsedFile("homepage/config.md");
  const overviewConfig = readParsedFile("overview/config.md");
  const explainedConfig = readParsedFile("overview/urbit-explained/config.md");
  const runningConfig = readParsedFile("overview/running-urbit/config.md");

  const loadedBlurbs = new Map();
  const getBlurb = (slug) => {
    if (!loadedBlurbs.has(slug)) {
      loadedBlurbs.set(slug, loadBlurb(slug));
    }
    return loadedBlurbs.get(slug);
  };

  const homepageSidebarBlurb = homepageConfig.data.sidebar_blurb
    ? getBlurb(homepageConfig.data.sidebar_blurb)
    : null;
  const homepageSections = normalizeArray(homepageConfig.data.sections).map((section) => ({
    id: section["section-id"],
    sectionBlurb: section["section-blurb"] ? getBlurb(section["section-blurb"]) : null,
    subsectionBlurbs: normalizeArray(section["subsection-blurbs"]).map((slug) => getBlurb(slug)),
  }));

  const loadOverviewSectionEntry = (subsection, slug) => {
    const relativePath = `overview/${subsection}/${slug}.md`;
    const parsed = readParsedFile(relativePath);
    const split = splitAgentContent(parsed.content);
    const artifact = resolveSourceDescriptor(relativePath, blurbRoutes);
    const blurbs = normalizeArray(parsed.data.blurbs).map((blurbSlug) => getBlurb(blurbSlug));
    const title = slug === "intro" ? (subsection === "urbit-explained" ? explainedConfig.data.title : runningConfig.data.title) : parsed.data.title;
    const description = slug === "intro" ? (subsection === "urbit-explained" ? explainedConfig.data.description : runningConfig.data.description) : parsed.data.description;
    const humanMarkdown = slug === "intro"
      ? buildOverviewLandingMarkdown({
          title,
          description,
          introContent: split.humanContent,
          sectionEntries: normalizeArray(
            subsection === "urbit-explained" ? explainedConfig.data.sections : runningConfig.data.sections
          )
            .filter((sectionSlug) => sectionSlug !== "intro")
            .map((sectionSlug) => {
              const sectionDoc = readParsedFile(`overview/${subsection}/${sectionSlug}.md`);
              return {
                title: sectionDoc.data.title,
                description: sectionDoc.data.description,
                humanMdPath: routeToHumanMarkdownUrl(`/overview/${subsection}/${sectionSlug}`),
              };
            }),
        })
      : buildOverviewSectionMarkdown({
          title,
          description,
          body: split.humanContent,
          blurbs,
        });

    const internalLinks = buildInternalPageLinks({
      content: [split.humanContent, ...blurbs.map((blurb) => blurb.humanContent)].join("\n\n"),
      frontMatter: parsed.data,
      contextPath: artifact.canonicalPath,
    });
    const relatedPages = buildRelatedPages({
      artifact,
      explicit: [
        subsection === "urbit-explained" ? "/overview.md" : "/overview.md",
        artifact.humanMdPath,
      ],
      inferred: internalLinks,
    });
    const dependencies = deriveDependencies({ artifact, inferredLinks: internalLinks });

    return {
      artifact,
      slug,
      subsection,
      title,
      description,
      parsed,
      split,
      blurbs,
      humanMarkdown,
      internalLinks,
      relatedPages,
      dependencies,
    };
  };

  const explainedLanding = loadOverviewSectionEntry("urbit-explained", "intro");
  const runningLanding = loadOverviewSectionEntry("running-urbit", "intro");

  const explainedChildren = normalizeArray(explainedConfig.data.sections)
    .filter((slug) => slug !== "intro")
    .map((slug) => loadOverviewSectionEntry("urbit-explained", slug));
  const runningChildren = normalizeArray(runningConfig.data.sections)
    .filter((slug) => slug !== "intro")
    .map((slug) => loadOverviewSectionEntry("running-urbit", slug));

  const blogPaths = glob
    .sync(path.join(CONTENT_DIR, "blog/*.md"))
    .filter((filePath) => path.basename(filePath) !== "config.md");
  const postCutoverMissingDelimiters = [];
  const blogPosts = sortByDateDescending(
    blogPaths.map((filePath) => {
      const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
      const parsed = readParsedFile(relativePath);
      const split = splitAgentContent(parsed.content);
      const artifact = resolveSourceDescriptor(relativePath, blurbRoutes);
      const publishedDate = parsed.data.date || null;
      const title = parsed.data.title || toTitleCase(path.basename(relativePath, ".md"));
      const description = parsed.data.description || "";
      const authors = collectAuthors(parsed.data);
      const humanMarkdown = buildBlogPostHumanMarkdown({
        title,
        description,
        date: publishedDate,
        authors,
        humanContent: split.humanContent,
      });
      const internalLinks = buildInternalPageLinks({
        content: split.humanContent,
        frontMatter: parsed.data,
        contextPath: artifact.canonicalPath,
      });
      const relatedPages = buildRelatedPages({
        artifact,
        explicit: ["/blog.md"],
        inferred: internalLinks,
      });
      const dependencies = deriveDependencies({ artifact, inferredLinks: internalLinks });
      const isPostCutover = publishedDate && Date.parse(publishedDate) >= Date.parse(BLOG_CUTOVER);

      if (isPostCutover && !split.hasDedicatedAgentContent) {
        postCutoverMissingDelimiters.push({ relativePath, title, date: publishedDate });
      }

      return {
        relativePath,
        title,
        description,
        date: publishedDate,
        authors,
        parsed,
        split,
        artifact,
        humanMarkdown,
        relatedPages,
        dependencies,
        humanMdPath: artifact.humanMdPath,
      };
    })
  );

  const ecosystemOrgs = sortByTitle(
    glob.sync(path.join(CONTENT_DIR, "ecosystem/orgs/*.md")).map((filePath) => {
      const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
      const parsed = readParsedFile(relativePath);
      const split = splitAgentContent(parsed.content);
      return {
        relativePath,
        parsed,
        split,
        title: parsed.data.title,
        description: parsed.data.description || buildSummaryInfo(parsed.data, split.humanContent).summary,
        url: parsed.data.URL,
        artifact: resolveSourceDescriptor(relativePath, blurbRoutes),
      };
    })
  );
  const ecosystemArticles = sortByDateDescending(
    glob.sync(path.join(CONTENT_DIR, "ecosystem/articles/*.md")).map((filePath) => {
      const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
      const parsed = readParsedFile(relativePath);
      const split = splitAgentContent(parsed.content);
      return {
        relativePath,
        parsed,
        split,
        title: parsed.data.title,
        publication: parsed.data.publication,
        author: parsed.data.author,
        date: parsed.data.date,
        description: stripMarkdown(split.humanContent) || parsed.data.description || "",
        url: parsed.data.URL,
        artifact: resolveSourceDescriptor(relativePath, blurbRoutes),
      };
    })
  );

  const writtenFiles = [];
  const writeGenerated = (urlPath, content) => {
    const filePath = publicFilePathFromUrl(urlPath);
    writeTextFile(filePath, content);
    writtenFiles.push(urlPath);
  };

  // Human mirrors.
  writeGenerated(
    "/index.md",
    buildHomepageHumanMarkdown({
      siteConfig,
      homepageConfig,
      sidebarBlurb: homepageSidebarBlurb,
      sections: homepageSections,
    })
  );
  writeGenerated(
    "/overview.md",
    buildOverviewIndexMarkdown({ explainedLanding, runningLanding, overviewConfig })
  );
  writeGenerated(explainedLanding.artifact.humanMdPath, explainedLanding.humanMarkdown);
  writeGenerated(runningLanding.artifact.humanMdPath, runningLanding.humanMarkdown);
  explainedChildren.forEach((entry) => writeGenerated(entry.artifact.humanMdPath, entry.humanMarkdown));
  runningChildren.forEach((entry) => writeGenerated(entry.artifact.humanMdPath, entry.humanMarkdown));
  blogPosts.forEach((post) => writeGenerated(post.humanMdPath, post.humanMarkdown));
  writeGenerated("/blog.md", buildBlogIndexMarkdown(blogPosts));
  writeGenerated(
    "/ecosystem.md",
    buildEcosystemLandingMarkdown({ orgs: ecosystemOrgs, articles: ecosystemArticles })
  );

  // Agent index pages.
  const agentIndexArtifacts = [
    {
      artifact: {
        sourceKind: "homepage",
        sourceKey: "/",
        canonicalPath: "/",
        humanMdPath: "/index.md",
        agentPath: "/.agents/index.md",
      },
      title: "urbit.org agent index",
      body: buildSectionAgentIndexBody({
        title: "urbit.org agent index",
        description: "Machine-oriented entry points for overview pages, the blog, blurbs, the ecosystem index, and snapshot content.",
        entries: [
          { title: "Overview", url: "/.agents/overview.md", description: "Concept and setup section indexes." },
          { title: "Blog", url: "/.agents/blog.md", description: "Agent companions for blog content." },
          { title: "Blurbs", url: "/.agents/blurbs.md", description: "Embedded support content exported as standalone markdown." },
          { title: "Ecosystem", url: "/.agents/ecosystem.md", description: "Organizations and external coverage." },
          { title: "Wiki snapshot", url: "/.agents/wiki/index.md", description: "Committed wiki snapshot content." },
          { title: "Skills snapshot", url: "/.agents/skills/index.md", description: "Committed skill snapshot content." },
        ],
      }),
      relatedPages: [
        "/index.md",
        "/overview.md",
        "/blog.md",
        "/ecosystem.md",
        "/.agents/wiki/index.md",
        "/.agents/skills/index.md",
      ],
    },
    {
      artifact: {
        sourceKind: "overview-index",
        sourceKey: "/overview",
        canonicalPath: "/overview",
        humanMdPath: "/overview.md",
        agentPath: "/.agents/overview.md",
      },
      title: "Overview agent index",
      body: buildSectionAgentIndexBody({
        title: "Overview agent index",
        description: "Start here for human-readable overview mirrors and dedicated agent companions for both learning tracks.",
        entries: [
          {
            title: explainedLanding.title,
            url: explainedLanding.artifact.agentPath,
            description: explainedLanding.description,
          },
          {
            title: runningLanding.title,
            url: runningLanding.artifact.agentPath,
            description: runningLanding.description,
          },
        ],
      }),
      relatedPages: ["/overview.md", explainedLanding.artifact.humanMdPath, runningLanding.artifact.humanMdPath],
    },
    {
      artifact: {
        sourceKind: "blog-index",
        sourceKey: "/blog",
        canonicalPath: "/blog",
        humanMdPath: "/blog.md",
        agentPath: "/.agents/blog.md",
      },
      title: "Blog agent index",
      body: buildSectionAgentIndexBody({
        title: "Blog agent index",
        description: "Agent companions for urbit.org blog posts. When a source file includes ---agent---, the companion contains only the dedicated agent appendix plus a pointer back to the human mirror.",
        entries: blogPosts.map((post) => ({ title: post.title, url: post.artifact.agentPath, description: post.description })),
      }),
      relatedPages: ["/blog.md", ...blogPosts.slice(0, 10).map((post) => post.humanMdPath)],
    },
    {
      artifact: {
        sourceKind: "blurbs-index",
        sourceKey: "blurbs:index",
        canonicalPath: null,
        humanMdPath: null,
        agentPath: "/.agents/blurbs.md",
      },
      title: "Blurbs agent index",
      body: buildSectionAgentIndexBody({
        title: "Blurbs agent index",
        description: "Standalone agent exports for blurbs that are otherwise embedded into homepage and overview pages.",
        entries: sortByTitle(Array.from(loadedBlurbs.values())).map((blurb) => ({
          title: blurb.title,
          url: `/.agents/blurbs/${blurb.slug}.md`,
          description: blurb.description || blurb.summary,
        })),
      }),
      relatedPages: ["/index.md", "/overview.md"],
    },
    {
      artifact: {
        sourceKind: "ecosystem-index",
        sourceKey: "/ecosystem",
        canonicalPath: "/ecosystem",
        humanMdPath: "/ecosystem.md",
        agentPath: "/.agents/ecosystem.md",
      },
      title: "Ecosystem agent index",
      body: buildSectionAgentIndexBody({
        title: "Ecosystem agent index",
        description: "Machine-facing exports for ecosystem organizations and articles, with related human landing pages preserved as markdown mirrors.",
        entries: [
          ...ecosystemOrgs.map((org) => ({
            title: org.title,
            url: org.artifact.agentPath,
            description: org.description,
          })),
          ...ecosystemArticles.map((article) => ({
            title: article.title,
            url: article.artifact.agentPath,
            description: article.description,
          })),
        ],
      }),
      relatedPages: ["/ecosystem.md"],
    },
  ];

  agentIndexArtifacts.forEach((entry) => {
    const dependencies = deriveDependencies({ artifact: entry.artifact, inferredLinks: [] });
    writeGenerated(
      entry.artifact.agentPath,
      buildAgentDocument({
        artifact: entry.artifact,
        title: entry.title,
        body: entry.body,
        agentMode: "fallback",
        relatedPages: uniqueStrings(entry.relatedPages),
        dependencies,
      })
    );
  });

  // Overview and blog companions.
  [...[explainedLanding, runningLanding], ...explainedChildren, ...runningChildren].forEach((entry) => {
    const agentMode = entry.split.hasDedicatedAgentContent ? "dedicated" : "fallback";
    const body = entry.split.hasDedicatedAgentContent
      ? entry.split.agentContent
      : entry.humanMarkdown.trim();

    writeGenerated(
      entry.artifact.agentPath,
      buildAgentDocument({
        artifact: entry.artifact,
        title: entry.title,
        body,
        agentMode,
        relatedPages: entry.relatedPages,
        dependencies: entry.dependencies,
      })
    );
  });

  blogPosts.forEach((post) => {
    const agentMode = post.split.hasDedicatedAgentContent ? "dedicated" : "fallback";
    const body = post.split.hasDedicatedAgentContent
      ? post.split.agentContent
      : post.humanMarkdown.trim();
    writeGenerated(
      post.artifact.agentPath,
      buildAgentDocument({
        artifact: post.artifact,
        title: post.title,
        body,
        agentMode,
        relatedPages: post.relatedPages,
        dependencies: post.dependencies,
      })
    );
  });

  Array.from(loadedBlurbs.values()).forEach((blurb) => {
    const artifact = {
      sourceKind: "blurb",
      sourceKey: `blurb:${blurb.slug}`,
      canonicalPath: null,
      contextPath: blurbRoutes.get(blurb.slug) || `/#${blurb.slug}`,
      humanMdPath: null,
      agentPath: `/.agents/blurbs/${blurb.slug}.md`,
    };
    const relatedPages = buildRelatedPages({
      artifact,
      explicit: [routeToHumanMarkdownUrl(stripHash(artifact.contextPath)), "/index.md", "/overview.md"],
      inferred: buildInternalPageLinks({
        content: `${blurb.humanContent}\n\n${blurb.tabs.map((tab) => tab.content).join("\n\n")}`,
        frontMatter: blurb.data,
        contextPath: artifact.contextPath,
      }),
    });
    const dependencies = deriveDependencies({ artifact, inferredLinks: [] });
    writeGenerated(
      artifact.agentPath,
      buildAgentDocument({
        artifact,
        title: blurb.title,
        body: renderBlurbMarkdown(blurb, 1),
        agentMode: blurb.hasDedicatedAgentContent ? "dedicated" : "fallback",
        relatedPages,
        dependencies,
      })
    );
  });

  ecosystemOrgs.forEach((org) => {
    const artifact = org.artifact;
    const relatedPages = ["/ecosystem.md"];
    writeGenerated(
      artifact.agentPath,
      buildAgentDocument({
        artifact,
        title: org.title,
        body: [
          `# ${org.title}`,
          "",
          org.parsed.data.description || "",
          "",
          org.split.humanContent.trim(),
          "",
          renderLinkBullet({ title: "Official website", url: org.url }),
          "",
        ].join("\n"),
        agentMode: org.split.hasDedicatedAgentContent ? "dedicated" : "fallback",
        relatedPages,
        dependencies: [],
      })
    );
  });

  ecosystemArticles.forEach((article) => {
    const artifact = article.artifact;
    const relatedPages = ["/ecosystem.md"];
    writeGenerated(
      artifact.agentPath,
      buildAgentDocument({
        artifact,
        title: article.title,
        body: [
          `# ${article.title}`,
          "",
          `${article.publication || "Publication"}${article.date ? ` • ${article.date}` : ""}${article.author ? ` • ${article.author}` : ""}`,
          "",
          article.split.humanContent.trim(),
          "",
          renderLinkBullet({ title: "Original article", url: article.url }),
          "",
        ].join("\n"),
        agentMode: article.split.hasDedicatedAgentContent ? "dedicated" : "fallback",
        relatedPages,
        dependencies: [],
      })
    );
  });

  // Snapshot exports from committed repo sources.
  const wikiExports = writeSnapshotExports({
    sourceDir: path.join(SNAPSHOT_DIR, "wiki"),
    outputDir: "wiki",
    sourceKind: "wiki",
    indexFallbackTitle: "Wiki snapshot",
  });
  const skillExports = writeSnapshotExports({
    sourceDir: path.join(SNAPSHOT_DIR, "skills"),
    outputDir: "skills",
    sourceKind: "skill",
    indexFallbackTitle: "Skills snapshot",
  });

  console.log(`✓ Wrote ${writtenFiles.length} generated markdown artifacts`);
  console.log(`✓ Published ${wikiExports.length} wiki snapshot files`);
  console.log(`✓ Published ${skillExports.length} skills snapshot files`);

  if (postCutoverMissingDelimiters.length) {
    console.warn(`\nPost-cutover blog posts missing ---agent--- (${postCutoverMissingDelimiters.length}):`);
    postCutoverMissingDelimiters.forEach((post) => {
      console.warn(`- ${post.relativePath} (${post.date}) — ${post.title}`);
    });
  }
}

buildAgentArtifacts().catch((error) => {
  console.error("Agent artifact build failed:", error);
  process.exit(1);
});
