const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const toml = require("@iarna/toml");
const Feed = require("feed").Feed;

const options = {
  engines: {
    toml: toml.parse.bind(toml),
  },
  language: "toml",
  delimiters: "+++",
};

const generateRSSFeed = () => {
  let posts = [];

  const getAllChildren = (dir) => {
    const children = fs.readdirSync(dir, { withFileTypes: true });
    return children
      .filter((f) => f.isFile() && f.name !== "_index.md")
      .map((post) => {
        const { data: pageData, content: pageContent } = matter(
          fs.readFileSync(path.join(dir, post.name)),
          options
        );
        const leadingDir = dir.substr(dir.indexOf("content") + 8);
        const name = post.name.replace(/.md$/, "");

        return {
          title: pageData.title,
          descripton: pageData.description || "",
          author: pageData.extra ? pageData.extra.author || "" : "",
          date: pageData.date || pageData.starts,
          link: `https://urbit.org/${leadingDir}/${name}`,
          content: pageContent,
        };
      });
  };
  posts.push(
    ...getAllChildren(path.join(process.cwd(), "content/blog")),
    ...getAllChildren(path.join(process.cwd(), "content/updates")),
    ...getAllChildren(path.join(process.cwd(), "content/events"))
  );
  posts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  const baseUrl = "https://urbit.org";
  const author = {
    name: "Urbit.org",
    email: "support@urbit.org",
    link: "https://urbit.org",
  };

  // Construct a new Feed object
  const feed = new Feed({
    title: "Urbit",
    description: "Urbit is a personal server built from scratch",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  });

  // Add each article to the feed
  posts.forEach((post) => {
    const { title, description, author, date, link, content } = post;
    feed.addItem({
      title,
      id: link,
      link: link,
      description,
      content,
      author: [
        {
          name: author,
          email: "",
          link: "",
        },
      ],
      date: new Date(date),
    });
  });
  try {
    fs.readdirSync("public");
  } catch (err) {
    fs.mkdirSync("public");
  }

  fs.writeFileSync("public/rss.xml", feed.rss2());
};

generateRSSFeed();
