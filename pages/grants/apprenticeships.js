import { getPostBySlug } from "../../lib/lib";
import GrantProgramOverview from "../../components/GrantProgramOverview";
import { Markdown } from "foundation-design-system";

export default function Post({ post, markdown, search }) {
  return (
    <GrantProgramOverview
      program="apprenticeships"
      post={post}
      markdown={markdown}
      search={search}
      actionText="View Apprenticeships"
      actionLink="/grants?program=apprenticeship&completed=true#view-grants"
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/apprenticeships",
    ["title", "date", "slug", "content"],
    "/"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}
