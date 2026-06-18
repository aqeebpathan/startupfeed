import { Toaster } from "sonner";
import Navbar from "@/components/navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      {children}
      <Toaster richColors position="top-center" />
    </main>
  );
}
