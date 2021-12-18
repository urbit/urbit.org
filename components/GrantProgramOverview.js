import { useRouter } from "next/router";
import { formatDate } from "../lib/lib";
import Link from "next/link";
import Head from "next/head";
import Meta from "../components/Meta";
import ErrorPage from "../pages/404";
import Container from "./Container";
import Header from "./Header";
import Footer from "./Footer";
import SingleColumn from "./SingleColumn";
import Section from "./Section";
import { decode } from "html-entities";
import { DateTime } from "luxon";

export default function GrantProgramOverview({
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
      <SingleColumn>
        <Header search={search} />
        <Section narrow short>
          <h1>{post.title}</h1>
          <div className="type-ui text-wall-500 mt-4 md:mt-8 lg:mt-10">
            Last Revision: {formatDate(DateTime.fromISO(post.date))}
          </div>
          <Link href={actionLink}>
            <button className="button-sm bg-green-400 text-white mt-8">
              {actionText}
            </button>
          </Link>
        </Section>
        <Section narrow short className="markdown">
          <article
            dangerouslySetInnerHTML={{ __html: decode(markdown) }}
          ></article>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
