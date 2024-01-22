import React from "react";
import GrantProgramPage from "@/components/GrantProgramPage";
import { Markdown, getPostBySlug } from "@urbit/fdn-design-system";

export default function Bounties({ post, markdown, search }) {
  return (
    <GrantProgramPage
      program="bounties"
      post={post}
      markdown={markdown}
      search={search}
      actionText="View Open Bounties"
      actionLink="/grants?program=bounty&open=true&wip=false#view-grants"
    />
  );
}

export async function getStaticProps() {
  const post = getPostBySlug(
    "/bounties",
    ["title", "date", "slug", "content"],
    "/"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}
