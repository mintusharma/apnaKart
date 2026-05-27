import supabase from "../../../config/supabase/supabase";

export const toggleWishlist =
  async (
    userId: string,
    productId: string
  ) => {

    const {
      data: existing,
    } = await supabase
      .from("wishlists")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    // REMOVE
    if (existing) {

      await supabase
        .from("wishlists")
        .delete()
        .eq("id", existing.id);

      return {
        wishlisted: false,
      };
    }

    // ADD
    const { data, error } =
      await supabase
        .from("wishlists")
        .insert({
          user_id: userId,
          product_id: productId,
        })
        .select()
        .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return {
      wishlisted: true,
      item: data,
    };
};

export const getWishlist =
  async (userId: string) => {

    const { data, error } =
      await supabase
        .from("wishlists")
        .select(`
          id,
          created_at,

          products (
            id,
            title,
            slug,
            image,
            price,
            stock
          )
        `)
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
};