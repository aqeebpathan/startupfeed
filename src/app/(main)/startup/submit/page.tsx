import { auth } from "@/auth";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import StartupForm from "@/components/startup-form";

function SubmitContent() {
  return (
    <section>
      <div className="max-w-6xl mx-auto">
        <div className="space-y-2 text-center mt-10">
          <h1 className="text-2xl font-semibold tracking-tight">
            Publish Startup Story
          </h1>

          <p className="text-sm text-muted-foreground">
            Share your idea, journey, or build-in-public story.
          </p>
        </div>

        <StartupForm />
      </div>
    </section>
  );
}

async function AuthGate() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <SubmitContent />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthGate />
    </Suspense>
  );
}
