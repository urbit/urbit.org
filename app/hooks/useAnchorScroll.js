"use client"
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * useAnchorScroll Hook
 *
 * Handles smooth scrolling to anchor links with offset for fixed headers.
 * Supports:
 * - Initial page load with hash (#section)
 * - Clicking anchor links
 * - Browser back/forward navigation
 *
 * @param {number} offset - Pixels to offset scroll position (for fixed headers)
 */
export function useAnchorScroll(offset = 100) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to anchor with offset
    const scrollToAnchor = (hash) => {
      if (!hash) return;

      // Remove # from hash
      const id = hash.startsWith('#') ? hash.slice(1) : hash;
      const element = document.getElementById(id);

      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    // Handle initial load with hash
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        scrollToAnchor(hash);
      }, 100);
    }

    // Handle hash changes (clicking anchor links)
    const handleHashChange = () => {
      scrollToAnchor(window.location.hash);
    };

    // Handle popstate (browser back/forward)
    const handlePopstate = () => {
      setTimeout(() => {
        scrollToAnchor(window.location.hash);
      }, 50);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [pathname, offset]);
}
