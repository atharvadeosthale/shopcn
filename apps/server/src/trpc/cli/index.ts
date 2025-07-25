import { z } from "zod";
import { auth } from "../../lib/auth";
import { env } from "../../lib/env";
import { adminProcedure, publicProcedure, router } from "../trpc";
import { db } from "../../database/connection";
import { registryTable } from "../../database/schema/registry";

export const cliRouter = router({
  generateApiKey: adminProcedure.mutation(async ({ ctx }) => {
    const key = await auth.api.createApiKey({
      body: {
        expiresIn: null,
        prefix: "cli_",
        userId: ctx.user.id,
      },
    });

    return key.key;
  }),

  validateApiKey: adminProcedure.query(async ({ ctx }) => {
    return true;
  }),

  getCliAuthUrl: publicProcedure.query(async ({ ctx }) => {
    return `${env.FRONTEND_URL}/cli`;
  }),

  createDraft: adminProcedure
    .input(
      z.object({
        json: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { json } = input;

      const draft = await db
        .insert(registryTable)
        .values({
          registryJson: json,
          createdBy: ctx.user.id,
        })
        .returning();

      return {
        id: draft[0].id,
        url: `${env.FRONTEND_URL}/admin/draft/${draft[0].id}`,
      };
    }),
});
