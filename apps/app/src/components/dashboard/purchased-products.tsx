import { trpc } from "@/lib/trpc";
import { PurchasedProductCard } from "./purchased-product-card";
import { Package, ShoppingBag, Loader2, AlertCircle } from "lucide-react";

interface PurchasedProductsProps {
  apiKey: string | null;
  keyExpired: boolean;
  onGenerateKey: () => void;
  isGeneratingKey: boolean;
  serverUrl: string;
}

export function PurchasedProducts({
  apiKey,
  keyExpired,
  onGenerateKey,
  isGeneratingKey,
  serverUrl,
}: PurchasedProductsProps) {
  const {
    data: products,
    isLoading,
    error,
  } = trpc.users.getPurchasedProducts.useQuery();

  if (error) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-rose-500/5 to-red-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative bg-card/80 backdrop-blur-2xl border border-border/40 rounded-3xl p-8">
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Failed to Load Products
            </h3>
            <p className="text-muted-foreground">
              There was an error loading your purchased components. Please try
              again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="relative bg-card/80 backdrop-blur-2xl border border-border/40 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Package className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Components</h2>
                <p className="text-muted-foreground">
                  Ready to install in your projects
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Loading your purchased components...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="relative bg-card/80 backdrop-blur-2xl border border-border/40 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Package className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Your Components</h2>
              <p className="text-muted-foreground">
                {products?.length || 0} components ready to install
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-muted/30 rounded-xl px-4 py-2">
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {products?.length || 0} Purchased
            </span>
          </div>
        </div>

        {!products || products.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative group/empty">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl blur-xl scale-110 opacity-0 group-hover/empty:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-muted/40 to-muted/20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Package className="h-10 w-10 text-muted-foreground/60" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Components Yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't purchased any components yet. Browse our marketplace
              to find the perfect components for your projects.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-2xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25 group/btn font-medium"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              <span className="relative">Browse Components</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-in slide-in-from-bottom-4 duration-700"
              >
                <PurchasedProductCard
                  product={product}
                  apiKey={apiKey}
                  keyExpired={keyExpired}
                  onGenerateKey={onGenerateKey}
                  isGeneratingKey={isGeneratingKey}
                  serverUrl={serverUrl}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
