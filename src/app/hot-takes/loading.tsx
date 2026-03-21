import { Skeleton } from "@/components/ui/skeleton";

export default function HotTakesLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Hot <span className="text-primary">Takes</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Spicy opinions. Do you agree or disagree?
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex justify-center gap-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/50 p-5 space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-6 w-full" />
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
