import Head from "next/head";
import Meta from "../components/Meta";
import Link from "next/link";
import {
  Container,
  SingleColumn,
  Section,
  getAllPosts,
  formatDate,
  generateDisplayDate,
} from "@urbit/foundation-design-system";
import IntraNav from "../components/IntraNav";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { contact } from "../lib/constants";
import { useRouter } from "next/router";

export default function Blog({ posts, search }) {
  const router = useRouter();
  const { tag } = router.query;

  const filteredPosts = tag ? posts.filter((e) => e?.tags?.includes(tag)) : posts;

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
      <SingleColumn>
        <Header search={search} />
        <Section>
          {tag ?
            <><h1 className="pb-16">{filteredPosts.length} posts tagged "{tag}"</h1>
              <p>
                For more posts, return to the <Link href="/blog">blog index</Link>.
              </p>
            </>
            : <><h1 className="pb-16">Blog</h1>
              <div className="md:columns-2 gap-x-8">
                <p className="pb-6 md:pb-0">
                  Stories from the broader Urbit community, the Urbit Foundation,
                  and the many people contributing to Urbit.
                </p>
                <p>
                  <a href={contact.newsletter}>Subscribe</a> to the Urbit Newsletter
                  for regular updates, including new blog posts and events.
                </p>
              </div>
            </>}
        </Section>
        <Section>
          {filteredPosts.map((post) => {
            const date = generateDisplayDate(post.date);
            return (
              <div key={post.slug} className="mb-20 cursor-pointer">
                <Link href={`/blog/${post.slug}`}>
                  <div class="flex items-center md:flex-row flex-col">
                    <div class="flex w-full rounded-lg aspect-h-4">
                      {
                        // Not all blog posts have images
                        post.extra.image ? (
                          <BackgroundImage
                            src={post.extra.image}
                            className="rounded-lg aspect-w-5 aspect-h-4 w-full"
                          />
                        ) : (
                          <div className="rounded-lg aspect-w-5 aspect-h-4 w-full bg-wall-100" />
                        )
                      }
                    </div>

                    <div class="w-full md:pl-6 ">
                      <h3 className="mt-6 md:mt-0">{post.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-baseline">
                          {post.extra.author ? (
                            <div className="type-sub-bold mr-2">
                              {post.extra.author}
                            </div>
                          ) : null}
                          {post.extra.ship ? (
                            <Link
                              href={`https://urbit.org/ids/${post.extra.ship}`}
                              passHref
                            >
                              <a className="type-sub-bold text-wall-500 font-mono">
                                {post.extra.ship}
                              </a>
                            </Link>
                          ) : null}
                        </div>
                      </div>
                      <div className="text-wall-500 type-sub mt-1">
                        {formatDate(date)}
                      </div>

                      {post?.description && (
                        <p className="mt-6">{post.description}</p>
                      )}
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
    ["title", "slug", "date", "description", "tags", "extra"],
    "blog",
    "date"
  );

  return {
    props: { posts },
  };
}
