import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const StartupCardSkeleton = () => {
  return (
    <li>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-3.5 w-3.5 rounded-full" />
              <Skeleton className="h-4 w-6" />
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-6 w-3/4" />
              </div>

              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            </div>

            <div className="space-y-2 min-h-10">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Skeleton className="h-52 w-full rounded-lg" />
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </CardFooter>
      </Card>
    </li>
  );
};

export function StartupCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <StartupCardSkeleton key={i} />
      ))}
    </ul>
  );
}

export function PostsSkeleton() {
  return (
    <>
      <div className="mb-10">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-2 h-4 w-24" />
      </div>

      <StartupCardSkeletonGrid count={6} />
    </>
  );
}
