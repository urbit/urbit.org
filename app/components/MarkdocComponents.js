"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MarkdocLink = ({ children, href }) => {
  const pathname = usePathname();
  const normalizedHref = href?.toLowerCase() || "";
  const isMailto = normalizedHref.startsWith("mailto:");
  const isTel = normalizedHref.startsWith("tel:");
  const isExternal = normalizedHref.startsWith("http");
  const eventName = isMailto || isTel ? "link-contact" : isExternal ? "link-external" : undefined;
  const label = React.Children.toArray(children)
    .map((child) => (typeof child === "string" ? child : ""))
    .join(" ")
    .trim();

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : ""}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={isExternal ? "external" : ""}
      data-umami-event={eventName}
      data-umami-event-label={label || undefined}
      data-umami-event-destination={eventName ? href : undefined}
      data-umami-event-context={eventName ? pathname : undefined}
      data-umami-event-variant={eventName ? "content" : undefined}
    >
      {children}
    </Link>
  );
};

const MarkdocIframe = ({ src, className, width, height, title }) => {
  return (
    <iframe
      src={src}
      className={className}
      width={width}
      height={height}
      title={title}
      loading="lazy"
    ></iframe>
  );
};

// const UnescapedHtml = ({ htmlWrapperTag = "div", children }) => {
//   const html =
//     typeof children === "string"
//       ? children
//       : typeof children.props.children === "string"
//       ? children.props.children
//       : children.props.children.join("");

//   const CustomTag = htmlWrapperTag;
//   return <CustomTag dangerouslySetInnerHTML={{ __html: html }} />;
// };

export { MarkdocLink, MarkdocIframe };
