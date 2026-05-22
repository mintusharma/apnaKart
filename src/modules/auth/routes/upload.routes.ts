import { FastifyInstance } from "fastify";

import {
  uploadAvatarController,
} from "../controller/upload.controller";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";

export default async function uploadRoutes(
  fastify: FastifyInstance
) {

  fastify.post(
    "/avatar",
    {
      preHandler: [authMiddleware],
    },
    uploadAvatarController
  );
}