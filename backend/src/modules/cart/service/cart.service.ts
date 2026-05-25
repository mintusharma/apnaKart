import supabase from "../../../config/supabase/supabase";

import {
  AddToCartInput,
} from "../schema/cart.schema";

export const addToCart =
  async (
    userId: string,
    payload: AddToCartInput
  ) => {

    const {
      data: existingItem,
    } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .eq(
        "product_id",
        payload.product_id
      )
      .single();

    if (existingItem) {

      const updatedQuantity =
        existingItem.quantity +
        payload.quantity;

      const { data, error } =
        await supabase
          .from("cart_items")
          .update({
            quantity:
              updatedQuantity,
          })
          .eq(
            "id",
            existingItem.id
          )
          .select()
          .single();

      if (error) {
        throw new Error(
          error.message
        );
      }

      return data;
    }

    const { data, error } =
      await supabase
        .from("cart_items")
        .insert({
          user_id: userId,
          product_id:
            payload.product_id,
          quantity:
            payload.quantity,
        })
        .select()
        .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
};

export const getCartItems =
  async (userId: string) => {

    const { data, error } =
      await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          products (
            id,
            title,
            price,
            image,
            stock
          )
        `)
        .eq("user_id", userId);

    if (error) {
      throw new Error(
        error.message
      );
    }

    let totalPrice = 0;

    data.forEach((item: any) => {

      totalPrice +=
        item.products.price *
        item.quantity;
    });

    return {
      items: data,
      totalPrice,
    };
};

export const updateCartItem =
  async (
    cartId: string,
    quantity: number
  ) => {

    const { data, error } =
      await supabase
        .from("cart_items")
        .update({
          quantity,
        })
        .eq("id", cartId)
        .select()
        .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
};

export const removeCartItem =
  async (cartId: string) => {

    const { error } =
      await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartId);

    if (error) {
      throw new Error(
        error.message
      );
    }

    return true;
};

export const clearCart =
  async (userId: string) => {

    const { error } =
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

    if (error) {
      throw new Error(
        error.message
      );
    }

    return true;
};