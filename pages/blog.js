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
      <SingleColumn>
        <Header search={search} />
        <Section narrow>
          <div className="measure">
            <h1 className="pb-16">Blog</h1>
            <p className="pb-6">
              Stories from the broader Urbit community, the Urbit Foundation,
              and the many people contributing to Urbit.
            </p>
            <p>
              <a href={contact.newsletter}>Subscribe</a> to the Urbit Newsletter
              for regular updates, including new blog posts and events.
            </p>
          </div>
        </Section>
        <Section narrow>
          {posts.map((post) => {
            const date = generateDisplayDate(post.date);
            return (
              <div key={post.slug} className="mb-20 cursor-pointer">
                <Link href={`/blog/${post.slug}`}>
                  <div>
                    {
                      // Not all blog posts have images
                      post.extra.image ? (
                        <BackgroundImage
                          src={post.extra.image}
                          className="rounded-lg aspect-w-5 aspect-h-4"
                        />
                      ) : null
                    }
                    <h3 className="mt-4">{post.title}</h3>
                    <div className="flex items-baseline mt-2">
                      {post.extra.author ? (
                        <div className="type-sub-bold mr-2">
                          {post.extra.author}
                        </div>
                      ) : null}
                      {post.extra.ship ? (
                        <Link href={`/ids/${post.extra.ship}`}>
                          <a className="type-sub-bold text-wall-500 font-mono">
                            {post.extra.ship}
                          </a>
                        </Link>
                      ) : null}
                    </div>
                    <div className="text-wall-500 type-sub">
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
    "blog",
    "date"
  );

  return {
    props: { posts },
  };
}
