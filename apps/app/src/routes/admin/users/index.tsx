import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { UsersTable } from "@/components/admin/UsersTable";

export const Route = createFileRoute("/admin/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminShell
      title="Manage Users"
      description="View, search, and moderate users"
    >
      <UsersTable />
    </AdminShell>
  );
}
