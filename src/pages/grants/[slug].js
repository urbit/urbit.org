import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  Container,
  Main,
  Section,
  Markdown,
  getPage,
  getPostBySlug,
  generateDisplayDate,
  formatDate,
} from "@urbit/fdn-design-system";

import { getGrantYear } from "@/lib/lib";
import ErrorPage from "@/pages/404";
import Footer from "@/components/Footer";
import IntraNav from "@/components/IntraNav";
import Meta from "@/components/Meta";

const getStatus = (post) => {
  if (post.extra.canceled) {
    return "Canceled";
  } else if (post.extra.completed) {
    return "Completed";
  } else if (post.extra.assignee && post.extra.assignee?.[0].length > 0) {
    return "In Progress";
  } else {
    return "Open";
  }
};

export default function Grant({ post, markdown, match }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  const status = getStatus(post);

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Grants • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main responsiveSpace singleColumn>
        <Section className="mt-12 md:mt-16">
          <div className="h1 text-primary">
            <h1 className="mb-8 md:mb-16 lg:mb-20">{post.title}</h1>
            {post?.extra?.description && <p>{post.extra.description} </p>}
          </div>
          <div className="body-md text-secondary">
            {post?.date && <p>{formatDate(generateDisplayDate(post.date))}</p>}
            {post?.extra?.reward && (
              <p>
                Reward:{" "}
                <span className="text-primary">{post.extra.reward}</span>
              </p>
            )}
            {post?.extra?.grant_id && (
              <p>
                ID: <span className="text-primary">{post.extra.grant_id}</span>
              </p>
            )}
            {post?.extra?.assignee?.[0]?.length > 0 && (
              <p>
                {"Grantee(s): "}
                {post.extra.assignee.map((p, i) => (
                  <span className="text-primary">{i > 0 ? `, ${p}` : p}</span>
                ))}
              </p>
            )}
            {post?.extra?.champion?.[0]?.length > 0 && (
              <p>
                {"Champion(s): "}
                {post.extra.champion.map((p, i) => (
                  <span className="text-primary">{i > 0 ? `, ${p}` : p}</span>
                ))}
              </p>
            )}
          </div>
          {post?.extra?.deliverable && match && (
            <div className="body-md">
              <span>Deliverable: </span>
              <Link
                className="btn bg-primary hover:bg-secondary text-surface"
                href={path.join(
                  "/ecosystem/apps",
                  match?.data?.title?.toLowerCase(),
                )}
              >
                {match?.data?.shortcode || match?.data?.title}
              </Link>
            </div>
          )}
          <div className="flex flex-wrap gap-2.5 body-md">
            {post.extra?.fund && (
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-md"
                href={post.extra.fund}
              >
                Fund Campaign
              </Link>
            )}
            {(status === "Open" && (
              <Link
                className="btn bg-primary hover:bg-secondary text-surface body-md"
                href="https://airtable.com/apppnWSqfsVvUwkWh/shrCi54rEDxgSZr3z"
              >
                Apply
              </Link>
            )) || (
                <span className="btn text-secondary bg-tertiary">{status}</span>
              )}
            {post.taxonomies.grant_type.map((type) => (
              <span className="btn text-secondary bg-tertiary">{type}</span>
            ))}
            {post.taxonomies.grant_category.map((category) => (
              <span className="btn text-secondary bg-tertiary">{category}</span>
            ))}
          </div>
        </Section>
        <Section className="markdown layout-narrow" divider={"border-primary"}>
          <Markdown.render content={JSON.parse(markdown)} />
        </Section>
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
    `grants/${dir.name}`,
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  // Matches deliverable to page
  let match = null;
  if (post?.extra?.deliverable?.startsWith("~")) {
    const ship = post.extra.deliverable.split("/")[0];
    const application = post.extra.deliverable.split("/")[1];
    const fileExists = fs.existsSync(
      path.join(process.cwd(), "content/ecosystem/apps", `${application}.md`),
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