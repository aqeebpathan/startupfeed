import { z } from "zod";

export const submitFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),

  category: z
    .string()
    .min(2, "Category is required")
    .max(20, "Category must be less than 20 characters"),

  content: z
    .string()
    .min(10, "Content is required")
    .max(4000, "Content must be less than 4000 characters"),

  image: z
    .any()
    .refine((files) => files && files.length > 0, {
      message: "Image is required",
    })
    .refine((files) => files?.[0] instanceof File, {
      message: "Invalid file",
    })
    .refine((files) => files?.[0]?.type?.startsWith("image/"), {
      message: "Only image files allowed",
    })
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    }),
});
