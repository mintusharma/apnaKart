import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  addProductImages,
  getProductImages,
  deleteProductImage,
} from "../service/product-image.service";

import {
  successResponse,
} from "../../../common/utils/api-response";

export const addProductImagesController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const body =
      request.body as {
        product_id: string;

        images: {
          image_url: string;

          is_primary?: boolean;
        }[];
      };

    const images =
      await addProductImages(
        body.product_id,
        body.images
      );

    return reply.send(
      successResponse(
        "Images added",
        images
      )
    );
};

export const getProductImagesController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        productId: string;
      };

    const images =
      await getProductImages(
        params.productId
      );

    return reply.send(
      successResponse(
        "Images fetched",
        images
      )
    );
};

export const deleteProductImageController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        id: string;
      };

    await deleteProductImage(
      params.id
    );

    return reply.send(
      successResponse(
        "Image deleted"
      )
    );
};