import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export interface AppRouter {
  cli: {
    getCliAuthUrl: {
      query: () => Promise<string>;
    };
    generateApiKey: {
      mutation: () => Promise<string>;
    };
    validateApiKey: {
      query: () => Promise<boolean>;
    };
    createDraft: {
      mutation: (input: { input: { json: string } }) => Promise<{
        id: string;
        url: string;
      }>;
    };
  };
}

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;