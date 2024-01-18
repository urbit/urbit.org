import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Main,
  Markdown,
  getPostBySlug,
  getAllPosts,
  generateDisplayDate,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import DateRange from "@/components/DateRange";
import ErrorPage from "@/pages/404";

export default function Event({ post, markdown }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Events • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main singleColumn>
        <div className="text-brite space-y-5 md:space-y-8">
          <div className="space-y-8 md:space-y-16 lg:space-y-20">
            <h1 className="h1 mt-12 md:mt-16">{post.title}</h1>
            {post.description && <p className="h1">{post.description} </p>}
          </div>
          <div className="body-md">
            <p>{post.location}</p>
            <DateRange
              className="flex space-x-[0.25em] text-gray"
              starts={generateDisplayDate(post.starts)}
              ends={generateDisplayDate(post.ends)}
              divider={<span>•</span>}
            />
          </div>
          {post.registration_url && (
            <Link
              className="btn btn-light body-md w-min"
              href={post.registration_url}
            >
              Find out more
            </Link>
          )}
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
  const post = getPostBySlug(
    params.slug,
    [
      "title",
      "description",
      "location",
      "starts",
      "ends",
      "timezone",
      "guests",
      "hosts",
      "image",
      "registration_url",
      "pinned",
      "content",
      "slug",
    ],
    "events"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "starts"], "events", "starts");

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
