import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import {
  uploadFile,
} from "../../../common/utils/upload-file";

import {
  successResponse,
} from "../../../common/utils/api-response";

export const uploadAvatarController =
  async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const data =
      await request.file();

    if (!data) {
      throw new Error(
        "File required"
      );
    }

    const buffer =
      await data.toBuffer();

    const imageUrl =
      await uploadFile(
        buffer,
        "avatars",
        data.mimetype
      );

    return reply.send(
      successResponse(
        "Avatar uploaded",
        {
          imageUrl,
        }
      )
    );
};