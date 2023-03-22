import Head from "next/head";
import Meta from "../components/Meta";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Container,
  SingleColumn,
  Section,
  IntraNav,
  getAllPosts,
} from "@urbit/foundation-design-system";
import Footer from "../components/Footer";
import Header from "../components/Header";
import GrantPreview from "../components/GrantPreview";
import JoinGroup from "../components/JoinGroup";
import omit from "lodash.omit";
import { getGrantsCategories, getGrantsTypes } from "../lib/lib";
import fs from 'fs';
import { join } from 'path';

function isArray(arr) {
  return Array.isArray(arr);
}

function isOrIsIn(type, query) {
  if (!query) {
    return false;
  }
  return isArray(query) ? query.includes(type) : type === query;
}

export default function Grants({ posts, categories, types, search }) {
  const router = useRouter();
  let { status, type, category } = router.query;
  if (status === undefined) {
    status = ["open", "wip"];
  }

  function push(toQuery) {
    router.push(
      {
        pathname: "/grants",
        hash: "view-grants",
        query: toQuery,
      },
      "",
      { scroll: false }
    );
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
      (isOrIsIn("open", status) ? post.status === "open" : false) ||
        (isOrIsIn("complete", status) ? post.status === "completed" : false) ||
        (isOrIsIn("wip", status) ? post.status === "wip" : false)
    );
  };

  const postsByStatus = annotatedPosts.filter(byStatus);

  const filteredPosts = postsByStatus.filter((post) => {
    const hasCategory = category
          ? isArray(category)
          ? post.taxonomies.grant_category.some((cat) => category.includes(cat))
          : post.taxonomies.grant_category.includes(category)
          : true;

    const notCanceled = !post.extra.canceled;
    const hasType = type ? post.taxonomies.grant_type.includes(type) : true;
    return hasCategory && notCanceled && hasType;
  });

  const allCount = postsByStatus.length;

  const counts = {
    Bounty: postsByStatus.filter((post) =>
      post.taxonomies.grant_type.includes("Bounty")
    ).length,
    RFP: postsByStatus.filter((post) =>
      post.taxonomies.grant_type.includes("RFP")
    ).length,
    Apprenticeship: postsByStatus.filter((post) =>
      post.taxonomies.grant_type.includes("Apprenticeship")
    ).length,
    Proposal: postsByStatus.filter((post) =>
      post.taxonomies.grant_type.includes("Proposal")
    ).length,
  };

  return (
    <Container>
      <Head>
        <title>Grants • urbit.org</title>
        {Meta({
          title: "Grants",
          description:
          "Contribute to the Urbit project while earning address space.",
        })}
      </Head>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <SingleColumn>
        <Header search={search} />
        {
          // Heading and Introduction
        }
        <Section wide>
          <h1 className="pb-16">Grants Program</h1>
          <p className="mb-8 lead">
            The Urbit Foundation's Grants program is one of our primary
            mechanisms for distributing address space to creators and
            developers.
          </p>
        </Section>
        {
          // Grants Programs
        }
        <Section wide short>
          <div className="b-12">
            <h2 id="grant-types" className="pb-12">
              Grant types
            </h2>

            <div className="flex flex-column flex-wrap md:flex-nowrap grid-cols-2 gap-x-12  pb-12">
              <div className="md:basis-1/2">
                {/* Proposals */}
                <h3>Proposals</h3>
                <p className="mb-4">
                  Proposals are the main way to get funding for your project. We
                  fund all kinds projects, not strictly technical ones, so don't
                  hesitate to pitch your idea!
                </p>
                <div className="flex flex-wrap mb-8">
                  <Link href="/grants/proposals" passHref>
                    <a className="button-sm bg-blue-400 text-white mb-8 max-w-fit mr-2">
                      Submit a Proposal
                    </a>
                  </Link>
                  <Link href="/grants?program=rfps&type=RFP#view-grants" passHref>
                    <a className="button-sm bg-purple text-white mb-8 max-w-fit">
                      Get Ideas
                    </a>
                  </Link>
                </div>

                {/* Apprenticeships */}
                <h3>Apprenticeships</h3>
                <p className="mb-4">
                  Apprenticeships are practical learning opportunities for new
                  Urbit developers provided by members of the Urbit community.
                  They're one of the best ways to level up your skills and often
                  lead to full-time jobs.
                </p>
                <Link href="/grants/apprenticeships" passHref>
                  <a className="button-sm bg-green-400 text-white mb-8 max-w-fit">
                    Become an Apprentice
                  </a>
                </Link>
              </div>

              <div className="md:basis-1/2">
                {/* Bounties */}
                <h3>Bounties</h3>
                <p className="mb-4">
                  Bounties are contracts for work provided by either the Urbit
                  Foundation or from trusted partners in our ecosystem.
                </p>
                <div className="flex flex-wrap mb-8">
                  <Link href="/grants/bounties#post-a-bounty" passHref>
                    <a className="button-sm bg-yellow-300 text-black mr-2 max-w-fit">
                      Post a Bounty
                    </a>
                  </Link>
                  <Link href="/grants/bounties" passHref>
                    <a className="button-sm bg-wall-400 text-white max-w-fit">
                      Learn more
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section wide short>
          <h2 id="join-community" className="pb-12">
            Community
          </h2>

          <div className="flex flex-column flex-wrap md:flex-nowrap grid-cols-2 gap-x-12  pb-12">
            <div className="md:basis-1/2">
              <p className="mb-4">
                We believe that grants are more successful when tackled with the
                support of a community, and community starts with individual
                relationships.
              </p>
              <ul className="mb-4">
                <li className="mb-2">
                  <p>
                    <Link href="/grants/proposals">Proposals</Link> are approved
                    and stewarded by past grant workers.
                  </p>
                </li>
                <li className="mb-2">
                  <p>
                    <Link href="/grants/bounties">Bounties</Link> are overseen
                    by those that post them.
                  </p>
                </li>
                <li className="mb-2">
                  <p>
                    <Link href="/grants/rfps">RFPs</Link>{" "}
                    are suitable for people experienced with hoon development but who need some ideas on what to work on.
                  </p>
                </li>
                <li className="mb-2">
                  <p>
                    <Link href="/grants/apprenticeships">Apprenticeships</Link>{" "}
                    are largely about building a relationship between apprentice
                    and mentor.
                  </p>
                </li>
              </ul>
            </div>

            <div className="md:basis-1/2">
              <p className="mb-8">
                Whether you're gearing up to submit your proposal or just
                thinking about it, the best way to get started is to join the <Link href="/groups/~halbex-palheb/uf-public">Urbit Foundation</Link> group, ask questions there or come find our grants office hours in the group.
              </p>
              <p className="mb-8">
                Feel free to contact <a href="/ids/~poldec-tonteg">~poldec-tonteg</a> with general questions or <a href="/ids/~marfun-pacpet">~marfun-pacpet</a> regarding administrative matters.
              </p>
              <p className="mb-8">
                <h4>Approval</h4>
              </p>
              <p className="mb-8">Grant applications and proposals are approved on a bi-weekly basis.  The next deadlines are <b>March 14th & 28th</b>.
              </p>
            </div>
          </div>
        </Section>

        {/* Grants */}
        <Section wide>
          <h2 id="view-grants" className="pb-8">
            Grants
          </h2>
          <h5 className="text-wall-600 font-semibold my-2">Programs</h5>
          <div className="flex flex-wrap items-center pb-2">
            <a
              className={`badge-lg mr-2 ${!type ? "bg-black text-white" : "bg-wall-100 text-wall-500"
                }`}
              onClick={() => push((({ type, ...obj }) => obj)(router.query))}
            >
              All <div className="opacity-50 ml-2">{allCount}</div>
            </a>
            {types.map((each) => {
              let activeBg;
              switch (each) {
              case "Proposal":
                activeBg = "bg-blue-400 text-white";
                break;
              case "Bounty":
                activeBg = "bg-yellow-300 text-white";
                break;
              case "RFP":
                activeBg = "bg-purple-400 text-white";
                break;
              case "Apprenticeship":
                activeBg = "bg-green-400 text-white";
                break;
              default:
                activeBg = "bg-black";
              }
              return (
                <a
                  className={`badge-lg mr-2 ${isOrIsIn(each, type)
                    ? activeBg
                    : "bg-wall-100 text-wall-500"
                    }`}
                  onClick={() => push({ ...router.query, type: each })}
                >
                  {each}
                  <div className="opacity-50 ml-2">{counts[each]}</div>
                </a>
              );
            })}
          </div>
          <h5 className="text-wall-600 font-semibold my-2">Work Categories</h5>
          <div className="flex flex-wrap mb-12">
            {categories.map((each) => {
              const active = isOrIsIn(each, category)
                    ? "bg-green-400 text-white"
                    : "bg-wall-100 text-wall-500";
              const categoryQuery = pushOrDropQuery("category", category, each);
              return (
                <button
                  className={`${active} badge-sm mr-1 my-1`}
                  onClick={() => push(categoryQuery)}
                >
                  {each}
                </button>
              );
            })}
          </div>
          <div className="pb-8 flex items-center">
            {["open", "complete", "wip"].map((each) => {
              let title;
              switch (each) {
              case "open":
                title = isOrIsIn(each, status)
                  ? "Exclude Open"
                  : "Include Open";
                break;
              case "complete":
                title = isOrIsIn(each, status)
                  ? "Exclude Completed"
                  : "Include Completed";
                break;
              case "wip":
                title = isOrIsIn(each, status)
                  ? "Exclude In Progress"
                  : "Include In Progress";
              }
              const statusQuery = pushOrDropQuery("status", status, each);
              return (
                <button
                  className="mr-4 badge-sm bg-black text-white"
                  onClick={() => push(statusQuery)}
                >
                  {title}
                </button>
              );
            })}
            <h4>
              Showing {filteredPosts.length} grant
              {filteredPosts.length === 1 ? "" : "s"}
            </h4>
          </div>
          {filteredPosts.map((post) => (
            <GrantPreview grant={post} />
          ))}
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const categories = getGrantsCategories();
  const types = getGrantsTypes();
  const basePath = join(process.cwd(), 'content/grants')
  const years = fs.readdirSync(basePath, { 'withFileTypes': true }).filter((f) => f.isDirectory());
  const posts = years.map((year) => {
    return getAllPosts(
      ["title", "slug", "date", "description", "extra", "taxonomies"],
      `grants/${year.name}`,
      "date"
    )
  }).flat()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      posts: posts,
      categories,
      types,
    },
  };
}
