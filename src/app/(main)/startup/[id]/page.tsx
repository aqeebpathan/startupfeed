import Link from "next/link";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { cache, Suspense } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { imageLoader } from "next-sanity/image";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";

import StartupViews from "@/components/startup-views";
import { StartupCardType } from "@/components/startup-card";
import StartupSkeleton from "@/components/startup-skeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const startup = await getStartup(id);

  if (!startup) {
    return {
      title: "Startup not found",
    };
  }

  return {
    title: `${startup.title} | StartupFeed`,
    description: startup.description,
    openGraph: {
      title: startup.title,
      description: startup.description,
      images: urlFor(startup.image).width(1200).height(630).url(),
    },
  };
}

export const getStartup = cache(
  async (id: string): Promise<StartupCardType | null> => {
    "use cache";

    const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    return startup ?? null;
  },
);

async function StartupDetails({ id }: { id: string }) {
  const startup = await getStartup(id);

  if (!startup) notFound();

  const blurDataURL = startup.image
    ? urlFor(startup.image).width(24).height(24).blur(20).url()
    : undefined;

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {startup.author && (
            <Link
              href={`/user/${startup.author._id}`}
              className="font-medium hover:text-foreground transition"
            >
              @{startup.author.name}
            </Link>
          )}
          <span>•</span>
          <span>{new Date(startup._createdAt).toLocaleDateString()}</span>
        </div>

        <StartupViews id={id} />
      </div>

      {/* title */}
      <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight">
        {startup.title}
      </h1>

      {/* description */}
      <p className="mt-4 text-lg text-muted-foreground">
        {startup.description}
      </p>

      {/* image */}
      {startup.image && (
        <div className="mt-10 overflow-hidden rounded-xl border bg-muted">
          <div className="relative aspect-video">
            <Image
              src={urlFor(startup.image).url()}
              alt={startup.title || "Startup Image"}
              fill
              loader={imageLoader}
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="mt-10 border-t" />

      {/* markdown */}
      <article className="prose prose-zinc dark:prose-invert mt-8 max-w-none">
        {startup.content ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {startup.content}
          </ReactMarkdown>
        ) : (
          <p className="text-muted-foreground">No content available.</p>
        )}
      </article>

      <div className="h-16" />
    </main>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<StartupSkeleton />}>
      <Inner params={params} />
    </Suspense>
  );
}

async function Inner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <StartupDetails id={id} />;
}
