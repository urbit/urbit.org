import { useRouter } from "next/router";
import Head from "next/head";
import Meta from "../../components/Meta";
import {
  Container,
  SingleColumn,
  Section,
  getAllPosts,
  generateDisplayDate,
  formatDate,
} from "@urbit/foundation-design-system";
import IntraNav from "../../components/IntraNav";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import EcosystemSidebar from "../../components/ecosystem/EcosystemSidebar";
import SpotlightArchive from "../../components/ecosystem/SpotlightArchive";
import Post from "../../components/ecosystem/Post";
import classnames from "classnames";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Contact from "../../components/Contact";
import { matchEcosystemPost } from "../../lib/lib";

export default function Ecosystem({
  search,
  post,
  posts,
  applications,
  groups,
  marketplaces,
  organizations,
  podcasts,
  articles,
  communities
}) {
  const router = useRouter();

  const { type } = router.query;

  // Route ?type=archive to below component;
  // otherwise, show directory of ecosystem type
  // If no param, we show the spotlight for the month
  if (type === "archive") {
    return <SpotlightArchive posts={posts} search={search} />;
  }

  const spotlight = type === undefined;

  let title;
  if (type) {
    switch (type) {
      case "applications":
        title = "Applications • Ecosystem";
        break;
      case "communities":
        title = "Communities • Ecosystem";
        break;
      case "applications":
        title = "Groups • Ecosystem";
        break;
      case "marketplaces":
        title = "Marketplaces • Ecosystem";
        break;
      case "podcasts":
        title = "Podcasts • Ecosystem";
        break;
      case "organizations":
        title = "Organizations • Ecosystem";
        break;
      case "articles":
        title = "Articles • Ecosystem";
        break;
      default:
        title = "Ecosystem Spotlight";
    }
  } else {
    title = "Ecosystem Spotlight";
  }

  const data = {
    title: title,
    description: "Explore the Urbit ecosystem.",
  };
  return (
    <Container>
      <Head>
        <title>{title}</title>
        {Meta(data)}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        <Section>
          <h1>Ecosystem</h1>
        </Section>
        <Section className="justify-center">
          <div className="flex justify-between sidebar">
            <Sidebar search={search}>
              <EcosystemSidebar />
            </Sidebar>
            <div
              className={classnames("w-full", {
                "max-w-prose": spotlight,
              })}
            >
              {/* Default layout */}
              {spotlight && (
                <>
                  <h3>{`Ecosystem Spotlight - ${post.title}`}</h3>
                  <Post post={post} />
                  <Link href="/ecosystem/?type=archive" passHref>
                    <a className="button-lg bg-wall-600 text-white w-fit">
                      Spotlight Archive
                    </a>
                  </Link>
                  <div className="pt-36">
                    <h3 className="pb-2">Urbit Monthly</h3>
                    <p className="pb-8">
                      Get the Spotlight in your inbox along with updates on
                      everything Urbit.
                    </p>
                    <Contact emphasize className="w-full" />
                  </div>
                </>
              )}
              {/* Ecosystem type layouts */}
              <div
                className={classnames("grid gap-12 w-full", {
                  "grid-cols-1": type === "podcasts" || type === "articles",
                  "grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2":
                    type === "applications" || type === "groups" || type === "communities" || type === "organizations" || type === "marketplaces",
                  hidden: spotlight,
                })}
              >
                {type === "organizations" &&
                  <Organizations dir={organizations} />
                }

                {type === "applications" &&
                  <Applications dir={applications} />
                }
                {type === "communities" &&
                  <Communities dir={communities} />
                }
                {type === "groups" &&
                  <Groups dir={groups} />
                }
                {type === "marketplaces" &&
                  <Marketplaces dir={marketplaces} />
                }
                {type === "podcasts" &&
                  <Podcasts dir={podcasts} />
                }

                {type === "articles" &&
                  <Articles dir={articles} />
                }
              </div>
            </div>
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}


const Applications = ({ dir }) => {
  return dir.map((app) => (
    <Link href={`/applications/${app.ship}/${app.slug}`}>
      <div className="flex space-x-4 items-center cursor-pointer hover:opacity-90">
        <div
          className="h-36 w-36 rounded-xl items-center justify-center shrink-0 overflow-hidden"
          style={{
            backgroundColor: app?.bgColor || "rgba(0,0,0,0)",
          }}
        >
          {app?.image && (
            <img
              className="items-center h-36 w-36"
              src={app.image}
            />
          )}
        </div>
        <div className="">
          <p className="text-left font-bold">{app.title}</p>
          <p className="text-left text-wall-400 font-light">
            {app.description}
          </p>
        </div>
      </div>
    </Link>
  ))
}

const Groups = ({ dir }) => {
  return dir.map((group) => (
    <Link href={`/groups/${group.ship}/${group.slug}`}>
      <div className="flex space-x-4 items-center cursor-pointer hover:opacity-90">
        <div
          className="h-36 w-36 rounded-xl items-center justify-center shrink-0 overflow-hidden"
          style={{
            backgroundColor: group?.tile?.startsWith("#")
              ? group?.tile
              : "rgba(0,0,0,0)",
          }}
        >
          {!group?.tile?.startsWith("#") && (
            <img
              className="items-center h-36 w-36"
              src={group.tile}
            />
          )}
        </div>
        <div className="">
          <p className="text-left font-bold">{group.title}</p>
          <p className="text-left text-wall-400 font-light">
            {group.description}
          </p>
        </div>
      </div>
    </Link>
  ))
}


const Podcasts = ({ dir }) => {
  return dir.map((pod) => (
    <Link href={`/podcasts/${pod.slug}`}>
      <div className="flex cursor-pointer space-x-4 items-center hover:opacity-90">
        <img className="w-28" src={pod.image} />
        <div className="flex flex-col space-y-2 min-w-0">
          <p className="font-bold">{pod.podcast}</p>
          <p className="min-w-0 min-h-0 leading-5 ">
            {pod.title}
          </p>
          <p className="text-wall-400">
            {formatDate(generateDisplayDate(pod.date))}
          </p>
        </div>
      </div>
    </Link>
  ))
}

const Articles = ({ dir }) => {
  return dir.map((article) => (
    <Link href={`/articles/${article.slug}`}>
      <div className="flex cursor-pointer space-x-4 items-center hover:opacity-90">
        <img className="w-28" src={article.image} />
        <div className="flex flex-col space-y-2 min-w-0">
          <p className="font-bold">{article.publication}</p>
          <p className="min-w-0 min-h-0 leading-5 ">
            {article.title}
          </p>
          <p className="text-wall-400">
            {formatDate(generateDisplayDate(article.date))}
          </p>
        </div>
      </div>
    </Link>
  ))
}

const Communities = ({ dir }) => {
  return dir.map((community) => (
    <Link href={`/communities/${community.slug}`}>
      <div className="flex space-x-4 items-center cursor-pointer hover:opacity-90">
        <div className="h-36 w-36 rounded-xl items-center justify-center shrink-0 overflow-hidden">
            <img
              className="items-center h-36 w-36"
              src={community.image}
            />
        </div>
        <div className="">
          <p className="text-left font-bold">{community.title}</p>
          <p className="text-left text-wall-400 font-light">
            {community.description}
          </p>
        </div>
      </div>
    </Link>
  ))
}


const Marketplaces = ({ dir }) => {
  return dir.map((market) => (
    <Link href={`/marketplaces/${market.slug}`}>
      <div className="flex space-x-4 items-center cursor-pointer hover:opacity-90">
        <div className="h-36 w-36 rounded-xl items-center justify-center shrink-0 overflow-hidden">
            <img
              className="items-center h-36 w-36"
              src={market.image}
            />
        </div>
        <div className="">
          <p className="text-left font-bold">{market.title}</p>
          <p className="text-left text-wall-400 font-light">
            {market.description}
          </p>
        </div>
      </div>
    </Link>
  ))
}

const Organizations = ({ dir }) => {
  return dir.map((org) => (
    <Link href={`/organizations/${org.slug}`}>
      <div className="flex space-x-4 items-center cursor-pointer hover:opacity-90">
        <div className="h-36 w-36 rounded-xl items-center justify-center shrink-0 overflow-hidden">
            <img
              className="items-center h-36 w-36"
              src={org.image}
            />
        </div>
        <div className="">
          <p className="text-left font-bold">{org.title}</p>
          <p className="text-left text-wall-400 font-light">
            {org.description}
          </p>
        </div>
      </div>
    </Link>
  ))
}






export async function getStaticProps() {
  const posts = getAllPosts(
    ["title", "date", "slug", "featured-1", "featured-2", "featured-3"],
    "ecosystem/spotlight",
    "date"
  );
  const post = matchEcosystemPost(getAllPosts(
    ["title", "date", "featured-1", "featured-2", "featured-3"],
    "ecosystem/spotlight",
    "date"
  )[0]);
  const marketplaces = getAllPosts(["title", "image", "slug"], "marketplaces");
  const communities = getAllPosts(["title", "image", "slug", "description"], "communities");
  const podcasts = getAllPosts(
    ["title", "image", "date", "podcast", "slug"],
    "podcasts",
    "date"
  );
  const articles = getAllPosts(
    ["title", "image", "date", "publication", "author", "slug"],
    "articles",
    "date"
  );
  const organizations = getAllPosts(
    ["title", "image", "slug"],
    "organizations"
  );
  const applications = fs
    .readdirSync(path.join(process.cwd(), "content/applications"), {
      withFileTypes: true,
    })
    .filter((f) => f.isDirectory())
    .map((dir) =>
      getAllPosts(
        ["title", "bgColor", "image", "slug", "description"],
        `applications/${dir.name}`
      )
        .map((e) => ({ ...e, ship: dir.name }))
        .flat()
    )
    .flat()
    .sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      return nameA < nameB ? -1 : 1;
    });
  const groups = fs
    .readdirSync(path.join(process.cwd(), "content/groups"), {
      withFileTypes: true,
    })
    .filter((f) => f.isDirectory())
    .map((dir) =>
      getAllPosts(
        ["title", "tile", "slug", "description"],
        `groups/${dir.name}`
      )
        .map((e) => ({ ...e, ship: dir.name }))
        .flat()
    )
    .flat()
    .sort((a, b) => {
      const nameA = a.title.toLowerCase();
      const nameB = b.title.toLowerCase();
      return nameA < nameB ? -1 : 1;
    });

  return {
    props: {
      posts,
      post,
      applications,
      groups,
      marketplaces,
      podcasts,
      organizations,
      articles,
      communities
    },
  };
}
