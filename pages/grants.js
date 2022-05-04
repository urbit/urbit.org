import Head from "next/head";
import { TableOfContents } from "../components/TableOfContents";
import Meta from "../components/Meta";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import classnames from "classnames";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SingleColumn from "../components/SingleColumn";
import Section from "../components/Section";
import PostPreview from "../components/PostPreview";
import GrantPreview from "../components/GrantPreview";
import JoinGroup from "../components/JoinGroup";
import {
  getAllPosts,
  getGrantsCategories,
  getGrantsTypes,
  getPostBySlug,
} from "../lib/lib";

function addTag(array, tag) {
  return [...array, tag];
}

function removeTag(array, tag) {
  const location = array.indexOf(tag);
  if (location === -1) {
    return array;
  }
  const newArr = [...array];
  newArr.splice(location, 1);
  return newArr;
}

function setAllActive(fullSet) {
  return fullSet;
}

function setAllInactive() {
  return [];
}

function setOneTagOnly(tag) {
  return [tag];
}

function toggleTag(array, tag) {
  if (array.includes(tag)) {
    return removeTag(array, tag);
  } else {
    return addTag(array, tag);
  }
}

function toggleAll(currentArray, fullSet) {
  if (currentArray.length === 0) {
    return setAllActive(fullSet);
  } else {
    return setAllInactive();
  }
}

