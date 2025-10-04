import { Types } from "mongoose";

export interface IBlog {
  _id?: Types.ObjectId;
  title: string;
  slug?: string;
  excerpt?: string; // short summary for previews
  content: string;
  thumbnail?: string;
  images?: string[];
  category:
    | "Web Development"
    | "App Development"
    | "Tech"
    | "DevOps"
    | "AI"
    | "Others";
  tags?: string[];
  features?: string[];
  author: Types.ObjectId;
  readingTime?: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  views?: number;
  likes?: number;
  isFeatured?: boolean;
  isActive?: boolean;
}
