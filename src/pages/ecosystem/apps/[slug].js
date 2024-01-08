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

export default function App({ post, org, markdown }) {
  const router = useRouter();
  const title = `${post.title} • Apps • Ecosystem`;

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
          <img
            className="aspect-square w-1/3 rounded-md"
            style={{ backgroundColor: post.bgColor }}
            alt=""
            src={post.image}
          />
          <div className="flex flex-col justify-between pl-5 md:pl-8 lg:pl-16">
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
        <section className="space-y-5 layout-narrow">
          <hr className="hr-horizontal border-brite" />
          <h2 className="h2">Developer</h2>
          {(org.slug && (
            <FatBlock>
              <OrgCard className="w-1/3" {...org} />
            </FatBlock>
          )) || <p className="body-md">{org.title}</p>}
          <hr className="hr-horizontal border-brite" />
          <FatBlock className="bg-tint body-sm rounded-md p-5">
            Disclaimer: Applications may not be audited for security and might
            contain malicious code or vulnerabilities that could lead to
            unwanted interaction with your ship. Explore at your own risk.
          </FatBlock>
          <hr className="hr-horizontal border-brite" />
          <Link
            className="btn btn-light body-md"
            href="https://docs.urbit.org/manual/getting-started/additional/installing-applications"
          >
            How to Install an Urbit Application
          </Link>
          <hr className="hr-horizontal border-brite" />
          <p className="text-brite body-md">
            Have an application you'd like to share publicly through urbit.org?
          </p>
          <Link
            className="text-lite underline decoration-1 underline-offset-4 body-md"
            href="https://urbit.org/applications/submit"
          >
            Submit your application
          </Link>
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

  let org = { title: post.developer };

  const orgs = getAllPosts(
    ["title", "image", "ships", "slug"],
    "ecosystem/orgs"
  );

  const ship = post.shortcode.split("/")[0];
  for (let i = 0; i < orgs.length; i++) {
    if (orgs[i].ships.filter((s) => s === ship).length > 0) {
      org = orgs[i];
      break;
    }
  }

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, org, markdown },
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
