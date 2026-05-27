import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  wishlistSchema,
} from "../schema/wishlist.schema";

import {
  toggleWishlist,
  getWishlist,
} from "../service/wishlist.service";

import {
  successResponse,
} from "../../../common/utils/api-response";

export const toggleWishlistController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const body =
      wishlistSchema.parse(
        request.body
      );

    const wishlist =
      await toggleWishlist(
        request.user.id,
        body.product_id
      );

    return reply.send(
      successResponse(
        "Wishlist updated",
        wishlist
      )
    );
};

export const getWishlistController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const wishlist =
      await getWishlist(
        request.user.id
      );

    return reply.send(
      successResponse(
        "Wishlist fetched",
        wishlist
      )
    );
};