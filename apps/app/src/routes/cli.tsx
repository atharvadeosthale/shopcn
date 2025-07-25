import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Terminal, Key, Copy, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const request = getWebRequest();
  const session = await authClient.getSession({
    fetchOptions: {
      headers: request.headers,
    },
  });

  return { authenticated: !!session.data };
});

export const Route = createFileRoute("/cli")({
  loader: async () => {
    const result = await checkAuth();
    if (!result.authenticated) {
      throw redirect({
        to: "/auth",
        search: { r: "/cli" },
      });
    }
    return {};
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [apiKey, setApiKey] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const generateApiKeyMutation = trpc.cli.generateApiKey.useMutation({
    onSuccess: (key) => {
      setApiKey(key);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleGenerateKey = () => {
    generateApiKeyMutation.mutate();
  };

  const handleCopyKey = async () => {
    if (apiKey) {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Terminal className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">CLI Access</h1>
            <p className="text-muted-foreground">
              Generate your API key to use with the shopcn CLI
            </p>
          </div>

          {!apiKey ? (
            <div className="text-center">
              <button
                onClick={handleGenerateKey}
                disabled={generateApiKeyMutation.isPending}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {generateApiKeyMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <span>Generate API Key</span>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-card border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Key className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Your API Key</h3>
                      <p className="text-sm text-muted-foreground">
                        Save this securely
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-muted/50 rounded-lg p-3">
                    <code className="font-mono text-sm break-all select-all">
                      {apiKey}
                    </code>
                  </div>
                  <button
                    onClick={handleCopyKey}
                    className="h-12 w-12 bg-muted hover:bg-muted/80 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

                {copied && (
                  <div className="mt-3 text-sm text-green-600 dark:text-green-400">
                    ✓ Copied to clipboard
                  </div>
                )}
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Use this key with the shopcn CLI to install components
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
