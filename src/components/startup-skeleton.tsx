export default function StartupSkeleton() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 animate-pulse">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-40 bg-muted rounded" />
        <div className="h-6 w-16 bg-muted rounded" />
      </div>

      {/* title */}
      <div className="mt-6 h-8 w-3/4 bg-muted rounded" />

      {/* description */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
      </div>

      {/* image */}
      <div className="mt-10 aspect-video bg-muted rounded-xl" />

      {/* content */}
      <div className="mt-10 space-y-3">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-2/3 bg-muted rounded" />
      </div>
    </main>
  );
}
