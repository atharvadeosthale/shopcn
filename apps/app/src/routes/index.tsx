import { trpc } from "@/lib/trpc";
import { createFileRoute } from "@tanstack/react-router";
import {
  Search,
  Filter,
  Eye,
  Grid,
  List,
  Zap,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";

export const Route = createFileRoute("/")({
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

interface SearchHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function SearchHero({ searchQuery, onSearchChange }: SearchHeroProps) {
  return (
    <section className="relative py-16 bg-gradient-to-br from-muted/40 via-muted/20 to-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
            Discover Premium
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              shadcn Components
            </span>
          </h1>
          <p className="text-xl text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto">
            Browse, purchase, and install high-quality UI components with a
            single command. Transform your projects with professional-grade
            components.
          </p>
        </div>

        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-1 shadow-2xl">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
              <input
                type="text"
                placeholder="Search components and templates..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-transparent border-0 rounded-2xl focus:outline-none text-lg placeholder:text-muted-foreground/60"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProductControlsProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  productCount: number;
}

function ProductControls({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  productCount,
}: ProductControlsProps) {
  return (
    <section className="sticky top-16 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-4">
          <div>
            <h2 className="text-xl font-bold">{productCount} Components</h2>
            <p className="text-sm text-muted-foreground">
              Discover the perfect components for your project
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none px-4 py-2 bg-background border border-border/50 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              <option value="recent">Sort by Recent</option>
              <option value="price-low">Sort by Price (Low to High)</option>
              <option value="price-high">Sort by Price (High to Low)</option>
              <option value="name">Sort by Name</option>
            </select>
            <button className="p-2.5 hover:bg-muted/60 rounded-xl transition-all duration-300 hover:scale-110">
              <Filter className="h-4 w-4" />
            </button>
            <div className="border-l border-border/50 pl-3 flex space-x-1">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  viewMode === "grid"
                    ? "bg-muted text-foreground"
                    : "hover:bg-muted/60"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  viewMode === "list"
                    ? "bg-muted text-foreground"
                    : "hover:bg-muted/60"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

function ProductGrid({ products, viewMode, isLoading }: ProductGridProps) {
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

function ProductCard({ product, viewMode, index }: ProductCardProps) {
  const isNew =
    new Date().getTime() - new Date(product.createdAt).getTime() <
    7 * 24 * 60 * 60 * 1000; // 7 days

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
            <button className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group font-medium">
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
          <button className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group font-medium">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative">Purchase</span>
          </button>
        </div>
      </div>
    </div>
  );
}
