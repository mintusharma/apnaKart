import supabase from "../../../config/supabase/supabase";

import { slugify } from "../../../common/helpers/slugify";

import {
  CreateProductInput,
} from "../schema/product.schema";

export const createProduct =
  async (
    payload: CreateProductInput
  ) => {
    const slug = slugify(
      payload.title
    );

    const { data, error } =
      await supabase
        .from("products")
        .insert({
          ...payload,
          slug,
        })
        .select()
        .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

export const getProducts =
  async (
    query: any
  ) => {

    const page =
      Number(query.page) || 1;

    const limit =
      Number(query.limit) || 10;

    const from =
      (page - 1) * limit;

    const to =
      from + limit - 1;

    let supabaseQuery =
      supabase
        .from("products")
        .select("*", {
          count: "exact",
        })
        .eq("is_active", true);

    // SEARCH
    if (query.search) {

      supabaseQuery =
        supabaseQuery.ilike(
          "title",
          `%${query.search}%`
        );
    }

    // CATEGORY
    if (query.category) {

      supabaseQuery =
        supabaseQuery.eq(
          "category",
          query.category
        );
    }

    // MIN PRICE
    if (query.minPrice) {

      supabaseQuery =
        supabaseQuery.gte(
          "price",
          Number(
            query.minPrice
          )
        );
    }

    // MAX PRICE
    if (query.maxPrice) {

      supabaseQuery =
        supabaseQuery.lte(
          "price",
          Number(
            query.maxPrice
          )
        );
    }

    // IN STOCK
    if (
      query.inStock === "true"
    ) {

      supabaseQuery =
        supabaseQuery.gt(
          "stock",
          0
        );
    }

    // SORTING
    switch (query.sort) {

      case "low_to_high":

        supabaseQuery =
          supabaseQuery.order(
            "price",
            {
              ascending: true,
            }
          );

        break;

      case "high_to_low":

        supabaseQuery =
          supabaseQuery.order(
            "price",
            {
              ascending: false,
            }
          );

        break;

      case "newest":

        supabaseQuery =
          supabaseQuery.order(
            "created_at",
            {
              ascending: false,
            }
          );

        break;

      default:

        supabaseQuery =
          supabaseQuery.order(
            "created_at",
            {
              ascending: false,
            }
          );
    }

    // PAGINATION
    const {
      data,
      error,
      count,
    } = await supabaseQuery.range(
      from,
      to
    );

    if (error) {
      throw new Error(
        error.message
      );
    }

    return {
      products: data,

      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages:
          Math.ceil(
            (count || 0) / limit
          ),
      },
    };
};

  export const updateProduct =
  async (
    productId: string,
    payload: any
  ) => {

    const { data, error } =
      await supabase
        .from("products")
        .update(payload)
        .eq("id", productId)
        .select()
        .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
};

export const deleteProduct =
  async (
    productId: string
  ) => {

    const { error } =
      await supabase
        .from("products")
        .delete()
        .eq("id", productId);

    if (error) {
      throw new Error(
        error.message
      );
    }

    return true;
};

export const getSingleProduct =
  async (
    slug: string,
    userId?: string
  ) => {

    // PRODUCT
    const {
      data: product,
      error,
    } = await supabase
      .from("products")
      .select(`
        id,
        title,
        slug,
        description,
        price,
        image,
        stock,
        category,
        is_active,
        created_at
      `)
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !product) {

      throw new Error(
        "Product not found"
      );
    }

    // PRODUCT IMAGES
    const {
      data: images,
    } = await supabase
      .from("product_images")
      .select(`
        id,
        image_url,
        is_primary
      `)
      .eq(
        "product_id",
        product.id
      );

    // REVIEWS
    const {
      data: reviews,
    } = await supabase
      .from("product_reviews")
      .select(`
        id,
        rating,
        review,
        created_at,

        users (
          id,
          name,
          avatar
        )
      `)
      .eq(
        "product_id",
        product.id
      )
      .order("created_at", {
        ascending: false,
      });

    // AVERAGE RATING
    const totalReviews =
      reviews?.length || 0;

    const averageRating =
      totalReviews > 0
        ? (
            reviews!.reduce(
              (
                sum: number,
                item: any
              ) =>
                sum +
                item.rating,
              0
            ) / totalReviews
          ).toFixed(1)
        : 0;

    // WISHLIST STATUS
    let isWishlisted =
      false;

    if (userId) {

      const {
        data: wishlistItem,
      } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", userId)
        .eq(
          "product_id",
          product.id
        )
        .maybeSingle();

      isWishlisted =
        !!wishlistItem;
    }

    // RELATED PRODUCTS
    const {
      data: relatedProducts,
    } = await supabase
      .from("products")
      .select(`
        id,
        title,
        slug,
        image,
        price
      `)
      .eq(
        "category",
        product.category
      )
      .neq("id", product.id)
      .limit(6);

    return {

      ...product,

      images:
        images || [],

      average_rating:
        averageRating,

      total_reviews:
        totalReviews,

      reviews:
        reviews || [],

      is_wishlisted:
        isWishlisted,

      related_products:
        relatedProducts || [],
    };
};