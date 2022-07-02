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
import BubbleLink from "../components/index/BubbleLink";
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
        <Section>
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
                Assembly 2022 is the second ever Urbit conference coming to you this year from Miami Beach.  Grab a towel and get ready.
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


        {
          // Hero
        }
        <Section>
          <div className="bg-wall-100 w-full p-8 md:p-12 rounded-3xl flex flex-col md:flex-row">
            <div className="md:w-6/12 w-full md:mr-6">
              <h3>
                Urbit is a new kind of computer that you can own completely in ways that matter: networking, identity, and data. 
              </h3>
              <p className="pt-8">
                Follow these links to contribute to the network through
                developing, operating, and exploring.
              </p>
            </div>
            <div className="pt-8 md:pt-0 md:w-6/12 w-full md:ml-6">
              <BubbleLink
                href="https://developers.urbit.org"
                title="Developers"
                target="_blank"
                className="md:h-16"
                caption="Start building on Urbit today."
              >
                <img
                  alt="Marketplace logo"
                  className="max-w-none w-12 h-12 rounded-full"
                  src="/images/developers-guide-logo.png"
                />
              </BubbleLink>
              <BubbleLink
                href="https://operators.urbit.org"
                className="mt-4 md:h-16"
                target="_blank"
                title="Operator’s Guide"
                caption="Own a star or galaxy? This is for you."
              >
                <img
                  alt="Marketplace logo"
                  className="max-w-none w-12 h-12 rounded-full"
                  src="/images/operators-guide-logo.png"
                />
              </BubbleLink>
              <BubbleLink
                href="https://network.urbit.org/"
                className="mt-4 md:h-16"
                target="_blank"
                title="Network Explorer"
                caption="View on-chain Urbit activity in real-time."
              >
                <img
                  alt="Marketplace logo"
                  className="max-w-none w-12 h-12 rounded-full"
                  src="/images/network-explorer-logo.png"
                />
              </BubbleLink>
            </div>
          </div>
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
              <a className="button-lg type-ui text-white bg-wall-600 max-w-fit">
                Read the Developer Docs
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
