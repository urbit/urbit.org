import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import {
  Container,
  Main,
  Markdown,
  getPage,
  getPostBySlug,
  generateDisplayDate,
  formatDate,
} from "@urbit/fdn-design-system";
import { getGrantYear } from "@/lib/lib";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import ErrorPage from "@/pages/404";

function Status(post) {
  const canceled = post?.extra?.canceled;
  const completed = post?.extra?.completed;
  const open = !canceled && !completed && post?.extra?.assignee?.[0] === "";

  if (canceled) {
    return <span className="btn bg-gray text-tint">Canceled</span>;
  }
  if (completed) {
    return <span className="btn bg-gray text-tint">Completed</span>;
  }
  if (open) {
    return <span className="btn bg-brite text-gray">Open</span>;
  }
  return <span className="btn bg-gray text-brite">In Progress</span>;
}

export default function Event({ post, markdown, match }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Grants • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main singleColumn>
        <div className="text-brite space-y-5 md:space-y-8">
          <div className="space-y-8 md:space-y-16 lg:space-y-20">
            <h1 className="h1 mt-12 md:mt-16">{post.title}</h1>
            {post?.extra?.description && (
              <p className="h1">{post.extra.description} </p>
            )}
          </div>
          <div className="body-md text-gray">
            {post?.date && <p>{formatDate(generateDisplayDate(post.date))}</p>}
            {post?.extra?.reward && (
              <p>
                Reward: <span className="text-brite">{post.extra.reward}</span>
              </p>
            )}
            {post?.extra?.grant_id && (
              <p>
                ID: <span className="text-brite">{post.extra.grant_id}</span>
              </p>
            )}
            {post?.extra?.assignee?.[0]?.length > 0 && (
              <p>
                {"Grantee(s): "}
                {post.extra.assignee.map((p, i) => (
                  <span className="text-brite">{i > 0 ? `, ${p}` : p}</span>
                ))}
              </p>
            )}
            {post?.extra?.champion?.[0]?.length > 0 && (
              <p>
                {"Champion(s): "}
                {post.extra.champion.map((p, i) => (
                  <span className="text-brite">{i > 0 ? `, ${p}` : p}</span>
                ))}
              </p>
            )}
          </div>
          {post?.extra?.deliverable && match && (
            <div className="body-md">
              <span>Deliverable: </span>
              <Link
                className="btn btn-light"
                href={path.join(
                  "/ecosystem/apps",
                  match?.data?.title?.toLowerCase()
                )}
              >
                {match?.data?.shortcode || match?.data?.title}
              </Link>
            </div>
          )}
          <div className="body-md space-x-3.5">
            <Status {...post} />
            {post.taxonomies.grant_type.map((type) => (
              <span className="btn  text-tint bg-gray">{type}</span>
            ))}
            {post.taxonomies.grant_category.map((category) => (
              <span className="btn  text-tint bg-gray">{category}</span>
            ))}
          </div>
          <hr className="hr-horizontal border-brite" />
          <div className="markdown layout-narrow">
            <Markdown.render content={JSON.parse(markdown)} />
          </div>
        </div>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  // Gets post in any year folder sharing the slug name in the param
  const dir = getGrantYear(params.slug);
  const post = getPostBySlug(
    params.slug,
    ["title", "description", "date", "taxonomies", "extra", "slug", "content"],
    `grants/${dir.name}`
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  // Matches deliverable to page
  let match = null;
  if (post?.extra?.deliverable?.startsWith("~")) {
    const ship = post.extra.deliverable.split("/")[0];
    const application = post.extra.deliverable.split("/")[1];
    const fileExists = fs.existsSync(
      path.join(process.cwd(), "content/ecosystem/apps", `${application}.md`)
    );
    match = fileExists
      ? getPage(path.join(process.cwd(), "content/ecosystem/apps", application))
      : null;
  }
  return {
    props: { post, markdown, match },
  };
}

export async function getStaticPaths() {
  // Flatten all year subfolders into a flat array of slugs
  const basePath = path.join(process.cwd(), "content/grants");
  const years = fs.readdirSync(basePath, { withFileTypes: true });
  const posts = years
    .filter((year) => year.isDirectory())
    .map((year) => {
      const yearDir = fs.readdirSync(path.join(basePath, year.name), {
        withFileTypes: true,
      });
      return yearDir
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name.replace(/\.md$/, ""));
    })
    .flat();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post,
        },
      };
    }),
    fallback: false,
  };
}
