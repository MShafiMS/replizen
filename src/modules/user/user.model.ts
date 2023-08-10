import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

if (mongoose.models["User"]) {
  delete mongoose.models["User"];
}

const userSchema = new Schema<IUser>({
  email: { type: String },
  phone: { type: String },
  name: { type: String },
  profilePicture: { type: String },
  role: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
