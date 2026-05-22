import supabase from "../../config/supabase/supabase";

import { randomUUID } from "crypto";

export const uploadFile =
  async (
    file: Buffer,
    bucket: string,
    mimeType: string
  ) => {

    const fileName =
      `${randomUUID()}.jpg`;

    const { error } =
      await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          contentType: mimeType,
        });

    if (error) {
      throw new Error(error.message);
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
};