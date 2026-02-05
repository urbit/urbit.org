"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * OverviewNavButtons - Navigation buttons for overview pages
 *
 * Displays previous/next page navigation at the bottom of overview content
 *
 * @param {{url: string, label: string}|null} prevPage - Previous page data
 * @param {{url: string, label: string}|null} nextPage - Next page data
 */
export function OverviewNavButtons({ prevPage, nextPage }) {
  const pathname = usePathname();
  const branch = pathname.startsWith("/overview/running-urbit")
    ? "running-urbit"
    : "urbit-explained";
  const parts = pathname.split("/").filter(Boolean);
  const currentSlug = parts[0] === "overview" && parts[2] ? parts[2] : "intro";
  const baseEvent = `nav-overview-${branch}-pager-${currentSlug}`;

  if (!prevPage && !nextPage) {
    return null;
  }

  return (
    <nav className="flex mt-16 justify-between gap-x-4">
      {prevPage ? (
        <Link
          href={prevPage.url}
          data-umami-event={`${baseEvent}-prev`}
          data-umami-event-label={prevPage.label}
          data-umami-event-destination={prevPage.url}
          data-umami-event-context={pathname}
          data-umami-event-variant="pager"
          className="group border border-accent-1 bg-accent-1 hover:border-accent-1 hover:bg-accent-2 px-4 py-2 transition-colors rounded-lg"
        >
          <div className="text-secondary group-hover:text-accent-1 text-sm font-mono mb-1 text-right">Previous</div>
          <div className="text-secondary group-hover:text-accent-1 font-sans text-xl">
            ← {prevPage.label}
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextPage ? (
        <Link
          href={nextPage.url}
          data-umami-event={`${baseEvent}-next`}
          data-umami-event-label={nextPage.label}
          data-umami-event-destination={nextPage.url}
          data-umami-event-context={pathname}
          data-umami-event-variant="pager"
          className="group border border-accent-1 bg-accent-1 hover:border-accent-1 hover:bg-accent-2 px-4 py-2 transition-colors text-right rounded-lg"
        >
          <div className="text-secondary group-hover:text-accent-1 text-sm font-mono mb-1 text-left">Next</div>
          <div className="text-secondary group-hover:text-accent-1 font-sans text-xl">
            {nextPage.label} →
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
