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

export const UserService = { createUser, getUser, getUsers };
