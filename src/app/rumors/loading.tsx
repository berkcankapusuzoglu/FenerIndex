import { Skeleton } from "@/components/ui/skeleton";

export default function RumorsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Rumor <span className="text-primary">Radar</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Do you believe it or is it cap? Cast your vote.
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/50 p-5 space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <Skeleton className="h-3 w-full rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-9 flex-1 rounded-md" />
                <Skeleton className="h-9 flex-1 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
