import { trpc } from "@/lib/trpc";
import { Eye } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: number;
    slug: string;
    name: string;
    description: string;
    price: string;
    isPublished: boolean;
    createdBy: string;
    createdAt: string;
  };
  viewMode: "grid" | "list";
  index: number;
}

export function ProductCard({ product, viewMode, index }: ProductCardProps) {
  const { mutate: createCheckout, isPending: isCreatingCheckout } =
    trpc.payments.createCheckout.useMutation({
      onSuccess: (data) => {
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  function handlePurchase() {
    createCheckout({
      productId: product.id.toString(),
      successUrl: `${window.location.origin}`,
      cancelUrl: `${window.location.origin}`,
    });
  }

  if (viewMode === "list") {
    return (
      <div
        className="group relative bg-card/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30 flex items-center space-x-6 overflow-hidden"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="relative w-24 h-20 bg-gradient-to-br from-muted/60 to-muted/30 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-lg">
          <div className="text-3xl opacity-50">🎨</div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        <div className="relative flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-xl leading-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground/90 font-medium">
                by {product.createdBy}
              </p>
            </div>
            <div className="text-right ml-6">
              <div className="text-2xl font-bold text-foreground">
                ${product.price}
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground/90 mb-4 line-clamp-1 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground/70 font-medium">
              Added {new Date(product.createdAt).toLocaleDateString()}
            </div>
            <button
              className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-primary/20 group/btn font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePurchase}
              disabled={isCreatingCheckout}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
              <span className="relative">Purchase</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-card/60 backdrop-blur-xl border border-border/30 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/15 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative aspect-[3/2] bg-gradient-to-br from-muted/60 to-muted/30 flex items-center justify-center overflow-hidden">
        <div className="text-6xl opacity-30">🎨</div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        <button className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
            <Eye className="h-6 w-6 text-white" />
          </div>
        </button>
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-xl leading-tight text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground/90 font-medium">
              by {product.createdBy}
            </p>
          </div>
          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-foreground">
              ${product.price}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground/90 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground/70 font-medium">
            Added {new Date(product.createdAt).toLocaleDateString()}
          </div>
          <button
            className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-primary/20 group/btn font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePurchase}
            disabled={isCreatingCheckout}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            <span className="relative">Purchase</span>
          </button>
        </div>
      </div>
    </div>
  );
}
