"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate, formatAuthors } from "../lib/utils";
import classNames from "classnames";
import Link from "next/link";

// Loader component to show while the page is waiting for the router
const Loader = () => <div>Loading...</div>;

const GrantListContent = ({
  allPostFrontMatter,
  statuses,
  programs,
  categories,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state based on URL parameters or default values
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || null
  );
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get("status") || "Open"
  );
  const [selectedProgram, setSelectedProgram] = useState(
    searchParams.get("program") || null
  );
  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || null
  );
  const [filteredSortedPosts, setFilteredSortedPosts] =
    useState(allPostFrontMatter);

  // const categoryList = categoryData;

  // Update the URL whenever filters or sorting change
  const updateUrlParams = (category, status, program, sort) => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (status) params.set("status", status);
    if (program) params.set("program", program);
    if (sort) params.set("sort", sort);

    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

  // Handle filtering and sorting logic within an effect
  useEffect(() => {
    let posts = [...allPostFrontMatter];

    
    if (selectedCategory) {
      posts = posts.filter((post) => {
        return post?.data?.taxonomies?.grant_category[0] === selectedCategory
      });
    }

    if (selectedStatus) {
      posts = posts.filter((post) => {
        let hasAssignee = post?.data?.extra?.assignee.length > 1 ? true : false;
        if (selectedStatus == "Open") {
          return post?.data?.extra?.completed == false && !hasAssignee;
        } else if (selectedStatus == "In Progress") {
          return post?.data?.extra?.completed == false && hasAssignee;
        } else {
          return post?.data.extra?.completed == true;
        }
      });
    }

    // Apply program filtering
    if (selectedProgram) {
      posts = posts.filter((post) => post?.data?.taxonomies?.grant_type[0] === selectedProgram);
    }


    // Update the filtered and sorted post list
    setFilteredSortedPosts(posts);

    // Update the URL whenever state changes
    updateUrlParams(
      selectedCategory,
      selectedStatus,
      selectedProgram,
      sortOption
    );
  }, [
    selectedCategory,
    selectedStatus,
    selectedProgram,
    sortOption,
    allPostFrontMatter,
  ]);

  // Filter by category handler
  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  // Filter by status handler
  const handleStatusClick = (status) => {
    setSelectedStatus((prevStatus) => (prevStatus === status ? null : status));
  };

  // Filter by program handler
  const handleProgramClick = (program) => {
    setSelectedProgram((prevProgram) =>
      prevProgram === program ? null : program
    );
  };

  const generateStatus = (grantData) => {
    let hasAssignee = grantData?.data?.extra?.assignee.length > 1;
    if (grantData?.data?.extra?.completed) {
      return "Completed";
    } else if (!grantData?.data?.extra?.completed && hasAssignee) {
      return "In Progress";
    } else {
      return "Open";
    }
  };

  // // Sort by option handler
  // const handleSortClick = (option) => {
  //   setSortOption((prevOption) => (prevOption === option ? null : option));
  // };

  return (
    <div className="grid md:grid-cols-6 w-full mb-[5rem]">
      <div className="col-span-6 md:col-span-1">
        {/* Filter Section */}
        <div className="md:mt-[0rem] flex flex-col font-[500] mb-12 md:mb-0">
          {/* Categoy Filter */}

          <span className={classNames(
            "text-gray-87 pt-4",
            { "text-white": selectedStatus })
          }>Status:</span>
          <div className={classNames(
            "flex flex-row flex-wrap gap-x-4 md:flex-col items-start text-gray-87 hover:text-gray-87",
            { "!text-gray-87": selectedStatus }
          )}>
            {statuses.map((status, index) => (
              <button
                key={index}
                className="link"
                onClick={() => handleStatusClick(status)}
              >
                <div
                  className={classNames({
                    "!text-white": selectedStatus === status,
                  })}
                >
                  <span>{status}</span>
                </div>
              </button>
            ))}
          </div>

          <span className={classNames(
            "text-gray-87 pt-4",
            { "text-white": selectedProgram }
          )}>Program:</span>
          <div className={classNames(
            "flex flex-row flex-wrap gap-x-4 md:flex-col items-start text-gray-87 hover:text-gray-87",
            { "!text-gray-87": selectedProgram }
          )}>
            {programs.map((program, index) => (
              <button
                key={index}
                className="link"
                onClick={() => handleProgramClick(program)}
              >
                <div
                  className={classNames({
                    "!text-white": selectedProgram === program,
                  })}
                >
                  <span>{program}</span>
                </div>
              </button>
            ))}
          </div>
          
          <span className={classNames(
            "text-gray-87 pt-4",
            { "text-white": selectedCategory }
          )}>Work Categories:</span>
          <div className={classNames(
            "flex flex-row flex-wrap  gap-x-4 md:flex-col items-start text-gray-87 hover:text-gray-87",
            { "!text-gray-87": selectedCategory }
          )}>
            {categories.map((category, index) => (
              <button
                key={index}
                className="link"
                onClick={() => handleCategoryClick(category)}
              >
                <div
                  className={classNames({
                    "!text-white": selectedCategory === category,
                  })}
                >
                  <span>{category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post List */}
      <div className="mb-4 mt-[.2em] flex flex-col col-span-5">
        <span className="leading-[1cap] mb-4">
          Showing {filteredSortedPosts.length} grants
        </span>
        {filteredSortedPosts.map((postData) => {
          const { title, date, extra, taxonomies } = postData.data;
          let reward;
          // reward = extra?.reward?.match(/\d+/)[0];
          const m = extra?.reward?.match(/(\d+)\s*star?/i);
          // console.log(extra?.reward)
          if(m !== null && m.length > 0) {
            reward = m[1];
            if(extra?.reward.length > 12) {
              reward = undefined
            }
          }
          
          // console.log('reward', reward)
          if(reward !== undefined ){
            reward = reward;
          } else {
            reward = 0;
          }
          // console.log(title, reward);
          // console.log(postData.data)
          return (
            <React.Fragment key={postData.relativePath}>
              <Link
                href={postData.relativePath}
                data-category={taxonomies?.grant_type}
                className="pt-[10px] pb-[10px] px-[9px] bg-gray-d9 text-black text-xlarge group rounded-[5px] mb-2 hover:text-gray-87 font-[400]"
              >
                <div className={classNames("leading-[120%] ")}>
                  <div>{title}</div>
                  <div className="flex flex-col">
                    <div className="flex flex-row text-gray-87">
                      Reward:
                      <div className="flex flex-row flex-wrap ml-[.2em]">
                        {[...Array(Number(reward))].map((_, i) => (
                          <div key={i}></div>
                        ))}
                        {reward == 0 && <div>{extra?.reward}</div>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classNames("mb-10 mt-8")}>
                  {extra?.description}
                </div>
                <div
                  className={classNames(
                    "text-gray-87 !text-large mt-6 flex gap-x-1"
                  )}
                >
                  <span className="bg-black text-white !font-[600] rounded-[5px] px-[6px] py-[2px]">
                    {generateStatus(postData)}
                  </span>
                  {taxonomies?.grant_type && (
                    <span className="bg-gray-87 text-black rounded-[5px] px-[6px] py-[2px]">
                      {taxonomies?.grant_type}
                    </span>
                  )}
                </div>
              </Link>
              {/* <div className="border-b-[.7px] border-white w-full"></div> */}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const GrantList = ({
  allPostFrontMatter,
  categoryData,
  statuses,
  programs,
  categories,
}) => {
  return (
    <Suspense fallback={<Loader />}>
      <GrantListContent
        allPostFrontMatter={allPostFrontMatter}
        categoryData={categoryData}
        statuses={statuses}
        programs={programs}
        categories={categories}
      />
    </Suspense>
  );
};
