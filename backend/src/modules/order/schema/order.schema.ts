import { z } from "zod";

export const createOrderSchema =
  z.object({
    address_id: z.string().uuid(),

    payment_method: z.string(),
  });

export type CreateOrderInput =
  z.infer<
    typeof createOrderSchema
  >;

  export const verifyPaymentSchema =
  z.object({
    order_id: z.string(),

    razorpay_order_id:
      z.string(),

    razorpay_payment_id:
      z.string(),

    razorpay_signature:
      z.string(),
  });