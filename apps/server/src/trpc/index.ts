import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { paymentsRouter } from "./payments";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
  payments: paymentsRouter,
});

export type AppRouter = typeof appRouter;
