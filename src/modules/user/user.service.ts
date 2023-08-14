import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (user: IUser): Promise<IUser> => {
  if (!user.role) {
    user.role = "User";
  }
  if (!user.email) {
    user.email = "";
  }
  if (!user.phone) {
    user.phone = "";
  }
  const createduser = await User.create(user);
  return createduser;
};

const getUsers = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};

const getUser = async (id: string): Promise<IUser> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  return user;
};

const updateUser = async (id: string, user: IUser): Promise<IUser> => {
  const options = { upsert: true };
  const updateduser = await User.findByIdAndUpdate(id, user, options);
  if (!updateduser) {
    throw new Error(`User with id ${id} not found`);
  }
  return updateduser;
};

const deleteUser = async (id: string) => {
  const deleteduser = await User.findByIdAndDelete(id);
  return deleteduser;
};

const loginPhone = async (phone: string) => {
  const phoneUser = await User.findOne({ phone: phone });
  const token = jwt.sign(
    { phone: phone },
    process.env.NEXT_PUBLIC_SECRET_JWT_TOKEN as string
  );
  if (phoneUser) {
    return { success: true, phoneUser, token };
  } else {
    const user = { phone: phone, role: "User", email: "" };
    const createdUser = await User.create(user);
    return { success: true, createdUser, token };
  }
};

const loginEmail = async (email: string) => {
  const emailUser = await User.findOne({ email: email });
  const token = jwt.sign(
    { email: email },
    process.env.NEXT_PUBLIC_SECRET_JWT_TOKEN as string
  );
  if (emailUser) {
    return { success: true, emailUser, token };
  } else {
    const user = { email: email, role: "User", phone: "" };
    const createdUser = await User.create(user);
    return { success: true, createdUser, token };
  }
};

const emailUser = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return { success: true, email };
  } else {
    return { success: false, message: "User not found" };
  }
};

export const UserService = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  loginPhone,
  loginEmail,
  emailUser,
};
