"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { scrollToHash } from "../lib/anchorScroll";

const MAX_HASH_ATTEMPTS = 8;
const HASH_RETRY_DELAY = 120;
const INITIAL_HASH_DELAY = 80;

const attemptHashScroll = (behavior = "auto") => {
  if (typeof window === "undefined") return;
  const hash = window.location.hash;
  if (!hash) return;

  let attempts = 0;

  const tryScroll = () => {
    window.requestAnimationFrame(() => {
      const didScroll = scrollToHash(hash, { behavior });

      if (didScroll) {
        return;
      }

      if (attempts >= MAX_HASH_ATTEMPTS) {
        console.warn(`Anchor not found after ${attempts + 1} attempts: ${hash}`);
        return;
      }

      attempts += 1;
      setTimeout(tryScroll, HASH_RETRY_DELAY);
    });
  };

  setTimeout(tryScroll, INITIAL_HASH_DELAY);
};

/**
 * AnchorScrollManager - Handles hash scrolling after navigation
 *
 * Ensures hash links scroll to the correct anchor after route changes
 * without forcing every route to jump to the top.
 */
export function AnchorScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasMounted = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      attemptHashScroll("auto");
    } else if (hasMounted.current) {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }

    hasMounted.current = true;

    const handleHashChange = () => {
      attemptHashScroll("smooth");
    };

    window.addEventListener("hashchange", handleHashChange);

    if (hash) {
      const handleLoad = () => attemptHashScroll("auto");
      window.addEventListener("load", handleLoad, { once: true });

      if (document?.fonts?.ready) {
        document.fonts.ready.then(() => attemptHashScroll("auto"));
      }
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname, searchParams]);

  return null;
}
