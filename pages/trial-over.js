import Head from "next/head";
import Link from "next/link";
import Meta from "../components/Meta";
import {
  Container,
  SingleColumn,
  Section,
  IntraNav,
} from "@urbit/foundation-design-system";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TrialOver(props) {
  const post = {
    title: "Trial Over",
  };


  return (
    <Container>
      <Head>
        <title>Trial Over • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={props.search} />
      <div className="h-full w-full grow flex items-center justify-center flex-col px-8 md:px-0">
        <div className="w-fit">
          <h2>Your one day moon trial has concluded.</h2>
          <p className="my-12 max-w-prose">To keep using Urbit, we recommend getting a planet and setting up Urbit yourself or using a hosting provider.
            <Link href="/getting-started"><a className="button-lg bg-green-400 text-white max-w-fit my-12">Get Started</a></Link></p>
        </div>
      </div>
    </Container>
  );
}
