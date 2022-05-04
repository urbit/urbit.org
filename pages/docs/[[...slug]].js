import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import classnames from "classnames";
import { join } from "path";
import {
  getPreviousPost,
  getNextPost,
  buildPageTree,
  getPage,
} from "../../lib/lib";
import Meta from "../../components/Meta";
import Pagination from "../../components/Pagination";
import Markdown from "../../components/Markdown";
import ContentArea from "../../components/ContentArea";
import Sidebar from "../../components/Sidebar";

import { decode } from "html-entities";

const breadcrumbs = (posts, paths) => {
  const results = [
    <Link href="/">Urbit</Link>,
    <span className="px-1">/</span>,
    <Link href="/docs">Documentation</Link>,
  ];
  let thisLink = "/docs";
  for (const path of paths) {
    posts = posts.children[path];
    thisLink = join(thisLink, path);
    results.push(
      <span className="px-1">/</span>,
      <Link href={thisLink}>{posts.title}</Link>
    );
  }
  return results;
};

const childPages = (thisLink, children, level = 0) => (
  <ul className="pl-0">
    {Object.entries(children).map(([childSlug, child]) => (
      <li>{pageTree(join(thisLink, childSlug), child, level)}</li>
    ))}
  </ul>
);

const pageTree = (thisLink, tree, level = 0) => {
  const router = useRouter();
  const firstCrumb = "/" + router.asPath.split("/").slice(1, -1).join("/");

  const includesThisPage = firstCrumb.includes(thisLink);
  const isThisPage = router.asPath === thisLink;
  const [isOpen, toggleTree] = useState(includesThisPage);

  const activeClasses = classnames({
    hidden: !isOpen,
  });

  const headingItemClasses = classnames({
    "pl-0 text-wall-600 text-base font-semibold hover:text-green-400 leading-relaxed":
      level === 0,
    "pl-4 text-wall-600 text-base font-semibold hover:text-green-400":
      level === 1,
    "pl-8 text-wall-600 text-base hover:text-green-400": level === 2,
  });

  const pageItemClasses = classnames({
    "pl-4 text-wall-600 text-base hover:text-green-400": level === 0,
    "pl-8 text-wall-600 text-base hover:text-green-400": level === 1,
    "pl-12 text-wall-600 text-base hover:text-green-400": level === 2,
  });

  return (
    <>
      <span onClick={() => toggleTree(!isOpen)}>
        <p className={`${headingItemClasses} cursor-pointer`}>{tree.title}</p>
      </span>
      <div className={activeClasses}>
        <ul className={""}>
          {tree.pages.map(({ title, slug }) => {
            const href = join(thisLink, slug);
            const isSelected = router.asPath === href;
            const selectedClasses = classnames({
              dot: isSelected,
              "text-green-400": isSelected,
            });
            return (
              <li>
                <Link href={href}>
                  <a
                    className={`relative inline-block ${pageItemClasses} ${selectedClasses}`}
                  >
                    {title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
        {childPages(thisLink, tree.children, level + 1)}
      </div>
    </>
  );
};

export default function DocsLayout({
  posts,
  data,
  params,
  search,
  markdown,
  previousPost,
  nextPost,
}) {
  const router = useRouter();

  const isSelected = "/docs".includes(router.asPath);
  const selectedClasses = classnames({
    dot: isSelected,
    "text-green-400": isSelected,
    "text-wall-600": !isSelected,
  });
  const rootClasses = "pl-0 text-base hover:text-green-400";
  return (
    <>
      <Head>
        <title>{data.title} • Documentation • urbit.org</title>
        {Meta(data)}
      </Head>
      <div className="flex h-screen min-h-screen w-screen sidebar">
        <Sidebar search={search}>
          <ul>
            <li>
              <Link href="/docs">
                <a className={`relative ${selectedClasses} ${rootClasses}`}>
                  Introduction
                </a>
              </Link>
            </li>
          </ul>
          {childPages("/docs", posts.children)}
        </Sidebar>
        <ContentArea
          breadcrumbs={breadcrumbs(posts, params.slug?.slice(0, -1) || "")}
          title={data.title}
          search={search}
          section="Urbit Documentation"
          params={params}
        >
          <div className="markdown technical">
            <article
              dangerouslySetInnerHTML={{ __html: decode(markdown) }}
            ></article>
          </div>
          <div className="flex justify-between mt-16">
            {previousPost === null ? (
              <div className={""} />
            ) : (
              <Pagination
                previous
                title="Previous Post"
                post={previousPost}
                className=""
                section={join("docs", params.slug?.slice(0, -1).join("/"))}
              />
            )}
            {nextPost === null ? (
              <div className={""} />
            ) : (
              <Pagination
                next
                title="Next Post"
                post={nextPost}
                className=""
                section={join("docs", params.slug?.slice(0, -1).join("/"))}
              />
            )}
          </div>
        </ContentArea>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const posts = buildPageTree(join(process.cwd(), "content/docs"), "weight");

  const { data, content } = getPage(
    join(process.cwd(), "content/docs", params.slug?.join("/") || "/")
  );

  const previousPost =
    getPreviousPost(
      params.slug?.slice(-1).join("") || "docs",
      ["title", "slug", "weight"],
      join("docs", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  const nextPost =
    getNextPost(
      params.slug?.slice(-1).join("") || "docs",
      ["title", "slug", "weight"],
      join("docs", params.slug?.slice(0, -1).join("/") || "/"),
      "weight"
    ) || null;

  const markdown = await Markdown({ post: { content: content } });

  return { props: { posts, data, markdown, previousPost, nextPost, params } };
}

export async function getStaticPaths() {
  const posts = buildPageTree(join(process.cwd(), "content/docs"), "weight");
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

  allHrefs("/docs", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}
