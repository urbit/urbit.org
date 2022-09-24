import Head from "next/head";
import Link from "next/link";
import React from "react";
import { DateTime } from "luxon";
import {
  Container,
  Section,
  SingleColumn,
  TwoUp,
  IntraNav,
  getAllPosts,
  generateRealtimeDate,
} from "@urbit/foundation-design-system";
import { getAllEvents } from "../lib/lib";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import PostPreview from "../components/PostPreview";
import EventPreview from "../components/EventPreview";
import { eventKeys } from "../lib/constants";
import IndexCard from "../components/ecosystem/IndexCard";
import fs from "fs";
import path from "path";
import Meta from "../components/Meta";

export default function Home({
  posts,
  ecosystem,
  events,
  grantNumbers,
  search,
}) {
  const post = {
    title: "Urbit",
    description: "A clean-slate OS and network for the 21st century.",
  };
  return (
    <Container>
      <Head>
        <title>Urbit</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        {
          // Hero Statement
        }
        <Section className="pb-36">
          <div className="space-y-8">
            <h1>A clean-slate OS and network for the 21st&nbsp;century.</h1>
            <Link href="/trial" passHref><a className="bg-green-400 text-white button-lg max-w-fit">Explore the Network</a></Link>
          </div>
        </Section>
        {
          // Hero
        }
        <Section>
          <div className="bg-wall-100 dark:bg-[#5C5037] w-full p-8 md:p-12 rounded-3xl flex flex-col md:flex-row">
            <div className="md:w-10/12 w-full md:mr-6">
              <h2 className="m-0 p-0 mr-4 pb-6">Assembly 2022</h2>

              <p>
                Assembly 2022 is the second ever Urbit conference coming to you
                this year from Miami Beach. Grab a towel and get ready.
              </p>
              <p className="pt-4 font-bold pb-8">
                September 22nd–25th • Miami Beach, Florida
              </p>

              <div class="flex flex-wrap">
                <Link href="https://assembly.urbit.org" passHref>
                  <a target="_blank" className="button-lg max-w-fit bg-wall-600 text-white mr-3 mb-8">
                    Learn More
                  </a>
                </Link>
                <Link href="/groups/~bitdeg/assembly22" passHref>
                  <a className="button-lg max-w-fit bg-transparent text-wall-600 border-2 border-wall-600 hover:bg-wall-600 hover:text-wall-100">
                    Join the Group
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Section>
        <Section narrow className="space-y-8">
          <h2 className="font-normal">
            Urbit is a <span className="font-bold">new kind of computer</span>{" "}
            that you can <span className="font-bold">own completely</span> in
            ways that matter:{" "}
            <span className="font-bold">networking, identity, and data</span>.
          </h2>
          <p className="max-w-prose">
            We realized that in order to fix the internet, we had to build a new
            computer from scratch. Good thing we started over a decade ago.
          </p>
          <p className="max-w-prose">
            Today, Urbit is a real system with thousands of users that are
            building all kinds of communities, software, DAOs, and more. And
            it’s getting better every day.{" "}
          </p>
          <Link href="/overview" passHref>
            <a className="button-lg bg-green-400 text-white type-ui max-w-fit">
              Read the Overview
            </a>
          </Link>
        </Section>
        {/* Ecosystem */}
        <Section>
          <div className="flex flex-col space-y-8 pb-12">
            <h2 className="m-0 p-0 mr-4">Ecosystem</h2>
            <p>
              The Urbit ecosystem is comprised of a wide variety of individuals
              and organizations, including developers, DAOs, podcasters, and
              more.
            </p>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
              {["featured-1", "featured-2", "featured-3"].map((feat) => {
                if (ecosystem?.[feat]) {
                  return (
                    <IndexCard
                      slug={`/ecosystem/#${ecosystem[feat]?.title
                        .toLowerCase()
                        .replace(/ /, "-")}`}
                      feat={ecosystem[feat]}
                    />
                  );
                }
              })}
            </div>
            <Link href="/ecosystem" passHref>
              <a className="z-50 button-lg bg-green-400 text-white w-fit">
                Explore Ecosystem
              </a>
            </Link>
          </div>
        </Section>
        {
          // Grants
        }
        <Section narrow>
          <div className="flex items-center pb-12">
            <h2 className="m-0 p-0 mr-4">Grants Program</h2>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center md:items-start bg-green-100 px-8 py-8 rounded-xl">
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green-400">{grantNumbers?.starsAwarded}</h2>
              <h4 className="text-green-400 text-center pt-2">
                Urbit stars awarded
              </h4>
            </div>
            <div className="h-0 w-0 md:h-24 md:w-4 bg-green-200 self-center" />
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green-400">{grantNumbers?.contributors}</h2>
              <h4 className="text-green-400 text-center pt-2">
                Different Contributors
              </h4>
            </div>
            <div className="h-0 w-0 md:h-24 md:w-4 bg-green-200 self-center" />
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green-400">{grantNumbers?.active}</h2>
              <h4 className="text-green-400 text-center pt-2">
                Active Projects
              </h4>
            </div>
          </div>
          <div className="measure py-12">
            <p className="pb-12">
              We regularly grant address space to give motivated contributors
              real ownership and authority over the network.
            </p>
            <div className="flex flex-wrap">
              <Link href="/grants" passHref>
                <a className="button-lg bg-blue-400 text-white mr-3 mb-8">
                  Learn More
                </a>
              </Link>
              <Link href="/grants#view-grants" passHref>
                <a className="button-lg bg-green-400 text-white mr-2 mb-8">
                  View Grants
                </a>
              </Link>
            </div>
          </div>
        </Section>

        {
          // Build on Urbit Developer CTA
        }
        <Section narrow>
          <h2 className="pb-8">Build on Urbit</h2>
          <h4 className="pb-6">
            Urbit is a personal OS designed from scratch to run peer-to-peer
            applications.
          </h4>
          <p className="pb-6">
            It solves the hard problems of implementing a peer-to-peer network
            (including identity, NAT traversal, and exactly-once delivery) in
            the kernel so app developers can focus on business logic.
          </p>
          <p className="pb-6">
            The entire OS is a{" "}
            <Link href="https://urbit.org/docs/nock/definition/" passHref>
              <a>single pure function</a>
            </Link>{" "}
            that provides application developers with strong guarantees:
            automated persistence and memory management, repeatable builds, and
            support for hot code reloading.
          </p>
          <p className="pb-10">
            You can get started learning how to{" "}
            <Link href="https://urbit.org/docs/development/develop/" passHref>
              <a>contribute to the project</a>
            </Link>
            , or view a variety of{" "}
            <Link
              href="https://github.com/urbit/awesome-urbit#http-apis-airlock"
              passHref
            >
              <a>libraries</a>
            </Link>{" "}
            for building on Urbit using the languages you already know.
          </p>
          <Link href="https://developers.urbit.org" passHref>
            <a className="button-lg type-ui text-white bg-green-400 max-w-fit">
              Visit Urbit Developers
            </a>
          </Link>
        </Section>

        {
          // Blog Posts
        }
        <Section>
          <div className="flex items-center measure pb-12">
            <h2>Blog</h2>
          </div>

          <TwoUp>
            <PostPreview post={posts[0]} key={posts[0].slug} />
            <PostPreview post={posts[1]} key={posts[1].slug} />
          </TwoUp>

          <Link href="/blog" passHref>
            <a className="button-lg max-w-fit type-ui text-white bg-green-400 z-10">
              See More
            </a>
          </Link>
        </Section>

        {
          // Events Posts
        }
        <Section>
          <div className="flex items-center measure pb-12">
            <h2>Events</h2>
          </div>

          <TwoUp>
            <EventPreview event={events[0]} key={events[0].slug} />
            <EventPreview event={events[1]} key={events[1].slug} />
          </TwoUp>

          <Link href="/events" passHref>
            <a className="button-lg max-w-fit type-ui text-white bg-wall-600">
              More Events
            </a>
          </Link>
        </Section>

        <Section narrow>
          <h2 className="pb-2">Urbit Monthly</h2>
          <p className="pb-8">Get monthly email updates on all things Urbit.</p>

          <Contact emphasize />
        </Section>

        <Section narrow>
          <h2 className="pb-8">Social Media</h2>
          <p className="pb-2">
            Follow us on <Link href="http://twitter.com/urbit">Twitter</Link>
          </p>
          <p className="pb-2">
            Check out our posts on{" "}
            <Link href="http://instagram.com/urbit">Instagram</Link>
          </p>
          <p className="pb-2">
            Watch livestreams on{" "}
            <Link href="https://www.youtube.com/channel/UCNYIS9_SktINCC9yqO4CFZw">
              YouTube
            </Link>
          </p>
          <p className="pb-2">
            Dig into code on <Link href="http://github.com/urbit">Github</Link>
          </p>
          <p className="pb-2">
            Boot Urbit and join{" "}
            <Link href="https://urbit.org/groups/~bitbet-bolbel/urbit-community">
              Urbit Community
            </Link>
          </p>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  // Latest blog posts
  const posts = getAllPosts(
    ["title", "slug", "date", "description", "extra"],
    "blog",
    "date"
  );

  // Pull all latest ecosystem information
  const ecosystem = getAllPosts(
    ["date", "featured-1", "featured-2", "featured-3"],
    "ecosystem/spotlight",
    "date"
  )[0];

  const marketplaces = getAllPosts(["title", "image", "slug"], "marketplaces");
  const podcasts = getAllPosts(
    ["title", "image", "date", "podcast", "slug"],
    "podcasts",
    "date"
  );
  const organizations = getAllPosts(
    ["title", "image", "slug"],
    "organizations"
  );
  const applications = fs
    .readdirSync(path.join(process.cwd(), "content/applications"), {
      withFileTypes: true,
    })
    .filter((f) => f.isDirectory())
    .map((dir) =>
      getAllPosts(
        ["title", "bgColor", "image", "slug", "description"],
        `applications/${dir.name}`
      )
        .map((e) => ({ ...e, ship: dir.name }))
        .flat()
    )
    .flat()
    .sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      return nameA < nameB ? -1 : 1;
    });

  ["featured-1", "featured-2", "featured-3"].forEach((feat) => {
    if (ecosystem?.[feat]) {
      const matchedPost = [
        ...applications.map((e) => ({ ...e, type: "Application" })),
        ...organizations.map((e) => ({ ...e, type: "Organization" })),
        ...podcasts.map((e) => ({ ...e, type: "Podcast" })),
        ...marketplaces.map((e) => ({ ...e, type: "Marketplace" })),
      ].filter((e) => e.title === ecosystem[feat].title)?.[0];
      ecosystem[feat].image =
        ecosystem[feat].image || matchedPost?.image || null;
      ecosystem[feat].type = matchedPost?.type || "Podcast";
      ecosystem[feat].matchedPost = matchedPost || null;
    }
  });

  // Latest grants
  const grants = getAllPosts(["extra", "taxonomies"], "grants", "date");

  const grantNumbers = {
    starsAwarded: Math.floor(
      grants.reduce(
        (total, a) =>
          total + (Number(a?.extra?.reward.replace(/ star[s]?/, "")) || 0),
        0
      )
    ),
    contributors: [...new Set(...[grants.map((e) => e.extra.assignee).flat()])]
      .length,
    active: grants.filter(
      (e) =>
        !e.extra.canceled &&
        !e.extra.completed &&
        e.extra.assignee &&
        e.extra.assignee?.[0]?.length > 0
    ).length,
  };

  // Latest events
  const events = getAllEvents(eventKeys, "events");
  const now = DateTime.now();

  const pastEvents = events.filter((event) => {
    const ends = generateRealtimeDate(event.ends);
    return ends < now;
  });

  const futureEvents = events
    .filter((event) => {
      const starts = generateRealtimeDate(event.starts);
      return starts > now;
    })
    .sort((a, b) => {
      const aStarts = generateRealtimeDate(a.starts).ts;
      const bStarts = generateRealtimeDate(b.starts).ts;
      if (aStarts > bStarts) {
        return 1;
      } else if (aStarts === bStarts) {
        return 0;
      }
      return -1;
    });

  const happeningNow = events.filter((event) => {
    const starts = generateRealtimeDate(event.starts);
    const ends = generateRealtimeDate(event.ends);
    return starts > DateTime.now() && ends < now;
  });

  return {
    props: {
      posts,
      ecosystem,
      grantNumbers,
      events: happeningNow.concat(futureEvents).concat(pastEvents),
    },
  };
}
