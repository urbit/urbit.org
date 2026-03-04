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

const filterEntries = (entries, tokens) => {
  if (!tokens.length) return [];
  return entries.filter((entry) => {
    const searchText = String(entry.searchText || "").toLowerCase();
    return tokens.every((token) => searchText.includes(token));
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
  const [indexEntries, setIndexEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const resetSearch = useCallback(() => {
    setQuery("");
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

        const tokens = normalizeTokens(queryRef.current);
        if (tokens.length) {
          const nextResults = filterEntries(entries, tokens);
          setActiveIndex(nextResults.length ? 0 : -1);
        }
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
    if (!isOpen) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isOpen]);


  const queryTokens = useMemo(() => normalizeTokens(query), [query]);
  const highlightText = useCallback(
    (text) => highlightMatches(text, queryTokens),
    [queryTokens]
  );

  const filteredResults = useMemo(
    () => filterEntries(indexEntries, queryTokens),
    [indexEntries, queryTokens]
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

      const sortedItems = [...items].sort((a, b) =>
        String(a.title || "").localeCompare(String(b.title || ""), undefined, {
          sensitivity: "base",
        })
      );

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

  const resultIndexByPath = useMemo(() => {
    const indexMap = new Map();
    flatResults.forEach((result, index) => {
      if (result.path) {
        indexMap.set(result.path, index);
      }
    });
    return indexMap;
  }, [flatResults]);


  useEffect(() => {
    if (activeIndex < 0) return;
    const element = document.getElementById(`search-result-${activeIndex}`);
    element?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleQueryChange = (event) => {
    const nextQuery = event.target.value;
    queryRef.current = nextQuery;
    setQuery(nextQuery);

    if (!indexEntries.length) {
      ensureIndexLoaded();
    }

    const tokens = normalizeTokens(nextQuery);
    if (!tokens.length) {
      setActiveIndex(-1);
      return;
    }

    const nextResults = filterEntries(indexEntries, tokens);
    setActiveIndex(nextResults.length ? 0 : -1);
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      panelClassName="max-w-3xl"
      contentClassName="space-y-8"
    >
      <div className="block">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-serif italic font-semibold text-primary">
            Search urbit.org
          </h2>
          {queryTokens.length > 0 && !isLoading && !errorMessage && (
            <span className="text-xs font-mono text-contrast-2">
              {flatResults.length} results
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

        <div className="mt-4">
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
            className="w-full rounded-lg border border-contrast-2 bg-transparent px-3 py-2 text-base text-primary placeholder:text-contrast-2 focus:border-accent-1 focus:outline-none focus:ring-1 focus:ring-accent-1"
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
            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-1">
              {groupedResults.map((group) => (
                <div key={group.section}>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-contrast-2 mb-2">
                    {group.label}
                  </div>
                    <div className="space-y-2">
                      {group.items.map((item) => {
                        const resultIndex = resultIndexByPath.get(item.path);
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
                            key={item.path}
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
                            className={`w-full text-left rounded-lg border px-3 py-2 transition-colors ${
                              isActive
                                ? "border-accent-1 bg-contrast-1"
                                : "border-transparent hover:border-contrast-2"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-base font-semibold text-primary">
                                {highlightText(item.title)}
                              </span>
                              {item.subsectionLabel && (
                                <span className="text-xs font-mono text-contrast-2">
                                  {item.subsectionLabel}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="mt-1 text-sm text-contrast-2 line-clamp-2">
                                {highlightText(item.description)}
                              </p>
                            )}
                            {item.path && (
                              <div className="mt-2 text-xs font-mono text-contrast-2">
                                {item.path}
                              </div>
                            )}
                            {visibleTags.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono text-contrast-2">
                                {visibleTags.map((tag) => (
                                  <span
                                    key={`${item.path}-${tag}`}
                                    className="rounded-full border border-contrast-2 px-2 py-[1px]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {extraTags > 0 && (
                                  <span className="rounded-full border border-contrast-2 px-2 py-[1px]">
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

      {children && (
        <div className="md:border-t md:border-contrast-2 md:pt-6">{children}</div>
      )}
    </Modal>
  );
}
