import mongoose, { Document, Model } from "mongoose";

import bcrypt from "bcrypt";

export type IRole = "admin" | "superadmin" | "buyer" | "seller";
export interface IUser extends Document {
  id: string;
  _id: string;
  email: string;
  password: string;
  phoneNumber: string;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
  role: IRole;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password and create the full name
UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  this.fullName = `${this.firstName} ${this.lastName}`; // Create full name
  next();
});

// Prevent Overwriting Model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
