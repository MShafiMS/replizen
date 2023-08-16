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

  const getProduct = async (productId: string) => {
    try {
      const { data } = await primaryAxios.get(`product/${productId}`);
      if (data) {
        return data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return { products, isLoading, refetch, getProduct };
};

export default useProducts;
