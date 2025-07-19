import { router, protectedProcedure } from "../trpc";
import { auth } from "../../lib/auth";
import { z } from "zod";

export const usersRouter = router({
  generateApiKey: protectedProcedure.mutation(async ({ ctx }) => {
    console.log("Generate API Key - User context:", {
      hasUser: !!ctx.user,
      userId: ctx.user?.id,
      hasSession: !!ctx.session,
      sessionStructure: ctx.session,
    });

    // Use the user from context directly to create API key
    const apiKey = await auth.api.createApiKey({
      body: {
        remaining: 1,
        userId: ctx.user.id,
      },
    });

    return apiKey;
  }),

  checkApiKey: protectedProcedure
    .input(
      z.object({
        apiKeyId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const key = await auth.api.getApiKey({
          query: { id: input.apiKeyId },
          headers: ctx.headers,
        });

        if (!key.remaining || !key.expiresAt) {
          return false;
        }

        return key.remaining > 0 && key.expiresAt > new Date();
      } catch (e) {
        return false;
      }
    }),
});
