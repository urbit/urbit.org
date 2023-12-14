import React from "react";
import Head from "next/head";
import {
  Container,
  Main,
  FatBlock,
  PostCard,
  getAllPosts,
  formatDate,
  generateDisplayDate,
} from "@urbit/fdn-design-system";
import IntraNav from "../components/IntraNav";
import Footer from "../components/Footer";
import Meta from "../components/Meta";

export default function Blog({ posts, search }) {
  const post = {
    title: "Blog",
    description:
      "Stories from the broader Urbit community, the Urbit Foundation, and the many people contributing to Urbit.",
  };

  return (
    <Container>
      <Head>
        <title>Blog • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <Main singleColumn>
        <h1 className="h1 text-brite mt-4 mb-24">Blog</h1>
        <FatBlock>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 " +
              "gap-4 md:gap-6 xl:gap-7 "
            }
          >
            {posts.map((post) => (
              <PostCard
                title={post.title}
                description={post.description}
                date={formatDate(generateDisplayDate(post.date))}
                authorName={post.extra?.author}
                authorPlanet={post.extra?.ship?.replace(/^~/, "")}
                href={`/blog/${post.slug}`}
                imgSrc={post.extra?.image}
              />
            ))}
          </div>
        </FatBlock>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(
    ["title", "slug", "date", "description", "tags", "extra"],
    "blog",
    "date"
  );

  return {
    props: { posts },
  };
}
