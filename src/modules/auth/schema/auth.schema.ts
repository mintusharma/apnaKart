import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3),

  email: z.string().email(),

  password: z.string().min(6),
});

export type SignupInput = z.infer<
  typeof signupSchema
>;

export const loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(6),
});

export type LoginInput = z.infer<
  typeof loginSchema
>;

export const updateProfileSchema =
  z.object({
    name: z.string().min(3).optional(),

    phone: z.string().optional(),

    avatar: z.string().optional(),

    address: z.string().optional(),
  });

export type UpdateProfileInput =
  z.infer<
    typeof updateProfileSchema
  >;