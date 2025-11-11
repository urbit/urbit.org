"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

export const OverviewSubmenu = ({ urbitExplainedSections = [], runningUrbitSections = [] }) => {
  const currentRoute = usePathname();
  const [expandedSection, setExpandedSection] = useState(null);
  const submenuRef = useRef(null);

  // Check if we're in each branch
  const isInUrbitExplained = currentRoute.startsWith('/overview/urbit-explained') || currentRoute === '/overview';
  const isInRunningUrbit = currentRoute.startsWith('/overview/running-urbit');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleLinkClick = () => {
    setExpandedSection(null);
  };

  // Click-away handler
  useEffect(() => {
    if (!expandedSection) return;

    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setExpandedSection(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedSection]);

  return (
    <div
      ref={submenuRef}
      className="md:hidden fixed top-[4.5rem] left-0 right-0 bg-contrast-1 border-b-[1.5px] border-gray-3c z-40"
    >
      {/* Primary tabs */}
      <div className="overflow-x-auto no-scrollbar border-b border-gray-3c/30">
        <div className="flex gap-6 px-4 py-2 min-w-max">
          <button
            onClick={() => toggleSection("explained")}
            className={classNames(
              "font-sans font-bold text-[17px] tracking-[-0.34px] whitespace-nowrap transition-colors",
              expandedSection === "explained"
                ? "text-accent-1"
                : isInUrbitExplained
                  ? "text-contrast-3"
                  : "text-[#cbcbca]"
            )}
          >
            Urbit Explained
          </button>
          <button
            onClick={() => toggleSection("running")}
            className={classNames(
              "font-sans font-bold text-[17px] tracking-[-0.34px] whitespace-nowrap transition-colors",
              expandedSection === "running"
                ? "text-accent-1"
                : isInRunningUrbit
                  ? "text-contrast-3"
                  : "text-contrast-2"
            )}
          >
            Running Urbit
          </button>
        </div>
      </div>

      {/* Secondary links - Urbit Explained */}
      {expandedSection === "explained" && (
        <div className="px-4 py-2 flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
          {urbitExplainedSections.map((section) => {
            const href = section.slug === 'intro'
              ? '/overview/urbit-explained'
              : `/overview/urbit-explained/${section.slug}`;
            const isActive = currentRoute === href;

            return (
              <Link
                key={section.slug}
                href={href}
                onClick={handleLinkClick}
                className={classNames(
                  "font-sans text-base py-1 transition-colors",
                  isActive ? "text-contrast-3 font-bold" : "text-contrast-2"
                )}
              >
                {section.title}
              </Link>
            );
          })}
        </div>
      )}

      {/* Secondary links - Running Urbit */}
      {expandedSection === "running" && (
        <div className="px-4 py-2 flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
          {runningUrbitSections.map((section) => {
            const href = section.slug === 'intro'
              ? '/overview/running-urbit'
              : `/overview/running-urbit/${section.slug}`;
            const isActive = currentRoute === href;

            return (
              <Link
                key={section.slug}
                href={href}
                onClick={handleLinkClick}
                className={classNames(
                  "font-sans text-base py-1 transition-colors",
                  isActive ? "text-contrast-3 font-bold" : "text-contrast-2"
                )}
              >
                {section.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
