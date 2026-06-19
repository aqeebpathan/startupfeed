import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { imageLoader } from "next-sanity/image";

import Views from "@/components/views";
import { StartupCardType } from "@/components/startup-card";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const startup: StartupCardType | null = await client.fetch(
    STARTUP_BY_ID_QUERY,
    { id },
  );

  if (!startup) notFound();

  const blurDataURL = startup.image
    ? urlFor(startup.image).width(24).height(24).blur(20).url()
    : undefined;

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      {/* Author + Date */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {startup.author && (
            <Link
              href={`/user/${startup.author._id}`}
              className="font-medium transition-colors hover:text-foreground"
            >
              @{startup.author.name}
            </Link>
          )}

          <span>•</span>

          <span>
            {startup._createdAt &&
              new Date(startup._createdAt).toLocaleDateString()}
          </span>
        </div>
        <Suspense
          fallback={<div className="px-4 py-2 text-sm border w-fit">...</div>}
        >
          <Views id={id} />
        </Suspense>{" "}
      </div>

      {/* Title */}
      <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
        {startup.title}
      </h1>

      {/* Description */}
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {startup.description}
      </p>

      {/* Cover */}
      {startup.image && (
        <div className="mt-10 overflow-hidden rounded-xl border bg-muted">
          <div className="relative aspect-video">
            <Image
              src={urlFor(startup.image).url()}
              alt={startup.title || "Startup Cover Image"}
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

      {/* Content */}
      <article className="prose prose-zinc dark:prose-invert mt-8 max-w-none leading-relaxed prose-headings:tracking-tight prose-p:leading-7 prose-p:text-[15.5px]">
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
};

export default Page;
