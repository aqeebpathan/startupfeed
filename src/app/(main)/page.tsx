import { Suspense } from "react";
import SearchForm from "@/components/search-form";
import StartupCard, { StartupCardType } from "@/components/startup-card";
import {
  PostsSkeleton,
  StartupCardSkeletonGrid,
} from "@/components/startup-card-skeleton";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";

const Home = ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  return (
    <>
      {" "}
      <section className="mx-auto max-w-4xl px-4 py-24">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl text-center leading-snug font-medium">
            <span className="bg-primary text-secondary">
              Pitch Your Startup,
            </span>
            <br />{" "}
            <span className="bg-primary text-secondary">
              Share With The World{" "}
            </span>
          </h1>
          <div className="mt-10">
            <SearchForm />
          </div>
        </div>
      </section>
      {/* stream posts */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Suspense fallback={<PostsSkeleton />}>
          <Posts searchParams={searchParams} />
        </Suspense>
      </section>
      <SanityLive />
    </>
  );
};

async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  "use cache";

  const query = (await searchParams).query || "";

  const { data } = await sanityFetch({
    query: STARTUPS_QUERY,
    params: { search: query || null },
  });

  const posts = data as StartupCardType[];

  return (
    <>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight">
          {query ? `Results for "${query}"` : "All Startups"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {posts.length} {posts.length === 1 ? "story" : "stories"}
        </p>
      </div>

      {posts.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StartupCard key={post._id} post={post} />
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border p-12 text-center">
          <h3 className="text-lg font-medium">No stories found</h3>
          <p className="mt-2 text-muted-foreground">
            Try a different search term.
          </p>
        </div>
      )}
    </>
  );
}

export default Home;
