import supabase from "../../../config/supabase/supabase";

import {
  CreateOrderInput,
} from "../schema/order.schema";

import razorpay from "../../../config/razorpay";

export const placeOrder =
  async (
    userId: string,
    payload: CreateOrderInput
  ) => {

    const {
      data: cartItems,
      error: cartError,
    } = await supabase
      .from("cart_items")
      .select(`
        id,
        quantity,
        products (
          id,
          title,
          price,
          stock
        )
      `)
      .eq("user_id", userId);

    if (cartError) {
      throw new Error(
        cartError.message
      );
    }

    if (!cartItems.length) {
      throw new Error(
        "Cart is empty"
      );
    }

    let totalAmount = 0;

    cartItems.forEach(
      (item: any) => {

        totalAmount +=
          item.products.price *
          item.quantity;
      }
    );

    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        address_id:
          payload.address_id,
        total_amount:
          totalAmount,
        payment_method:
          payload.payment_method,
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(
        orderError.message
      );
    }

    const orderItems =
      cartItems.map(
        (item: any) => ({
          order_id: order.id,
          product_id:
            item.products.id,
          quantity:
            item.quantity,
          price:
            item.products.price,
        })
      );

    const {
      error: orderItemsError,
    } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) {
      throw new Error(
        orderItemsError.message
      );
    }

    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId);

    return order;
};

export const createCheckout =
  async (
    userId: string,
    payload: CreateOrderInput
  ) => {

    // Get cart items
    const {
      data: cartItems,
      error: cartError,
    } = await supabase
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

    if (cartError) {
      throw new Error(
        cartError.message
      );
    }

    if (!cartItems?.length) {
      throw new Error(
        "Cart is empty"
      );
    }

    // Calculate total
    let totalAmount = 0;

    cartItems.forEach(
      (item: any) => {

        totalAmount +=
          item.products.price *
          item.quantity;
      }
    );

    // =========================
    // COD FLOW
    // =========================

    if (
      payload.payment_method ===
      "cod"
    ) {

      // Create order
      const {
        data: createdOrder,
        error: orderError,
      } = await supabase
        .from("orders")
        .insert({
          user_id: userId,

          address_id:
            payload.address_id,

          total_amount:
            totalAmount,

          payment_method: "cod",

          payment_status:
            "pending",

          order_status:
            "placed",
        })
        .select()
        .single();

      if (orderError) {
        throw new Error(
          orderError.message
        );
      }

      // Create order items
      const orderItems =
        cartItems.map(
          (item: any) => ({
            order_id:
              createdOrder.id,

            product_id:
              item.products.id,

            quantity:
              item.quantity,

            price:
              item.products.price,
          })
        );

      const {
        error: orderItemsError,
      } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (orderItemsError) {
        throw new Error(
          orderItemsError.message
        );
      }

      // Clear cart
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

      return {
        checkout_order:
          createdOrder,
      };
    }

    // =========================
    // ONLINE PAYMENT FLOW
    // =========================

    // Create Razorpay order
    const razorpayOrder =
      await razorpay.orders.create({
        amount:
          totalAmount * 100,

        currency: "INR",

        receipt:
          `receipt_${Date.now()}`,
      });

    // Create pending order
    const {
      data: createdOrder,
      error: orderError,
    } = await supabase
      .from("orders")
      .insert({
        user_id: userId,

        address_id:
          payload.address_id,

        total_amount:
          totalAmount,

        payment_method:
          payload.payment_method,

        payment_status:
          "payment_pending",

        order_status:
          "payment_pending",

        razorpay_order_id:
          razorpayOrder.id,
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(
        orderError.message
      );
    }

    return {
      checkout_order:
        createdOrder,

      razorpay_order:
        razorpayOrder,
    };
};

export const verifyPayment =
  async (
    payload: any
  ) => {

    // Generate signature
    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET!
        )
        .update(
          `${payload.razorpay_order_id}|${payload.razorpay_payment_id}`
        )
        .digest("hex");

    // Verify signature
    const isAuthentic =
      generatedSignature ===
      payload.razorpay_signature;

    if (!isAuthentic) {
      throw new Error(
        "Invalid payment signature"
      );
    }

    // Get order
    const {
      data: order,
      error: orderError,
    } = await supabase
      .from("orders")
      .select("*")
      .eq(
        "razorpay_order_id",
        payload.razorpay_order_id
      )
      .single();

    if (orderError || !order) {
      throw new Error(
        "Order not found"
      );
    }

    // Get cart items
    const {
      data: cartItems,
      error: cartError,
    } = await supabase
      .from("cart_items")
      .select(`
        quantity,

        products (
          id,
          title,
          price
        )
      `)
      .eq(
        "user_id",
        order.user_id
      );

    if (cartError) {
      throw new Error(
        cartError.message
      );
    }

    // Create order items
    const orderItems =
      cartItems?.map(
        (item: any) => ({
          order_id: order.id,

          product_id:
            item.products.id,

          quantity:
            item.quantity,

          price:
            item.products.price,
        })
      );

    const {
      error: orderItemsError,
    } = await supabase
      .from("order_items")
      .insert(orderItems || []);

    if (orderItemsError) {
      throw new Error(
        orderItemsError.message
      );
    }

    // Update order
    const {
      data: updatedOrder,
      error: updateError,
    } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",

        order_status:
          "confirmed",

        razorpay_payment_id:
          payload.razorpay_payment_id,

        payment_signature:
          payload.razorpay_signature,
      })
      .eq("id", order.id)
      .select()
      .single();

    if (updateError) {
      throw new Error(
        updateError.message
      );
    }

    // Clear cart
    await supabase
      .from("cart_items")
      .delete()
      .eq(
        "user_id",
        order.user_id
      );

    return updatedOrder;
};

export const getOrders =
  async (userId: string) => {

    const { data, error } =
      await supabase
        .from("orders")
        .select(`
          id,
          total_amount,
          payment_method,
          payment_status,
          order_status,
          created_at,

          addresses (
            full_name,
            phone,
            address_line,
            city,
            state,
            postal_code,
            country
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

export const getSingleOrder =
  async (
    userId: string,
    orderId: string
  ) => {

    const { data, error } =
      await supabase
        .from("orders")
        .select(`
          id,
          total_amount,
          payment_method,
          payment_status,
          order_status,
          created_at,

          addresses (
            full_name,
            phone,
            address_line,
            city,
            state,
            postal_code,
            country
          ),

          order_items (
            id,
            quantity,
            price,

            products (
              id,
              title,
              image,
              price
            )
          )
        `)
        .eq("id", orderId)
        .eq("user_id", userId)
        .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
};

export const updateOrderStatus =
  async (
    orderId: string,
    status: string
  ) => {

    const { data, error } =
      await supabase
        .from("orders")
        .update({
          order_status: status,
        })
        .eq("id", orderId)
        .select()
        .single();

    if (error) {
      throw new Error(
        error.message
      );
    }

    return data;
};