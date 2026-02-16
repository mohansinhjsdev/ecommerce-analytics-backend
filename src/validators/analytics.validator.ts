import { z } from "zod";

export const monthlyRevenueQuerySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});
