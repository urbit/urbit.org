const fs = require("fs");
const path = require("path");

const ensureTrailingNewline = (value = "") => {
  const stringValue = String(value || "");
  return stringValue.endsWith("\n") ? stringValue : `${stringValue}\n`;
};

const yamlScalar = (value) => {
  if (value === null || value === undefined) {
    return "null";
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(String(value));
};

const renderYamlFrontmatter = (data = {}) => {
  const lines = ["---"];

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (!value.length) {
        lines.push(`${key}: []`);
        return;
      }

      lines.push(`${key}:`);
      value.forEach((entry) => {
        lines.push(`  - ${yamlScalar(entry)}`);
      });
      return;
    }

    lines.push(`${key}: ${yamlScalar(value)}`);
  });

  lines.push("---", "");
  return lines.join("\n");
};

const writeTextFile = (filePath, content) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, ensureTrailingNewline(content), "utf-8");
};

const renderLinkBullet = ({ title, url, description }) => {
  const label = title || url;
  const cleanDescription = String(description || "").trim();
  const descriptionSuffix = cleanDescription ? ` — ${cleanDescription}` : "";
  return `- [${label}](${url})${descriptionSuffix}`;
};

const renderLinkSection = (heading, items = [], depth = 2) => {
  if (!items.length) {
    return "";
  }

  const prefix = "#".repeat(depth);
  return [
    `${prefix} ${heading}`,
    "",
    ...items.map(renderLinkBullet),
    "",
  ].join("\n");
};

const renderPageHeader = ({ title, description, metadataLines = [] }) => {
  const lines = [`# ${title}`, ""];

  if (description) {
    lines.push(description, "");
  }

  if (metadataLines.length) {
    metadataLines.forEach((line) => lines.push(line));
    lines.push("");
  }

  return lines.join("\n");
};

const renderReferences = (references = [], depth = 3) => {
  if (!references.length) {
    return "";
  }

  return renderLinkSection(
    "References",
    references.map((reference) => ({
      title: reference.title,
      url: reference.link || reference.url,
      description: reference.description,
    })),
    depth
  );
};

const renderTabs = (tabs = [], depth = 3) => {
  if (!tabs.length) {
    return "";
  }

  const heading = "#".repeat(depth);
  const subHeading = "#".repeat(depth + 1);
  const blocks = [`${heading} Options`, ""];

  tabs.forEach((tab) => {
    blocks.push(`${subHeading} ${tab.title}`, "", String(tab.content || "").trim(), "");
  });

  return blocks.join("\n");
};

const renderCallToAction = (ctaButton, depth = 3) => {
  if (!ctaButton?.label || !ctaButton?.link) {
    return "";
  }

  return [
    `${"#".repeat(depth)} Next step`,
    "",
    renderLinkBullet({
      title: ctaButton.label,
      url: ctaButton.link,
      description: ctaButton.description,
    }),
    "",
  ].join("\n");
};

const renderBlurbSection = ({
  title,
  description,
  body,
  tabs = [],
  references = [],
  ctaButton = null,
  depth = 2,
}) => {
  const heading = "#".repeat(depth);
  const parts = [`${heading} ${title}`, ""];

  if (description) {
    parts.push(description, "");
  }

  if (body) {
    parts.push(String(body).trim(), "");
  }

  const tabsSection = renderTabs(tabs, depth + 1);
  if (tabsSection) {
    parts.push(tabsSection);
  }

  const referencesSection = renderReferences(references, depth + 1);
  if (referencesSection) {
    parts.push(referencesSection);
  }

  const ctaSection = renderCallToAction(ctaButton, depth + 1);
  if (ctaSection) {
    parts.push(ctaSection);
  }

  return parts.join("\n").trim();
};

module.exports = {
  ensureTrailingNewline,
  renderBlurbSection,
  renderLinkBullet,
  renderLinkSection,
  renderPageHeader,
  renderYamlFrontmatter,
  writeTextFile,
};
