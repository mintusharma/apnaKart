import supabase from "../../../config/supabase/supabase";

export const getCategories =
  async () => {

    const { data, error } =
      await supabase
        .from("products")
        .select(`
          category
        `)
        .eq("is_active", true);

    if (error) {
      throw new Error(
        error.message
      );
    }

    // GROUP CATEGORY COUNTS
    const categoryMap:
      Record<
        string,
        number
      > = {};

    data.forEach(
      (item: any) => {

        if (
          categoryMap[
            item.category
          ]
        ) {

          categoryMap[
            item.category
          ] += 1;

        } else {

          categoryMap[
            item.category
          ] = 1;
        }
      }
    );

    // CONVERT TO ARRAY
    const categories =
      Object.entries(
        categoryMap
      ).map(
        ([name, total]) => ({
          name,
          total_products:
            total,
        })
      );

    return categories;
};