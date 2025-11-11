import React from "react";
import { getMarkdownContent } from "../../lib/queries";
import { SidebarSlot, SidebarPositionSlot } from "../../lib/layoutSlots";
import { OverviewNav } from "../../components/OverviewNav";
import { SidebarElement } from "../../components/SidebarElement";
import { OverviewNavButtons } from "../../components/OverviewNavButtons";
import { calculateOverviewNavigation } from "../../lib/overviewNavigation";
import Markdoc from "@markdoc/markdoc";

export default async function UrbitExplained() {
  // Load intro section
  const introData = await getMarkdownContent("overview/urbit-explained/intro.md");

  // Load both config files for navigation
  const urbitExplainedConfig = await getMarkdownContent("overview/urbit-explained/config.md");
  const runningUrbitConfig = await getMarkdownContent("overview/running-urbit/config.md");

  const urbitExplainedSections = (urbitExplainedConfig.frontMatter.sections || []).map(slug => ({
    slug,
  }));

  const runningUrbitSections = (runningUrbitConfig.frontMatter.sections || []).map(slug => ({
    slug,
  }));

  // Load section titles for navigation
  for (const section of urbitExplainedSections) {
    try {
      const data = await getMarkdownContent(`overview/urbit-explained/${section.slug}.md`);
      section.title = data.frontMatter.title;
    } catch (error) {
      console.error(`Error loading section ${section.slug}:`, error);
    }
  }

  for (const section of runningUrbitSections) {
    try {
      const data = await getMarkdownContent(`overview/running-urbit/${section.slug}.md`);
      section.title = data.frontMatter.title;
    } catch (error) {
      console.error(`Error loading section ${section.slug}:`, error);
    }
  }

  // Load overview config for sidebar position
  const overviewConfig = await getMarkdownContent("overview/config.md");
  const sidebarPosition = overviewConfig.frontMatter?.sidebar_position || 'right';

  // Calculate navigation
  const navigation = calculateOverviewNavigation(
    'urbit-explained',
    null, // intro page
    urbitExplainedConfig,
    runningUrbitConfig
  );

  return (
    <div className="mx-4 mt-[55px]">
      {/* Set sidebar position */}
      <SidebarPositionSlot position={sidebarPosition} />

      {/* Sidebar slot - renders in layout */}
      <SidebarSlot>
        <SidebarElement title="">
          <OverviewNav
            urbitExplainedSections={urbitExplainedSections}
            runningUrbitSections={runningUrbitSections}
          />
        </SidebarElement>
      </SidebarSlot>

      {/* Main content */}
      <img src="/icons/digi-logo-1.svg" className="hidden md:block pb-4" />
      <section className="mt-[8rem] md:mt-[6rem] mb-32 md:mx-auto">
        <div className="max-w-[1200px]">
          <h1 className="text-6xl text-accent-1 font-serif font-tall leading-[120%] mb-4">
            {urbitExplainedConfig.frontMatter.title}
          </h1>
          <h3 className="text-3xl font-sans leading-[120%] mb-12">
            {urbitExplainedConfig.frontMatter.description}
          </h3>
          <article>
            {Markdoc.renderers.react(introData.content, React)}
          </article>

          <OverviewNavButtons
            prevPage={navigation.prevPage}
            nextPage={navigation.nextPage}
          />
        </div>
      </section>
    </div>
  );
}
