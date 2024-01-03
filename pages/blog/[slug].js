import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Meta from "../../components/Meta";
import ErrorPage from "../404";
import {
  Container,
  Markdown,
  SingleColumn,
  Section,
  TwoUp,
  getPostBySlug,
  getAllPosts,
  getNextPost,
  getPreviousPost,
  formatDate,
  generateDisplayDate,
} from "@urbit/foundation-design-system";
import IntraNav from "../../components/IntraNav";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostPreview from "../../components/PostPreview";

export default function Post({
  post,
  markdown,
  nextPost,
  previousPost,
  search,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  const date = generateDisplayDate(post.date);
  return (
    <Container>
      <Head>
        <title>{post.title} • Blog • urbit.org</title>
        {Meta(post, false, true)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section narrow className="pb-10">
          <h1>{post.title}</h1>
          <h3 className=" mt-6">{post.description}</h3>
          <div className="flex items-baseline mt-6">
            {post.extra.author ? (
              <div className="type-sub-bold mr-2">{post.extra.author}</div>
            ) : null}
            {post.extra.ship ? (
              <Link href={`/ids/${post.extra.ship}`} passHref>
                <a className="type-sub-bold text-wall-500 font-mono">
                  {post.extra.ship}
                </a>
              </Link>
            ) : null}
          </div>
          <div className="text-wall-500 type-sub">{formatDate(date)}</div>
        </Section>
        <Section short narrow className="markdown">
          <Markdown.render content={JSON.parse(markdown)} />
        </Section>
        <Section wide className="flex">
          <TwoUp>
            {nextPost ? <PostPreview post={nextPost} /> : null}
            {previousPost ? <PostPreview post={previousPost} /> : null}
          </TwoUp>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

//
export async function getStaticProps({ params }) {
  const nextPost =
    getNextPost(
      params.slug,
      ["title", "slug", "date", "description", "extra"],
      "blog"
    ) || null;

  const previousPost =
    getPreviousPost(
      params.slug,
      ["title", "slug", "date", "description", "extra"],
      "blog"
    ) || null;

  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra"],
    "blog"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown, nextPost, previousPost },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "blog", "date");

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
