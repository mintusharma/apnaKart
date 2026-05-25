import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),

  SUPABASE_URL: z.string().url(),

  SUPABASE_ANON_KEY: z.string(),

  SUPABASE_SERVICE_ROLE_KEY: z.string(),

  JWT_SECRET: z.string(),

  RAZORPAY_KEY_ID: z.string(),

  RAZORPAY_KEY_SECRET: z.string(),

});

const env = envSchema.parse(process.env);

export default env;