import {
  router,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "../trpc";
import { auth } from "../../lib/auth";
import { db } from "../../database/connection";
import { productsTable } from "../../database/schema/products";
import { user } from "../../database/schema/auth-schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { registryTable } from "../../database/schema/registry";
import { TRPCError } from "@trpc/server";

export const productsRouter = router({
  getProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await db
      .select({
        id: productsTable.id,
        name: productsTable.name,
        description: productsTable.description,
        price: productsTable.price,
        createdAt: productsTable.createdAt,
        isPublished: productsTable.isPublished,
        slug: productsTable.slug,
        // updatedAt: productsTable.updatedAt,
        createdBy: user.name,
      })
      .from(productsTable)
      .innerJoin(user, eq(productsTable.createdBy, user.id));

    return products;
  }),

  getDraft: adminProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const draft = await db
        .select()
        .from(registryTable)
        .where(eq(registryTable.id, id))
        .limit(1);

      return draft[0];
    }),

  publishProduct: adminProcedure
    .input(
      z.object({
        draftId: z.number(),
        name: z.string(),
        description: z.string(),
        price: z.string(),
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { draftId, name, description, price, slug } = input;

      const draft = await db
        .select()
        .from(registryTable)
        .where(eq(registryTable.id, draftId))
        .limit(1);

      if (!draft[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Draft not found",
        });
      }

      if (draft[0].productId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product already published",
        });
      }

      const product = await db
        .insert(productsTable)
        .values({
          name,
          description,
          price,
          slug,
          createdBy: draft[0].createdBy,
          isPublished: true,
        })
        .returning();

      await db
        .update(registryTable)
        .set({
          productId: product[0].id,
        })
        .where(eq(registryTable.id, draftId));

      return product[0];
    }),
});
