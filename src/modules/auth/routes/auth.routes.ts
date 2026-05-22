import { FastifyInstance } from "fastify";

import {
  signupController,
  loginController,
  currentUserController,
  getProfileController,
  updateProfileController,
  logoutController,
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
  fastify.post(
    "/logout",
    {
      preHandler: [authMiddleware],
    },
    logoutController
  );

  fastify.get(
    "/me",
    {
      preHandler: [authMiddleware],
    },
    currentUserController
  );

  fastify.get(
    "/profile",
    {
      preHandler: [authMiddleware],
    },
    getProfileController
  );

  fastify.put(
    "/profile",
    {
      preHandler: [authMiddleware],
    },
    updateProfileController
  );
}