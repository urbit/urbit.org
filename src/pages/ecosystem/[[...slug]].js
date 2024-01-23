import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";
import path from "path";
import {
  Container,
  Main,
  FatBlock,
  getAllPosts,
  generateDisplayDate,
  formatDate,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import Header from "@/components/Header";
import Carousel from "@/components/Carousel";
import OrgCard from "@/components/ecosystem/Org";

function Filter({ className = "", children, filters = [] }) {
  const [filter, setFilter] = useState(
    Object.fromEntries(new Map(filters.map((s) => [s, false])))
  );

  const filterChildren = () => {
    let filtered = [...children];
    filters.forEach((s) => {
      if (filter[s]) {
        filtered = filtered.filter((c) => c.props[s] === filter[s]);
      }
    });
    return filtered;
  };

  const getFilterValues = (s) => {
    let vals = new Set([]);
    children.forEach((c) => {
      vals.add(c.props[s]);
    });
    return new Array(...vals);
  };

  const toggleFilter = (f, v) => {
    let filterCopy = { ...filter };
    if (filter[f] === v) {
      filterCopy[f] = false;
    } else {
      filterCopy[f] = v;
    }
    setFilter(filterCopy);
  };

  return (
    <>
      {filters.map((f) => (
        <nav className="flex items-center w-full h-12 nav-space-x text-gray bg-black whitespace-nowrap overflow-x-auto type-ui">
          <button
            className={classnames("btn border-2", {
              "border-gray text-brite": filter[f] !== false,
              "border-brite bg-brite text-gray": filter[f] === false,
            })}
            onClick={() => toggleFilter(f, false)}
          >
            All
          </button>
          {getFilterValues(f).map((v) => (
            <button
              className={classnames("btn border-2 border-brite", {
                "border-gray text-brite": filter[f] !== v,
                "border-brite bg-brite text-gray": filter[f] === v,
              })}
              onClick={() => toggleFilter(f, v)}
            >
              {v}
            </button>
          ))}
        </nav>
      ))}
      <div className={classnames("mt-8", className)}>
        {filterChildren(children)}
      </div>
    </>
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
        <h3 className="h3 font-semibold line-clamp-1 text-ellipsis">{title}</h3>
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
  return (
    <Link
      className={classnames("flex flex-col", className)}
      href={path.join("/ecosystem", "podcasts", slug)}
    >
      <img className="aspect-square rounded-t-xl object-cover" src={image} />
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

function TalkCard({ className, title, image, url }) {
  return (
    <Link
      className={classnames("flex flex-col", className)}
      href={url}
      target="_blank"
    >
      <div className="relative aspect-[16/9] rounded-t-xl">
        <img
          className="absolute h-full w-full rounded-t-xl object-cover"
          src={image}
        />
        <svg
          className="absolute z-10 h-1/4 m-auto top-0 right-0 bottom-0 left-0"
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
      <div className="bg-tint p-4 rounded-b-xl">
        <h3 className="h3 h-[1.3em] line-clamp-1 text-ellipsis">{title}</h3>
      </div>
    </Link>
  );
}

function Article({
  title,
  publication,
  author,
  type,
  date,
  image,
  URL,
  divider = false,
}) {
  const displayDate = generateDisplayDate(date);

  return (
    <>
      {divider && <hr className="hr-horizontal border-brite" />}
      <Link className="flex h-28 xs:h-36 md:h-44 w-full" href={URL}>
        <img
          className="aspect-square h-full mr-6 lg:mr-16"
          alt=""
          src={image}
        />
        <div className="flex flex-col flex-1 justify-between">
          <div className="flex flex-col">
            <div className="flex w-full sm:mb-2.5 text-gray body-md">
              <p className="w-full sm:w-1/2">{publication}</p>
              <p className="hidden sm:block w-1/2">Author: {author}</p>
            </div>
            <h3 className="h3 h-[2.6em] line-clamp-2 text-ellipsis">{title}</h3>
          </div>
          <div className="flex w-full text-gray text-gray body-md">
            <p className="hidden sm:block w-1/2">{type || "Article"}</p>
            <p className="w-full sm:w-1/2">{formatDate(displayDate)}</p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default function Ecosystem({ apps, articles, orgs, podcasts, talks }) {
  const router = useRouter();
  const type = router.query?.slug?.[0] || "overview";

  let title = "Ecosystem";
  if (type) {
    switch (type) {
      case "apps":
        title = "Apps";
        break;
      case "podcasts":
        title = "Podcasts";
        break;
      case "talks":
        title = "Talks";
        break;
      case "orgs":
        title = "Companies";
        break;
      case "articles":
        title = "Articles";
        break;
    }
  }

  const post = { title: title, description: "Explore the Urbit ecosystem." };

  return (
    <Container>
      <Head>
        <title>{`${title} ${
          title !== "Ecosystem" ? "• Ecosystem " : ""
        }• urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
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
              <FatBlock className="grid md:hidden grid-cols-2 xs:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
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
              <Carousel>
                {podcasts &&
                  podcasts.map((props) => (
                    <PodcastCard
                      className="w-60 sm:w-96 md:w-[24rem]"
                      {...props}
                    />
                  ))}
              </Carousel>
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
              <Carousel>
                {talks &&
                  talks.map((props) => (
                    <TalkCard className="w-60 sm:w-80 md:w-96" {...props} />
                  ))}
              </Carousel>
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
              <FatBlock className="grid md:hidden grid-cols-2 xs:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
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
                  articles
                    .slice(0, 3)
                    .map((props, index) => (
                      <Article divider={index > 0} {...props} />
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
          <>
            <section className="">
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Apps</h1>
              <p className="h1">
                Urbit is a <strong>new kind of computer</strong> that you can
                own completely in ways that matter: <strong>networking</strong>,{" "}
                <strong>identity</strong>, & <strong>data</strong>.
              </p>
            </section>
            <hr className="hr-horizontal" />
            <FatBlock className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
              {apps && apps.map((props) => <AppCard {...props} />)}
            </FatBlock>
          </>
        )}
        {type === "podcasts" && (
          <>
            <section className="">
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Podcasts</h1>
              <p className="h1">
                Urbit is a <strong>new kind of computer</strong> that you can
                own completely in ways that matter: <strong>networking</strong>,{" "}
                <strong>identity</strong>, & <strong>data</strong>.
              </p>
            </section>
            <hr className="hr-horizontal" />
            <FatBlock className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 lg:gap-6 xl:gap-8">
              {podcasts && podcasts.map((props) => <PodcastCard {...props} />)}
            </FatBlock>
          </>
        )}
        {type === "talks" && (
          <>
            <section className="">
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Talks</h1>
              <p className="h1">
                Urbit is a <strong>new kind of computer</strong> that you can
                own completely in ways that matter: <strong>networking</strong>,{" "}
                <strong>identity</strong>, & <strong>data</strong>.
              </p>
            </section>
            <hr className="hr-horizontal" />
            <FatBlock>
              <Filter
                className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1 lg:gap-6 xl:gap-8"
                filters={["event", "type"]}
              >
                {talks && talks.map((props) => <TalkCard {...props} />)}
              </Filter>
            </FatBlock>
          </>
        )}
        {type === "orgs" && (
          <>
            <section className="">
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Companies</h1>
              <p className="h1">
                Urbit is a <strong>new kind of computer</strong> that you can
                own completely in ways that matter: <strong>networking</strong>,{" "}
                <strong>identity</strong>, & <strong>data</strong>.
              </p>
            </section>
            <hr className="hr-horizontal" />
            <FatBlock className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-1 lg:gap-6 xl:gap-8">
              {orgs && orgs.map((props) => <OrgCard {...props} />)}
            </FatBlock>
          </>
        )}
        {type === "articles" && (
          <>
            <section className="">
              <h1 className="h1 mb-8 md:mb-16 lg:mb-20">Articles & Press</h1>
              <p className="h1">
                Urbit is a <strong>new kind of computer</strong> that you can
                own completely in ways that matter: <strong>networking</strong>,{" "}
                <strong>identity</strong>, & <strong>data</strong>.
              </p>
            </section>
            <hr className="hr-horizontal" />
            <FatBlock>
              <Filter className="space-y-4 md:space-y-8" filters={["type"]}>
                {articles &&
                  articles.map((props, index) => (
                    <Article divider={index > 0} {...props} />
                  ))}
              </Filter>
            </FatBlock>
          </>
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

  return {
    paths: slugs,
    fallback: false,
  };
}
