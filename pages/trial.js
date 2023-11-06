import { useState, useEffect } from 'react';
import Head from "next/head";
import Link from 'next/link';
import Meta from "../components/Meta";
import {
  Container,
  SingleColumn,
  Section,
} from "@urbit/foundation-design-system";
import IntraNav from "../components/IntraNav";
import Header from "../components/Header";
import Footer from "../components/Footer";
import cn from 'classnames';

const postReq = (path, params, method = 'post') => {
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}



export default function Trial(props) {
  const post = {
    title: "Explore the Network",
    description: "Get one day of a complimentary hosted moon: a temporary Urbit ID."
  };

  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('https://api.shore.arvo.network/count', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setCount(data.count);
      });
  }, []);

  const available = count > 0;

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
          <div className="flex flex-col items-center space-y-4 xl:space-y-0 xl:flex-row xl:space-x-4">
            <video className="max-w-md w-full min-w-0" autoPlay muted loop playsInline>
              <source
                src="https://storage.googleapis.com/media.urbit.org/site/explorethenetwork.webm"
                type="video/webm"
              />
              <source
                src="https://storage.googleapis.com/media.urbit.org/site/explorethenetwork.mp4"
                type="video/mp4"
              />
            </video>
            {/* Blurb is flexed to space button and copy */}
            <div className="flex-col flex space-y-4">
              <p>No downloads, no signup.</p>
              <p>Get <span className="font-bold">one day</span> of a complimentary hosted moon: a temporary Urbit ID.</p>
              {/* Button is flexed to space potential "try again later" copy */}
              <div className="xl:space-x-4 space-y-4 xl:space-y-0 self-center xl:self-start w-full flex-col xl:flex-row flex items-center">
                <a className={cn("p-8 button-lg text-white max-w-fit shrink-0", {
                  "bg-green-400": available,
                  "bg-wall-300 cursor-not-allowed": !available,
                })}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (!available) {
                      return
                    }

                    fetch('https://api.shore.arvo.network/enter', {
                      method: 'GET',
                      headers: { 'Content-Type': 'application/json' }
                    })
                      .then(res => {
                        if (!res.ok) {
                          throw 'Error response from shore api.';
                        }
                        return res.json();
                      })
                      .then(data => {
                        postReq(data.url + '/~/login', { password: data.code, redirect: '/' });
                      })
                      .catch(e => setCount(0));
                  }}
                >
                  {available ? 'Launch Moon' : 'No Moons Available'}
                </a>
                {!available && <p>Check back later!</p>}
              </div>
            </div>
          </div>
          <div className="max-w-prose flex flex-col space-y-4">
            <p>Moons are great for checking things out, but some groups may require a planet – a permanent Urbit ID.</p>
            <p>Learn more about <Link href="/getting-started/get-planet"><a>getting a planet</a></Link>.</p>
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
