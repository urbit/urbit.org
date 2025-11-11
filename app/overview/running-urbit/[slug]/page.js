import React from "react";
import { getMarkdownContent } from "../../../lib/queries";
import { SidebarSlot, SidebarPositionSlot } from "../../../lib/layoutSlots";
import { OverviewNav } from "../../../components/OverviewNav";
import { SidebarElement } from "../../../components/SidebarElement";
import { ContentBlurb } from "../../../components/ContentBlurbs";
import { OverviewNavButtons } from "../../../components/OverviewNavButtons";
import { calculateOverviewNavigation } from "../../../lib/overviewNavigation";
import Markdoc from "@markdoc/markdoc";

export async function generateStaticParams() {
  // Get the config to know which sections exist
  const configData = await getMarkdownContent("overview/running-urbit/config.md");
  const sections = configData.frontMatter.sections || [];

  // Filter out 'intro' since it's handled by the landing page
  return sections
    .filter(slug => slug !== 'intro')
    .map((slug) => ({
      slug: slug,
    }));
}

export default async function RunningUrbitSection({ params }) {
  const { slug } = params;

  // Load the section content
  const sectionData = await getMarkdownContent(`overview/running-urbit/${slug}.md`);

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

  // Load blurbs if this section has any
  const blurbSlugs = sectionData.frontMatter.blurbs || [];
  const blurbsBySlug = {};

  for (const blurbSlug of blurbSlugs) {
    try {
      const blurbData = await getMarkdownContent(`blurbs/${blurbSlug}.md`, "toml");

      // Render the Markdoc content to React on the server
      const renderedContent = Markdoc.renderers.react(blurbData.content, React);

      // Serialize references to plain objects with descriptions
      const references = (blurbData.frontMatter.references || []).map(ref => ({
        title: ref.title,
        link: ref.link,
        description: ref.description || "",
      }));

      blurbsBySlug[blurbSlug] = {
        title: blurbData.frontMatter.title,
        description: blurbData.frontMatter.description,
        content: renderedContent,
        references,
        image: blurbData.frontMatter.image || "",
        imageDark: blurbData.frontMatter.imageDark || "",
        ctaButton: blurbData.frontMatter["call-to-action"] || null,
      };
    } catch (error) {
      console.error(`Error loading blurb ${blurbSlug}:`, error);
    }
  }

  // Load overview config for sidebar position
  const overviewConfig = await getMarkdownContent("overview/config.md");
  const sidebarPosition = overviewConfig.frontMatter?.sidebar_position || 'right';

  // Calculate navigation
  const navigation = calculateOverviewNavigation(
    'running-urbit',
    slug,
    urbitExplainedConfig,
    runningUrbitConfig
  );

  return (
    <div className="mx-4 md:mt-[55px]">
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
        <div className="max-w-[1080px]">
          <h1 className="text-6xl text-accent-1 font-serif font-tall leading-[120%] mb-4">
            {sectionData.frontMatter.title}
          </h1>
          <h3 className="text-3xl font-sans leading-[120%] mb-12">
            {sectionData.frontMatter.description}
          </h3>

          {/* Render intro content */}
          <article className="prose prose-invert max-w-none mb-8">
            {Markdoc.renderers.react(sectionData.content, React)}
          </article>

          {/* Render content blurbs */}
          {blurbSlugs.length > 0 && (
            <div className="space-y-12">
              {blurbSlugs.map((blurbSlug, idx) => {
                const blurb = blurbsBySlug[blurbSlug];
                if (!blurb) return null;
                return (
                  <ContentBlurb
                    key={idx}
                    title={blurb.title}
                    description={blurb.description}
                    content={blurb.content}
                    references={blurb.references}
                    image={blurb.image}
                    imageDark={blurb.imageDark}
                    ctaButton={blurb.ctaButton}
                  />
                );
              })}
            </div>
          )}

          <OverviewNavButtons
            prevPage={navigation.prevPage}
            nextPage={navigation.nextPage}
          />
        </div>
      </section>
    </div>
  );
}
