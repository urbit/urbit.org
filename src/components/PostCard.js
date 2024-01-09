import React from "react";
import Link from "next/link";
import classnames from "classnames";

export default function PostCard({
  className,
  title,
  description,
  date,
  authorName,
  authorPlanet,
  href,
  target,
  image,
}) {
  const style = image ? { backgroundImage: `url(${image})` } : {};

  return (
    <Link
      className={classnames(
        "flex flex-col h-full w-full",
        className
      )}
      href={href}
      target={target}
    >
      <div className="relative aspect-square w-full bg-gray rounded-t-lg">
        {image && (
          <img
            className="absolute h-full w-full object-cover rounded-t-lg"
            alt=""
            src={image}
          />
        )}
        <h3 className="absolute w-full text-lite bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent opacity h2 p-4 rounded-t-lg">
          {title}
        </h3>
      </div>
      <div className="flex flex-col bg-brite text-gray rounded-b-lg p-4">
        <p className="h-[5.2em] body-sm line-clamp-4 text-ellipsis">
          {description}
        </p>
        {(date || authorName || authorPlanet) && (
          <div className="h-[2.6em]">
            <hr className="hr-horizontal border-gray mb-0.5 md:mb-2 xl:mb-3.5" />
            <div className="flex justify-between text-base font-medium">
              <p>{date}</p>
              <div>
                {authorName && <p>{authorName}</p>}
                {authorPlanet && (
                  <p className="relative">
                    <span className="absolute -left-3">~</span>
                    {authorPlanet}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
