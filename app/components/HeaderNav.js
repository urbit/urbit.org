"use client";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { usePathname } from "next/navigation";
import { NewsletterSignup } from "./NewsletterSignup";
import { AnnouncementsSubmenu } from "./AnnouncementsSubmenu";
import { OverviewSubmenu } from "./OverviewSubmenu";
import { EcosystemSubmenu } from "./EcosystemSubmenu";

export const HeaderNav = ({ nav, homepage, inFrame = false, mobileNav, announcements, urbitExplainedSections, runningUrbitSections }) => {
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
      />

      <section
        ref={headerRef}
        className={classNames(
          "font-sans hidden md:block h-auto items-center justify-center leading-120 md:pt-0 md:pb-0 pt-3 pb-3",
          inFrame ? "" : "container fixed z-10 background"
        )}
      >
        {inFrame ? (
          <GlobalNav nav={nav} />
        ) : (
          <div className="h-auto md:flex md:flex-row md:items-center md:justify-between my-4 md:my-8">
            <div className="w-full leading-[1cap] flex justify-start h-full ">
              <div className="col-span-5 hidden md:flex w-full items-center justify-end">
                <GlobalNav nav={nav} />
              </div>
            </div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

const MobileNav = ({ nav, currentRoute, announcements, urbitExplainedSections, runningUrbitSections }) => {
  const [menuIsOpen, setMenuOpen] = useState(false);

  const routeMap = {
    "": "",
    "get-on-the-network": "Run Urbit",
    overview: "Overview",
    blog: "Blog",
    ecosystem: "Ecosystem",
  };
  const splitRoute = currentRoute.split("/");

  useEffect(() => { }, [menuIsOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuIsOpen);
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
              className="flex w-36 h-16 relative items-center pl-[.7em]"
            >
              {/* TODO fix icons for supporting darkmode */}
              <img
                src="/icons/urbit-neu.svg"
                alt="Urbit wordmark"
                className="pb-1.5"
              />
              <img
                src="/icons/urbit-neu-dark.svg"
                alt="Urbit wordmark"
                className="pb-1.5 hidden"
              />
            </Link>
          </div>
          <div
            onClick={toggleMenu}
            className="col-span-8 w-full flex pr-[.7em] items-center justify-end"
          >
            <span className="pr-4">{routeMap[splitRoute[1]]}</span>
            <span className="">{menuIsOpen
              ?
              <div>
                <img
                  src="/icons/hamburger-dark.svg"
                  alt="hamburger menu open"
                  className="w-7 h-6 hidden"
                />
                <img
                  src="/icons/hamburger.svg"
                  alt="hamburger menu open"
                  className="w-7 h-6"
                />
              </div>
              :
              <div>
                <img
                  src="/icons/hamburger-dark.svg"
                  alt="hamburger menu closed"
                  className="w-7 h-6 hidden"
                />
                <img
                  src="/icons/hamburger.svg"
                  alt="hamburger menu closed"
                  className="w-7 h-6"
                />
              </div>
            }</span>
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
          <div className="px-4 py-4 flex flex-col gap-6">
            {nav?.filter(navItem => !navItem.external).map((navItem, i) => {
              const isActive = currentRoute.startsWith(navItem.url) && navItem.url !== '/';
              const isHome = currentRoute === '/' && navItem.url === '/';

              return (
                <Link
                  className={classNames(
                    "text-3xl leading-[1cap] first-of-type:mt-4 last-of-type:mb-4 transition-colors",
                    (isActive || isHome) ? "text-primary" : "text-contrast-3"
                  )}
                  key={`${navItem} + ${i}`}
                  href={navItem.url}
                  onClick={toggleMenu}
                >
                  <span className="nav-button leading-inherit flex items-center gap-2">
                    {navItem.title}
                    {/* TODO Super hacky way of handling different color requirements between nav items with this icon */}
                    {navItem.icon && (
                      <img src={`/icons/reverse-${navItem.icon}`}
                        alt="Urbit configurator icon"
                        className='w-4 h-4'
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
                    return (
                      <Link
                        className="text-xl leading-[1cap] text-primary transition-colors hover:text-contrast-2"
                        key={`${navItem} + ${i}`}
                        href={navItem.url}
                        onClick={toggleMenu}
                        target="_blank"
                        rel="noopener noreferrer"
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

const GlobalNav = ({ nav }) => {
  const currentRoute = usePathname();

  return (
    <React.Fragment>
      <ul className="flex mb-0 flex-row gap-x-3 pt-0 text-large font-[600]">
        {nav?.map((navItem, i) => {

          const isActive = currentRoute.startsWith(navItem.url);

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
            >
              <span className="">{navItem.title}</span>
              {navItem.icon && (
                <img src={`/icons/${navItem.icon}`}
                  alt={`${navItem.icon} icon`}
                  className='w-4 h-4'
                />
              )}
              {navItem.external && (<span className="ml-[.2em]">↗</span>)}
            </Link>
          );
        })}
      </ul>
    </React.Fragment>
  );
};
