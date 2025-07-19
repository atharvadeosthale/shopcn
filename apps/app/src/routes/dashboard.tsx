import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Key, Copy, Clock, RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string>("");
  const [keyExpiry, setKeyExpiry] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateKeyMutation = trpc.users.generateApiKey.useMutation({
    onSuccess: (data) => {
      setApiKey(data.id);
      const expiryTime = new Date(Date.now() + 5 * 60 * 1000);
      setKeyExpiry(expiryTime);
      startTimer(expiryTime);
    },
    onError: (error) => {
      console.error("Error generating API key:", error);
    },
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session.data) {
          setUser(session.data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = (expiryTime: Date) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const updateTimer = () => {
      const now = new Date();
      const remaining = expiryTime.getTime() - now.getTime();
      
      if (remaining <= 0) {
        setTimeRemaining("Expired");
        setApiKey("");
        setKeyExpiry(null);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        return;
      }
      
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    };
    
    updateTimer();
    timerRef.current = setInterval(updateTimer, 1000);
  };

  const handleGenerateKey = () => {
    generateKeyMutation.mutate();
  };

  const handleCopyKey = async () => {
    if (apiKey) {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/3 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-xl shadow-primary/25 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"></div>
                    <Key className="h-10 w-10 text-primary-foreground relative z-10" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Welcome back
                </span>
                {user && (
                  <>
                    <br />
                    <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                      {user.name}
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Your component marketplace dashboard
              </p>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative bg-card/80 backdrop-blur-2xl border border-border/40 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Key className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">API Access</h2>
                      <p className="text-muted-foreground">Generate temporary authentication keys</p>
                    </div>
                  </div>
                  <button
                    onClick={handleGenerateKey}
                    disabled={generateKeyMutation.isPending}
                    className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-6 py-3 rounded-2xl hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25 group font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <div className="relative flex items-center space-x-2">
                      {generateKeyMutation.isPending ? (
                        <RefreshCw className="h-5 w-5 animate-spin" />
                      ) : (
                        <Key className="h-5 w-5" />
                      )}
                      <span>
                        {generateKeyMutation.isPending ? "Generating..." : "Generate Key"}
                      </span>
                    </div>
                  </button>
                </div>

                {apiKey ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/30 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <Key className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Active Key</h3>
                            <p className="text-sm text-green-600 dark:text-green-400">Valid for 5 minutes</p>
                          </div>
                        </div>
                        {keyExpiry && timeRemaining && (
                          <div className="flex items-center space-x-2 bg-white/60 dark:bg-black/20 rounded-xl px-3 py-2">
                            <Clock className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-mono text-green-700 dark:text-green-300">{timeRemaining}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-white/70 dark:bg-black/30 border border-green-200/50 dark:border-green-800/30 rounded-xl p-4">
                          <code className="font-mono text-sm text-green-800 dark:text-green-200 break-all select-all">
                            {apiKey}
                          </code>
                        </div>
                        <button
                          onClick={handleCopyKey}
                          className="h-12 w-12 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
                        >
                          <Copy className={`h-5 w-5 transition-colors ${copied ? "text-green-600" : "text-green-500"}`} />
                        </button>
                      </div>
                      {copied && (
                        <div className="mt-3 flex items-center space-x-2 text-green-600 dark:text-green-400">
                          <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">Copied to clipboard!</span>
                        </div>
                      )}
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                      <Key className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground">Click "Generate Key" to create a temporary API key</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
