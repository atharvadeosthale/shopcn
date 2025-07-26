import { z } from "zod";
import { stripe } from "../../lib/stripe";
import { db } from "../../database/connection";
import { inventoryTable } from "../../database/schema/inventory";
import { productsTable } from "../../database/schema/products";
import { and, eq } from "drizzle-orm";
import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const paymentsRouter = router({
  createCheckout: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        successUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const product = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.id, parseInt(input.productId)))
        .limit(1);

      if (!product.length) {
        throw new Error("Product not found");
      }

      const productData = product[0];

      // Check if the user has already purchased this product
      const existingInventoryRecord = await db
        .select()
        .from(inventoryTable)
        .where(
          and(
            eq(inventoryTable.productId, parseInt(input.productId)),
            eq(inventoryTable.ownedBy, ctx.user.id),
            eq(inventoryTable.paymentCompleted, true)
          )
        )
        .limit(1);

      if (existingInventoryRecord.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already purchased this product.",
        });
      }

      // TODO: temporary solution, most robust would be to
      // assign every product a stripe product and do it that way
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: productData.name,
                description: productData.description,
              },
              unit_amount: parseFloat(productData.price) * 100,
            },
            quantity: 1,
          },
        ],
        customer_email: ctx.user.email,
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        metadata: {
          productId: input.productId,
          quantity: 1,
        },
      });

      const inventoryRecord = await db
        .insert(inventoryTable)
        .values({
          itemType: "product",
          productId: parseInt(input.productId),
          ownedBy: ctx.user.id,
          checkoutId: session.id,
          paymentCompleted: false,
        })
        .returning({ id: inventoryTable.id });

      return {
        checkoutUrl: session.url,
        checkoutId: session.id,
        inventoryId: inventoryRecord[0].id,
      };
    }),

  getPaymentStatus: protectedProcedure
    .input(z.object({ checkoutId: z.string() }))
    .query(async ({ input }) => {
      const inventoryRecord = await db
        .select()
        .from(inventoryTable)
        .where(eq(inventoryTable.checkoutId, input.checkoutId))
        .limit(1);

      if (!inventoryRecord.length) {
        throw new Error("Payment record not found");
      }

      return {
        paymentCompleted: inventoryRecord[0].paymentCompleted,
        inventoryId: inventoryRecord[0].id,
      };
    }),
});
