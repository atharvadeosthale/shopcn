import { Search, Loader2 } from "lucide-react";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Array<{
    id: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    isPublished: boolean;
    createdBy: string;
    createdAt: string;
  }>;
  viewMode: "grid" | "list";
  isLoading: boolean;
}

export function ProductGrid({ products, viewMode, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Loading components...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-6">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Search className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground text-xl font-medium mb-2">
              No components found
            </p>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or check back later for new components
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}