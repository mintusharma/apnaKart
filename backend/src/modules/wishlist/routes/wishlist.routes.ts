import { FastifyInstance } from "fastify";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

import {
  toggleWishlistController,
  getWishlistController,
} from "../controller/wishlist.controller";

export default async function wishlistRoutes(
  fastify: FastifyInstance
) {

  fastify.post(
    "/toggle",
    {
      preHandler: [authMiddleware],
    },
    toggleWishlistController
  );

  fastify.get(
    "/",
    {
      preHandler: [authMiddleware],
    },
    getWishlistController
  );
}