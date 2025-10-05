import { z } from "zod";

// Enum for categories
const categoryEnum = [
  "Web Development",
  "App Development",
  "Tech",
  "DevOps",
  "AI",
  "Others",
] as const;

const statusEnum = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

// ✅ Create Blog Validation Schema
export const createBlogZodSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .trim()
    .min(20, "Title must be at least 20 characters long"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string({ error: "Content is required" }),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
  images: z.array(z.string().url()).optional(),
  category: z.enum(categoryEnum, {
    error: "Category is required",
  }),
  tags: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  author: z.string({ error: "Author is required" }),
  readingTime: z.number().optional(),
  status: z.enum(statusEnum).optional(),
  views: z.number().optional(),
  likes: z.number().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  deleteImages: z.array(z.string()).optional(),
});

// ✅ Update Blog Validation Schema
export const updateBlogZodSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(20, "Title must be at least 20 characters long")
      .optional(),
    slug: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
    images: z.array(z.string().url()).optional(),
    category: z.enum(categoryEnum).optional(),
    tags: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    author: z.string().optional(),
    readingTime: z.number().optional(),
    status: z.enum(statusEnum).optional(),
    views: z.number().optional(),
    likes: z.number().optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
    deleteImages: z.array(z.string()).optional(),
  }),
});
