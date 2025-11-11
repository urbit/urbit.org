"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * HomepageAccordion - Mobile accordion view for homepage sections
 *
 * Displays sections as collapsible accordions, each containing their section blurb and subsection blurbs.
 * Only one section can be expanded at a time.
 *
 * @param {Array} sections - Array of section objects with sectionBlurb and subsectionBlurbSlugs
 * @param {Object} blurbsBySlug - Object mapping blurb slugs to blurb data
 */
export function HomepageAccordion({ sections = [], blurbsBySlug = {} }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => {
        const isExpanded = expandedSection === section.id;
        const sectionBlurb = section.sectionBlurb;
        if (!sectionBlurb) return null;

        return (
          <div key={section.id} className="border-b border-gray-87">
            {/* Section Header - Clickable */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full text-left py-4 flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <h2 className="text-xl font-serif font-[600] mb-1">{sectionBlurb.title}</h2>
                <p className="text-sm text-gray-87 line-clamp-2">{sectionBlurb.description}</p>
              </div>
              <div className="flex-shrink-0 mt-1">
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Expanded Content - Section Blurb + Subsection Blurbs */}
            {isExpanded && (
              <div className="pb-6 animate-fadeIn">
                {/* Section-level blurb content */}
                <div className="mb-8">
                  <article className="prose prose-sm max-w-none text-gray-87 mb-4">
                    {sectionBlurb.content}
                  </article>

                  {/* Section-level references */}
                  {sectionBlurb.references && sectionBlurb.references.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sectionBlurb.references.map((link, idx) => {
                        const isExternal = link.link.startsWith("http");
                        return (
                          <Link
                            key={idx}
                            href={link.link}
                            className="text-sm text-primary hover:underline"
                            {...(isExternal && {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            })}
                          >
                            {link.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* Section-level CTA */}
                  {sectionBlurb.ctaButton && sectionBlurb.ctaButton.label && sectionBlurb.ctaButton.link && (
                    <Link
                      href={sectionBlurb.ctaButton.link}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-[600]
                        bg-primary text-secondary border-2 border-secondary rounded-lg
                        hover:bg-secondary hover:text-primary transition-colors"
                      {...(sectionBlurb.ctaButton.link.startsWith("http") && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {sectionBlurb.ctaButton.label}
                    </Link>
                  )}
                </div>

                {/* Subsection-level blurbs */}
                <div className="flex flex-col gap-8">
                  {section.subsectionBlurbSlugs.map((blurbSlug) => {
                    const blurb = blurbsBySlug[blurbSlug];
                    if (!blurb) return null;

                    return (
                      <div key={blurb.id} className="border-t border-gray-87/30 pt-6">
                        <h3 className="text-large font-[600] mb-2">{blurb.title}</h3>
                        <p className="text-base text-gray-87 mb-4">
                          {blurb.description}
                        </p>

                        {/* Subsection content */}
                        <article className="prose prose-sm max-w-none text-gray-87 mb-4">
                          {blurb.content}
                        </article>

                        {/* Subsection references */}
                        {blurb.references && blurb.references.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blurb.references.map((link, idx) => {
                              const isExternal = link.link.startsWith("http");
                              return (
                                <Link
                                  key={idx}
                                  href={link.link}
                                  className="text-sm text-primary hover:underline"
                                  {...(isExternal && {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  })}
                                >
                                  {link.title}
                                </Link>
                              );
                            })}
                          </div>
                        )}

                        {/* Subsection CTA */}
                        {blurb.ctaButton && blurb.ctaButton.label && blurb.ctaButton.link && (
                          <Link
                            href={blurb.ctaButton.link}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-[600]
                              bg-primary text-secondary border-2 border-secondary rounded-lg
                              hover:bg-secondary hover:text-primary transition-colors"
                            {...(blurb.ctaButton.link.startsWith("http") && {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            })}
                          >
                            {blurb.ctaButton.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
