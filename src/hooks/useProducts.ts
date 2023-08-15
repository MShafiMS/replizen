import primaryAxios from "@/utils/primaryAxios";
import { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data } = await primaryAxios.get("/product");
    if (data) {
      setProducts(data);
    }
    setIsLoading(false);
  };
  const refetch = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return { products, isLoading, refetch };
};

export default useProducts;
