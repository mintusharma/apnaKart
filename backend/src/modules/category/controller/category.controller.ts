import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  getCategories,
} from "../service/category.service";

import {
  successResponse,
} from "../../../common/utils/api-response";

export const getCategoriesController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const categories =
      await getCategories();

    return reply.send(
      successResponse(
        "Categories fetched",
        categories
      )
    );
};