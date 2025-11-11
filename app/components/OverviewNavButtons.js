"use client";

import Link from "next/link";

/**
 * OverviewNavButtons - Navigation buttons for overview pages
 *
 * Displays previous/next page navigation at the bottom of overview content
 *
 * @param {{url: string, label: string}|null} prevPage - Previous page data
 * @param {{url: string, label: string}|null} nextPage - Next page data
 */
export function OverviewNavButtons({ prevPage, nextPage }) {
  if (!prevPage && !nextPage) {
    return null;
  }

  return (
    <nav className="flex mt-16 justify-between gap-x-4">
      {prevPage ? (
        <Link
          href={prevPage.url}
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
