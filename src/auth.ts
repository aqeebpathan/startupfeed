import NextAuth from "next-auth"; // The default export
import Github from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

// In v5, NextAuth is an initialized function wrapper
const nextAuth = NextAuth({
  providers: [Github],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID, {
            id: profile?.id,
          });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: profile?.id,
            name: user?.name,
            username: profile?.login,
            email: user?.email,
            image: user?.image,
            bio: profile?.bio || " ",
          });
        }
        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID, {
              id: profile?.id,
            });

          if (user) {
            token.id = user._id;
          }
        } catch (error) {
          console.error("Error fetching user in jwt callback:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});

// Destructure the generated handlers out manually
export const { handlers, signIn, signOut, auth } = nextAuth;
