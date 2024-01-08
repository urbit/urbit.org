import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Main,
  Section,
  FatBlock,
  Markdown,
  getPostBySlug,
  getAllPosts,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import Header from "@/components/Header";
import OrgCard from "@/components/ecosystem/Org";
import ErrorPage from "@/pages/404";

export default function Org({ post, markdown }) {
  const router = useRouter();
  const title = `${post.title} • Companies • Ecosystem`;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

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
        className="text-brite border-brite space-y-5 md:space-y-8 lg:space-y-16"
        singleColumn
      >
        <div className="flex">
          <div className="relative flex items-center aspect-square bg-brite w-1/3 rounded-md">
            <img className="w-1/2 m-auto" src={post.image} />
          </div>
          <div className="flex flex-col justify-between pl-5 md:pl-8 lg:pl-16">
            <h1 className="h1">{post.title}</h1>
            <div className="flex flex-col space-y-3.5">
              <Link className="btn btn-light body-md w-min" href={post.URL}>
                Website
              </Link>
              <Link
                className="btn btn-light body-md w-min"
                href={`https://twitter.com/${post.twitter}`}
              >
                {`@${post.twitter}`}
              </Link>
            </div>
          </div>
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
      "description",
      "image",
      "URL",
      "twitter",
      "ships",
      "slug",
      "content",
    ],
    "ecosystem/orgs"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"], "ecosystem/orgs");

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
