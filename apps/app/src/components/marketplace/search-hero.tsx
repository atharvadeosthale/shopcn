import { Search } from "lucide-react";

interface SearchHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchHero({ searchQuery, onSearchChange }: SearchHeroProps) {
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