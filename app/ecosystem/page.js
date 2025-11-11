import React from "react";
import { getPostsTree, getYaml, getToml, getMarkdownContent } from "../lib/queries";
import { SidebarPositionSlot, SidebarSlot } from "../lib/layoutSlots";
import { SidebarElement } from "../components/SidebarElement";
import { EcosystemNav } from "../components/EcosystemNav";
import Link from "next/link";
import classNames from "classnames";
export default async function EcosystemHome() {
  // Load ecosystem config for sidebar position and navigation
  const ecosystemConfig = await getMarkdownContent("ecosystem/config.md");
  const sidebarPosition = ecosystemConfig.frontMatter?.sidebar_position || 'right';
  const sections = ecosystemConfig.frontMatter?.sections || [];

  const paths = {
    articles: { path: "ecosystem/articles", frontMatter: [] },
    orgs: { path: "ecosystem/orgs", frontMatter: [] },
  };

  // Load posts tree for each path
  await Promise.all(
    Object.keys(paths).map(async (key) => {
      const tree = await getPostsTree(paths[key].path);

      await Promise.all(
        tree.map(async (post) => {
          const frontMatter = await getToml(post.relativePath);
          paths[key].frontMatter.push({
            data: frontMatter.data,
            relativePath: post.relativePath,
            slug: post.slug,
          });
        })
      );
    })
  );

  const allArticlesFrontMatter = paths.articles.frontMatter;
  const allOrgsFrontMatter = paths.orgs.frontMatter;

  return (
    <div className="mb-32 mt-[55px]">
      {/* Set sidebar position */}
      <SidebarPositionSlot position={sidebarPosition} />

      {/* Sidebar navigation - renders in layout */}
      <SidebarSlot>
        <SidebarElement title="">
          <EcosystemNav sections={sections} />
        </SidebarElement>
      </SidebarSlot>

      <Section id="companies" className="mx-auto w-auto" title="Companies">
        {allOrgsFrontMatter.map((org, i) => {
          return (
            <Link
              href={org.data.URL}
              target="_blank"
              key={i}
              className="relative group max-h-12"
            >
              <div className="flex gap-x-4 md:gap-x-8 items-center py-2 md:py-4">
                {/* Light mode image; needs additional code for darkmode support */}
                <img
                  src={org.data.image}
                  className="w-12 h-12 md:w-16 md:h-16 group-hover:grayscale"
                  alt={org.data.title}
                />
                <h1 className="text-3xl md:text-6xl font-bold font-serif text-accent-1 group-hover:text-primary leading-8 tracking-tight">{org.data.title}</h1>
              </div>
            </Link>
          );
        })}
      </Section>

      <Section id="articles-press" className="container" title="Articles & Press">
        {allArticlesFrontMatter.map((article, i) => {
          return (
            <Link href={article.data.URL} key={i} target="_blank" className="group leading-[110%] cursor-pointer mb-4 flex flex-col">
              <div className="flex justify-between items-end">
                <h3 className="font-serif font-bold text-5xl text-accent-1 group-hover:text-primary">{article.data.publication}</h3>
                <div className="hidden flex items-end md:block">
                  <h3 className="text-right font-mono text-base text-contrast-2 group-hover:text-primary">{article.data.author}</h3>
                  <h3 className="text-right font-mono text-base text-contrast-2 group-hover:text-primary">{article.data.date}</h3>
                </div>
              </div>
              <h1 className="font-sans text-2xl text-primary group-hover:text-primary">{article.data.title}</h1>
              <div className="flex justify-between md:hidden">
                <h3 className="font-mono text-base text-contrast-2 group-hover:text-primary">{article.data.author}</h3>
                <h3 className="font-mono text-base text-contrast-2 group-hover:text-primary">{article.data.date}</h3>
              </div>
            </Link>
          );
        })}
      </Section>
    </div>
  );
}

export const Section = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className={`${className} pt-6 mb-4 gap-x-4 px-4 scroll-mt-[72px] md:scroll-mt-[100px]`}>
      <div className="mb-4">
        <h1 className="font-serif text-4xl font-[400] text-primary">{title}</h1>
      </div>
      <div className="">{children}</div>
    </section>
  );
};

export const ScrollSection = ({ children, title }) => {
  return (
    <section className="!pr-0 mb-12 md:mb-[4.375rem] overflow-x-auto ">
      <h1 className="container mb-[2.25rem]">{title}</h1>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex flex-row overflow-x-auto w-fit gap-[.3175rem] md:gap-[.625rem] ml-[calc(var(--gutter-size))] 3xl:ml-[calc(((100vw-1900px)/2)+2rem)]">
          {children}
        </div>
      </div>
    </section>
  );
};
