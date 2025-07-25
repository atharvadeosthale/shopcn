import { auth } from "../../lib/auth";
import { adminProcedure, router } from "../trpc";

export const cliRouter = router({
  generateApiKey: adminProcedure.mutation(async ({ ctx }) => {
    const key = await auth.api.createApiKey({
      body: {
        expiresIn: null,
        prefix: "cli_",
      },
    });

    return key.key;
  }),

  validateApiKey: adminProcedure.query(async ({ ctx }) => {
    return true;
  }),
});
