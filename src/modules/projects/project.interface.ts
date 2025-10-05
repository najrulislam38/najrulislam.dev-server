import { Types } from "mongoose";

export interface ITechnologies {
  frontend: string[];
  backend?: string[];
  database?: string[];
  tools?: string[];
}

export interface IProject {
  _id?: Types.ObjectId;
  title: string;
  slug?: string;
  description: string;
  detailedDescription?: string;
  thumbnail?: string;
  images?: string[];
  startDate?: Date;
  endDate?: Date;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED";
  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  tags?: string[];
  technologies?: ITechnologies;
  repositoryUrl?: { frontend?: string; backend?: string };
  liveUrl?: { frontend?: string; backend?: string };
  projectType: "Full Stack" | "Frontend";
  owner: Types.ObjectId;
  budget?: number;
  spent?: number;
  client?: string;
  attachments?: string[];
  isActive?: boolean;
  views: number;
  features: string[];
  challenges: string[];
  futurePlan?: string[];
  deleteImages?: string[];
}
