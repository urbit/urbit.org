"use client"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useLayoutSlots } from "../lib/layoutSlots";

export const OverviewNav = ({ urbitExplainedSections = [], runningUrbitSections = [] }) => {
  const currentRoute = usePathname();
  const { setSidebarVisible } = useLayoutSlots();

  // Ensure sidebar is visible on pages without hero
  useEffect(() => {
    setSidebarVisible(true);
  }, [setSidebarVisible]);

  // Check if we're in each branch
  const isInUrbitExplained = currentRoute.startsWith('/overview/urbit-explained') || currentRoute === '/overview';
  const isInRunningUrbit = currentRoute.startsWith('/overview/running-urbit');

  return (
    <nav className="flex flex-col gap-8">
      {/* Urbit Explained Section */}
      <div>
        <h3 className={`text-2xl font-sans font-[400] mb-4 transition-colors ${isInUrbitExplained ? 'text-contrast-3' : 'text-contrast-2'}`}>
          Urbit Explained
        </h3>
        <ul className="flex flex-col gap-2 text-2xl font-sans">
          {urbitExplainedSections.map((section) => {
            const href = section.slug === 'intro'
              ? '/overview/urbit-explained'
              : `/overview/urbit-explained/${section.slug}`;
            const isActive = currentRoute === href;

            return (
              <li key={section.slug}>
                <Link
                  className={`transition-colors ${isActive ? 'text-contrast-3' : 'text-contrast-2 hover:text-contrast-3'}`}
                  href={href}
                >
                  <span className="nav-button">{section.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Running Urbit Section */}
      <div>
        <h3 className={`text-2xl font-sans font-[400] mb-4 transition-colors ${isInRunningUrbit ? 'text-contrast-3' : 'text-contrast-2'}`}>
          Running Urbit
        </h3>
        <ul className="flex flex-col gap-2 text-2xl font-sans">
          {runningUrbitSections.map((section) => {
            const href = section.slug === 'intro'
              ? '/overview/running-urbit'
              : `/overview/running-urbit/${section.slug}`;
            const isActive = currentRoute === href;

            return (
              <li key={section.slug}>
                <Link
                  className={`transition-colors ${isActive ? 'text-contrast-3' : 'text-contrast-2 hover:text-contrast-3'}`}
                  href={href}
                >
                  <span className="nav-button">{section.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
