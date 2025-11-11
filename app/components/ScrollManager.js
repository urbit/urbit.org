"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollManager - Manages scroll restoration behavior across route changes
 *
 * Prevents browser's automatic scroll restoration which can cause inconsistent
 * scroll positions when navigating between pages. Ensures all pages load at
 * the top by default while preserving smooth scroll for intentional navigation.
 */
export function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM has settled before scrolling
    // This prevents race conditions with page rendering
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
}
