import Head from "next/head";
import Link from "next/link";
import React from "react";
import { DateTime } from "luxon";
import {
  Container,
  Section,
  SingleColumn,
  IntraNav,
} from "foundation-design-system";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import PostPreview from "../components/PostPreview";
import EventPreview from "../components/EventPreview";
import TwoUp from "../components/TwoUp";
import { getAllPosts, getAllEvents, generateRealtimeDate } from "../lib/lib";
import { eventKeys } from "../lib/constants";

export default function Home({ posts, events, grantNumbers, search }) {
  return (
    <Container>
      <Head>
        <title>urbit.org</title>
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        {
          // Hero Statement
        }
        <Section className="pb-36">
          <div>
            <h1>A clean-slate OS and network for the 21st&nbsp;century.</h1>
          </div>
        </Section>
        {
          // Hero
        }
        <Section>
          <div className="bg-[#FEFFDA] w-full p-8 md:p-12 rounded-3xl flex flex-col md:flex-row">
            <div className="md:w-10/12 w-full md:mr-6">
              <h2 className="m-0 p-0 mr-4 pb-6">Assembly 2022</h2>

              <p>
                Assembly 2022 is the second ever Urbit conference coming to you
                this year from Miami Beach. Grab a towel and get ready.
              </p>
              <p className="pt-4 font-bold pb-8">
                September 22nd–25th • Miami Beach, Florida
              </p>
              <Link href="https://assembly.urbit.org" passHref>
                <a className="button-lg max-w-fit bg-green-400 text-white">
                  Learn More
                </a>
              </Link>
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
            Today, Urbit is a real system with thousands of users that are building
            all kinds of communities, software, DAOs, and more. And it’s getting
            better every day.{" "}
          </p>
          <Link href="/overview" passHref>
            <a className="button-lg bg-green-400 text-white type-ui max-w-fit">
              Read the Overview
            </a>
          </Link>
        </Section>

        {
          // Grants
        }
        <Section narrow>
          <div className="flex items-center pb-12">
            <h2 className="m-0 p-0 mr-4">Grants</h2>
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
                <a className="button-lg bg-blue-400 text-white mr-2 mb-8">
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
          <div className="measure">
            <h2 className="pb-12">Build on Urbit</h2>
            <h4 className="pb-12">
              Urbit is a personal OS designed from scratch to run peer-to-peer
              applications.
            </h4>
            <p className="pb-12">
              It solves the hard problems of implementing a peer-to-peer network
              (including identity, NAT traversal, and exactly-once delivery) in
              the kernel so app developers can focus on business logic.
            </p>
            <p className="pb-12">
              The entire OS is a{" "}
              <Link href="https://urbit.org/docs/nock/definition/" passHref>
                <a>single pure function</a>
              </Link>{" "}
              that provides application developers with strong guarantees:
              automated persistence and memory management, repeatable builds,
              and support for hot code reloading.
            </p>
            <p className="pb-12">
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
          </div>
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
            <a className="button-lg max-w-fit type-ui text-white bg-green-400">
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

        {
          // Newsletter and social media
        }
        <Section narrow>
          <Contact emphasize />
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

  const events = getAllEvents(eventKeys, "events");

  const grants = getAllPosts(["extra", "taxonomies"], "grants", "date");

  const grantNumbers = {
    starsAwarded: Math.floor(
      grants.reduce(
        (total, a) =>
          total + (Number(a?.extra?.reward.replace(/ star[s]?/, "")) || 0),
        0
      )
    ),
    contributors: [
      ...new Set(...[grants.map((e) => e.extra.assignee.split(","))]),
    ].length,
    active: grants.filter(
      (e) =>
        !e.extra.canceled &&
        !e.extra.completed &&
        e.extra.assignee &&
        e.extra.assignee.length > 0
    ).length,
  };

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
      grantNumbers,
      events: happeningNow.concat(futureEvents).concat(pastEvents),
    },
  };
}
