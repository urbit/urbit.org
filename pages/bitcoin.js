import { Container, SingleColumn, Section, TableOfContents, getAllPosts, getPage, TwoUp, Markdown } from "@urbit/foundation-design-system";
import Head from "next/head";
import Link from "next/link";
import Meta from "../components/Meta";
import IntraNav from "../components/IntraNav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostPreview from "../components/PostPreview"
import { join } from 'path';
import EventPreview from "../components/EventPreview";
import { getAllEvents } from "../lib/lib";

import { eventKeys } from "../lib/constants";


export default function Bitcoin({ search, posts, data, markdown, events }) {
    const post = {
        title: "Bitcoin on Urbit: The Sovereign Stack",
        description: "Sound digital money and sound computing need each other to achieve a free and prosperous future, and Urbit and Bitcoin's common paradigm of long-termism and self-sovereignty will get us there."
    }

    return (
        <Container>
            <Head>
                <title>Bitcoin on Urbit: The Sovereign Stack • urbit.org</title>
                {Meta(post)}
            </Head>
            <IntraNav ourSite="https://urbit.org" search={search} />
            <SingleColumn>
                <Header search={search} />
                <Section>
                    <h1>{post.title}</h1>
                </Section>
                <Section className="flex space-x-12">
                    <div className="min-w-0">
                        <div>
                            <p>Sound digital money and sound computing need each other to achieve a free and prosperous future, and Urbit and Bitcoin's common paradigm of long-termism and self-sovereignty will get us there. Check out the resources on this page to learn about current Lightning Network development on Urbit and join the Urbitcoiner community.</p>
                        </div>
                        <div className="mt-32">
                            <h2 className="mb-8" id="title">{data.title}</h2>
                            <div className="markdown">
                                <Markdown.render content={JSON.parse(markdown)} />
                            </div>
                        </div>
                        <div className="mt-32">
                            <h2 className="mb-8" id="blog">Blog Posts</h2>
                            <TwoUp>
                                <PostPreview post={posts[0]} key={posts[0].slug} />
                                {posts[1] ? <PostPreview post={posts[1]} key={posts[1].slug} /> : <div />}
                            </TwoUp>
                            <Link href="/blog?tag=bitcoin">
                                <a className="bg-green-400 text-white button-lg w-fit">
                                    View All
                                </a>
                            </Link>
                        </div>
                        <div className="mt-32">
                            <h2 className="mb-8" id="events">Events</h2>
                            <TwoUp>
                                <EventPreview event={events[0]} className="mb-8" />
                                {events[1] ? <EventPreview event={events[1]} className="mb-8" /> : <div />}
                            </TwoUp>
                            <Link href="/events?tag=bitcoin">
                                <a className="bg-wall-600 text-white button-lg w-fit">
                                    View All
                                </a>
                            </Link>
                        </div>
                    </div>
                    <TableOfContents markdown={false} />
                </Section>
            </SingleColumn>
            <Footer />
        </Container>
    )
}

export async function getStaticProps() {
    // Latest blog posts
    const posts = getAllPosts(
        ["title", "slug", "date", "description", "tags", "extra"],
        "blog",
        "date"
    ).filter((e) => e.tags?.includes("bitcoin"));

    const events = getAllEvents(eventKeys, "events").filter((e) => e?.tags?.includes("bitcoin"));

    const { data, content } = getPage(join(process.cwd(), 'content', 'bitcoin'));

    const markdown = JSON.stringify(Markdown.parse({ post: { content } }));
    return {
        props: {
            posts,
            data,
            markdown,
            events
        }
    }
}
