import { useState, useEffect } from 'react';
import Head from "next/head";
import Link from 'next/link';
import Meta from "../components/Meta";
import {
  Container,
  SingleColumn,
  Section,
  IntraNav,
} from "@urbit/foundation-design-system";
import Header from "../components/Header";
import Footer from "../components/Footer";
import cn from 'classnames';


export default function Trial(props) {
  const post = {
    title: "Trial Hosting",
    description: "Get one day of a complimentary hosted moon: a temporary Urbit ID."
  };


  return (
    <Container>
      <Head>
        <title>{post.title} • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={props.search} />
      <SingleColumn>
        <Header />
        <Section className="space-y-12">
          <h1>{post.title}</h1>
          {/* Flex between image and blurb, collapse to col on mobile */}
          <div className="flex flex-col sm:flex-row sm:space-x-8 items-center">
            <div>
              <img className="w-96" src="https://storage.googleapis.com/media.urbit.org/site/getting-started/trial-moon-preview.png"/>
            </div>

            {/* Blurb is flexed to space button and copy */}
            <div className="flex-col flex space-y-4 align-center">
              <p>Get one day of a complimentary temporary Urbit ID.</p>
              <p>Please enter your email address to proceed.</p>

              <form
                action="https://urbit.us11.list-manage.com/subscribe/post?u=972a03db9e0c6c25bb58de8c8&amp;id=b124529a85&amp;f_id=00f711e1f0"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate form max-w-screen-sm"
                target="_blank"
                noValidate
              >
                <div className="input-group pt-6" id="mc_embed_signup_scroll">
                  <div className="mc-field-group w-full relative">
                    <input
                      className={`appearance-none outline-none text-wall-500 bg-white black ${
                        props.color || "border-wall-600"
                      } border-2 px-3 w-full mb-2 h-12 rounded-xl`}
                      type="email"
                      name="EMAIL"
                      id="mce-EMAIL"
                      placeholder="your@email.com"
                    />
                    <div className="flex h-12 items-center justify-center absolute top-0 right-6">
                      <button
                        id="mc-embedded-subscribe"
                        className="text-green-400 bg-transparent"
                        type="submit"
                        name="subscribe"
                      >
                        {/* onClick={() => _paq.push(['trackEvent', 'Trial Hosting', 'Subscribe'])}> */}
                        Next -&gt;
                      </button>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}


