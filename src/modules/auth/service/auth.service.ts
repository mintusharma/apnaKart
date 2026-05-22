import bcrypt from "bcrypt";

import supabase from "../../../config/supabase/supabase";

import { SignupInput } from "../schema/auth.schema";
import { LoginInput } from "../schema/auth.schema";
import { UpdateProfileInput } from "../schema/auth.schema";


export const signupUser = async (
  payload: SignupInput
) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    10
  );

  const { data, error } = await supabase
    .from("users")
    .insert({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const loginUser = async (
  payload: LoginInput
) => {
  const { data: user, error } =
    await supabase
      .from("users")
      .select("*")
      .eq("email", payload.email)
      .single();

  if (error || !user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid =
    await bcrypt.compare(
      payload.password,
      user.password
    );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  return user;
};

export const getCurrentUser =
  async (userId: string) => {

    const { data, error } =
      await supabase
        .from("users")
        .select(`
          id,
          name,
          email,
          phone,
          avatar,
          address,
          created_at
        `)
        .eq("id", userId)
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
};

export const updateProfile =
  async (
    userId: string,
    payload: UpdateProfileInput
  ) => {

    const { data, error } =
      await supabase
        .from("users")
        .update(payload)
        .eq("id", userId)
        .select(`
          id,
          name,
          email,
          phone,
          avatar,
          address
        `)
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
};