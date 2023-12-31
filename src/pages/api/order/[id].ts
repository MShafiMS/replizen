import { OrderService } from "@/modules/order/order.service";
import dbConnect from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    const orderId = req.query.id as string;
    try {
      const order = await OrderService.getOrder(orderId);
      res.status(200).json(order);
    } catch (error) {
      res.status(404).json({ error: "Order not found" });
    }
  } else if (req.method === "PUT") {
    const orderId = req.query.id as string;
    const orderData = req.body;
    try {
      const updatedorder = await OrderService.updateOrder(orderId, orderData);
      res.status(200).json({
        message: "Order updated successfully",
        order: updatedorder,
      });
    } catch (error) {
      res.status(404).json({ error: "Order not found" });
    }
  } else if (req.method === "DELETE") {
    const orderId = req.query.id as string;
    try {
      const deleted = await OrderService.deleteOrder(orderId);
      res.status(200).json({
        message: "Order deleted successfully",
      });
    } catch (error) {
      res.status(404).json({ error: "Failed to delete order" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
