import { FastifyInstance } from "fastify";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

import {
  addToCartController,
  getCartController,
  updateCartController,
  removeCartController,
  clearCartController,
} from "../controller/cart.controller";

export default async function cartRoutes(
  fastify: FastifyInstance
) {

  fastify.post(
    "/",
    {
      preHandler: [authMiddleware],
    },
    addToCartController
  );

  fastify.get(
    "/",
    {
      preHandler: [authMiddleware],
    },
    getCartController
  );

  fastify.put(
    "/:id",
    {
      preHandler: [authMiddleware],
    },
    updateCartController
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [authMiddleware],
    },
    removeCartController
  );

  fastify.delete(
    "/clear/all",
    {
      preHandler: [authMiddleware],
    },
    clearCartController
  );
}