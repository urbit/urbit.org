"use client";

import { useState } from "react";
import { useLayoutSlots } from "../lib/layoutSlots";
import { HeaderNav } from "./HeaderNav";
import { FooterSection, FooterExpansion } from "./FooterSection";

/**
 * LayoutFrame - Client component that renders the frame with hero/sidebar slots
 *
 * Split from layout.js to allow server-side generateMetadata export
 */
export function LayoutFrame({ children, nav, homepage, footerData, mobileNav, announcements, urbitExplainedSections, runningUrbitSections }) {
  const { hero, sidebar, sidebarPosition, sidebarVisible, sidebarTransitionsEnabled } = useLayoutSlots();
  const [expansionHeight, setExpansionHeight] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);

  // Separate resources and socials from footerData for FooterExpansion
  const resources = footerData?.find(col => col.column_label === "resources");
  const socials = footerData?.find(col => col.column_label === "socials");

  return (
    <>
      {/* Mobile View - No Frame */}
      <div className="md:hidden min-h-screen flex flex-col">
        <HeaderNav
          nav={nav}
          homepage={homepage}
          mobileNav={mobileNav}
          announcements={announcements}
          urbitExplainedSections={urbitExplainedSections}
          runningUrbitSections={runningUrbitSections}
        />

        {/* Optional Hero - Mobile */}
        {hero && <div className="w-full">{hero}</div>}

        <div className="flex-grow mt-[var(--header-height)] z-0">{children}</div>
        <FooterSection footerData={footerData} />
      </div>

      {/* Desktop View - With Frame */}
      <div className="hidden md:flex relative w-full min-h-screen">
        {/* Left Border */}
        <div className="fixed left-0 top-0 h-screen w-[16px] z-50 pointer-events-none bg-contrast-1">
          <svg className="absolute top-0 right-[-0.5px] w-full h-full" preserveAspectRatio="none" style={{ display: 'block' }}>
            <line x1="100%" y1="0" x2="100%" y2="100%" stroke="var(--foreground)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        {/* Top Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 flex gap-0 pointer-events-auto">
          <div className="flex items-stretch flex-1">
            <div className="h-[32px] w-[32px] flex-shrink-0">
              <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: 'block' }} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 6">
                  <path id="Vector" d="M0.000748293 -1.39818e-06L0.000746894 31.9854L15.9868 31.9854C15.9868 23.1461 23.1566 15.9793 32.0007 15.9793L32.0007 0L0.000748293 -1.39818e-06Z" fill="var(--contrast-1)" />
                  <path d="M15.9868 31.9854C15.9868 23.1461 23.1566 15.9793 32.0007 15.9793" fill="none" stroke="var(--foreground)" strokeWidth="1" />
                </g>
              </svg>
            </div>
            <div className="h-[16px] bg-contrast-1 flex-1 relative">
              <svg className="absolute bottom-[-0.5px] left-0 w-full h-full" preserveAspectRatio="none" style={{ display: 'block' }}>
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="var(--foreground)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
          <div className="h-[51px] w-[48px] flex-shrink-0 ml-[-0.5px]">
            <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: 'block' }} viewBox="0 0 48 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="a">
                <path id="Vector" d="M0 0V16C7.93522 16 15.3464 19.8762 19.8611 26.3744L27.4669 37.3205C31.9816 43.82 39.3941 48 48 48V0H0Z" fill="var(--contrast-1)" />
                <path d="M0 16C7.93522 16 15.3464 19.8762 19.8611 26.3744L27.4669 37.3205C31.9816 43.82 39.3941 48 48 48" fill="none" stroke="var(--foreground)" strokeWidth="1" />
              </g>
            </svg>
          </div>
          <div className="flex items-stretch ml-[-0.5px]">
            <div className="h-[48px] bg-contrast-1 flex items-center relative">
              <svg className="absolute bottom-[-0.5px] left-0 w-full h-full pointer-events-none" preserveAspectRatio="none" style={{ display: 'block' }}>
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="var(--foreground)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
              <HeaderNav nav={nav} homepage={homepage} inFrame={true} />
            </div>
            <div className="h-[55px] w-[23px] flex-shrink-0 ml-[-0.5px]">
              <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: 'block' }} viewBox="0 0 23 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="a" clipPath="url(#clip0_218_191_top)">
                  <path id="Vector" d="M23 0H7.55972e-09L0 48C4.02181 48 7 50.9795 7 55L23 55V0Z" fill="var(--contrast-1)" />
                  <path d="M0 48C4.02181 48 7 50.9795 7 55" fill="none" stroke="var(--foreground)" strokeWidth="1" />
                </g>
                <defs>
                  <clipPath id="clip0_218_191_top">
                    <rect width="23" height="55" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar - grows to include expansion */}
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-col pointer-events-auto transition-all duration-300"
        >
          {/* Footer Bar Row (top row when expansion is open) */}
          <div className="flex gap-0 items-end">
            <div className="flex flex-1 items-end">
              <div className="h-[32px] w-[32px] flex-shrink-0">
                <div className="rotate-[-90deg] w-[32px] h-[32px]">
                  <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: 'block' }} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 7">
                      <path id="Vector" d="M9.97943e-05 -0.000745489L9.83955e-05 31.9846L15.9861 31.9846C15.9861 23.1453 23.1559 15.9786 32.0001 15.9786L32.0001 -0.000744091L9.97943e-05 -0.000745489Z" fill="var(--contrast-1)" />
                      <path d="M16 32C16 23.1453 23.1559 16 32 16" fill="none" stroke="var(--foreground)" strokeWidth="1" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="h-[16px] bg-contrast-1 flex-1 items-end relative">
                <svg className="absolute top-[-0.5px] left-0 w-full h-full" preserveAspectRatio="none" style={{ display: 'block' }}>
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="var(--foreground)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </div>
            <div className="h-[51px] w-[48px] flex-shrink-0 ml-[-0.5px]">
              <div className="w-full h-full scale-y-[-1]">
                <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: 'block' }} viewBox="0 0 48 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="a">
                    <path
                      id="Vector"
                      d="M0 0V16C7.93522 16 15.3464 19.8762 19.8611 26.3744L27.4669 37.3205C31.9816 43.82 39.3941 48 48 48V0H0Z"
                      fill="var(--contrast-1)"
                    />
                    <path
                      d="M0 16C7.93522 16 15.3464 19.8762 19.8611 26.3744L27.4669 37.3205C31.9816 43.82 39.3941 48 48 48"
                      fill="none"
                      stroke="var(--foreground)"
                      strokeWidth="1"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div className="flex items-end flex-shrink-0 ml-[-0.5px]">
              <div className="h-[48px] bg-contrast-1 flex items-center relative">
                <svg className="absolute top-[-0.5px] left-0 w-full h-full pointer-events-none" preserveAspectRatio="none" style={{ display: 'block' }}>
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="var(--foreground)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                </svg>
                <FooterSection
                  footerData={footerData}
                  onExpansionHeightChange={setExpansionHeight}
                  expandedSection={expandedSection}
                  setExpandedSection={setExpandedSection}
                />
              </div>
              <div className="h-[55px] w-[23px] flex-shrink-0 ml-[-0.5px]">
                <div className="w-full h-full scale-y-[-1]">
                  <svg preserveAspectRatio="none" width="100%" height="100%" overflow="visible" style={{ display: 'block' }} viewBox="0 0 23 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="a" clipPath="url(#clip0_218_191)">
                      <path
                        id="Vector"
                        d="M23 0H7.55972e-09L0 48C4.02181 48 7 50.9795 7 55L23 55V0Z"
                        fill="var(--contrast-1)"
                      />
                      <path
                        d="M0 48C4.02181 48 7 50.9795 7 55"
                        fill="none"
                        stroke="var(--foreground)"
                        strokeWidth="1"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_218_191">
                        <rect width="23" height="55" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Expansion Row (bottom row - only visible when expanded) */}
          <div className="hidden md:block xl:hidden">
            <FooterExpansion
              isOpen={expandedSection === 'resources'}
              type="resources"
              footerData={resources}
              onClose={() => setExpandedSection(null)}
              onHeightChange={setExpansionHeight}
            />
            <FooterExpansion
              isOpen={expandedSection === 'contact'}
              type="contact"
              footerData={socials}
              onClose={() => setExpandedSection(null)}
              onHeightChange={setExpansionHeight}
            />
          </div>
        </div>

        {/* Content wrapper - ensures proper flow */}
        <div className="flex-1 flex flex-col">
          {/* Optional Hero Slot - Full viewport width, in document flow */}
          {hero && (
            <div className="w-full">
              {hero}
            </div>
          )}

          {/* Main Content Area */}
          <div className={`relative z-10 flex-1 px-4 ${hero ? 'md:-mt-[300px]' : ''}`}>
            {/* Main content - centered, with conditional padding for sidebar safe zone */}
            <main className={`max-w-[1200px] mx-auto pb-[55px] pt-[55px] md:pt-0 md:px-4 ${sidebar
              ? sidebarPosition === 'left'
                ? 'md:pl-[305px] lg:pl-[395px] xl:pl-[405px]'
                : 'md:pr-[240px] lg:pr-[285px] xl:pr-[405px]'
              : ''
              }`}>
              {children}
            </main>
          </div>
        </div>

        {/* Sidebar - fixed positioning, outside content flow */}
        {sidebar && (
          <aside
            className={`fixed ${sidebarPosition === 'left'
              ? 'left-[32px] md:left-[max(32px,calc((100vw-1200px)/2-300px))] lg:left-[max(32px,calc((100vw-1200px)/2-240px))] xl:left-[max(32px,calc((100vw-1200px)/2-80px))]'
              : 'right-[32px]'
              } top-[16px] md:py-12 md:w-[220px] lg:w-[260px] xl:w-[400px] ${sidebarVisible ? 'z-30' : 'z-0'} overflow-y-auto scrollbar-hide ${sidebarTransitionsEnabled ? 'transition-opacity duration-300' : ''} ${sidebarVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ maxHeight: `calc(100vh - ${expansionHeight}px)` }}
          >
            {sidebar}
          </aside>
        )}

        {/* Right Border */}
        <div
          className="fixed right-0 top-[55px] h-screen w-[16px] z-40 pointer-events-none bg-contrast-1 transition-all duration-300"
          style={{ bottom: `${55 || expansionHeight}px` }}
        >
          <svg className="absolute top-0 left-[-0.5px] w-full h-full" preserveAspectRatio="none" style={{ display: 'block' }}>
            <line x1="0" y1="0" x2="0" y2="100%" stroke="var(--foreground)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
    </>
  );
}
