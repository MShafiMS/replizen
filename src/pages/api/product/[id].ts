import { ProductService } from "@/modules/product/product.service";
import dbConnect from "@/utils/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    const productId = req.query.id as string;
    try {
      const product = await ProductService.getProduct(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ error: "Product not found" });
    }
  } else if (req.method === "PUT") {
    const productId = req.query.id as string;
    const productData = req.body;
    try {
      const updatedproduct = await ProductService.updateProduct(
        productId,
        productData
      );
      res.status(200).json({
        message: "Product updated successfully",
        product: updatedproduct,
      });
    } catch (error) {
      res.status(404).json({ error: "Product not found" });
    }
  } else if (req.method === "DELETE") {
    const productId = req.query.id as string;
    try {
      const deleted = await ProductService.deleteProduct(productId);
      res.status(200).json({
        message: `${deleted?.name || "item"} deleted successfully`,
      });
    } catch (error) {
      res.status(404).json({ error: "Failed to delete item" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
