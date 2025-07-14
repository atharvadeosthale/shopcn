import { z } from "zod";
import { stripe } from "../../lib/stripe";
import { db } from "../../database/connection";
import { inventory } from "../../database/schema/inventory";
import { products } from "../../database/schema/products";
import { eq } from "drizzle-orm";
import { router, protectedProcedure } from "../index";

export const paymentsRouter = router({
  createCheckout: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
        successUrl: z.string(),
        cancelUrl: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const product = await db
        .select()
        .from(products)
        .where(eq(products.id, parseInt(input.productId)))
        .limit(1);

      if (!product.length) {
        throw new Error("Product not found");
      }

      const productData = product[0];

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
              unit_amount: productData.price,
            },
            quantity: 1,
          },
        ],
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        metadata: {
          productId: input.productId,
          quantity: input.quantity.toString(),
        },
      });

      const inventoryRecord = await db
        .insert(inventory)
        .values({
          itemType: "product",
          productId: input.productId,
          quantity: input.quantity,
          ownedBy: ctx.user.id,
          checkoutId: session.id,
          paymentCompleted: false,
        })
        .returning({ id: inventory.id });

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
        .from(inventory)
        .where(eq(inventory.checkoutId, input.checkoutId))
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
