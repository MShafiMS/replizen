import { Error } from "mongoose";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const addProduct = async (product: IProduct): Promise<IProduct> => {
  const createdproduct = await Product.create(product);
  return createdproduct;
};

const getProducts = async (): Promise<IProduct[]> => {
  const products = await Product.find();
  return products;
};

const getProduct = async (id: string): Promise<IProduct> => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

const updateProduct = async (
  id: string,
  product: IProduct
): Promise<IProduct> => {
  const options = { upsert: true };
  const updatedproduct = await Product.findByIdAndUpdate(id, product, options);
  if (!updatedproduct) {
    throw new Error(`Product with id ${id} not found`);
  }
  return updatedproduct;
};

const deleteProduct = async (id: string) => {
  const deletedproduct = await Product.findByIdAndDelete(id);
  return deletedproduct;
};

export const ProductService = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
