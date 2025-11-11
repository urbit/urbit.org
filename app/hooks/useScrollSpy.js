"use client"
import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Skip if no section IDs or running on server
    if (!sectionIds.length || typeof window === "undefined") return;

    const handleScroll = () => {
      // Get all section elements
      const sections = sectionIds
        .map((id) => ({
          id,
          element: document.getElementById(id),
        }))
        .filter((section) => section.element);

      if (sections.length === 0) return;

      // Check if there's a hash in the URL and if it matches one of our sections
      const hash = window.location.hash.slice(1);
      if (hash && sectionIds.includes(hash)) {
        const hashElement = document.getElementById(hash);
        if (hashElement) {
          const rect = hashElement.getBoundingClientRect();
          // If the hash element is near the top, use it as active
          if (rect.top >= -100 && rect.top <= offset + 100) {
            if (hash !== activeId) {
              setActiveId(hash);
            }
            return;
          }
        }
      }

      // Find which section is currently in view
      let currentSection = "";

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect();
        // Check if section is in the viewport (with offset for header)
        if (rect.top <= offset && rect.bottom >= offset) {
          currentSection = section.id;
          break;
        }
      }

      // If no section is in the threshold, find the closest one above
      if (!currentSection) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const rect = sections[i].element.getBoundingClientRect();
          if (rect.top < offset) {
            currentSection = sections[i].id;
            break;
          }
        }
      }

      if (currentSection && currentSection !== activeId) {
        setActiveId(currentSection);
      }
    };

    // Check initial position after DOM is ready
    const initTimeout = setTimeout(() => {
      handleScroll();
    }, 100);

    // Add scroll listener with throttling
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

    // Add hash change listener for anchor link navigation
    const hashChangeListener = () => {
      setTimeout(() => {
        handleScroll();
      }, 50);
    };

    // Listen for popstate events (browser back/forward)
    const popstateListener = () => {
      setTimeout(() => {
        handleScroll();
      }, 50);
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    window.addEventListener("hashchange", hashChangeListener);
    window.addEventListener("popstate", popstateListener);

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("hashchange", hashChangeListener);
      window.removeEventListener("popstate", popstateListener);
    };
  }, [sectionIds, offset, activeId]);

  return activeId;
}
