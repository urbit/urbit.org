"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FIGMA_LIGHTBOX_MODAL_PROPS, Modal } from "./Modal";
import { scrollToHash } from "../lib/anchorScroll";

const getEntries = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.entries)) return payload.entries;
  return [];
};

const normalizeTokens = (value) => Array.from(new Set(splitWords(value.trim())));

const splitWords = (value) =>
  value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

const FIELD_WEIGHTS = {
  title: 12,
  tags: 10,
  searchTerms: 9,
  description: 6,
  authors: 4,
  other: 2,
};

const SOURCE_BOOSTS = {
  overview: 12,
  blurbs: 12,
  homepage: 8,
  blog: 4,
  events: 3,
  pages: 2,
  other: 0,
};

const SOURCE_RANKS = {
  overview: 0,
  blurbs: 0,
  homepage: 1,
  blog: 2,
  events: 3,
  pages: 4,
  other: 5,
};

const scoreFuzzyWord = (token, word) => {
  if (!token || !word || token.length > word.length) {
    return 0;
  }

  let score = 0;
  let lastIndex = -1;
  let consecutive = 0;

  for (const char of token) {
    const nextIndex = word.indexOf(char, lastIndex + 1);
    if (nextIndex === -1) {
      return 0;
    }

    if (nextIndex === lastIndex + 1) {
      consecutive += 1;
      score += 2 + consecutive;
    } else {
      consecutive = 0;
      score += 1;
    }

    lastIndex = nextIndex;
  }

  if (word.startsWith(token)) {
    score += 6 + token.length;
  }

  return score;
};

const getBestTokenScore = (token, words) => {
  if (!token.length) return 0;
  if (token.length <= 2) {
    const hasPrefix = words.some((word) => word.startsWith(token));
    return hasPrefix ? 5 + token.length : 0;
  }

  let bestScore = 0;
  for (const word of words) {
    const score = scoreFuzzyWord(token, word);
    if (score > bestScore) {
      bestScore = score;
    }
  }

  return bestScore;
};

const getEntryWords = (entry) => ({
  title: splitWords(entry.title || ""),
  tags: splitWords((entry.tags || []).join(" ")),
  searchTerms: splitWords((entry.searchTerms || []).join(" ")),
  description: splitWords(entry.description || ""),
  authors: splitWords((entry.authors || []).join(" ")),
  other: splitWords(entry.searchText || ""),
});

const scoreEntry = (entry, tokens, wordsByField) => {
  if (!tokens.length) return 0;

  let totalScore = 0;

  for (const token of tokens) {
    const tokenScores = {
      title: getBestTokenScore(token, wordsByField.title),
      tags: getBestTokenScore(token, wordsByField.tags),
      searchTerms: getBestTokenScore(token, wordsByField.searchTerms),
      description: getBestTokenScore(token, wordsByField.description),
      authors: getBestTokenScore(token, wordsByField.authors),
      other: getBestTokenScore(token, wordsByField.other),
    };

    const weightedScore = Math.max(
      tokenScores.title * FIELD_WEIGHTS.title,
      tokenScores.tags * FIELD_WEIGHTS.tags,
      tokenScores.searchTerms * FIELD_WEIGHTS.searchTerms,
      tokenScores.description * FIELD_WEIGHTS.description,
      tokenScores.authors * FIELD_WEIGHTS.authors,
      tokenScores.other * FIELD_WEIGHTS.other
    );

    if (!weightedScore) {
      return 0;
    }

    totalScore += weightedScore;
  }

  const sourceKey = entry.source || entry.section || "other";
  totalScore += SOURCE_BOOSTS[sourceKey] || 0;

  return totalScore;
};

const getSourceRank = (entry) => {
  const sourceKey = entry.source || entry.section || "other";
  return SOURCE_RANKS[sourceKey] ?? SOURCE_RANKS.other;
};

const rankEntries = (entries, tokens, wordsByEntry) => {
  if (!tokens.length) return [];

  return entries
    .map((entry) => {
      const key = entry.id || entry.path || entry.title;
      const words = wordsByEntry.get(key) || getEntryWords(entry);
      const score = scoreEntry(entry, tokens, words);
      if (!score) return null;
      return { ...entry, score };
    })
    .filter(Boolean)
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;

      const sourceDiff = getSourceRank(a) - getSourceRank(b);
      if (sourceDiff !== 0) return sourceDiff;

      const dateDiff = (b.publishedTimestamp || 0) - (a.publishedTimestamp || 0);
      if (dateDiff !== 0) return dateDiff;

      return String(a.title || "").localeCompare(String(b.title || ""), undefined, {
        sensitivity: "base",
      });
    });
};

