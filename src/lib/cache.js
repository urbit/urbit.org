const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const toml = require("@iarna/toml");
const markdoc = require("@urbit/markdoc");

const options = {
  engines: {
    toml: toml.parse.bind(toml),
  },
  language: "toml",
  delimiters: "+++",
};

const index = [];

function buildSearchIndex(dir) {
  // Assume years belong to Grants for now.
  const dirName = dir.split("/").slice(-1).join("");
  const parentName =
    String(Number(dirName)).length === 4
      ? "Grants"
      : dirName.charAt(0).toUpperCase() + dirName.slice(1);
  let metadata = {
    data: {
      title: parentName,
    },
  };

  try {
    metadata = matter(fs.readFileSync(path.join(dir, "_index.md")), options);
  } catch (err) {}

  const children = fs.readdirSync(dir, { withFileTypes: true });
  const pages = children.filter((f) => f.isFile() && f.name !== "_index.md");
  const subdirs = children.filter(
    (f) => f.isDirectory() && f.name !== "ids" && f.name !== "glossary"
  );

  index.push(
    ...pages.map((page) => {
      const { data: pageData, content: pageContent } = matter(
        fs.readFileSync(path.join(dir, page.name)),
        options
      );
      const parsed = markdoc.parse(pageContent);
      const transform = markdoc.transform(parsed);
      const slug = dir.includes("/grants/")
        ? `/grants/${page.name.replace(/.md$/, "")}`
        : path.join(
            dir.substr(dir.indexOf("content") + 7),
            "/",
            page.name.replace(/.md$/, "")
          );
      return {
        title: pageData.title,
        base: page.name,
        slug,
        content: pageData.description || "",
        headings: transform.children
          .filter((e) => e.name === "h2" || e.name === "h3")
          .map((e) => e.children)
          .flat()
          .filter((e) => typeof e === "string"),
        parent: metadata.data.title,
      };
    })
  );

  Object.fromEntries(
    subdirs.map((subdir) => [
      subdir.name,
      buildSearchIndex(path.join(dir, subdir.name)),
    ])
  );
}

buildSearchIndex(path.join(process.cwd(), "content"));

const fileContents = `export const index = ${JSON.stringify(index)}`;

try {
  fs.readdirSync("cache");
} catch (err) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/data.js", fileContents, function (err) {
  if (err) return console.error(err);
  console.log("Site index created.");
});
