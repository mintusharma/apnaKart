import { FastifyInstance }
from "fastify";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

import {
  adminMiddleware,
} from "../../../common/middlewares/admin.middleware";

import {
  createNotificationController,
  getNotificationsController,
  markAsReadController,
  markAllAsReadController,
  deleteNotificationController,
} from "../controller/notification.controller";

export default async function notificationRoutes(
  fastify: FastifyInstance
) {

  // ADMIN CREATE
  fastify.post(
    "/",
    {
      preHandler: [
        authMiddleware,
        adminMiddleware,
      ],
    },
    createNotificationController
  );

  // USER LIST
  fastify.get(
    "/",
    {
      preHandler: [authMiddleware],
    },
    getNotificationsController
  );

  // MARK READ
  fastify.put(
    "/:id/read",
    {
      preHandler: [authMiddleware],
    },
    markAsReadController
  );

  // MARK ALL READ
  fastify.put(
    "/read/all",
    {
      preHandler: [authMiddleware],
    },
    markAllAsReadController
  );

  // DELETE
  fastify.delete(
    "/:id",
    {
      preHandler: [authMiddleware],
    },
    deleteNotificationController
  );
}