import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  createOrderSchema,
} from "../schema/order.schema";

import {
  placeOrder,
} from "../service/order.service";

import {
  successResponse,
} from "../../../common/utils/api-response";

import {
  getOrders,  getSingleOrder,
} from "../service/order.service";

import {
  verifyPaymentSchema,
} from "../schema/order.schema";

import {
  createCheckout,
  verifyPayment,
} from "../service/order.service";

import {
  updateOrderStatus,
} from "../service/order.service";

export const placeOrderController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const body =
      createOrderSchema.parse(
        request.body
      );

    const order =
      await placeOrder(
        request.user.id,
        body
      );

    return reply.send(
      successResponse(
        "Order placed successfully",
        order
      )
    );
};

export const createCheckoutController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const body =
      createOrderSchema.parse(
        request.body
      );

    const checkout =
      await createCheckout(
        request.user.id,
        body
      );

    return reply.send(
      successResponse(
        "Checkout created",
        checkout
      )
    );
};

export const verifyPaymentController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const body =
      verifyPaymentSchema.parse(
        request.body
      );

    const verified =
      await verifyPayment(body);

    return reply.send(
      successResponse(
        "Payment verified",
        verified
      )
    );
};

export const getOrdersController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const orders =
      await getOrders(
        request.user.id
      );

    return reply.send(
      successResponse(
        "Orders fetched",
        orders
      )
    );
};

export const getSingleOrderController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        id: string;
      };

    const order =
      await getSingleOrder(
        request.user.id,
        params.id
      );

    return reply.send(
      successResponse(
        "Order fetched",
        order
      )
    );
};


export const updateOrderStatusController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        id: string;
      };

    const body =
      request.body as {
        status: string;
      };

    const updated =
      await updateOrderStatus(
        params.id,
        body.status
      );

    return reply.send(
      successResponse(
        "Order updated",
        updated
      )
    );
};
