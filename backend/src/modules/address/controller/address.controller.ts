import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  createAddressSchema,
} from "../schema/address.schema";

import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../service/address.service";

import {
  successResponse,
} from "../../../common/utils/api-response";

export const createAddressController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const body =
      createAddressSchema.parse(
        request.body
      );

    const address =
      await createAddress(
        request.user.id,
        body
      );

    return reply.send(
      successResponse(
        "Address added",
        address
      )
    );
};

export const getAddressesController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const addresses =
      await getAddresses(
        request.user.id
      );

    return reply.send(
      successResponse(
        "Addresses fetched",
        addresses
      )
    );
};

export const updateAddressController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        id: string;
      };

    const body =
      createAddressSchema.parse(
        request.body
      );

    const updated =
      await updateAddress(
        params.id,
        request.user.id,
        body
      );

    return reply.send(
      successResponse(
        "Address updated",
        updated
      )
    );
};

export const deleteAddressController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const params =
      request.params as {
        id: string;
      };

    await deleteAddress(
      params.id
    );

    return reply.send(
      successResponse(
        "Address deleted"
      )
    );
};