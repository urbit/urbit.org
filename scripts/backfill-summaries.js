#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { glob } = require("glob");
const toml = require("@iarna/toml");

const CONTENT_DIR = path.join(process.cwd(), "app/content");
const TARGET_DIRS = ["blog", "blurbs", "overview"];
const SUMMARY_MAX = 280;

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

const truncateToLimit = (value, limit) => {
  if (!value) return "";
  const cleaned = stripMarkdown(value).trim();
  if (cleaned.length <= limit) {
    return cleaned;
  }

  const boundary = cleaned.slice(0, limit + 1);
  const lastSentenceMatch = boundary.match(/^(.*[\.\!\?])\s+/);
  if (lastSentenceMatch && lastSentenceMatch[1].length <= limit) {
    return lastSentenceMatch[1].trim();
  }

  const lastSpace = cleaned.lastIndexOf(" ", limit - 1);
  const cutIndex = lastSpace > 0 ? lastSpace : limit - 1;
  return `${cleaned.slice(0, cutIndex).trim()}...`;
};

const getFirstParagraph = (content) => {
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

const buildSummary = (frontMatter, content) => {
  const description = frontMatter?.description || frontMatter?.extra?.description;
  if (description) {
    return truncateToLimit(description, SUMMARY_MAX);
  }

  const firstParagraph = getFirstParagraph(content);
  if (firstParagraph) {
    return truncateToLimit(firstParagraph, SUMMARY_MAX);
  }

  return "";
};

const updateFrontMatterBlock = (raw, summary, isToml) => {
  const delimiter = isToml ? "+++" : "---";
  const start = raw.indexOf(delimiter);
  const end = raw.indexOf(delimiter, start + delimiter.length);
  if (start !== 0 || end === -1) {
    return raw;
  }

  const frontMatter = raw.slice(start + delimiter.length, end).trimEnd();
  const rest = raw.slice(end + delimiter.length);
  const summaryLine = isToml
    ? `summary = "${summary.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"")}"`
    : `summary: "${summary.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"")}"`;

  let updated;
  if (isToml) {
    if (/^summary\s*=\s*/m.test(frontMatter)) {
      updated = frontMatter.replace(/^summary\s*=\s*.*$/m, summaryLine);
    } else if (/^description\s*=\s*/m.test(frontMatter)) {
      updated = frontMatter.replace(/^description\s*=\s*.*$/m, (match) => `${match}\n${summaryLine}`);
    } else if (/^title\s*=\s*/m.test(frontMatter)) {
      updated = frontMatter.replace(/^title\s*=\s*.*$/m, (match) => `${match}\n${summaryLine}`);
    } else {
      updated = `${frontMatter}\n${summaryLine}`.trim();
    }
  } else {
    if (/^summary\s*:/m.test(frontMatter)) {
      updated = frontMatter.replace(/^summary\s*:.*$/m, summaryLine);
    } else if (/^description\s*:/m.test(frontMatter)) {
      updated = frontMatter.replace(/^description\s*:.*$/m, (match) => `${match}\n${summaryLine}`);
    } else if (/^title\s*:/m.test(frontMatter)) {
      updated = frontMatter.replace(/^title\s*:.*$/m, (match) => `${match}\n${summaryLine}`);
    } else {
      updated = `${frontMatter}\n${summaryLine}`.trim();
    }
  }

  return `${delimiter}\n${updated}\n${delimiter}${rest}`;
};

async function backfillSummaries() {
  const globPattern = `{${TARGET_DIRS.join(",")}}/**/*.md`;
  const files = await glob(path.join(CONTENT_DIR, globPattern));
  let updatedCount = 0;

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const trimmed = raw.trimStart();
    const isToml = trimmed.startsWith("+++");
    const options = isToml
      ? {
          engines: { toml: toml.parse.bind(toml) },
          language: "toml",
          delimiters: "+++",
        }
      : undefined;
    const parsed = matter(raw, options);
    const summary = buildSummary(parsed.data, parsed.content);

    if (!summary) {
      continue;
    }

    const updated = updateFrontMatterBlock(raw, summary, isToml);
    if (updated !== raw) {
      fs.writeFileSync(filePath, updated, "utf-8");
      updatedCount += 1;
    }
  }

  console.log(`Updated summaries in ${updatedCount} files.`);
}

backfillSummaries().catch((error) => {
  console.error("Summary backfill failed:", error);
  process.exit(1);
});
