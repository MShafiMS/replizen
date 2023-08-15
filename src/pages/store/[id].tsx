import { Product } from "@/types";
import primaryAxios from "@/utils/primaryAxios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const [product, setProduct] = useState<Product>();
  const router = useRouter();
  const productId = router.query.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await primaryAxios.get(`product/${productId}`);
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <div className="mt-20">
      <h1>{product?.name}</h1>
    </div>
  );
};

export default ProductDetails;
