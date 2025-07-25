import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";

type AuthSearch = {
  r?: string;
};

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    r: typeof search.r === "string" ? search.r : undefined,
  }),
  component: AuthPage,
});

function AuthPage() {
  const { r: redirectTo } = Route.useSearch();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-primary shadow-xl shadow-primary/25"></div>
                <div className="absolute inset-0 h-16 w-16 rounded-2xl bg-gradient-to-tr from-primary to-primary/80 opacity-90"></div>
                <Sparkles className="absolute inset-0 h-16 w-16 p-4 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text mb-3">
              Welcome to shopcn
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in to access premium shadcn components and templates
            </p>
          </div>

          <div className="bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              <button
                onClick={() =>
                  // TODO: plug env here later
                  authClient.signIn.social({
                    provider: "google",
                    callbackURL: redirectTo ? `http://localhost:3001${redirectTo}` : "http://localhost:3001/dashboard",
                    errorCallbackURL: `http://localhost:3001/auth${redirectTo ? `?r=${encodeURIComponent(redirectTo)}` : ""}`,
                  })
                }
                className="w-full relative overflow-hidden bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 px-6 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group flex items-center justify-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <svg className="h-5 w-5 relative" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="relative font-medium">
                  Continue with Google
                </span>
                <ArrowRight className="h-4 w-4 relative opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

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
    </div>
  );
}
