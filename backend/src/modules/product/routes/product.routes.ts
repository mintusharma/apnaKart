import { FastifyInstance } from "fastify";

import {
  createProductController,
  getProductsController,
  updateProductController,
  deleteProductController,
  getSingleProductController,

} from "../controller/product.controller";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

import {
  adminMiddleware,
} from "../../../common/middlewares/admin.middleware";

import {
  optionalAuthMiddleware,
} from "../../../common/middlewares/optional-auth.middleware";


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

  fastify.get(
  "/:slug",
   {
    preHandler: [
      optionalAuthMiddleware,
    ],
  },
  getSingleProductController
);

  
}