import { db } from "../../database/connection";
import { productsTable } from "../../database/schema/products";
import { adminProcedure, router } from "../trpc";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { inventoryTable } from "../../database/schema/inventory";
import { user } from "../../database/schema/auth-schema";
import { auth } from "../../lib/auth";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const adminRouter = router({
  getProducts: adminProcedure.query(async ({ ctx }) => {
    const products = await db.select().from(productsTable);
    return products;
  }),

  getUserProducts: adminProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const products = await db
        .select()
        .from(inventoryTable)
        .where(
          and(
            eq(inventoryTable.ownedBy, input.userId),
            eq(inventoryTable.paymentCompleted, true)
          )
        )
        .innerJoin(
          productsTable,
          eq(inventoryTable.productId, productsTable.id)
        );

      return products;
    }),

  getUsers: adminProcedure
    .input(
      z
        .object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(100).default(20),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      try {
        const page = input?.page ?? 1;
        const limit = input?.limit ?? 20;
        const offset = (page - 1) * limit;

        // Get total count from database
        const totalCountResult = await db
          .select({ count: sql<number>`count(*)` })
          .from(user);
        const total = Number(totalCountResult[0]?.count ?? 0);

        // Get paginated users
        const result = await auth.api.listUsers({
          query: {
            limit,
            offset,
          },
          headers: ctx.headers,
        });

        const totalPages = Math.ceil(total / limit);
        const hasMore = page < totalPages;

        return {
          users: result.users,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasMore,
          },
        };
      } catch (err) {
        console.error(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get users",
        });
      }
    }),

  // TODO: add a record in db to do this gracefully
  revokeUserProduct: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        productId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(inventoryTable)
        .where(
          and(
            eq(inventoryTable.ownedBy, input.userId),
            eq(inventoryTable.productId, parseInt(input.productId)),
            eq(inventoryTable.paymentCompleted, true)
          )
        );
    }),
});
