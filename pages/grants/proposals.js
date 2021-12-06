import { getPostBySlug } from "../../lib/lib";
import BasicPage from "../../components/BasicPage";
import Markdown from "../../components/Markdown";

export default function Post({ post, markdown, search }) {
  return <BasicPage post={post} markdown={markdown} search={search} />;
}

export async function getStaticProps() {
  const post = getPostBySlug("/proposals", ["title", "slug", "content"], "/");

  const markdown = await Markdown({ post });

  return {
    props: { post, markdown },
  };
}
