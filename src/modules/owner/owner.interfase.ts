import { Types } from "mongoose";

export interface IOwner {
  _id?: Types.ObjectId;
  name: string;
  age?: number;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  picture?: string;
  isDeleted?: boolean;
  isActive?: "ACTIVE" | "INACTIVE";
  isVerified?: boolean;
  role: "ADMIN";
  blogs: Types.ObjectId[];
  projects: Types.ObjectId[];
}
