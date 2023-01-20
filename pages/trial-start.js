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
    title: "Start Your Trial",
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
          <div className="flex flex-col sm:flex-row space-x-8">

            {/* Blurb is flexed to space button and copy */}
            <div className="flex-col flex space-y-4">
              {/* Button is flexed to space potential "try again later" copy */}
              <div className="xl:space-x-4 space-y-4 xl:space-y-0 self-center xl:self-start w-full flex-col xl:flex-row flex items-left">
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
                  {available ? 'Launch Landscape' : 'No Temporary Urbit IDs Available'}
                </a>
                {!available && <p>Check back later!</p>}
              </div>
            </div>
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
