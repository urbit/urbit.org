import GrantProgramOverview from "../../components/GrantProgramOverview";
import { Markdown, getPostBySlug } from "@urbit/foundation-design-system";

export default function Post({ post, markdown, search }) {
  return (
    <GrantProgramOverview
      program="rfps"
      post={post}
      markdown={markdown}
      search={search}
      actionText="View RFPs"
      actionLink="/grants?program=rfps#view-grants"
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/rfps",
    ["title", "date", "slug", "content"],
    "/"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}
