import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    imgAlt: z.string().optional(),
    author: z.string().optional(),
    readingTime: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const locationCollection = defineCollection({
  type: "content",
  schema: z.object({
    city: z.string(),
    stateShort: z.string(),
    stateLong: z.string(),
    description: z.string(),
    baseLocation: z.string(),
    keyPlace1: z.string(),
    keyPlace2: z.string(),
  }),
});

export const collections = {
  blog: blog,
  location: locationCollection,
};
