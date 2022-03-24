import Head from "next/head";
import Link from "next/link";

import Meta from "../../components/Meta";
import Container from "../../components/Container";
import { buildPageTree, getAllEvents } from "../../lib/lib";

import Sidebar from "../../components/Sidebar";
import ContentArea from "../../components/ContentArea";
import classnames from "classnames";
import { useRouter } from "next/router";
import { join } from "path";
import { meetupKeys } from "../../lib/constants";

const breadcrumbs = (posts, paths) => {
  const results = [
    <Link href="/">Urbit</Link>,
    <span className="px-1">/</span>,
    <Link href="/community">Community</Link>,
  ];
  let thisLink = "/community";
  for (const path of paths) {
    posts = posts.children[path];
    thisLink = join(thisLink, path);
    results.push(
      <span className="px-1">/</span>,
      <Link href={thisLink}>{posts.title}</Link>
    );
  }
  return results;
};

const childPages = (thisLink, children, level = 0) => (
  <ul className="pl-1">
    {children?.map((child) => (
      <li>{pageTree(join(thisLink, child.slug), child, level)}</li>
    ))}
  </ul>
);

const pageTree = (thisLink, tree, level = 0) => {
  const router = useRouter();

  const isThisPage = router.asPath === thisLink;

  const pageItemClasses = classnames({
    "pl-4 text-wall-600 text-base hover:text-green-400": level === 0,
    "pl-8 text-wall-600 text-base hover:text-green-400": level === 1,
    "pl-12 text-wall-600 text-base hover:text-green-400": level === 2,
    "dot relative": isThisPage,
    "text-green-400": isThisPage,
  });

  return (
    <>
      <Link href={thisLink}>
        <a className={`${pageItemClasses} cursor-pointer`}>{tree.title}</a>
      </Link>
    </>
  );
};

const Meetup = (props) => {
  const whiteText = props.text_color === "white" ? "text-white" : "";
  return (
    <div
      className="bg-wall-100 rounded-xl bg-cover bg-center bg-no-repeat mt-3"
      style={{ backgroundImage: `url(${props.image})` || "" }}
    >
      <div className="flex flex-col p-6 justify-between items-between h-full relative">
        <div className="flex-grow-1 flex flex-col h-full">
          <h3 id={props.title} className={`mb-2 ${whiteText}`}>
            {props.title}
          </h3>
        </div>

        <div>
          <p className={`type-sub mb-1 ${whiteText}`}>{props.location}</p>
          <p className={`type-sub mb-1 ${whiteText}`}>
            Organized by {props.organizer}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 p-6">
          <a
            className="button-sm bg-green-400 text-white"
            href={props.link}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
          >
            Meetup site
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Meetups({ posts, meetups, params, search }) {
  const asia = meetups["Asia"] || [];
  const eu = meetups["Europe"] || [];
  const na = meetups["North America"] || [];
  const oc = meetups["Oceania"] || [];

  return (
    <Container>
      <Head>
        <title>Meetups • Community • urbit.org</title>
        {Meta({})}
      </Head>
      <div className="flex w-screen h-screen min-h-screen w-screen sidebar">
        <Sidebar search={search}>
          {childPages("/community", posts.pages)}
        </Sidebar>
        <ContentArea
          breadcrumbs={breadcrumbs(posts, params.slug?.slice(0, -1) || "")}
          title="Meetups"
          search={search}
          section="Community"
          params={params}
        >
          {/* It's not markdown but I want the styles */}
          <div className="markdown">
            <p>
              Turns out that getting Urbit fans together in one room is pretty
              fun. Here's an incomplete list of community-led Urbit IRL groups.
              These events are generally informal and very approachable – feel
              free to dive in.
            </p>
          </div>
          <h2 className="mt-6 mb-3" id="asia">
            Asia
          </h2>
          {asia.map((meetup) => Meetup(meetup))}
          <h2 className="mt-6 mb-3" id="eu">
            Europe
          </h2>
          {eu.map((meetup) => Meetup(meetup))}
          <h2 className="mt-6 mb-3" id="na">
            North America
          </h2>
          {na.map((meetup) => Meetup(meetup))}
          <h2 className="mt-6 mb-3" id="oc">
            Oceania
          </h2>
          {oc.map((meetup) => Meetup(meetup))}
        </ContentArea>
      </div>
    </Container>
  );
}

export async function getStaticProps({ params }) {
  let posts = buildPageTree(join(process.cwd(), "content/community"), "weight");

  posts.pages = [{ title: "Meetups", slug: "meetups", weight: 1 }].concat(
    posts.pages
  );

  const meetups = getAllEvents(meetupKeys, "meetups").reduce((acc, val) => {
    if (acc.hasOwnProperty(val.region)) {
      return Object.assign(acc, { [val.region]: acc[val.region].concat(val) });
    }
    return Object.assign(acc, { [val.region]: [val] });
  }, {});

  return { props: { posts, meetups, params: {} } };
}
