import { FastifyInstance } from "fastify";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

import {
  createAddressController,
  getAddressesController,
  updateAddressController,
  deleteAddressController,
} from "../controller/address.controller";

export default async function addressRoutes(
  fastify: FastifyInstance
) {

  fastify.post(
    "/",
    {
      preHandler: [authMiddleware],
    },
    createAddressController
  );

  fastify.get(
    "/",
    {
      preHandler: [authMiddleware],
    },
    getAddressesController
  );

  fastify.put(
    "/:id",
    {
      preHandler: [authMiddleware],
    },
    updateAddressController
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [authMiddleware],
    },
    deleteAddressController
  );
}