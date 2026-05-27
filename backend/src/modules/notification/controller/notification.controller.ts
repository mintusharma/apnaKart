import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  createNotificationSchema,
} from "../schema/notification.schema";

import {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../service/notification.service";

import {
  successResponse,
} from "../../../common/utils/api-response";

export const createNotificationController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const body =
      createNotificationSchema.parse(
        request.body
      );

    const notification =
      await createNotification(
        body
      );

    return reply.send(
      successResponse(
        "Notification created",
        notification
      )
    );
};

export const getNotificationsController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const notifications =
      await getNotifications(
        request.user.id
      );

    return reply.send(
      successResponse(
        "Notifications fetched",
        notifications
      )
    );
};

export const markAsReadController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        id: string;
      };

    const notification =
      await markAsRead(
        params.id
      );

    return reply.send(
      successResponse(
        "Notification updated",
        notification
      )
    );
};

export const markAllAsReadController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    await markAllAsRead(
      request.user.id
    );

    return reply.send(
      successResponse(
        "All notifications marked as read"
      )
    );
};

export const deleteNotificationController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        id: string;
      };

    await deleteNotification(
      params.id
    );

    return reply.send(
      successResponse(
        "Notification deleted"
      )
    );
};