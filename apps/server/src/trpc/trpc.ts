import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "../lib/auth";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await auth.api.getSession({
    headers: opts.req.headers,
  });

  return {
    session,
    user: session?.user || null,
    headers: opts.req.headers,
    req: opts.req,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource.",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
      user: ctx.user,
      headers: ctx.headers,
    },
  });
});
export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You must be an admin to access this resource.",
    });
  }

  return next({ ctx });
});
// export const cliAdminProcedure = publicProcedure.use(async ({ ctx, next }) => {
//   const apiKey = ctx.headers.get("x-api-key");

//   if (!apiKey) {
//     throw new TRPCError({
//       code: "UNAUTHORIZED",
//       message: "You must be logged in to access this resource.",
//     });
//   }

//   const

//   return next({ ctx });
// });
