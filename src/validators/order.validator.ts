import { z } from "zod";

export const createOrderSchmea = z.object({
  products: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Order must contain at least one Product."),
});
