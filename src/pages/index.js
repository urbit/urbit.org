import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Main,
  Section,
  FatBlock,
  getAllPosts,
} from "@urbit/fdn-design-system";

import Carousel from "@/components/Carousel";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import IntraNav from "@/components/IntraNav";
import Meta from "@/components/Meta";
import NewsletterSignup from "@/components/NewsletterSignup";
import Org from "@/components/ecosystem/Org";

const partners = [
  {
    link: "https://near.org/",
    img: "https://storage.googleapis.com/media.urbit.org/assembly/near-logo.png",
  },
  {
    link: "https://www.serotonin.co/",
    img: "https://storage.googleapis.com/media.urbit.org/site/landing/serotonin.svg",
  },
  {
    link: "https://othermeans.us/",
    img: "https://storage.googleapis.com/media.urbit.org/site/landing/om_logo_2024-1.svg",
  },
  {
    link: "https://www.gigaver.se/",
    img: "https://storage.googleapis.com/media.urbit.org/site/landing/giga-black.svg",
  },
];

function CTAs({ className, links }) {
  return (
    <div className={"flex flex-wrap flex-row gap-2 " + className}>
      {links.map((link) => (
        <Link
          className="btn bg-primary hover:bg-secondary text-surface"
          href={link.url}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function Home({ events }) {
  const post = {
    title: "Urbit",
    description: "Leave the internet behind.",
  };

  return (
    <Container>
      <Head>
        <title>urbit.org</title>
        {Meta(post, false, true)}
      </Head>
      <IntraNav />
      <Main className="text-primary body-lg" singleColumn>
        <h1 className="h0 heading mt-8">:: Leave the internet behind</h1>
        <div className="block md:hidden">
        <video
            className="img-dark"
            loop
            autoPlay
            muted
            playsInline
            disablePictureInPicture
          >
            <source
              src="https://storage.googleapis.com/media.urbit.org/site/landing/header-dark-mobile1.mp4"
              type="video/mp4"
            />
          </video>
          <video
            className="img-light"
            loop
            autoPlay
            muted
            playsInline
            disablePictureInPicture
          >
            <source
              src="https://storage.googleapis.com/media.urbit.org/site/landing/header-light-mobile1.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="hidden md:block">
          <video
            className="img-dark"
            loop
            autoPlay
            muted
            playsInline
            disablePictureInPicture
          >
            <source
              src="https://storage.googleapis.com/media.urbit.org/site/landing/header-dark-desktop1.mp4"
              type="video/mp4"
            />
          </video>

          <video
            className="img-light"
            loop
            autoPlay
            muted
            playsInline
            disablePictureInPicture
          >
            <source
              src="https://storage.googleapis.com/media.urbit.org/site/landing/header-light-desktop1.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <Section divider={"border-primary"}>
          <h2 className="h1">
            Urbit is a new computing paradigm that provides complete ownership
            of your digital world.
          </h2>
          <div className="body-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col justify-between bg-container rounded-lg p-4">
              <h3 className="text-on-container h-[6.5em] overflow-hidden">
                Leave the centralized internet behind. Run applications the
                sovereign way.
              </h3>
              <Link
                className="btn bg-on-container text-inverse-on-container hover:bg-on-container-variant w-min"
                href="/get-started"
              >
                Join the network
              </Link>
            </div>
            <div className="flex flex-col justify-between bg-container rounded-lg p-4">
              <h3 className="text-on-container h-[6.5em] overflow-hidden">
                Make your application sovereign with personal servers for you
                and your community.
              </h3>
              <Link
                className="btn bg-on-container text-inverse-on-container hover:bg-on-container-variant w-min"
                href="https://docs.urbit.org/"
              >
                Build on Urbit
              </Link>
            </div>
          </div>
        </Section>

        <Section divider={"border-primary"}>
          <h2 className="h1">Own your compute in the ways that matter.</h2>
          <FatBlock className="body-lg border border-primary rounded-lg">
            <table className="w-full table-fixed">
              <tbody>
                <tr className="border-b">
                  <td className="align-top p-4 border-r">
                    <p>Beyond Data Ownership </p>
                    <p className="text-secondary">
                      Own your data and the software that leverages it
                    </p>
                  </td>
                  <td className="align-top p-4">
                    <p>Persistent Identity </p>
                    <p className="text-secondary">
                      User-controlled public-key infrastructure
                    </p>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="align-top p-4 border-r">
                    <p>No Platform Risk </p>
                    <p className="text-secondary">
                      You are the platform, no one can take it from you
                    </p>
                  </td>
                  <td className="align-top p-4">
                    <p>Network Resilience </p>
                    <p className="text-secondary">
                      Distributed servers avoid single points of failure
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="align-top p-4 border-r">
                    <p>Private by Default </p>
                    <p className="text-secondary">
                      Personal computing means private computing
                    </p>
                  </td>
                  <td className="align-top p-4">
                    <p className="flex items-center gap-[0.25em]">
                      Designed for Security
                      <span
                        className="inline-block aspect-square h-[1em] bg-primary"
                        style={{
                          WebkitMaskImage: "url(/images/lock.svg)",
                          WebkitMaskSize: "100% 100%",
                          WebkitMaskRepeat: "no-repeat",
                          maskImage: "url(/images/lock.svg)",
                          maskSize: "100% 100%",
                          maskRepeat: "no-repeat",
                        }}
                      />
                    </p>
                    <p className="text-secondary">
                      A new stack that's secure at the lowest levels
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </FatBlock>
        </Section>

        <Section divider={"border-primary"}>
          <h2 className="h1">Come meet us.</h2>
          <Carousel className="h-60 xs:h-72 md:h-96">
            {events.slice(0, 6).map((props) => (
              <EventCard {...props} key={props.slug} />
            ))}
          </Carousel>
          <Link
            className="btn bg-primary hover:bg-secondary text-surface body-lg w-min"
            href="/events"
          >
            View Events
          </Link>
        </Section>

        <Section divider={"border-primary"}>
          <h2 className="h1">A fork in the road for computing.</h2>
          <div
            className="w-full aspect-[1195/646] !my-16 md:!my-20 lg:!my-24 bg-primary"
            style={{
              WebkitMaskImage:
                "url(https://media.urbit.org/site/landing/compute-paradigm.svg)",
              WebkitMaskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskImage:
                "url(https://media.urbit.org/site/landing/compute-paradigm.svg)",
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
            }}
          />
          <p className="body-lg">
            Urbit is a Layer Zero for truly personal, networked computation.
            It's entirely <strong>self-contained</strong>,{" "}
            <strong>private</strong>, <strong>cryptographically owned</strong>,
            and <strong>designed to last forever</strong>. With Urbit,
            user-owned networks are finally possible.
          </p>
          <Link
            className="btn bg-primary hover:bg-secondary text-surface"
            href="/overview"
          >
            Learn More
          </Link>
        </Section>

        <Section divider={"border-primary"}>
          <h2 className="h1">
            Explore one of the highest quality developer ecosystems.
          </h2>
          <div className="body-lg grid grid-cols-2 md:grid-cols-4 gap-4">
            <Org
              title="Tlon"
              description="Building a next-gen communications suite"
              image="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/tlon-b.svg"
              slug="tlon"
              extended
            />
            <Org
              title="Native Planet"
              description="Beautiful, custom Urbit-centric hardware"
              image="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/native-planet-b.svg"
              slug="nativeplanet"
              extended
            />
            <Org
              title="Zorp"
              description="Civilization-grade computational infrastructure using a novel zkVM"
              image="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/zorp-b.svg"
              slug="zorp"
              extended
            />
            <Org
              title="Red Horizon"
              description="Urbit hosting as a service, for individuals and developers"
              image="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/red-horizon-b.svg"
              slug="red-horizon"
              extended
            />
          </div>
        </Section>

        <Section className="overflow-hidden" divider={"border-primary"}>
          <h2 className="h2">Who we work with.</h2>
          <div className="flex flex-col items-center -layout-mx">
            <div className="flex items-center justify-center flex-wrap w-full">
              {partners.map((partner) => {
                const iconStyle = {
                  WebkitMaskImage: `url(${partner.img})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  maskImage: `url(${partner.img})`,
                  maskSize: "contain",
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                };

                return (
                  <div
                    className="text-center w-1/2 xs:w-1/3 sm:w-1/4 md:w-1/5 items-center p-5 lg:p-10 xl:p-12"
                    key={partner.link}
                  >
                    <Link
                      className="inline-block w-full h-20 xs:h-24 sm:h-28 md:h-32 bg-primary"
                      href={partner.link}
                      style={iconStyle}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        <Section className="body-lg" divider={"border-primary"} narrow loose>
          <Section>
            <h2 className="h2">Urbit Newsletter</h2>
            <NewsletterSignup />
          </Section>

          <Section>
            <h2 className="h2">Join us on Urbit</h2>
            <Link
              className="btn bg-primary hover:bg-secondary text-surface"
              href="https://tlon.network/lure/~halbex-palheb/uf-public"
            >
              UF Public
            </Link>
          </Section>

          <Section>
            <h2 className="h2">Follow</h2>
            <CTAs
              links={[
                { label: "X", url: "https://twitter.com/urbit" },
                { label: "GitHub", url: "https://github.com/urbit" },
                {
                  label: "YouTube",
                  url: "https://www.youtube.com/channel/UCNYIS9_SktINCC9yqO4CFZw",
                },
                { label: "Instagram", url: "https://instagram.com/urbit" },
              ]}
            />
          </Section>

          <Section>
            <h2 className="h2">Email</h2>
            <p>
              <Link
                className="hover:text-secondary"
                href="mailto: support@urbit.org"
              >
                support@urbit.org
              </Link>
              <br />
              <Link
                className="hover:text-secondary"
                href="mailto: grants@urbit.org"
              >
                grants@urbit.org
              </Link>
            </p>
          </Section>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  let events = getAllPosts(
    [
      "title",
      "description",
      "location",
      "starts",
      "ends",
      "timezone",
      "guests",
      "hosts",
      "image",
      "darken_image",
      "dark",
      "registration_url",
      "pinned",
      "slug",
    ],
    "events",
    "starts",
  );

  events.reverse();

  return {
    props: { events },
  };
}
