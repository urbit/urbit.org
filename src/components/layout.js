import Link from "next/link";
import React from "react";
import classnames from "classnames";

function Section({ children, className = "", short = false, wide = false }) {
  const spacing = classnames({
    "pb-8": short,
    "pb-20": !short,
    "w-full": wide,
    "w-full sm:w-11/12 md:w-10/12 xl:w-9/12": !wide,
  });
  return (
    <section className={`space-y-20 ${spacing} ${className}`}>
      {children}
    </section>
  );
}

function SubSection({ children, className }) {
  return <div className={"space-y-8 " + className}>{children}</div>;
}

function H1({ children, className = "", divider = false }) {
  return (
    <h1 className={"font-normal text-brite " + className}>
      {divider && <hr className="hr-horizontal mb-4" />}
      {children}
    </h1>
  );
}

function H2({ children, className = "", divider = false }) {
  return (
    <h2 className={"text-brite " + className}>
      {divider && <hr className="hr-horizontal mb-4" />}
      {children}
    </h2>
  );
}

function Text({ children, className = "" }) {
  return (
    <p
      className={
        "text-brite text-2xl md:text-3xl xl:text-4xl font-normal leading-normal " +
        className
      }
    >
      {children}
    </p>
  );
}

function CTAs({ children, className = "" }) {
  return (
    <div className={"flex flex-wrap flex-row gap-4 " + className}>
      {children}
    </div>
  );
}

function CTA({ children, href, className = "", dark = false }) {
  const color = classnames({ "btn-dark": dark, "btn-light": !dark });
  return (
    <Link className={`btn-sm ${color} ${className}`} href={href}>
      {children}
    </Link>
  );
}

export { Section, SubSection, H1, H2, Text, CTAs, CTA };
