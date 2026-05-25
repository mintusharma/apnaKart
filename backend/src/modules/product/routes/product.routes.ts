import { FastifyInstance } from "fastify";

import {
  createProductController,
  getProductsController,
  updateProductController,
  deleteProductController,
} from "../controller/product.controller";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

import {
  adminMiddleware,
} from "../../../common/middlewares/admin.middleware";

export default async function productRoutes(
  fastify: FastifyInstance
) {
  fastify.post(
    "/",
    {
      preHandler: [
        authMiddleware,
        adminMiddleware,
      ]
    },
    createProductController
  );

  fastify.get(
    "/",
    getProductsController
  );

  fastify.put(
    "/:id",
    {
      preHandler: [
        authMiddleware,
        adminMiddleware,
      ],
    },
    updateProductController
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [
        authMiddleware,
        adminMiddleware,
      ],
    },
    deleteProductController
  );
}