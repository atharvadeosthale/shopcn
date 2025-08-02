import Link from 'next/link';
import { Terminal, DollarSign, Clock, Shield, Code, Package, ArrowRight, ExternalLink } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="px-6 pt-20 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              shopcn
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Self-hosted marketplace infrastructure for shadcn components. 
              Built for developers who want to monetize their UI work.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Documentation
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                href="https://github.com/atharvadeosthale/shopcn"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                GitHub
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-sm font-mono text-muted-foreground mb-8">WORKFLOW</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-muted border border-border flex items-center justify-center font-mono text-sm">
                    01
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Create & publish</h3>
                    <p className="text-muted-foreground text-sm">
                      Use the CLI to upload your shadcn registry files and set pricing
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-muted border border-border flex items-center justify-center font-mono text-sm">
                    02
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Customer purchase</h3>
                    <p className="text-muted-foreground text-sm">
                      Buyers checkout with Stripe and receive a time-limited key
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-muted border border-border flex items-center justify-center font-mono text-sm">
                    03
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Install components</h3>
                    <p className="text-muted-foreground text-sm">
                      Standard shadcn CLI with authentication key parameter
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/50"></div>
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/50"></div>
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/50"></div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">bash</span>
              </div>
              
              <div className="p-6 font-mono text-sm space-y-6">
                <div>
                  <div className="text-muted-foreground mb-3"># seller</div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-green-500">$</span> npx shopcn login
                    </div>
                    <div>
                      <span className="text-green-500">$</span> npx shopcn add ./button/registry.json
                    </div>
                    <div className="text-muted-foreground pl-2">
                      → draft created: /admin/draft/42
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-6">
                  <div className="text-muted-foreground mb-3"># buyer</div>
                  <div className="space-y-2">
                    <div className="text-muted-foreground">
                      received key: shopcn_k4x9mP2q...
                    </div>
                    <div className="break-all">
                      <span className="text-green-500">$</span> npx shadcn@latest add \<br />
                      <span className="pl-4">https://your-shop.com/install/button<span className="text-yellow-500">?key=shopcn_k4x9mP2q</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-mono text-muted-foreground mb-8">FEATURES</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">Time-based access</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Keys expire after 5 minutes. Prevents unauthorized sharing while giving legitimate users enough time to install.
              </p>
            </div>
            
            <div>
              <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center mb-4">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">BYO Stripe</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Use your own Stripe keys. Handle payments directly with your account. Keep full control.
              </p>
            </div>
            
            <div>
              <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">Self-hosted</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Deploy on your infrastructure. Keep 100% of revenue. Own your customer relationships.
              </p>
            </div>
            
            <div>
              <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center mb-4">
                <Code className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">Registry compatible</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Works with standard shadcn registry format. No modifications needed to existing components.
              </p>
            </div>
            
            <div>
              <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center mb-4">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">CLI tools</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Publisher CLI for component management. Native shadcn CLI support for installation.
              </p>
            </div>
            
            <div>
              <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center mb-4">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">Full stack</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Complete monorepo with server, web app, and CLI. Built with modern TypeScript stack.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card border border-border p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Start selling components
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deploy your own shopcn instance and build a revenue stream from your shadcn components.
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              View documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-12 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Open source marketplace for shadcn components
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="https://github.com/atharvadeosthale/shopcn" className="text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
