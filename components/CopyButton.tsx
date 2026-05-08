"use client";

import { useState } from "react";

type Props = {
  value: string;
  label?: string;
  className?: string;
};

export default function CopyButton({ value, label = "Copy", className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-md border border-ink-100 bg-white px-2 py-1 text-xs font-medium text-ink-700 hover:border-accent hover:text-accent ${className}`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
