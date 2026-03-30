"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/**
 * Modal - A reusable modal component
 *
 * Displays content in a centered overlay with:
 * - Semi-transparent backdrop (click to close)
 * - X button to close
 * - Escape key to close
 * - Body scroll lock when open
 *
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Called when modal is dismissed
 * @param {ReactNode} children - Custom content slot
 * @param {string} panelClassName - Optional panel styling overrides
 * @param {string} contentClassName - Optional content wrapper classes
 */
export function Modal({
  isOpen,
  onClose,
  children,
  overlayClassName = "",
  panelClassName = "",
  contentClassName = "",
  closeButtonClassName = "",
  closeIconClassName = "",
  closeIconSize = 24,
  closeIconStrokeWidth = 2,
}) {
  const canUseDOM = typeof document !== "undefined";
  const resolvedContentClassName = contentClassName || "p-6 pt-12";

  // Handle escape key
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Handle body scroll lock and escape key
  useEffect(() => {
    if (isOpen) {
      // Lock scroll on both html and body to ensure it works
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen || !canUseDOM) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${overlayClassName}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`relative bg-contrast-1 border border-gray-87 rounded-16px shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn ${panelClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-contrast-2 hover:text-primary transition-colors ${closeButtonClassName}`}
          aria-label="Close modal"
        >
          <svg
            width={closeIconSize}
            height={closeIconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={closeIconStrokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={closeIconClassName}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Content */}
        <div className={resolvedContentClassName}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
