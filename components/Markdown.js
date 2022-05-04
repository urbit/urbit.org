import remark from "remark";
import gfm from "remark-gfm";
import slug from "remark-slug";
import heading from "remark-heading-id";
import remarkprism from "remark-prism";
import normalize from "mdurl/encode";
import merge from "deepmerge";
import github from "hast-util-sanitize/lib/github";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";

// img is wrapped in figure so that images can be extra wide in the blog posts
function Img(h, node) {
  var props = { src: normalize(node.url), alt: node.alt };
  if (node.title !== null && node.title !== undefined) {
    props.title = node.title;
  }
  return {
    type: "element",
    tagName: "figure",
    properties: {},
    children: [
      {
        type: "element",
        tagName: "img",
        properties: props,
      },
    ],
  };
}

const options = {
  handlers: {
    image: Img,
  },
  sanitize: merge(github, {
    // remove user-content from github.json to remark-slug work as expected
    clobberPrefix: "",
    attributes: { "*": ["className"] },
  }),
};

// Converts markdown strings into markdown HTML/React components
export default async function Markdown({ post }, disablePlugins) {
  const result = await remark()
    .use(remarkParse, options)
    .use(remarkprism, {
      plugins: !disablePlugins ? ["show-invisibles"] : [],
    })
    .use(gfm)
    .use(slug)
    .use(heading)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(post.content);

  return result.toString();
}
