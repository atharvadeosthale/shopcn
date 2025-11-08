import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Ban,
  Boxes,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/lib/trpc";
import { Skeleton } from "@/components/ui/skeleton";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  banned?: boolean | null;
  createdAt: Date | string;
};

export function UsersTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [banDialogUser, setBanDialogUser] = useState<User | null>(null);

  const { data, isLoading, error } = trpc.admin.getUsers.useQuery({
    page,
    limit,
  });

  const filtered = useMemo(() => {
    if (!data?.users) return [];
    const q = query.toLowerCase().trim();
    if (!q) return data.users;
    return data.users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
    );
  }, [data?.users, query]);

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const pagination = data?.pagination;

  return (
    <Card className="overflow-hidden border-border/50 shadow-lg">
      <CardHeader className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Users
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {pagination
                ? `${pagination.total} total users`
                : "Search and manage marketplace users"}
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, id..."
              className="pl-9 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {error && (
          <div className="p-8 text-center">
            <p className="text-destructive font-medium">Failed to load users</p>
            <p className="text-sm text-muted-foreground mt-1">
              {error.message}
            </p>
          </div>
        )}
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left border-b border-border/50 bg-muted/20">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      User
                    </th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Role
                    </th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                      Joined
                    </th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-border/30 last:border-0 transition-all duration-150 hover:bg-muted/30 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary flex items-center justify-center font-bold text-sm shadow-sm ring-1 ring-primary/10">
                            {u.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold truncate text-foreground">
                              {u.name}
                            </div>
                            <div className="text-xs text-muted-foreground/70 truncate font-mono">
                              {u.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-foreground/90">{u.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset " +
                            (u.role === "admin"
                              ? "bg-primary/15 text-primary ring-primary/20"
                              : "bg-muted/40 text-foreground/80 ring-border/50")
                          }
                        >
                          {u.role || "user"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {u.banned ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-destructive">
                            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                            Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-muted-foreground text-xs font-mono">
                          {formatDate(u.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Row actions"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => setBanDialogUser(u)}
                              >
                                <Ban className="h-4 w-4" />
                                <span>Ban user</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  to="/admin/users/$userId/products"
                                  params={{ userId: u.id }}
                                >
                                  <Boxes className="h-4 w-4" />
                                  <span>View products</span>
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center mb-2">
                            <Search className="h-6 w-6 text-muted-foreground/50" />
                          </div>
                          <p className="text-muted-foreground font-medium">
                            {query ? "No users found" : "No users"}
                          </p>
                          <p className="text-xs text-muted-foreground/70">
                            {query
                              ? "Try adjusting your search query"
                              : "No users in the system"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {pagination && pagination.totalPages > 1 && (
              <div className="border-t border-border/50 px-6 py-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {(page - 1) * limit + 1} to{" "}
                  {Math.min(page * limit, pagination.total)} of{" "}
                  {pagination.total} users
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || isLoading}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        let pageNum: number;
                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }
                        return (
                          <Button
                            key={pageNum}
                            variant={page === pageNum ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setPage(pageNum)}
                            disabled={isLoading}
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        );
                      }
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPage((p) => Math.min(pagination.totalPages, p + 1))
                    }
                    disabled={page === pagination.totalPages || isLoading}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>

      <Dialog
        open={!!banDialogUser}
        onOpenChange={(o) => !o && setBanDialogUser(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban user</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            {banDialogUser ? (
              <>
                Are you sure you want to ban{" "}
                <span className="text-foreground font-medium">
                  {banDialogUser.name}
                </span>
                ? You can reverse this later.
              </>
            ) : null}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="ghost" onClick={() => setBanDialogUser(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Integrate banning mutation here
                setBanDialogUser(null);
              }}
            >
              Ban user
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
