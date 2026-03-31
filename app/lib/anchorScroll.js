"use client";

const DEFAULT_ANCHOR_PADDING = 12;
const DEFAULT_ANCHOR_OFFSET = 84;

const toPixels = (value) => {
  if (!value) return Number.NaN;
  const trimmed = value.trim();

  if (trimmed.endsWith("px")) {
    return Number.parseFloat(trimmed);
  }

  if (trimmed.endsWith("rem")) {
    const remValue = Number.parseFloat(trimmed);
    const rootFontSize = Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize || "16"
    );
    return remValue * rootFontSize;
  }

  const parsed = Number.parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

const slugify = (value) => {
  if (!value) return "";
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

const extractExplicitId = (text) => {
  if (!text) return { cleaned: "", explicitId: null };

  const patterns = [
    /^(.*?)\s*\{#([\w-]+)\}\s*$/,
    /^(.*?)\s*\{%\s*#([\w-]+)\s*%\}\s*$/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      return { cleaned: match[1].trim(), explicitId: match[2] };
    }
  }

  return { cleaned: text, explicitId: null };
};

const getScrollMarginTop = (element) => {
  if (!element || typeof window === "undefined") {
    return Number.NaN;
  }
  const marginValue = getComputedStyle(element).scrollMarginTop || "0";
  return toPixels(marginValue);
};

const getCssVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const getAnchorOffset = () => {
  if (typeof window === "undefined") return 0;
  const anchorOffsetValue = getCssVar("--anchor-offset");
  const anchorOffset = toPixels(anchorOffsetValue);

  if (Number.isFinite(anchorOffset)) {
    return anchorOffset;
  }

  const headerHeightValue = getCssVar("--header-height");
  const headerHeight = toPixels(headerHeightValue);

  if (!Number.isFinite(headerHeight)) {
    return DEFAULT_ANCHOR_OFFSET;
  }

  return headerHeight + DEFAULT_ANCHOR_PADDING;
};

export const getVisibleAnchorElement = (id) => {
  if (!id || typeof document === "undefined") return null;
  const escapedId = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(id) : id;
  const elements = document.querySelectorAll(`#${escapedId}`);

  if (!elements.length) return null;

  return (
    Array.from(elements).find((element) => {
      const rect = element.getBoundingClientRect();
      return rect.height > 0 && rect.width > 0;
    }) || elements[0]
  );
};


export const ensureHeadingIds = () => {
  if (typeof document === "undefined") return;
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

  headings.forEach((heading) => {
    if (!heading) return;
    if (!heading.classList.contains("scroll-anchor")) {
      heading.classList.add("scroll-anchor");
    }

    if (heading.id) return;
    const text = heading.textContent?.trim() || "";
    if (!text) return;

    const { cleaned, explicitId } = extractExplicitId(text);
    const resolvedId = explicitId || slugify(cleaned);
    if (resolvedId) {
      heading.id = resolvedId;
    }
  });
};

export const scrollToAnchor = (id, { behavior = "smooth" } = {}) => {
  const element = getVisibleAnchorElement(id);

  if (!element) {
    console.warn(`Anchor not found for hash: ${id}`);
    return false;
  }

  const marginOffset = getScrollMarginTop(element);
  const offset = Number.isFinite(marginOffset) ? marginOffset : getAnchorOffset();
  const rect = element.getBoundingClientRect();
  const targetPosition = rect.top + window.scrollY - offset;

  window.scrollTo({
    top: targetPosition,
    behavior,
  });

  return true;
};

export const scrollToHash = (hash, options = {}) => {
  if (!hash) return false;
  const id = decodeURIComponent(hash.replace(/^#/, "").trim());
  if (!id) return false;

  ensureHeadingIds();
  return scrollToAnchor(id, options);
};
