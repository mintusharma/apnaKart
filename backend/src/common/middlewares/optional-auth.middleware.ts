import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

export const optionalAuthMiddleware =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    try {

      await request.jwtVerify();

    } catch (error) {
      // IGNORE
    }
};