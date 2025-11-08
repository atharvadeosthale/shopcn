import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminShell
      title="Admin Dashboard"
      description="Moderate users and manage marketplace content"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-gradient-to-br from-card to-card/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors ring-1 ring-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold">Manage Users</CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Review users, ban accounts, and view their products.
            </p>
            <Link to="/admin/users">
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Open Users
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
