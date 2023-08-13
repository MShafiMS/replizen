export interface IUser {
  email?: string;
  phone?: string;
  name?: string;
  profilePicture?: string;
  role: "User" | "Admin";
  address?: string;
  cart?: Product[];
  order?: Order[];
}
type Product = {
  productId: string;
};
type Order = {
  orderId: string;
};
