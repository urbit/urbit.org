import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import path from "path";
import {
  Container,
  Main,
  Section,
  Markdown,
  getPostBySlug,
  getAllPosts,
  generateDisplayDate,
  formatDate,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import Header from "@/components/Header";
import ErrorPage from "@/pages/404";

export default function App({ post, markdown }) {
  const router = useRouter();
  const title = `${post.title} • Apps • Ecosystem`;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  console.log(post);

  return (
    <Container>
      <Head>
        <title>{title}</title>
        {Meta(
          {
            title: title,
            description: "Explore the Urbit ecosystem.",
            image:
              "https://storage.googleapis.com/media.urbit.org/site/opengraph/urbit.png",
          },
          false,
          true
        )}
      </Head>
      <IntraNav ourSite="https://urbit.org" />
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
        className="text-brite border-brite space-y-4 md:space-y-8 lg:space-y-16"
        singleColumn
      >
        <div className="flex">
          <img
            className="aspect-square w-1/3 rounded-md"
            style={{ backgroundColor: post.bgColor }}
            alt=""
            src={post.image}
          />
          <div className="flex flex-col justify-between pl-4 md:pl-8 lg:pl-16">
            <h1 className="h1">{post.title}</h1>
            <button
              className="btn btn-light body-md"
              onClick={() => navigator.clipboard.writeText(post.shortcode)}
            >
              Copy Shortcode
            </button>
          </div>
        </div>
        <div className="flex body-md">
          {post.website && (
            <div className="w-1/4 pr-5">
              <h3 className="text-gray">Website:</h3>
              <Link
                className="text-lite underline decoration-1 underline-offset-4 line-clamp-1 text-ellipsis break-all"
                href={post.website}
              >
                {post.website}
              </Link>
            </div>
          )}
          {post.license && (
            <div className="w-1/4 pr-5">
              <h3 className="text-gray">License:</h3>
              <p className="line-clamp-1 text-ellipsis">{post.license}</p>
            </div>
          )}
        </div>
        {post.description && (
          <h2 className="h2 text-brite layout-narrow">{post.description}</h2>
        )}
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
    [
      "title",
      "shortcode",
      "license",
      "image",
      "bgColor",
      "developer",
      "website",
      "description",
      "slug",
      "content",
    ],
    "ecosystem/apps"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "ecosystem/apps", "date");

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
