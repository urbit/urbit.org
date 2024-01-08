import React from "react";
import Link from "next/link";
import path from "path";
import classnames from "classnames";

export default function Org({ className = "", title, image, slug }) {
  return (
    <Link
      className={classnames(
        "relative flex flex-col aspect-square bg-brite rounded-xl p-2 sm:p-4",
        className
      )}
      href={path.join("/ecosystem", "orgs", slug)}
    >
      <h3 className="h3 absolute text-black">{title}</h3>
      <div className="flex-1 flex text-center items-center">
        <img className="w-1/2 m-auto" src={image} />
      </div>
    </Link>
  );
}
