const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const DEFAULT_RELATIVE_PATH = "app/content/homepage/agent-discovery.md";

const SECTION_KEYS = {
  "copy prompt": "copyPrompt",
  "capability guidance": "capabilityGuidance",
  "primary entrypoints": "primaryEntryPoints",
  "human markdown mirrors": "humanMarkdownMirrors",
  "machine-oriented indexes": "agentSectionIndexes",
  "retrieval notes": "usageNotes",
};

function normalizeHeading(value = "") {
  return String(value).trim().toLowerCase().replace(/\s+/g, " ");
}

function collapseText(value = "") {
  return String(value)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function splitSections(markdown = "") {
  const sections = { intro: [] };
  let currentKey = "intro";

  String(markdown)
    .split(/\r?\n/)
    .forEach((line) => {
      const headingMatch = line.match(/^##\s+(.+?)\s*$/);
      if (headingMatch) {
        const heading = normalizeHeading(headingMatch[1]);
        currentKey = SECTION_KEYS[heading] || heading;
        if (!sections[currentKey]) {
          sections[currentKey] = [];
        }
        return;
      }

      sections[currentKey].push(line);
    });

  return Object.fromEntries(
    Object.entries(sections).map(([key, lines]) => [key, lines.join("\n").trim()])
  );
}

function requireString(value, fieldName, sourcePath) {
  const normalized = String(value || "").trim();
  if (!normalized) {
    throw new Error(`Missing ${fieldName} in ${sourcePath}`);
  }
  return normalized;
}

function requireSection(sections, sectionKey, sourcePath) {
  const content = String(sections[sectionKey] || "").trim();
  if (!content) {
    throw new Error(`Missing ${sectionKey} section in ${sourcePath}`);
  }
  return content;
}

function parseNoteItems(sectionContent, sectionName, sourcePath) {
  const lines = String(sectionContent)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line) => {
    const match = line.match(/^-\s+\*\*(.+?)\*\*\s+[—-]\s+(.+)$/);
    if (!match) {
      throw new Error(`Invalid note item in ${sectionName} (${sourcePath}): ${line}`);
    }

    return {
      title: match[1].trim(),
      description: match[2].trim(),
    };
  });
}

function parseLinkItems(sectionContent, sectionName, sourcePath) {
  const lines = String(sectionContent)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.map((line) => {
    const match = line.match(/^-\s+\[(.+?)\]\(([^\s\)]+)\)\s+[—-]\s+(.+)$/);
    if (!match) {
      throw new Error(`Invalid link item in ${sectionName} (${sourcePath}): ${line}`);
    }

    return {
      href: match[2].trim(),
      label: match[1].trim(),
      description: match[3].trim(),
    };
  });
}

function parseAgentDiscoveryMarkdown(rawContent, sourcePath = DEFAULT_RELATIVE_PATH) {
  let parsed;
  try {
    parsed = matter(rawContent);
  } catch (error) {
    throw new Error(`Failed to parse frontmatter for ${sourcePath}: ${error.message}`);
  }

  const sections = splitSections(parsed.content || "");
  const description = collapseText(sections.intro || "");
  const copyPrompt = collapseText(requireSection(sections, "copyPrompt", sourcePath));

  const discoveryData = {
    homepage: {
      title: requireString(parsed.data.title, "title", sourcePath),
      footerTitle: requireString(parsed.data.footer_title, "footer_title", sourcePath),
      description: requireString(description, "intro description", sourcePath),
      copyPrompt: requireString(copyPrompt, "copy prompt", sourcePath),
    },
    capabilityGuidance: parseNoteItems(
      requireSection(sections, "capabilityGuidance", sourcePath),
      "Capability guidance",
      sourcePath
    ),
    primaryEntryPoints: parseLinkItems(
      requireSection(sections, "primaryEntryPoints", sourcePath),
      "Primary entrypoints",
      sourcePath
    ),
    humanMarkdownMirrors: parseLinkItems(
      requireSection(sections, "humanMarkdownMirrors", sourcePath),
      "Human markdown mirrors",
      sourcePath
    ),
    agentSectionIndexes: parseLinkItems(
      requireSection(sections, "agentSectionIndexes", sourcePath),
      "Machine-oriented indexes",
      sourcePath
    ),
    usageNotes: parseNoteItems(
      requireSection(sections, "usageNotes", sourcePath),
      "Retrieval notes",
      sourcePath
    ),
  };

  return discoveryData;
}

function loadAgentDiscoveryMarkdown(options = {}) {
  const baseDir = options.baseDir || process.cwd();
  const filePath = options.filePath || path.join(baseDir, DEFAULT_RELATIVE_PATH);

  let rawContent;
  try {
    rawContent = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    throw new Error(`Failed to read agent discovery content at ${filePath}: ${error.message}`);
  }

  return parseAgentDiscoveryMarkdown(rawContent, filePath);
}

module.exports = {
  DEFAULT_RELATIVE_PATH,
  loadAgentDiscoveryMarkdown,
  parseAgentDiscoveryMarkdown,
};
