"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { parseSeverActionResponse } from "./utils";

export const createStartup = async (
  state: any,
  form: FormData,
  content: string,
) => {
  const session = await auth();

  if (!session) {
    return parseSeverActionResponse({
      status: "ERROR",
      error: "Not signed in",
    });
  }

  try {
    const title = form.get("title") as string;
    const description = form.get("description") as string;
    const category = form.get("category") as string;

    // ✅ FIX: File (NOT FileList)
    const imageFile = form.get("image") as File;

    let imageAsset = null;

    if (imageFile && imageFile.size > 0) {
      imageAsset = await writeClient.assets.upload("image", imageFile, {
        filename: imageFile.name,
      });
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const startup = await writeClient.create({
      _type: "startup",
      title,
      description,
      category,
      content,

      slug: {
        _type: "slug",
        current: slug,
      },

      author: {
        _type: "reference",
        _ref: session.id,
      },

      views: 0,

      image: imageAsset
        ? {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          }
        : undefined,
    });

    return parseSeverActionResponse({
      status: "SUCCESS",
      error: "",
      data: startup,
    });
  } catch (error) {
    console.error(error);

    return parseSeverActionResponse({
      status: "ERROR",
      error: "Something went wrong",
    });
  }
};
