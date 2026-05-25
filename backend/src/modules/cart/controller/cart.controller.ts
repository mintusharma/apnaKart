import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  addToCartSchema,
  updateCartSchema,
} from "../schema/cart.schema";

import {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../service/cart.service";

import {
  successResponse,
} from "../../../common/utils/api-response";

export const addToCartController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const body =
      addToCartSchema.parse(
        request.body
      );

    const cart =
      await addToCart(
        request.user.id,
        body
      );

    return reply.send(
      successResponse(
        "Added to cart",
        cart
      )
    );
};

export const getCartController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const cart =
      await getCartItems(
        request.user.id
      );

    return reply.send(
      successResponse(
        "Cart fetched",
        cart
      )
    );
};

export const updateCartController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        id: string;
      };

    const body =
      updateCartSchema.parse(
        request.body
      );

    const updated =
      await updateCartItem(
        params.id,
        body.quantity
      );

    return reply.send(
      successResponse(
        "Cart updated",
        updated
      )
    );
};

export const removeCartController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        id: string;
      };

    await removeCartItem(
      params.id
    );

    return reply.send(
      successResponse(
        "Cart item removed"
      )
    );
};

export const clearCartController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    await clearCart(
      request.user.id
    );

    return reply.send(
      successResponse(
        "Cart cleared"
      )
    );
};