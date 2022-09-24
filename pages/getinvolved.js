import Head from "next/head";
import Meta from "../components/Meta";
import Link from "next/link";
import {
  Container,
  SingleColumn,
  Section,
  IntraNav,
  getAllPosts,
  formatDate,
  generateDisplayDate,
} from "@urbit/foundation-design-system";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BackgroundImage from "../components/BackgroundImage";
import { contact } from "../lib/constants";

export default function Blog({ posts, search }) {
  const post = {
    title: "Getting Started With Urbit",
    description:
      "Links to get started with Urbit.",
  };
  return (
    <Container>
      <Head>
        <title>Blog • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section>
          <h1 className="pb-16">Getting Started With Urbit</h1>
          <div className="">

          <p className="text-md">
	         • <Link href="https://developers.urbit.org/courses">Take a course on Hoon</Link>
          </p>
          <p className="text-md">
            • <Link href="/grants/proposals">Submit a grant proposal</Link>
          </p>
          <p className="text-md">
            • <Link href="https://urbit.org/grants?type=Bounty#view-grants">Pick up an open bounty</Link>
          </p>
          <p className="text-md">
            • <Link href="https://developers.urbit.org/guides/quickstart/intro">Build an app</Link>
          </p>

          </div>
        </Section>

      </SingleColumn>
      <Footer />
    </Container>
  );
}

