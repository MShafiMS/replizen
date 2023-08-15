import { OrderService } from "@/modules/order/order.service";
import dbConnect from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const newOrder = await OrderService.addOrder(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: "Error adding order" });
    }
  } else if (req.method === "GET") {
    try {
      const orders = await OrderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Error fetching orders" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
