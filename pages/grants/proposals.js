import { getPostBySlug } from "../../lib/lib";
import BasicPage from "../../components/BasicPage";
import Markdown from "../../components/Markdown";
// new
import Head from "next/head";
import { TableOfContents } from "../../components/TableOfContents";
import Meta from "../../components/Meta";
import Link from "next/link";
import { useState } from "react";
import classnames from "classnames";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SingleColumn from "../../components/SingleColumn";
import Section from "../../components/Section";
import PostPreview from "../../components/PostPreview";
import GrantPreview from "../../components/GrantPreview";

export function Post({ post, markdown, search }) {
  return <BasicPage post={post} markdown={markdown} search={search} />;
}

export default function Post2({ search }) {
  return (
    <Container>
      <Head>
        <title>Grants • Submit a Proposal</title>
      </Head>
      <SingleColumn>
        <Header search={search} />
        <Section narrow>
          <h1>Submit a Proposal</h1>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  // const post = getPostBySlug("/proposals", ["title", "slug", "content"], "/");

  const markdown = await Markdown({ post });

  return {
    props: { post, markdown },
  };
}
