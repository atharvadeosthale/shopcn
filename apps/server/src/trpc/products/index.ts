import { router, protectedProcedure, publicProcedure } from "../trpc";
import { auth } from "../../lib/auth";
import { db } from "../../database/connection";
import { productsTable } from "../../database/schema/products";
import { user } from "../../database/schema/auth-schema";
import { eq } from "drizzle-orm";

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
});
