import { trpc } from "@/lib/trpc";
import { Eye, Zap } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    isPublished: boolean;
    createdBy: string;
    createdAt: string;
  };
  viewMode: "grid" | "list";
  index: number;
}

export function ProductCard({ product, viewMode, index }: ProductCardProps) {
  const isNew =
    new Date().getTime() - new Date(product.createdAt).getTime() <
    7 * 24 * 60 * 60 * 1000;

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

  async function handlePurchase() {
    await createCheckout({
      productId: product.id.toString(),
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });
  }

  if (viewMode === "list") {
    return (
      <div
        className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/20 flex items-center space-x-6"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative w-24 h-20 bg-gradient-to-br from-muted/60 to-muted/40 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="text-3xl opacity-40">🎨</div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors duration-300">
                  {product.name}
                </h3>
                {isNew && <Zap className="h-4 w-4 text-blue-500" />}
              </div>
              <p className="text-sm text-muted-foreground">
                by {product.createdBy}
              </p>
            </div>
            <div className="text-right ml-6">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ${(product.price / 100).toFixed(2)}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/90 mb-4 line-clamp-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Added {new Date(product.createdAt).toLocaleDateString()}
            </div>
            <button
              className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePurchase}
              disabled={isCreatingCheckout}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative">Purchase</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] hover:border-primary/20"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[3/2] bg-gradient-to-br from-muted/60 to-muted/30 flex items-center justify-center overflow-hidden">
        <div className="text-6xl opacity-30">🎨</div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <button className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Eye className="h-6 w-6 text-white" />
          </div>
        </button>
        {isNew && (
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 shadow-lg">
              <Zap className="h-3 w-3" />
              New
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              by {product.createdBy}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ${(product.price / 100).toFixed(2)}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground/90 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Added {new Date(product.createdAt).toLocaleDateString()}
          </div>
          <button
            className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePurchase}
            disabled={isCreatingCheckout}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative">Purchase</span>
          </button>
        </div>
      </div>
    </div>
  );
}
