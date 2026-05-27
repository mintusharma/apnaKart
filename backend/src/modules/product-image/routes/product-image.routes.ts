import { FastifyInstance } from "fastify";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

import {
  adminMiddleware,
} from "../../../common/middlewares/admin.middleware";

import {
  addProductImagesController,
  getProductImagesController,
  deleteProductImageController,
} from "../controller/product-image.controller";

export default async function productImageRoutes(
  fastify: FastifyInstance
) {

  // ADMIN
  fastify.post(
    "/",
    {
      preHandler: [
        authMiddleware,
        adminMiddleware,
      ],
    },
    addProductImagesController
  );

  // PUBLIC
  fastify.get(
    "/:productId",
    getProductImagesController
  );

  // ADMIN
  fastify.delete(
    "/:id",
    {
      preHandler: [
        authMiddleware,
        adminMiddleware,
      ],
    },
    deleteProductImageController
  );
}