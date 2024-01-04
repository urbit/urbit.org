import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import fs from "fs";
import path from "path";
import {
  Container,
  Main,
  Section,
  CarouselSection,
  ExpandSection,
  FatBlock,
  ConceptCard,
  VideoCard,
  LogoCard,
  getAllPosts,
  generateDisplayDate,
  formatDate,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import { matchEcosystemPost } from "@/lib/lib";

function Header({ pages = [], path }) {
  return (
    <div className="sticky top-12 md:top-16 z-40 layout">
      <nav className="flex items-center w-full h-12 md:h-16 nav-space-x text-gray bg-black whitespace-nowrap overflow-x-auto type-ui layout-px">
        {pages.map((p) => (
          <Link
            className={classnames({
              "text-brite": path === p.href,
              "hover:text-brite": path !== p.href,
            })}
            href={p.href}
          >
            {p.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function AppCard({ className, title, description, slug, bgColor, image }) {
  const bg = !bgColor && "bg-tint";
  return (
    <Link
      className={classnames("flex flex-col", className)}
      href={path.join("/ecosystem", "apps", slug)}
    >
      <div
        className={classnames(
          "flex justify-center items-center aspect-square rounded-t-xl p-4",
          bg
        )}
        style={{ backgroundColor: bgColor }}
      >
        <img
          /* className="m-auto" */
          src={image}
        />
      </div>
      <div className="bg-tint rounded-b-xl p-4">
        <h3 className="h3 font-semibold">{title}</h3>
        <div className="hidden md:block">
          <p className="h-[3.9em] body-md text-lite line-clamp-3 text-ellipsis">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

function PodcastCard({
  className,
  podcast,
  content,
  image,
  URL,
  spotify,
  youtube,
  apple,
  slug,
}) {
  const style = {
    backgroundImage: image && `url(${image})`,
  };
  return (
    <Link
      className={classnames("flex flex-col aspect-[2/2.5]", className)}
      href={path.join("/ecosystem", "podcasts", slug)}
    >
      <div
        className={classnames("aspect-square rounded-t-xl", {
          "bg-center bg-cover bg-no-repeat": image,
        })}
        style={style}
      />
      <div className="bg-tint rounded-b-xl p-4">
        <h3 className="h3 font-semibold line-clamp-1 text-ellipsis">
          {podcast}
        </h3>
        <div className="hidden md:block">
          <p className="h-[2.6em] body-md text-lite line-clamp-2 text-ellipsis">
            {content}
          </p>
        </div>
      </div>
    </Link>
  );
}

function TalkCard({ title, image, url }) {
  const style = {
    backgroundImage: image && `url(${image})`,
  };
  return (
    <Link
      className="flex flex-col aspect-[12/10] bg-tint rounded-xl"
      href={url}
      target="_blank"
    >
      <div
        className={classnames("relative aspect-[16/9] rounded-t-xl", {
          "bg-center bg-cover bg-no-repeat": image,
        })}
        style={style}
      >
        <div className="absolute flex h-full w-full items-center justify-center">
          <svg
            className="h-1/4"
            width="68"
            height="97"
            viewBox="0 0 68 97"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1082_1728)">
              <path
                d="M55.8737 48.5L9.06684 83.4636V13.5364L55.8737 48.5ZM68 48.5C68 47.0344 67.3207 45.6797 66.1877 44.8901L7.25448 0.9031C7.0517 0.761833 6.82357 0.678586 6.60812 0.567591C6.45096 0.484344 6.31155 0.391007 6.14679 0.325419C5.64238 0.128654 5.11261 0 4.53469 0C2.04048 0 0 2.03071 0 4.51045V92.487C0 94.9693 2.04048 96.9975 4.53215 96.9975C5.11008 96.9975 5.63731 96.8688 6.14426 96.6721C6.30902 96.6065 6.44843 96.5131 6.60305 96.4324C6.82104 96.3189 7.0517 96.2356 7.25448 96.0944L66.1877 52.1048C67.3207 51.3153 68 49.9606 68 48.495"
                fill="#AAE68C"
              />
            </g>
            <defs>
              <clipPath id="clip0_1082_1728">
                <rect width="68" height="97" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className="bg-tint p-4 rounded-b-xl">
        <h3 className="h3 h-[2.6em] line-clamp-2 text-ellipsis">{title}</h3>
      </div>
    </Link>
  );
}

function OrgCard({ title, image, slug }) {
  return (
    <Link
      className="relative flex flex-col aspect-square bg-brite rounded-xl p-2 sm:p-4"
      href={path.join("/ecosystem", "orgs", slug)}
    >
      <h3 className="absolute text-black h2">{title}</h3>
      <div className="flex-1 flex text-center items-center">
        <img className="w-1/2 m-auto" src={image} />
      </div>
    </Link>
  );
}

function Article({ title, publication, author, type, date, image, URL }) {
  const displayDate = generateDisplayDate(date);

  return (
    <Link className="flex h-28 sm:h-36 md:h-44 lg:h-72 w-full" href={URL}>
      <img className="aspect-square h-full mr-6 lg:mr-16" alt="" src={image} />
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col">
          <div className="flex w-full sm:mb-2.5 text-gray body-lg">
            <p className="w-full sm:w-1/2">{publication}</p>
            <p className="hidden sm:block w-1/2">Author: {author}</p>
          </div>
          <h3 className="h2 h-[4.02em] md:h-[3.9em] line-clamp-3 text-ellipsis">
            {title}
          </h3>
        </div>
        <div className="flex w-full text-gray text-gray body-lg">
          <p className="hidden sm:block w-1/2">{type || "Article"}</p>
          <p className="w-full sm:w-1/2">{formatDate(displayDate)}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Ecosystem({ apps, articles, orgs, podcasts, talks }) {
  const router = useRouter();
  const type = router.query?.slug?.[0] || "overview";

  let title;
  if (type) {
    switch (type) {
      case "apps":
        title = "Apps • Ecosystem";
        break;
      case "podcasts":
        title = "Podcasts • Ecosystem";
        break;
      case "talks":
        title = "Talks • Ecosystem";
        break;
      case "orgs":
        title = "Organizations • Ecosystem";
        break;
      case "articles":
        title = "Articles • Ecosystem";
        break;
    }
  } else {
    title = "Ecosystem";
  }

  return (
    <Container>
      <Head>
        <title>{title}</title>
        {Meta(
          {
            title: title,
            description: "Explore the Urbit ecosystem.",
            image:
              "https://storage.googleapis.com/media.urbit.org/site/opengraph/urbit.png",
          },
          false,
          true
        )}
      </Head>
      <IntraNav ourSite="https://urbit.org" />
      <Header
        pages={[
          { title: "Overview", href: "/ecosystem" },
          { title: "Apps", href: "/ecosystem/apps" },
          { title: "Podcasts", href: "/ecosystem/podcasts" },
          { title: "Talks", href: "/ecosystem/talks" },
          { title: "Companies", href: "/ecosystem/orgs" },
          { title: "Articles & Press", href: "/ecosystem/articles" },
        ]}
        path={router.asPath}
      />
      <Main
        className="text-brite border-brite space-y-4 md:space-y-8"
        singleColumn
      >
        {type === "overview" && (
          <>
            <section className="">
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Ecosystem</h1>
              <p className="h1">
                Urbit is a <strong>new kind of computer</strong> that you can
                own completely in ways that matter: <strong>networking</strong>,{" "}
                <strong>identity</strong>, & <strong>data</strong>.
              </p>
            </section>
            <hr className="hr-horizontal" />
            <section className="space-y-4 md:space-y-8 lg:space-y-16">
              <h2 className="h2">Apps</h2>
              <FatBlock className="hidden md:grid grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
                {apps &&
                  apps.slice(0, 8).map((props) => <AppCard {...props} />)}
              </FatBlock>
              <FatBlock className="grid md:hidden grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
                {apps &&
                  apps.slice(0, 6).map((props) => <AppCard {...props} />)}
              </FatBlock>
              <Link className="btn btn-light body-lg" href="/ecosystem/apps">
                More apps
              </Link>
            </section>
            <hr className="hr-horizontal" />
            <section className="space-y-4 md:space-y-8 lg:space-y-16">
              <h2 className="h2">Podcasts</h2>
              <div className="w-screen max-w-screen-3xl overflow-auto -layout-mx">
                <div className="layout-px h-60 sm:h-96 md:h-[32rem] w-fit">
                  <FatBlock className="flex space-x-1 lg:space-x-6 xl:space-x-8 h-full">
                    {podcasts &&
                      podcasts.map((props) => <PodcastCard {...props} />)}
                  </FatBlock>
                </div>
              </div>
              <Link
                className="btn btn-light body-lg"
                href="/ecosystem/podcasts"
              >
                More podcasts
              </Link>
            </section>
            <hr className="hr-horizontal" />
            <section className="space-y-4 md:space-y-8 lg:space-y-16">
              <h2 className="h2">Talks</h2>
              <div className="w-screen max-w-screen-3xl overflow-auto -layout-mx">
                <div className="layout-px h-48 sm:h-64 md:h-80 w-fit">
                  <FatBlock className="flex space-x-1 lg:space-x-6 xl:space-x-8 h-full">
                    {talks && talks.map((props) => <TalkCard {...props} />)}
                  </FatBlock>
                </div>
              </div>
              <Link className="btn btn-light body-lg" href="/ecosystem/talks">
                More talks
              </Link>
            </section>
            <hr className="hr-horizontal" />
            <section className="space-y-4 md:space-y-8 lg:space-y-16">
              <h2 className="h2">Companies</h2>
              <FatBlock className="hidden md:grid grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
                {orgs &&
                  orgs.slice(0, 8).map((props) => <OrgCard {...props} />)}
              </FatBlock>
              <FatBlock className="grid md:hidden grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
                {orgs &&
                  orgs.slice(0, 6).map((props) => <OrgCard {...props} />)}
              </FatBlock>
              <Link className="btn btn-light body-lg" href="/ecosystem/orgs">
                More companies
              </Link>
            </section>
            <hr className="hr-horizontal" />
            <section className="space-y-4 md:space-y-8 lg:space-y-16">
              <h2 className="h2">Articles & Press</h2>
              <div className="space-y-4 md:space-y-8">
                {articles &&
                  articles.slice(0, 3).map((props, index) => (
                    <>
                      {index > 0 && (
                        <hr className="hr-horizontal border-brite" />
                      )}
                      <Article {...props} />
                    </>
                  ))}
              </div>
              <Link
                className="btn btn-light body-lg"
                href="/ecosystem/articles"
              >
                More articles & press
              </Link>
            </section>
          </>
        )}
        {type === "apps" && (
          <FatBlock className="grid grid-cols-3 md:grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
            {apps && apps.map((props) => <AppCard {...props} />)}
          </FatBlock>
        )}
        {type === "podcasts" && (
          <FatBlock className="grid grid-cols-2 md:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
            {podcasts && podcasts.map((props) => <PodcastCard {...props} />)}
          </FatBlock>
        )}
        {type === "talks" && (
          <FatBlock className="grid grid-cols-2 md:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
            {talks && talks.map((props) => <TalkCard {...props} />)}
          </FatBlock>
        )}
        {type === "orgs" && (
          <FatBlock className="grid grid-cols-3 md:grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
            {orgs && orgs.map((props) => <OrgCard {...props} />)}
          </FatBlock>
        )}
        {type === "articles" && (
          <div className="space-y-4 md:space-y-8">
            {articles &&
              articles.map((props, index) => (
                <>
                  {index > 0 && <hr className="hr-horizontal border-brite" />}
                  <Article {...props} />
                </>
              ))}
          </div>
        )}
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const apps = getAllPosts(
    ["title", "description", "bgColor", "image", "slug"],
    "ecosystem/apps"
  );
  const articles = getAllPosts(
    ["title", "publication", "author", "type", "date", "image", "URL", "slug"],
    "ecosystem/articles",
    "date"
  );
  const orgs = getAllPosts(["title", "image", "slug"], "ecosystem/orgs");
  const podcasts = getAllPosts(
    [
      "podcast",
      "content",
      "image",
      "URL",
      "spotify",
      "youtube",
      "apple",
      "slug",
    ],
    "ecosystem/podcasts"
  );
  const talks = getAllPosts(
    ["title", "event", "date", "type", "image", "url", "slug"],
    "ecosystem/talks",
    "date"
  );

  return {
    props: {
      apps,
      articles,
      orgs,
      podcasts,
      talks,
    },
  };
}

export async function getStaticPaths() {
  const slugs = [
    "/ecosystem",
    "/ecosystem/apps",
    "/ecosystem/podcasts",
    "/ecosystem/talks",
    "/ecosystem/orgs",
    "/ecosystem/articles",
  ];

  // const allHrefs = (thisLink, tree) => {
  //   slugs.push(thisLink, ...tree.pages.map((e) => join(thisLink, e.slug)));
  //   allHrefsChildren(thisLink, tree.children);
  // };

  // const allHrefsChildren = (thisLink, children) => {
  //   Object.entries(children).map(([childSlug, child]) => {
  //     allHrefs(join(thisLink, childSlug), child);
  //   });
  // };

  // allHrefs(`/${root}`, posts);
  return {
    paths: slugs,
    fallback: false,
  };
}
