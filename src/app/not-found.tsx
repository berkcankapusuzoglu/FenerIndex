import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <div className="text-6xl font-bold text-primary mb-4">404</div>
      <h1 className="text-2xl font-bold mb-2">Offside!</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        This page doesn&apos;t exist. Maybe it was just a rumor after all...
      </p>
      <Link href="/rumors">
        <Button>Back to Rumor Radar</Button>
      </Link>
    </div>
  );
}
