import { router, protectedProcedure } from "../trpc";
import { auth } from "../../lib/auth";
import { z } from "zod";
import { productsTable } from "../../database/schema/products";
import { db } from "../../database/connection";
import { and, eq } from "drizzle-orm";
import { inventoryTable } from "../../database/schema/inventory";

export const usersRouter = router({
  generateApiKey: protectedProcedure.mutation(async ({ ctx }) => {
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

  getPurchasedProducts: protectedProcedure.query(async ({ ctx }) => {
    const products = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        description: productsTable.description,
        price: productsTable.price,
        createdAt: productsTable.createdAt,
        product: {
          id: productsTable.id,
          name: productsTable.name,
          description: productsTable.description,
          price: productsTable.price,
          createdAt: productsTable.createdAt,
          isPublished: productsTable.isPublished,
          slug: productsTable.slug,
        },
      })
      .from(inventoryTable)
      .where(
        and(
          eq(inventoryTable.ownedBy, ctx.user.id),
          eq(inventoryTable.paymentCompleted, true)
        )
      )
      .innerJoin(productsTable, eq(inventoryTable.productId, productsTable.id));

    return products;
  }),
});
