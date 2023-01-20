import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  Container,
  Section,
  SingleColumn,
  IntraNav,
  TwoUp
} from "@urbit/foundation-design-system";
import Meta from "../components/Meta";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function GettingStarted({ search }) {
  const post = {
    title: "Hosted urbit",
    description:
      "Run urbit on a cloud hosting provider."
  };

  return (
    <Container>
      <Head>
        <title>Hosted Urbit</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section className="pb-24">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-left">Hosted urbit</h1>
          </div>
          <p className="pt-12">Hosting providers can sell you a planet and run your urbit for you.<br/>   
Some will let you bring your own planet or pier (your urbit data) with you as well.</p>
<p className="pt-4">We recommend the following hosting providers:</p>

          <div className="pt-24 grid sm:grid-cols-3 grid-flow-row gap-8">
            <div className="space-y-2">
              <img className="w-[30px]" src="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/tlon-hosting.png"/>
              <p className="font-bold text-lg">Tlon Hosting</p>
              <p className="text-sm">“There’s no one way to run your Urbit.  But there’s a simpler way.”</p>
              <p className="text-sm"><Link href="https://tlon.io/hosting"><a className="text-green-400">Visit Tlon Hosting↗</a></Link></p>
            </div>

            <div className="space-y-2">
              <img className="w-[30px]" src="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/thirdearth.png"/>
              <p className="font-bold text-lg">ThirdEarth</p>
              <p className="text-sm">“Hosting the future starts here.”</p>
              <p className="text-sm"><Link href="https://third.earth"><a className="text-green-400">Visit ThirdEarth↗</a></Link></p>
            </div>

            <div className="space-y-2">
              <img className="w-[30px]" src="https://storage.googleapis.com/media.urbit.org/site/ecosystem/organizations/planetone.png"/>
              <p className="font-bold text-lg">Planet One</p>
              <p className="text-sm">“Urbit hosting with everything you want.”</p>
              <p className="text-sm"><Link href="https://planet.one"><a className="text-green-400">Visit Planet One↗</a></Link></p>
            </div>

          </div>

        </Section>

      </SingleColumn>
      <Footer />
    </Container>
  );
}
