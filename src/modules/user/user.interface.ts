export interface IUser {
  email?: string;
  phone?: string;
  name?: string;
  profilePicture?: string;
  role: "User" | "Admin";
}
