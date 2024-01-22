import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
  Container,
  Main,
  Markdown,
  formatDate,
  generateDisplayDate,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import ErrorPage from "@/pages/404";

export default function GrantProgramPage({
  post,
  markdown,
  search,
  program,
  actionLink,
  actionText,
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }

  const title = program.charAt(0).toUpperCase() + program.slice(1);
  return (
    <Container>
      <Head>
        <title>{title} • Grants • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main className="space-y-5 md:space-y-8" singleColumn>
        <h1 className="h1 text-brite mt-12 md:mt-16">{post.title}</h1>
        <p className="body-md text-gray">
          Last Revision:{" "}
          <span className="text-brite">
            {formatDate(generateDisplayDate(post.date))}
          </span>
        </p>
        <Link className="btn btn-light body-md w-fit" href={actionLink}>
          {actionText}
        </Link>
        <hr className="hr-horizontal border-brite" />
        <section className="markdown layout-narrow">
          <Markdown.render content={JSON.parse(markdown)} />
        </section>
      </Main>
      <Footer />
    </Container>
  );
}
