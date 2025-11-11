import React from "react";
import { getMarkdownContent, getSectionContent } from "./lib/queries";
import { HeroSlot, SidebarSlot, SidebarPositionSlot } from "./lib/layoutSlots";
import { HeroSection } from "./components/HeroSection";
import { HomepageSectionNav } from "./components/HomepageSectionNav";
import { HomepageBlurb, PreviewContentBlurb, MicroBlurb, ContentBlurb } from "./components/ContentBlurbs";
import { HomepageSubsection } from "./components/HomepageSubsection";
import { MobileFloatingNav } from "./components/MobileFloatingNav";
import Markdoc from "@markdoc/markdoc";

export default async function HomePage() {
  // Load homepage configuration
  const configData = await getMarkdownContent("homepage/config.md");
  const hero = configData.frontMatter.hero || {};
  const configSections = configData.frontMatter.sections || [];
  const sidebarPosition = configData.frontMatter?.sidebar_position || 'left';
  const sidebarBlurbSlug = configData.frontMatter?.sidebar_blurb || null;

  // Build sections array with full data
  const sections = [];

  // Load all blurbs (both section-level and subsection-level)
  const blurbsBySlug = {};

  const loadBlurb = async (blurbSlug) => {
    if (!blurbsBySlug[blurbSlug]) {
      try {
        const blurbData = await getMarkdownContent(`blurbs/${blurbSlug}.md`, "toml");
        const renderedContent = Markdoc.renderers.react(blurbData.content, React);

        blurbsBySlug[blurbSlug] = {
          id: blurbSlug,
          title: blurbData.frontMatter.title,
          description: blurbData.frontMatter.description,
          content: renderedContent,
          image: blurbData.frontMatter.image || "",
          imageDark: blurbData.frontMatter.imageDark || "",
          references: (blurbData.frontMatter.references || []).map(ref => ({
            title: ref.title,
            link: ref.link,
            description: ref.description || "",
          })),
          ctaButton: blurbData.frontMatter["call-to-action"] || null,
        };
      } catch (error) {
        console.error(`Error loading blurb ${blurbSlug}:`, error);
      }
    }
  };

  // Load sidebar blurb if specified
  if (sidebarBlurbSlug) {
    await loadBlurb(sidebarBlurbSlug);
  }

  // Load all blurbs for all sections
  for (const configSection of configSections) {
    const sectionId = configSection["section-id"];
    const sectionBlurbSlug = configSection["section-blurb"];
    const subsectionBlurbSlugs = configSection["subsection-blurbs"] || [];

    // Load section-level blurb
    if (sectionBlurbSlug) {
      await loadBlurb(sectionBlurbSlug);
    }

    // Load all subsection-level blurbs
    for (const blurbSlug of subsectionBlurbSlugs) {
      await loadBlurb(blurbSlug);
    }

    // Build section object
    const sectionBlurb = blurbsBySlug[sectionBlurbSlug];
    sections.push({
      id: sectionId,
      sectionBlurb: sectionBlurb,
      subsectionBlurbSlugs: subsectionBlurbSlugs,
    });
  }

  // Serialize sections for client components (nav needs id and subsection labels)
  const navSections = sections.map(({ id, sectionBlurb, subsectionBlurbSlugs }) => ({
    id,
    title: sectionBlurb?.title || "",
    label: sectionBlurb?.title || "",
    description: sectionBlurb?.description || "",
    subsections: subsectionBlurbSlugs.map(slug => {
      const blurb = blurbsBySlug[slug];
      return blurb ? { id: slug, label: blurb.title } : null;
    }).filter(Boolean)
  }));

  // Build flat list of all mobile anchors (sections + subsections) in document order
  const mobileAnchors = sections.flatMap(({ id, sectionBlurb, subsectionBlurbSlugs }) => {
    const anchors = [];

    // Add section anchor
    if (sectionBlurb) {
      anchors.push({
        id: `mobile-${id}`,
        label: sectionBlurb.title || ""
      });
    }

    // Add all subsection anchors for this section
    subsectionBlurbSlugs.forEach(slug => {
      const blurb = blurbsBySlug[slug];
      if (blurb) {
        anchors.push({
          id: `mobile-${slug}`,
          label: blurb.title || ""
        });
      }
    });

    return anchors;
  });

  return (
    <div>
      {/* Hero Section - Full viewport width via layout slot */}
      <HeroSlot>
        <HeroSection hero={hero} />
      </HeroSlot>

      {/* Set sidebar position */}
      <SidebarPositionSlot position={sidebarPosition} />

      {/* Desktop Sidebar Navigation - renders in FrameLayout */}
      <SidebarSlot>
        <HomepageSectionNav
          sections={navSections}
          sidebarBlurb={sidebarBlurbSlug ? blurbsBySlug[sidebarBlurbSlug] : null}
        />
      </SidebarSlot>

      {/* Desktop Main Content */}
      <div className="hidden md:block">
        {sections.map((section) => {
          const sectionBlurb = section.sectionBlurb;
          if (!sectionBlurb) return null;

          return (
            <section key={section.id} id={section.id} className="mb-16 scroll-mt-[72px] md:scroll-mt-[80px]">
              <div className="border-t border-contrast-2">
              </div>

              {/* Render section-level blurb */}
              <HomepageBlurb
                id={sectionBlurb.id}
                title={sectionBlurb.title}
                description={sectionBlurb.description}
                content={sectionBlurb.content}
                image={sectionBlurb.image}
                imageDark={sectionBlurb.imageDark}
                references={sectionBlurb.references}
                ctaButton={sectionBlurb.ctaButton}
              />

              {/* Render subsection-level blurbs */}
              <div className="space-y-16 mt-16 pl-4">
                {section.subsectionBlurbSlugs.map((blurbSlug) => {
                  const blurb = blurbsBySlug[blurbSlug];
                  if (!blurb) return null;

                  return (
                    <PreviewContentBlurb
                      key={blurb.id}
                      id={blurb.id}
                      title={blurb.title}
                      description={blurb.description}
                      content={blurb.content}
                      image={blurb.image}
                      imageDark={blurb.imageDark}
                      references={blurb.references}
                      ctaButton={blurb.ctaButton}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Mobile Content Layout */}
      <div className="block md:hidden">
        <div className="container mx-auto pb-16 px-4">
          {/* Sidebar blurb at top on mobile */}
          {sidebarBlurbSlug && blurbsBySlug[sidebarBlurbSlug] && (
            <div className="mb-12 pt-8">
              <ContentBlurb
                id={blurbsBySlug[sidebarBlurbSlug].id}
                title={blurbsBySlug[sidebarBlurbSlug].title}
                description={blurbsBySlug[sidebarBlurbSlug].description}
                content={blurbsBySlug[sidebarBlurbSlug].content}
                image={blurbsBySlug[sidebarBlurbSlug].image}
                imageDark={blurbsBySlug[sidebarBlurbSlug].imageDark}
                references={blurbsBySlug[sidebarBlurbSlug].references}
                ctaButton={blurbsBySlug[sidebarBlurbSlug].ctaButton}
              />
            </div>
          )}

          {/* Sections and subsections */}
          {sections.map((section) => {
            const sectionBlurb = section.sectionBlurb;
            if (!sectionBlurb) return null;

            return (
              <section key={section.id} id={`mobile-${section.id}`} className="mb-12 scroll-mt-[72px]">
                {/* Section divider */}
                <div className="border-t border-contrast-2 mb-8"></div>

                {/* Section-level blurb */}
                <HomepageBlurb
                  id={sectionBlurb.id}
                  title={sectionBlurb.title}
                  description={sectionBlurb.description}
                  content={sectionBlurb.content}
                  image={sectionBlurb.image}
                  imageDark={sectionBlurb.imageDark}
                  references={sectionBlurb.references}
                  ctaButton={sectionBlurb.ctaButton}
                />

                {/* Subsection-level blurbs */}
                <div className="space-y-8 mt-8">
                  {section.subsectionBlurbSlugs.map((blurbSlug, index) => {
                    const blurb = blurbsBySlug[blurbSlug];
                    if (!blurb) return null;

                    // Use PreviewContentBlurb for all subsections to maintain visual consistency
                    const usePreview = true;

                    return usePreview ? (
                      <PreviewContentBlurb
                        key={blurb.id}
                        id={`mobile-${blurb.id}`}
                        title={blurb.title}
                        description={blurb.description}
                        content={blurb.content}
                        image={blurb.image}
                        imageDark={blurb.imageDark}
                        references={blurb.references}
                        ctaButton={blurb.ctaButton}
                      />
                    ) : (
                      <MicroBlurb
                        key={blurb.id}
                        id={`mobile-${blurb.id}`}
                        title={blurb.title}
                        description={blurb.description}
                        content={blurb.content}
                        image={blurb.image}
                        imageDark={blurb.imageDark}
                        references={blurb.references}
                        ctaButton={blurb.ctaButton}
                        showFullContent={false}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Mobile Floating Navigation */}
        <MobileFloatingNav anchors={mobileAnchors} heroHeight={800} />
      </div>
    </div>
  );
}
