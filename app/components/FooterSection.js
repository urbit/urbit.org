"use client";
import Link from "next/link";
import { NewsletterSignup } from "./NewsletterSignup";
import React, { useState, useEffect, useRef } from "react";


export const FooterSection = ({ footerData, onExpansionHeightChange, expandedSection, setExpandedSection }) => {
  // Separate resources and socials from footerData
  const resources = footerData?.find(col => col.column_label === "resources");
  const socials = footerData?.find(col => col.column_label === "socials");

  return (
    <section className="w-full z-10 h-max font-mono text-large text-gray-87 leading-120">

      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileFooter resources={resources} socials={socials} />
      </div>

      {/* Desktop View */}
      <div className="flex hidden md:block">
        <DesktopFooter
          resources={resources}
          socials={socials}
          expandedSection={expandedSection}
          setExpandedSection={setExpandedSection}
        />
      </div>

    </section>
  );
};

// FooterExpansion Component: Displays expanded content at bottom of viewport
export const FooterExpansion = ({ isOpen, type, footerData, onClose, onHeightChange }) => {
  const expansionRef = useRef(null);

  // Handle click outside to close (excluding toggle buttons)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      // Check if click is on expansion panel
      if (expansionRef.current && expansionRef.current.contains(event.target)) {
        return; // Click inside expansion, don't close
      }

      // Check if click is on a toggle button (Resources or Contact)
      const isToggleButton = event.target.closest('button[aria-label^="Toggle"]');
      if (isToggleButton) {
        return; // Let the button handler deal with it
      }

      // Click is outside both expansion and toggle buttons, so close
      onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Notify parent of height changes
  useEffect(() => {
    if (expansionRef.current && onHeightChange) {
      const height = isOpen ? expansionRef.current.offsetHeight : 0;
      onHeightChange(height);
    }
  }, [isOpen, onHeightChange]);

  if (!footerData) return null;

  return (
    <div
      ref={expansionRef}
      className={`
        bg-contrast-1
        px-4
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${isOpen ? 'max-h-[36px]' : 'max-h-0'}
      `}
    >
      {isOpen && (
        <div className="flex flex-row justify-between items-center px-4">
          <div className="font-mono text-sm text-contrast-3">©2025 Urbit</div>
          <div className="justify-end py-2">
            {type === 'resources' && (
              <div className="font-mono flex flex-row flex-wrap gap-x-6 gap-y-2 justify-center items-center">
                {footerData.subItems?.map((link, idx) => (
                  <Link
                    key={link.title || idx}
                    href={link.url}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-contrast-3 hover:text-contrast-2 transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            )}
            {type === 'contact' && (
              <div className="flex flex-row gap-x-4 justify-center items-center">
                {footerData.subItems?.map((link, idx) => (
                  <Link
                    key={link.title || idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-max"
                    aria-label={link.label || link.title}
                  >
                    {link.logo && (
                      <img
                        src={link.logo}
                        alt={link.label || link.title}
                        className="w-4 h-4 invert"
                      />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>)}
    </div>
  );
};

// Mobile Component: Resources stacked vertically, socials as icons
const MobileFooter = ({ resources, socials }) => {
  return (
    <div className="flex flex-col text-[16px] bg-contrast-1 gap-y-6 border-t border-t-1 border-foreground p-4">
      <NewsletterSignup className="z-10 mb-2" />
      {/* Socials - Icons only */}
      {socials && (
        <div className="justify-center flex flex-row gap-x-4">
          {socials.subItems.map((link, idx) => (
            <Link
              key={link.title || idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-max"
              aria-label={link.label || link.title}
            >
              {link.logo && (
                <img
                  src={link.logo}
                  alt={link.label || link.title}
                  className="w-[1em] h-[1em] invert"
                />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Desktop Component: Resources inline, socials as icons
const DesktopFooter = ({ resources, socials, expandedSection, setExpandedSection }) => {
  return (
    <div>
      {/* Extra Large Screens */}
      <div className="hidden xl:block">
        <div className="flex flex-row text-sm gap-x-8 justify-end items-center py-2">
          <Link
            href="/"
            target="_self"
          >
            <img
              src="/icons/urbit-neu.svg"
              alt="Urbit wordmark"
              className="pb-1.5"
            />
          </Link>
          {/* Resources - Inline row */}
          {resources && (
            <div>
              <div className="flex flex-row flex-wrap gap-x-6 gap-y-2">
                {resources.subItems.map((link, idx) => (
                  <Link
                    key={link.title || idx}
                    href={link.url}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-contrast-3 hover:text-contrast-2 transition-colors w-max"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <NewsletterSignup className="z-10  mb-8" />

          {/* Socials - Icons only */}
          {socials && (
            <div>
              <div className="flex flex-row flex-wrap gap-y-4 gap-x-4">
                {socials.subItems.map((link, idx) => (
                  <Link
                    key={link.title || idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-max group"
                    aria-label={link.label || link.title}
                  >
                    {link.logo && (
                      <img
                        src={link.logo}
                        alt={link.label || link.title}
                        className="w-[1em] h-[1em] invert"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
      {/* Mid Size Screens */}
      <div className="hidden md:block xl:hidden">
        <div className="flex flex-row text-sm gap-x-4 justify-end items-center py-2">
          <Link
            href="/"
            target="_self"
          >
            <img
              src="/icons/urbit-neu.svg"
              alt="Urbit wordmark"
              className="pb-1.5"
            />
          </Link>
          <NewsletterSignup className="z-10 mb-8" />

          {/* Resources Toggle Button */}
          <button
            onClick={() => setExpandedSection(expandedSection === 'resources' ? null : 'resources')}
            className={`
              flex flex-row items-center gap-x-2
              text-sm transition-colors
              ${expandedSection === 'resources' ? 'text-foreground' : 'text-contrast-3 hover:text-contrast-2'}
            `}
            aria-label="Toggle resources"
          >
            <span>Resources</span>
            <img
              src="/icons/toggle-karat.svg"
              alt=""
              className={`
                w-[9px] h-[7px] invert transition-transform duration-300
                ${expandedSection === 'resources' ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </button>

          {/* Contact Toggle Button */}
          <button
            onClick={() => setExpandedSection(expandedSection === 'contact' ? null : 'contact')}
            className={`
              flex flex-row items-center gap-x-2
              text-sm transition-colors
              ${expandedSection === 'contact' ? 'text-foreground' : 'text-contrast-3 hover:text-contrast-2'}
            `}
            aria-label="Toggle contact"
          >
            <span>Contact</span>
            <img
              src="/icons/toggle-karat.svg"
              alt=""
              className={`
                w-[9px] h-[7px] invert transition-transform duration-300
                ${expandedSection === 'contact' ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </button>
        </div>
      </div>
    </div >
  );
};
