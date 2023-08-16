import ProductCard from "@/components/product/ProductCard";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";
import { useMemo, useState } from "react";

type sortType = "default" | "priceup" | "pricedown" | "atoz" | "ztoa";

const Store = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  const { products, isLoading } = useProducts();
  const [sortName, setSortName] = useState<sortType>("default");

  const sortedProducts = useMemo(() => {
    if (sortName === "default") {
      return title ? products.slice(0, 5) : products;
    } else {
      return [...products].sort((a: any, b: any) => {
        return (
          (sortName === "pricedown" && a.price - b.price) ||
          (sortName === "priceup" && b.price - a.price) ||
          (sortName === "atoz" && a.name.localeCompare(b.name)) ||
          (sortName === "ztoa" && b.name.localeCompare(a.name))
        );
      });
    }
  }, [products, sortName, title]);

  if (isLoading) {
    return (
      <div
        className={`h-screen w-screen flex items-center justify-center ${className}`}
      >
        <p className="text-2xl text-blue-950 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="py-16 container mx-auto">
        <div className="flex mx-10 justify-between items-end mb-3">
          <h1 className="text-2xl">{title || "All Products"}</h1>
          {!title && (
            <select
              onChange={(e) => setSortName(e.target.value as sortType)}
              className="bg-gray-200 text-sm px-3 py-1 outline-none"
            >
              <option value="default">Default</option>
              <option value="pricedown">Price, Low to High</option>
              <option value="priceup">Price, High to Low</option>
              <option value="atoz">Alphabetically, A-Z</option>
              <option value="ztoa">Alphabetically, Z-A</option>
            </select>
          )}
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {sortedProducts?.map((product: Product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
