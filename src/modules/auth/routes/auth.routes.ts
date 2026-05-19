import { FastifyInstance } from "fastify";

import {
  signupController,
  loginController,
  currentUserController,
} from "../controller/auth.controller";

import {
  authMiddleware,
} from "../../../common/middlewares/auth.middleware";


export default async function authRoutes(
  fastify: FastifyInstance
) {
  fastify.post(
    "/signup",
    signupController
  );

  fastify.post(
    "/login",
    loginController
  );

  fastify.get(
    "/me",
    {
      preHandler: [authMiddleware],
    },
    currentUserController
  );
}