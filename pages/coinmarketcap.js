import { getPostBySlug } from "../lib/lib";
import PageWithIndex from "../components/PageWithIndex";
import Markdown from "../components/Markdown";

export default function Post({ post, markdown, search }) {
  return <PageWithIndex post={post} markdown={markdown} search={search} />;
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/coinmarketcap",
    ["title", "slug", "content"],
    "/"
  );

  const markdown = await Markdown({ post });

  return {
    props: { post, markdown },
  };
}
