import Head from "next/head";
import Meta from "../../components/Meta";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import classnames from "classnames";
import { join } from "path";
import { getDocs, formatDate, buildPageTree, getPage } from "../../lib/lib";
import Markdown from "../../components/Markdown";
import ContentArea from "../../components/ContentArea";
import Sidebar from "../../components/Sidebar";

import { decode } from "html-entities";

const breadcrumbs = (posts, paths) => {
  const results = [
    <Link href="/">Urbit</Link>,
    <span className="px-1">/</span>,
    <Link href="/using">User's Manual</Link>,
  ];
  let thisLink = "/using";
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
  <ul className="pl-1">
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
    "pl-0 text-wall-500 text-base font-semibold hover:text-green-400 leading-relaxed":
      level === 0,
    "pl-4 text-wall-500 text-base font-semibold hover:text-green-400":
      level === 1,
    "pl-8 text-wall-500 text-base hover:text-green-400": level === 2,
  });

  const pageItemClasses = classnames({
    "pl-4 text-wall-600 text-base hover:text-green-400": level === 0,
    "pl-8 text-wall-600 text-base hover:text-green-400": level === 1,
    "pl-12 text-wall-600 text-base hover:text-green-400": level === 2,
    dot: isThisPage,
  });

  return (
    <>
      <span onClick={() => toggleTree(!isOpen)}>
        <p className={`${headingItemClasses} cursor-pointer`}>{tree.title}</p>
      </span>
      <div className={activeClasses}>
        <ul className={"pl-1"}>
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
                    className={`relative ${pageItemClasses} ${selectedClasses}`}
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

export default function UsingLayout({ posts, data, params, search, markdown }) {
  return (
    <>
      <Head>
        <title>{data.title} • User's Manual • urbit.org</title>
        {Meta(data)}
      </Head>
      <div className="flex w-screen h-screen min-h-screen w-screen sidebar">
        <Sidebar search={search}>
          {childPages("/using", posts.children)}
        </Sidebar>
        <ContentArea
          breadcrumbs={breadcrumbs(posts, params.slug?.slice(0, -1) || "")}
          title={data.title}
          search={search}
          section={"User's Manual"}
          params={params}
        >
          <div className="markdown">
            <article
              dangerouslySetInnerHTML={{ __html: decode(markdown) }}
            ></article>
          </div>
        </ContentArea>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const posts = buildPageTree(join(process.cwd(), "content/using"), "weight");

  const { data, content } = getPage(
    join(process.cwd(), "content/using", params.slug?.join("/") || "/")
  );

  const markdown = await Markdown({ post: { content: content } });

  return { props: { posts, data, markdown, params } };
}

export async function getStaticPaths() {
  const posts = buildPageTree(join(process.cwd(), "content/using"), "weight");
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

  allHrefs("/using", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}
