import { useState, useMemo, useCallback } from "react";
import {
  Copy,
  Terminal,
  AlertTriangle,
  CheckCircle,
  Package,
  Sparkles,
  Clock,
  Zap,
} from "lucide-react";

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
  serverUrl,
}: PurchasedProductCardProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const installCommand = useMemo(() => {
    return apiKey
      ? `npx shadcn@latest add ${serverUrl}/install/${product.product.slug}?key=${apiKey}`
      : `npx shadcn@latest add ${serverUrl}/install/${product.product.slug}?key=YOUR_API_KEY`;
  }, [apiKey, serverUrl, product.product.slug]);

  const handleCopyCommand = useCallback(async () => {
    if (!apiKey || keyExpired) return;

    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [apiKey, keyExpired, installCommand]);

  const { purchaseDate, isRecent } = useMemo(() => {
    const date = new Date(product.createdAt);
    const recent = new Date().getTime() - date.getTime() < 24 * 60 * 60 * 1000;
    return { purchaseDate: date, isRecent: recent };
  }, [product.createdAt]);

  return (
    <div className="group relative bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl border border-border/20 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-500 hover:scale-[1.01] hover:border-border/40">
      {/* Subtle animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent via-50% to-accent/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-primary/6 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/4 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

      {/* Recent purchase indicator */}
      {isRecent && (
        <div className="absolute top-5 right-5 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur opacity-60 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 shadow-sm">
              <Sparkles className="h-3 w-3" />
              <span>Recently Purchased</span>
            </div>
          </div>
        </div>
      )}

      <div className="relative p-8">
        {/* Enhanced header section */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start space-x-5 flex-1">
            {/* Enhanced component icon */}
            <div className="relative group/icon">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/15 rounded-2xl blur scale-110 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-18 h-18 bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50 rounded-2xl flex items-center justify-center shadow-sm group-hover/icon:shadow-md transition-all duration-500 border border-border/10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/4 to-transparent rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-black/5 to-transparent rounded-2xl"></div>
                <Package className="h-9 w-9 text-foreground/70 relative z-10 group-hover/icon:text-primary group-hover/icon:scale-110 transition-all duration-300" />
              </div>
            </div>

            {/* Enhanced component details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300 mb-2 leading-tight">
                    {product.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4 line-clamp-2">
                    {product.product.description}
                  </p>
                </div>
              </div>

              {/* Enhanced metadata */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-2 text-muted-foreground/70 bg-muted/20 px-3 py-1.5 rounded-full">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-medium">
                      {purchaseDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year:
                          purchaseDate.getFullYear() !==
                          new Date().getFullYear()
                            ? "numeric"
                            : undefined,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                    <span className="font-bold text-sm">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced installation section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/15 rounded-lg blur scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-primary/8 to-primary/12 p-2.5 rounded-lg border border-primary/10">
                  <Terminal className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-foreground">
                  Installation Command
                </span>
                <p className="text-xs text-muted-foreground/70">
                  Ready to use in your project
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-200 font-medium group/toggle"
            >
              <span>{isExpanded ? "Hide" : "Show"} Command</span>
              <div
                className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Enhanced command states */}
          {!apiKey ? (
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-50/60 via-yellow-50/40 to-orange-50/60 dark:from-amber-950/20 dark:via-yellow-950/15 dark:to-orange-950/20 border border-amber-200/40 dark:border-amber-800/30 rounded-2xl p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/3 to-orange-500/3"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/15 rounded-xl blur scale-110"></div>
                    <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 flex items-center justify-center border border-amber-200/20">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">
                      API Key Required
                    </p>
                    <p className="text-xs text-amber-700/80 dark:text-amber-300/80 leading-relaxed">
                      Generate a temporary key to unlock installation commands
                      for your purchased components
                    </p>
                  </div>
                </div>
                <button
                  onClick={onGenerateKey}
                  disabled={isGeneratingKey}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md ml-4"
                >
                  {isGeneratingKey ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Generate Key</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          ) : keyExpired ? (
            <div className="relative overflow-hidden bg-gradient-to-br from-red-50/60 via-rose-50/40 to-pink-50/60 dark:from-red-950/20 dark:via-rose-950/15 dark:to-pink-950/20 border border-red-200/40 dark:border-red-800/30 rounded-2xl p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 to-pink-500/3"></div>
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500/15 rounded-xl blur scale-110"></div>
                      <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-red-500/15 to-pink-500/15 flex items-center justify-center border border-red-200/20">
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                        API Key Expired
                      </p>
                      <p className="text-xs text-red-700/80 dark:text-red-300/80 leading-relaxed">
                        Your installation key has expired. Generate a new one to
                        continue installing components
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onGenerateKey}
                    disabled={isGeneratingKey}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md ml-4"
                  >
                    {isGeneratingKey ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <span>New Key</span>
                      </div>
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="bg-white/40 dark:bg-black/20 border border-red-200/30 dark:border-red-800/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-red-700 dark:text-red-300 opacity-60">
                        Expired Command
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-red-900/10 to-pink-900/10 rounded-lg p-4 border border-red-200/20">
                      <code className="font-mono text-xs text-red-800 dark:text-red-200 break-all opacity-50 select-text leading-relaxed block">
                        {installCommand}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/60 via-green-50/40 to-teal-50/60 dark:from-emerald-950/20 dark:via-green-950/15 dark:to-teal-950/20 border border-emerald-200/40 dark:border-emerald-800/30 rounded-2xl p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 to-teal-500/3"></div>
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/15 rounded-xl blur scale-110"></div>
                      <div className="relative h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 flex items-center justify-center border border-emerald-200/20">
                        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-1">
                        Ready to Install
                      </p>
                      <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 leading-relaxed">
                        Your component is ready to install with an active API
                        key. Copy and run the command below
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <button
                      onClick={handleCopyCommand}
                      className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>{copied ? "Copied!" : "Copy Command"}</span>
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-white/50 dark:bg-black/20 border border-emerald-200/30 dark:border-emerald-800/20 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        Installation Command
                      </span>
                      {copied && (
                        <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-200">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">
                            Copied successfully
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="bg-gradient-to-r from-emerald-900/10 to-teal-900/10 rounded-lg p-4 border border-emerald-200/20">
                      <code className="font-mono text-xs text-emerald-800 dark:text-emerald-200 break-all select-text leading-relaxed block whitespace-pre-wrap">
                        {installCommand}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
