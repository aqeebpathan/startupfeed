import { after } from "next/server";

import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

const Views = async ({ id }: { id: string }) => {
  const data = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  const totalViews = data?.views ?? 0;

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit(),
  );

  return (
    <div className="px-4 py-2 text-sm border w-fit">{totalViews} views</div>
  );
};

export default Views;
