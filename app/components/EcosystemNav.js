"use client";

import { useState, useEffect } from "react";
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

  // Ensure sidebar is visible on pages without hero
  useEffect(() => {
    setSidebarVisible(true);
  }, [setSidebarVisible]);

  const handleSectionClick = (sectionId) => {
    // Find the visible element (not the first one which might be hidden)
    const getVisibleElement = (id) => {
      const escapedId = CSS.escape(id);
      const elements = document.querySelectorAll(`#${escapedId}`);
      return Array.from(elements).find(el => el.getBoundingClientRect().height > 0) || null;
    };

    const element = getVisibleElement(sectionId);
    if (!element) {
      return;
    }

    // Responsive offset: 72px mobile, 100px desktop
    const isMobile = window.innerWidth < 768; // md breakpoint
    const offset = isMobile ? 72 : 100;

    const rect = element.getBoundingClientRect();
    const targetPosition = rect.top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  };

  // Scroll-spy to track active section
  useEffect(() => {
    const handleScroll = () => {
      // Responsive offset: 72px mobile, 100px desktop (matches scroll-mt)
      const isMobile = window.innerWidth < 768; // md breakpoint
      const offset = isMobile ? 72 : 100;
      let currentSection = "";

      // Helper to find visible element
      const getVisibleElement = (id) => {
        const escapedId = CSS.escape(id);
        const elements = document.querySelectorAll(`#${escapedId}`);
        return Array.from(elements).find(el => el.getBoundingClientRect().height > 0) || null;
      };

      // Find active section based on scroll position
      for (const section of sections) {
        const element = getVisibleElement(section.id);
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
          const element = getVisibleElement(section.id);
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
