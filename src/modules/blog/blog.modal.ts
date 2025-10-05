import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true, minlength: 20 },
    slug: { type: String, unique: true, sparse: true },
    excerpt: { type: String, trim: true },
    content: { type: String, required: true },
    thumbnail: { type: String },
    images: [{ type: String }],
    category: {
      type: String,
      enum: [
        "Web Development",
        "App Development",
        "Tech",
        "DevOps",
        "AI",
        "Others",
      ],
      required: true,
    },
    tags: [{ type: String }],
    features: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: "Owner", required: true },
    readingTime: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      default: "PUBLISHED",
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    deleteImages: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ✅ Pre-save hook to auto-generate slug from title if not provided
blogSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}`;

    let counter = 0;
    while (await Blog.exists({ slug })) {
      slug = `${slug}-${++counter}`;
    }

    this.slug = slug;
  }

  next();
});

blogSchema.pre("findOneAndUpdate", async function (next) {
  const project = this.getUpdate() as Partial<IBlog>;

  if (project.title) {
    const baseSlug = project.title.toLocaleLowerCase().split(" ").join("-");

    let slug = `${baseSlug}`;

    let counter = 0;

    while (await Blog.exists({ slug })) {
      slug = `${slug}-${++counter}`;
    }

    project.slug = slug;
  }

  this.setUpdate(project);
  next();
});

export const Blog = model<IBlog>("Blog", blogSchema);