export default function Grants({
  posts,
  categories,
  types,
  featuredGrants,
  search,
  giftPosts,
  gifts,
}) {
  const router = useRouter();
  const [activeTags, setTags] = useState([]);
  const [activeTypes, setTypes] = useState(types);
  const includeOpen =
    router.query.open === undefined || router.query.open === "true";
  const includeCompleted = router.query.completed === "true";
  const programFilter = router.query.program;
  const post = {
    title: "Grants",
    description: "Contribute to the Urbit project while earning address space.",
  };

  let includeInProgress =
    router.query.wip === undefined || router.query.wip === "true";

  if (
    router.query.open === undefined &&
    router.query.completed === undefined &&
    router.query.wip === undefined
  ) {
    includeInProgress = true;
  }

  const annotatedPosts = posts.map((post) => {
    if (post.extra.canceled) {
      return { ...post, status: "canceled" };
    } else if (post.extra.completed) {
      return { ...post, status: "completed" };
    } else if (post.extra.assignee && post.extra.assignee.length > 0) {
      return { ...post, status: "wip" };
    } else {
      return { ...post, status: "open" };
    }
  });

  const byStatus = (post) => {
    return (
      (includeOpen ? post.status === "open" : false) ||
      (includeCompleted ? post.status === "completed" : false) ||
      (includeInProgress ? post.status === "wip" : false)
    );
  };

  const postsByStatus = annotatedPosts.filter(byStatus);

  const filteredPosts = annotatedPosts.filter((post) => {
    // Posts are returned if they match both the selected category and selected tags, or if the user has no category filters set.
    const hasCategory = post.taxonomies.grant_category.some((category) =>
      activeTags.includes(category)
    );

    const notCanceled = !post.extra.canceled;

    const noTagsSelected = activeTags.length === 0;
    const hasType = post.taxonomies.grant_type.some((type) =>
      activeTypes.includes(type)
    );

    return (
      (hasCategory || noTagsSelected) &&
      byStatus(post) &&
      hasType &&
      notCanceled
    );
  });

  const allCount = postsByStatus.length;

  const counts = {
    Bounty: postsByStatus.filter((post) =>
      post.taxonomies.grant_type.includes("Bounty")
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
        {Meta(post)}
      </Head>
      <SingleColumn>
        <Header search={search} />
        {
          // Heading and Introduction
        }
        <Section wide>
          <div className="flex flex-column justify-between pb-16">
            <div className="measure">
              <h1 className="pb-16">Grants</h1>
              <p className="mb-8 lead">
                The Urbit Foundation's Grants program is one of our primary
                mechanisms for distributing address space to the creators and
                builders out there that help Urbit to succeed.
              </p>
              <p className="lead mb-8">
                Read on to learn more about the various types of grants we
                issue, get started on your own grant, and view past and present
                grants that have been funded.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <Link href="#grant-types">
              <button className="button-lg bg-blue-400 text-white mr-2">
                Learn More
              </button>
            </Link>
            <Link href="#join-community">
              <button className="button-lg bg-black text-white mr-2">
                Join the Community
              </button>
            </Link>
            <Link href="#view-grants">
              <button className="button-lg bg-wall-400 text-white mr-2">
                View Grants
              </button>
            </Link>
          </div>
        </Section>
        {
          // Grants Programs
        }
        <Section wide short>
          <div className="flex flex-column justify-between pb-12">
            <div className="measure">
              <h2 id="grant-types" className="pb-12">
                Grant types
              </h2>
              <p className="mb-8">
                The Urbit Foundation provides three different kinds of grants.
                No matter what kind of grant you're working on, you'll receive
                lots of support from the Foundation and a helpful, enthusiastic
                community.
              </p>
              {/* Proposals */}
              <p className="mb-4">
                <b>Proposals</b> are for receiving funding for your project
                &mdash; we fund all kinds projects, not strictly technical ones,
                so don't hesitate to pitch your idea!
              </p>
              <Link href="/grants/proposals">
                <button className="button-sm bg-blue-400 text-white mb-8">
                  Submit a Proposal
                </button>
              </Link>

              {/* Apprenticeships */}
              <p className="mb-4">
                <b>Apprenticeships</b> are practical learning opportunities for
                new Urbit developers provided by members of the Urbit community.
                They're one of the best ways to level up your skills, and often
                lead to full-time jobs.
              </p>
              <Link href="/grants/apprenticeships">
                <button className="button-sm bg-green-400 text-white mb-8">
                  Become an Apprentice
                </button>
              </Link>

              {/* Bounties */}
              <p className="mb-4">
                <b>Bounties</b> are contracts for work provided by either the
                Urbit Foundation or from trusted partners in our ecosystem.
              </p>
              <div className="flex flex-wrap">
                <Link href="/grants/bounties#post-a-bounty">
                  <button className="button-sm bg-yellow-300 text-black mr-2">
                    Post a Bounty
                  </button>
                </Link>
                <Link href="/grants/bounties">
                  <button className="button-sm bg-wall-400 text-white">
                    Learn more
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Section>

        <Section wide short>
          <div className="flex flex-column justify-between">
            <div className="measure">
              <h2 id="join-community" className="pb-12">
                Community
              </h2>
              <p className="mb-4">
                We believe that grants are more successful when tackled with the
                support of a community, and community starts with individual
                relationships.
              </p>
              <ul className="mb-4">
                <li>
                  <p>
                    <Link href="/grants/proposals">Proposals</Link> are approved
                    and stewarded by past grant workers
                  </p>
                </li>
                <li>
                  <p>
                    <Link href="/grants/bounties">Bounties</Link> are overseen
                    by those that post them
                  </p>
                </li>
                <li>
                  <p>
                    <Link href="/grants/apprenticeships">Apprenticeships</Link>{" "}
                    are largely about building a relationship between apprentice
                    and mentor
                  </p>
                </li>
              </ul>

              <p className="mb-8">
                Whether you're gearing up to submit your proposal or just
                thinking about it, the best way to get started is to join the
                Foundation group on Urbit:
              </p>

              <JoinGroup
                emphasize
                className="mb-8"
                groupName="~wolref-podlex/foundation"
              />

              <p>
                If you're not on the network, reach out to us at{" "}
                <a href="mailto:grants@urbit.org">grants@urbit.org</a> and we'll
                get back to you within a couple of days.
              </p>
            </div>
          </div>
        </Section>

        {/*  View Grants */}
        <Section wide>
          <h2 id="view-grants" className="pb-8">
            View Grants
          </h2>
          <h5 className="text-wall-600 font-semibold my-2">Programs</h5>
          <div className="flex flex-wrap items-center pb-2">
            <button
              onClick={() => {
                let query = { ...router.query };
                delete query.program;
                router.push(
                  {
                    pathname: "/grants",
                    query: { ...query },
                  },
                  "",
                  { scroll: false }
                );
                setTypes(types);
              }}
              className={`badge-lg my-2 mr-2 ${
                programFilter === undefined
                  ? "text-white bg-black"
                  : "text-wall-500 bg-wall-100"
              }`}
            >
              All <div className="opacity-50 ml-2">{allCount}</div>
            </button>
            {types.map((type) => {
              const className = classnames({
                "bg-blue-400 text-white":
                  programFilter === "proposal" && type === "Proposal",
                "bg-green-400 text-white":
                  programFilter === "apprenticeship" &&
                  type === "Apprenticeship",
                "bg-yellow-300":
                  programFilter === "bounty" && type === "Bounty",
                "bg-wall-100 text-wall-500": type !== programFilter,
              });
              return (
                <button
                  onClick={() => {
                    // + 1 is added here because the 'all' button precedes this sequence
                    router.push(
                      {
                        pathname: "/grants",
                        query: { ...router.query, program: type.toLowerCase() },
                      },
                      "",
                      { scroll: false }
                    );
                    setTypes([type]);
                  }}
                  className={`badge-lg mr-2 ${className}`}
                >
                  {type} <div className="opacity-50 ml-2">{counts[type]}</div>
                </button>
              );
            })}
          </div>
          <h5 className="text-wall-600 font-semibold my-2">Work Categories</h5>
          <div className="flex flex-wrap mb-12">
            {categories.map((category) => {
              const isActive = activeTags.includes(category);
              const activeClasses = classnames({
                "bg-green-400 text-white": isActive,
                "bg-wall-100 text-wall-500": !isActive,
              });
              return (
                <button
                  onClick={() => setTags(toggleTag(activeTags, category))}
                  className={`${activeClasses} badge-sm mr-1 my-1`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          {
            <div className="pb-8 flex items-center">
              <button
                className="mr-4 badge-sm bg-black text-white"
                onClick={() =>
                  router.push(
                    {
                      pathname: "/grants",
                      query: { ...router.query, open: !includeOpen },
                    },
                    "",
                    { scroll: false }
                  )
                }
              >
                {includeOpen ? "Exclude Open" : "Include Open"}
              </button>

              <button
                className="mr-4 badge-sm bg-black text-white"
                onClick={() =>
                  router.push(
                    {
                      pathname: "/grants",
                      query: { ...router.query, completed: !includeCompleted },
                    },
                    "",
                    { scroll: false }
                  )
                }
              >
                {includeCompleted ? "Exclude Completed" : "Include Completed"}
              </button>

              <button
                className="mr-4 badge-sm bg-black text-white"
                onClick={() =>
                  router.push(
                    {
                      pathname: "/grants",
                      query: { ...router.query, wip: !includeInProgress },
                    },
                    "",
                    { scroll: false }
                  )
                }
              >
                {includeInProgress
                  ? "Exclude In Progress"
                  : "Include In Progress"}
              </button>

              <h4>
                Showing {filteredPosts.length} grant
                {filteredPosts.length === 1 ? "" : "s"}
              </h4>
            </div>
          }
          {filteredPosts.map((post) => {
            return <GrantPreview grant={post} />;
          })}
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}

export async function getStaticProps() {
  const categories = getGrantsCategories();
  const types = getGrantsTypes();
  const posts = getAllPosts(
    ["title", "slug", "date", "description", "extra", "taxonomies"],
    "grants",
    "date"
  );

  // The layout expects exactly 3
  const featuredGrants = [
    "bitcoin-full-node-provider-and-wallet",
    "webrtc-gall-agent-and-external-app",
    "urbian-a-customized-linux-distribution-for-urbit-appliances",
  ].map((slug) =>
    getPostBySlug(slug, ["title", "slug", "date", "extra"], "grants")
  );

  const giftPosts = [
    getPostBySlug(
      "2021-06-16-update",
      ["title", "slug", "date", "extra"],
      "updates"
    ),
    getPostBySlug("gifts-q3-2020", ["title", "slug", "date", "extra"], "blog"),
  ];

  return {
    props: {
      posts: posts,
      categories,
      types,
      featuredGrants,
      giftPosts,
      gifts: [],
    },
  };
}
