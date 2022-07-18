import { getPostBySlug } from "../../lib/lib";
import GrantProgramOverview from "../../components/GrantProgramOverview";
import { Markdown } from "foundation-design-system";

export default function Post({ post, markdown, search }) {
  return (
    <GrantProgramOverview
      program="proposals"
      post={post}
      markdown={markdown}
      search={search}
      actionText="View Proposals"
      actionLink="/grants?program=proposal#view-grants"
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/proposals",
    ["title", "date", "slug", "content"],
    "/"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}
