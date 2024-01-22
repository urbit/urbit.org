import React from "react";
import GrantProgramPage from "@/components/GrantProgramPage";
import { Markdown, getPostBySlug } from "@urbit/fdn-design-system";

export default function Proposals({ post, markdown, search }) {
  return (
    <GrantProgramPage
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
