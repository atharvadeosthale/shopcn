import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

export const env = envSchema.parse(process.env);
