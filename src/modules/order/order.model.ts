import mongoose, { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

if (mongoose.models["Order"]) {
  delete mongoose.models["Order"];
}

const orderSchema = new Schema<IOrder>(
  {
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    payament: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
