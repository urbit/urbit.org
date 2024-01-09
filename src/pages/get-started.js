import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Main, Section, FatBlock } from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import PostCard from "@/components/PostCard";

const hosting = [
  {
    title: "Red Horizon",
    description:
      "Blog post card: Square image full bleed to top, followed by copy snippet, Gray on Brite, 25px on 30px, Urbit Sans SemiBold (standard body copy properties).",
    image: "https://storage.googleapis.com/media.urbit.org/blog/skybanner.jpg",
    label: "Join Red Horizon Hosting",
    href: "https://redhorizon.com/",
  },
  {
    title: "Tlon",
    description:
      "Blog post card: Square image full bleed to top, followed by copy snippet, Gray on Brite, 25px on 30px, Urbit Sans SemiBold (standard body copy properties).",
    image: "https://storage.googleapis.com/media.urbit.org/blog/b52.jpg",
    label: "Join Tlon Hosting",
    href: "https://tlon.io/",
  },
  {
    title: "Holium",
    description:
      "Some cards could feature solid colors, like this, which we will also be using for icon-based cards featured in guide pages. Another feature here is truncated text, eg this.",
    label: "Join Holium Hosting",
    href: "https://www.holium.com/",
  },
];

export default function GetStarted({}) {
  const post = {
    title: "Getting Started",
    description: "Links to get started with Urbit.",
    image:
      "https://storage.googleapis.com/media.urbit.org/site/opengraph/urbit.png",
  };

  return (
    <Container>
      <Head>
        <title>{`${post.title} • Urbit`}</title>
        {Meta(post, false, true)}
      </Head>
      <IntraNav ourSite="https://urbit.org" />
      <Main
        className="text-brite border-brite space-y-5 md:space-y-8"
        singleColumn
      >
        <section>
          <h1 className="h1 mt-12 mb-8 md:mt-16 md:mb-16 lg:mb-20">
            Getting started
          </h1>
          <p className="h1">
            Urbit is a <strong>new kind of computer</strong> that you can own
            completely in ways that matter: <strong>networking</strong>,{" "}
            <strong>identity</strong>, & <strong>data</strong>.
          </p>
        </section>
        <hr className="hr-horizontal border-brite" />
        <div>
          <h2 className="h2 mb-[0.25em]">Hosting</h2>
          <p className="body-md">Get a hosted Urbit ship in minutes</p>
        </div>
        <FatBlock className="hidden xs:flex space-x-1 lg:space-x-6 xl:space-x-8">
          {hosting.map((props) => (
            <PostCard {...props} />
          ))}
        </FatBlock>
        <FatBlock className="flex xs:hidden flex-col space-y-1 lg:space-y-6 xl:space-y-8">
          {hosting.map((props) => (
            <PostCard {...props} />
          ))}
        </FatBlock>
        <hr className="hr-horizontal border-brite" />
        <div>
          <h2 className="h2 mb-[0.25em]">Self-hosting at home</h2>
          <p className="body-md">Running your Urbit is easier than ever</p>
        </div>
        <FatBlock className="flex bg-gray rounded-lg p-4">
          <img
            className="aspect-square w-1/3 object-cover mr-4 xs:mr-8 md:mr-16"
            alt=""
            src="https://s3-alpha-sig.figma.com/img/d233/6719/90cc0290296014c2898a31013706c329?Expires=1705881600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MU4ixgomkq8CurHpdVnNtmMHITXhiUtU1xAAsVnAhW-cD1Byqq7HgVoC6f8FC3~kEFl6J7MJ86yck1R-iLdzJJcwijcLp6u5-a8RUnKbaJwpa8KobafInX3cneaeM0mdN3Dpx1F8tpmOqX0xvhoHVMYvzRFtcJzlqADP~2vDv9oh9MO2KNLeYZHS~22ylINIBdzNo2g1hMmDMoD6X4AjpafgmNnXcd~C6a57jz-uTAE3ANJ0f9IgGUa80IO7IDpXfzimqc6TozzK54Jb8CDD5o5zRBdpYiJq89UL-atcycn5CxXpHzXmWeAqckZsDKaNY6gLvXIr8d0AFqc262JfYA__"
          />
          <div className="flex flex-col justify-between">
            <h3 className="hidden xs:block h1">Native Planet</h3>
            <h3 className="xs:hidden h2">Native Planet</h3>
            <div className="body-md">
              <p className="mb-3.5">
                Native Planet copy goes here, about how easy it is to set up
                your own Native Planet
              </p>
              <Link
                className="btn btn-light"
                href="https://www.nativeplanet.io/"
              >
                Find out more
              </Link>
            </div>
          </div>
        </FatBlock>
        <hr className="hr-horizontal border-brite" />
        <section className="space-y-5">
          <h2 className="h1">Power user guides</h2>
          <p className="body-lg">
            Whether you want to set up your Urbit yourself in the CLI, or find
            out more about how to host it on your own cloud instance.
          </p>
          <p className="body-lg">
            Command Line install
            <Link
              className="btn btn-light ml-3.5"
              href="https://docs.urbit.org/manual/getting-started/self-hosted/cli"
            >
              CLI guide
            </Link>
          </p>
          <p className="body-lg">
            Self-hosting
            <Link
              className="btn btn-light ml-3.5"
              href="https://docs.urbit.org/manual/getting-started/self-hosted/cloud-hosting"
            >
              Cloud hosting guide
            </Link>
          </p>
          <p className="body-lg">
            Using Urbit
            <Link
              className="btn btn-light ml-3.5"
              href="https://docs.urbit.org/manual/getting-started/additional/getting-around"
            >
              Getting around guide
            </Link>
          </p>
        </section>
      </Main>
      <Footer />
    </Container>
  );
}
