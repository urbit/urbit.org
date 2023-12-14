import React from "react";
import Head from "next/head";
import { Container, Main } from "@urbit/fdn-design-system";
import IntraNav from "../components/IntraNav";
import Footer from "../components/Footer";
// import Meta from "../components/Meta";

export default function NotFound(props) {
  const post = {
    title: "404",
  };
  return (
    <Container>
      <Head>
        <title>404 • docs.urbit.org</title>
        {/* {Meta(post)} */}
      </Head>
      <IntraNav />
      <Main singleColumn>
        <h1 className="h0 text-brite mt-4 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
          404
        </h1>
        <p className="text-brite text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          It looks like nothing is here.
        </p>
      </Main>
      <Footer />
    </Container>
  );
}
