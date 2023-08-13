import { Error } from "mongoose";
import { IOrder } from "./order.interface";
import Order from "./order.model";

const addOrder = async (order: IOrder): Promise<IOrder> => {
  if (!order.payament) {
    order.payament = "Unpaid";
  }
  if (!order.status) {
    order.status = "Pending";
  }
  const createdorder = await Order.create(order);
  return createdorder;
};

const getOrders = async (): Promise<IOrder[]> => {
  const orders = await Order.find();
  return orders;
};

const getOrder = async (id: string): Promise<IOrder> => {
  const order = await Order.findById(id);
  if (!order) {
    throw new Error(`Order with id ${id} not found`);
  }
  return order;
};

const updateOrder = async (id: string, order: IOrder): Promise<IOrder> => {
  const options = { upsert: true };
  const updatedorder = await Order.findByIdAndUpdate(id, order, options);
  if (!updatedorder) {
    throw new Error(`Order with id ${id} not found`);
  }
  return updatedorder;
};

const deleteOrder = async (id: string) => {
  const deletedorder = await Order.findByIdAndDelete(id);
  return deletedorder;
};

export const OrderService = {
  addOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
