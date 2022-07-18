import { useRouter } from "next/router";
import { formatDate } from "../lib/lib";
import Link from "next/link";
import Head from "next/head";
import Meta from "../components/Meta";
import ErrorPage from "../pages/404";
import {
  Container,
  Section,
  SingleColumn,
  Markdown,
  IntraNav,
} from "foundation-design-system";
import Header from "./Header";
import Footer from "./Footer";
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
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section narrow short>
          <h1>{post.title}</h1>
          <div className="type-ui text-wall-500 mt-4 md:mt-8 lg:mt-10">
            Last Revision: {formatDate(DateTime.fromISO(post.date))}
          </div>
          <Link href={actionLink} passHref>
            <a className="button-sm bg-green-400 text-white mt-8 max-w-fit">
              {actionText}
            </a>
          </Link>
        </Section>
        <Section narrow short className="markdown">
          <Markdown.render content={JSON.parse(markdown)} />
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
