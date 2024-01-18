import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import fs from "fs";
import path from "path";
import {
  Container,
  Main,
  Sidebar,
  Icon,
  getAllPosts,
} from "@urbit/fdn-design-system";
import IntraNav from "@/components/IntraNav";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import { getGrantsCategories, getGrantsTypes } from "@/lib/lib";

function isArray(arr) {
  return Array.isArray(arr);
}

function isOrIsIn(type, query) {
  if (!query) {
    return false;
  }
  return isArray(query) ? query.includes(type) : type === query;
}

function GrantCard({ title, date, taxonomies, extra, slug }) {
  return (
    <Link
      className="flex flex-col space-y-8 w-full bg-tint rounded-lg p-4"
      href={path.join("/grants", slug)}
    >
      <div className="h2 flex justify-between">
        <div>
          <h2 className="text-lite">{title}</h2>
          <p className="text-brite">Reward: {extra.reward}</p>
        </div>
        {new Set(["Bounty", "Proposal", "Apprenticeship"]).has(
          taxonomies.grant_type[0]
        ) && (
          <div className="flex items-center justify-center h-[1.1em] aspect-square bg-brite rounded-lg ml-3.5">
            <Icon
              className="h-4/6 bg-gray"
              name={taxonomies.grant_type[0]}
              weight="medium"
            />
          </div>
        )}
      </div>
      {extra.description && (
        <p className="body-md text-lite my-8">{extra.description}</p>
      )}
      <div className="flex flex-wrap body-md space-x-3.5">
        {taxonomies.grant_type.map((s) => (
          <span className="btn text-tint bg-gray">{s}</span>
        ))}
        {taxonomies.grant_category.map((s) => (
          <span className="btn text-tint bg-gray">{s}</span>
        ))}
      </div>
    </Link>
  );
}

export default function Grants({ posts, categories, types }) {
  const [catF, setCatF] = useState(new Set());
  const [typeF, setTypeF] = useState(new Set());

  const clearF = (setF) => setF(new Set());
  const clearCatF = () => clearF(setCatF);
  const clearTypeF = () => clearF(setTypeF);

  const toggleF = (setF, currF, s) => {
    if (currF.has(s)) {
      const currFCopy = new Set(currF);
      currFCopy.delete(s);
      setF(currFCopy);
    } else {
      setF(new Set(currF).add(s));
    }
  };
  const toggleCatF = (s) => toggleF(setCatF, catF, s);
  const toggleTypeF = (s) => toggleF(setTypeF, typeF, s);

  const applyFilters = () => {
    let filteredPosts = [...posts];

    if (catF.size !== 0) {
      filteredPosts = filteredPosts.filter((grant) =>
        new Set(grant.taxonomies.grant_category.map((c) => catF.has(c))).has(
          true
        )
      );
    }

    if (typeF.size !== 0) {
      filteredPosts = filteredPosts.filter((grant) =>
        new Set(grant.taxonomies.grant_type.map((t) => typeF.has(t))).has(true)
      );
    }

    return filteredPosts;
  };

  const filteredPosts = applyFilters();

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
      <Main
        className="text-brite border-brite space-y-5 md:space-y-8"
        singleColumn
      >
        <section>
          <h1 className="h1 mt-12 mb-8 md:mt-16 md:mb-16 lg:mb-20">
            Grants Program
          </h1>
          <p className="h1">
            The Urbit Foundation's Grants program is one of our primary
            mechanisms for distributing address space to creators and
            developers.
          </p>
        </section>
        <hr className="hr-horizontal border-brite" />
        <div className="flex flex-row">
          <Sidebar
            className="flex flex-col sidebar body-md space-y-5 pr-5"
            left
          >
            <h3 className="text-gray">Programs:</h3>
            <section className="flex flex-col space-y-3.5">
              {types.map((type) => (
                <button
                  className={classnames("btn w-min", {
                    "btn-dark": typeF.has(type),
                    "btn-light": !typeF.has(type),
                  })}
                  onClick={() => toggleTypeF(type)}
                >
                  {type}
                </button>
              ))}
            </section>
            <div>
              <hr className="hr-horizontal border-gray my-2.5" />
              <h3 className="text-gray">Work categories:</h3>
            </div>
            <section className="flex flex-col space-y-3.5">
              {categories.map((cat) => (
                <button
                  className={classnames("btn w-min", {
                    "btn-dark": catF.has(cat),
                    "btn-light": !catF.has(cat),
                  })}
                  onClick={() => toggleCatF(cat)}
                >
                  {cat}
                </button>
              ))}
            </section>
          </Sidebar>
          <div className="flex flex-col flex-1 pl-5 space-y-5">
            <p className="text-gray body-md">
              Showing {filteredPosts.length} grants
              {posts.length > filteredPosts.length && (
                <>
                  {" "}
                  <button
                    className="text-brite"
                    onClick={() => {
                      clearCatF();
                      clearTypeF();
                    }}
                  >
                    Clear filters
                  </button>
                </>
              )}
            </p>
            {filteredPosts.map((grant) => (
              <GrantCard {...grant} />
            ))}
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
        "date"
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
