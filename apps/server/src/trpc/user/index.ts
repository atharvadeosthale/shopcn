import { router, protectedProcedure } from "../trpc";
import { auth } from "../../lib/auth";

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
});
