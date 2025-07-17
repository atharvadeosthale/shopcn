import { router, protectedProcedure } from "../trpc";
import { auth } from "../../lib/auth";

export const usersRouter = router({
  generateApiKey: protectedProcedure.mutation(async ({ ctx }) => {
    const apiKey = await auth.api.createApiKey({
      body: {
        remaining: 1,
      },
    });

    return apiKey;
  }),
});
