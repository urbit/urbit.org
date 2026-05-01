const matter = require("gray-matter");
const toml = require("@iarna/toml");

const normalizeArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const uniqueStrings = (values) => Array.from(new Set(values.filter(Boolean)));

const toTitleCase = (value = "") =>
  String(value)
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

const normalizeHeadingIds = (content) => {
  if (!content) return content;
  return content.replace(
    /^(#{1,6}[^\n]*?)\s*\{%\s*#([\w-]+)\s*%\}\s*$/gm,
    "$1 {#$2}"
  );
};

const parseFrontMatter = (raw, filePath) => {
  const trimmed = String(raw || "").trimStart();
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
    return {
      data: data || {},
      content: normalizeHeadingIds(content || ""),
      language: usesToml ? "toml" : "yaml",
    };
  } catch (error) {
    console.error(`Failed to parse frontmatter for ${filePath}:`, error);
    return null;
  }
};

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

const collectTags = (frontMatter = {}) => {
  const tags = [
    ...normalizeArray(frontMatter.tags),
    ...normalizeArray(frontMatter.extra?.tags),
    ...normalizeArray(frontMatter.taxonomies?.tags),
    ...normalizeArray(frontMatter.taxonomies?.grant_type),
    ...normalizeArray(frontMatter.taxonomies?.grant_category),
  ]
    .map((tag) => String(tag).trim())
    .filter(Boolean);

  return uniqueStrings(tags);
};

const collectAuthors = (frontMatter = {}) => {
  const values = [
    ...normalizeArray(frontMatter.author),
    ...normalizeArray(frontMatter.authors),
    ...normalizeArray(frontMatter.extra?.author),
    ...normalizeArray(frontMatter.extra?.authors),
    ...normalizeArray(frontMatter.extra?.ship),
  ]
    .map((entry) => String(entry || "").trim())
    .filter(Boolean);

  return uniqueStrings(values);
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

const parsePublishedTimestamp = (frontMatter = {}) => {
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

  const chunks = String(content)
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

  const description = stripMarkdown(frontMatter?.description || frontMatter?.extra?.description || "");
  if (description) {
    return { summary: description, source: "description" };
  }

  return { summary: "", source: "missing" };
};

const extractMarkdownLinks = (content = "") => {
  const links = [];
  const pattern = /\[[^\]]+\]\(([^\)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;

  while ((match = pattern.exec(content)) !== null) {
    links.push(match[1]);
  }

  return links;
};

const collectReferenceLinks = (frontMatter = {}) => {
  const refs = normalizeArray(frontMatter.references).flatMap((reference) => {
    if (!reference || typeof reference !== "object") {
      return [];
    }

    return [reference.link, reference.url].filter(Boolean);
  });

  return uniqueStrings(refs.map((value) => String(value).trim()));
};

module.exports = {
  buildSummaryInfo,
  collectAuthors,
  collectFrontMatterValues,
  collectReferenceLinks,
  collectTags,
  extractFirstParagraph,
  extractMarkdownLinks,
  normalizeArray,
  normalizeHeadingIds,
  normalizeSearchTerms,
  parseFrontMatter,
  parsePublishedTimestamp,
  stripMarkdown,
  toTitleCase,
  uniqueStrings,
};
