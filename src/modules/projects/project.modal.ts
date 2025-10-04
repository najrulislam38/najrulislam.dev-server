import { model, Schema } from "mongoose";
import { IProject, ITechnologies } from "./project.interface";

const TechnologiesSchema = new Schema<ITechnologies>(
  {
    frontend: { type: [String], required: true },
    backend: { type: [String] },
  },
  { _id: false }
);

const UrlSchema = new Schema(
  {
    frontend: { type: String },
    backend: { type: String },
  },
  { _id: false }
);

// Main Project Schema
const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true, min: 20 },
    slug: { type: String, unique: true, sparse: true },
    description: { type: String, required: true },
    detailedDescription: { type: String },
    thumbnail: { type: String },
    images: [{ type: String }],
    startDate: { type: Date },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["PLANNING", "IN_PROGRESS", "COMPLETED"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
    },
    tags: [{ type: String }],
    technologies: { type: TechnologiesSchema },
    repositoryUrl: { type: UrlSchema },
    liveUrl: { type: UrlSchema },
    projectType: {
      type: String,
      enum: ["Full Stack", "Frontend"],
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "Owner", required: true },
    budget: { type: Number },
    spent: { type: Number },
    client: { type: String },
    attachments: [{ type: String }],
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    features: [{ type: String, required: true }],
    challenges: [{ type: String, required: true }],
    futurePlan: [{ type: String }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

projectSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-project`;

    let counter = 0;
    while (await Project.exists({ slug })) {
      slug = `${slug}-${++counter}`;
    }

    this.slug = slug;
  }

  next();
});

projectSchema.pre("findOneAndUpdate", async function (next) {
  const project = this.getUpdate() as Partial<IProject>;

  if (project.title) {
    const baseSlug = project.title.toLocaleLowerCase().split(" ").join("-");

    let slug = `${baseSlug}-project`;

    let counter = 0;

    while (await Project.exists({ slug })) {
      slug = `${slug}-${++counter}`;
    }

    project.slug = slug;
  }

  this.setUpdate(project);
  next();
});

export const Project = model<IProject>("Project", projectSchema);
