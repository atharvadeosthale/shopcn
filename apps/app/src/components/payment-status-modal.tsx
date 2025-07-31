import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Package, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
  productId?: number;
}

export function PaymentStatusModal({
  isOpen,
  onClose,
  success,
  productId,
}: PaymentStatusModalProps) {
  const { data: product } = trpc.products.getProduct.useQuery(
    { id: productId! },
    { enabled: !!productId && success }
  );

  const handleClose = () => {
    onClose();
    const url = new URL(window.location.href);
    url.searchParams.delete("success");
    url.searchParams.delete("productId");
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg border-0 bg-transparent p-0 shadow-none">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="relative bg-card/80 backdrop-blur-2xl border border-border/40 rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="relative group/icon">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg scale-110 group-hover/icon:scale-125 transition-transform duration-500"></div>
                  <div className={`relative h-20 w-20 rounded-2xl shadow-xl flex items-center justify-center ${success ? 'bg-gradient-to-br from-green-500 via-green-500/90 to-green-500/70 shadow-green-500/25' : 'bg-gradient-to-br from-red-500 via-red-500/90 to-red-500/70 shadow-red-500/25'}`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"></div>
                    {success ? (
                      <CheckCircle className="h-10 w-10 text-white relative z-10" />
                    ) : (
                      <XCircle className="h-10 w-10 text-white relative z-10" />
                    )}
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {success ? (
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Payment Successful!
                  </span>
                ) : (
                  <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                    Payment Failed
                  </span>
                )}
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                {success 
                  ? "Your purchase has been completed successfully"
                  : "We couldn't process your payment. Please try again."
                }
              </p>
            </div>

            {success && (
              product ? (
                <div className="relative group/product mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover/product:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="relative bg-card/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-gradient-to-br from-muted/60 to-muted/30 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg">
                        <Package className="h-8 w-8 text-muted-foreground/70" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover/product:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-xl leading-tight text-foreground group-hover/product:text-primary transition-colors duration-300">
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground/90 font-medium">
                              by {product.createdBy}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="flex items-center space-x-1 text-primary">
                              <Sparkles className="h-4 w-4" />
                              <span className="text-xl font-bold">${product.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative mb-8">
                  <div className="bg-card/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted/40 rounded-xl animate-pulse"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 space-y-2">
                            <div className="h-5 bg-muted/40 rounded animate-pulse w-3/4"></div>
                            <div className="h-4 bg-muted/30 rounded animate-pulse w-1/2"></div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="h-6 bg-muted/40 rounded animate-pulse w-16"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {success && (
              <div className="text-center mb-8">
                <p className="text-muted-foreground">
                  Check your purchased products below to get started with installation
                </p>
              </div>
            )}

            <button
              onClick={handleClose}
              className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-4 rounded-2xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-primary/15 group/btn font-medium w-full text-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
              <span className="relative">Continue to Dashboard</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}