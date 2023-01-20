import GuidePage from "../../components/GuidePage";
import {
  Markdown,
  getPostBySlug,
  getPostSlugs,
} from "@urbit/foundation-design-system";

export default function Post({ post, markdown, search, index }) {
  return (
    <GuidePage post={post} markdown={markdown} search={search} index={index} />
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "content"],
    "get-started"
  );

  let { index } = post?.extra || { index: null };

  if (index === undefined) {
    index = mainpage;
  }

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown, index },
  };
}

export async function getStaticPaths() {
  const posts = getPostSlugs("get-started");

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
