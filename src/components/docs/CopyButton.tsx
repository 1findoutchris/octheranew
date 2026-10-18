"use client";

import { useState } from "react";

/** Copies a code sample; announces the result politely. */
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setState("copied");
          } catch {
            setState("failed");
          }
          setTimeout(() => setState("idle"), 2000);
        }}
        className="min-h-11 rounded-lg border border-border-strong px-3 text-sm font-medium text-foreground"
      >
        Copy<span className="sr-only"> {label}</span>
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? `${label} copied` : state === "failed" ? "Copy failed" : ""}
      </span>
    </>
  );
}
