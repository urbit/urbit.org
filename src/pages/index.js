import React from "react";
import Head from "next/head";
import {
  Container,
  Main,
  Section,
} from "@urbit/fdn-design-system";
import IntraNav from "../components/IntraNav";
import Footer from "../components/Footer";
import Meta from "../components/Meta";

export default function Home({ search }) {
  const post = {
    title: "Urbit",
    description: "A clean-slate OS and network for the 21st century.",
    image:
      "https://storage.googleapis.com/media.urbit.org/site/opengraph/urbit.png",
  };
  return (
    <Container>
      <Head>
        <title>Urbit</title>
        {Meta(post, false, true)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <Main singleColumn>
        <h1 className="h0 text-brite mt-8 mb-64">Leave the internet behind</h1>
        <Section divider>
          <h1 className="h1 text-brite mb-24">
            Urbit is a new kind of computer that you can own completely in ways
            that matter: networking, identity, & data.
          </h1>
        </Section>
      </Main>
      <Footer />
    </Container>
  );
}
