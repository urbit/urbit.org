import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import classnames from "classnames";
import path from "path";
import MenuTray from "../components/MenuTray";
import Section from "../components/Section";
import { capitalize } from "../lib/lib";

function ActiveLink({ children, href, className, currentPath }) {
  const firstCrumb = currentPath.split("/")[1];

  const activeClassName = classnames({
    "text-wall-600": "/" + firstCrumb === href,
    "text-wall-500": "/" + firstCrumb !== href,
  });

  return (
    <Link href={href}>
      <a className={`${className} ${activeClassName}`}>{children}</a>
    </Link>
  );
}

export default function Header(props) {
  const [isOpen, setTray] = useState(false);
  const [shortcut, setShortcut] = useState("");

  const currentPath = useRouter().asPath;

  const routeDepth = currentPath.split("/").length;

  const firstCrumb = currentPath.split("/")[1];

  const detectOS = () => {
    const agent = window.navigator.appVersion;
    if (agent.includes("Win")) {
      return "Ctrl+K";
    } else if (agent.includes("Mac")) {
      return "⌘K";
    } else if (agent.includes("Linux")) {
      return "Ctrl+K";
    }
  };

  useEffect(() => {
    setShortcut(detectOS());
  }, []);

  return (
    <header className="layout px-4 md:px-8 flex justify-between items-center pt-8 md:pt-10 lg:pt-12 pb-10 md:pb-12 lg:pb-24">
      <div>
        <Link href="/">
          <a className="type-ui">Urbit</a>
        </Link>
        {routeDepth > 2 ? (
          <Link href={`/${firstCrumb}`}>
            <a className="inline md:hidden type-ui text-wall-500 ml-2">
              {capitalize(firstCrumb)}
            </a>
          </Link>
        ) : null}
      </div>
      {
        // Large screen header
      }
      <nav className="items-center hidden md:flex">
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/understanding-urbit"
        >
          About
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/grants"
        >
          Grants
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/blog"
        >
          Blog
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 type-ui"
          href="/events"
        >
          Events
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 text-green-400 type-ui button-text"
          href="/getting-started"
        >
          Get Started
        </ActiveLink>
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.search.toggleSearch(e);
          }}
          className="bg-wall-100 text-wall-500 flex px-4 py-1 rounded-lg type-ui"
        >
          <div>Search</div>
          <div className="ml-4 text-wall-400">{shortcut}</div>
        </button>
      </nav>

      {
        // Small screen header
      }
      <MenuTray isOpen={isOpen} setTray={setTray} search={props.search}>
        <Link href="/">
          <a className="type-ui mb-12">Urbit</a>
        </Link>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/docs"
        >
          Docs
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/blog"
        >
          Blog
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/events"
        >
          Events
        </ActiveLink>
        <ActiveLink
          currentPath={currentPath}
          className="mr-5 mb-4 type-h3"
          href="/grants"
        >
          Grants
        </ActiveLink>
      </MenuTray>
    </header>
  );
}
