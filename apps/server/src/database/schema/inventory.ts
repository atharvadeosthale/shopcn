import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { products } from "./products";

export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  itemType: text("item_type").notNull(),
  productId: text("product_id").references(() => products.id),
  collectionId: text("collection_id"),
  quantity: integer("quantity").notNull(),
  ownedBy: text("owned_by")
    .notNull()
    .references(() => user.id),
  checkoutId: text("checkout_id"),
  paymentCompleted: boolean("payment_completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertInventory = typeof inventory.$inferInsert;
export type SelectInventory = typeof inventory.$inferSelect;
