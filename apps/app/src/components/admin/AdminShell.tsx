import Navbar from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { AdminSidebar } from "./AdminSidebar";
import type { ReactNode } from "react";

export function AdminShell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar variant="admin" />
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            <AdminSidebar />
            <main className="flex-1 min-w-0">
              {(title || description) && (
                <div className="mb-8 space-y-2">
                  {title && (
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
                      {description}
                    </p>
                  )}
                </div>
              )}
              {children}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
