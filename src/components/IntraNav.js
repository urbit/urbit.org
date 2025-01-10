import React, { useState, useEffect } from "react";
import { IntraNav as IntraNavFDS } from "@urbit/fdn-design-system";
import { DocSearch } from "@docsearch/react";
import classnames from "classnames";

const ourSite = {
  title: "Urbit",
  href: "https://urbit.org",
};

const sites = [
  {
    title: "Docs",
    href: "https://docs.urbit.org",
    theme: "blu",
  },
  // {
  //   title: "Foundation",
  //   href: "https://urbit.foundation",
  //   theme: "mos",
  // },
  // {
  //   title: "Roadmap",
  //   href: "https://roadmap.urbit.org",
  //   theme: "mos-light",
  // },
  {
    title: "Technical Journal",
    href: "https://ustj.urbit.org",
    theme: "ylw",
  },
  {
    title: "Network Explorer ↗",
    href: "https://network.urbit.org",
    target: "_blank",
    theme: "gry",
  },
];

const pages = [
  { title: "Get Started", href: "/get-started" },
  { title: "Overview", href: "/overview" },
  { title: "Grants", href: "/grants" },
  { title: "Blog", href: "/blog" },
];

const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const hasSetLight = () => {
  const theme = localStorage.getItem("theme");
  return !!theme && theme === "light";
};

const respectSystemPreference = () => !localStorage.getItem("theme");

export default function IntraNav({}) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (hasSetLight()) {
      document.querySelector(":root").setAttribute("theme", "light");
      setDarkMode(false);
    } else {
      document.querySelector(":root").removeAttribute("theme");
      setDarkMode(true);
    }
  });

  const cycleTheme = () => {
    if (hasSetLight()) {
      localStorage.removeItem("theme");
      document.querySelector(":root").removeAttribute("theme");
    } else {
      localStorage.setItem("theme", "light");
      document.querySelector(":root").setAttribute("theme", "light");
    }
    setDarkMode(!darkMode);
  };

  const iconUrl = darkMode ? "/images/lightmode.svg" : "/images/darkmode.svg";

  return (
    <IntraNavFDS
      ourSite={ourSite}
      sites={sites}
      pages={pages}
      search={
        <div className="flex h-full w-full space-x-2 p-2 md:p-3 bg-gray">
          <DocSearch
            appId="X99UXGCKE0"
            apiKey="e889421ff5efbeb31bb90c324fd6454b"
            indexName="urbit.org"
            placeholder="Search"
          />
          <div
            className={
              "hidden xs:flex items-center h-full w-12 md:w-14 rounded-full bg-brite"
            }
          >
            <button
              className={classnames(
                "flex items-center aspect-square h-6 md:h-8 mx-1 rounded-full bg-gray",
                {
                  "mr-auto": darkMode,
                  "ml-auto": !darkMode,
                }
              )}
              onClick={cycleTheme}
            >
              <div
                className={"inline-block aspect-square w-3/4 m-auto bg-brite"}
                style={{
                  "-webkit-mask-image": `url(${iconUrl})`,
                  "mask-image": `url(${iconUrl})`,
                }}
              />
            </button>
          </div>
        </div>
      }
    />
  );
}
