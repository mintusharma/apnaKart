import { FastifyInstance } from "fastify";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

import {
  adminMiddleware,
} from "../../../common/middlewares/admin.middleware";

import {
  placeOrderController,
  updateOrderStatusController,
} from "../controller/order.controller";

import {
  createCheckoutController,
  verifyPaymentController,
  getOrdersController,
  getSingleOrderController,
} from "../controller/order.controller";


export default async function orderRoutes(
  fastify: FastifyInstance
) {

  fastify.post(
    "/",
    {
      preHandler: [authMiddleware],
    },
    placeOrderController
  );

  fastify.post(
    "/checkout",
    {
      preHandler: [authMiddleware],
    },
    createCheckoutController
  );

  fastify.post(
    "/verify-payment",
    {
      preHandler: [authMiddleware],
    },
    verifyPaymentController
  );

  fastify.get(
    "/",
    {
      preHandler: [authMiddleware],
    },
    getOrdersController
  );

  fastify.get(
    "/:id",
    {
      preHandler: [authMiddleware],
    },
    getSingleOrderController
  );

  fastify.put(
  "/:id/status",
  {
    preHandler: [
      authMiddleware,
      adminMiddleware,
    ],
  },
  updateOrderStatusController
);
}