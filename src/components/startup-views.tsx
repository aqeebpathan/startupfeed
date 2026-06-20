import { Suspense } from "react";
import { after } from "next/server";

import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

async function StartupViews({ id }: { id: string }) {
  const data = await client.fetch(
    STARTUP_VIEWS_QUERY,
    { id },
    { cache: "no-store" },
  );

  const totalViews = data?.views ?? 0;

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit(),
  );
  return (
    <Suspense
      fallback={<div className="h-6 w-16 animate-pulse bg-muted rounded" />}
    >
      <div className="px-4 py-2 text-sm border w-fit">{totalViews} views</div>
    </Suspense>
  );
}

export default StartupViews;
