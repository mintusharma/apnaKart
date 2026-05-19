import { FastifyInstance } from "fastify";

import {
  createProductController,
  getProductsController,
} from "../controller/product.controller";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

export default async function productRoutes(
  fastify: FastifyInstance
) {
  fastify.post(
    "/",
    {
      preHandler: [authMiddleware],
    },
    createProductController
  );

  fastify.get(
    "/",
    getProductsController
  );
}