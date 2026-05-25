import { z } from "zod";

export const createAddressSchema =
  z.object({
    full_name: z.string(),

    phone: z.string(),

    address_line: z.string(),

    city: z.string(),

    state: z.string(),

    postal_code: z.string(),

    country: z.string(),

    is_default: z.boolean().optional(),
  });

export type CreateAddressInput =
  z.infer<
    typeof createAddressSchema
  >;