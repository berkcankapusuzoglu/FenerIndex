"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RumorDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <div className="text-5xl font-bold text-primary mb-4">Error</div>
      <h1 className="text-2xl font-bold mb-2">Failed to load rumor</h1>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {error.message || "This rumor could not be loaded."}
      </p>
      <div className="flex gap-3 justify-center">
        <Button onClick={reset}>Try Again</Button>
        <Link href="/rumors">
          <Button variant="outline">Back to Rumors</Button>
        </Link>
      </div>
    </div>
  );
}
