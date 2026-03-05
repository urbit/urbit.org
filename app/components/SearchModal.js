"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";

const SECTION_ORDER = ["overview", "blog", "grants", "events", "pages", "other"];
const SECTION_LABELS = {
  overview: "Overview",
  blog: "Blog",
  grants: "Grants",
  events: "Events",
  pages: "Pages",
  other: "Other",
};

const toTitleCase = (value) =>
  value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

const getEntries = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.entries)) return payload.entries;
  return [];
};

const normalizeTokens = (value) =>
  value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

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

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightMatches = (text, tokens) => {
  if (!text || !tokens.length) return text;
  const uniqueTokens = Array.from(
    new Set(tokens.map((token) => token.toLowerCase()).filter(Boolean))
  );
  if (!uniqueTokens.length) return text;

  const regex = new RegExp(
    `(${uniqueTokens.map((token) => escapeRegExp(token)).join("|")})`,
    "gi"
  );
  const segments = String(text).split(regex);

  return segments.map((segment, index) => {
    const isMatch = uniqueTokens.includes(segment.toLowerCase());
    if (!isMatch) return segment;
    return (
      <span key={`${segment}-${index}`} className="text-accent-1 font-semibold">
        {segment}
      </span>
    );
  });
};

export function SearchModal({ isOpen, onClose, children }) {
  const router = useRouter();
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

  const resetSearch = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
    queryRef.current = "";
    setActiveIndex(-1);
    setErrorMessage("");
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
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 160);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isOpen]);

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
  const highlightTokens = useMemo(() => normalizeTokens(query), [query]);
  const highlightText = useCallback(
    (text) => highlightMatches(text, highlightTokens),
    [highlightTokens]
  );

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

  const groupedResults = useMemo(() => {
    const groups = new Map();

    for (const entry of filteredResults) {
      const section = entry.section || "other";
      if (!groups.has(section)) {
        groups.set(section, []);
      }
      groups.get(section).push(entry);
    }

    return SECTION_ORDER.map((section) => {
      const items = groups.get(section) || [];
      if (!items.length) return null;

      const label =
        SECTION_LABELS[section] ||
        items[0]?.sectionLabel ||
        toTitleCase(section);

      const sortedItems = [...items].sort((a, b) => {
        const scoreDiff = (b.score || 0) - (a.score || 0);
        if (scoreDiff !== 0) return scoreDiff;
        return String(a.title || "").localeCompare(String(b.title || ""), undefined, {
          sensitivity: "base",
        });
      });

      return { section, label, items: sortedItems };
    }).filter(Boolean);
  }, [filteredResults]);

  const flatResults = useMemo(
    () =>
      groupedResults.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          group: group.section,
          groupLabel: group.label,
        }))
      ),
    [groupedResults]
  );

  const resultIndexById = useMemo(() => {
    const indexMap = new Map();
    flatResults.forEach((result, index) => {
      const key = result.id || result.path || result.title;
      if (key) {
        indexMap.set(key, index);
      }
    });
    return indexMap;
  }, [flatResults]);

  const querySignature = queryTokens.join(" ");

  useEffect(() => {
    if (!querySignature || !flatResults.length) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex(0);
  }, [querySignature, flatResults.length]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const element = document.getElementById(`search-result-${activeIndex}`);
    element?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleQueryChange = (event) => {
    const nextQuery = event.target.value;
    queryRef.current = nextQuery;
    setQuery(nextQuery);
    setActiveIndex(-1);

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
    router.push(item.path);
    handleClose();
  };

  const handleKeyDown = (event) => {
    if (!indexEntries.length) {
      ensureIndexLoaded();
    }

    if (!flatResults.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % flatResults.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? flatResults.length - 1 : prev - 1
      );
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      handleSelect(flatResults[activeIndex]);
    }
  };

  const activeId = activeIndex >= 0 ? `search-result-${activeIndex}` : undefined;
  const resultCountLabel =
    queryTokens.length > 0 && !isLoading && !errorMessage
      ? `${flatResults.length} results`
      : null;

  const searchBody = (
    <div className="block w-full">
      <div className="hidden md:block">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-serif italic font-semibold text-primary">
            Search urbit.org
          </h2>
          {resultCountLabel && (
            <span className="text-xs font-mono text-contrast-2">
              {resultCountLabel}
            </span>
          )}
        </div>
        <p className="text-sm text-contrast-2 mt-1">
          Browse site content, guides, grants, and updates.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-contrast-2">
          <span>Use ↑/↓ to navigate, Enter to open.</span>
          {!indexEntries.length && !isLoading && (
            <span>Focus the field to load results.</span>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <p className="text-sm text-contrast-2">
          Browse site content, guides, grants, and updates.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-contrast-2">
          <span>Tap a result to open.</span>
          {!indexEntries.length && !isLoading && (
            <span>Focus the field to load results.</span>
          )}
        </div>
      </div>

      <div className="mt-4 w-full">
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
          placeholder="Search topics, guides, or grants"
          autoComplete="off"
          aria-controls="search-results"
          aria-activedescendant={activeId}
          className="w-full max-w-full rounded-lg border border-contrast-2 bg-transparent px-3 py-2 text-[16px] md:text-base text-primary placeholder:text-contrast-2 focus:border-accent-1 focus:outline-none focus:ring-1 focus:ring-accent-1"
        />
      </div>

      <div
        id="search-results"
        role="listbox"
        aria-live="polite"
        className="mt-4 space-y-4"
      >
        {isLoading && (
          <div className="text-sm text-contrast-2">Loading search index…</div>
        )}

        {errorMessage && (
          <div className="text-sm text-accent-1">{errorMessage}</div>
        )}

        {!isLoading && !errorMessage && !queryTokens.length && (
          <div className="text-sm text-contrast-2">
            Start typing to see search results.
          </div>
        )}

        {!isLoading && !errorMessage && queryTokens.length > 0 && !flatResults.length && (
          <div className="text-sm text-contrast-2">
            No results found. Try a different search.
          </div>
        )}

          {!isLoading && !errorMessage && groupedResults.length > 0 && (
          <div className="space-y-6 w-full md:max-h-[300px] md:overflow-y-auto md:pr-1">

            {groupedResults.map((group) => (
              <div key={group.section}>
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-contrast-2 mb-2">
                  {group.label}
                </div>
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const itemKey = item.id || item.path || item.title;
                    const resultIndex = resultIndexById.get(itemKey);
                    const isActive = resultIndex === activeIndex;
                    const resultId =
                      typeof resultIndex === "number"
                        ? `search-result-${resultIndex}`
                        : undefined;
                    const tags = Array.isArray(item.tags) ? item.tags : [];
                    const visibleTags = tags.slice(0, 3);
                    const extraTags = tags.length - visibleTags.length;

                    return (
                      <button
                        key={itemKey}
                        id={resultId}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        aria-label={`Open ${item.title}`}
                        data-umami-event="search-result-select"
                        data-umami-event-label={item.title}
                        data-umami-event-destination={item.path}
                        data-umami-event-variant={item.section}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => {
                          if (typeof resultIndex === "number") {
                            setActiveIndex(resultIndex);
                          }
                        }}
                        className={`w-full min-w-0 text-left rounded-lg border px-3 py-2 transition-colors ${
                          isActive
                            ? "border-accent-1 bg-contrast-1"
                            : "border-transparent hover:border-contrast-2"
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 min-w-0">
                          <span className="text-base font-semibold text-primary break-words min-w-0 flex-1">
                            {highlightText(item.title)}
                          </span>
                          {item.subsectionLabel && (
                            <span className="text-xs font-mono text-contrast-2 shrink-0">
                              {item.subsectionLabel}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-1 text-sm text-contrast-2 line-clamp-2 break-words">
                            {highlightText(item.description)}
                          </p>
                        )}
                        {item.path && (
                          <div className="mt-2 text-xs font-mono text-contrast-2 break-all">
                            {item.path}
                          </div>
                        )}
                        {visibleTags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono text-contrast-2">
                            {visibleTags.map((tag) => (
                              <span
                                key={`${item.path}-${tag}`}
                                className="rounded-full border border-contrast-2 px-2 py-[1px] break-words"
                              >
                                {tag}
                              </span>
                            ))}
                            {extraTags > 0 && (
                              <span className="rounded-full border border-contrast-2 px-2 py-[1px] break-words">
                                +{extraTags}
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-[9999] flex h-[100dvh] w-full flex-col bg-contrast-1 text-primary overflow-x-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex w-full items-center justify-between gap-3 border-b border-contrast-2 px-4 py-4">
          <div>
            <h2 className="text-xl font-serif italic font-semibold text-primary">
              Search
            </h2>
            {resultCountLabel && (
              <div className="text-xs font-mono text-contrast-2">
                {resultCountLabel}
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-contrast-2 hover:text-primary transition-colors"
            aria-label="Close search"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 w-full overflow-y-auto px-4 pb-8 pt-4">
          {searchBody}
          {children && (
            <div className="mt-6 border-t border-contrast-2 pt-6">{children}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      panelClassName="max-w-3xl"
      contentClassName="space-y-8"
    >
      {searchBody}

      {children && (
        <div className="md:border-t md:border-contrast-2 md:pt-6">{children}</div>
      )}
    </Modal>
  );
}
