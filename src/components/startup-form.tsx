"use client";

import z from "zod";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createStartup } from "@/lib/action";
import { submitFormSchema } from "@/lib/validation";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

type FormValues = z.infer<typeof submitFormSchema>;

const StartupForm = () => {
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(submitFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      content: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsPending(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("content", data.content);

      const imageFile = data.image?.[0];
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const result = await createStartup({}, formData, data.content);

      if (result?.status === "ERROR") {
        toast.error(result.error || "Something went wrong");
        return;
      }

      toast.success("Startup published successfully 🚀");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-10 py-10"
    >
      {/* TITLE */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          {...register("title")}
          placeholder="e.g. How I built an AI SaaS in 30 days"
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Short Description</label>
        <Textarea
          {...register("description")}
          placeholder="Brief summary of your startup story..."
          className="min-h-[100px]"
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* CATEGORY + IMAGE */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Input {...register("category")} placeholder="AI, SaaS, Fintech..." />
          {errors.category && (
            <p className="text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image</label>
          <Input type="file" accept="image/*" {...register("image")} />
          {errors.image && (
            <p className="text-xs text-red-500">
              {errors.image.message as string}
            </p>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Full Story</label>
          <p className="text-xs text-muted-foreground">
            Write your journey, challenges, and learnings.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={(value) => field.onChange(value || "")}
                preview="edit"
                height={400}
                data-color-mode="light"
              />
            )}
          />
        </div>

        {errors.content && (
          <p className="text-xs text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* SUBMIT */}
      <div className="flex items-center justify-end pt-4">
        <Button type="submit" disabled={isPending} className="px-6">
          {isPending ? "Publishing..." : "Publish Story"}
        </Button>
      </div>
    </form>
  );
};

export default StartupForm;
