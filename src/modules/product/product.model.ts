import mongoose, { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

if (mongoose.models["Product"]) {
  delete mongoose.models["Product"];
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    stockQuantity: { type: Number, required: true },
    reviews: [
      {
        id: { type: String },
        userId: { type: String },
        rating: { type: Number },
        comment: { type: String },
        date: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
