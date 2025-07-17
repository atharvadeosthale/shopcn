import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { productsTable } from "./products";

export const inventoryTable = pgTable("inventory", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  itemType: text("item_type").notNull(),
  productId: integer("product_id").references(() => productsTable.id),
  collectionId: text("collection_id"),
  // quantity: integer("quantity").notNull(),
  ownedBy: text("owned_by")
    .notNull()
    .references(() => user.id),
  checkoutId: text("checkout_id"),
  paymentCompleted: boolean("payment_completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertInventory = typeof inventoryTable.$inferInsert;
export type SelectInventory = typeof inventoryTable.$inferSelect;
