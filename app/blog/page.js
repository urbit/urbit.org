import React from "react";
import { getPostsTree, getToml, getMarkdownContent } from "../lib/queries";
import { SidebarPositionSlot, SidebarSlot } from "../lib/layoutSlots";
import { SidebarElement } from "../components/SidebarElement";
import { BlogNav } from "../components/BlogNav";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "../lib/utils";

export default async function BlogHome() {
  // Load blog config for sidebar position
  const blogConfig = await getMarkdownContent("blog/config.md");
  const sidebarPosition = blogConfig.frontMatter?.sidebar_position || 'right';

  const posts = await getPostsTree("blog/");

  // Filter out config files and non-blog-post files
  const blogPosts = posts.filter(post => {
    // Exclude config.md and any other config files
    const fileName = post.relativePath.split('/').pop();
    return fileName !== 'config.md' && !fileName.startsWith('_');
  });

  const allPostFrontMatter = [];
  await Promise.all(
    blogPosts.map(async (post) => {
      const frontmatter = await getToml(post.relativePath);
      allPostFrontMatter.push({
        data: frontmatter.data,
        relativePath: post.relativePath,
        slug: post.slug,
      });
    })
  );

  // Filter out posts with invalid dates and add validation warnings
  const validPosts = allPostFrontMatter.filter(post => {
    const date = post.data.date;
    if (!date) {
      console.warn(`⚠️  Blog post missing date field: ${post.relativePath}`);
      return false;
    }

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.warn(`⚠️  Blog post has invalid date: ${post.relativePath} (date: ${date})`);
      return false;
    }

    return true;
  });

  validPosts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  // Group posts by year
  const yearGroups = validPosts.reduce((groups, post) => {
    const year = new Date(post.data.date).getFullYear().toString();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(post);
    return groups;
  }, {});

  // Create navigation sections (sorted newest first)
  const yearSections = Object.keys(yearGroups)
    .sort((a, b) => b - a)
    .map(year => ({
      id: year,
      title: year,
      count: yearGroups[year].length
    }));

  return (
    <div className="md:mx-4 md:mt-[55px]">
      {/* Set sidebar position */}
      <SidebarPositionSlot position={sidebarPosition} />

      {/* Sidebar navigation */}
      <SidebarSlot>
        <SidebarElement title="">
          <BlogNav sections={yearSections} />
        </SidebarElement>
      </SidebarSlot>

      <img src="/icons/digi-logo-1.svg" className="hidden md:block pb-4" />
      <div className="mb-32 text-xlarge gap-y-2 leading-[100%] max-w-[1200px] mx-auto">
        {Object.entries(yearGroups)
          .sort(([yearA], [yearB]) => yearB - yearA)
          .map(([year, posts]) => (
            <section key={year} id={year} className="scroll-mt-[72px] md:scroll-mt-[100px]">
              {/* Year header */}
              {/* <h2 className="text-secondary text-4xl font-serif mb-8 px-4">{year}</h2> */}

              {/* Posts for this year */}
              {posts.map((post) => {
                const { title, date, description, aliases, extra } = post.data;

                return (
                  <Link
                    href={"/blog/" + post.slug}
                    key={post.slug}
                    className="w-full group"
                  >
                    <div className="py-4 flex flex-col leading-[120%]">
                      <div className="px-2">
                        <div className="flex flex-row gap-x-4 justify-between">
                          <div className="font-bold font-serif text-5xl text-accent-1 group-hover:text-primary md:mb-2">{title}</div>
                          <div className="flex flex-col">
                            {extra && (extra.author || extra.ship) && (
                              <div className="hidden md:flex flex-col font-mono text-right text-base items-end min-w-[160px] text-contrast-2 group-hover:text-primary">
                                {extra.ship ? (
                                  <div>{extra.ship}</div>
                                ) : (
                                  extra.author && <div>{extra.author}</div>
                                )}
                                {date && <div>{date}</div>}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="font-sans md:mb-0 text-2xl text-primary group-hover:text-primary line-clamp-3">{description}</div>
                      </div>
                      {/* <div className="font-mono flex md:hidden flex-col justify-between"> */}
                      {/*   <div className="">{extra.author}</div> */}
                      {/*   <div>{extra.ship}</div> */}
                      {/* </div> */}
                      {/* <div className="text-gray-87 mb-2">{formatDate(date)}</div> */}
                      {extra?.image && (
                        <div className="xl:w-auto w-full relative mb-2 md:mb-0">
                          <img className="aspect-[21/9] object-cover w-full h-36 xl:w-auto xl:h-full" loading="lazy" src={extra.image} alt={title} />
                        </div>
                      )}
                      {extra?.tags && extra.tags.length > 0 && (
                        <div className="hidden md:block font-mono flex gap-8 overflow-x-auto whitespace-nowrap scrollbar-hide snap-x snap-mandatory">
                          {extra.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-contrast-2 px-4 py-1 text-xs md:text-sm flex-shrink-0 group-hover:text-primary"
                            >{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </section>
          ))}
      </div>
    </div>
  );
}
