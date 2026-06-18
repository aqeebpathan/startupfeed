import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",

  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "views",
      type: "number",
      initialValue: 0,
    }),

    defineField({
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "content",
      type: "text", // or "markdown" if you installed plugin
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "category",
    },
  },
});
