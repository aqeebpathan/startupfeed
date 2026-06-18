import { auth } from "@/auth";
import StartupForm from "@/components/startup-form";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

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
};

export default page;
