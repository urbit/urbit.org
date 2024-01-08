import React from "react";
import Link from "next/link";
import classnames from "classnames";

export default function Header({ pages = [], path }) {
  return (
    <div className="sticky top-12 md:top-16 z-40 layout">
      <nav className="flex items-center w-full h-12 md:h-16 nav-space-x text-gray bg-black whitespace-nowrap overflow-x-auto type-ui layout-px">
        {pages.map((p) => (
          <Link
            className={classnames({
              "text-brite": path === p.href,
              "hover:text-brite": path !== p.href,
            })}
            href={p.href}
          >
            {p.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
