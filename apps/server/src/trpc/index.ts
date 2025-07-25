import { z } from "zod";
import { router, publicProcedure } from "./trpc";
import { paymentsRouter } from "./payments";
import { usersRouter } from "./user";
import { productsRouter } from "./products";
import { cliRouter } from "./cli";

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
  payments: paymentsRouter,
  users: usersRouter,
  products: productsRouter,
  cli: cliRouter,
});

export type AppRouter = typeof appRouter;
export { createContext } from "./trpc";
