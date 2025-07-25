import { Hono } from "hono";
import { db } from "../database/connection";
import { productsTable } from "../database/schema/products";
import { registryTable } from "../database/schema/registry";
import { and, eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import { apikey } from "../database/schema/auth-schema";
import { inventoryTable } from "../database/schema/inventory";

const install = new Hono();

install.get("/:slug", async (c) => {
  const { slug } = c.req.param();
  const { key } = c.req.query();

  if (!key) {
    return c.json({ error: "Key is required" }, 400);
  }

  if (!key.startsWith("shopcn_")) {
    return c.json({ error: "Invalid key" }, 401);
  }

  // Find the product by slug
  const product = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.slug, slug))
    .limit(1);

  if (!product.length || !product[0].isPublished) {
    return c.json({ error: "Component not found" }, 404);
  }

  const productData = product[0];

  let session;
  try {
    session = await auth.api.getSession({
      headers: new Headers({
        "x-api-key": key,
      }),
    });
  } catch (error) {
    return c.json({ error: "Invalid key" }, 401);
  }

  if (!session?.user?.id) {
    return c.json({ error: "Invalid key" }, 401);
  }

  // const keyVerify = await auth.api.verifyApiKey({
  //   body: {
  //     key,
  //   },
  // });

  // if (!keyVerify.valid) {
  //   return c.json({ error: "Invalid key" }, 401);
  // }

  const purchaseCheck = await db
    .select()
    .from(inventoryTable)
    .where(
      and(
        eq(inventoryTable.productId, productData.id),
        eq(inventoryTable.ownedBy, session.user.id),
        eq(inventoryTable.paymentCompleted, true)
      )
    );

  if (purchaseCheck.length === 0) {
    return c.json(
      {
        error: "You have not purchased this component.",
      },
      403
    );
  }

  // Get the registry JSON for this product
  const registryRecord = await db
    .select()
    .from(registryTable)
    .where(eq(registryTable.productId, productData.id))
    .limit(1);

  if (!registryRecord.length) {
    return c.json({ error: "Component registry data not found" }, 404);
  }

  // Return the actual registry JSON data
  return c.json(registryRecord[0].registryJson as any);
});

export { install };
