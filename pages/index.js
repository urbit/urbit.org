import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

import Container from "../components/Container";
import Section from "../components/Section";
import SingleColumn from "../components/SingleColumn";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundImage from "../components/BackgroundImage";
import Contact from "../components/Contact";
import PostPreview from "../components/PostPreview";
import EventPreview from "../components/EventPreview";
import Cross from "../components/icons/Cross";
import TwoUp from "../components/TwoUp";
import BubbleLink from "../components/BubbleLink";
import {
  getAllPosts,
  getAllEvents,
  formatDate,
  getOpenGrantsCount,
  generateRealtimeDate,
} from "../lib/lib";
import { contact, eventKeys } from "../lib/constants";
import { useLocalStorage } from "../lib/hooks";

const Banner = ({ children, isOpen, href, dismiss }) => {
  return (
    <div className="w-full flex justify-center bg-green-100">
      <SingleColumn>
        <div className="w-full layout">
          <div className="w-full flex justify-between items-center px-4 md:px-8 py-4">
            <a href={href} target="_blank">
              {children}
            </a>
            <button
              className="type-ui w-6 h-6 bg-green-400 flex items-center justify-center rounded-full text-white hover:opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
            >
              <Cross width="10" height="10" fill="#E5F7F1" />
            </button>
          </div>
        </div>
      </SingleColumn>
    </div>
  );
};

export default function Home({ posts, events, openGrantsCount, search }) {
  const [heroButton, setHeroButton] = useState(<div />);
  const [bannerElement, setBannerElement] = useState(null);
  const [isBannerOpen, setBanner] = useLocalStorage(
    "urbit-banner-softdist",
    true
  );

  const selectDownloadButton = () => {
    const agent = window.navigator.appVersion;
    if (agent.includes("Win")) {
      return (
        <span className="button-lg type-ui mb-5 bg-wall-600 text-white">
          Coming soon for Windows
        </span>
      );
    } else if (agent.includes("Mac")) {
      return (
        <a href="https://github.com/urbit/port/releases/latest/download/Port.dmg">
          <button className="button-lg type-ui mb-5 bg-green-400 text-white">
            Download For macOS
          </button>
        </a>
      );
    } else if (agent.includes("Linux")) {
      return (
        <code className="button-lg type-ui mb-5 bg-wall-600 text-white">
          sudo snap install port
        </code>
      );
    }
  };

  useEffect(() => {
    setHeroButton(selectDownloadButton());
  }, []);

  // Use this pattern when depending on client-side state or conditions like localStorage, user OS or geolocation.
  const selectBanner = (isBannerOpen) => {
    if (isBannerOpen) {
      return (
        <Banner
          href="https://assembly.urbit.org"
          dismiss={() => setBanner(false)}
        >
          <p className="text-green-400 font-semibold hover:opacity-70">{`-> Network update is live. Learn more at Assembly 2021.`}</p>
        </Banner>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    setBannerElement(selectBanner(isBannerOpen));
  }, [isBannerOpen]);

  return (
    <Container>
      <Head>
        <title>urbit.org</title>
      </Head>
      {/* {bannerElement} */}
      <SingleColumn>
        <Header search={search} />
        {
          // Hero Statement
        }
        <Section narrow>
          <div>
            <h1>A clean-slate OS</h1>
            <h1>and network</h1>
            <h1>for the 21st century.</h1>
          </div>
        </Section>

        {
          // Introducing Port
        }
        <Section>
          <div className="bg-wall-100 w-full p-8 md:p-12 rounded-3xl flex flex-col md:flex-row">
            <div className="md:w-6/12 w-full md:mr-6">
              <h2 className="pb-4">New at Urbit</h2>
              <h4 className="pb-4">
                Get on Urbit with these guides or swap a star for WSTR.
              </h4>
              <p>
                Urbit is for everyone, but sometimes it is easy to get lost in
                this universe. Follow these links to contribute to the network
                through developing, operating, exploring, or exchanging.
              </p>
            </div>
            <div className="pt-8 md:pt-20 md:w-6/12 w-full md:ml-6">
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
              <BubbleLink
                href="https://star.market/"
                className="mt-4 md:h-16"
                target="_blank"
                title="Star Market"
                caption="Exchange Stars and WSTR."
              >
                <img
                  alt="Marketplace logo"
                  className="max-w-none w-12 h-12 rounded-full"
                  src="/images/star-market-logo.png"
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
            {/* <Link href="/grants/proposals"> */}
            {/*   <a className="bg-green-400 text-white badge-lg"> */}
            {/*     {openGrantsCount} Open */}
            {/*   </a> */}
            {/* </Link> */}
          </div>
          <div className="flex flex-col md:flex-row w-full items-center md:items-start bg-green-100 px-8 py-8 rounded-xl">
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green-400">200+</h2>
              <h4 className="text-green-400 text-center pt-2">
                Urbit stars awarded
              </h4>
            </div>
            <div className="h-0 w-0 md:h-24 md:w-4 bg-green-200 self-center" />
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green-400">400+</h2>
              <h4 className="text-green-400 text-center pt-2">
                Different Contributors
              </h4>
            </div>
            <div className="h-0 w-0 md:h-24 md:w-4 bg-green-200 self-center" />
            <div className="flex items-center flex-col p-4 w-full">
              <h2 className="text-green-400">45+</h2>
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
              <Link href="/grants">
                <a className="button-lg bg-blue-400 text-white mr-2 mb-8">
                  Learn More
                </a>
              </Link>
              <Link href="/grants#view-grants">
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
              <Link href="https://urbit.org/docs/nock/definition/">
                <a>single pure function</a>
              </Link>{" "}
              that provides application developers with strong guarantees:
              automated persistence and memory management, repeatable builds,
              and support for hot code reloading.
            </p>
            <p className="pb-12">
              You can get started learning how to{" "}
              <Link href="https://urbit.org/docs/development/develop/">
                <a>contribute to the project</a>
              </Link>
              , or view a variety of{" "}
              <Link href="https://github.com/urbit/awesome-urbit#http-apis-airlock">
                <a>libraries</a>
              </Link>{" "}
              for building on Urbit using the languages you already know.
            </p>
            <Link href="/docs">
              <button className="button-lg type-ui text-white bg-wall-600">
                Read the Developer Docs
              </button>
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

          <Link href="/blog">
            <button className="button-lg type-ui text-white bg-green-400">
              See More
            </button>
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

          <Link href="/events">
            <button className="button-lg type-ui text-white bg-wall-600">
              More Events
            </button>
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
  const openGrantsCount = getOpenGrantsCount();

  const posts = getAllPosts(
    ["title", "slug", "date", "description", "extra"],
    "blog"
  );

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
      openGrantsCount,
      events: happeningNow.concat(futureEvents).concat(pastEvents),
    },
  };
}
