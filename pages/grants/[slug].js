import { useRouter } from "next/router";
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
  getPostBySlug,
  getPage,
  formatDate,
} from "@urbit/foundation-design-system";
import IntraNav from "../../components/IntraNav";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MetadataBlock from "../../components/ecosystem/MetadataBlock";
import ResourceCard from "../../components/gateway/ResourceCard";
import JoinGroup from "../../components/JoinGroup";
import ob from "urbit-ob";
import { DateTime } from "luxon";
import fs from 'fs';
import path, { join } from 'path';
import { getGrantYear } from "../../lib/lib";

export default function Grant({ post, markdown, match, search }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage />;
  }
  const isOpen = !post?.extra?.completed && post?.extra?.assignee?.[0] === "";
  const canApply = isOpen && post?.extra?.work_request_link;
  const assignee = post?.extra?.assignee;
  const mentor = post.extra.mentor || post.extra.champion;
  const assigneeLink =
        assignee &&
        assignee.map((each, index) => {
          return ob.isValidPatp(each) ? (
            <>
              {index ? ", " : ""}
              <Link href={`/ids/${each}`} passHref>
                <a className="text-green-400">{each}</a>
              </Link>
            </>
          ) : (
            <>
              {index ? ", " : ""}
              {each}
            </>
          );
        });
  const mentorLink =
        mentor &&
        mentor.map((each, index) => {
          return ob.isValidPatp(each) ? (
            <>
              {index ? ", " : ""}
              <Link href={`/ids/${each}`} passHref>
                <a className="text-green-400">{each}</a>
              </Link>
            </>
          ) : (
            <>
              {index ? ", " : ""}
              {each}
            </>
          );
        });

  let status = "";
  if (isOpen) {
    status = "Open"
  } else if (post?.extra?.completed) {
    status = "Completed"
  } else if (post?.extra?.canceled) {
    status = "Canceled"
  } else {
    status = "In Progress"
  }
  const statusBadge = <div className={
    classnames("badge-sm mr-1 my-1", {
      "bg-red": status === "Canceled",
      "bg-green-400 text-white": status === "Completed" || status === "Open",
      "bg-wall-300": status === "In Progress",
    })}>
                         {status}
                       </div>;

  let deliverable = null;
  if (post.extra.deliverable) {
    if (match) {
      deliverable = <ResourceCard
                         title={match.data.title}
                         image={match.data.image}
                         color={match.data.bgColor || "#000000"}
                         description={match.data?.description || ""}
                         type="application"
                         shortcode={post.extra.deliverable}
                         full
/>
    }
    else if (post.extra.deliverable.startsWith("~")) {
      deliverable = <JoinGroup emphasize groupName={post.extra.deliverable} />
    } else {
      deliverable = <a className="font-medium text-green-400" href={post.extra.deliverable}>{post.extra.deliverable}</a>
    }
  }

  const metaPost = Object.assign({}, post);
  metaPost.title = `${post.title} - Grant`;

  const isRFP = post.taxonomies.grant_type.filter((category) => {
    return category === "RFP";
  }).length > 0;

  const hasChampion = post.extra.champion && post.extra.champion[0] !== "";
  const hasAssignee = post.extra.assignee && post.extra.assignee[0] !== "";

  return (
    <Container>
      <Head>
        <title>{post.title} - Grant</title>
        {Meta(metaPost)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section narrow short>
          <h1>{post.title}</h1>
          <div className="flex items-center flex-wrap my-4">
            {statusBadge}
            {post.taxonomies.grant_type.map((category) => {
              const className = classnames({
                "bg-purple-400 text-white": category === "RFP",
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
          <div className="flex flex-wrap justify-between">
            {post?.extra?.grant_id ? (
              <>
                <MetadataBlock
                  title="ID"
                  content={post.extra.grant_id}
                />
              </>
            ) : null}
            <MetadataBlock
              title="Date"
              content={formatDate(DateTime.fromISO(post.date))}
            />
            {post.extra.mentor ? (
              <MetadataBlock
                title="Mentor"
                content={mentorLink}
              />
            ) : null}
            {hasChampion ? (
              <MetadataBlock
                title="Champion"
                content={mentorLink}
              />
            ) : null}
            {hasAssignee ? (
              <MetadataBlock
                title="Grantee(s)"
                content={assigneeLink}
              />
            ) : null}
          </div>
          {post?.extra?.link?.startsWith("~") && <div className="flex flex-col my-4 space-y-2">
   <p className="text-wall-400 font-semibold">Group</p>
   <JoinGroup emphasize groupName={post.extra.link} />
 </div>}
          {deliverable && <div className="flex flex-col my-4 space-y-2">
     <p className="text-wall-400 font-semibold">Deliverable</p>
     {deliverable}
   </div>}
        </Section>
        <Section narrow className="markdown">
          <Markdown.render content={JSON.parse(markdown)} />
        </Section>
        {isRFP && (
          <a
            className="bg-green-400 text-white button-lg"
            href="/grants/rfps"
            target="_blank"
          >
            Learn More
          </a>
        )}
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

export async function getStaticProps({ params }) {
  // Gets post in any year folder sharing the slug name in the param
  const dir = getGrantYear(params.slug);
  const post = getPostBySlug(
    params.slug,
    ["title", "slug", "date", "description", "content", "extra", "taxonomies"],
    `grants/${dir.name}`
  )

  const markdown = JSON.stringify(Markdown.parse({ post }));

  // Matches deliverable to page
  let match = null;
  if (post?.extra?.deliverable?.startsWith("~")) {
    const ship = post.extra.deliverable.split("/")[0];
    const application = post.extra.deliverable.split("/")[1];
    const fileExists = fs.existsSync(path.join(process.cwd(), "content/applications", ship, `${application}.md`));
    match = fileExists ? getPage(
      join(
        process.cwd(),
        "content/applications",
        post.extra.deliverable
      )
    ) : null
  }
  return {
    props: { post, markdown, match },
  };
}

export async function getStaticPaths() {
  // Flatten all year subfolders into a flat array of slugs
  const basePath = join(process.cwd(), 'content/grants')
  const years = fs.readdirSync(basePath, { 'withFileTypes': true });
  const posts = years.filter((year) => year.isDirectory()).map((year) => {
    const yearDir = fs.readdirSync(join(basePath, year.name), { 'withFileTypes': true });
    return yearDir.filter((entry) => entry.isFile()).map((entry) => entry.name.replace(/\.md$/, ""))
  }).flat()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post,
        },
      };
    }),
    fallback: false,
  };
}
