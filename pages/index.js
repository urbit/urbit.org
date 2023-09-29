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
import HighlightCard from "../components/HighlightCard";
import fs from "fs";
import path from "path";
import Meta from "../components/Meta";
import { matchEcosystemPost } from "../lib/lib";

export default function Home({
  posts,
  highlights,
  ecosystem,
  events,
  grantNumbers,
  search,
}) {
  const post = {
    title: "Urbit",
    description: "A clean-slate OS and network for the 21st century.",
    image: "https://storage.googleapis.com/media.urbit.org/site/opengraph/urbit.png"
  };
  return (
    <Container>
      <Head>
        <title>Urbit</title>
        {Meta(post, false, true)}
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
            <Link href="/getting-started" passHref><a className="bg-green-400 text-white button-lg max-w-fit">Get Started</a></Link>
          </div>
        </Section>
        {
          // Hero
        }

        {
          // Highlights
        }
         <Section className="pb-12">
         <div className="bg-wall-100 w-full p-4 md:p-8 rounded-3xl flex flex-wrap items-center" style={{ backgroundColor: '#FED107' }}>

            <div className="basis-full sm:basis-1/3 pb-4 sm:pb-0">
              <img className="rounded-xl w-72" src="https://storage.googleapis.com/media.urbit.org/assembly/assembly-tiles.gif" />
            </div>
            <div className="sm:basis-2/3 sm:pl-6 align-middle">
              <h2 className="text-2xl pb-2 text-white" >Assembly Lisboa 2023</h2 >
              <p className="max-w-prose pb-4 text-white" >
              Assembly is the largest annual Urbit conference, bringing together Urbit organizations, developers & enthusiasts from around the world. 
              </p>
              <Link href="https://assembly.urbit.org" passHref>
              <a className="button-sm border-2 border-wall-600 text-wall-600 type-sm max-w-fit" style={{ borderColor: '#F05826', color: '#F05826'}}>
                  Buy tickets & more
                </a>
              </Link>
            </div>
          </div>
        </Section>

        <Section narrow className="space-y-8">

          <div className="w-full space-y-8 max-w-prose">

            <h2 className="font-normal leading-tight">
              Urbit is a <span className="font-bold">new kind of computer</span>{" "}
              that you can <span className="font-bold">own completely</span> in
              ways that matter:{" "}
              <span className="font-bold">networking, identity, &amp; data</span>.
            </h2>

            <div className="space-y-4">
              <p className="">
                We realized that in order to fix the internet, we had to build a new
                computer from scratch. Good thing we started over a decade ago.
              </p>
              <p className="pb-4">
                Today, Urbit is a real system with thousands of users that are
                building all kinds of communities, software, DAOs, and more. And
                it’s getting better every day.{" "}
              </p>
              <Link href="/overview" passHref>
                <a className="button-lg bg-green-400 text-white type-ui max-w-fit">
                  Read the Overview
                </a>
              </Link>
            </div>

          </div>
        </Section>
        {/* Ecosystem */}
        <Section>
          <div className="flex flex-col space-y-8 pb-12">
            <h2 className="m-0 p-0 mr-4">Ecosystem</h2>
            <p className="max-w-prose">
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


  // Highlights
  const highlights = getAllPosts(
    ["title", "slug", "image", "url", "description"],
    "highlights"
  );


  // Latest ecosystem report with matched post metadata
  const ecosystem = matchEcosystemPost(getAllPosts(
    ["date", "featured-1", "featured-2", "featured-3"],
    "ecosystem/spotlight",
    "date"
  )[0]);

  // Latest grants
  const basePath = path.join(process.cwd(), 'content/grants')
  const years = fs.readdirSync(basePath, { 'withFileTypes': true }).filter((f) => f.isDirectory());
  const grants = years.map((year) => {
    return getAllPosts(
      ["title", "slug", "date", "description", "extra", "taxonomies"],
      `grants/${year.name}`,
      "date"
    )
  }).flat();

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
      highlights,
      ecosystem,
      grantNumbers,
      events: happeningNow.concat(futureEvents).concat(pastEvents),
    },
  };
}
