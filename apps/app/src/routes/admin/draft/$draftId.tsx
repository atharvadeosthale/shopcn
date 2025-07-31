import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { trpc } from "@/lib/trpc";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Package,
  Sparkles,
  Code2,
  Eye,
  FileJson,
  CheckCircle2,
  FileText,
  Copy,
  Terminal,
  AlertCircle,
  Info,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";

export const Route = createFileRoute("/admin/draft/$draftId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { draftId } = Route.useParams();
  const navigate = useNavigate();
  const [previewMode, setPreviewMode] = useState<"json" | "visual">("visual");
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [expandedFile, setExpandedFile] = useState<number | null>(null);

  const { data: draft, isLoading: isDraftLoading } =
    trpc.products.getDraft.useQuery({
      id: parseInt(draftId),
    });

  const { mutate: publishProduct, isPending: isPublishing } =
    trpc.products.publishProduct.useMutation({
      onSuccess: () => {
        toast.success("Product published successfully!");
        setTimeout(() => {
          navigate({ to: "/admin" });
        }, 1500);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to publish product");
      },
    });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      slug: "",
    },
    validators: {
      onChange: ({ value }) => {
        if (!value.name?.trim()) return { form: "Component name is required" };
        if (!value.slug?.trim()) return { form: "URL slug is required" };
        if (!value.description?.trim())
          return { form: "Description is required" };
        if (!value.price?.trim() || parseFloat(value.price) <= 0)
          return { form: "Valid price is required" };
        if (slugError) return { form: "Please fix slug errors" };
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      if (!validateSlug(value.slug)) {
        return;
      }

      publishProduct({
        draftId: parseInt(draftId),
        name: value.name.trim(),
        description: value.description.trim(),
        price: value.price.trim(),
        slug: value.slug.trim(),
      });
    },
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const validateSlug = (slug: string): boolean => {
    if (!slug) {
      setSlugError("");
      return false;
    }

    const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
    if (!validSlug) {
      setSlugError(
        "Slug can only contain lowercase letters, numbers, and hyphens"
      );
      return false;
    }

    if (slug.length < 3) {
      setSlugError("Slug must be at least 3 characters long");
      return false;
    }

    setSlugError("");
    return true;
  };

  const copyInstallCommand = () => {
    const command = `bunx shadcn@latest add https://shopcn.app/registry/${form.state.values.slug || "component-slug"}?token=shopcn_xxxxxx`;
    navigator.clipboard.writeText(command);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  if (isDraftLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <p className="text-lg text-muted-foreground">Loading draft...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-destructive">
                Draft Not Found
              </CardTitle>
              <CardDescription>
                The draft you're looking for doesn't exist or has been removed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate({ to: "/admin" })}
                className="w-full"
              >
                Back to Admin
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const registryData =
    typeof draft.registryJson === "string"
      ? JSON.parse(draft.registryJson)
      : draft.registryJson;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => navigate({ to: "/admin" })}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin
              </button>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">Draft #{draftId}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold">
                Publish Your Component
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Complete the details below to make your component available on
                the marketplace
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm sm:text-base">Registry uploaded</span>
              </div>
              <div className="hidden sm:block h-px w-12 bg-border" />
              <div className="flex items-center gap-2 font-medium">
                <div className="h-2 w-2 bg-primary rounded-full" />
                <span className="text-sm sm:text-base">Add details</span>
              </div>
              <div className="hidden sm:block h-px w-12 bg-border" />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-5 w-5" />
                <span className="text-sm sm:text-base">Publish</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileJson className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle>Registry Data</CardTitle>
                        <CardDescription>
                          Your component configuration
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center bg-muted rounded-md p-1">
                      <button
                        onClick={() => setPreviewMode("visual")}
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                          previewMode === "visual"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setPreviewMode("json")}
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                          previewMode === "json"
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Code2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {previewMode === "visual" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="border-0 shadow-none bg-muted/50">
                          <CardContent className="p-4 space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Component Files
                            </p>
                            <p className="text-2xl font-bold">
                              {registryData.files?.length || 0}
                            </p>
                          </CardContent>
                        </Card>
                        <Card className="border-0 shadow-none bg-muted/50">
                          <CardContent className="p-4 space-y-1">
                            <p className="text-sm text-muted-foreground">
                              Dependencies
                            </p>
                            <p className="text-2xl font-bold">
                              {Array.isArray(registryData.dependencies) 
                                ? registryData.dependencies.length 
                                : Object.keys(registryData.dependencies || {}).length}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {registryData.files && registryData.files.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                              Component Files
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {registryData.files.length} total
                            </span>
                          </div>
                          <div className="space-y-1">
                            {registryData.files.map(
                              (file: any, index: number) => (
                                <button
                                  key={index}
                                  onClick={() =>
                                    setExpandedFile(
                                      expandedFile === index ? null : index
                                    )
                                  }
                                  className="w-full flex items-center gap-2 p-2 hover:bg-muted/50 rounded-md transition-colors text-left"
                                >
                                  <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                                  <code className="text-xs flex-1 truncate">
                                    {file.path ||
                                      file.name ||
                                      `File ${index + 1}`}
                                  </code>
                                  {file.content && (
                                    <span className="text-xs text-muted-foreground">
                                      {file.content.length} chars
                                    </span>
                                  )}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {registryData.dependencies &&
                        Object.keys(registryData.dependencies).length > 0 && (
                          <div className="space-y-3 border-t pt-4">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">Dependencies</p>
                              <span className="text-xs text-muted-foreground">
                                {Array.isArray(registryData.dependencies) 
                                  ? registryData.dependencies.length 
                                  : Object.keys(registryData.dependencies).length} total
                              </span>
                            </div>
                            <div className="space-y-1">
                              {Array.isArray(registryData.dependencies) 
                                ? registryData.dependencies.map((dep, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between gap-2 p-2 bg-muted/30 rounded-md text-xs"
                                    >
                                      <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <Package className="h-3 w-3 text-muted-foreground shrink-0" />
                                        <span className="font-mono text-foreground">{dep}</span>
                                      </div>
                                      <span className="text-muted-foreground font-mono">latest</span>
                                    </div>
                                  ))
                                : Object.entries(registryData.dependencies).map(([dep, version]) => (
                                    <div
                                      key={dep}
                                      className="flex items-center justify-between gap-2 p-2 bg-muted/30 rounded-md text-xs"
                                    >
                                      <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <Package className="h-3 w-3 text-muted-foreground shrink-0" />
                                        <span className="font-mono text-foreground">{dep}</span>
                                      </div>
                                      <span className="text-muted-foreground font-mono">
                                        {version}
                                      </span>
                                    </div>
                                  ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ) : (
                    <div className="bg-muted/50 rounded-lg p-4 overflow-auto max-h-[400px]">
                      <pre className="text-xs sm:text-sm font-mono">
                        {JSON.stringify(registryData, null, 2)}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Terminal className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle>Installation</CardTitle>
                      <CardDescription>
                        How buyers will install your component
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        1
                      </div>
                      <span>Purchase component and receive token</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        2
                      </div>
                      <span>Run installation command with token</span>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <code className="text-xs sm:text-sm font-mono flex-1 break-all">
                        bunx shadcn@latest add https://shopcn.app/registry/
                        {form.state.values.slug || "your-component"}
                        ?token=shopcn_xxxxxx
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={copyInstallCommand}
                        className="shrink-0"
                      >
                        {copiedCommand ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      <p className="font-medium text-foreground">
                        Token-based access
                      </p>
                      <p>
                        Each purchase generates a unique token for secure
                        component access
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>
                          Marketplace listing information
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.handleSubmit();
                    }}
                    className="space-y-5"
                  >
                    <form.Field
                      name="name"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label
                            htmlFor={field.name}
                            className="text-sm font-medium"
                          >
                            Component Name{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={(e) => {
                                field.handleBlur();
                                if (!form.state.values.slug && e.target.value) {
                                  const generatedSlug = generateSlug(
                                    e.target.value
                                  );
                                  form.setFieldValue("slug", generatedSlug);
                                  validateSlug(generatedSlug);
                                }
                              }}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="e.g., Advanced Data Table"
                              className={`pr-10 ${field.state.value ? "border-green-500/50" : ""}`}
                            />
                            {field.state.value && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Use a clear, descriptive name that explains what
                            your component does
                          </p>
                        </div>
                      )}
                    />

                    <form.Field
                      name="slug"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label
                            htmlFor={field.name}
                            className="text-sm font-medium"
                          >
                            URL Slug <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={(e) => {
                                field.handleBlur();
                                validateSlug(e.target.value);
                              }}
                              onChange={(e) => {
                                const slug = generateSlug(e.target.value);
                                field.handleChange(slug);
                                validateSlug(slug);
                              }}
                              placeholder="e.g., advanced-data-table"
                              className={`pr-10 ${
                                field.state.value && !slugError
                                  ? "border-green-500/50"
                                  : slugError
                                    ? "border-destructive"
                                    : ""
                              }`}
                            />
                            {field.state.value && !slugError && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                            )}
                          </div>
                          {slugError && (
                            <p className="text-xs text-destructive">
                              {slugError}
                            </p>
                          )}
                          {field.state.value && !slugError && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <ExternalLink className="h-3 w-3" />
                              <span>
                                Preview: shopcn.app/components/
                                {field.state.value}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    />

                    <form.Field
                      name="description"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label
                            htmlFor={field.name}
                            className="text-sm font-medium"
                          >
                            Description{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <Textarea
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Describe your component's features, use cases, and what makes it unique..."
                              rows={4}
                              maxLength={500}
                              className={`resize-none ${field.state.value ? "border-green-500/50" : ""}`}
                            />
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <p className="text-muted-foreground">
                              Include key features and benefits
                            </p>
                            <p
                              className={`${
                                field.state.value.length > 450
                                  ? "text-orange-500"
                                  : field.state.value.length > 0
                                    ? "text-green-500"
                                    : "text-muted-foreground"
                              }`}
                            >
                              {field.state.value.length}/500
                            </p>
                          </div>
                        </div>
                      )}
                    />

                    <form.Field
                      name="price"
                      children={(field) => (
                        <div className="space-y-2">
                          <Label
                            htmlFor={field.name}
                            className="text-sm font-medium"
                          >
                            Price (USD){" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              $
                            </div>
                            <Input
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="29.99"
                              type="number"
                              step="0.01"
                              min="0.99"
                              max="999.99"
                              className={`pl-8 pr-10 ${field.state.value ? "border-green-500/50" : ""}`}
                            />
                            {field.state.value && (
                              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: "Starter", price: "9.99" },
                              { label: "Popular", price: "29.99" },
                              { label: "Premium", price: "49.99" },
                              { label: "Enterprise", price: "99.99" },
                            ].map((tier) => (
                              <button
                                key={tier.price}
                                type="button"
                                onClick={() => field.handleChange(tier.price)}
                                className={`text-xs px-3 py-1 rounded transition-colors ${
                                  field.state.value === tier.price
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                                }`}
                              >
                                {tier.label} ${tier.price}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    />

                    <div className="pt-4 space-y-4">
                      {form.state.errors.length > 0 && (
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium">Almost there!</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Complete all fields to publish your component
                            </p>
                          </div>
                        </div>
                      )}


                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={
                          isPublishing ||
                          form.state.errors.length > 0 ||
                          !form.state.canSubmit
                        }
                      >
                        {isPublishing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Publishing...
                          </>
                        ) : (
                          <>
                            <Package className="mr-2 h-4 w-4" />
                            Publish Component
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
