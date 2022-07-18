import { useRouter } from "next/router";
import {
  getPostBySlug,
  getAllPosts,
  formatDate,
  generateDisplayDate,
} from "../../lib/lib";
import Head from "next/head";
import Link from "next/link";
import Meta from "../../components/Meta";
import ErrorPage from "../404";
import {
  Container,
  Markdown,
  SingleColumn,
  Section,
  IntraNav,
} from "foundation-design-system";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";

export default function MediaPage({ post, markdown, search }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  const date = generateDisplayDate(post.date);
  return (
    <Container>
      <Head>
        <title>{post.title} • Media • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section narrow short>
          <h1>{post.title}</h1>
          {post.extra.author ? (
            <div className="type-ui text-wall-500 mt-4 md:mt-8 lg:mt-10">
              {post.extra.author}
            </div>
          ) : null}
          {post.extra.ship ? (
            <Link href={`/ids/${post.extra.ship}`} passHref>
              <a className="type-sub-bold text-wall-500 font-mono">
                {post.extra.ship}
              </a>
            </Link>
          ) : null}
          <div className="type-ui text-wall-500 mt-16">{formatDate(date)}</div>
        </Section>
        <Section narrow>
          {post.extra.youtube ? (
            <iframe
              className="rounded-xl"
              width="100%"
              height="640px"
              src={`https://www.youtube.com/embed/${post.extra.youtube}`}
              frameborder="0"
              allow="encrypted-media"
              allowfullscreen
            ></iframe>
          ) : null}
          {post.extra.soundcloud ? (
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameborder="no"
              allow="autoplay"
              src={post.extra.soundcloud}
            ></iframe>
          ) : null}
        </Section>
        <Section narrow className="markdown">
          <Markdown.render content={JSON.parse(markdown)} />
        </Section>
        <Section narrow>
          <Contact />
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

//
export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra"],
    "media"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));

  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "media", "date");

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
