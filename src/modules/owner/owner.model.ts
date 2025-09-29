import { model, Schema } from "mongoose";
import { IOwner } from "./owner.interfase";

const ownerSchema = new Schema<IOwner>(
  {
    name: { type: String, required: true },
    age: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    role: {
      type: String,
      enum: ["ADMIN"],
      default: "ADMIN",
      required: true,
    },
    picture: { type: String },
    address: { type: String },
    isVerified: { type: Boolean, default: true },
    isActive: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Owner = model<IOwner>("Owner", ownerSchema);
