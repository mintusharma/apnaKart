import { z } from "zod";

export const createProductSchema =
  z.object({
    title: z.string().min(3),

    description: z.string(),

    price: z.number(),

    image: z.string().url(),

    stock: z.number(),

    category: z.string(),
  });

export type CreateProductInput =
  z.infer<
    typeof createProductSchema
  >;