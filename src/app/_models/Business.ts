// src/app/_models/Business.ts
import mongoose, { Model, Schema } from "mongoose";

interface Business {
  businessName: string;
  businessPhone: string;
  businessAddress: string;
  aboutUs?: string;
  keywords?: string;
  userId: Schema.Types.ObjectId;
}

const businessSchema = new Schema<Business>({
  businessName: {
    type: String,
    required: true,
  },
  businessPhone: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
  },
  aboutUs: {
    type: String,
  },
  keywords: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Business: Model<Business> =
  mongoose.models.User || mongoose.model<Business>("User", businessSchema);
export default Business;
