import { z } from "zod";

const UrlSchema = z.object({
  frontend: z.string().optional(),
  backend: z.string().optional(),
});

const TechnologiesSchema = z.object({
  frontend: z.array(z.string()).optional(),
  backend: z.array(z.string()).optional(),
  database: z.array(z.string()).optional(),
  tools: z.array(z.string()).optional(),
});

// --- Create Project Validation ---
export const createProjectZodSchema = z.object({
  title: z.string().min(20, "Title must be at least 20 characters long"),
  slug: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  detailedDescription: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  tags: z.array(z.string()).optional(),
  technologies: TechnologiesSchema.optional(),
  repositoryUrl: UrlSchema.optional(),
  liveUrl: UrlSchema.optional(),
  projectType: z.enum(["Full Stack", "Frontend"]),
  owner: z.string().min(1, "Owner ID is required"),
  budget: z.number().optional(),
  spent: z.number().optional(),
  client: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  views: z.number().optional(),
  features: z
    .array(z.string().min(1))
    .nonempty("At least one feature is required"),
  challenges: z
    .array(z.string().min(1))
    .nonempty("At least one challenge is required"),
  futurePlan: z.array(z.string()).optional(),
  deleteImages: z.array(z.string()).optional(),
});

// --- Update Project Validation ---
// All fields optional for update
export const updateProjectValidation = createProjectZodSchema.partial();
