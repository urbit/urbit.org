import React, { useState, useEffect } from "react";
import { IntraNav as IntraNavFDS } from "@urbit/fdn-design-system";
import { DocSearch } from "@docsearch/react";
import classnames from "classnames";

const ourSite = {
  title: "Urbit.org",
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
  {
    title: "Network Explorer ↗",
    href: "https://network.urbit.org",
    target: "_blank",
  },
];

const pages = [{ title: "Blog", href: "/blog" }];

const prefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const hasSetDark = () => {
  const theme = localStorage.getItem("theme");
  return !!theme && theme === "dark";
};

const respectSystemPreference = () => !localStorage.getItem("theme");

export default function IntraNav({}) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (respectSystemPreference()) {
      localStorage.removeItem("theme");
      document.querySelector(":root").removeAttribute("theme");
      if (prefersDark()) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    } else {
      if (hasSetDark()) {
        document.querySelector(":root").setAttribute("theme", "dark");
        setDarkMode(true);
      } else {
        document.querySelector(":root").setAttribute("theme", "light");
        setDarkMode(false);
      }
    }
  });

  const cycleTheme = () => {
    if ((respectSystemPreference() && prefersDark()) || hasSetDark()) {
      if (prefersDark()) {
        localStorage.setItem("theme", "light");
        document.querySelector(":root").setAttribute("theme", "light");
      } else {
        localStorage.removeItem("theme");
        document.querySelector(":root").removeAttribute("theme");
      }
    } else {
      if (!prefersDark()) {
        localStorage.setItem("theme", "dark");
        document.querySelector(":root").setAttribute("theme", "dark");
      } else {
        localStorage.removeItem("theme");
        document.querySelector(":root").removeAttribute("theme");
      }
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
        <div className="flex h-full w-full justify-end">
          <div
            className={
              "hidden xs:flex items-center h-full w-12 md:w-14 rounded-full bg-gray"
            }
          >
            <button
              className={classnames(
                "flex items-center aspect-square h-6 md:h-8 mx-1 rounded-full bg-brite",
                {
                  "mr-auto": darkMode,
                  "ml-auto": !darkMode,
                }
              )}
              onClick={cycleTheme}
            >
              <div
                className={"inline-block aspect-square w-3/4 m-auto bg-gray"}
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
