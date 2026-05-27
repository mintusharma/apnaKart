import supabase from "../../../config/supabase/supabase";

export const addProductImages =
  async (
    productId: string,
    images: {
      image_url: string;
      is_primary?: boolean;
    }[]
  ) => {

    const payload =
      images.map((image) => ({
        product_id: productId,

        image_url:
          image.image_url,

        is_primary:
          image.is_primary ||
          false,
      }));

    const { data, error } =
      await supabase
        .from("product_images")
        .insert(payload)
        .select();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
};

export const getProductImages =
  async (
    productId: string
  ) => {

    const { data, error } =
      await supabase
        .from("product_images")
        .select("*")
        .eq(
          "product_id",
          productId
        )
        .order("created_at", {
          ascending: true,
        });

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
};

export const deleteProductImage =
  async (
    imageId: string
  ) => {

    const { error } =
      await supabase
        .from("product_images")
        .delete()
        .eq("id", imageId);

    if (error) {
      throw new Error(
        error.message
      );
    }

    return true;
};