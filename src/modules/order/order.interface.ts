export interface IOrder {
  productId: string;
  userId: string;
  payament: "Paid" | "Unpaid";
  status: "Delivered" | "Pending";
}
