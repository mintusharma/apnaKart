import supabase
from "../../../config/supabase/supabase";

import {
  CreateNotificationInput,
} from "../schema/notification.schema";

export const createNotification =
  async (
    payload:
      CreateNotificationInput
  ) => {

    const { data, error } =
      await supabase
        .from("notifications")
        .insert({
          user_id:
            payload.user_id,

          title:
            payload.title,

          message:
            payload.message,

          type:
            payload.type ||
            "general",
        })
        .select()
        .single();

    if (error) {

      throw new Error(
        error.message
      );
    }

    return data;
};

export const getNotifications =
  async (
    userId: string
  ) => {

    const { data, error } =
      await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {

      throw new Error(
        error.message
      );
    }

    return data;
};

export const markAsRead =
  async (
    notificationId: string
  ) => {

    const { data, error } =
      await supabase
        .from("notifications")
        .update({
          is_read: true,
        })
        .eq("id", notificationId)
        .select()
        .single();

    if (error) {

      throw new Error(
        error.message
      );
    }

    return data;
};

export const markAllAsRead =
  async (
    userId: string
  ) => {

    const { error } =
      await supabase
        .from("notifications")
        .update({
          is_read: true,
        })
        .eq("user_id", userId);

    if (error) {

      throw new Error(
        error.message
      );
    }

    return true;
};

export const deleteNotification =
  async (
    notificationId: string
  ) => {

    const { error } =
      await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId);

    if (error) {

      throw new Error(
        error.message
      );
    }

    return true;
};