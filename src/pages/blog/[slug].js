import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Main,
  Section,
  Markdown,
  getPostBySlug,
  getAllPosts,
  getNextPost,
  getPreviousPost,
  formatDate,
  generateDisplayDate,
} from "@urbit/fdn-design-system";
import ErrorPage from "@/pages/404";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";

export default function Post({
  post,
  markdown,
  nextPost,
  previousPost,
  search,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  const date = formatDate(generateDisplayDate(post.date));

  return (
    <Container>
      <Head>
        <title>{post.title} • Blog • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <Main singleColumn>
        <Section className="text-brite mt-4" narrow>
          <h1 className="h1 mb-24">{post.title}</h1>
          <p className="body-lg mb-16">{post.description}</p>
          <hr className="hr-horizontal my-3.5" />
          <div className="flex justify-between body-sm font-semibold">
            <p>{date}</p>
            <div>
              <p>{post.extra.author}</p>
              {post.extra.ship && (
                <p className="relative">
                  <span className="absolute -left-3">~</span>
                  {post.extra?.ship.replace(/^~/, "")}
                </p>
              )}
            </div>
          </div>
        </Section>
        <Section className="markdown" narrow>
          <Markdown.render content={JSON.parse(markdown)} />
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const nextPost =
    getNextPost(
      params.slug,
      ["title", "slug", "date", "description", "extra"],
      "blog"
    ) || null;

  const previousPost =
    getPreviousPost(
      params.slug,
      ["title", "slug", "date", "description", "extra"],
      "blog"
    ) || null;

  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra"],
    "blog"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown, nextPost, previousPost },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "blog", "date");

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
