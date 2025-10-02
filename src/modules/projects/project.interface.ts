import { Types } from "mongoose";

export interface IProject {
  _id?: Types.ObjectId;
  title: string;
  description: string;
  detailedDescription?: string;
  startDate?: Date;
  endDate?: Date;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED";
  priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  tags?: string[];
  technologies?: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  owner: Types.ObjectId;
  teamMembers?: Types.ObjectId[];
  budget?: number;
  spent?: number;
  client?: string;
  attachments?: string[];
  isActive?: boolean;
}
