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
