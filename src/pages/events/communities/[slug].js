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
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import ErrorPage from "@/pages/404";

export default function Community({ post, markdown }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Communities • Events • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main
        className="mt-12 md:mt-16 text-brite border-brite space-y-5 md:space-y-8 lg:space-y-16"
        singleColumn
      >
        <div className="flex">
          <img
            className="object-cover aspect-square rounded-md w-1/3"
            src={post.image}
          />
          <div className="flex flex-col justify-between pl-5 md:pl-8 lg:pl-16">
            <h1 className="h1">{post.title}</h1>
            <div className="flex flex-row flex-wrap xs:flex-col body-md">
              {post?.links?.map(({ label, url }) => (
                <Link className="btn btn-light w-fit mt-1.5 mr-1.5" href={url}>
                  {label}
                </Link>
              ))}
              {post?.group && (
                <span className="btn bg-gray text-brite w-fit mt-1.5 mr-1.5">
                  {post.group}
                </span>
              )}
            </div>
          </div>
        </div>
        <section className="layout-narrow markdown">
          <Markdown.render content={JSON.parse(markdown)} />
        </section>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "image", "group", "links", "slug", "content"],
    "communities"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "title"], "communities", "title");

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