const dedupeAnchoredResults = (results) => {
  const seenAnchors = new Set();
  return results.filter((entry) => {
    const entryPath = entry.path || "";
    if (!entryPath.includes("#")) {
      return true;
    }

    if (seenAnchors.has(entryPath)) {
      return false;
    }

    seenAnchors.add(entryPath);
    return true;
  });
};

const getToggleShortcutLabel = () => {
  if (typeof navigator === "undefined") return "Ctrl+K";
  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  return /mac/i.test(platform) ? "⌘K" : "Ctrl+K";
};

export function SearchModal({ isOpen, onClose, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef(null);
  const hasRequestedRef = useRef(false);
  const queryRef = useRef("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [indexEntries, setIndexEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [toggleShortcutLabel, setToggleShortcutLabel] = useState("Ctrl+K");
  const [pressedResultId, setPressedResultId] = useState(null);

  const resetSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    queryRef.current = "";
    setActiveIndex(-1);
    setErrorMessage("");
    setPressedResultId(null);
  }, []);

  const handleClose = useCallback(() => {
    resetSearch();
    onClose();
  }, [resetSearch, onClose]);

  const ensureIndexLoaded = useCallback(() => {
    if (indexEntries.length > 0 || isLoading || hasRequestedRef.current) {
      return;
    }

    hasRequestedRef.current = true;
    setIsLoading(true);
    setErrorMessage("");

    fetch("/search-index.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Search index request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        const entries = getEntries(payload);
        if (!entries.length) {
          console.warn("Search index loaded with no entries.");
        } else {
          console.info(`Search index loaded (${entries.length} entries).`);
        }
        setIndexEntries(entries);
      })
      .catch((error) => {
        console.error("Failed to load search index:", error);
        setErrorMessage("Search index unavailable.");
        hasRequestedRef.current = false;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [indexEntries.length, isLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setToggleShortcutLabel(getToggleShortcutLabel());
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 160);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const timeout = window.setTimeout(() => {
      ensureIndexLoaded();
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [isOpen, ensureIndexLoaded]);

  useEffect(() => {
    if (!isOpen || !isMobile || typeof document === "undefined") {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isMobile, handleClose]);

  const queryTokens = useMemo(() => normalizeTokens(debouncedQuery), [debouncedQuery]);

  const entryWords = useMemo(() => {
    const map = new Map();
    indexEntries.forEach((entry) => {
      const key = entry.id || entry.path || entry.title;
      if (!key) return;
      map.set(key, getEntryWords(entry));
    });
    return map;
  }, [indexEntries]);

  const filteredResults = useMemo(
    () => dedupeAnchoredResults(rankEntries(indexEntries, queryTokens, entryWords)),
    [indexEntries, queryTokens, entryWords]
  );

  const resultIndexById = useMemo(() => {
    const indexMap = new Map();
    filteredResults.forEach((result, index) => {
      const key = result.id || result.path || result.title;
      if (key) {
        indexMap.set(key, index);
      }
    });
    return indexMap;
  }, [filteredResults]);

  const hasQuery = queryTokens.length > 0;
  const resolvedActiveIndex =
    !isMobile && hasQuery && filteredResults.length > 0
      ? activeIndex < 0 || activeIndex >= filteredResults.length
        ? 0
        : activeIndex
      : -1;

  useEffect(() => {
    if (resolvedActiveIndex < 0) return;
    const element = document.getElementById(`search-result-${resolvedActiveIndex}`);
    element?.scrollIntoView({ block: "nearest" });
  }, [resolvedActiveIndex]);

  const handleQueryChange = (event) => {
    const nextQuery = event.target.value;
    queryRef.current = nextQuery;
    setQuery(nextQuery);
    setActiveIndex(-1);
    setPressedResultId(null);

    if (!indexEntries.length) {
      ensureIndexLoaded();
    }
  };

  const handleSelect = (item) => {
    if (!item?.path) {
      console.warn("Search result missing path:", item);
      return;
    }
    console.info("Search result selected:", {
      title: item.title,
      path: item.path,
      query: queryRef.current,
    });

    const isRootHashTarget = item.path.startsWith("/#") || item.path.startsWith("#");
    if (isRootHashTarget && pathname === "/") {
      const hash = item.path.startsWith("#") ? item.path : item.path.slice(1);
      window.history.pushState(null, "", item.path.startsWith("#") ? `/${item.path}` : item.path);
      handleClose();
      window.setTimeout(() => {
        scrollToHash(hash, { behavior: "smooth" });
      }, 0);
      return;
    }

    router.push(item.path);
    handleClose();
  };

  const handleKeyDown = (event) => {
    if (!indexEntries.length) {
      ensureIndexLoaded();
    }

    if (!filteredResults.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((resolvedActiveIndex + 1) % filteredResults.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        resolvedActiveIndex <= 0 ? filteredResults.length - 1 : resolvedActiveIndex - 1
      );
      return;
    }

    if (event.key === "Enter" && resolvedActiveIndex >= 0) {
      event.preventDefault();
      handleSelect(filteredResults[resolvedActiveIndex]);
    }
  };

  const activeId =
    !isMobile && resolvedActiveIndex >= 0 ? `search-result-${resolvedActiveIndex}` : undefined;
  const inputIsActive = query.length > 0;

  const updatePressedResultFromTouch = useCallback((touch) => {
    if (!touch || typeof document === "undefined") return;

    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    const resultButton = target?.closest?.("[data-search-result-id]");
    setPressedResultId(resultButton?.getAttribute("data-search-result-id") || null);
  }, []);

  const clearPressedResult = useCallback(() => {
    setPressedResultId(null);
  }, []);

  const renderResults = (mobileLayout = false) => {
    if (errorMessage && hasQuery) {
      return (
        <div className={`font-sans tracking-[0.01em] text-accent-1 ${mobileLayout ? "mt-[18px] text-[16px] leading-[1.35]" : "mt-[2rem] px-[14px] text-[20px] leading-[1.3]"}`}>
          {errorMessage}
        </div>
      );
    }

    if (isLoading && hasQuery) {
      return (
        <div className={`font-sans tracking-[0.01em] text-contrast-2 ${mobileLayout ? "mt-[18px] text-[16px] leading-[1.35]" : "mt-[2rem] px-[14px] text-[20px] leading-[1.3]"}`}>
          Loading search index...
        </div>
      );
    }

    if (!hasQuery) {
      return null;
    }

    if (!filteredResults.length) {
      return (
        <div className={`font-sans tracking-[0.01em] text-contrast-2 ${mobileLayout ? "mt-[18px] text-[16px] leading-[1.35]" : "mt-[2rem] px-[14px] text-[20px] leading-[1.3]"}`}>
          No results found. Try a different search.
        </div>
      );
    }

    return (
      <div
        id="search-results"
        role="listbox"
        aria-live="polite"
        className={mobileLayout ? "mt-[18px] space-y-[12px] pb-8" : "mt-[2rem] max-h-[360px] space-y-[12px] overflow-y-auto pr-1"}
        onTouchStart={mobileLayout ? (event) => updatePressedResultFromTouch(event.touches[0]) : undefined}
        onTouchMove={mobileLayout ? (event) => updatePressedResultFromTouch(event.touches[0]) : undefined}
        onTouchEnd={mobileLayout ? clearPressedResult : undefined}
        onTouchCancel={mobileLayout ? clearPressedResult : undefined}
      >
        {filteredResults.map((item) => {
          const itemKey = item.id || item.path || item.title;
          const resultIndex = resultIndexById.get(itemKey);
          const isActive = !mobileLayout && resultIndex === resolvedActiveIndex;
          const isPressed = mobileLayout && pressedResultId === itemKey;
          const resultId =
            typeof resultIndex === "number" ? `search-result-${resultIndex}` : undefined;
          const tags = Array.isArray(item.tags) ? item.tags : [];
          const visibleTags = tags.slice(0, 2);

          return (
            <button
              key={itemKey}
              id={resultId}
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={`Open ${item.title}`}
              data-search-result-id={itemKey}
              data-umami-event="search-result-select"
              data-umami-event-label={item.title}
              data-umami-event-destination={item.path}
              data-umami-event-variant={item.section}
              onClick={() => handleSelect(item)}
              onFocus={() => {
                if (!mobileLayout && typeof resultIndex === "number") {
                  setActiveIndex(resultIndex);
                }
              }}
              onMouseEnter={() => {
                if (!mobileLayout && typeof resultIndex === "number") {
                  setActiveIndex(resultIndex);
                }
              }}
              className={`w-full min-w-0 rounded-[6px] text-left transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                mobileLayout
                  ? isPressed
                    ? "bg-white px-[8px] py-[10px]"
                    : "bg-transparent px-[8px] py-[10px] hover:bg-white/70"
                  : isActive
                    ? "bg-white px-[10px] pb-[24px] pt-[10px]"
                    : "bg-transparent px-[10px] pb-[24px] pt-[10px] hover:bg-white/70"
              }`}
            >
              <div className="min-w-0">
                <div
                  className={`min-w-0 break-words font-serif font-[700] tracking-[-0.03em] ${
                    mobileLayout
                      ? `text-[44px] leading-[0.94] ${isPressed ? "text-accent-1" : "text-contrast-2"}`
                      : `text-[40px] leading-[0.96] ${isActive ? "text-accent-1" : "text-contrast-2"}`
                  }`}
                >
                  {item.title}
                </div>
                {item.description && (
                  <p
                    className={`mt-[4px] break-words font-sans tracking-[0.01em] text-primary ${
                      mobileLayout ? "text-[16px] leading-[1.45]" : "text-[20px] leading-[1.3]"
                    }`}
                  >
                    {item.description}
                  </p>
                )}
                {visibleTags.length > 0 && (
                  <div className={`mt-[12px] flex flex-wrap gap-[11px] ${mobileLayout ? "" : "items-center"}`}>
                    {visibleTags.map((tag) => (
                      <span
                        key={`${item.path}-${tag}`}
                        className={`inline-flex items-center justify-center rounded-[8px] border border-contrast-2 px-[8px] text-center font-sans tracking-[0.01em] text-contrast-2 ${
                          mobileLayout ? "h-[28px] text-[16px] leading-none" : "h-[28px] text-[16px] leading-none"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const searchBody = isMobile ? (
    <div className="relative">
      <div className="sticky top-0 z-20 bg-contrast-1 px-[11px] pb-[18px] pt-[18px]">
        <button
          onClick={handleClose}
          className="absolute right-[17px] top-[18px] z-10 text-contrast-2 transition-colors hover:text-primary"
          aria-label="Close search"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="pr-[2.75rem]">
          <h2 className="mb-4 font-serif text-[46px] font-[700] leading-[43px] tracking-[-0.03em] text-accent-1">
            Search
          </h2>
          <p className="max-w-[344px] font-sans text-[16px] leading-[16px] tracking-[0.01em] text-primary">
            Browse site content & guides
          </p>
        </div>
        <div className="mt-[18px] w-full">
          <label htmlFor="search-modal-input" className="sr-only">
            Search the site
          </label>
          <input
            id="search-modal-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleQueryChange}
            onFocus={ensureIndexLoaded}
            onKeyDown={handleKeyDown}
            placeholder="Search topics, guides, terms, etc."
            autoComplete="off"
            aria-controls="search-results"
            aria-activedescendant={activeId}
            className={`h-[50px] w-full max-w-full rounded-[5px] border bg-white px-[13px] font-sans text-[24px] leading-none tracking-[0.01em] text-primary outline-none transition-colors placeholder:font-sans placeholder:text-[24px] placeholder:tracking-[0.01em] placeholder:text-contrast-2 ${
              inputIsActive ? "border-primary" : "border-contrast-2"
            }`}
          />
        </div>
      </div>
      <div className="px-[11px] pb-8">{renderResults(true)}</div>
    </div>
  ) : (
    <div className="block w-full">
      <div className="px-[14px] pr-[3.25rem]">
        <h2 className="mb-4 font-serif text-[48px] font-[700] leading-[45px] tracking-[-0.03em] text-accent-1">
          Search urbit.org
        </h2>
        <p className="max-w-[626px] font-sans text-[24px] leading-[25px] tracking-[0.01em] text-primary">
          Browse site content & guides
        </p>
      </div>
      <div className="mt-[4.1rem] w-full">
        <label htmlFor="search-modal-input" className="sr-only">
          Search the site
        </label>
        <input
          id="search-modal-input"
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleQueryChange}
          onFocus={ensureIndexLoaded}
          onKeyDown={handleKeyDown}
          placeholder="Search topics, guides, terms, etc."
          autoComplete="off"
          aria-controls="search-results"
          aria-activedescendant={activeId}
          className={`h-[50px] w-full max-w-full rounded-[5px] border bg-white px-[13px] font-sans text-[24px] leading-none tracking-[0.01em] text-primary outline-none transition-colors placeholder:font-sans placeholder:text-[24px] placeholder:tracking-[0.01em] placeholder:text-contrast-2 ${
            inputIsActive ? "border-primary" : "border-contrast-2"
          }`}
        />
        <p className="mt-[5px] px-[14px] font-mono text-[14px] tracking-[-0.02em] text-contrast-2">
          Use ↑/↓ to navigate, Enter to open, {toggleShortcutLabel} to toggle search window.
        </p>
      </div>
      {renderResults(false)}
    </div>
  );

  if (isMobile) {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-[9999] h-[100dvh] w-full overflow-hidden bg-contrast-1 text-primary"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative h-full w-full overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <div className="h-full overflow-y-auto overflow-x-hidden">
            {searchBody}
            {children && <div className="px-[11px] pb-8">{children}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      {...FIGMA_LIGHTBOX_MODAL_PROPS}
      panelStyle={{
        maxHeight:
          hasQuery && (isLoading || filteredResults.length > 0 || errorMessage)
            ? "min(44rem, calc(100dvh - 180px - 2rem))"
            : "22rem",
      }}
    >
      {searchBody}

      {children && <div className="mt-6 border-t border-contrast-2 pt-6">{children}</div>}
    </Modal>
  );
}
