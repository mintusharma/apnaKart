import { z } from "zod";

export const createNotificationSchema =
  z.object({

    user_id:
      z.string().uuid(),

    title:
      z.string(),

    message:
      z.string(),

    type:
      z.string().optional(),
  });

export type CreateNotificationInput =
  z.infer<
    typeof createNotificationSchema
  >;