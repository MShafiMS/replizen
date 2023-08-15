import ProductCard from "@/components/product/ProductCard";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types";

const Store = () => {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p className="text-2xl text-blue-950 animate-pulse">Loading...</p>
      </div>
    );
  }
  return (
    <div className="mt-20 container mx-auto">
      <div className="flex flex-wrap gap-6 justify-center">
        {products?.map((product: Product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Store;
