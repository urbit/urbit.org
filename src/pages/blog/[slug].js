import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import path from "path";
import {
  Container,
  Main,
  FatBlock,
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
import PostCard from "@/components/PostCard";

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
      <IntraNav />
      <Main singleColumn>
        <div className="text-brite border-brite space-y-5 md:space-y-8">
          <div>
            <h1 className="h1 mt-12 mb-8 md:mt-16 md:mb-16 lg:mb-20">
              {post.title}
            </h1>
            <p className="body-lg">{post.description} </p>
          </div>
          <hr className="hr-horizontal" />
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
          <div className="markdown layout-narrow">
            <Markdown.render content={JSON.parse(markdown)} />
          </div>
          <hr className="hr-horizontal" />
          <FatBlock className="flex justify-center space-x-1 lg:space-x-6 xl:space-x-8">
            {previousPost && (
              <PostCard
                className="h-auto !w-1/2 sm:!w-5/12 md:!w-1/3"
                href={path.join("/blog", previousPost.slug)}
                target="_self"
                {...previousPost}
                small
              />
            )}
            {nextPost && (
              <PostCard
                className="h-auto !w-1/2 sm:!w-5/12 md:!w-1/3"
                href={path.join("/blog", nextPost.slug)}
                target="_self"
                {...nextPost}
                small
              />
            )}
          </FatBlock>
        </div>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const nextPost =
    getNextPost(
      params.slug,
      ["title", "description", "date", "extra", "slug"],
      "blog"
    ) || null;

  const previousPost =
    getPreviousPost(
      params.slug,
      ["title", "description", "date", "extra", "slug"],
      "blog"
    ) || null;

  const post =
    getPostBySlug(
      params.slug,
      ["title", "description", "date", "extra", "slug", "content"],
      "blog"
    ) || null;

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
