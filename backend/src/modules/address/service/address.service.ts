import supabase from "../../../config/supabase/supabase";

import {
  CreateAddressInput,
} from "../schema/address.schema";

export const createAddress =
  async (
    userId: string,
    payload: CreateAddressInput
  ) => {

    if (payload.is_default) {

      await supabase
        .from("addresses")
        .update({
          is_default: false,
        })
        .eq("user_id", userId);
    }

    const { data, error } =
      await supabase
        .from("addresses")
        .insert({
          user_id: userId,
          ...payload,
        })
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
};

export const getAddresses =
  async (userId: string) => {

    const { data, error } =
      await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw new Error(error.message);
    }

    return data;
};

export const updateAddress =
  async (
    addressId: string,
    userId: string,
    payload: CreateAddressInput
  ) => {

    if (payload.is_default) {

      await supabase
        .from("addresses")
        .update({
          is_default: false,
        })
        .eq("user_id", userId);
    }

    const { data, error } =
      await supabase
        .from("addresses")
        .update(payload)
        .eq("id", addressId)
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
};

export const deleteAddress =
  async (addressId: string) => {

    const { error } =
      await supabase
        .from("addresses")
        .delete()
        .eq("id", addressId);

    if (error) {
      throw new Error(error.message);
    }

    return true;
};