import Link from "next/link";
import { Suspense } from "react";
import { auth, signIn } from "@/auth";
import { LogIn, Plus, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  return (
    <header className="py-4">
      <nav className="max-w-6xl px-4 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold tracking-tighter bg-primary text-primary-foreground w-fit flex flex-col items-end p-1 leading-none"
        >
          <span className="text-xl leading-none">Startup</span>
          <span className="text-base leading-none">Feed.</span>
        </Link>

        {/* Right Side */}
        <Suspense fallback={<div className="h-10 w-32" />}>
          <UserMenu />
        </Suspense>
      </nav>
    </header>
  );
};

async function UserMenu() {
  const session = await auth();

  return (
    <div className="flex items-center gap-3">
      {/* Submit Startup */}
      {session?.user ? (
        <Button asChild>
          <Link href="/startup/submit" className="flex items-center gap-2">
            <Plus className="size-4" />
            Submit <span className="hidden sm:inline">Startup</span>
          </Link>
        </Button>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("github", {
              redirectTo: "/startup/submit",
            });
          }}
        >
          <Button
            type="submit"
            variant="outline"
            className="flex items-center gap-2"
          >
            <Plus className="size-4" />
            Submit Startup
          </Button>
        </form>
      )}

      {/* User Menu / Login */}
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-0 h-10 w-10 overflow-hidden"
            >
              <Avatar className="h-10 w-10 rounded-none">
                <AvatarImage
                  src={session.user.image ?? ""}
                  alt={session.user.name ?? "User"}
                  className="rounded-none object-cover"
                />
                <AvatarFallback className="rounded-none">
                  {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-2">
              <p className="text-sm font-medium truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session.user.email}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href={`/user/${session.user.id ?? ""}`}
                className="flex items-center gap-2"
              >
                <User className="size-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("github");
          }}
        >
          <Button type="submit" className="flex items-center gap-2">
            <LogIn className="size-4" />
            Login
          </Button>
        </form>
      )}
    </div>
  );
}

export default Navbar;
