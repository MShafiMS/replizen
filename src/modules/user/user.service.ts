import { Error } from "mongoose";
import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (user: IUser): Promise<IUser> => {
  if (!user.role) {
    user.role = "User";
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

export const UserService = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
