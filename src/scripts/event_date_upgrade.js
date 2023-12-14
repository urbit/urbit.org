const fs = require("fs");
const matter = require("gray-matter");
const toml = require("@iarna/toml");
const path = require("path");
const { DateTime } = require("luxon");

const dir = path.join(process.cwd(), "../content/events");

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
    // This uses your default system timezone, so if you are not in 'America/Los_Angeles' the output will be incorrect.
    //     const starts = DateTime.fromSeconds(fileContents.data.starts).toISO();
    //     const ends = DateTime.fromSeconds(fileContents.data.ends).toISO();
    //
    // fileContents.data.date = DateTime.fromISO(fileContents.data.date).plus({
    //   hours: 12,
    // });
    // fileContents.data.ends = DateTime.fromISO(fileContents.data.ends).plus({
    //   hours: 12,
    // });

    // fileContents.data.guests = fileContents.data.contributors;
    // delete fileContents.data.contributors;

    fileContents.data.starts = `${fileContents.data.date}`;
    delete fileContents.data.date;

    const data = matter.stringify(
      fileContents.content,
      fileContents.data,
      options
    );

    // fs.writeFileSync(path.join(dir, f.name), data);
  });
