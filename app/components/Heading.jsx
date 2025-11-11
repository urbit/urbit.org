/**
 * Heading component for Markdoc-rendered content
 *
 * Renders proper semantic HTML headings (h1-h6) based on level prop.
 * Maintains visual hierarchy for article/blog content while ensuring
 * accessibility and SEO compliance.
 *
 * Supports {#id} syntax for anchor IDs: "# Title {#my-id}" → <h1 id="my-id">Title</h1>
 *
 * @param {number} level - Heading level (1-6)
 * @param {ReactNode} children - Heading content
 */
export function Heading({ level, children }) {
  // Dynamically create the appropriate heading tag
  const HeadingTag = `h${level}`;

  // Extract ID from {#id} syntax if present in heading text
  let id = null;
  let cleanChildren = children;

  if (typeof children === 'string') {
    // Match pattern: "Text {#anchor-id}" at end of string
    const match = children.match(/^(.*?)\s*\{#([\w-]+)\}\s*$/);
    if (match) {
      cleanChildren = match[1].trim();
      id = match[2];
    }
  }

  // Map heading levels to Tailwind classes for article content
  // These styles match the existing visual hierarchy from globals.css
  const styles = {
    1: "text-5xl font-[400] mb-8 md:mb-16 lg:mb-20 leading-[100%] my-[2.5rem]",
    2: "text-3xl font-[700] mb-[1rem]",
    3: "text-xl font-[700] mb-[1rem]",
    4: "text-base font-[700] mb-3",
    5: "text-base font-[600] mb-3",
    6: "text-base font-[500] mb-3",
  };

  return (
    <HeadingTag className={styles[level] || styles[1]} id={id}>
      {cleanChildren}
    </HeadingTag>
  );
}
