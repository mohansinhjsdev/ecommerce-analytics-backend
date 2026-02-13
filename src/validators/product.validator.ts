import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 charachters"),
  category: z.string().min(2, "Category is required"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  category: z.string().min(2).optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
});
