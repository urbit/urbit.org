"use client";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { useRef, useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import { NewsletterSignup } from "./NewsletterSignup";
import { AnnouncementsSubmenu } from "./AnnouncementsSubmenu";
import { OverviewSubmenu } from "./OverviewSubmenu";
import { EcosystemSubmenu } from "./EcosystemSubmenu";

const buildHeaderNavSlug = (navItem) => {
  const url = navItem?.url || "";
  if (url === "/") {
    return "home";
  }

  const base = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const normalized = base
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  if (normalized) {
    return normalized;
  }

  return (navItem?.title || "unknown")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
};

const getHeaderNavEvent = (navItem) => {
  const url = navItem?.url || "";
  const normalized = url.toLowerCase();

  if (normalized.startsWith("mailto:") || normalized.startsWith("tel:")) {
    return "link-contact";
  }

  if (navItem?.external || normalized.startsWith("http")) {
    return "link-external";
  }

  return `nav-header-${buildHeaderNavSlug(navItem)}`;
};

const SearchIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="16.65" y1="16.65" x2="21" y2="21" />
  </svg>
);

export const HeaderNav = ({
  nav,
  homepage,
  inFrame = false,
  mobileNav,
  announcements,
  urbitExplainedSections,
  runningUrbitSections,
  onSearchOpen,
  isSearchOpen,
}) => {
  const headerRef = useRef(null);

  const currentRoute = usePathname();

  return (
    <React.Fragment>
      <MobileNav
        nav={mobileNav || nav}
        currentRoute={currentRoute}
        announcements={announcements}
        urbitExplainedSections={urbitExplainedSections}
        runningUrbitSections={runningUrbitSections}
        onSearchOpen={onSearchOpen}
        isSearchOpen={isSearchOpen}
      />

      <section
        ref={headerRef}
        className={classNames(
          "font-sans hidden md:block h-auto items-center justify-center leading-120 md:pt-0 md:pb-0 pt-3 pb-3",
          inFrame ? "" : "container fixed z-10 background"
        )}
      >
        {inFrame ? (
                <GlobalNav nav={nav} onSearchOpen={onSearchOpen} isSearchOpen={isSearchOpen} />

        ) : (
          <div className="h-auto md:flex md:flex-row md:items-center md:justify-between my-4 md:my-8">
            <div className="w-full leading-[1cap] flex justify-start h-full ">
              <div className="col-span-5 hidden md:flex w-full items-center justify-end">
          <GlobalNav nav={nav} onSearchOpen={onSearchOpen} isSearchOpen={isSearchOpen} />
              </div>
            </div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

const MobileNav = ({
  nav,
  currentRoute,
  announcements,
  urbitExplainedSections,
  runningUrbitSections,
  onSearchOpen,
}) => {
  const [menuIsOpen, setMenuOpen] = useState(false);

  const routeMap = {
    "": "",
    "get-on-the-network": "Run Urbit",
    overview: "Overview",
    blog: "Blog",
    ecosystem: "Ecosystem",
  };
  const splitRoute = currentRoute.split("/");

  const toggleMenu = () => {
    setMenuOpen(!menuIsOpen);
  };

  const handleSearchOpen = () => {
    if (menuIsOpen) {
      setMenuOpen(false);
    }
    onSearchOpen?.();
  };

  return (
    <>
      <section className="md:hidden font-sans fixed flex w-full top-0 left-0  h-auto items-center bg-contrast-1 justify-center leading-120 z-50">
        <div className={`h-[4.5rem] flex items-center font-[600] relative w-full ${(menuIsOpen || currentRoute.startsWith("/overview") || currentRoute.startsWith("/ecosystem")) ? "" : "border-b-[1.5px] border-contrast-3"}`}>
          <div
            className="flex items-center cursor-pointer h-full w-full justify-between select-none relative"
          >
            <Link
              onClick={(e) => {
                const isHomepage = currentRoute === '/';

                if (isHomepage) {
                  e.preventDefault(); // Don't navigate
                  if (menuIsOpen) {
                    toggleMenu(); // Close menu if open
                  }
                  // Do nothing if menu is closed,
                } else if (menuIsOpen) {
                  toggleMenu(); // Close menu and allow navigation
                }
              }}
              href="/"
              className="flex w-[72px] h-8 relative items-center pl-[.6em]"
            >
              {/* TODO fix icons for supporting darkmode */}
              <Image
                src="/icons/urbit-neu.svg"
                alt="Urbit wordmark"
                width={72}
                height={13}
                className="pb-1 w-[72px] h-auto"
              />
              <Image
                src="/icons/urbit-neu-dark.svg"
                alt="Urbit wordmark"
                width={72}
                height={13}
                className="pb-1 w-[72px] h-auto hidden"
              />
            </Link>
          </div>
          <div className="col-span-8 w-full flex pr-[.7em] items-center justify-end gap-3">
            <span className="pr-4">{routeMap[splitRoute[1]]}</span>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={menuIsOpen ? "Close menu" : "Open menu"}
              className="flex items-center"
            >
              {menuIsOpen
                ?
                <div>
                  <Image
                    src="/icons/hamburger-dark.svg"
                    alt="hamburger menu open"
                    width={28}
                    height={24}
                    className="w-7 h-6 hidden"
                  />
                  <Image
                    src="/icons/hamburger.svg"
                    alt="hamburger menu open"
                    width={28}
                    height={24}
                    className="w-7 h-6"
                  />
                </div>
                :
                <div>
                  <Image
                    src="/icons/hamburger-dark.svg"
                    alt="hamburger menu closed"
                    width={28}
                    height={24}
                    className="w-7 h-6 hidden"
                  />
                  <Image
                    src="/icons/hamburger.svg"
                    alt="hamburger menu closed"
                    width={28}
                    height={24}
                    className="w-7 h-6"
                  />
                </div>
              }
            </button>
          </div>
        </div>
        {/* Persistent Submenus - Mobile Only */}
        {currentRoute.startsWith('/overview') && (
          <OverviewSubmenu
            urbitExplainedSections={urbitExplainedSections}
            runningUrbitSections={runningUrbitSections}
          />
        )}
        {currentRoute.startsWith('/ecosystem') && <EcosystemSubmenu />}
        <ul
          className={classNames(
            "absolute flex flex-col justify-between top-0 font-[600]  mt-[4.5rem] left-0 bg-contrast-1 min-h-[40vh] w-[100vw] border-b-[1.5px] border-contrast-3 z-50",
            { hidden: !menuIsOpen }
          )}
        >
          {/* Internal Navigation */}
          <div className="px-4 py-4 flex flex-col gap-2">
            {onSearchOpen && (
              <button
                type="button"
                onClick={handleSearchOpen}
                aria-label="Open search"
                data-umami-event="cta-header-search"
                data-umami-event-label="Search"
                data-umami-event-destination="search-modal"
                data-umami-event-context={currentRoute}
                data-umami-event-variant="mobile"
                className="text-[26px] leading-[1.1] text-primary first-of-type:mt-4 text-left transition-colors"
              >
                <span className="nav-button leading-inherit flex items-center gap-2">
                  Search
                </span>
              </button>
            )}
            {nav?.filter(navItem => !navItem.external).map((navItem, i) => {
              const isActive = currentRoute.startsWith(navItem.url) && navItem.url !== '/';
              const isHome = currentRoute === '/' && navItem.url === '/';
              const eventName = getHeaderNavEvent(navItem);
              const eventVariant = eventName.startsWith("link-") ? "header" : "header-mobile";

              return (
                <Link
                  className={classNames(
                    "text-[26px] leading-[1.1] first-of-type:mt-4 last-of-type:mb-4 transition-colors",
                    (isActive || isHome) ? "text-primary" : "text-contrast-2"
                  )}
                  key={`${navItem} + ${i}`}
                  href={navItem.url}
                  onClick={toggleMenu}
                  data-umami-event={eventName}
                  data-umami-event-label={navItem.title}
                  data-umami-event-destination={navItem.url}
                  data-umami-event-context={currentRoute}
                  data-umami-event-variant={eventVariant}
                >
                  <span className="nav-button leading-inherit flex items-center gap-2">
                    {navItem.title}
                    {/* TODO Super hacky way of handling different color requirements between nav items with this icon */}
                      {navItem.icon && (
                       <Image
                         src={`/icons/reverse-${navItem.icon}`}
                         alt="Urbit configurator icon"
                         width={16}
                         height={16}
                         className="w-4 h-4"
                       />
                     )}

                  </span>
                </Link>
              );
            })}
          </div>

          {/* Newsletter + Resources Block */}
          <div className="px-4 py-4 flex flex-col gap-6">
            {/* Newsletter Signup */}
            <div>
              <NewsletterSignup />
            </div>

            {/* External Resources Section */}
            {nav?.filter(navItem => navItem.external).length > 0 && (
              <div className="flex flex-col gap-4 pt-4 border-t border-contrast-3">
                <h3 className="text-sm uppercase tracking-wider text-contrast-3 opacity-60">Resources</h3>
                <div className="flex flex-col gap-4">
                  {nav?.filter(navItem => navItem.external).map((navItem, i) => {
                    const eventName = getHeaderNavEvent(navItem);

                    return (
                      <Link
                        className="text-xl leading-[1cap] text-primary transition-colors hover:text-contrast-2"
                        key={`${navItem} + ${i}`}
                        href={navItem.url}
                        onClick={toggleMenu}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-umami-event={eventName}
                        data-umami-event-label={navItem.title}
                        data-umami-event-destination={navItem.url}
                        data-umami-event-context={currentRoute}
                        data-umami-event-variant="header"
                      >
                        <span className="nav-button leading-inherit flex items-center gap-2">
                          {navItem.title}
                          <span className="ml-1">↗</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </ul>
      </section >

      {currentRoute === '/' && <AnnouncementsSubmenu announcement={announcements} />
      }
    </>
  );
};

const GlobalNav = ({ nav, onSearchOpen, isSearchOpen }) => {
  const currentRoute = usePathname();

  return (
    <React.Fragment>
      <ul className="flex mb-0 flex-row gap-x-3 pt-0 text-large font-[600] items-center">
        {nav?.map((navItem, i) => {

          const isActive = currentRoute.startsWith(navItem.url);
          const eventName = getHeaderNavEvent(navItem);
          const eventVariant = eventName.startsWith("link-") ? "header" : "header-desktop";

          return (
            <Link
              className={classNames(
                "text-lg flex items-center py-1 px-3 gap-x-2 rounded-md",
                navItem.variant == 'primary'
                  ? "text-background bg-foreground rounded-lg hover:text-contrast-1"
                  : isActive
                    ? "text-contrast-3 rounded-lg border-secondary"
                    : "text-contrast-2 rounded-lg border-secondary"
              )}
              key={`${navItem} + ${i}`}
              href={navItem.url}
              target={navItem.external ? "_blank" : ""}
              data-umami-event={eventName}
              data-umami-event-label={navItem.title}
              data-umami-event-destination={navItem.url}
              data-umami-event-context={currentRoute}
              data-umami-event-variant={eventVariant}
            >
              <span className="">{navItem.title}</span>
              {navItem.icon && (
                <Image
                  src={`/icons/${navItem.icon}`}
                  alt={`${navItem.icon} icon`}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              )}
              {navItem.external && (<span className="ml-[.2em]">↗</span>)}
            </Link>
          );
        })}
        {onSearchOpen && (
          <button
            type="button"
            onClick={onSearchOpen}
            aria-label="Open search"
            data-umami-event="cta-header-search"
            data-umami-event-label="Search"
            data-umami-event-destination="search-modal"
            data-umami-event-context={currentRoute}
            data-umami-event-variant="desktop"
            className={`flex h-[36px] w-[36px] items-center justify-center rounded-md border transition-colors duration-200 ${
              isSearchOpen
                ? "border-primary text-primary"
                : "border-contrast-2 text-contrast-2 hover:border-primary hover:text-primary"
            }`}
          >
            <SearchIcon className="h-[18px] w-[18px]" />
          </button>
        )}
      </ul>
    </React.Fragment>
  );
};
