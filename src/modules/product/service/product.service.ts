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
    page = 1,
    limit = 10,
    search = ""
  ) => {
    const from = (page - 1) * limit;

    const to = from + limit - 1;

    let query = supabase
      .from("products")
      .select("*", {
        count: "exact",
      })
      .eq("is_active", true)
      .range(from, to)
      .order("created_at", {
        ascending: false,
      });

    if (search) {
      query = query.ilike(
        "title",
        `%${search}%`
      );
    }

    const { data, error, count } =
      await query;

    if (error) {
      throw new Error(error.message);
    }

    return {
      products: data,
      pagination: {
        total: count,
        page,
        limit,
      },
    };
  };