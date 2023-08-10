import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  email: { type: String },
  phone: { type: String },
  name: { type: String },
  profilePicture: { type: String },
  role: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
