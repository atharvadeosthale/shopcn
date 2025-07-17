import { router, protectedProcedure, publicProcedure } from "../trpc";
import { auth } from "../../lib/auth";
import { db } from "../../database/connection";
import { productsTable } from "../../database/schema/products";

export const productsRouter = router({
  getProducts: publicProcedure.query(async ({ ctx }) => {
    const products = await db.select().from(productsTable);

    return products;
  }),
});
