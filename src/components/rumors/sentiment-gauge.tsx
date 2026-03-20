"use client";

import { useEffect, useState } from "react";

interface SentimentGaugeProps {
  believeCount: number;
  capCount: number;
}

export function SentimentGauge({ believeCount, capCount }: SentimentGaugeProps) {
  const total = believeCount + capCount;
  const believePct = total > 0 ? Math.round((believeCount / total) * 100) : 50;
  const capPct = total > 0 ? 100 - believePct : 50;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-primary">
          BELIEVE {believePct}%{believePct > 80 && " \uD83D\uDD25"}
        </span>
        <span className="text-muted-foreground">
          {total} vote{total !== 1 ? "s" : ""}
        </span>
        <span className="text-secondary-foreground opacity-70">
          {capPct > 80 && "\uD83E\uDDE2 "}CAP {capPct}%
        </span>
      </div>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="rounded-l-full bg-primary transition-all duration-700 ease-out"
          style={{ width: mounted ? `${believePct}%` : "0%" }}
        />
        <div
          className="rounded-r-full bg-fb-navy-light transition-all duration-700 ease-out"
          style={{ width: mounted ? `${capPct}%` : "0%" }}
        />
      </div>
    </div>
  );
}
