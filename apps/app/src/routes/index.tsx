import { trpc } from "@/lib/trpc";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import { getQueryClient, getTRPCClient } from "../providers/TRPCProvider";
import { SearchHero } from "../components/marketplace/search-hero";
import { ProductControls } from "../components/marketplace/product-controls";
import { ProductGrid } from "../components/marketplace/product-grid";

export const Route = createFileRoute("/")({
  loader: async () => {
    const queryClient = getQueryClient();
    const trpcClient = getTRPCClient();

    void queryClient.prefetchQuery({
      queryKey: [["products", "getProducts"], { type: "query" }],
      queryFn: () => trpcClient.products.getProducts.query(),
      staleTime: 1000 * 60 * 5,
    });

    return {};
  },
  component: Marketplace,
});

type SortOption = "recent" | "price-low" | "price-high" | "name";

function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const {
    data: products,
    isLoading,
    error,
  } = trpc.products.getProducts.useQuery();

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) => product.isPublished);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchQuery, sortBy]);

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground">
              Failed to load products. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <SearchHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <ProductControls
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          productCount={filteredAndSortedProducts.length}
        />
        <ProductGrid
          products={filteredAndSortedProducts}
          viewMode={viewMode}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

