import React from "react";

/**
 * Heading component for Markdoc-rendered content
 *
 * Renders proper semantic HTML headings (h1-h6) based on level prop.
 * Maintains visual hierarchy for article/blog content while ensuring
 * accessibility and SEO compliance.
 *
 * Supports {#id} and {% #id %} syntax for anchor IDs.
 *
 * @param {number} level - Heading level (1-6)
 * @param {string} id - Optional explicit heading ID (Markdoc attributes)
 * @param {ReactNode} children - Heading content
 */
export function Heading({ level, id, children }) {
  const HeadingTag = `h${level}`;

  const extractText = (node) => {
    if (typeof node === "string" || typeof node === "number") {
      return node.toString();
    }

    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }

    if (React.isValidElement(node)) {
      return extractText(node.props?.children);
    }

    return "";
  };

  const extractExplicitId = (text) => {
    if (!text) {
      return { cleaned: "", explicitId: null };
    }

    const patterns = [
      { regex: /^(.*?)\s*\{#([\w-]+)\}\s*$/, index: 2 },
      { regex: /^(.*?)\s*\{%\s*#([\w-]+)\s*%\}\s*$/, index: 2 },
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern.regex);
      if (match) {
        return { cleaned: match[1].trim(), explicitId: match[pattern.index] };
      }
    }

    return { cleaned: text, explicitId: null };
  };

  const stripExplicitId = (node) => {
    if (typeof node === "string") {
      return node
        .replace(/\s*\{#([\w-]+)\}\s*$/, "")
        .replace(/\s*\{%\s*#([\w-]+)\s*%\}\s*$/, "")
        .trimEnd();
    }

    if (Array.isArray(node)) {
      return node.map(stripExplicitId);
    }

    if (React.isValidElement(node) && node.props?.children) {
      return React.cloneElement(node, {
        children: stripExplicitId(node.props.children),
      });
    }

    return node;
  };

  const slugify = (value) => {
    if (!value) return "";
    return value
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const headingText = extractText(children);
  const { cleaned, explicitId } = extractExplicitId(headingText);
  const autoId = slugify(cleaned);
  const resolvedId = id || explicitId || autoId || undefined;
  const cleanChildren = stripExplicitId(children);

  const styles = {
    1: "text-5xl font-[400] mb-8 md:mb-16 lg:mb-20 leading-[100%] my-[2.5rem]",
    2: "text-3xl font-[700] mb-[1rem]",
    3: "text-xl font-[700] mb-[1rem]",
    4: "text-base font-[700] mb-3",
    5: "text-base font-[600] mb-3",
    6: "text-base font-[500] mb-3",
  };

  return (
    <HeadingTag
      className={`${styles[level] || styles[1]} scroll-anchor`}
      id={resolvedId}
    >
      {cleanChildren}
    </HeadingTag>
  );
}
