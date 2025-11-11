'use client';

import { useState, useEffect } from 'react';

/**
 * MobileFloatingNav - Floating button for mobile navigation between anchors
 *
 * Shows a fixed button in bottom-right that scrolls to the next anchor on tap.
 * Navigates through all sections and subsections in document order.
 * Only visible on mobile (< md breakpoint) and after scrolling past hero.
 *
 * @param {Array} anchors - Array of anchor objects with id and label
 * @param {number} heroHeight - Height of hero section to determine visibility
 */
export function MobileFloatingNav({ anchors, heroHeight = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAnchorIndex, setCurrentAnchorIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 80% past hero
      const scrolled = window.scrollY;
      const heroThreshold = heroHeight * 0.8;
      setIsVisible(scrolled > heroThreshold);

      // Determine current anchor based on scroll position
      const anchorElements = anchors.map(a => document.getElementById(a.id)).filter(Boolean);

      for (let i = anchorElements.length - 1; i >= 0; i--) {
        const element = anchorElements[i];
        const rect = element.getBoundingClientRect();
        // Anchor is "current" if it's in the top half of viewport
        if (rect.top <= window.innerHeight / 2) {
          setCurrentAnchorIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [anchors, heroHeight]);

  const handleNextAnchor = () => {
    const nextIndex = (currentAnchorIndex + 1) % anchors.length;
    const nextAnchor = anchors[nextIndex];

    if (nextAnchor) {
      const element = document.getElementById(nextAnchor.id);
      if (element) {
        const offset = 72; // Match scroll-mt-[72px]
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  if (!isVisible || anchors.length === 0) return null;

  return (
    <button
      onClick={handleNextAnchor}
      className="md:hidden fixed bottom-5 right-5 z-40
        rounded-lg
        p-2
        font-mono text-sm text-contrast-2
        flex items-center gap-2
        transition-all duration-300
        bg-background border border-contrast-2"
      aria-label="Next section"
    >
      <span>Next section</span>
      {/* Right-facing karat */}
      <img
        src="/icons/toggle-karat.svg"
        alt=""
        className="w-[9px] h-[7px] invert"
      />
    </button>
  );
}
