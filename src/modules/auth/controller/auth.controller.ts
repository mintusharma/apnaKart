import { FastifyReply, FastifyRequest } from "fastify";

import {
  signupSchema,
} from "../schema/auth.schema";

import { signupUser } from "../service/auth.service";

import {
  successResponse,
} from "../../../common/utils/api-response";

import { loginSchema } from "../schema/auth.schema";

import { loginUser } from "../service/auth.service";


export const signupController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const body = signupSchema.parse(request.body);

  const user = await signupUser(body);

  return reply.send(
    successResponse(
      "User created successfully",
      user
    )
  );
};


export const loginController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const body = loginSchema.parse(
    request.body
  );

  const user = await loginUser(body);

  const token = await reply.jwtSign({
    id: user.id,
    email: user.email,
  });

  return reply.send(
    successResponse(
      "Login successful",
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      }
    )
  );
};

export const currentUserController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    return reply.send(
      successResponse(
        "Current user fetched",
        request.user
      )
    );
  };