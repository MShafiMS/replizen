import ProductCard from "@/components/product/ProductCard";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import { useState } from "react";

type sortType = "default" | "priceup" | "pricedown" | "atoz" | "ztoa";

const Store = () => {
  const { products, isLoading } = useProducts();
  const [sortName, setSortName] = useState<sortType>("default");

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p className="text-2xl text-blue-950 animate-pulse">Loading...</p>
      </div>
    );
  }
  return (
    <div className="mt-16 container mx-auto">
      <div className="flex mx-10 justify-between items-end mb-3">
        <h1 className="text-2xl">All Products</h1>
        <select
          onChange={(e) => setSortName(e.target.value as sortType)}
          className="bg-gray-200 text-lg px-3 py-1 outline-none"
        >
          <option value="default">Default</option>
          <option value="pricedown">Price, Low to High</option>
          <option value="priceup">Price, High to Low</option>
          <option value="atoz">Alphabetically, A-Z</option>
          <option value="ztoa">Alphabetically, Z-A</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {products
          ?.sort(function (a: Product, b: Product) {
            return (
              (sortName === "pricedown" && a.price - b.price) ||
              (sortName === "priceup" && b.price - a.price) ||
              (sortName === "atoz" && a.name.localeCompare(b.name)) ||
              (sortName === "ztoa" && b.name.localeCompare(a.name))
            );
          })
          .map((product: Product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export default Store;
