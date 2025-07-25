import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { getConfig } from "./config";
import type { AppRouter } from "../../../apps/server/src/trpc";

export const createTRPCClient = () => {
  const { serverUrl, apiKey } = getConfig();

  if (!serverUrl) {
    throw new Error(
      "Server URL not configured. Please run 'shopcn login' first."
    );
  }

  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${serverUrl}/trpc`,
        headers() {
          return apiKey
            ? {
                "x-api-key": apiKey,
              }
            : {};
        },
      }),
    ],
  });
};
