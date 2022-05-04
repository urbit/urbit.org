import Head from "next/head";
import Meta from "../../components/Meta";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import { join } from "path";
import { buildPageTree, getPage } from "../../lib/lib";
import Markdown from "../../components/Markdown";
import ContentArea from "../../components/ContentArea";
import Sidebar from "../../components/Sidebar";

import { decode } from "html-entities";

const breadcrumbs = (posts, paths) => {
  const results = [
    <Link href="/">Urbit</Link>,
    <span className="px-1">/</span>,
    <Link href="/getting-started">Getting Started</Link>,
  ];
  let thisLink = "/getting-started";
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
    {children?.map((child) => (
      <li>{pageTree(join(thisLink, child.slug), child, level)}</li>
    ))}
  </ul>
);

const pageTree = (thisLink, tree, level = 0) => {
  const router = useRouter();

  const isThisPage = router.asPath === thisLink;

  const pageItemClasses = classnames({
    "pl-0 font-semibold text-wall-500 text-base hover:text-green-400":
      level === 0,
    "pl-8 text-wall-600 text-base hover:text-green-400": level === 1,
    "pl-12 text-wall-600 text-base hover:text-green-400": level === 2,
    "dot relative": isThisPage,
    "text-green-400": isThisPage,
  });

  return (
    <>
      <Link href={thisLink}>
        <a className={`${pageItemClasses} cursor-pointer`}>{tree.title}</a>
      </Link>
    </>
  );
};

export default function UsingLayout({ posts, data, params, search, markdown }) {
  const router = useRouter();
  const isSelected = "/getting-started".includes(router.asPath);
  const selectedClasses = classnames({
    dot: isSelected,
    "text-green-400": isSelected,
    "text-wall-500": !isSelected,
  });
  const rootClasses = "pl-0 font-semibold text-base hover:text-green-400";

  return (
    <>
      <Head>
        <title>{data.title} • Getting Started • urbit.org</title>
        {Meta(data)}
      </Head>
      <div className="flex h-screen min-h-screen w-screen sidebar">
        <Sidebar search={search}>
          <ul>
            <li>
              <Link href="/getting-started">
                <a className={`relative ${selectedClasses} ${rootClasses}`}>
                  Getting Started
                </a>
              </Link>
            </li>
          </ul>
          {childPages("/getting-started", posts.pages)}
        </Sidebar>
        <ContentArea
          breadcrumbs={breadcrumbs(posts, params.slug?.slice(0, -1) || "")}
          title={data.title}
          search={search}
          section={"Getting Started"}
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
  const posts = buildPageTree(
    join(process.cwd(), "content/getting-started"),
    "weight"
  );

  const { data, content } = getPage(
    join(
      process.cwd(),
      "content/getting-started",
      params.slug?.join("/") || "/"
    )
  );

  const markdown = await Markdown({ post: { content: content } });

  return { props: { posts, data, markdown, params } };
}

export async function getStaticPaths() {
  const posts = buildPageTree(
    join(process.cwd(), "content/getting-started"),
    "weight"
  );
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

  allHrefs("/getting-started", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}
