import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  registryJson: jsonb("registry_json").notNull(),
  isPublished: boolean("is_published").notNull().default(false),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;
