"use client";

import { useState } from "react";
import { copyToClipboard } from "../lib/runtimeInstall";

export default function AgentPromptCopyButton({ prompt }) {
  const [copyState, setCopyState] = useState("idle");

  const handleCopy = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await copyToClipboard(prompt);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch (error) {
      console.error("Failed to copy agent discovery prompt:", error);
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2200);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-[4px] border border-contrast-2 transition-colors ${
        copyState === "copied"
          ? "text-primary border-primary"
          : copyState === "error"
            ? "text-accent-1 border-accent-1"
            : "text-contrast-2 hover:border-primary hover:text-primary"
      }`}
      aria-label={
        copyState === "copied"
          ? "AI agent prompt copied"
          : copyState === "error"
            ? "Copy AI agent prompt failed"
            : "Copy AI agent prompt"
      }
      title={
        copyState === "copied"
          ? "Copied"
          : copyState === "error"
            ? "Copy failed"
            : "Copy prompt"
      }
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[15px] w-[15px]"
        aria-hidden="true"
      >
        <rect x="9" y="9" width="10" height="10" rx="2" />
        <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
      </svg>
    </button>
  );
}
