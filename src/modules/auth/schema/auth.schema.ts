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