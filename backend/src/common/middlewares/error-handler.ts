import { FastifyReply, FastifyRequest } from "fastify";

const errorHandler = (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  request.log.error(error);

  return reply.status(500).send({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

export default errorHandler;