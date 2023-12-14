import React from "react";
import { IntraNav as IntraNavFDS } from "@urbit/fdn-design-system";

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

const pages = [];

export default function IntraNav({ search }) {
  return (
    <IntraNavFDS
      ourSite={ourSite}
      sites={sites}
      pages={pages}
      search={search}
    />
  );
}
