const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const Markdoc = require("@markdoc/markdoc");
const { parseDocument } = require("htmlparser2");
const postcss = require("postcss");

const css = postcss.parse(
  fs.readFileSync(path.join(__dirname, "../app/globals.css"), "utf8"),
);
let article;
css.walkRules("article", (rule) => {
  article = rule;
});
assert.ok(article, "Article typography rules must exist");

function utilities(selector) {
  const rule = article.nodes.find(
    (node) => node.type === "rule" && node.selector === selector,
  );
  assert.ok(rule, `Missing article selector: ${selector}`);
  return rule.nodes
    .filter((node) => node.type === "atrule" && node.name === "apply")
    .flatMap((node) => node.params.split(/\s+/));
}

function elements(node, name) {
  return (node.children || []).filter(
    (child) => child.type === "tag" && (!name || child.name === name),
  );
}

function render(markdown) {
  const html = Markdoc.renderers.html(Markdoc.transform(Markdoc.parse(markdown)));
  return elements(parseDocument(html), "article")[0];
}

test("ordered markers stay outside paragraph-wrapped list items", () => {
  const styles = utilities("ol > li");
  assert.ok(styles.includes("list-decimal"));
  assert.ok(styles.includes("list-outside"));
  assert.ok(!styles.includes("list-inside"));
  assert.ok(utilities("ol").includes("ml-8"), "Outside markers need a gutter");
});

test("marker styles apply only to the immediate list's items", () => {
  const unordered = utilities("ul > li");
  assert.ok(unordered.includes("list-none"));
  assert.ok(unordered.some((value) => value.startsWith("before:content-")));
  assert.ok(!utilities("ol > li").some((value) => value.startsWith("before:")));
  assert.ok(
    !article.nodes.some(
      (node) => node.type === "rule" && /^(?:ol|ul)\s+li$/.test(node.selector),
    ),
    "Descendant selectors leak numbering or dashes into mixed nested lists",
  );
});

test("loose lists retain paragraphs, nested bullets and continuation text", () => {
  const rendered = render(
    "1. **Ask.** First paragraph.\n\n" +
      "   A second paragraph stays in this step.\n" +
      "2. **Split.** Define the parts:\n" +
      "   - field names\n" +
      "   - JSON shapes\n\n" +
      "   Then hand off the parts.\n" +
      "3. **Test.** Run every suite.\n",
  );
  const list = elements(rendered, "ol")[0];
  const items = elements(list, "li");
  assert.equal(items.length, 3);
  assert.equal(elements(items[0], "p").length, 2);
  assert.deepEqual(elements(items[1]).map((node) => node.name), ["p", "ul", "p"]);
  assert.equal(elements(elements(items[1], "ul")[0], "li").length, 2);
  assert.equal(elements(items[2], "p").length, 1);
});

test("tight mixed lists retain the correct type at each nesting level", () => {
  const rendered = render(
    "- Unordered parent\n" +
      "  1. Ordered child\n" +
      "     - Unordered grandchild\n" +
      "  2. Second ordered child\n",
  );
  const parent = elements(elements(rendered, "ul")[0], "li")[0];
  const ordered = elements(parent, "ol")[0];
  assert.equal(elements(ordered, "li").length, 2);
  const firstChild = elements(ordered, "li")[0];
  assert.equal(elements(elements(firstChild, "ul")[0], "li").length, 1);
  assert.equal(elements(parent, "p").length, 0);
});
