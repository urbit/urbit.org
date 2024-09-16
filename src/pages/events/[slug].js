import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  Main,
  Section,
  Markdown,
  NoSsr,
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
        {Meta(post, false, true)}
      </Head>
      <IntraNav />
      <Main responsiveSpace singleColumn>
        <Section className="text-primary mt-12 md:mt-16">
          <div>
            <h1 className="h1 mb-8 md:mb-16 lg:mb-20">{post.title}</h1>
            {post.description && <p className="h1">{post.description} </p>}
          </div>
          <div className="body-md">
            <p>{post.location}</p>
            <NoSsr>
              <DateRange
                className="flex space-x-[0.25em] text-gray"
                starts={generateDisplayDate(post.starts, post.timezone, "system")}
                ends={generateDisplayDate(post.ends, post.timezone, "system")}
                divider={<span>•</span>}
              />
            </NoSsr>
          </div>
          <div className="flex flex-wrap body-md gap-1.5">
            {post?.links?.map(({ label, url }) => (
              <Link
                className="btn bg-primary hover:bg-secondary text-surface w-fit"
                href={url}
              >
                {label}
              </Link>
            ))}
            {post.registration_url && !post.links && (
              <Link
                className="btn bg-primary hover:bg-secondary text-surface w-fit"
                href={post.registration_url}
              >
                Register
              </Link>
            )}
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
      "dark",
      "darken_image",
      "links",
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
