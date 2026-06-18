import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "./startup-card";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR, { id: id });

  return (
    <>
      {startups?.length ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p>No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
