import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

export const adminMiddleware =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    if (
      request.user.role !==
      "admin"
    ) {

      return reply
        .status(403)
        .send({
          success: false,
          message:
            "Admin access required",
        });
    }
};