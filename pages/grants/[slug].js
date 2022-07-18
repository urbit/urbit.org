import { useRouter } from "next/router";
import { getPostBySlug, getAllPosts, formatDate } from "../../lib/lib";
import Head from "next/head";
import Link from "next/link";
import Meta from "../../components/Meta";
import classnames from "classnames";
import ErrorPage from "../404";
import {
  Container,
  Markdown,
  SingleColumn,
  Section,
  IntraNav,
} from "foundation-design-system";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ob from "urbit-ob";
import { DateTime } from "luxon";

export default function Grant({ post, markdown, search }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  const isOpen = !post?.extra?.completed && post?.extra?.assignee === "";
  const canApply = isOpen && post?.extra?.work_request_link;
  const assignee = post?.extra?.assignee;
  const mentor = post.extra.mentor || post.extra.champion;
  const assigneeLink =
    assignee && ob.isValidPatp(assignee) ? (
      <Link href={`/ids/${assignee}`} passHref>
        <a className="text-green-400">{assignee}</a>
      </Link>
    ) : (
      assignee
    );
  const mentorLink =
    mentor && ob.isValidPatp(mentor) ? (
      <Link href={`/ids/${mentor}`} passHref>
        <a className="text-green-400">{mentor}</a>
      </Link>
    ) : (
      mentor
    );

  return (
    <Container>
      <Head>
        <title>{post.title} • Grants • urbit.org</title>
        {Meta(post)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header />
        <Section narrow short>
          <h1>{post.title}</h1>
          {post.extra.assignee ? (
            <div className="type-ui text-wall-500 mt-4">
              Grantee: {assigneeLink}
            </div>
          ) : null}
          {post.extra.mentor ? (
            <div className="type-ui text-wall-500 mt-4">
              Mentor: {mentorLink}
            </div>
          ) : null}
          {post.extra.champion ? (
            <div className="type-ui text-wall-500 mt-4">
              Champion: {mentorLink}
            </div>
          ) : null}
          {post.extra.ship ? (
            <Link href={`/ids/${post.extra.ship}`} passHref>
              <a className="type-sub-bold text-wall-500 font-mono">
                {post.extra.ship}
              </a>
            </Link>
          ) : null}
          <div className="type-ui text-wall-500 mt-4 md:mt-8 lg:mt-10 flex items-center space-x-1">
            {formatDate(DateTime.fromISO(post.date))}
            {post?.extra?.grant_id ? (
              <>
                <p className="ml-1 text-wall-500 type-ui">• ID:</p>
                <p className="font-mono type-ui"> {post.extra.grant_id}</p>
              </>
            ) : null}
          </div>
          <div className="flex items-center flex-wrap mt-4 md:mt-8 lg:mt-10">
            {post.taxonomies.grant_type.map((category) => {
              const className = classnames({
                "bg-blue-400 text-white": category === "Proposal",
                "bg-green-400 text-white": category === "Apprenticeship",
                "bg-yellow-300": category === "Bounty",
              });
              return (
                <div className={`${className} badge-sm mr-1 my-1`}>
                  {category}
                </div>
              );
            })}
            {post.taxonomies.grant_category.map((category) => (
              <div className="bg-wall-500 text-wall-100 badge-sm mr-1 my-1">
                {category}
              </div>
            ))}
          </div>
        </Section>
        <Section narrow className="markdown">
          <Markdown.render content={JSON.parse(markdown)} />
        </Section>
        {canApply && (
          <a
            className="bg-green-400 text-white button-lg"
            href={post?.extra?.work_request_link}
            target="_blank"
          >
            Apply for this grant
          </a>
        )}
      </SingleColumn>
      <Footer />
    </Container>
  );
}

//
export async function getStaticProps({ params }) {
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra", "taxonomies"],
    "grants"
  );

  const markdown = JSON.stringify(Markdown.parse({ post }));
  return {
    props: { post, markdown },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "date"], "grants", "date");

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
