import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import fs from "fs";
import omit from "lodash.omit";
import path from "path";
import {
  Container,
  Main,
  Section,
  Icon,
  getAllPosts,
  IconCard,
} from "@urbit/fdn-design-system";

import { getGrantsCategories, getGrantsTypes } from "@/lib/lib";
import Footer from "@/components/Footer";
import IntraNav from "@/components/IntraNav";
import Meta from "@/components/Meta";

function isArray(arr) {
  return Array.isArray(arr);
}

function isOrIsIn(type, query) {
  if (!query) {
    return false;
  }
  return isArray(query) ? query.includes(type) : type === query;
}

function statusLabel(status) {
  return {
    open: "Open",
    wip: "In Progress",
    completed: "Completed",
  }[status];
}

function GrantCard(post) {
  const { title, date, taxonomies, extra, slug } = post;
  const { status } = post;

  return (
    <Link
      className={classnames("flex flex-col space-y-8 w-full rounded-lg p-4", {
        "bg-container": status === "open",
        "bg-container-variant": status !== "open",
      })}
      href={path.join("/grants", slug)}
    >
      <div className="body-lg flex justify-between">
        <div>
          <h2 className="text-on-container">{title}</h2>
          <p className="text-on-container-variant">Reward: {extra.reward}</p>
        </div>
        {new Set(["Bounty", "Proposal"]).has(taxonomies.grant_type[0]) && (
          <div className="flex items-center justify-center h-[1.1em] aspect-square rounded-lg ml-3.5 bg-on-container">
            <Icon
              className={"h-4/6 bg-container-variant"}
              name={taxonomies.grant_type[0]}
              weight="medium"
            />
          </div>
        )}
      </div>
      {extra.description && (
        <p className="body-md my-8 text-on-container-variant">
          {extra.description}
        </p>
      )}
      <div className="flex flex-wrap body-md gap-1.5">
        <span
          className={classnames("btn text-inverse-on-container", {
            "bg-on-container": status === "open",
            "bg-on-container-variant": status !== "open",
          })}
        >
          {statusLabel(status)}
        </span>
        {taxonomies.grant_type.map((s) => (
          <span
            className="btn bg-on-container-variant text-inverse-on-container"
            key={s}
          >
            {s}
          </span>
        ))}
        {taxonomies.grant_category.map((s) => (
          <span
            className="btn bg-on-container-variant text-inverse-on-container"
            key={s}
          >
            {s}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default function Grants({ posts, categories, types }) {
  const router = useRouter();
  let { status, type, category } = router.query;
  if (status === undefined) {
    status = "wip";
  }

  function push(toQuery) {
    router.push(
      {
        pathname: "/grants",
        hash: "view-grants",
        query: toQuery,
      },
      "",
      { scroll: false },
    );
  }

  function changeStatus(status) {
    const { type, category } = router.query;
    push({ status, type, category });
  }

  function pushOrDropQuery(queryName, currentQuery, item) {
    let to, toWithQuery;
    if (isArray(currentQuery)) {
      to = isOrIsIn(item, currentQuery)
        ? currentQuery.filter((e) => e !== item)
        : [...currentQuery, item];
    } else {
      to = isOrIsIn(item, currentQuery)
        ? null
        : [currentQuery, item].filter((e) => e !== undefined);
    }
    if (!to) {
      toWithQuery = omit(router.query, queryName);
    } else {
      toWithQuery = { ...router.query, [queryName]: to };
    }
    return toWithQuery;
  }

  const annotatedPosts = posts.map((post) => {
    if (post.extra.canceled) {
      return { ...post, status: "canceled" };
    } else if (post.extra.completed) {
      return { ...post, status: "completed" };
    } else if (post.extra.assignee && post.extra.assignee?.[0].length > 0) {
      return { ...post, status: "wip" };
    } else {
      return { ...post, status: "open" };
    }
  });

  const byStatus = (post) => {
    return (
      !post.extra.canceled &&
      ((isOrIsIn("open", status) ? post.status === "open" : false) ||
        (isOrIsIn("completed", status) ? post.status === "completed" : false) ||
        (isOrIsIn("wip", status) ? post.status === "wip" : false))
    );
  };

  const postsByStatus = annotatedPosts.filter(byStatus);

  const postsByProgram = postsByStatus.filter((post) => {
    return type
      ? isArray(type)
        ? post.taxonomies.grant_type.some((t) => type.includes(t))
        : post.taxonomies.grant_type.includes(type)
      : true;
  });

  const filteredPosts = postsByProgram.filter((post) => {
    return category
      ? isArray(category)
        ? post.taxonomies.grant_category.some((cat) => category.includes(cat))
        : post.taxonomies.grant_category.includes(category)
      : true;
  });

  const allCount = postsByStatus.length;

  const programCounts = postsByStatus.reduce((counts, post) => {
    let newCounts = { ...counts };
    post.taxonomies.grant_type.forEach((s) => {
      newCounts[s] = (newCounts[s] || 0) + 1;
    });
    return newCounts;
  }, {});

  const categoryCounts = postsByProgram.reduce((counts, post) => {
    let newCounts = { ...counts };
    post.taxonomies.grant_category.forEach((s) => {
      newCounts[s] = (newCounts[s] || 0) + 1;
    });
    return newCounts;
  }, {});

  const post = {
    title: "Grants",
    description: "Contribute to the Urbit project while earning address space.",
  };

  return (
    <Container>
      <Head>
        <title>{`${post.title} • urbit.org`}</title>
        {Meta(post)}
      </Head>
      <IntraNav />
      <Main className="text-primary" singleColumn>
        <section>
          <h1 className="h1 mt-12 mb-8 md:mt-16 md:mb-16 lg:mb-20">
            Grants Program
          </h1>
          <p className="h1">
            Earn a piece of the Urbit network by developing software, creating
            content, growing communities, and more.
          </p>
        </section>
        <Section divider={"border-primary"}>
          <h2 className="h2">Grant Types</h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
            style={{
              "--black": "#14140F",
              "--white": "#F8F8F8",
              "--gray": "#FFFFFF",
              "--tint": "#C8C8C8",
              "--lite": "#5A5A55",
              "--brite": "#14140F",
            }}
          >
            <IconCard
              title="Proposals"
              description="Have an idea? Send it to us, and we can approve you to be funded."
              href="/grants/proposals"
              label="Learn More"
              icon="Proposal"
            />
            <IconCard
              title="Bounties"
              description="Looking for work? Browse through opportunities offered by the Urbit Foundation or other organizations"
              href="/grants/bounties"
              label="Learn More"
              icon="Bounty"
            />
          </div>
        </Section>
        <div
          className="scroll-my-[2.75rem] md:scroll-my-[3.75rem]"
          id="view-grants"
        >
          <hr className="hr-horizontal border-primary" />
          <div className="flex flex-col md:flex-row">
            <div className="md:sticky top-12 md:top-16 py-5 md:py-8 overflow-x-hidden overflow-y-auto sidebar">
              <div className="flex flex-col min-h-full type-ui md:pr-5 space-y-5 md:border-r rounded-sm border-primary">
                <h3 className="font-semibold">Status:</h3>
                <section className="flex space-x-1.5 md:flex-col md:space-x-0 md:space-y-2.5 overflow-x-auto md:overflow-x-visible">
                  {["open", "wip", "completed"].map((s) => (
                    <button
                      className={classnames("btn w-min", {
                        "bg-primary hover:bg-secondary text-tertiary": isOrIsIn(
                          s,
                          status,
                        ),
                        "bg-tertiary hover:bg-secondary text-primary":
                          !isOrIsIn(s, status),
                      })}
                      onClick={() => changeStatus(s)}
                      key={s}
                    >
                      {statusLabel(s)}
                    </button>
                  ))}
                </section>
                <div>
                  <hr className="hr-horizontal border-primary my-2.5" />
                  <h3 className="font-semibold">Programs:</h3>
                </div>
                <section className="flex space-x-1.5 md:flex-col md:space-x-0 md:space-y-2.5 overflow-x-auto md:overflow-x-visible">
                  {Object.keys(programCounts)
                    .sort((s) => -programCounts[s])
                    .map((t) => (
                      <button
                        className={classnames("btn w-fit space-x-[0.25em]", {
                          "bg-primary hover:bg-secondary text-tertiary":
                            isOrIsIn(t, type),
                          "bg-tertiary hover:bg-secondary text-primary":
                            !isOrIsIn(t, type),
                        })}
                        onClick={() => push(pushOrDropQuery("type", type, t))}
                        key={t}
                      >
                        <span>{`${t}`}</span>
                        {["Bounty", "Proposal"].includes(t) && (
                          <Icon
                            className={classnames("h-[1em]", {
                              "bg-tertiary": isOrIsIn(t, type),
                              "bg-primary": !isOrIsIn(t, type),
                            })}
                            name={t}
                          />
                        )}
                        <span>{`(${programCounts[t]})`}</span>
                      </button>
                    ))}
                </section>
                <div>
                  <hr className="hr-horizontal border-primary my-2.5" />
                  <h3 className="font-semibold">Work categories:</h3>
                </div>
                <section className="flex space-x-1.5 md:flex-col md:space-x-0 md:space-y-2.5 overflow-x-auto md:overflow-x-visible">
                  {Object.keys(categoryCounts)
                    .sort((s) => -categoryCounts[s])
                    .map((c) => (
                      <button
                        className={classnames("btn w-min", {
                          "bg-primary hover:bg-secondary text-tertiary":
                            isOrIsIn(c, category),
                          "bg-tertiary hover:bg-secondary text-primary":
                            !isOrIsIn(c, category),
                        })}
                        onClick={() =>
                          push(pushOrDropQuery("category", category, c))
                        }
                        key={c}
                      >
                        {c}
                        <span className="ml-[0.25em]">{`(${categoryCounts[c]})`}</span>
                      </button>
                    ))}
                </section>
              </div>
            </div>
            <hr className="block md:hidden hr-horizontal border-primary" />
            <div className="flex flex-col flex-1 md:pl-5 space-y-5 py-5 md:py-8">
              <p className="text-secondary type-ui">
                Showing {filteredPosts.length} grants
                {allCount > filteredPosts.length && (
                  <>
                    {" "}
                    <button
                      className="text-primary"
                      onClick={() => {
                        push({ status: status });
                      }}
                    >
                      Clear filters
                    </button>
                  </>
                )}
              </p>
              {filteredPosts.map((grant) => (
                <GrantCard key={grant.slug} {...grant} />
              ))}
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const categories = getGrantsCategories();
  const types = getGrantsTypes();
  const basePath = path.join(process.cwd(), "content/grants");
  const years = fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((f) => f.isDirectory());
  const posts = years
    .map((year) => {
      return getAllPosts(
        ["title", "slug", "date", "description", "extra", "taxonomies"],
        `grants/${year.name}`,
        "date",
      );
    })
    .flat()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      posts: posts,
      categories,
      types,
    },
  };
}
