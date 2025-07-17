import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { productsTable } from "./products";

export const registryTable = pgTable("registry", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  registryJson: jsonb("registry_json").notNull(),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),
  productId: integer("product_id").references(() => productsTable.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertRegistry = typeof registryTable.$inferInsert;
export type SelectRegistry = typeof registryTable.$inferSelect;
