const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const toml = require("@iarna/toml");

// node ./buildPageTree.js [directory] [sort]
// eg. node ./buildPageTree docs weight
// will produce docs.json in the cache folder.

const options = {
  engines: {
    toml: toml.parse.bind(toml),
  },
  language: "toml",
  delimiters: "+++",
};

/**
 * buildPageTree is written to provide a recursive index of posts
 * for nested directories for creating sidebars
 * @param {string} path Absolute path to the subdirectory.
 * @returns {Object.<string,string|Object<string,string[]|number>>} Title of the directory, child pages, and child directories (recursive structure).
 *
 */

// type PageTree =
//   { title: string,
//     pages: [{
//       title: string,
//       base: string,
//       slug: string,
//       weight: number,
//     }],
//     children: { [string]: PageTree },
//   }

function buildPageTree(dirPath, ordering = "", content = false) {
  const metadata = matter(
    fs.readFileSync(path.join(dirPath, "_index.md")),
    options
  );
  // get a list of contents at the dirPath, with file types so that the item at the dirPath can be identified as file or folder
  const children = fs.readdirSync(dirPath, { withFileTypes: true });
  // get a list of files
  const pages = children.filter((f) => f.isFile() && f.name !== "_index.md");
  // get a list of folders
  const subdirs = children.filter((f) => f.isDirectory());
  // return a pagetree datastructure
  return {
    title: metadata.data.title,
    pages: pages
      .map((page) => {
        // retrieve topmatter as JSON
        const { content, data } = matter(
          fs.readFileSync(path.join(dirPath, page.name)),
          options
        );

        return {
          ...data,
          title: data.title,
          base: page.name,
          slug: page.name.replace(/.md$/, ""),
          ...(ordering === "weight" && { weight: data?.weight ?? 0 }),
          ...(ordering === "date" && {
            date: data?.date ?? "2000-01-01T00:00:00.000Z",
          }),
        };
      })
      .sort((a, b) => a.weight - b.weight),
    children: Object.fromEntries(
      subdirs
        .sort((a, b) => {
          const aMetadata = matter(
            fs.readFileSync(path.join(dirPath, a.name, "_index.md")),
            options
          );
          const bMetadata = matter(
            fs.readFileSync(path.join(dirPath, b.name, "_index.md")),
            options
          );
          return aMetadata?.data?.weight - bMetadata?.data?.weight || 0;
        })
        .map((subdir) => [
          subdir.name,
          buildPageTree(path.join(dirPath, subdir.name), ordering, content),
        ])
    ),
  };
}

const process = require("process");

const arg = process.argv?.[2];
const sort = process?.argv?.[3] || "weight";

const dir = buildPageTree(path.join(process.cwd(), `content/${arg}`), sort);
const fileContents = `${JSON.stringify(dir)}`;

try {
  fs.readdirSync("cache");
} catch (err) {
  fs.mkdirSync("cache");
}

fs.writeFile(`cache/${arg}.json`, fileContents, function (err) {
  if (err) return console.error(err);
  console.log(`${arg} directory structure created.`);
});

module.exports = { buildPageTree };
