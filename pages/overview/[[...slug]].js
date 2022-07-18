import Head from "next/head";
import { useRouter } from "next/router";
import classnames from "classnames";
import Meta from "../../components/Meta";
import {
  Container,
  SingleColumn,
  Section,
  Markdown,
  IntraNav,
} from "foundation-design-system";
import { join } from "path";
import { getPage, getPreviousPost, getNextPost } from "../../lib/lib";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import overviewTree from "../../cache/overview.json";
import Link from "next/link";

export default function Overview({ posts, data, markdown, search }) {
  return (
    <Container>
      <Head>
        <title>{data.title} • Overview • Urbit</title>
        {Meta(data)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section>
          <h1>Overview</h1>
        </Section>
        <Section>
          <div className="flex justify-between sidebar">
            <Sidebar>{childPages("/overview", posts.pages)}</Sidebar>
            <div className="markdown max-w-prose">
              <h3>{data.title}</h3>
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
        <Link href="/overview">
          <a className={`${pageItemClasses} cursor-pointer`}>Introduction</a>
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
  const posts = overviewTree;

  const { data, content } = getPage(
    join(process.cwd(), "content/overview", params.slug?.join("/") || "/")
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
  const posts = overviewTree;

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

  allHrefs("/overview", posts);

  return {
    paths: slugs,
    fallback: false,
  };
}
