import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import Section from "../components/Section";
import SingleColumn from "../components/SingleColumn";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundImage from "../components/BackgroundImage";
import TabCarousel from "../components/TabCarousel";
import Contact from "../components/Contact";
import PostPreview from "../components/PostPreview";
import EventPreview from "../components/EventPreview";
import {
  getAllPosts,
  getAllEvents,
  formatDate,
  getOpenGrantsCount,
} from "../lib/lib";
import { contact, eventKeys } from "../lib/constants";

export default function Home({ posts, events, openGrantsCount, search }) {
  const [tab, setTab] = useState(0);
  const [heroButton, setHeroButton] = useState(<div />);

  const detectOS = () => {
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
    setHeroButton(detectOS());
  }, []);

  return (
    <Container>
      <Head>
        <title>urbit.org</title>
      </Head>
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
        <Section className="hidden md:flex">
          <div className="bg-wall-100 w-11/12 port-hero-card-height rounded-3xl flex">
            <div className="pt-20 pl-12 w-7/12">
              <div className="pb-8">
                <h2 className="p-0 m-0 pb-2 leading-none">Introducing</h2>
                <h2 className="text-green-400 p-0 m-0 leading-none">Port</h2>
              </div>
              <h4 className="pb-8">The Urbit client, now in beta.</h4>
              <p className="pb-24">
                Getting into Urbit is now as simple as installing an app on your
                computer.
              </p>
              {heroButton}
              <a
                href="https://github.com/urbit/port"
                className="type-ui text-wall-500"
              >
                View on GitHub
              </a>
            </div>
            <div className="w-full port-hero-image-height port-hero-image mt-8" />
          </div>
        </Section>

        {
          // Grants
        }
        <Section narrow>
          <div className="flex items-center pb-12">
            <h2 className="m-0 p-0 mr-4">Grants</h2>
            <Link href="/grants#find-a-grant">
              <a className="bg-green-400 text-white badge-lg">
                {openGrantsCount} Open
              </a>
            </Link>
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
              real ownership and authority over the network. Contributions
              include education, promotion, and development efforts.
            </p>
            <div className="table">
              <Link href="/grants">
                <a className="button-lg bg-green-400 text-white">View Grants</a>
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

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 pr-0 pb-8 md:pr-4">
              <PostPreview post={posts[0]} key={posts[0].slug} />
            </div>
            <div className="w-full md:w-1/2 pl-0 pb-8 md:pl-4">
              <PostPreview post={posts[1]} key={posts[1].slug} />
            </div>
          </div>
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

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 pr-0 pb-8 md:pr-4">
              <EventPreview event={events[0]} key={events[0].slug} />
            </div>
            <div className="w-full md:w-1/2 pl-0 pb-8 md:pl-4">
              <EventPreview event={events[1]} key={events[1].slug} />
            </div>
          </div>
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

  return {
    props: { posts, events, openGrantsCount },
  };
}
