import { ProductService } from "@/modules/product/product.service";
import dbConnect from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const newProduct = await ProductService.addProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error adding product" });
    }
  } else if (req.method === "GET") {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
