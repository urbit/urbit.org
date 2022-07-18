import { getPostBySlug } from "../lib/lib";
import BasicPage from "../components/BasicPage";
import { getPostSlugs } from "../lib/lib";
import { Markdown } from "foundation-design-system";

export default function Post({ post, markdown, search, index }) {
  return (
    <BasicPage post={post} markdown={markdown} search={search} index={index} />
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "content", "extra"],
    "/"
  );

  let { index } = post?.extra || { index: null };

  if (index === undefined) {
    index = null;
  }

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown, index },
  };
}

export async function getStaticPaths() {
  const posts = getPostSlugs("/");

  const slugs = posts.map((e) => e.slice(0, -3));

  return {
    paths: slugs.map((post) => {
      return {
        params: {
          slug: post,
        },
      };
    }),
    fallback: false,
  };
}
