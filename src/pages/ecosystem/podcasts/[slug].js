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
import Header from "@/components/Header";
import ErrorPage from "@/pages/404";

export default function Podcast({ post, markdown }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  const href = post.URL || post.spotify || post.youtube || post.apple;

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Podcasts • Ecosystem • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Header
        pages={[
          { title: "Overview", href: "/ecosystem" },
          { title: "Apps", href: "/ecosystem/apps" },
          { title: "Podcasts", href: "/ecosystem/podcasts" },
          { title: "Talks", href: "/ecosystem/talks" },
          { title: "Companies", href: "/ecosystem/orgs" },
          { title: "Articles & Press", href: "/ecosystem/articles" },
        ]}
        path={router.asPath}
      />
      <Main
        className="text-brite border-brite space-y-5 md:space-y-8 lg:space-y-16"
        singleColumn
      >
        <div className="flex">
          <img
            className="aspect-square object-cover w-1/3 rounded-md"
            alt=""
            src={post.image}
          />
          <div className="flex flex-col justify-between pl-5 md:pl-8 lg:pl-16">
            <h1 className="h1">{post.title}</h1>
            <Link className="btn btn-light body-md w-min" href={href}>
              Listen ↗
            </Link>
          </div>
        </div>
        <section className="layout-narrow h2 text-brite">
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
    [
      "title",
      "image",
      "URL",
      "spotify",
      "youtube",
      "apple",
      "slug",
      "content",
    ],
    "ecosystem/podcasts"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"], "ecosystem/podcasts");

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
