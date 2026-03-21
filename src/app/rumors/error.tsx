"use client";

import { Button } from "@/components/ui/button";

export default function RumorsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 text-center">
      <div className="text-5xl font-bold text-primary mb-4">Error</div>
      <h1 className="text-2xl font-bold mb-2">Failed to load rumors</h1>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {error.message || "Something went wrong while fetching rumors. Please try again."}
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
