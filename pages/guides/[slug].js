import { useRouter } from "next/router";
import { getPostBySlug, getAllPosts } from "../../lib/lib";
import Head from "next/head";
import Link from "next/link";
import Meta from "../../components/Meta";
import ErrorPage from "../404";
import Container from "../../components/Container";
import Markdown from "../../components/Markdown";
import GuideColumn from "../../components/GuideColumn";
import Section from "../../components/Section";

import { decode } from "html-entities";

export default function GuidePage({ post, markdown }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Head>
        <title>Urbit • {post.title}</title>
        {Meta(post)}
      </Head>
      <GuideColumn>
        <Section narrow short>
          <h2>{post.title}</h2>
        </Section>
        <Section narrow short className="markdown">
          <article
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          ></article>
          <Link href="/">
            <a className="text-xl pt-12 block font-semibold">Urbit.org</a>
          </Link>
        </Section>
      </GuideColumn>
    </Container>
  );
}

//
export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra"],
    "guides"
  );

  const markdown = await Markdown({ post });

  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "guides", "date");

  const noApplications = posts.filter(
    (e) => e.slug !== "installing-applications"
  );

  return {
    paths: noApplications.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
