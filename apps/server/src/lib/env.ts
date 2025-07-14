import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  // Database (PostgreSQL)
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // Stripe
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is required"),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, "STRIPE_WEBHOOK_SECRET is required"),
});

export const env = envSchema.parse(process.env);
