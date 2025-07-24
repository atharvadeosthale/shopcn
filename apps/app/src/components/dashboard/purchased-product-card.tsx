import { useState } from "react";
import { Copy, Terminal, AlertTriangle, CheckCircle, Package } from "lucide-react";

interface PurchasedProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: string;
    isPublished: boolean;
    slug: string;
  };
}

interface PurchasedProductCardProps {
  product: PurchasedProduct;
  apiKey: string | null;
  keyExpired: boolean;
  onGenerateKey: () => void;
  isGeneratingKey: boolean;
  serverUrl: string;
}

export function PurchasedProductCard({
  product,
  apiKey,
  keyExpired,
  onGenerateKey,
  isGeneratingKey,
  serverUrl
}: PurchasedProductCardProps) {
  const [copied, setCopied] = useState(false);
  
  const installCommand = apiKey 
    ? `bunx shadcn@latest add ${serverUrl}/install/${product.product.slug}?key=${apiKey}`
    : `bunx shadcn@latest add ${serverUrl}/install/${product.product.slug}?key=YOUR_API_KEY`;

  const handleCopyCommand = async () => {
    if (!apiKey || keyExpired) return;
    
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCommandDisabled = !apiKey || keyExpired;

  return (
    <div className="group relative bg-card/60 backdrop-blur-xl border border-border/30 rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.01] hover:border-primary/30 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/8 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-muted/60 to-muted/30 rounded-xl flex items-center justify-center shadow-sm">
              <Package className="h-6 w-6 text-foreground/70" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                {product.product.name}
              </h3>
              <p className="text-sm text-muted-foreground/90">
                {product.product.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              ${(product.price / 100).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground/70">
              {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Installation Command</span>
          </div>
          
          {!apiKey ? (
            <div className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200/50 dark:border-amber-800/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                      API Key Required
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Generate an API key to install this component
                    </p>
                  </div>
                </div>
                <button
                  onClick={onGenerateKey}
                  disabled={isGeneratingKey}
                  className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingKey ? "Generating..." : "Generate Key"}
                </button>
              </div>
            </div>
          ) : keyExpired ? (
            <div className="bg-gradient-to-r from-red-50/50 to-rose-50/50 dark:from-red-950/20 dark:to-rose-950/20 border border-red-200/50 dark:border-red-800/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">
                      API Key Expired
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      This command will not work with an expired key
                    </p>
                  </div>
                </div>
                <button
                  onClick={onGenerateKey}
                  disabled={isGeneratingKey}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-300 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingKey ? "Generating..." : "Generate New Key"}
                </button>
              </div>
              <div className="bg-white/50 dark:bg-black/20 border border-red-200/50 dark:border-red-800/30 rounded-lg p-3">
                <code className="font-mono text-xs text-red-800 dark:text-red-200 break-all opacity-60">
                  {installCommand}
                </code>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Ready to Install
                  </span>
                </div>
                <button
                  onClick={handleCopyCommand}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div className="bg-white/70 dark:bg-black/30 border border-green-200/50 dark:border-green-800/30 rounded-lg p-3">
                <code className="font-mono text-xs text-green-800 dark:text-green-200 break-all select-all">
                  {installCommand}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}