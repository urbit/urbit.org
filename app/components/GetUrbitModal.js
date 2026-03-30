"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Modal } from "./Modal";
import { copyToClipboard, RUNTIME_INSTALL_COMMAND } from "../lib/runtimeInstall";

const GET_URBIT_MODAL_PROPS = {
  overlayClassName:
    "items-start justify-center bg-[rgba(255,255,255,0.18)] px-4 pt-[96px] md:pt-[180px] backdrop-blur-[10px]",
  panelClassName:
    "w-full max-w-[920px] max-h-[calc(100dvh-96px-2rem)] md:max-h-[calc(100dvh-180px-2rem)] overflow-hidden rounded-[6px] border-0 bg-contrast-1 shadow-[0px_4px_40.4px_0px_rgba(63,63,63,0.32)]",
  contentClassName: "px-[18px] pb-[18px] pt-[20px]",
  closeButtonClassName: "right-[18px] top-[18px]",
  closeIconSize: 17,
  closeIconStrokeWidth: 1.75,
};

export function GetUrbitModal({ isOpen, onClose }) {
  const [copyState, setCopyState] = useState("idle");
  const resetCopyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetCopyTimeoutRef.current) {
        window.clearTimeout(resetCopyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(RUNTIME_INSTALL_COMMAND);
      setCopyState("copied");
    } catch (error) {
      console.error("Failed to copy runtime install command:", error);
      setCopyState("error");
    }

    if (resetCopyTimeoutRef.current) {
      window.clearTimeout(resetCopyTimeoutRef.current);
    }

    resetCopyTimeoutRef.current = window.setTimeout(() => {
      setCopyState("idle");
      resetCopyTimeoutRef.current = null;
    }, 1800);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...GET_URBIT_MODAL_PROPS}>
      <div className="w-full">
        <h2 className="pr-[3.25rem] font-serif text-[44px] font-[700] leading-[0.94] tracking-[-0.03em] text-accent-1 md:text-[48px]">
          Get the Urbit runtime
        </h2>
        <p className="mt-[3px] max-w-[680px] font-sans text-[18px] leading-[1.2] tracking-[0.01em] text-primary md:text-[24px] md:leading-[25px]">
          Download the right binary for your machine with a single command.
        </p>

        <div className="relative mt-8 rounded-[6px] border border-contrast-2 bg-white px-4 py-4 pr-14 md:px-5 md:pr-16">
          <code className="block break-all font-mono text-[13px] leading-[1.4] tracking-[-0.02em] text-primary md:text-[16px]">
            {RUNTIME_INSTALL_COMMAND}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy install command"
            title="Copy install command"
            data-umami-event="cta-get-urbit-modal-copy"
            data-umami-event-label="Copy install command"
            data-umami-event-destination="/get-runtime.sh"
            data-umami-event-variant="modal"
            className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[4px] text-contrast-2 transition-colors hover:text-primary md:right-4"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            >
              <rect x="9" y="9" width="10" height="10" rx="2" />
              <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] tracking-[-0.02em] text-contrast-2 md:text-[14px]">
          <span>Works on macOS and Linux.</span>
          <span aria-live="polite">
            {copyState === "copied"
              ? "Copied"
              : copyState === "error"
                ? "Copy failed"
                : ""}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/overview/running-urbit/common-commands#get-the-urbit-runtime"
            onClick={onClose}
            data-umami-event="cta-get-urbit-modal-learn-more"
            data-umami-event-label="See all download options"
            data-umami-event-destination="/overview/running-urbit/common-commands#get-the-urbit-runtime"
            data-umami-event-variant="modal"
            className="font-sans text-lg flex items-center py-1 px-3 rounded-lg text-contrast-2 hover:text-primary font-[600]"
          >
            See all download options
          </Link>
        </div>
      </div>
    </Modal>
  );
}
