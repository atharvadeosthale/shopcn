import { ShoppingCart, User } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-xl bg-primary shadow-lg shadow-primary/25"></div>
              <div className="absolute inset-0 h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-primary/80 opacity-90"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              shopcn
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="relative text-foreground font-medium group">
              Components
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></div>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Templates
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Blocks
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Sell
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-muted/60 rounded-xl transition-all duration-300 hover:scale-110 group">
            <ShoppingCart className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              2
            </div>
          </button>
          <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105">
            <User className="h-5 w-5" />
            <span className="hidden sm:block">Sign In</span>
          </button>
          <button className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative font-medium">Sell Components</span>
          </button>
        </div>
      </div>
    </header>
  );
}