import React from "react";
import { getPostsTree, getToml } from "../lib/queries";
import { GrantList } from "../components/GrantList";
import Link from "next/link";

export default async function GrantsHome() {
  const posts = await getPostsTree("grants/");

  const statuses = ["Open", "In Progress", "Completed"];
  const programs = ["Proposal", "Bounty"];
  const categories = ["Other", "Community", "Dev: Core", "Dev: Tool", "Dev: Apps"];

  const allPostFrontMatter = [];
  await Promise.all(
    posts.map(async (post) => {
      const postYaml = await getToml(post.relativePath);
      allPostFrontMatter.push({
        data: postYaml.data,
        relativePath: post.relativePath,
        slug: post.slug,
      });
    })
  );

  // json.parse

  return (
    <div className="container mb-32 mt-9 ">
      <section className="md:grid grid-cols-6 gap-x-4 mb-12 ">
        <div className="col-start-2 col-span-4 text-xlarge leading-[120%] font-[400]">
          Earn a piece of the Urbit network by developing software, creating
          content, growing communities, and more. There are two types of grants:
        </div>
      </section>
      <section className="md:grid grid-cols-6 gap-x-4 mb-12 text-xlarge leading-[120%] font-[500]">
        <div className="col-span-1"></div>
        <Link href="/proposals" className="col-span-2 mb-4 group">
          <div className="block">Proposals</div>
          <div className="text-gray-87 group-hover:text-white">
            Have an idea? Send it to us, and we can approve you to be funded.
          </div>
        </Link>
        <Link href="/proposals" className="col-span-2 mb-4 group">
          <div className="block">Bounties</div>
          <div className="text-gray-87 group-hover:text-white">
            Looking for work? Browse through opportunities offered by the Urbit
            Foundation or other organizations
          </div>
        </Link>
      </section>
      <GrantList
        allPostFrontMatter={JSON.parse(JSON.stringify(allPostFrontMatter))}
        statuses={statuses}
        programs={programs}
        categories={categories}
      />
    </div>
  );
}
