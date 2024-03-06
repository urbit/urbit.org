import React from "react";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import { Container, Main, Section, FatBlock } from "@urbit/fdn-design-system";
import IntraNav from "../components/IntraNav";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import NewsletterSignup from "../components/NewsletterSignup";
import Org from "../components/ecosystem/Org";

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

export default function Home({}) {
  const post = {
    title: "Urbit",
    description: "Welcome to the sovereign internet.",
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
          <img
            className="img-dark"
            src="https://storage.googleapis.com/media.urbit.org/site/landing/urbit-header-mobile-d.png"
          />
          <img
            className="img-light"
            src="https://storage.googleapis.com/media.urbit.org/site/landing/urbit-header-mobile-l.png"
          />
        </div>
        <div className="hidden md:block">
          <img
            className="img-dark"
            src="https://storage.googleapis.com/media.urbit.org/site/landing/urbit-header-d.png"
          />
          <img
            className="img-light"
            src="https://storage.googleapis.com/media.urbit.org/site/landing/urbit-header-l.png"
          />
        </div>

        <Section divider={"border-primary"}>
          <h1 className="h1">
            Urbit is a new computing paradigm that provides complete ownership
            of your digital world.
          </h1>
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
          <p className="h1">Own your compute in the ways that matter. </p>
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
          <p className="h1">
            Explore one of the highest quality developer ecosystems.
          </p>
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

        <Section divider={"border-primary"}>
          <p className="h1">A fork in the road for computing.</p>
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
          <p className="h1">
            Urbit is a Layer Zero for truly personal, networked computation. It's entirely <strong>self-contained</strong>, <strong>private</strong>, <strong>cryptographically owned</strong>, and <strong>designed to last forever</strong>. With Urbit, user-owned networks are finally possible.
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
