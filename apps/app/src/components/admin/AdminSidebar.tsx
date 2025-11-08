import { Link, useLocation } from "@tanstack/react-router";
import { Users, LayoutGrid } from "lucide-react";
import { useMemo } from "react";

export function AdminSidebar() {
  const { pathname } = useLocation();

  const navItems = useMemo(
    () => [
      {
        label: "Overview",
        to: "/admin",
        icon: <LayoutGrid className="h-4 w-4" />,
        isActive: pathname === "/admin",
      },
      {
        label: "Manage Users",
        to: "/admin/users",
        icon: <Users className="h-4 w-4" />,
        isActive: pathname.startsWith("/admin/users"),
      },
    ],
    [pathname]
  );

  return (
    <aside className="w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="pr-6 py-2">
        <div className="mb-6 px-3">
          <h2 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4">
            Navigation
          </h2>
        </div>
        <nav className="space-y-1.5 px-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 " +
                (item.isActive
                  ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40")
              }
            >
              {item.isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              <span
                className={
                  "rounded-md p-1.5 transition-colors " +
                  (item.isActive
                    ? "bg-primary/15 text-primary"
                    : "bg-muted/30 group-hover:bg-muted/50")
                }
              >
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
