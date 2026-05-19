import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};