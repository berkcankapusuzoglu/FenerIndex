import { Skeleton } from "@/components/ui/skeleton";

export default function RumorDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Skeleton className="h-4 w-32 mb-6" />
      <div className="rounded-xl border border-border/50 p-6 space-y-5">
        <div className="space-y-3">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-2/3" />
        </div>
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-3 w-full rounded-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 flex-1 rounded-md" />
        </div>
      </div>
    </div>
  );
}
