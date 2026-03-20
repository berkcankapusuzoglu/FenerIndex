"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Rumor } from "@/lib/supabase/types";

interface ShareButtonProps {
  rumor: Rumor;
}

export function ShareButton({ rumor }: ShareButtonProps) {
  const total = rumor.believe_count + rumor.cap_count;
  const believePct = total > 0 ? Math.round((rumor.believe_count / total) * 100) : 50;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleShare() {
    const url = `${window.location.origin}/rumors/${rumor.id}`;
    const text = `${believePct}% of fans BELIEVE: "${rumor.title}" - What do you think? Vote now on FenerIndex!`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  }

  async function handleCopyLink() {
    const url = `${window.location.origin}/rumors/${rumor.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Fallback: silently fail
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleShare} variant="outline" size="sm" className="gap-2">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-current"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </Button>
      <Button onClick={handleCopyLink} variant="outline" size="sm" className="gap-2">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
