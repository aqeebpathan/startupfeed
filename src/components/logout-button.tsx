"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton() {
  return (
    <DropdownMenuItem
      onClick={() => {
        signOut({ callbackUrl: "/" });
      }}
      className="flex items-center gap-2"
    >
      <LogOut className="size-4" />
      Logout
    </DropdownMenuItem>
  );
}
