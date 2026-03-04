"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getVisibleAnchorElement } from "../lib/anchorScroll";
import { useLayoutSlots } from "../lib/layoutSlots";

/**
 * EcosystemNav - Sidebar navigation for ecosystem page sections
 *
 * Displays clickable section items that scroll to the corresponding section.
 * Uses scroll-spy to highlight the active section based on scroll position.
 *
 * @param {Array} sections - Array of section objects with {id, title}
 */
export function EcosystemNav({ sections = [] }) {
  const [activeSection, setActiveSection] = useState("");
  const { setSidebarVisible } = useLayoutSlots();
  const pathname = usePathname();

  // Ensure sidebar is visible on pages without hero
  useEffect(() => {
    setSidebarVisible(true);
  }, [setSidebarVisible]);

  const handleSectionClick = (sectionId) => {
    const element = getVisibleAnchorElement(sectionId);
    if (!element) {
      console.warn(`Anchor not found for ecosystem section: ${sectionId}`);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? 90 : 100;
    const rect = element.getBoundingClientRect();
    const targetPosition = rect.top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  // Scroll-spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 90 : 100;
      let currentSection = "";

      // Find active section based on scroll position
      for (const section of sections) {
        const element = getVisibleAnchorElement(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInRange = rect.top <= offset && rect.bottom >= offset;

          // Check if section is near the top of the viewport
          if (isInRange) {
            currentSection = section.id;
            break;
          }
        }
      }

      // Fallback: find the first visible section if none are at offset
      if (!currentSection) {
        for (const section of sections) {
          const element = getVisibleAnchorElement(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            // Check if any part of the section is visible in viewport
            if (rect.top < viewportHeight && rect.bottom > 0) {
              currentSection = section.id;
              break;
            }
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", scrollListener);
  }, [sections, activeSection]);

  return (
    <nav className="flex flex-col gap-2">
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            data-umami-event={`nav-ecosystem-section-${section.id}`}
            data-umami-event-label={section.title}
            data-umami-event-context={pathname}
            data-umami-event-variant="sidebar"
            className={`font-sans text-left text-2xl font-[400] transition-colors ${
              isActive ? "text-primary" : "text-contrast-2 hover:text-contrast-3"
            }`}
          >
            {section.title}
          </button>
        );
      })}
    </nav>
  );
}
