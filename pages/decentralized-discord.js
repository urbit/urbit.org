import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  Container,
  Section,
  SingleColumn,
  TwoUp,
  getPostBySlug,
} from "@urbit/foundation-design-system";
import Meta from "../components/Meta";
import IntraNav from "../components/IntraNav";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Probably should make a core component, just pulling from operators.urbit.org for this one
function GuideCard({ title, description, href, className }) {
  return (
    <div
      className={"bg-wall-100 rounded-xl cursor-pointer h-full " + className}
    >
      <div className="p-8 measure flex justify-between flex-col">
        <div className="flex flex-col space-y-2">
          <h4 className="mb-2">{title}</h4>
          {description}
        </div>
        <Link href={href}>
          <a
            passHref
            className="bg-green-400 text-white rounded-lg flex justify-center p-3 w-20 mt-4 min-w-fit"
          >
            Get Started
          </a>
        </Link>
      </div>
    </div>
  );
}

export default function DiscordLanding({ search, featuredGroups }) {
  const post = {
    title: "Urbit is Decentralized Discord",
    description:
      "There's no need to rely on centralized services to run a decentralized web3 project.",
    image:
      "https://storage.googleapis.com/media.urbit.org/site/landing/discord-opengraph.png",
  };
  const pairedGroups = pair(featuredGroups);
  return (
    <Container>
      <Head>
        <title>Urbit is Decentralized Discord (and a lot more)</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section className="pb-24">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="uppercase tracking-widest">Urbit is</h3>
            <h1 className="text-center">Decentralized Discord</h1>
            <Link href="/ecosystem">
              <a className="text-wall-400 pb-12">(and a lot more)</a>
            </Link>
          </div>
          <video autoPlay muted loop playsInline>
            <source
              src="https://storage.googleapis.com/media.urbit.org/site/groupsdemo.webm"
              type="video/webm"
            />
            <source
              src="https://storage.googleapis.com/media.urbit.org/site/groupsdemo-2.mp4"
              type="video/mp4"
            />
          </video>

          <div className="pt-8 md:p-16">
            <p className="type-ui text-center">
              Urbit’s Groups app allows teams, communities, and friends to get
              together and communicate using their own private servers.
            </p>
            <p className="type-ui pt-8 text-center">
              Unlike Discord, only you can delete your Urbit and identity.
            </p>
          </div>
        </Section>
        {/* Features */}
        <Section className="flex flex-col space-y-8">
          {/* Chat */}
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col space-y-4 max-w-prose">
              <h3>Chat</h3>
              <p>
                Create chat channels which are open for all to join (or private)
                in which you reply to individual messages, share images, urbit
                applications, and even embed messages from other chatrooms.
              </p>
            </div>
            <img
              className="block h-72"
              src="https://storage.googleapis.com/media.urbit.org/site/discord/chat.png"
            />
          </div>
          {/* Messages */}
          <div className="flex flex-col-reverse md:flex-row items-center md:space-x-8">
            <img
              className="block h-72 my-8 md:my-0"
              src="https://storage.googleapis.com/media.urbit.org/site/discord/messages.png"
            />
            <div className="flex flex-col space-y-4 max-w-prose">
              <h3>Messages</h3>
              <p>
                Reach out to your friends directly via Messages, a simple chat
                tool that lets you talk one-on-one or with many.
              </p>
            </div>
          </div>
          {/* Notebooks */}
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col space-y-4 max-w-prose">
              <h3>Notebooks</h3>
              <p>
                Write a blog post, create a magazine, draft an announcement or
                documentation using Notebooks, a short and long form text
                editor.
              </p>
            </div>
            <img
              className="block h-72"
              src="https://storage.googleapis.com/media.urbit.org/site/discord/notebooks.png"
            />
          </div>
          {/* Collections */}
          <div className="flex flex-col-reverse md:flex-row items-center md:space-x-8">
            <img
              className="block h-72 my-8 md:my-0"
              src="https://storage.googleapis.com/media.urbit.org/site/discord/collections.png"
            />
            <div className="flex flex-col space-y-4 max-w-prose">
              <h3>Collections</h3>
              <p>
                Assemble a feed of images, save links for later, make a mood
                board, or start a forum on Collections, a repository for
                day-to-day digital trawling.
              </p>
            </div>
          </div>
          {/* Profiles */}
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex flex-col space-y-4 max-w-prose">
              <h3>Profiles</h3>
              <p>
                Make your Urbit ID yours: set a nickname, write a bio, change
                your avatar, or choose to stay anonymous. You can also pin
                featured groups on your profile.
              </p>
            </div>
            <img
              className="block h-72"
              src="https://storage.googleapis.com/media.urbit.org/site/discord/profiles.png"
            />
          </div>
        </Section>

        <Section className="justify-center flex-col flex items-center space-y-8">
          <h2 className="text-center">
            Host your own group in under 60 minutes
          </h2>
          <TwoUp>
            <GuideCard
              title="Host a Group"
              description={
                <>
                  <p>Groups need a host that's always online.</p>
                  <p>
                    With Urbit, that just means getting an Urbit ID and then a
                    quick installation on a VPS or local computer.
                  </p>
                </>
              }
              href="https://operators.urbit.org/manual/running/hosting"
            />
            <GuideCard
              title="Join a Group"
              description={
                <p>
                  The easiest way to jump on the network is to download Urbit
                  and boot up a comet - a Temporary ID.
                </p>
              }
              href="https://urbit.org/getting-started"
            />
          </TwoUp>
          <div className="flex items-center space-x-4 w-full">
            <svg
              width="87"
              height="83"
              viewBox="0 0 87 83"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.6247 44.723C19.4335 43.7564 20.9208 43.7564 21.7257 44.723L29.6952 54.2785C30.504 55.2451 31.9913 55.2451 32.7962 54.2785L49.7491 33.9522C50.5578 32.9856 52.0452 32.9856 52.8501 33.9522L60.6894 43.3539C63.0842 42.4938 65.6605 42.0244 68.3472 42.0244C69.1994 42.0244 70.0437 42.0756 70.8722 42.1664L70.8801 5.12361C70.8801 2.61831 68.8404 0.578613 66.3351 0.578613H5.5139C3.0086 0.578613 0.968903 2.61831 0.968903 5.12361V62.729C0.968903 65.2343 3.0086 67.274 5.5139 67.274H45.7715C45.6808 66.4455 45.6295 65.6012 45.6295 64.749C45.6295 63.8967 45.6808 63.0525 45.7715 62.224L6.0189 62.22V59.837L18.6247 44.723ZM21.6744 13.618C25.9195 13.618 29.3599 17.0583 29.3599 21.3035C29.3599 25.5487 25.9196 28.989 21.6744 28.989C17.4292 28.989 13.9889 25.5487 13.9889 21.3035C13.985 17.0584 17.4292 13.618 21.6744 13.618ZM68.3556 47.0702C58.5948 47.0702 50.6806 54.9845 50.6806 64.7452C50.6806 74.506 58.5948 82.4202 68.3556 82.4202C78.1163 82.4202 86.0306 74.506 86.0306 64.7452C86.0306 54.9845 78.1163 47.0702 68.3556 47.0702ZM77.201 64.0392C76.7039 64.5561 76.0411 64.8165 75.3782 64.8165C74.7509 64.8165 74.1197 64.5837 73.6304 64.1142L70.8765 61.4748V73.9382C70.8765 75.3348 69.7482 76.4632 68.3515 76.4632C66.9549 76.4632 65.8265 75.3348 65.8265 73.9382L65.8305 62.2201V61.4745L63.0766 64.1139C62.0666 65.0766 60.4727 65.045 59.5061 64.0389C58.5434 63.0329 58.575 61.4351 59.581 60.4684L66.6037 53.7337C67.5821 52.7947 69.1208 52.7947 70.0992 53.7337L77.1218 60.4684C78.1318 61.431 78.1674 63.0289 77.2007 64.0389L77.201 64.0392Z"
                className="fill-wall-600"
              />
            </svg>

            <div className="flex flex-col">
              <p className="font-bold">Enabling Image & Media Hosting</p>
              <p>
                Groups is integrated with S3, see our guide on{" "}
                <Link href="https://operators.urbit.org/manual/os/s3">
                  <a>setting up S3 Storage</a>
                </Link>
              </p>
            </div>
          </div>
        </Section>
        <Section className="flex flex-col space-y-12">
          <h2>Explore Groups</h2>
          {pairedGroups.map((e) => (
            <TwoUp>
              {e.map((group) => (
                <Link href={`/groups/${group.shortcode}`}>
                  <div className="flex space-x-4 items-center cursor-pointer hover:opacity-90">
                    <div
                      className="h-36 w-36 rounded-xl items-center justify-center shrink-0 overflow-hidden"
                      style={{
                        backgroundColor: group?.tile?.startsWith("#")
                          ? group?.tile
                          : "rgba(0,0,0,0)",
                      }}
                    >
                      {!group?.tile?.startsWith("#") && (
                        <img
                          className="items-center h-36 w-36"
                          src={group.tile}
                        />
                      )}
                    </div>
                    <div className="">
                      <p className="text-left font-bold">{group.title}</p>
                      <p className="text-left text-wall-400 font-light">
                        {group.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </TwoUp>
          ))}
          <Link href="/ecosystem?type=groups" passHref>
            <a className="button-lg bg-green-400 text-white w-fit">
              Explore Groups
            </a>
          </Link>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

const pair = (arr) =>
  arr.reduce(function (rows, key, index) {
    return (
      (index % 2 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []);

export async function getStaticProps() {
  const featuredGroups = [
    getPostBySlug(
      "urbit-community",
      ["title", "slug", "shortcode", "description", "tile"],
      "groups/~bitbet-bolbel"
    ),
    getPostBySlug(
      "the-marketplace",
      ["title", "slug", "shortcode", "description", "tile"],
      "groups/~tirrel"
    ),
    getPostBySlug(
      "other-life",
      ["title", "slug", "shortcode", "description", "tile"],
      "groups/~hatryx-lastud"
    ),
  ];
  return { props: { featuredGroups } };
}
