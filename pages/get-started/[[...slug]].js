import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  Container,
  Section,
  SingleColumn,
  IntraNav,
  TwoUp,
  getPostBySlug,
} from "@urbit/foundation-design-system";
import Meta from "../../components/Meta";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function GettingStarted({ search }) {
  const post = {
    title: "Getting Started",
    description:
      "Get started with Urbit.",
    image:
      "",
  };

  return (
    <Container>
      <Head>
        <title>Getting Started</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section className="pb-24">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-left">Get Started</h1>
          </div>

          <div className="pt-16 flex flex-row space-x-8">
            <div className="text-lg font-bold text-left border-b-2 border-wall-200">
              Running Urbit
            </div>
            <div className="text-lg text-wall-400 text-left">
              <Link href="/getting-around">
                Getting Around
              </Link>
            </div>
          </div>

          <div className="pt-24 grid sm:grid-cols-3 grid-flow-row gap-8">
            <div className="space-y-2">
              <p className="font-bold text-lg">Trial Hosting</p>
              <p className="text-sm">Check out the network with 24 hours of complimentary hosting with a temporary Urbit ID.</p>
              <p className="text-sm"><Link href="/trial"><a className="text-green-400">Begin hosting trial -&gt;</a></Link></p>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-lg">Command line</p>
              <p className="text-sm">Run Urbit up locally or in the cloud by installing and configuring the runtime.</p>
              <p className="text-sm"><Link href="/get-started/cli"><a className="text-green-400">View setup guide -&gt;</a></Link></p>
            </div>

            <div className="space-y-2">
              <p className="font-bold text-lg">Hosted urbit</p>
              <p className="text-sm">Subscribe to a hosting provider for streamlined setup, technical support, and an urbit that’s accessible wherever you go.</p>
              <p className="text-sm"><Link href="/get-started/hosted"><a className="text-green-400">View providers -&gt;</a></Link></p>
            </div>

          </div>

        </Section>

      </SingleColumn>
      <Footer />
    </Container>
  );
}
