import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";

export const Route = createFileRoute("/admin/users/$userId/products")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const utils = trpc.useUtils();
  const { data, isLoading, error } = trpc.admin.getUserProducts.useQuery({
    userId: userId as string,
  });
  const [revokeDialog, setRevokeDialog] = useState<{
    productId: string;
    productName: string;
  } | null>(null);

  const revokeMutation = trpc.admin.revokeUserProduct.useMutation({
    onSuccess: () => {
      toast.success("Product access revoked successfully");
      utils.admin.getUserProducts.invalidate({ userId: userId as string });
      setRevokeDialog(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to revoke product access");
    },
  });

  const handleRevoke = () => {
    if (!revokeDialog) return;
    revokeMutation.mutate({
      userId: userId as string,
      productId: revokeDialog.productId,
    });
  };

  return (
    <AdminShell
      title="User Products"
      description={`Viewing products for user: ${userId}`}
    >
      <div className="mb-6">
        <Link to="/admin/users">
          <Button variant="ghost" size="sm" className="gap-2 hover:bg-muted/50">
            <ArrowLeft className="h-4 w-4" />
            Back to users
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-border/50">
                <Skeleton className="h-40 w-full bg-muted/30" />
                <CardContent className="space-y-3 py-4">
                  <Skeleton className="h-5 w-2/3 bg-muted/30" />
                  <Skeleton className="h-3 w-full bg-muted/30" />
                  <Skeleton className="h-3 w-3/4 bg-muted/30" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : error ? (
          <Card className="col-span-full border-border/50 bg-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-destructive" />
                Error loading products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {error.message || "Failed to load products. Please try again."}
              </p>
            </CardContent>
          </Card>
        ) : !data || data.length === 0 ? (
          <Card className="col-span-full border-border/50 bg-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                No products found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This user has not purchased any products yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          data.map((row) => {
            const product = row.products;
            return (
              <Card
                key={product.id}
                className="group relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 bg-gradient-to-br from-card to-card/50 flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="h-40 bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                  <div className="absolute top-4 right-4">
                    <div className="h-10 w-10 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg ring-1 ring-border/50">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
                <CardHeader className="relative">
                  <CardTitle className="text-lg font-bold line-clamp-1">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative flex flex-col flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-border/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">
                        ${product.price}
                      </span>
                      <code className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                        {product.slug}
                      </code>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        setRevokeDialog({
                          productId: product.id.toString(),
                          productName: product.name,
                        })
                      }
                    >
                      <X className="h-4 w-4 mr-2" />
                      Revoke Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <Dialog
        open={!!revokeDialog}
        onOpenChange={(open) => !open && setRevokeDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Product Access</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke access to{" "}
              <span className="font-semibold text-foreground">
                {revokeDialog?.productName}
              </span>
              ? This action cannot be undone and the user will lose access to
              this product.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="ghost"
              onClick={() => setRevokeDialog(null)}
              disabled={revokeMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRevoke}
              disabled={revokeMutation.isPending}
            >
              {revokeMutation.isPending ? "Revoking..." : "Revoke Access"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}
