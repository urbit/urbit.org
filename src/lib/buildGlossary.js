const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const toml = require("@iarna/toml");

const options = {
  engines: {
    toml: toml.parse.bind(toml),
  },
  language: "toml",
  delimiters: "+++",
};

const glossary = [];

function buildGlossary(dir) {
  const children = fs.readdirSync(dir, { withFileTypes: true });
  const pages = children.filter((f) => f.isFile() && f.name !== "_index.md");
  const subdirs = children.filter((f) => f.isDirectory());
  pages.map((page) => {
    const { data } = matter(
      fs.readFileSync(path.join(dir, page.name)),
      options
    );
    const glossaryEntry = data.glossaryEntry
      ? Object.values(data.glossaryEntry).map((e) => ({
          ...e,
          ...{
            url:
              "https://urbit.org" +
              path.join(
                dir.substr(dir.indexOf("content") + 7),
                "/",
                page.name.replace(/.md$/, "")
              ),
          },
        }))
      : [];
    glossaryEntry.forEach((entry) => glossary.push(entry));
  });

  Object.fromEntries(
    subdirs.map((subdir) => [
      subdir.name,
      buildGlossary(path.join(dir, subdir.name)),
    ])
  );
}

buildGlossary(path.join(process.cwd(), "content"));
const fileContents = `export const glossary = ${JSON.stringify(glossary)}`;

try {
  fs.readdirSync("cache");
} catch (err) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/glossary.js", fileContents, function (err) {
  if (err) return console.error(err);
  console.log("Site glossary created.");
});
