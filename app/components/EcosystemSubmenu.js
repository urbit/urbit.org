"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";

export const EcosystemSubmenu = () => {
  const [activeSection, setActiveSection] = useState("companies");

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["companies", "articles-press"];
      const scrollPosition = window.scrollY + 200; // Offset for better UX

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: "companies", label: "Companies", href: "#companies" },
    { id: "articles-press", label: "Articles & Press", href: "#articles-press" },
  ];

  return (
    <div className="md:hidden fixed top-[4.5rem] left-0 right-0 bg-contrast-1 border-b-[1.5px] border-gray-3c z-40">
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-6 px-4 py-3 min-w-max">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              className={classNames(
                "font-sans font-bold text-[17px] tracking-[-0.34px] whitespace-nowrap transition-colors",
                activeSection === tab.id ? "text-gray-3c" : "text-[#cbcbca]"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
