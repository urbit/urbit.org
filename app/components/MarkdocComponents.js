"use client";
import Link from "next/link";
import classNames from "classnames";

const MarkdocLink = ({ children, href }) => {
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : ""}
      className={isExternal ? "external" : ""}
    >
      {children}
    </Link>
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

export { MarkdocLink };
