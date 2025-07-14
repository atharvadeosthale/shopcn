import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/connection";
import {
  account,
  session,
  user,
  verification,
} from "../database/schema/auth-schema";
import { inventory } from "../database/schema/inventory";
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
    apiKey(),
    stripe({
      createCustomerOnSignUp: true,
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      async onEvent(event) {
        if (event.type === "checkout.session.completed") {
          // const checkoutSession = event.data.object;
          // await db
          //   .update(inventory)
          //   .set({ paymentCompleted: true })
          //   .where(eq(inventory.checkoutId, checkoutSession.id));
        }
      },
    }),
  ],

  emailAndPassword: {
    enabled: true,
  },
});
