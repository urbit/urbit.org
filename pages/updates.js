import Head from "next/head";
import Meta from "../components/Meta";
import Link from "next/link";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SingleColumn from "../components/SingleColumn";
import BackgroundImage from "../components/BackgroundImage";
import Section from "../components/Section";
import { getAllPosts, formatDate, generateDisplayDate } from "../lib/lib";
import { contact } from "../lib/constants";

export default function Updates({ posts, search }) {
  const post = {
    title: "Updates",
    description: "Missives from the Urbit Foundation.",
  };
  return (
    <Container>
      <Head>
        <title>Updates • urbit.org</title>
        {Meta(post)}
      </Head>
      <SingleColumn>
        <Header search={search} />
        <Section narrow>
          <div className="measure">
            <h1 className="pb-16">Updates</h1>
            <p className="pb-6">Missives from the Urbit Foundation.</p>
          </div>
        </Section>
        <Section narrow>
          {posts.map((post) => {
            const date = generateDisplayDate(post.date);
            return (
              <div key={post.slug} className="mb-24 cursor-pointer">
                <Link href={`/updates/${post.slug}`}>
                  <div>
                    <h3 className="mt-4">{post.title}</h3>
                    <div className="flex items-baseline">
                      {post?.extra.author ? (
                        <div className="type-ui text-wall-500 mt-4">
                          {post?.extra.author}
                        </div>
                      ) : null}
                      {post?.extra.author && post?.extra.ship ? (
                        <div className="mx-1 text-wall-500">•</div>
                      ) : null}
                      {post?.extra.ship ? (
                        <Link href={`/ids/${post.extra.ship}`}>
                          <a className="type-sub-bold text-wall-500 font-mono">
                            {post.extra.ship}
                          </a>
                        </Link>
                      ) : null}
                    </div>

                    <div className="type-ui text-wall-500 mt-2">
                      {formatDate(date)}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(
    ["title", "slug", "date", "description", "extra"],
    "updates",
    "date"
  );

  return {
    props: { posts },
  };
}
