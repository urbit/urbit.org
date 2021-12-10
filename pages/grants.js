import Head from "next/head";
import { TableOfContents } from "../components/TableOfContents";
import Meta from "../components/Meta";
import Link from "next/link";
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
  const [activeTags, setTags] = useState([]);
  const [activeTypes, setTypes] = useState(types);
  const [includeOpen, setIncludeOpen] = useState(true);
  const [includeCompleted, setIncludeCompleted] = useState(false);
  const [includeInProgress, setIncludeInProgress] = useState(true);
  const [tab, setTab] = useState(0);
  const post = {
    title: "Grants",
    description: "Contribute to the Urbit project while earning address space.",
  };

  const annotatedPosts = posts.map((post) => {
    if (post.extra.completed) {
      return { ...post, status: "completed" };
    } else if (post.extra.assignee && post.extra.assignee.length > 0) {
      return { ...post, status: "wip" };
    } else {
      return { ...post, status: "open" };
    }
  });

  const byStatus = (post) => {
    return (
      (!post.extra.canceled &&
        (includeOpen ? post.status === "open" : false)) ||
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
              <p className="mb-4">
                <b>Proposals</b> are for receiving funding for your project
                &mdash; we fund all kinds projects, not strictly technical ones,
                so don't hesitate to pitch your idea!
              </p>
              <Link href="/grants/proposals">
                <button className="button-sm bg-blue-400 text-white mr-2 mb-8">
                  Submit a Proposal
                </button>
              </Link>

              <p className="mb-4">
                <b>Bounties</b> are contracts for work from trusted partners in
                our ecosystem. The Urbit Foundation matches contributors with
                projects, verifies the integrity of the poster, and will often
                chip in on the funding.
              </p>
              <Link href="/grants/bounties">
                <button className="button-sm bg-yellow-300 text-black mb-8">
                  Post a Bounty
                </button>
              </Link>

              <p className="mb-4">
                <b>Apprenticeships</b> are opportunities to receive mentorship
                from an experienced Urbit developer. These don't pay as well,
                but are generally the best way to land a full-time job in Urbit
                development
              </p>
              <Link href="/grants/apprenticeships">
                <button className="button-sm bg-green-400 text-white">
                  Apply for an Apprenticeship
                </button>
              </Link>
            </div>
          </div>
        </Section>

        <Section wide short>
          <div className="flex flex-column justify-between">
            <div className="measure">
              <h2 id="join-community" className="pb-12">
                Join the Community
              </h2>
              <p className="mb-4">
                The community on the Urbit network itself is a great resource.
                You can ask us questions directly there, find teammates to work
                on your project with, and browse a huge list of project ideas if
                you're looking for inspiration.
              </p>

              <p className="mb-8">Join the group here:</p>

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
                setTab(0);
                setTypes(types);
              }}
              className={`badge-lg my-2 mr-2 ${
                tab === 0 ? "text-white bg-black" : "text-wall-500 bg-wall-100"
              }`}
            >
              All <div className="opacity-50 ml-2">{allCount}</div>
            </button>
            {types.map((type, index) => {
              const className = classnames({
                "bg-blue-400 text-white":
                  tab === index + 1 && type === "Proposal",
                "bg-green-400 text-white":
                  tab === index + 1 && type === "Apprenticeship",
                "bg-yellow-300": tab === index + 1 && type === "Bounty",
                "bg-wall-100 text-wall-500": tab !== index + 1,
              });
              return (
                <button
                  onClick={() => {
                    // + 1 is added here because the 'all' button precedes this sequence
                    setTab(index + 1);
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
                onClick={() => setIncludeOpen(!includeOpen)}
              >
                {includeOpen ? "Exclude Open" : "Include Open"}
              </button>

              <button
                className="mr-4 badge-sm bg-black text-white"
                onClick={() => setIncludeCompleted(!includeCompleted)}
              >
                {includeCompleted ? "Exclude Completed" : "Include Completed"}
              </button>

              <button
                className="mr-4 badge-sm bg-black text-white"
                onClick={() => setIncludeInProgress(!includeInProgress)}
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
    "grants"
  );
  // all the gift posts stuff can be removed once we migrate to gifts
  // let giftPosts = getAllPosts(
  //   ["title", "slug", "date", "description", "extra", "taxonomies"],
  //   "blog"
  // );
  // giftPosts.map((e) => (e.section = "blog"));
  let updates = getAllPosts(
    ["title", "slug", "date", "description", "extra", "taxonomies"],
    "updates"
  );
  // updates.map((e) => (e.section = "updates"));
  // giftPosts.push(...updates);
  // giftPosts = giftPosts
  //   .filter((e) => e?.taxonomies?.grant_type?.includes("Gift"))
  //   .sort((a, b) => (a.date > b.date ? -1 : 1));

  // const gifts = getAllPosts(["name", "planet", "date", "link"], "gifts");

  // The layout expects exactly 3
  const featuredGrants = [
    "bitcoin-full-node-provider-and-wallet",
    "webrtc-gall-agent-and-external-app",
    "urbian-a-customized-linux-distribution-for-urbit-appliances",
  ].map((slug) =>
    getPostBySlug(slug, ["title", "slug", "date", "extra"], "grants")
  );

  // Layout expects exactly 2
  // const giftPosts = [
  //   "2021-06-16-update",
  //   "gifts-q3-2020",
  // ].map((slug) =>
  //   getPostBySlug(slug, ["title", "slug", "date", "extra"], "blog")
  // );

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
