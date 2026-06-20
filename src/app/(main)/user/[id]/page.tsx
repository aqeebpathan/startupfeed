import { Suspense } from "react";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Badge } from "@/components/ui/badge";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";

import { Separator } from "@/components/ui/separator";
import UserStartups from "@/components/user-startups";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function getUser(id: string) {
  return client.fetch(AUTHOR_BY_ID_QUERY, { id });
}

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const [session, user] = await Promise.all([auth(), getUser(id)]);

  if (!user) notFound();

  const isCurrentUser = session?.user?.id === id;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Card className="overflow-hidden border-border/50">
        <CardHeader className="relative pb-0">
          {/* Cover */}
          <div className="h-40 w-full rounded-xl bg-linear-to-r from-primary/20 via-primary/10 to-primary/20" />

          {/* Avatar */}
          <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end md:gap-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                {user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="mt-4 flex-1 text-center md:text-left">
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <h1 className="text-3xl font-bold tracking-tight">
                  {user.name}
                </h1>

                {isCurrentUser && (
                  <Badge variant="secondary">Your Profile</Badge>
                )}
              </div>

              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 py-6">
          {user.bio && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">About</h2>
              <p className="leading-7 text-muted-foreground">{user.bio}</p>
            </div>
          )}

          <Separator />

          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {isCurrentUser ? "Your Startups" : "Published Startups"}
              </h2>

              <Badge variant="outline">Founder</Badge>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <UserStartups id={id} />
            </ul>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => (
  <Suspense
    fallback={
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="h-96 w-full rounded-xl border bg-muted animate-pulse" />
      </main>
    }
  >
    <UserDetails params={params} />
  </Suspense>
);

export default Page;
