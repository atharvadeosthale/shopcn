import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/connection";
import {
  account,
  session,
  user,
  verification,
} from "../database/schema/auth-schema";
import { apiKey } from "better-auth/plugins";

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
  plugins: [apiKey()],
  emailAndPassword: {
    enabled: true,
  },
});
