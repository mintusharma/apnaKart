import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  createProductSchema,
} from "../schema/product.schema";

import {
  createProduct,
  getProducts,
} from "../service/product.service";

import {
  successResponse,
} from "../../../common/utils/api-response";

export const createProductController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const body =
      createProductSchema.parse(
        request.body
      );

    const product =
      await createProduct(body);

    return reply.send(
      successResponse(
        "Product created",
        product
      )
    );
  };

export const getProductsController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const query =
      request.query as {
        page?: string;
        limit?: string;
        search?: string;
      };

    const page = Number(
      query.page || 1
    );

    const limit = Number(
      query.limit || 10
    );

    const search =
      query.search || "";

    const products =
      await getProducts(
        page,
        limit,
        search
      );

    return reply.send(
      successResponse(
        "Products fetched",
        products
      )
    );
  };