const fs = require("fs");
const matter = require("gray-matter");
const toml = require("@iarna/toml");
const path = require("path");
const { DateTime } = require("luxon");

const dir = path.join(process.cwd(), "../content/media");

const options = {
  engines: {
    toml: {
      parse: toml.parse.bind(toml),
      stringify: toml.stringify.bind(toml),
    },
  },
  language: "toml",
  delimiters: "+++",
};

fs.readdirSync(dir, { withFileTypes: true })
  .filter((f) => f.isFile() && f.name !== "_index.md")
  .map((f, i) => {
    const fileContents = matter(
      fs.readFileSync(path.join(dir, f.name)),
      options
    );

    const newDate = DateTime.fromJSDate(
      new Date(fileContents.data.date)
    ).toFormat("yyyy-MM-dd");

    fileContents.data.date = newDate;

    const data = matter.stringify(
      fileContents.content,
      fileContents.data,
      options
    );

    // console.log(fileContents.data.date)

    // fs.writeFileSync(path.join(dir, f.name), data);
  });
