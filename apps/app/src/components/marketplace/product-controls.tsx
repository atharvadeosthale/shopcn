import { Filter, Grid, List } from "lucide-react";

type SortOption = "recent" | "price-low" | "price-high" | "name";

interface ProductControlsProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  productCount: number;
}

export function ProductControls({
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