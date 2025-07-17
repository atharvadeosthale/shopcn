import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/connection";
import {
  account,
  session,
  user,
  verification,
} from "../database/schema/auth-schema";
import { inventoryTable } from "../database/schema/inventory";
import { apiKey } from "better-auth/plugins";
import { stripe } from "@better-auth/stripe";
import { stripe as stripeClient } from "../lib/stripe";
import { eq } from "drizzle-orm";
import { env } from "./env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      session: session,
      verification: verification,
      account: account,
    },
  }),

  plugins: [
    apiKey({
      defaultPrefix: "shopcn_",
      keyExpiration: {
        defaultExpiresIn: 300000,
        disableCustomExpiresTime: true,
        maxExpiresIn: 1,
      },
      disableSessionForAPIKeys: true,
    }),

    stripe({
      createCustomerOnSignUp: true,
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      async onEvent(event) {
        if (event.type === "checkout.session.completed") {
          const { id } = event.data.object;

          const checkoutSession =
            await stripeClient.checkout.sessions.retrieve(id);

          if (checkoutSession.status !== "complete") {
            await db
              .update(inventoryTable)
              .set({ paymentCompleted: false })
              .where(eq(inventoryTable.checkoutId, id));
          } else {
            await db
              .update(inventoryTable)
              .set({ paymentCompleted: true })
              .where(eq(inventoryTable.checkoutId, id));
          }
        }
      },
    }),
  ],

  emailAndPassword: {
    enabled: true,
  },
});
