import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import React from "react";
import {
  Container,
  SingleColumn,
  Section,
  Markdown,
  IntraNav,
  getPage,
  getPreviousPost,
  getNextPost,
} from "@urbit/foundation-design-system";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import gettingaroundTree from "../../cache/getting-around.json";
import { join } from "path";


export default function GettingAround({ posts, data, markdown, search }) {
  const post = {
    title: "Getting Around",
    description:
      "Getting around Urbit.",
    image:
      "",
  };

  return (
    <Container>
      <Head>
        <title>Get Started - Getting Around</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section className="pb-24">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-left">Get Started</h1>
          </div>

          <div className="pt-16 flex flex-row space-x-8">
            <div className="text-lg text-wall-400 text-left">
              <Link href="/get-started">
                Running Urbit
              </Link>
            </div>
            <div className="text-lg font-bold text-left border-b-2 border-wall-200">
              Getting Around
            </div>
          </div>

          <div className="pt-24 flex sidebar sm:space-x-20">
            <Sidebar search={search}>
              {childPages("/getting-around", posts.pages)}
            </Sidebar>
            <div className="markdown max-w-prose">
              <Markdown.render content={JSON.parse(markdown)} />
            </div>
          </div>
        </Section>

      </SingleColumn>
      <Footer />
    </Container>
  );
}

const childPages = (thisLink, children, level = 0) => {
  const router = useRouter();

  const isThisPage = router.asPath === thisLink;

  const pageItemClasses = classnames({
    "text-base type-ui": level === 0,
    "text-wall-400": !isThisPage,
    "text-black": isThisPage,
  });
  return (
    <ul className="">
      <li className="pb-2">
        <Link href="/getting-around">
          <a className={`${pageItemClasses} cursor-pointer`}>Overview</a>
        </Link>
      </li>
      {children?.map((child) => (
        <li className="pb-2">
          {pageTree(join(thisLink, child.slug), child, level)}
        </li>
      ))}
    </ul>
  );
};

const pageTree = (thisLink, tree, level = 0) => {
  const router = useRouter();

  const isThisPage = router.asPath === thisLink;

  const pageItemClasses = classnames({
    "text-base type-ui": level === 0,
    "text-wall-400": !isThisPage,
    "text-black": isThisPage,
  });

  return (
    <>
      <Link href={thisLink}>
        <a className={`${pageItemClasses} cursor-pointer`}>{tree.title}</a>
      </Link>
    </>
  );
};

export async function getStaticProps({ params }) {
  const posts = gettingaroundTree;

  const { data, content } = getPage(
    join(process.cwd(), "content/getting-around", params.slug?.join("/") || "/")
  );
  const markdown = JSON.stringify(Markdown.parse({ post: { content } }));

  const previousPost =
    getPreviousPost(
      params.slug?.slice(-1).join("") || "overview",
      ["title", "slug", "weight"],
      join("overview", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  const nextPost =
    getNextPost(
      params.slug?.slice(-1).join("") || "overview",
      ["title", "slug", "weight"],
      join("overview", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  return { props: { posts, data, markdown, params, previousPost, nextPost } };
}

export async function getStaticPaths() {
  const posts = gettingaroundTree;

  const slugs = [];

  const allHrefs = (thisLink, tree) => {
    slugs.push(thisLink, ...tree.pages.map((e) => join(thisLink, e.slug)));
    allHrefsChildren(thisLink, tree.children);
  };

  const allHrefsChildren = (thisLink, children) => {
    Object.entries(children).map(([childSlug, child]) => {
      allHrefs(join(thisLink, childSlug), child);
    });
  };

  allHrefs("/getting-around", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}

