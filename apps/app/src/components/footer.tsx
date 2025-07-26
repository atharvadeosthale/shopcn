export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-6 w-6 rounded-lg bg-primary shadow-lg shadow-primary/25"></div>
              <div className="absolute inset-0 h-6 w-6 rounded-lg bg-gradient-to-tr from-primary to-primary/80 opacity-90"></div>
            </div>
            <span className="font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              shopcn
            </span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Components
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Templates
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}